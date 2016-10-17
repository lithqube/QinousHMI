/**
 * Entry point to the application.
 * 
 * Here you'll find the general application setup. This setup is not specific to our domain yet,
 * have a look at components/App.tsx for that. Start by looking at the end of this file where
 * <App/> (defined in App.tsx) will be set as the main component.
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from "./model/store/Store";
import * as actions from "./model/store/Actions";
import App from "./components/App";

// Tell webpack that we use this SCSS resource. Whether webpack will
// bundle it together with this JS source (which we don't) or keep it an external file
// (which we do) is defined in the webpack config.
require("./resources/styles/_index.scss");

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);