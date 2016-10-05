import * as React from "react";
import ComponentNode, {ComponentType} from "../../model/ComponentNode";

interface Props {
    node: ComponentNode;
}
interface State {}

export default class MonitoringSystemNode extends React.PureComponent<Props, State> {

    render() {
		const { node } = this.props;
        return <div className="node system" title={node.name}>
            <div className="info">
                <div className="title">{node.name}</div>
            </div>                
        </div>
    }
}
