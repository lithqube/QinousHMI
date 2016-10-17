import * as React from "react";
import ComponentNode, {ComponentType} from "../../model/ComponentNode";
import LiveValue from "../LiveValue";

interface Props {
    node: ComponentNode;
}

interface State {    
}


export default class MonitoringSystemNode extends React.PureComponent<Props, State> {

    render() {
		const { node } = this.props;
        const stats = [
            statElement("Voltage", node.dp.data + ".GridVoltage", "V"),
            statElement("Frequency", node.dp.data + ".GridFrequency", "Hz")
        ];
        return <div className="node system" title={node.name}>
            <div className="info">
                <div className="title">{node.name}</div>
                <ol className="stats">{stats}</ol>
            </div>                
        </div>
    }
}

function statElement(title: string, dp: string, unit: string) {
    return <li key={dp}>{title}: <LiveValue dp={dp}/> {unit}</li>
}
