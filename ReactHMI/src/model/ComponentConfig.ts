/**
 * Holds all configurable things and special cases regarding components.
 */
import ComponentNode, { ComponentType } from "./ComponentNode";
import { EventDP } from "./Event";
import * as EventConfig from "./EventConfig";


/**
 * Defines all commonly used datapoints for a ComponentNode.
 * 
 * This class includes all rules for common datapoints when it comes to different component types.
 * Keep using this single class and its if-statements to see all the rules in one place.
 * A more abstract solution (subclasses for different types or something similar) will make it more
 * difficult to get a quick overview over all special cases around datapoints.
 * 
 * In short: This is messy because all special cases for datapoints are in 1 place. We should keep it that way
 * because it gives a good overview over the current "state of things".
 */
export class CommonDP {
    readonly config: string;
	readonly task: string;
    protected node: ComponentNode;

    constructor(node: ComponentNode) {
        this.node = node;
        this.task = `/${node.task.name}/`;
		this.config = this.task + getConfigDP(node.type, node.index);
    }

	// TODO optimize this, called very often
	// TODO should do the same thing for config... batterystrings don't have one though..
	get data(): string {
		if (this.node.type === ComponentType.BatteryString) {
			if (!this.node.parent) {
				// Provoke helpful error message if this dp is used with webMI
				return "MISSING_DATADP_BECAUSE_BATTERY_STRING_HAS_NO_PARENT_NODE";
			}
			return this.node.parent.dp.data + getDataDP(this.node.type, this.node.index);
		}
		return this.task + getDataDP(this.node.type, this.node.index);
	}

    get mainsConnected() {
        return `${this.data}.Overview.MainsConnected`;
    }

    get power_kW() {
		if (this.node.isConsumer) {
            return `${this.data}.Overview.FilteredCons_kW`;
        }
        return `${this.data}.Overview.FilteredGen_kW`;
    }

    get reactivePower_kvar() {
        if (this.node.type === ComponentType.BCU) {
            return `${this.data}.Converter.AC.ReactivePower_kvar`;
        }
        return `${this.data}.Live.ReactivePower_kvar`;
    }

    get nomConsCap_kW() {
		if (this.node.type === ComponentType.BatteryString) {
			if (!this.node.parent) {
				// Provoke helpful error message if this dp is used with webMI
				return "MISSING_CONFIGDP_BECAUSE_BATTERY_STRING_HAS_NO_PARENT_NODE";				
			}
			return `${this.node.parent.dp.config}.Properties.Battery.MaxContPowerPerString_kW`;
		}
        if (this.node.type === ComponentType.BCU) {
            return `${this.config}.Properties.Converter.Nominal.NomConsCap_kW`;
        }
        return `${this.config}.Properties.Capacity.NomConsCap_kW`;
    }

    get nomGenCap_kW() {
		if (this.node.type === ComponentType.BatteryString) {
			return this.nomConsCap_kW;
		}
        if (this.node.type === ComponentType.BCU) {
            return `${this.config}.Properties.Converter.Nominal.NomGenCap_kW`;
        }
        return `${this.config}.Properties.Capacity.NomGenCap_kW`;
    }
}

export function getConfigDP(type: ComponentType, index: number): string {
	switch(type){
		case(ComponentType.System):
			return ".SystemCfg";
		// case(ComponentType.PVGroup):
		// 	return undefined;// "PVGroupConfig";
		// case(ComponentType.ConsumerGroup):
		// 	return undefined;// "ConsumerGroupC
		case(ComponentType.Grid):
			return ".GridCfg";
		case(ComponentType.BCUGroup):
			return ".BatteryGroupCfg";
		case(ComponentType.DieselGroup):
			return ".DieselGroupCfg";
		case(ComponentType.PV):
			return ".PVCfg["+index+"]";
		case(ComponentType.Consumer):
			return ".ConsumerCfg["+index+"]";
		case(ComponentType.BCU):
			return ".BCUCfg["+index+"]";
		case(ComponentType.Diesel):
			return ".DieselCfg["+index+"]";
		case(ComponentType.BatteryString):
			return ".Battery";
        default:
            // Provoke helpful error message if (and only if) this dp is used later to reach an address.
            return `CONFIG_DP_FOR_${ComponentType[type]}_NOT_SET`;
	}
}

function getDataDP(type: ComponentType, index: number): string {
	switch(type){
		case(ComponentType.System):
			return ".SystemData";
		case(ComponentType.PVGroup):
			return ".PVGroupData";
		case(ComponentType.ConsumerGroup):
			return ".ConsumerGroupData";
		case(ComponentType.Grid):
			return ".GridData";
		case(ComponentType.BCUGroup):
			return ".BatteryGroupData";
		case(ComponentType.DieselGroup):
			return ".DieselGroupData";
		case(ComponentType.PV):
			return ".PVData["+index+"]";
		case(ComponentType.Consumer):
			return ".ConsumerData["+index+"]";
		case(ComponentType.BCU):
			return ".BCUData["+index+"]";
		case(ComponentType.Diesel):
			return ".DieselData["+index+"]";
		case(ComponentType.BatteryString):
			return ".Battery.Strings["+index+"]";
        default:
            // Provoke helpful error message if (and only if) this dp is used later to reach an address.
            return `DATA_DP_FOR_${ComponentType[type]}_NOT_SET`;
	}
}

// const m: Map<ComponentType, Assoc> = new Map([
// 	[ComponentType.System, _ => ".SystemData"]
// ]);


export function getStandardEventDPs(node: ComponentNode): EventDP[] {
    switch(node.type) {
        case ComponentType.System:
            return [
                new EventDP(".AlarmWord", node, EventConfig.SystemEvents)
            ];
        case ComponentType.BCU:
            return [
                new EventDP(".AlarmWord", node, EventConfig.BCUEvents)
            ]
        default:
            return [];
    }
}


