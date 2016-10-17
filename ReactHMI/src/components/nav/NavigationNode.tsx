import * as React from "react";
import * as classNames from "classnames";
import ComponentNode, {ComponentType} from "../../model/ComponentNode";
import iconForType from "../utils/iconForType";
import Icon from "../common/Icon";

interface Props {
    node: ComponentNode;
    activeNode: ComponentNode | undefined;
    onSelect: (node: ComponentNode) => void;
}
interface State {}


export default class NavComponentNode extends React.PureComponent<Props, State> {
    
    protected didClick = () => {
        this.props.onSelect(this.props.node);
    }
    
    render() {
        const { node, activeNode } = this.props;
        const svg = iconForType(node.type);
        let selected = false;
        if (node === activeNode || (node.parent && activeNode && node.contains(activeNode))) {
            selected = true;
        }
        const className = classNames("node", {selected: selected});
        return <div onClick={this.didClick} className={className} title={node.name}>
            <Icon svg={svg}/>
        </div>
    }
}
