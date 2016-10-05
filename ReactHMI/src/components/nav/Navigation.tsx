import * as React from "react";
import { connect } from 'react-redux';
import NavigationNode from "./NavigationNode";
import ComponentNode from "../../model/ComponentNode";
import { setActiveNode } from "../../model/Actions";

// Connect to Redux
const mapStateToProps = (state) => ({
    systemNode: state.systemNode,
    activeNode: state.activeNode
});
const mapDispatchToProps = (dispatch) => ({
    onSelectNode: (node) => dispatch(setActiveNode(node))
});

// Component types
interface Props {
    systemNode: ComponentNode | undefined;
    activeNode: ComponentNode | undefined;
    onSelectNode: (node: ComponentNode) => void;
}

// Component
class Navigation extends React.Component<Props, {}> {
    
    createNavigationNode = (node: ComponentNode): JSX.Element => {
        return <NavigationNode key={node.type} node={node} activeNode={this.props.activeNode} onSelect={this.props.onSelectNode}/>;
    }

    didClickHome = () => {
        if (this.props.systemNode) {
            this.props.onSelectNode(this.props.systemNode);
        }
    }

    render() {
        const { systemNode } = this.props;
        const topLevelComponents = systemNode ? systemNode.subComponents : [];
        const navEntries = topLevelComponents.map(this.createNavigationNode);
        return <div className="nav">
            <div className="home" title="Home" onClick={this.didClickHome}></div>
            {navEntries}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
