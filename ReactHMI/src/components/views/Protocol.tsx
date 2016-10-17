import * as React from "react";
import { connect } from 'react-redux';
import ComponentNode, { ComponentType } from "../../model/ComponentNode";
import { EventInfo } from "../../model/EventService";
import { Level } from "../../model/Event";
import sort from "../../common/sort";

// Connect to Redux
const mapStateToProps = (state) => ({
    node: state.activeNode,
    events: state.activeEvents
});

// Component types
interface Props {
    node: ComponentNode | undefined;
    events: EventInfo[] | undefined;
}

interface State {
    sortDescriptor?: string;
}

// Component
class Protocol extends React.Component<Props, State> {

    state = {
        sortDescriptor: "level"
    }

    rowForEvent(info: EventInfo, index: number): JSX.Element {
        return <tr key={index}>
            <td>{Level[info.level]}</td>
            <td>{info.owner.name}</td>
            <td>{info.name}</td>
        </tr>;
    }

    title(node: ComponentNode | undefined): JSX.Element {
        if (node) {
            return <div className="title">Active Events for {node.name.toUpperCase()}</div>
        }
        return <div className="title">No component selected.</div>
    }

    render() {
        const { node, events } = this.props;
        let body: JSX.Element;
        let relevantEvents: EventInfo[] = [];
        if (node !== undefined && events !== undefined) {
            relevantEvents = events.filter(info => node.contains(info.owner));
            relevantEvents = sort(relevantEvents, this.state.sortDescriptor);
        }
        if (relevantEvents.length > 0) {
            const rows = relevantEvents.map(this.rowForEvent);
            body = <table>
                <thead><tr>
                    <th>Level</th>
                    <th>Owner</th>
                    <th>Description</th>
                </tr></thead>
                <tbody>
                    {rows}
                </tbody>
            </table>;
        }
        else {
            body = <div className="no-entries">No events</div>;
        }
        const title: JSX.Element = this.title(node);
        return <div className="protocol">
            {title}
            {body}
        </div>
    }
}

export default connect(mapStateToProps)(Protocol)
