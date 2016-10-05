/**
 * All statically configured events.
 */
import { Level, EventType } from "./Event";

/**
 * On the PLC there is a distinction between alarms and events. On the frontend
 * everything is treated as an event. Going this direction makes sense but
 * at this point in time it's not clear yet how or if the code on the PLC will
 * follow this new nomenclature. Until then, when reading dynamically defined
 * event types we need to map them to "our" event levels.
 */
export function plcEventLevelToEventLevel(event){
	switch(event) {
		case 1: // Event_None
			return Level.Info;
		case 2: // Event_Inhibit
			return Level.Inhibit;
		case 3: // Event_Limit
			return Level.Limit;
		case 4: // Event_LimitInhibit
			return Level.LimitInhibit;
		case 5: // Event_Trip
			return Level.Trip;
		default:
			return Level.Warning;
	}
}


export const BCUEvents: EventType[] = [
	{
		mask: 1,
		level: Level.Error,
		name: "Cannot Control Converter"
	},
	{
		mask: 2,
		level: Level.Error,
		name: "Could Not Precharge DC Bus"
	},
	{
		mask: 4,
		level: Level.Error,
		name: "Cannot Close Main Contactor"
	},
	{
		mask: 8,
		level: Level.Error,
		name: "No Feedback Blackstart Resistor"
	},
	{
		mask: 16,
		level: Level.Error,
		name: "Remote Control Lost"
	},
	{
		mask: 32,
		level: Level.Trip,
		name: "Line Synch Error"
	},	
	{
		mask: 64,
		level: Level.Trip,
		name: "Converter Overcurrent"
	},	
	{
		mask: 128,
		level: Level.Warning,
		name: "Converter overtemperature"
	},	
	{
		mask: 256,
		level: Level.Trip,
		name: "Converter DC Overvoltage"
	},	
	{
		mask: 512,
		level: Level.Trip,
		name: "Converter DC Undervoltage"
	},	
	{
		mask: 1024,
		level: Level.Trip,
		name: "Unexpected Converter Stop"
	},	
	{
		mask: 2048,
		level: Level.Error,
		name: "Converter Won't start"
	},	
	{
		mask: 4096,
		level: Level.Warning,
		name: "Above Max SOC"
	},	
	{
		mask: 8192,
		level: Level.Warning,
		name: "Below Min SOC"
	},		
	{
		mask: 16384,
		level: Level.Error,
		name: "Battery Over Temp"
	},		
	{
		mask: 32768,
		level: Level.Error,
		name: "Battery Under Temp"
	}
];

export const BCUTemperatureEvents: EventType[] = [
	{
		mask: 1,
		level: Level.Warning,
		name: "Undertemperature 1"
	},
	{
		mask: 2,
		level: Level.Warning,
		name: "Undertemperature 2"
	},
	{
		mask: 4,
		level: Level.Warning,
		name: "Undertemperature 3"
	},
	{
		mask: 8,
		level: Level.Warning,
		name: "Undertemperature 4"
	},
	{
		mask: 16,
		level: Level.Warning,
		name: "Undertemperature 5"
	},
	{
		mask: 32,
		level: Level.Warning,
		name: "Undertemperature 6"
	},	
	{
		mask: 64,
		level: Level.Warning,
		name: "Undertemperature 7"
	},	
	{
		mask: 128,
		level: Level.Warning,
		name: "Undertemperature 8"
	},	
	{
		mask: 256,
		level: Level.Warning,
		name: "Overtemperature 1"
	},	
	{
		mask: 512,
		level: Level.Warning,
		name: "Overtemperature 2"
	},	
	{
		mask: 1024,
		level: Level.Warning,
		name: "Overtemperature 3"
	},	
	{
		mask: 2048,
		level: Level.Warning,
		name: "Overtemperature 4"
	},	
	{
		mask: 4096,
		level: Level.Warning,
		name: "Overtemperature 5"
	},	
	{
		mask: 8192,
		level: Level.Warning,
		name: "Overtemperature 6"
	},		
	{
		mask: 16384,
		level: Level.Warning,
		name: "Overtemperature 7"
	},		
	{
		mask: 32768,
		level: Level.Warning,
		name: "Overtemperature 8"
	}
];

export const BCUTemperatureEvents2: EventType[] = [
	{
		mask: 1,
		level: Level.Error,
		name: "Undertemperature 1"
	},
	{
		mask: 2,
		level: Level.Error,
		name: "Undertemperature 2"
	},
	{
		mask: 4,
		level: Level.Error,
		name: "Undertemperature 3"
	},
	{
		mask: 8,
		level: Level.Error,
		name: "Undertemperature 4"
	},
	{
		mask: 16,
		level: Level.Error,
		name: "Undertemperature 5"
	},
	{
		mask: 32,
		level: Level.Error,
		name: "Undertemperature 6"
	},	
	{
		mask: 64,
		level: Level.Error,
		name: "Undertemperature 7"
	},	
	{
		mask: 128,
		level: Level.Error,
		name: "Undertemperature 8"
	},	
	{
		mask: 256,
		level: Level.Error,
		name: "Overtemperature 1"
	},	
	{
		mask: 512,
		level: Level.Error,
		name: "Overtemperature 2"
	},	
	{
		mask: 1024,
		level: Level.Error,
		name: "Overtemperature 3"
	},	
	{
		mask: 2048,
		level: Level.Error,
		name: "Overtemperature 4"
	},	
	{
		mask: 4096,
		level: Level.Error,
		name: "Overtemperature 5"
	},	
	{
		mask: 8192,
		level: Level.Error,
		name: "Overtemperature 6"
	},		
	{
		mask: 16384,
		level: Level.Error,
		name: "Overtemperature 7"
	},		
	{
		mask: 32768,
		level: Level.Error,
		name: "Overtemperature 8"
	}
];

export const BCUEventSensorEvents: EventType[] = [
	{
		mask: 1,
		level: Level.Info,
		name: "Event Sensor 1"
	},
	{
		mask: 2,
		level: Level.Info,
		name: "Event Sensor 2"
	},
	{
		mask: 4,
		level: Level.Info,
		name: "Event Sensor 3"
	},
	{
		mask: 8,
		level: Level.Info,
		name: "Event Sensor 4"
	},
	{
		mask: 16,
		level: Level.Info,
		name: "Event Sensor 5"
	},
	{
		mask: 32,
		level: Level.Info,
		name: "Event Sensor 6"
	},	
	{
		mask: 64,
		level: Level.Info,
		name: "Event Sensor 7"
	},	
	{
		mask: 128,
		level: Level.Info,
		name: "Event Sensor 8"
	},	
	{
		mask: 256,
		level: Level.Info,
		name: "Event Sensor 9"
	},	
	{
		mask: 512,
		level: Level.Info,
		name: "Event Sensor 10"
	},	
	{
		mask: 1024,
		level: Level.Info,
		name: "Event Sensor 11"
	},	
	{
		mask: 2048,
		level: Level.Info,
		name: "Event Sensor 12"
	},	
	{
		mask: 4096,
		level: Level.Info,
		name: "Event Sensor 13"
	},	
	{
		mask: 8192,
		level: Level.Info,
		name: "Event Sensor 14"
	},		
	{
		mask: 16384,
		level: Level.Info,
		name: "Event Sensor 15"
	},		
	{
		mask: 32768,
		level: Level.Info,
		name: "Event Sensor 16"
	}
];

export const SystemEvents: EventType[] = [
	{
		mask: 1,
		level: Level.Warning,
		name: "Spinning Reserve"
	},
	{
		mask: 2,
		level: Level.Warning,
		name: "Imminent Shutdown"
	},
	{
		mask: 4,
		level: Level.Error,
		name: "Trip"
	},
	{
		mask: 8,
		level: Level.Info,
		name: "Reserved"
	},
	{
		mask: 16,
		level: Level.Info,
		name: "Reserved"
	},
	{
		mask: 32,
		level: Level.Error,
		name: "Error 24V Supply"
	},	
	{
		mask: 64,
		level: Level.Warning,
		name: "UPS Triggered"
	},	
	{
		mask: 128,
		level: Level.Info,
		name: "Event Sensor 8"
	},	
	{
		mask: 256,
		level: Level.Error,
		name: "Emergency Stop Active"
	},	
	{
		mask: 512,
		level: Level.Info,
		name: "Reserved"
	},	
	{
		mask: 1024,
		level: Level.Info,
		name: "Reserved"
	},	
	{
		mask: 2048,
		level: Level.Info,
		name: "Reserved"
	},	
	{
		mask: 4096,
		level: Level.Info,
		name: "Reserved"
	},	
	{
		mask: 8192,
		level: Level.Info,
		name: "Reserved"
	},		
	{
		mask: 16384,
		level: Level.Info,
		name: "Reserved"
	},		
	{
		mask: 32768,
		level: Level.Info,
		name: "Reserved"
	}
];
