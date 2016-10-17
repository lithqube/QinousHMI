import * as React from "react";
import { connect } from "react-redux";
import { User, AuthState } from "../model/UserService";
import { login, logout } from "../model/store/Actions";
import Login from "./Login";

interface Props {
    user: User | undefined;
    authState: AuthState;
    onLogout: () => void;
    onLogin: (name: string, password: string) => void;
}

interface State {
    showsLoginDialog: boolean
}

class Auth extends React.Component<Props, State> {

    constructor() {
        super();
        this.state = {
            showsLoginDialog: false
        };
    }

    didClickLogout = () => {
        this.props.onLogout();
    }

    didClickLogin = () => {
        this.setState({ showsLoginDialog: true });
    }

    didCancelLoginDialog = () => {
        this.setState({ showsLoginDialog: false });        
    }

    didSubmitLogin = (username: string, password: string) => {
        this.props.onLogin(username, password);
        this.setState({ showsLoginDialog: false });
    }

    render() {
        const { user, authState } = this.props;
        let info: JSX.Element | undefined;
        let dialog: JSX.Element | undefined;
        switch(authState) {
            case AuthState.Ready:
                info = user ? <button onClick={this.didClickLogout}>Logout {user.name}</button> : <button onClick={this.didClickLogin}>Login</button>
                break;
            case AuthState.LoggingIn:
                info = <button disabled>Login…</button>;
                break;
            case AuthState.LoggingOut:
                info = <button disabled>Logout…</button>;
                break;
        }
        if (this.state.showsLoginDialog) {
            dialog = <Login onSubmit={this.didSubmitLogin} onCancel={this.didCancelLoginDialog}/>
        }
        return <div className="auth">{info}{dialog}</div>
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    authState: state.authState
});

const mapDispatchToProps = (dispatch) => ({
    onLogout: () => dispatch(logout()),
    onLogin: (name: string, password: string) => dispatch(login(name, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
