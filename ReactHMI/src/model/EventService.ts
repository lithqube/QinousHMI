/**
 * All services around events, e.g. subscribe to all of them.
 */

import ComponentNode from "./ComponentNode";
import { EventDP, EventType, Level } from "./Event";
import * as WebMI from "./WebMI";

// An actual occurrence of an event (as opposed to an EventType)
export interface EventInfo {
    readonly level: Level,
    readonly name: string,
    readonly owner: ComponentNode
}

/**
 * Returns a flat list of all event data points of a node and
 * its children, grand-children, etc.
 */
export function getAllEventDPs(node: ComponentNode): EventDP[] {
    let dps: EventDP[] = [];
    node.traverse(node => {
        dps = dps.concat(node.events);
    });
    return dps;
}

type EventSubscriptionCallback = (events: EventInfo[]) => void;

/**
 * Subscribes to all event data points of a node and all of its subcomponents and
 * calls a callback on any change with a flat array of event infos.
 * 
 * TODO what happens on error? (right now ignored)
 * TODO what happens on partial loading state (1 dp still loading, all others here) (right now ignored)
 * TODO optimize: right now we recreate all EventInfos on every change
 * TODO can we get rid of the map? then we don't need the polyfill...
 * 
 * @param {ComponentNode} node - The root node
 * @param {EventSubscriptionCallback} callback - Will be called on each change.
 * @return {WebMI.GroupSubscription} to unsubscribe all subscription later.
 */
export function subscribeEvents(node: ComponentNode, callback: EventSubscriptionCallback): WebMI.GroupSubscription {
    const activeEventsByDP: Map<EventDP, EventType[]> = new Map();
    // Subscribe to all event data points
    const eventDPs = getAllEventDPs(node);
    const subscriptionIDs = eventDPs.map(eventDP => WebMI.subscribe(eventDP.dp, (value, error) => {
        if (error || value === undefined) {
            return;
        }
        // Convert value to a set of events
        const activeTypes = eventDP.eventTypesForValue(value);
        // Update internal datastructure that holds all active events by eventDP
        activeEventsByDP.set(eventDP, activeTypes);
        // Notify user of change
        const infos = eventInfosForEventMap(activeEventsByDP);
        callback(infos);
    }));
    return new WebMI.GroupSubscription(subscriptionIDs);
}

function eventInfosForEventMap(map: Map<EventDP, EventType[]>): EventInfo[] {
    let infos: EventInfo[] = [];
    map.forEach((types, group) => {
        const eventsPerGroup: EventInfo[] = types.map(type => ({
            level: type.level,
            name: type.name,
            owner: group.owner
        }));
        infos = infos.concat(eventsPerGroup);
    });
    return infos;
}


import { ComponentType, Task } from "./ComponentNode";
import * as EventConfig from "./EventConfig";

export function stubEvents(): EventInfo[] {
    const task = new Task("test");
    const node = new ComponentNode(ComponentType.Battery, task, 1);
    const types = EventConfig.BCUEvents;
    return types.map(type => ({
        name: type.name,
        level: type.level,
        owner: node            
    }))
}