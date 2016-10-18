import * as WebMI from "./WebMI";
import store from "./store/Store";
import { setUser, setAuthState } from "./store/Actions";

/**
 * How Login/Logout works
 * 
 * Bachmann's WebMI reflects any change in login and other status values using an event 
 * called clientvariableschange. At the same time, we want the current user info
 * in our application's Redux store, which will be presented by the UI. In order to make 
 * this work correctly we implement the following mechanism:
 *  
 * - WebMI's onClientVariableChange notifies UserService on every change in user.
 * - UserService then sends a setUser-action to Redux to keep the store in sync which 
 *   in turn will eventually update the UI.
 * - If the UI or any part in the software wants logout: Should send logout-action to Redux
 * - A logout action calls WebMI.logout() and describes intermediary state (authState=loggingIn).
 * - After that we don't do anything else. We only react to onClientVariableChange above
 *   and when this event is being emitted again the whole cycle described above starts anew.
 * - The same for login: Anyone who wants login should send a login-action to Redux.
 * - A login action calls WebMI.login(), etc. etc.
 * 
 * That means for you: Don't call WebMI.login() or logout() directly because the Redux 
 * actions will take care of intermediate states for you (e.g. logging in, logging out) which will
 * automatically be reflected by the UI. See components/Auth.tsx for an example.
 * Calling WebMI.login() will still work though, if you must call in anyway and don't care about any of this.
 */
let currentUser: User | undefined;
WebMI.clientVariablesChange.subscribe(variables => {
    // No change in user
    if (currentUser && currentUser.name === variables.username) {
        return;
    }
    // No user anymore
    if (currentUser && variables.username === "") {
        currentUser = undefined;
    }
    // New user
    else if (variables.username !== "") {
        currentUser = {
            name: variables.username,
            permissions: variables.right
        };
    }
    store.dispatch(setUser(currentUser));
    store.dispatch(setAuthState(AuthState.Ready));
});

export interface User {
    readonly name: string,
    readonly permissions: string[]
}

export const enum AuthState {
    Ready = 1,
    LoggingIn,
    LoggingOut,
}

