/**
 * Makes WebMI usable as a module.
 * 
 * WebMI is not designed as a module. In order to use it as one, we import its raw content using
 * Webpack's raw-loader and execute it using eval(). WebMI writes itself to the global window scope, so
 * we return a reference to that as an export of this file.
 * 
 * IMPORTANT: This only works with Webpack as a build tool! The other way to solve this is to create
 * a self-hosted NPM package of webMI.
 * 
 * IMPORTANT: To prevent WebMI logging too much in the console, we replace "console.log" calls with a
 * call to a noop-function. Change PREVENT_WEBMI_LOGGING if you want to see all the logs.
 */

const PREVENT_WEBMI_LOGGING = true;

// TODO is this needed?
// window["webMIConfig"] = {
//     data : {
//         url: "http://192.168.3.200/webMI/"
//     }  
// }

// Webpack will load webmi.js as a string, it won't be automatically interpreted as code on runtime.
let rawWebMI = require("raw!./vendor/webmi.js");

// Overwrite webmi.js to prevent calls to console.log
if (PREVENT_WEBMI_LOGGING) {
    window["__webMINullLogger"] = function() {};
    rawWebMI = rawWebMI.replace(/console.log/g, "__webMINullLogger");
}

// Interpret webmi.js
eval(rawWebMI);

// WebMI writes itself to the window, get a reference to it from there
const webMI: any = window["webMI"];

function containsError(result: any) {
    return result.errorstring !== undefined;
}

function logNodeError(nodeIDs: string[], errors: any[]) {
    console.error("webMI.data.read reported error\n  nodeIDs %o\n  errors %o", nodeIDs, errors);
}

function parseValue(value: any): number | undefined {
    if (value === undefined) {
        return value;
    }
    return parseInt(value, 10);
}

/**
 * Wraps webMI.data.read
 * Returns a promise. If the result contains an error the promise will be rejected. If
 * you requested multiple nodes and one of them results in an error the whole promise
 * will be rejected as well. A rejected promise returns an array of error results.
 */
export function readData(nodeIDs: string[]): Promise<any[]> {
    return new Promise<any[]>(function (resolve, reject) {
        webMI.data.read(nodeIDs, (results: any[]) => {
            const errors = results.filter(containsError);
            if (errors.length === 0) {
                resolve(results); // TODO pass all values through parseValue?
            }
            else {
                logNodeError(nodeIDs, errors);
                reject(errors);
            }
        });
    });
}

type SubscriptionValue = number | undefined;
type SubscriptionCallback = (value: SubscriptionValue, error: boolean) => void;

export function subscribe(dp: string, callback: SubscriptionCallback): number {
    const handler = result => {
        if (result.value === undefined) {
            console.error(`webMI.data.subscribe couldn't get value at ${dp}`);
            callback(undefined, true);
        }
        else {
            callback(parseValue(result.value), false);
        }
    };
    return webMI.data.subscribe(dp, handler);
}

export function unsubscribe(subscriptionID: number | undefined) {
    if (subscriptionID !== undefined) {
        webMI.data.unsubscribe(subscriptionID);
    }
}

export class GroupSubscription {
    constructor(protected ids: number[]) {}
    unsubscribe() {
        this.ids.forEach(id => webMI.data.unsubscribe(id));
        this.ids = [];
    }
}

type SubscriptionGroupCallback = (values: SubscriptionValue[], error: boolean) => void;

/**
 * Similar to webMI.subscribeBlock with the following behaviour:
 * - Callback will only be called once all values have been sent.
 * - If one of the subscriptions fails, the callback returns an error together with the partial data.
 * - You can unsubscribe a whole group (webMI does not offer unsubscribing if you used subscribeBlock).
 */
export function subscribeGroup(nodeIDs: string[], callback: SubscriptionGroupCallback): GroupSubscription {
    // Maintain an internal collection of values in an object
    // where the keys correspond to the address (nodeID).
    // Initialize all entries with undefined.
    const valuesByAddress = {};
    nodeIDs.forEach(id => valuesByAddress[id] = undefined);
    
    // TODO Once there was an error, this whole group fails forever. Maybe make this less strict.
    let hasError = false;
    const onValueUpdate = result => {
        // Write the result to internal collection. Return 
        valuesByAddress[result.address] = result.value;
        const userValues = nodeIDs.map(id => valuesByAddress[id]);
        const hasUndefined = hasUndefinedEntry(userValues);
        if (result.value === undefined) {
            console.error(`webMI.data.subscribe couldn't get value at ${result.address}`);
            hasError = true;
        }
        if (hasError || !hasUndefined) {        
            callback(userValues, hasError);
        }
    };
    // Subscribe to all datapoints
    const subscriptionIDs = nodeIDs.map(nodeID => webMI.data.subscribe(nodeID, onValueUpdate));
    return new GroupSubscription(subscriptionIDs);
}

function hasUndefinedEntry(array: any[]) {
    for (let a of array) {
        if (a === undefined) return true;
    }
    return false;
} 



// EXPERIMENTAL BELOW

export function login(username: string, password: string): Promise<any> {
    return promisify("data.login", username, password);
}

export function logout(): Promise<any> {
    return promisify("data.logout");
}

function promisify(func: string, ...args) {
    return new Promise<any[]>(function (resolve, reject) {
        webMI[func](...args, (results: any[]) => {
            const errors = results.filter(containsError);
            if (errors.length === 0) {
                resolve(results);
            }
            else {
                console.error(errors);
                reject(errors);
            }
        });
    });    
}