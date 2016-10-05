import * as React from "react";

interface Props {
    svg?: string // SVG source
}
interface State {}

export default class Icon extends React.PureComponent<Props, State> {
    render() {
        const rawSVG = {
            __html: this.props.svg ? this.props.svg : ""
        };
        return <div className="icon" dangerouslySetInnerHTML={rawSVG}></div>
    }
}