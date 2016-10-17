import * as React from "react";
import Dialog from "./common/Dialog";

interface Props {
    onCancel: () => void;
    onSubmit: (username: string, password: string) => void;
}
interface State {
    name?: string;
    password?: string;
}

export default class Login extends React.Component<Props, State> {
    
    constructor() {
        super();
        this.state = {
            name: "",
            password: ""
        };
    }

    didCancel = () => {
        this.props.onCancel();
    }

    didSubmit = event => {
        const { name, password } = this.state;
        this.props.onSubmit(name!, password!); // name and password are only optional to allow setState, we can rely on them being always set.
        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    didChangeText = event => {
        let change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    firstInputDidMount = element => {
        if (element) element.focus();
    }
    
    render() {
        const { name, password } = this.state;
        const submitDisabled = name === "" || password === "";
        return <Dialog title="Login" onCancel={this.didCancel}>
            <form onSubmit={this.didSubmit}>
                <div className="label">Username</div>
                <input type="text" name="name" value={this.state.name} onChange={this.didChangeText} ref={this.firstInputDidMount}/>
                <div className="label">Password</div>
                <input type="password" name="password" value={this.state.password} onChange={this.didChangeText}/>
                <div className="actions">
                    <input type="button" onClick={this.didCancel} value="Cancel"/>
                    <input type="submit" disabled={submitDisabled} value="Login"/>
                </div>
            </form>
        </Dialog>;
    }
}
