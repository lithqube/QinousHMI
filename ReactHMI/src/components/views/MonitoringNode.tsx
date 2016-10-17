import * as React from "react";
import ComponentNode from "../../model/ComponentNode";
import MonitoringNodeStats from "./MonitoringNodeStats";
import MonitoringNodeDiagram from "./MonitoringNodeDiagram";

interface Props {
    node: ComponentNode;
    isActive: boolean;
    onSelect: (node: ComponentNode) => void;
}

interface State {}

export default class MonitoringNode extends React.Component<Props, State> {
    
    protected didClickNode = () => {
        this.props.onSelect(this.props.node);
    }

    render() {
		const { node, isActive } = this.props;
        return <div className="node" title={node.name} onClick={this.didClickNode}>
            <MonitoringNodeDiagram node={node} isActive={isActive}/>
            <MonitoringNodeStats node={node} isActive={isActive}/>               
        </div>
    }
}
