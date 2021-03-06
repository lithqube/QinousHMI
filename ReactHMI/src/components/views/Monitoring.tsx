/**
 * Shows monitoring values for component nodes. Offers navigation between them.
 */
import * as React from "react";
import { connect } from 'react-redux';
import MonitoringNode from "./MonitoringNode";
import MonitoringSystemNode from "./MonitoringSystemNode";
import ComponentNode, { ComponentType } from "../../model/ComponentNode";
import Carousel from "../common/Carousel";
import { setActiveNode } from "../../model/store/Actions";

// Connect to Redux
const mapStateToProps = (state) => ({
    activeNode: state.activeNode
});
const mapDispatchToProps = (dispatch) => ({
    onSelectNode: (node) => dispatch(setActiveNode(node))
});

// Component types
interface Props {
    activeNode: ComponentNode | undefined;
    onSelectNode: (node: ComponentNode) => void;
}

// Component
class Monitoring extends React.Component<Props, {}> {
    
    didSelectNode = (node) => {
        this.props.onSelectNode(node);
    }

    elementForNode = (node: ComponentNode, isActive = false): JSX.Element => {
        if (node.type === ComponentType.System) {
            return <MonitoringSystemNode node={node}/>
        }
        return <MonitoringNode key={node.name} onSelect={this.didSelectNode} node={node} isActive={isActive}/>
    }
    
    render() {
        const { activeNode } = this.props;
        const activeElement = activeNode ? this.elementForNode(activeNode, true) : undefined;
        let subComponents: JSX.Element[] | undefined;
        if (activeNode) {
            subComponents = activeNode.subComponents.map(node => this.elementForNode(node));
        }
        const numPages = subComponents ? subComponents.length : 0;
        return <div className="monitoring">
            <div className="active-node">
                {activeElement}
            </div>
            <Carousel pageSize={200} pageMargin={20} numPages={numPages}>
                <div className="child-nodes">{subComponents}</div>
            </Carousel>
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring)
