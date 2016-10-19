/**
 * EXPERIMENTAL DIAGRAM PLAYGROUND
 * Shows diagrams for component nodes.
 */
import * as React from "react";
import { connect } from 'react-redux';
import * as Highstock from "highcharts/highstock";
import * as Scope from "../../model/Scope";
import Notifier from "../../common/Notifier";

import ComponentNode, { ComponentType } from "../../model/ComponentNode";

interface Props {
    activeNode: ComponentNode | undefined;
}

interface HCDataCallback {
    dataMax: number;
    dataMin: number;
    max: number;
    min: number;
    target: any; // e.g. the axis
    trigger: string; // e.g. rangeSelectorButton
    triggerOp?: string; // e.g. navigator-drag
    type: string; // e.g. setExtremes
    userMax: number;
    userMin: number;
}

// Q_SYS_BCU1_FAST: Q_SYS/.BCUData[1].Battery.DCPower_kW, Q_SYS/.BCUData[1].Battery.MaxCellVoltage
// Q_SYS_BCU1_SLOW: Q_SYS/.BCUData[1].Battery.AvailableSOC
const config = {
    data: [
        {
            recorder: "Q_SYS_BCU1_FAST",
            series: [
                {
                    channel: "Q_SYS/.BCUData[1].Battery.DCPower_kW"
                },
                {
                    channel: "Q_SYS/.BCUData[1].Battery.MaxCellVoltage"
                }
            ]
        },
        {
            recorder: "Q_SYS_BCU1_SLOW",
            series: [
                {
                    channel: "Q_SYS/.BCUData[1].Battery.AvailableSOC"
                }
            ]
        }
    ]
};


// console.log("UTC now", new Date().getTime());

// const timeNowUTC = new Date().getTime();

// Scope.getIndices("Q_SYS_BCU1_FAST", timeNowUTC - (1000 * 60 * 60 * 24), timeNowUTC).then(result => {
//     console.log("indices for now", result);
// });


interface SeriesConfig {
    channel: string;
}

interface SourceConfig {
    recorder: string;
    series: SeriesConfig[];
}

class TimeRange {
    readonly from: number;
    readonly to: number;
    constructor(from: number, to: number) {
        this.from = from;
        this.to = to;
    }
}

interface WindowUpdate {
    range: TimeRange;  // An update might change/correct the range
    data: any; // TBD
}


/**
 * A sample store provides sample data for a given time window.
 */
class SampleStore {

    readonly sources: SourceConfig[];
    readonly windowUpdate: Notifier<WindowUpdate>;
    protected tocs: Scope.TOC[];
    protected window: TimeRange;

    constructor(sources: SourceConfig[]) {
        this.sources = sources;
        this.tocs = [];
        this.windowUpdate = new Notifier();
    }

    dispose() {
        this.windowUpdate.unsubscribeAll();
    }

    updateTOC() {
        return this.fetchTOC().then(tocs => this.tocs = tocs);
    }

    requestWindow(range: TimeRange) {
        this.window = range;
    }

    protected fetchTOC() {
        const promises = this.sources.map(source => Scope.getTOC(source.recorder));
        return Promise.all(promises);
    }
}


// Display the latest data that fits into the window
// Problem: We don't know directly what the latest data is.

// Load toc of all recs




class Diagram extends React.Component<Props, {}> {

    protected chart: any;
    protected store: SampleStore;

    constructor() {
        super();
        this.store = new SampleStore(config.data);
        this.store.windowUpdate.subscribe(update => {
            console.log("update!");
        });
    }

    componentDidMount() {
        this.store.updateTOC();
        const ONE_DAY = 1000 * 60 * 60 * 24;
        const timeNowUTC = new Date().getTime();
        const timeYesterdayUTC = timeNowUTC - ONE_DAY;
        this.store.requestWindow(new TimeRange(timeYesterdayUTC, timeNowUTC));
    }

    componentWillUnmount() {
        this.store.dispose();
    }


    chartElementDidMount = element => {
        console.log("chartElementDidMount", element);
        if (this.chart) {
            this.chart.destroy();
            this.chart = undefined;
        }
        if (element) {
            const data: any[] = [];
            for (let i = 0; i < 1000; i++) {
                data.push([i * 1000 * 60 * 60, Math.sin(i) * 0.2]);
            }
            this.chart = Highstock.stockChart(element, {
                credits: {
                    enabled: false
                },
                title: {
                    text: ""
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                rangeSelector: {
                    inputEnabled: false,
                    buttons: []
                },
                yAxis: {
                    title: {
                        text: 'Some value'
                    }
                },
                plotOptions: {
                    series: {
                        animation: false
                    }
                },
                series: [{
                    name: "Test",
                    data: []
                }]
            });
        }
    }

    didClickBackward = () => {

    }

    didClickForward = () => {

    }

    render() {
        const { activeNode } = this.props;

        return <div className="diagram">
            <div className="title">Diagram Test</div>
            <button onClick={this.didClickBackward}>Backward</button>
            <button onClick={this.didClickForward}>Forward</button>
            <div ref={this.chartElementDidMount}/>
        </div>;
    }
}

const mapStateToProps = (state) => ({
    activeNode: state.activeNode
});

export default connect(mapStateToProps)(Diagram)
