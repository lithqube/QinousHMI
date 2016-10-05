import ComponentNode, { ComponentType } from "./ComponentNode";
import { EventDP } from "./Event";
import * as EventConfig from "./EventConfig";

/**
 * Defines all commonly used datapoints for a ComponentNode.
 * 
 * This class includes all rules for common datapoints when it comes to different component types. 
 * Keep using this single class and its if-statements in order to see all the rules in one place.
 * A more abstract solution (subclasses for different types or something similar) will make it more
 * difficult to get a quick overview over all special cases around datapoints. 
 */
export class CommonDP {
    readonly data: string;
    readonly config: string;
    protected node: ComponentNode;

    constructor(node: ComponentNode) {
        this.node = node;
        const taskDP = `/${node.task.name}/`;
        this.data = taskDP + getDataDP(node.type, node.index);
        this.config = taskDP + getConfigDP(node.type, node.index);
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
        if (this.node.type === ComponentType.Battery) {
            return `${this.data}.Converter.AC.ReactivePower_kvar`;
        }
        return `${this.data}.Live.ReactivePower_kvar`;
    }

    get nomConsCap_kW() {
        if (this.node.type === ComponentType.Battery) {
            return `${this.config}.Properties.Converter.Nominal.NomConsCap_kW`;
        }
        return `${this.config}.Properties.Capacity.NomConsCap_kW`;
    }

    get nomGenCap_kW() {
        if (this.node.type === ComponentType.Battery) {
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
		case(ComponentType.BatteryGroup):
			return ".BatteryGroupCfg";
		case(ComponentType.DieselGroup):
			return ".DieselGroupCfg";
		case(ComponentType.PV):
			return ".PVCfg"+"["+index+"]";
		case(ComponentType.Consumer):
			return ".ConsumerCfg"+"["+index+"]";
		case(ComponentType.Battery):
			return ".BCUCfg"+"["+index+"]";
		case(ComponentType.Diesel):
			return ".DieselCfg"+"["+index+"]";
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
		case(ComponentType.BatteryGroup):
			return ".BatteryGroupData";
		case(ComponentType.DieselGroup):
			return ".DieselGroupData";
		case(ComponentType.PV):
			return ".PVData"+"["+index+"]";
		case(ComponentType.Consumer):
			return ".ConsumerData"+"["+index+"]";
		case(ComponentType.Battery):
			return ".BCUData"+"["+index+"]";
		case(ComponentType.Diesel):
			return ".DieselData"+"["+index+"]";
		case(ComponentType.SamsungRack):
			return ".SamsungIO"+"["+index+"]";
        default:
            // Provoke helpful error message if (and only if) this dp is used later to reach an address.
            return `DATA_DP_FOR_${ComponentType[type]}_NOT_SET`;
	}
}

export function getStandardEventDPs(node: ComponentNode): EventDP[] {
    switch(node.type) {
        case ComponentType.System:
            return [
                new EventDP(".AlarmWord", node, EventConfig.SystemEvents)
            ];
        case ComponentType.Battery:
            return [
                new EventDP(".AlarmWord", node, EventConfig.BCUEvents)
            ]
        default:
            return [];
    }
    
	// var info = { DP_List: [], Masks: [] };
	// switch(itemType){
	// 	case(TYPE_SYSTEM):
	// 		info.DP_List = [
	// 			prefixString + '.AlarmWord',
	// 		]
	// 		info.Masks = [
	// 			SystemAlarmWordMasks
	// 		]			
	// 		break;
	// 	case(TYPE_PV_GROUP):
	// 		break;
	// 	case(TYPE_CONSUMER_GROUP):
	// 		break;
	// 	case(TYPE_GRID):
	// 		break;
	// 	case(TYPE_BATTERY_GROUP):
	// 		break;
	// 	case(TYPE_DIESEL_GROUP):
	// 		break;
	// 	case(TYPE_PV):
	// 		break;
	// 	case(TYPE_CONSUMER):
	// 		break;
	// 	case(TYPE_BATTERY):
	// 		info.DP_List = [
	// 			prefixString + '.AlarmWord'
	// 			//prefixString + '.TempWarningWord',
	// 			//prefixString + '.TempAlarmWord'
	// 			//prefixString + '.EventSensors'
	// 		]
	// 		info.Masks = [
	// 			BCUAlarmWordMasks
	// 			//BCUTemperatureWarningMasks,
	// 			//BCUTemperatureAlarmMasks
	// 			//BCUEventSensorMasks
	// 		]
	// 		break;
	// 	case(TYPE_DIESEL):
	// 		break;
	// 	case(TYPE_SAMSUNG_RACK): // todo: depends on type of samsung -- have a MegaE type and other
	// 		info.DP_List = [
	// 			prefixString + '.Alarms.Protection_1',
	// 			prefixString + '.Alarms.Protection_2',
	// 			prefixString + '.Alarms.Protection_3',
	// 			prefixString + '.Alarms.Protection_4',
	// 			prefixString + '.Alarms.Alarm_1',
	// 			prefixString + '.Alarms.Alarm_2',
	// 			prefixString + '.Alarms.Alarm_3',
	// 			prefixString + '.Alarms.Alarm_4',
	// 			/*prefixString + '.TripWord',
	// 			prefixString + '.AlarmWord',
	// 			prefixString + '.TrayFaultWord',
	// 			prefixString + '.Status'*/
	// 			]
	// 		info.Masks = [
	// 			/*SamsungTripWordMasks,
	// 			SamsungAlarmWordMasks,
	// 			SamsungTrayFaultWordMasks,
	// 			SamsungStatusMasks*/
	// 			]
	// 		break;
	// }	
	// return info;
}


