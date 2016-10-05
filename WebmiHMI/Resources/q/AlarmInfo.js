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


addScopeResultsToAlarmHistoryCallback = function(alarmInfo, alarmHistory) {

	return function(e){

		var data = e[0];

	
		
		var seriesLength = data[alarmInfo.alarms[0]].length;
		for (var i=0; i<seriesLength; i++){

			// push timestamp first, then list of alarm word values 
			var timestamp = data[alarmInfo.alarms[0]][i][0];

			var entry = [timestamp];
			for (var j=0; j<alarmInfo.alarms.length; j++){
				entry.push(data[alarmInfo.alarms[j]][i][1]);
			}			
			alarmHistory.push(entry);

		}

		//sort alarmHistory
		alarmHistory.sort(function (a,b){
							if (a[0] > b[0]) return -1;
							else if (a[0] < b[0]) return 1;
							else return 0;
						});

//		console.log("Updated alarmHistory. Turning into an event history bitwise", alarmInfo);

		turnWordHistoryToEventHistory(alarmHistory, alarmInfo.masks, 0);
	}

}

turnWordHistoryToEventHistory = function(alarmHistory, masksList, timeOffset){

	// alarm history should be an array of timestamp, alarmword1, alarmword2, etc, etc. maskList is in same order as alarmword
//	console.log("Creating a log for each bit");

	// table data has Title, From, To
	tableData = [];

	// go through each bit of each alarm word and scan the entire history for the activation and deactivation of that alarm
	for (var i=1; i<alarmHistory[0].length; i++){

		for (var j=0; j<masksList[i-1].length; j++){

			var active = false;
			var entry;

			for (var k=0; k<alarmHistory.length; k++){

				var alarmWordValue = alarmHistory[k][i];
				// moving backwards in time as k increases... so if we see the bit flip to true here, then this is when it deactivated
				// and as we can continue going through back in time the alarm is active
				if (!active) {

					// check to see if alarm activates here
					if ((alarmWordValue & masksList[i-1][j].value) > 0){
						active = true;
						if (k==0){

							entry = [masksList[i-1][j].name, masksList[i-1][j].level, , "still active"];
  
						} else {

							entry = [masksList[i-1][j].name, masksList[i-1][j].level, , alarmHistory[k][0]+timeOffset];
			
						}

					}

				} else {

					// if we already saw this alarm was active, and now we see it turn back to zero here, then we know that now is the time that it activated
					if ((alarmWordValue & masksList[i-1][j].value) == 0){

						active = false;
						entry[2] = alarmHistory[k][0];
						tableData.push(entry);

					} else	if (k == alarmHistory.length -1) {

						entry[2] = "before " + new Date(alarmHistory[k][0] + timeOffset);
						tableData.push(entry);

					}

				}

			}

		}

	}

//	console.log("Created table", tableData);
	return tableData;

}


getRecorderDescription = function(node){

	var desc = node.TaskName ;
	switch (node.Type){
	case TYPE_BATTERY:
		desc = desc + "_BCU" + node.Index;
		break;
	case TYPE_SAMSUNG_RACK:
		desc = desc + "_SAM" + node.Index;
		break;
	}

	return desc;
}

getAlarmInfoList = function(node, list){

//	console.log("Get alarm info for ", node);
	// check if this node already has a recorder in the list, and add if needed
	var recorderName = getRecorderDescription(node) + "_STAT";

	var nodeAlarms;
	for (var i=0; i<list.length; i++){
		if (list[i].recorder == recorderName) {
			nodeAlarms = list[i];
		}
	}
	if (nodeAlarms === undefined) {
		nodeAlarms = {recorder : recorderName, alarms : [], owners : [], masks : [] };
		list.push (nodeAlarms);
	}

	// for this recorder in the list, add the dp, maskList pairs
	for (var i=0; i<node.AlarmDPList.length ; i++){

		nodeAlarms.alarms.push(node.AlarmDPList[i].substring(1));
		nodeAlarms.owners.push(node.Name);
		nodeAlarms.masks.push(node.AlarmMaskList[i]);

	}


	// add from subcomponents
	for (var i=0; i<node.subComponentList.length; i++){

		getAlarmInfoList(node.subComponentList[i], list);

	}

	return list;
}

function eventToAlarmLevel(event){

	switch(event) {
	case Event_None:
		return ALARM_LEVEL_INFO;
	case Event_Inhibit:
		return ALARM_LEVEL_INHIBIT;
	case Event_Limit:
		return ALARM_LEVEL_LIMIT;
	case Event_LimitInhibit:
		return ALARM_LEVEL_LIMIT_INHIBIT;
	case Event_Trip:
		return ALARM_LEVEL_TRIP;
	}
	return ALARM_LEVEL_WARNING;
}

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
	{
		value: 16,
		level: ALARM_LEVEL_ERROR,
		name: "Remote Control Lost"
	},
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

BCUTemperatureWarningMasks = [
	{
		value: 1,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 1"
	},
	{
		value: 2,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 2"
	},
	{
		value: 4,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 3"
	},
	{
		value: 8,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 4"
	},
	{
		value: 16,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 5"
	},
	{
		value: 32,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 6"
	},	
	{
		value: 64,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 7"
	},	
	{
		value: 128,
		level: ALARM_LEVEL_WARNING,
		name: "Undertemperature 8"
	},	
	{
		value: 256,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 1"
	},	
	{
		value: 512,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 2"
	},	
	{
		value: 1024,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 3"
	},	
	{
		value: 2048,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 4"
	},	
	{
		value: 4096,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 5"
	},	
	{
		value: 8192,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 6"
	},		
	{
		value: 16384,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 7"
	},		
	{
		value: 32768,
		level: ALARM_LEVEL_WARNING,
		name: "Overtemperature 8"
	}
]

BCUTemperatureAlarmMasks = [
	{
		value: 1,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 1"
	},
	{
		value: 2,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 2"
	},
	{
		value: 4,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 3"
	},
	{
		value: 8,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 4"
	},
	{
		value: 16,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 5"
	},
	{
		value: 32,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 6"
	},	
	{
		value: 64,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 7"
	},	
	{
		value: 128,
		level: ALARM_LEVEL_ERROR,
		name: "Undertemperature 8"
	},	
	{
		value: 256,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 1"
	},	
	{
		value: 512,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 2"
	},	
	{
		value: 1024,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 3"
	},	
	{
		value: 2048,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 4"
	},	
	{
		value: 4096,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 5"
	},	
	{
		value: 8192,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 6"
	},		
	{
		value: 16384,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 7"
	},		
	{
		value: 32768,
		level: ALARM_LEVEL_ERROR,
		name: "Overtemperature 8"
	}
]

BCUEventSensorMasks = [
	{
		value: 1,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 1"
	},
	{
		value: 2,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 2"
	},
	{
		value: 4,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 3"
	},
	{
		value: 8,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 4"
	},
	{
		value: 16,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 5"
	},
	{
		value: 32,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 6"
	},	
	{
		value: 64,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 7"
	},	
	{
		value: 128,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 8"
	},	
	{
		value: 256,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 9"
	},	
	{
		value: 512,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 10"
	},	
	{
		value: 1024,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 11"
	},	
	{
		value: 2048,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 12"
	},	
	{
		value: 4096,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 13"
	},	
	{
		value: 8192,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 14"
	},		
	{
		value: 16384,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 15"
	},		
	{
		value: 32768,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 16"
	}
]


SystemAlarmWordMasks = [
	{
		value: 1,
		level: ALARM_LEVEL_WARNING,
		name: "Spinning Reserve"
	},
	{
		value: 2,
		level: ALARM_LEVEL_WARNING,
		name: "Imminent Shutdown"
	},
	{
		value: 4,
		level: ALARM_LEVEL_ERROR,
		name: "Trip"
	},
	{
		value: 8,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},
	{
		value: 16,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},
	{
		value: 32,
		level: ALARM_LEVEL_ERROR,
		name: "Error 24V Supply"
	},	
	{
		value: 64,
		level: ALARM_LEVEL_WARNING,
		name: "UPS Triggered"
	},	
	{
		value: 128,
		level: ALARM_LEVEL_INFO,
		name: "Event Sensor 8"
	},	
	{
		value: 256,
		level: ALARM_LEVEL_ERROR,
		name: "Emergency Stop Active"
	},	
	{
		value: 512,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},	
	{
		value: 1024,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},	
	{
		value: 2048,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},	
	{
		value: 4096,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},	
	{
		value: 8192,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},		
	{
		value: 16384,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	},		
	{
		value: 32768,
		level: ALARM_LEVEL_INFO,
		name: "Reserved"
	}
]

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
				prefixString + '.AlarmWord'
				//prefixString + '.TempWarningWord',
				//prefixString + '.TempAlarmWord'
				//prefixString + '.EventSensors'
			]
			info.Masks = [
				BCUAlarmWordMasks
				//BCUTemperatureWarningMasks,
				//BCUTemperatureAlarmMasks
				//BCUEventSensorMasks
			]
			break;
		case(TYPE_DIESEL):
			break;
		case(TYPE_SAMSUNG_RACK): // todo: depends on type of samsung -- have a MegaE type and other
			info.DP_List = [
				prefixString + '.Alarms.Protection_1',
				prefixString + '.Alarms.Protection_2',
				prefixString + '.Alarms.Protection_3',
				prefixString + '.Alarms.Protection_4',
				prefixString + '.Alarms.Alarm_1',
				prefixString + '.Alarms.Alarm_2',
				prefixString + '.Alarms.Alarm_3',
				prefixString + '.Alarms.Alarm_4',
				/*prefixString + '.TripWord',
				prefixString + '.AlarmWord',
				prefixString + '.TrayFaultWord',
				prefixString + '.Status'*/
				]
			info.Masks = [
				/*SamsungTripWordMasks,
				SamsungAlarmWordMasks,
				SamsungTrayFaultWordMasks,
				SamsungStatusMasks*/
				]
			break;
	}	
	return info;
}

SamsungTripWordMasks = []
SamsungAlarmWordMasks = []
SamsungTrayFaultWordMasks = []
SamsungStatusMasks = []