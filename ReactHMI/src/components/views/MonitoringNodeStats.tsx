import * as React from "react";
import ComponentNode, { ComponentType } from "../../model/ComponentNode";
import LiveValue from "../LiveValue";

interface Props {
    node: ComponentNode
    isActive: boolean
}

interface State {}

export default class MonitoringNodeDiagram extends React.Component<Props, State> {
    
    render() {
        const { node, isActive } = this.props;
        let stats = [
            overviewState(node),
            powerState(node)
        ];
        stats = stats.concat(statsForNode(node));
        if (!isActive) {
            stats = stats.slice(0, 3);
        }
        return <div className="info">
            <div className="title">{node.name}</div>
            <ol className="stats">{stats}</ol>
        </div>   
    }
}

const stateLabels = {
    1: "Initializing",
    2: "Communication Check",
    3: "No Communication",
    4: "Connected",
    5: "Off",
    6: "Shutting Down",
    7: "Configuring Parameters",
    8: "Standby",
    9: "Starting Up",
    10: "Faulted",
    11: "Running",
    12: "Connecting Subcomponent",
    13: "Disconnecting Subcomponent",
    14: "Unknown"
}

function textForOverviewState(stateValue: any): string {
    const value = parseInt(stateValue, 10);
    const label = stateLabels[value];
    return label ? label : `(${stateValue})`;
}

function statsForNode(node: ComponentNode): JSX.Element[]  {
    const dp = node.dp.data;
    switch(node.type) {
        case ComponentType.Diesel:
        case ComponentType.DieselGroup:
            return [
                statElement("Apparent Power", dp + ".Live.ApparentPower_kVA", "kVA"),
                statElement("PF", dp + ".Live.PowerFactor", ""),
                statElement("Fuel Level", dp + ".FuelLevel_pcnt", "%")
            ];
        case ComponentType.PV:
        case ComponentType.PVGroup:
            return [
                statElement("Active Power", dp + ".Live.TotalPower_kW", "kW"),
                statElement("Reactive Power", dp + ".Live.ReactivePower_kvar", "kvar"),
                statElement("PF", dp + ".Live.PowerFactor", "")
            ];
        case ComponentType.BCU:
        case ComponentType.BCUGroup:
            return [
                statElement("Setpoint", dp + ".ControlStatus.ActivePowerSetpoint", "kWh"),
                statElement("SOE", dp + ".Battery.AvailableSOE", "kWh"),
                statElement("Delivered AC", dp + ".Converter.AC.TotalDelivered_kWh", "kWh"),
                statElement("Charged AC", dp + ".Converter.AC.TotalConsumed_kWh", "kWh")  
            ];
        // case ComponentType.BatteryString:
        //     return [];
        case ComponentType.Consumer:
        case ComponentType.ConsumerGroup:
            return [
                statElement("Consumption", dp + ".Live.TotalPower_kW", "kW"),
                statElement("Consumed", dp + ".Live.TotalConsumed_kWh", "kWh")
            ];
        default: 
            return [];
    }
}

function statElement(title: string, dp: string, unit: string) {
    return <li key={dp}>{title}: <LiveValue dp={dp}/> {unit}</li>
}

function overviewState(node: ComponentNode) {
    const dp = node.dp.data + ".Overview.State";
    return <li key={dp}><LiveValue dp={dp} map={textForOverviewState}/></li>
}

function powerState(node: ComponentNode) {

    if (node.type === ComponentType.BatteryString) {
        return <li key={node.dp.power_kW}>
            <LiveValue dp={node.dp.power_kW}/> kW
        </li>
    }

    return <li key={node.dp.power_kW}>
        <LiveValue dp={node.dp.power_kW}/> kW / <LiveValue dp={node.dp.reactivePower_kvar}/> kvar
    </li>
}