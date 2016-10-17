import * as React from "react";

interface Props {}
interface State {}

export default class Home extends React.PureComponent<Props, State> {
    
    didClick = () => {
        document.location.reload(true);
    }
    
    render() {
        return <div className="home" title="Refresh" onClick={this.didClick}></div>;
    }
}
