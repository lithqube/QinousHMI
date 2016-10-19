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

// TEMP ONLY
// Q_SYS/.BCUData[1].Battery.DCPower_kW
// Q_SYS/.BCUData[1].Battery.MaxCellVoltage


import * as Scope from "./model/Scope";


//Scope.getChannels("Q_SYS_BCU1_FAST").then(channels => console.log(channels));

// 1475672142319.874
// 1475688118729.706

// const t1 = 1475672142319.874;
// const t2 = 1475688118729.706;

// const t3 = 1475879931669.811;

// Scope.getTOC("Q_SYS_BCU1_FAST").then(tocs => {
//     console.log("tocs", tocs);
//     return Scope.readByTimestamp("Q_SYS_BCU1_FAST", ["Q_SYS/.BCUData[1].Battery.DCPower_kW", "Q_SYS/.BCUData[1].Battery.MaxCellVoltage"], t1, t3);
//     // return Scope.readByIndex("Q_SYS_BCU1_FAST", ["Q_SYS/.BCUData[1].Battery.DCPower_kW", "Q_SYS/.BCUData[1].Battery.MaxCellVoltage"], 0, 12000);
// }).then(result => {
//     console.log("samples", result);
// });

//     return Scope.getIndices("Q_SYS_BCU1_FAST", first.timestart, second.timestart);
// }).then(result => {
//     console.log(result);
// });


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById("root")
);