/**
 * Displays hint when there are events above a certain level,
 * shows overview on click.
 */
import * as React from "react";
import { connect } from "react-redux";
import { EventInfo } from "./../model/EventService";
import { Level } from "./../model/Event";
import sort from "./../common/sort";
import Icon from "./Icon";
import * as classNames from "classnames";
const svgAlert = require("!raw!../resources/icons/alert.svg");

const mapStateToProps = (state) => ({
    events: state.activeEvents
});

interface Props {
    events: EventInfo[] | undefined
}
interface State {
    opened: boolean
}

class FooterEvents extends React.Component<Props, State> {
    
    state = {
        opened: false
    };

    // TODO should also close panel on click outside of panel
    onClickSymbol = () => {
        this.setState({
            opened: !this.state.opened
        });
    };

    // TODO also: GET a better name
    getSymbol() {
        const { events } = this.props;
        let symbol: JSX.Element | undefined;
        if (events === undefined) {
            symbol = <div className="symbol">…</div>
        }
        else if (events.length === 0) {
            symbol = <div className="symbol no-events"><Icon svg={svgAlert}/></div>
        }
        else if (events.length > 0) {
            symbol = <div className="symbol" onClick={this.onClickSymbol}>
                <div className="count">{events.length}</div>
                <Icon svg={svgAlert}/>
            </div>
        }
        return symbol;
    }

    getPanel() {
        const { events } = this.props;
        if (!this.state.opened || events === undefined || events.length === 0) {
            return undefined;
        }
        // Display events sorted by level
        const displayedEvents = sort(events, "level");
        const panelEntries = displayedEvents.map((event, index) => {
            // For each event, show colored alert icon, owner name and event name.
            // The icon color is set in CSS based on the event level, see events.scss where e.g.
            // there is a color defined for the class "level error".
            const iconClasses = "level " + Level[event.level].toLowerCase();
            return <li key={index} className={iconClasses}><Icon svg={svgAlert}/><div>{event.owner.name}: {event.name}</div></li>
        });
        return <div className="panel">
            <div className="title">Active Events</div>
            <ol>{panelEntries}</ol>
        </div>;     
    }

    render() {
        const symbol = this.getSymbol();
        const panel = this.getPanel();
        return <div className="footer-events">{symbol}{panel}</div>;
    }
}

export default connect(mapStateToProps)(FooterEvents)
