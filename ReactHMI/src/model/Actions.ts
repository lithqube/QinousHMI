/**
 * Connects our App with React Redux.
 * 
 * Because we only have a few actions and a single reducer for now, everything
 * is defined in this file.
 */

import ComponentNode from "./ComponentNode";
import { EventInfo } from "./EventService";

// TODO add isFetching and error info in async actions
// TODO define shape with types

export const setSystemNode = (node: ComponentNode) => ({
    type: "SET_SYSTEM_NODE",
    node
});

export const setActiveNode = (node: ComponentNode) => ({
    type: "SET_ACTIVE_NODE",
    node
});

export const setActiveView = (view: string) => ({
    type: "SET_ACTIVE_VIEW",
    view
});

export const setActiveEvents = (events: EventInfo[]) => ({
    type: "SET_ACTIVE_EVENTS",
    events
});

// Application state
interface State {
    systemNode?: ComponentNode;
    activeNode?: ComponentNode;
    activeView?: string; // TODO change this to dedicated type
    activeEvents?: EventInfo[]; 
}

function merge(state: State, partialState: State): State {
    return Object.assign({}, state, partialState);
}

// Reducer
export const reducer = (state: State = {}, action) => {
    switch(action.type) {
        case "SET_SYSTEM_NODE":
            return merge(state, {
                systemNode: action.node,
                activeNode: action.node
            });
        case "SET_ACTIVE_VIEW": 
            return merge(state, {
                activeView: action.view
            });
        case "SET_ACTIVE_NODE":
            return merge(state, {
                activeNode: action.node
            });
        case "SET_ACTIVE_EVENTS":
            return merge(state, {
                activeEvents: action.events
            });
        default:
            return state;
    }
}


