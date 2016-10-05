// alarm levels
ALARM_LEVEL_NONE = 0;
ALARM_LEVEL_INFO = 1;
ALARM_LEVEL_WARNING = 2;
ALARM_LEVEL_ERROR = 3;
ALARM_LEVEL_INHIBIT = 4;
ALARM_LEVEL_LIMIT = 5;
ALARM_LEVEL_LIMIT_INHIBIT = 6;
ALARM_LEVEL_TRIP = 7;

Event_Unknown = 0;
Event_None = 1;
Event_Inhibit = 2;
Event_Limit = 3;
Event_LimitInhibit = 4;
Event_Trip = 5;

function getAlarmLevelString(level){
	switch(level){
		case ALARM_LEVEL_WARNING:
			return "WARNING"
		case ALARM_LEVEL_ERROR:
			return "ERROR"
		case ALARM_LEVEL_INHIBIT:
			return "INHIBIT"
		case ALARM_LEVEL_LIMIT:
			return "LIMIT";
		case ALARM_LEVEL_LIMIT_INHIBIT:
			return "LIMIT-INHIBIT";
		case ALARM_LEVEL_TRIP:
			return "TRIP"
		default:
			return "INFO"
	}
}

BCUAlarmWordMasks = [
	// TODO - use it first then fill it out
	{
		value: 1,
		level: ALARM_LEVEL_ERROR,
		name: "Cannot Control Converter"
	},
	{
		value: 2,
		level: ALARM_LEVEL_ERROR,
		name: "Could Not Precharge DC Bus"
	},
	{
		value: 4,
		level: ALARM_LEVEL_ERROR,
		name: "Cannot Close Main Contactor"
	},
	{
		value: 8,
		level: ALARM_LEVEL_ERROR,
		name: "No Feedback Blackstart Resistor"
	},
	// no 16
	{
		value: 32,
		level: ALARM_LEVEL_TRIP,
		name: "Line Synch Error"
	},	
	{
		value: 64,
		level: ALARM_LEVEL_TRIP,
		name: "Converter Overcurrent"
	},	
	{
		value: 128,
		level: ALARM_LEVEL_WARNING,
		name: "Converter overtemperature"
	},	
	{
		value: 256,
		level: ALARM_LEVEL_TRIP,
		name: "Converter DC Overvoltage"
	},	
	{
		value: 512,
		level: ALARM_LEVEL_TRIP,
		name: "Converter DC Undervoltage"
	},	
	{
		value: 1024,
		level: ALARM_LEVEL_TRIP,
		name: "Unexpected Converter Stop"
	},	
	{
		value: 2048,
		level: ALARM_LEVEL_ERROR,
		name: "Converter Won't start"
	},	
	{
		value: 4096,
		level: ALARM_LEVEL_WARNING,
		name: "Above Max SOC"
	},	
	{
		value: 8192,
		level: ALARM_LEVEL_WARNING,
		name: "Below Min SOC"
	},		
	{
		value: 16384,
		level: ALARM_LEVEL_ERROR,
		name: "Battery Over Temp"
	},		
	{
		value: 32768,
		level: ALARM_LEVEL_ERROR,
		name: "Battery Under Temp"
	}
]

SystemAlarmWordMasks = BCUAlarmWordMasks;

SamsungRackWordMasks = [
	// TODO - use it first then fill it out
]
function getStdAlarmInfo(prefixString, itemType){

	var info = { DP_List: [], Masks: [] };
	switch(itemType){
		case(TYPE_SYSTEM):
			info.DP_List = [
				prefixString + '.AlarmWord',
			]
			info.Masks = [
				SystemAlarmWordMasks
			]			
			break;
		case(TYPE_PV_GROUP):
			break;
		case(TYPE_CONSUMER_GROUP):
			break;
		case(TYPE_GRID):
			break;
		case(TYPE_BATTERY_GROUP):
			break;
		case(TYPE_DIESEL_GROUP):
			break;
		case(TYPE_PV):
			break;
		case(TYPE_CONSUMER):
			break;
		case(TYPE_BATTERY):
			info.DP_List = [
				prefixString + '.AlarmWord',
				prefixString + '.TempWarningWord',
				prefixString + '.TempAlarmWord'
			]
			info.Masks = [
				BCUAlarmWordMasks
			]
			break;
		case(TYPE_DIESEL):
			break;
		case(TYPE_SAMSUNG_RACK):
			info.DP_List = [
				prefixString + '.TripWord',
				prefixString + '.AlarmWord',
				prefixString + '.TrayFaultWord',
				prefixString + '.Status'
				]
			info.Masks = [
				SamsungTripWordMasks,
				SamsungAlarmWordMasks,
				SamsungTrayFaultWordMasks,
				SamsungStatusMasks
				]
			break;
	}	
	return info;
}

SamsungTripWordMasks = []
SamsungAlarmWordMasks = []
SamsungTrayFaultWordMasks = []
SamsungStatusMasks = []