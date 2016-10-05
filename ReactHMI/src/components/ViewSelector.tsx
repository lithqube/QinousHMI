/**
 * Show the available views and lets the user select one of them.
 */
import * as React from "react";
import { connect } from "react-redux";
import { setActiveView } from "../model/Actions";
import Icon from "./Icon";

// Redux: Listen to activeView
const mapStateToProps = (state) => ({
    activeView: state.activeView
});

// Redux: Set activeView
const mapDispatchToProps = (dispatch) => ({
    onSelectView: (view: string) => dispatch(setActiveView(view))
});

// Component Props
interface Props {
    activeView: string | undefined;
    onSelectView: (view: string) => void;
}
interface State {}

// Icons for each view
const viewIcons = {
    "Monitoring" : require("!raw!../resources/icons/view_monitoring.svg"),
    "Protocol" : require("!raw!../resources/icons/view_protocol.svg")
}

class ViewSelector extends React.PureComponent<Props, State> {

    protected availableViews = [
        "Monitoring",
        "Protocol"
    ];

    didClickSelector(view: string) {
        this.props.onSelectView(view);
    }

    render() {
        const entries = this.availableViews.map((entry, index) => {
            const icon = viewIcons[entry];
            const className = entry === this.props.activeView ? "active" : ""; 
            const onClick = () => this.didClickSelector(entry);
            return <li key={index} onClick={onClick} className={className}><Icon svg={icon}/></li>
        })
        return <div className="view-selector">
            <ol>{entries}</ol>  
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelector);