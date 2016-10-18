/**
 * Makes some of Bachmann's webMI library API usable for other modules.
 * 
 * Bachmann's WebMI is not designed to be used as a module. In order to use it as one, we import its raw content using
 * Webpack's raw-loader and execute it using eval(). Unfortunately, the library also writes itself to the global window 
 * scope, so we return a reference to that as an export of this file.
 */

import Notifier from "../common/Notifier";

// Bachmann's webMI is very verbose, prevent any calls to console.log (.info and .error still allowed)
const PREVENT_WEBMI_LOGGING = true;
// Name of the property Bachmann's webMI uses to write itself to window scope, e.g. window.webMI
const WEBMI_PROPERTY = "webMI"; 
// Define all functions of the Bachmann API (BM) that we use.
interface BMWebMI {
    data : {
        read : (nodeIDs: string[], callback: (results: BMReadResult[]) => void) => void,
        subscribe: (nodeID: string, callback: (result: BMSubscriptionResult) => void) => number,
        unsubscribe: (subscriptionID: number) => void,
        login: (username: string, password: string, callback: (result: any) => void) => void,
        logout: (callback: (result: any) => void) => void,
        call : (functionName: string, args: any, callback: (result: any) => void) => void,
        addEventListener: (name: string, callback: (result: any) => void) => void,
    }
    addEvent: (id: any, name: string, callback: (result: any) => void) => void
}

// Set the reference to Bachmann's webMI to use it in this module. Checks first if there already
// is a webMI which allows importing it via <script> or unit tests to use a mock, see test/WebMI.spec.ts.
if (!window[WEBMI_PROPERTY]) {
    importWebMI();
}
const webMI: BMWebMI = window[WEBMI_PROPERTY];

function importWebMI() {
    // Webpack will load webmi.js as a string, it won't be automatically interpreted as code on runtime.
    let rawWebMI = require("raw!./vendor/webmi.js");
    // Overwrite webmi.js to prevent calls to console.log
    if (PREVENT_WEBMI_LOGGING) {
        window["__webMINullLogger"] = function() {};
        rawWebMI = rawWebMI.replace(/console.log/g, "__webMINullLogger");
    }
    // Interpret webmi.js (writes itself to window)
    eval(rawWebMI);
}

// Default error logger (uses console.error)
let logError = function(...args) { console.error(args[0], ...args.slice(1)); }

/**
 * Set a custom logger to log errors. Use it to suppress logging in unit tests, to show
 * logging in-app or to send in anywhere else.
 */
export function setLogger(logger) {
    logError = logger;
}

// webMI response to webMI.data.read()
interface BMReadResult {
    value: number | string | undefined | null; // null if there was an error
    error: number; // 0 if there was no error
    errorstring?: string; // only if there was an error
    timestamp?: number; // not present if there was an error
}

// If the response was successful we cast it to something that is
// easier to handle for consumers.
interface SuccessfulReadResult {
    value: number | string;
}

// Helper function to correctly convert a SuccessfulReadResult to a number.
export function resultAsNumber(value: number | string) {
    return parseInt(value as string, 10);
}

/**
 * Wraps webMI.data.read() with a Promise.
 * If the result contains an error the promise will be rejected. If
 * you requested multiple nodes and one of them results in an error the whole promise
 * will be rejected as well. A rejected promise returns an array of error results.
 */
export function readData(nodeIDs: string[]): Promise<SuccessfulReadResult[]> {
    return new Promise<SuccessfulReadResult[]>(function (resolve, reject) {
        webMI.data.read(nodeIDs, (results: BMReadResult[]) => {
            const errors = results.filter(containsError);
            if (errors.length === 0) {
                resolve(results as SuccessfulReadResult[]);
            }
            else {
                logError("webMI.data.read reported error\n  nodeIDs %o\n  errors %o", nodeIDs, errors);
                reject(errors);
            }
        });
    });
}

function containsError(result: any) {
    return result.errorstring !== undefined;
}

type SubscriptionValue = string | number | undefined;

// webMI response to webMI.data.subscribe()
interface BMSubscriptionResult {
    address: string;
    timestamp: number;
    status?: number; // present if there was an error
    value?: SubscriptionValue; // not present if there was an error
}

type SubscriptionCallback = (value: SubscriptionValue, error: boolean) => void;

/**
 * Subscribe to a single datapoint.
 * @param {string} dp - The datapoint to subscribe to.
 * @param {SubscriptionCallback} callback - The function to be called on an update
 * @return {number} a subscription ID to be used with unsubscribe() later.
 */
export function subscribe(dp: string, callback: SubscriptionCallback): number {
    const handler = (result: BMSubscriptionResult) => {
        if (result.value === undefined) {
            logError(`webMI.data.subscribe couldn't get value at ${dp}`);
            callback(undefined, true);
        }
        else {
            callback(parseValue(result.value), false);
        }
    };
    return webMI.data.subscribe(dp, handler);
}

/**
 * Unsubscribe from a previously subscribed datapoint using a subscription ID.
 * @param {(number|undefined)} subscriptionID - The subscription ID to use to unsubscribe
 */
export function unsubscribe(subscriptionID: number | undefined) {
    if (subscriptionID !== undefined) {
        webMI.data.unsubscribe(subscriptionID);
    }
}

/**
 * Represents a subscription to multiple datapoints made with subscribeGroup(),
 * use unsubscribe() to stop any updates.
 */
export class GroupSubscription {
    constructor(protected ids: number[]) {}
    unsubscribe() {
        this.ids.forEach(id => webMI.data.unsubscribe(id));
        this.ids = [];
    }
}

type SubscriptionGroupCallback = (values: SubscriptionValue[], error: boolean) => void;

/**
 * Subscribe to a group of datapoints.
 * Similar to webMI.subscribeBlock but allows unsubscribing as well. The callback will only be
 * called once all values are known, you won't get partial data. If one of the subscriptions fails though,
 * the callback is called with the error and possibly partial data collected so far.
 * @param {string[]} dps - A collection of datapoints 
 * @param {SubscriptionGroupCallback} callback - Callback that is called on updates
 * @return {GroupSubscription} use unsubscribe() to unsubscribe from all datapoints.
 */
export function subscribeGroup(dps: string[], callback: SubscriptionGroupCallback): GroupSubscription {
    // Maintain an internal collection of values in an object
    // where the keys correspond to the address (nodeID).
    // Initialize all entries with undefined.
    const valuesByAddress = {};
    dps.forEach(dp => valuesByAddress[dp] = undefined);
    
    // TODO Once there was an error, this whole group fails forever. Maybe make this less strict.
    let hasError = false;
    const onValueUpdate = result => {
        // Write the result to internal collection. Return 
        valuesByAddress[result.address] = result.value;
        const userValues = dps.map(id => valuesByAddress[id]);
        const hasUndefined = hasUndefinedEntry(userValues);
        if (result.value === undefined) {
            logError(`webMI.data.subscribe couldn't get value at ${result.address}`);
            hasError = true;
        }
        if (hasError || !hasUndefined) {        
            callback(userValues, hasError);
        }
    };
    // Subscribe to all datapoints
    const subscriptionIDs = dps.map(nodeID => webMI.data.subscribe(nodeID, onValueUpdate));
    return new GroupSubscription(subscriptionIDs);
}

function hasUndefinedEntry(array: any[]) {
    for (let a of array) {
        if (a === undefined) return true;
    }
    return false;
} 

function parseValue(value: any): number | undefined {
    if (value === undefined) {
        return value;
    }
    return parseInt(value, 10);
}

/**
 * Login
 * @param {string} username - A user name
 * @param {string} password - A password
 * @return {Promise} a promise reporting success or failure. webMI doesn't return the username (true?),
 * use onClientVariableChange to be notified on login status.
 */
export function login(username: string, password: string): Promise<void> {
    return new Promise<void>(function(resolve, reject) {
        webMI.data.login(username, password, result => {
            const payload = result[""];
            if (payload.error === undefined) {
                resolve();
            }
            else {
                logError("webMI.data.login failed", payload);
                reject();
            }
        });
    });
}

/**
 * Logout
 * @return {Promise} a promise reporting success or failure.
 */
export function logout(): Promise<void> {
    return new Promise<void>(function(resolve, reject) {
        webMI.data.logout(result => {
            const payload = result[""];
            if (payload.error === undefined) {
                resolve();
            }
            else {
                // Response is "": { error: 405, errorstring: "Access denied" }
                logError("webMI.data.logout failed", payload);
                reject();
            }
        });
    });
}

/**
 * Wraps webMI.data.call in a Promise. 
 */
export function call(functionName: string, args: any): Promise<any> {
    return new Promise<any>(function(resolve, reject) {
        webMI.data.call(functionName, args, ret => {
            if (ret.error === undefined || ret.error === 0) {
                console.log("call returns", ret);
                resolve(ret.result);
            }
            else {
                logError("webMI.data.call failed, function '%s', args %o, returned %o", functionName, args, ret);
                reject({ error: ret.error, errorstring: ret.errorstring });
            }
        });
    });
}

/**
 * Notifier for "clientvariableschange"
 * 
 * E.g. `WebMI.clientVariablesChange.subscribe(variables => console.log(variables));`
 */
export const clientVariablesChange = new Notifier<ClientVariables>();

/**
 * Notifier for "statechange"
 * 
 * E.g. `WebMI.stateChange.subscribe(state => console.log(state));`
 */
export const stateChange = new Notifier<State>();


// Type returned by webMI.data.addEventListener("clientvariableschanged")
interface ClientVariables {
    username: string,
    right: string[]
}

// Type returned by webMI.addEvent("statechange")
export const enum State {
    ConnectionFailure = -1
}

// Connect to 'clientvariableschange'
if (webMI.data.addEventListener) {
    webMI.data.addEventListener("clientvariableschange", event => {
        clientVariablesChange.notify(event);
    });
}

// Connect to 'statechange'
if (webMI.addEvent) {
    webMI.addEvent(webMI.data, "statechange", state => {
        stateChange.notify(state);
    });
}
