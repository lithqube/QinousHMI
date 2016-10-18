/**
 * Shows diagrams for component nodes.
 */
import * as React from "react";
import { connect } from 'react-redux';
import ComponentNode, { ComponentType } from "../../model/ComponentNode";

interface Props {
    activeNode: ComponentNode | undefined;
}

class Diagram extends React.Component<Props, {}> {
        
    render() {
        const { activeNode } = this.props;

        return <div className="diagram">
            Welcome to diagram
        </div>;
    }
}

const mapStateToProps = (state) => ({
    activeNode: state.activeNode
});

export default connect(mapStateToProps)(Diagram)
