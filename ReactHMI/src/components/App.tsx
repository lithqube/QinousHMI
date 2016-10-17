import * as React from "react";
import { connect } from "react-redux";
import Navigation from "./nav/Navigation";
import FooterStats from "./FooterStats";
import FooterEvents from "./FooterEvents";
import ViewContainer from "./ViewContainer";
import ViewSelector from "./ViewSelector";
import Auth from "./Auth";
import Home from "./Home";
import { fetchComponentTree } from "../model/store/Actions";
import store from "../model/store/Store";
import "../model/UserService";

interface Props {}
interface State {}

class App extends React.Component<Props, State> {

    componentDidMount() {
        store.dispatch(fetchComponentTree());
    }

    render() {
        return <div>
            <div className="header">
                <Home/>
                <Navigation/>
                <Auth/>
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

export default connect()(App);
