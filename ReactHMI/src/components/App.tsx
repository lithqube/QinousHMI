import * as React from "react";
import Navigation from "./nav/Navigation";
import FooterStats from "./FooterStats";
import FooterEvents from "./FooterEvents";
import ViewContainer from "./ViewContainer";
import ViewSelector from "./ViewSelector";

// import strings from "./../locale/en";
// import {LocalizedStrings} from "./../locale/LocalizedStrings";

// Component types
interface Props {}
interface State {}

// Component
export default class App extends React.Component<Props, State> {

    // static childContextTypes = {
    //     strings: React.PropTypes.object
    // }

    // getChildContext() {
    //     return {
    //         strings: strings
    //     };
    // }

    render() {
        return <div>
            <div className="header">
                <Navigation/>
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
