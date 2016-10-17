import * as React from "react";
import Modal from "./Modal";

interface Props {
    title: string;
    onCancel: () => void;
}
interface State {}

export default class Dialog extends React.Component<Props, State> {

    didCancel = () => {
        this.props.onCancel();
    }

    render() {
        return <Modal onCancel={this.didCancel}>
            <div className="dialog">
                <div className="title">{this.props.title}</div>
                <div className="body">
                    {this.props.children}
                </div>
            </div>
        </Modal>
    }
}
