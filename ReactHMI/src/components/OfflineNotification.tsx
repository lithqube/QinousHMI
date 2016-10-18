import * as React from "react";
import { ConnectionState } from "../model/ConnectionService";

interface Props {
    connection: ConnectionState
}
interface State {}

export default class OfflineNotification extends React.PureComponent<Props, State> {
    
    didClickReload = () => {
        document.location.reload(true);
    }

    actionForState(state: ConnectionState): JSX.Element | undefined {
        switch(state) {
            case ConnectionState.Offline:
                return <div className="action">Trying to reconnect…<div className="loader"></div></div>;
            case ConnectionState.RecommendReload:
                return <div className="action"><button onClick={this.didClickReload}>Reload now</button></div>
            default:
                return undefined;
        }        
    }

    infoForState(state: ConnectionState): string {
        switch(state) {
            case ConnectionState.Offline:
                return "Connection lost! Displayed values might not be current anymore.";
            case ConnectionState.RecommendReload:
                return "Connection lost! The current session is invalid and displayed values might not be correct. Please reload now.";
            default:
                return "";        
        }
    }
    
    render() {
        const { connection } = this.props;
        const action = this.actionForState(connection);
        const info = this.infoForState(connection);
        return <div className="offline-notification">
            <div className="info">{info}</div>
            {action}
        </div>;
    }
}
