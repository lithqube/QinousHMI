/**
 * Creates and hosts the view corresponding to the current state.activeView,
 * e.g. Monitoring, Diagram, Protocol, etc.
 */
import * as React from "react";
import { connect } from "react-redux";
import Monitoring from "./views/Monitoring";
import Protocol from "./views/Protocol";

const mapStateToProps = (state) => ({
    activeView: state.activeView
});

interface Props {
    activeView: string | undefined;
}

const views = {
    "Monitoring": <Monitoring/>,
    "Protocol": <Protocol/>
}

class ViewContainer extends React.PureComponent<Props, {}> {

    render() {
        const { activeView } = this.props;
        const view = activeView ? views[activeView] : undefined;
        if (!view && activeView) {
            console.error("[ViewContainer] Unknown view:", activeView);
        }
        return <div className="view-container">{view}</div>;
    }
}

export default connect(mapStateToProps)(ViewContainer);