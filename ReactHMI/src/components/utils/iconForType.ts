import {ComponentType} from "../../model/ComponentNode";

export default function iconForType(type: ComponentType) {
    // Using switch statement because we need the require() statements to be
    // statically complete, we can't compose their strings dynamically because
    // webpack should resolve them at compile time.
    switch(type) {
		case ComponentType.System:
			return require("!raw!../../resources/icons/overview.svg");
		case ComponentType.PV:
		case ComponentType.PVGroup:
			return require("!raw!../../resources/icons/solar.svg");
		case ComponentType.Consumer:
		case ComponentType.ConsumerGroup:
            return require("!raw!../../resources/icons/consumer.svg");
		case ComponentType.Grid:
			return require("!raw!../../resources/icons/grid.svg");
		case ComponentType.BCU:
		case ComponentType.BCUGroup:
			return require("!raw!../../resources/icons/bcu.svg");
		case ComponentType.Diesel:
		case ComponentType.DieselGroup:
			return require("!raw!../../resources/icons/genset.svg");
		case ComponentType.BatteryString:
			return require("!raw!../../resources/icons/battery_string.svg");
		default:
			return undefined;
	}
}