import * as React from "react";
import { connect } from 'react-redux';
import ComponentNode, { ComponentType } from "../../model/ComponentNode";

// Connect to Redux
const mapStateToProps = (state) => ({
    activeNode: state.activeNode
});

// Component types
interface Props {
    activeNode: ComponentNode | undefined;
}

// Component
class Protocol extends React.Component<Props, {}> {
        
    render() {
        return <div className="protocol">Protocol View</div>
    }
}

export default connect(mapStateToProps)(Protocol)
