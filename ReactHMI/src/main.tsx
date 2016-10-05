import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as actions from "./model/Actions";
import App from "./components/App";
import { getComponentTree } from "./model/ComponentService";
import { subscribeEvents, stubEvents } from "./model/EventService";
require("./resources/styles/_index.scss");

// TODO comment a bit more here because it is the entry point
// for any new developer.

// Setup Redux Store
const store = createStore(actions.reducer);

// Set the default view
store.dispatch(actions.setActiveView("Monitoring"));

// Load the system tree (should be done by App.tsx)
getComponentTree().then(node => {
    console.log("Components", node);
    store.dispatch(actions.setSystemNode(node));    
    // store.dispatch(actions.setActiveEvents(stubEvents()));
    // store.dispatch(actions.setActiveEvents([]));

    subscribeEvents(node, events => {
        console.log("Events", events);
        store.dispatch(actions.setActiveEvents(events));
    });
});
// // FIXME Promise catch leads to strange error reporting by React, investigate
// // .catch(err => {
// //     console.error("[App] Error loading component tree", err);
// // });

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);