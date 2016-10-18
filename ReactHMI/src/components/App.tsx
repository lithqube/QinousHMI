import * as React from "react";
import { connect } from "react-redux";
import Navigation from "./nav/Navigation";
import FooterStats from "./FooterStats";
import FooterEvents from "./FooterEvents";
import ViewContainer from "./ViewContainer";
import ViewSelector from "./ViewSelector";
import OfflineNotification from "./OfflineNotification";
import Auth from "./Auth";
import Home from "./Home";
import { fetchComponentTree, AppState } from "../model/store/Actions";
import store from "../model/store/Store";
import "../model/UserService";
import { startTrackingConnectionState, ConnectionState } from "../model/ConnectionService";

interface Props {
    connection: ConnectionState
}
interface State {}

class App extends React.Component<Props, State> {

    componentDidMount() {
        startTrackingConnectionState();
        store.dispatch(fetchComponentTree());
    }

    render() {
        const connection = this.props.connection;
        const isOffline = connection !== ConnectionState.Online;
        const className = isOffline ? "offline" : "";
        const notification = isOffline ? <OfflineNotification connection={connection}/> : undefined;
        const auth = isOffline ? undefined : <Auth/>
        return <div className={className}>
            {notification}
            <div className="header">
                <Home/>
                <Navigation/>
                {auth}
            </div>
            <div className="main">
                <ViewSelector/>
                <ViewContainer/>
            </div>
            <div className="footer">
                <FooterStats/>
                <FooterEvents/>
            </div>
        </div>;
    }
}

const mapStateToProps = (state: AppState) => ({
    connection: state.connectionState,
});

export default connect(mapStateToProps)(App);
