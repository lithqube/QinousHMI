/**
 * Connects our App with React Redux.
 * 
 * Because we only have a few actions and a single reducer for now, everything
 * is defined in this file.
 */

// TODO it's time to create different files for this

import ComponentNode from "../ComponentNode";
import { EventInfo } from "../EventService";
import { User, AuthState } from "../UserService";
import { getComponentTree } from "../ComponentService";
import { subscribeEvents } from "../EventService";
import { ConnectionState } from "../ConnectionService";
import * as WebMI from "../WebMI";

const SET_ACTIVE_VIEW = "setActiveView";
const SET_ACTIVE_NODE = "setActiveNode";
const SET_ACTIVE_EVENTS = "setActiveEvents";

export const setSystemNode = (node: ComponentNode) => ({
    type: "SET_SYSTEM_NODE",
    node
});

export const setActiveNode = (node: ComponentNode) => ({
    type: SET_ACTIVE_NODE,
    node
});

export const setActiveView = (view: string) => ({
    type: SET_ACTIVE_VIEW,
    view
});

export const setActiveEvents = (events: EventInfo[]) => ({
    type: SET_ACTIVE_EVENTS,
    events
});

export const setConnectionState = (state: ConnectionState) => ({
    type: "SET_CONNECTION_STATE",
    state
})

export function setAuthState(state: AuthState) {
    return {
        type: "SET_AUTH_STATE",
        state
    }
}

export function login(name: string, password: string) {
    return function(dispatch) {
        dispatch(setAuthState(AuthState.LoggingIn));
        // Only handle errors here, in case of success we wait for WebMI to reflect
        // new user, see UserService. We do this to keep having only 1 place where
        // the user is set.
        return WebMI.login(name, password).catch(() => {
            dispatch(setAuthState(AuthState.Ready));
        });
    }
}

export function logout() {
    return function(dispatch) {
        dispatch(setAuthState(AuthState.LoggingOut));
        return WebMI.logout().catch(() => {
            dispatch(setAuthState(AuthState.Ready));
        });
    }
}

export function setUser(user: User | undefined) {
    return {
        type: "SET_USER",
        user
    }
}

// TODO this variable is not so great, find a better solution
let eventSubscription: WebMI.GroupSubscription | undefined;
export function fetchComponentTree() {
    return function(dispatch) {
        return getComponentTree().then(node => {
            if (eventSubscription) {
                eventSubscription.unsubscribe();
            }
            console.log("Components", node);
            dispatch(setSystemNode(node));            
            eventSubscription = subscribeEvents(node, events => {
                console.log("Events", events);
                dispatch(setActiveEvents(events));
            });   
        });
    }
}

// Application state
export interface AppState {
    systemNode?: ComponentNode;
    activeNode?: ComponentNode;
    activeView?: string; // TODO change this to dedicated type
    activeEvents?: EventInfo[];
    user?: User;
    authState?: AuthState
    connectionState?: ConnectionState
}

function merge(state: AppState, partialState: AppState): AppState {
    return Object.assign({}, state, partialState);
}

const defaultState: AppState = {
    activeView: "Monitoring",
    authState: AuthState.Ready,
    connectionState: ConnectionState.Online
}

// Reducer
export const reducer = (state: AppState = defaultState, action) => {
    switch(action.type) {
        case "SET_SYSTEM_NODE":
            return merge(state, {
                systemNode: action.node,
                activeNode: action.node
            });
        case SET_ACTIVE_VIEW: 
            return merge(state, {
                activeView: action.view
            });
        case SET_ACTIVE_NODE:
            return merge(state, {
                activeNode: action.node
            });
        case SET_ACTIVE_EVENTS:
            return merge(state, {
                activeEvents: action.events
            });
        case "SET_USER":
            return merge(state, {
                user: action.user
            });
        case "SET_AUTH_STATE":
            return merge(state, {
                authState: action.state
            });
        case "SET_CONNECTION_STATE":
            return merge(state, {
                connectionState: action.state
            })
        default:
            return state;
    }
}
