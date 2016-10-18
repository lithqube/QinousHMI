/**
 * Reflects connection status in application store.
 * 
 * Bachmann's webMI library will periodically check if it still can reach the server. If this is not the case
 * anymore, it emits an event and stops working. Unfortunately, it won't recover if the server can be 
 * reached again, it's effectively broken now. This means that the only thing we can do after connection failure is:
 * - Tell the user about it
 * - Start trying to connect to the server
 * - If the server is available again, either offer the user to reload the site or do it automatically.
 * 
 * For future reference: It might be possible to only reload Bachmann's webMI library. This is possible 
 * because we are including it as raw text using webpack. We didn't to this because we'll have
 * to look into possible side-effects which is out-of-scope for now. We can pick this up again if 
 * people need to be able to use the application in very bad network conditions where connection drops regularly.
 */

import * as WebMI from "./WebMI";
import store from "./store/Store";
import { setConnectionState } from "./store/Actions";

export const enum ConnectionState {
    Online = 1,
    Offline,
    RecommendReload
}

export function startTrackingConnectionState() {
    WebMI.stateChange.subscribe(stateDidChange);
}

function stateDidChange(state) {
    // Bachmann's WebMI will never recover from a connection failure. The only thing to do is reload.
    // Thus we don't need to track any other kind of state.
    if (state === WebMI.State.ConnectionFailure) {
        store.dispatch(setConnectionState(ConnectionState.Offline));
        startReconnecting();
    }
}


let timeoutID;
let shouldAutoSchedulePing = false;

// Begins trying to reach the server. It doesn't try to reach it in regular intervals but
// takes network latency into account by doing the following:
// 1. Schedule next attempt using a delay
// 2. Attempt connect
// 3. If success, stop reconnection attempts and report new state (recommending reload)
// 4. If failure, go back to 1
function startReconnecting() {
    cancelNextPing();
    shouldAutoSchedulePing = true;
    scheduleNextPing();
}

function cancelNextPing() {
    shouldAutoSchedulePing = false;
    clearTimeout(timeoutID);
}

function scheduleNextPing() {
    timeoutID = setTimeout(() => ping(), 5000);
}

function ping() {
    // The official way by Bachmann to ping the server
    WebMI.call("read", "").then(result => {
        store.dispatch(setConnectionState(ConnectionState.RecommendReload));
    }).catch(() => {
        if (shouldAutoSchedulePing) {
            scheduleNextPing();
        }    
    });
}
