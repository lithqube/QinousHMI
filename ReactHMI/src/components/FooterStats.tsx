/**
 * Shows a collection of live stats.
 */
import * as React from "react";
import { connect } from "react-redux";
import ComponentNode, {ComponentType} from "./../model/ComponentNode";
import LiveValue from "./LiveValue";

// Connect component to Redux
const mapStateToProps = (state) => ({
    systemNode: state.systemNode
});
const mapDispatchToProps = (dispatch) => ({
});

// Component types
interface Props {
    systemNode: ComponentNode | undefined
}
interface State {}

// Component
class FooterStats extends React.PureComponent<Props, State> {

    getStat(title: string, dp: string, unit: string) {
        return <div className="stat" key={dp}>{title}: <LiveValue dp={dp}/> {unit}</div>
    }

    getDefaultStatsForNodes(nodes: ComponentNode[]) {
        const stats: JSX.Element[] = [];
        nodes.forEach(node => {
            const title = node.name;//.substr(0, 6);
            stats.push(this.getStat(title, node.dp.power_kW, "kW"));
            const isBattery = node.type === ComponentType.Battery || node.type === ComponentType.BatteryGroup;
            if (isBattery) {
                stats.push(this.getStat("SOC", node.dp.data + ".Battery.AvailableSOC", "%"));
                stats.push(this.getStat("SOE", node.dp.data + ".Battery.AvailableSOE", "kWh"));
            }
        });
        return stats;
    }

    render() {
        const { systemNode } = this.props;
        let stats: JSX.Element[] = [];
        if (systemNode) {
            stats = [
                this.getStat("Voltage", systemNode.dp.data + ".GridVoltage", "V"),
                this.getStat("Freq", systemNode.dp.data + ".GridFrequency", "Hz")
            ];
            stats = stats.concat(this.getDefaultStatsForNodes(systemNode.subComponents));
        }
        return <div className="footer-stats">{stats}</div>;
    }
}

export default connect(mapStateToProps)(FooterStats);