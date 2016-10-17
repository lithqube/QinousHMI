/**
 * Draws arrows for given power (value between -1 and 1). Right now, we use 3
 * arrows as follows:
 * 1 arrow: 0 <= power < 1/3 (arrow invisible at 0 is not handled by this component, the component using this should do that)
 * 2 arrows: 1/3 <= power < 2/3
 * 3 arrows: 2/3 <= power <= 1
 */
import * as React from "react";
import * as classNames from "classnames";
import Icon from "../common/Icon";
const svgArrow = require("!raw!../../resources/icons/power_arrow.svg");

interface Props {
    power: number; // Range -1 to 1
}
interface State {}

export default class MonitoringArrows extends React.PureComponent<Props, State> {
    
    shouldComponentUpdate(nextProps: Props) {
        return nextProps.power !== this.props.power;
    }

    render() {
        const numArrows = 3;
        const absPower = Math.abs(this.props.power);
        const numActiveArrows = Math.min(Math.ceil(absPower * numArrows), numArrows);
        const directionDown = this.props.power < 0;
        const arrows: JSX.Element[] = [];
        for (let i = 0; i < numArrows; i++) {
            const isActive = i < numActiveArrows;
            const className = classNames("arrow", { active: isActive});
            const arrow = <div key={i} className={className}><Icon svg={svgArrow}/></div>;
            arrows.push(arrow);
        }
        const className = classNames("arrows", { down: directionDown });
        return <div className={className}>
            {arrows} 
        </div>
    }
}
