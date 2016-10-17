import * as React from "react";

interface Props {
    onCancel: () => void;
}
interface State {}

export default class Modal extends React.PureComponent<Props, State> {

    protected el: HTMLElement | undefined;

    didClick = event => {
        // Only call onCancel if user clicked directly on the backdrop,
        // not on a DOM element contained by it.
        if (event.target === this.el) {
            this.props.onCancel();
        }
    }

    didMountElement = element => {
        this.el = element;
    }

    render() {
        return <div className="modal" ref={this.didMountElement} onClick={this.didClick}>{this.props.children}</div>;
    }
}
