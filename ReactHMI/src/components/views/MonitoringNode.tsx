import * as React from "react";
import ComponentNode, {ComponentType} from "../../model/ComponentNode";
import * as WebMI from "../../model/WebMI";
import iconForType from "../utils/iconForType";
import Icon from "../Icon";
import LiveValue from "../LiveValue";
import MonitoringArrows from "./MonitoringArrows";

// HACKY, refactor this as soon as all details known

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

// TODO move this to ComponentNode
function powerOfConsumer(filteredCons: number, nomConsCap: number, nomGenCap: number) {
    if (filteredCons > 0) {
        return filteredCons / nomConsCap;
    }
    return filteredCons / nomGenCap;
}

function powerOfGenerator(filteredGen: number, nomConsCap: number, nomGenCap: number) {   
    if (filteredGen < 0) {
        return filteredGen / nomConsCap;
    }
    return filteredGen / nomGenCap;
}

function statElement(title: string, dp: string, unit: string) {
    return <li key={dp}>{title}: <LiveValue dp={dp}/> {unit}</li>
}

function overviewState(node: ComponentNode) {
    const dp = node.dp.data + ".Overview.State";
    return <li key={dp}><LiveValue dp={dp} map={textForOverviewState}/></li>
}

function powerState(node: ComponentNode) {
    return <li key={node.dp.power_kW}>
        <LiveValue dp={node.dp.power_kW}/> kW / <LiveValue dp={node.dp.reactivePower_kvar}/> kvar
    </li>
}

interface Props {
    node: ComponentNode;
    isActive: boolean;
    onSelect: (node: ComponentNode) => void;
}
interface State {
    power?: number;
    connected?: boolean;
    loading?: boolean;
}


export default class MonitoringNode extends React.Component<Props, State> {
    protected powerSubscription?: WebMI.GroupSubscription;
    state = {
        power: undefined,
        connected: undefined,
        loading: false
    };

    componentDidMount() {
        this.subscribe(this.props);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    componentWillReceiveProps(nextProps: Props) {
        this.subscribe(nextProps);
    }

    subscribe(props: Props) {
        this.setState({ loading: true });
        this.unsubscribe();
        const node = props.node;
        const dps = [
            node.dp.mainsConnected,
            node.dp.power_kW,
            node.dp.nomConsCap_kW,
            node.dp.nomGenCap_kW
        ];
        const powerFunc = node.isConsumer ? powerOfConsumer : powerOfGenerator;
        this.powerSubscription = WebMI.subscribeGroup(dps, (values, error) => {
            //let power = node.normalizedPower(values[1], values[2], values[3])
            let power = powerFunc(values[1]!, values[2]!, values[3]!);
            if (isNaN(power)) {
                power = 0;
            } 
            let connected: boolean | undefined;
            if (values[0] !== undefined) {
                connected = values[0] ? true : false;
            }
            this.setState({
                connected: connected,
                power: power,
                loading: false
            });
        });
    }

    unsubscribe() {
        if (this.powerSubscription) {
            this.powerSubscription.unsubscribe();
        }
    }

    protected didClickNode = () => {
        this.props.onSelect(this.props.node);
    }

    protected statsForNode = (node: ComponentNode): JSX.Element[] => {
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
            case ComponentType.Battery:
            case ComponentType.BatteryGroup:
                return [
                    statElement("Setpoint", dp + ".ControlStatus.ActivePowerSetpoint", "kWh"),
                    statElement("SOE", dp + ".Battery.AvailableSOE", "kWh"),
                    statElement("Delivered AC", dp + ".Converter.AC.TotalDelivered_kWh", "kWh"),
                    statElement("Charged AC", dp + ".Converter.AC.TotalConsumed_kWh", "kWh")  
                ];
            case ComponentType.SamsungRack:
                return [
                    statElement("SOC", dp + ".RackSOC", "%"),
                    statElement("Voltage", dp + ".RackVoltage", "V"),
                    statElement("Ave Cell Temp", dp + ".AverageCellTemperature", "°C")
                ];
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

    render() {
        // TODO separate stats and visualization into two components
		const { node, isActive } = this.props;
        const { power, connected, loading } = this.state;
        const svg = iconForType(node.type);
        let stats = [
            overviewState(node),
            powerState(node)
        ];
        stats = stats.concat(this.statsForNode(node));
        if (!isActive) {
            stats = stats.slice(0, 3);
        }
        let connectionTop: JSX.Element | undefined;
        if (loading) {
            connectionTop = <div className="disconnected loading"></div>;
        }
        else if (connected === undefined) {
            connectionTop = <div className="disconnected error"></div>;
        }
        else if (connected === false) {
            const smallArrows = power ? <MonitoringArrows power={power}/> : undefined;
            connectionTop = <div className="disconnected switch">{smallArrows}</div>;
        }
        else if (power) { // not undefined and not 0
            connectionTop = <MonitoringArrows power={power}/>;
        }
        let connectionBottom: JSX.Element | undefined;
        if (isActive && node.hasSubComponents) {
            connectionBottom = <div className="connector bottom"><div className="vertical-line"></div></div>;
        }  
        return <div className="node" title={node.name} onClick={this.didClickNode}>
            <div className="visualization">
                <div className="connector top">
                    <div className="horizontal-line"></div>
                    <div className="vertical-line"></div>
                    {connectionTop}
                </div>
                <Icon svg={svg}/>
                {connectionBottom}
            </div>
            <div className="info">
                <div className="title">{node.name}</div>
                <ol className="stats">{stats}</ol>
            </div>                
        </div>
    }
}


