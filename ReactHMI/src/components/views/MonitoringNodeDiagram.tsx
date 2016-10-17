import * as React from "react";
import * as WebMI from "../../model/WebMI";
import ComponentNode from "../../model/ComponentNode";
import Icon from "../common/Icon";
import iconForType from "../utils/iconForType";
import MonitoringArrows from "./MonitoringArrows";

interface Props {
    node: ComponentNode;
    isActive: boolean;
}

interface State {
    power?: number;
    connected?: boolean;
    loading?: boolean;
}

export default class MonitoringNodeDiagram extends React.Component<Props, State> {
    
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
            let power: number | undefined;
            const filteredCons = values[1];
            const nomConsCap = values[2];
            const nomGenCap = values[3];
            if (filteredCons !== undefined && nomConsCap !== undefined && nomGenCap !== undefined) {            
                power = powerFunc(WebMI.resultAsNumber(filteredCons), WebMI.resultAsNumber(nomConsCap), WebMI.resultAsNumber(nomGenCap));
                if (isNaN(power)) {
                    power = 0;
                };
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

    render() {
        const { node, isActive } = this.props;
        const { connected, loading } = this.state;
        let power: number | undefined = this.state.power;
        if (power !== undefined && node.isConsumer) {
            power = -power; // Turn arrows upside down for consumers
        }
        const svg = iconForType(node.type);
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

        return <div className="visualization">
            <div className="connector top">
                <div className="horizontal-line"></div>
                <div className="vertical-line"></div>
                {connectionTop}
            </div>
            <Icon svg={svg}/>
            {connectionBottom}
        </div>
    }
}

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