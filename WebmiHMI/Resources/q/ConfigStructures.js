/*

structure of a configuration tree node

title: display in the configuration navigation tree
variable: 
dp_list: array of datapoint information (each one is a final readable datapoint of type bool, real, string, int, enum, etc)
childs: array of configuration tree nodes


structure of dp
ParamName: 
Type: 
DP:

*/

// TODO: parse selected elements out of a SYM file?
var paramTable = [];
paramTable.push({title: "qc_delta.m",variable: "",
	dp_list: [
	],
	childs: [
	{title: "Cooling Config",variable: ".Cooling_Config",
	dp_list: [
	{ParamName: "Batt Room Hyste",DP: ".BattRoom_Hyste",Type: "REAL"},
	{ParamName: "Batt Room Set Point",DP: ".BattRoom_SetPoint",Type: "REAL"},
	{ParamName: "Controller I",DP: ".Controller_I",Type: "REAL"},
	{ParamName: "Controller P",DP: ".Controller_P",Type: "REAL"},
	{ParamName: "Dew Point Hyste",DP: ".DewPoint_Hyste",Type: "REAL"},
	{ParamName: "Diff One Cooler Mode",DP: ".Diff_OneCoolerMode",Type: "REAL"},
	{ParamName: "Flow HeaterON",DP: ".Flow_HeaterON",Type: "REAL"},
	{ParamName: "Flow Inverter Min",DP: ".FlowInverter_Min",Type: "REAL"},
	{ParamName: "HeaterOFF Hyste",DP: ".HeaterOFF_Hyste",Type: "REAL"},
	{ParamName: "Inverter Hyste",DP: ".Inverter_Hyste",Type: "REAL"},
	{ParamName: "Tank Max Point",DP: ".Tank_MaxPoint",Type: "REAL"},
	{ParamName: "Tank Min Point",DP: ".Tank_MinPoint",Type: "REAL"},
	{ParamName: "Temp 2 Setpoint",DP: ".Temp2_Setpoint",Type: "REAL"},
	{ParamName: "Time Fan OFF",DP: ".Time_Fan_OFF",Type: "TIME"},
	{ParamName: "Time Fan ON",DP: ".Time_Fan_ON",Type: "TIME"},
	{ParamName: "Time Pump 1",DP: ".Time_Pump_1",Type: "TIME"},
	{ParamName: "Time Pump 2",DP: ".Time_Pump_2",Type: "TIME"},
	{ParamName: "Tx Room Set Point",DP: ".TxRoom_SetPoint",Type: "REAL"}
	],
	childs: [
	]}
	]});

paramTable.push({title: "q_sys.m",variable: "",
	dp_list: [
	],
	childs: [
	{title: "Battery Group Config",variable: ".BatteryGroupConfig",
	dp_list: [
	{ParamName: "Default MaxSOC",DP: ".DefaultMaxSOC",Type: "REAL"},
	{ParamName: "Default MinSOC",DP: ".DefaultMinSOC",Type: "REAL"},
	{ParamName: "Idle Off Allowed",DP: ".IdleOffAllowed",Type: "BOOL"},
	{ParamName: "Leave Idle Delay",DP: ".LeaveIdle_Delay",Type: "TIME"},
	{ParamName: "Leave Idle k W",DP: ".LeaveIdle_kW",Type: "REAL"},
	{ParamName: "Max Idle Time",DP: ".MaxIdle_Time",Type: "TIME"},
	{ParamName: "Provide Frequency Regulation",DP: ".ProvideFrequencyRegulation",Type: "BOOL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Use Active Power Schedule",DP: ".UseActivePowerSchedule",Type: "BOOL"},
	{ParamName: "Use Reactive Power Schedule",DP: ".UseReactivePowerSchedule",Type: "BOOL"},
	{ParamName: "UseSOCBoundary Schedule",DP: ".UseSOCBoundarySchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Diesel Group Config",variable: ".DieselGroupConfig",
	dp_list: [
	{ParamName: "Delay Diesel Bump",DP: ".DelayDieselBump",Type: "TIME"},
	{ParamName: "Delay Diesel Off",DP: ".DelayDieselOff",Type: "TIME"},
	{ParamName: "Delay Diesel On",DP: ".DelayDieselOn",Type: "TIME"},
	{ParamName: "Kp Load Sharing",DP: ".Kp_LoadSharing",Type: "REAL"},
	{ParamName: "Load Sharing Base k W",DP: ".LoadSharing_Base_kW",Type: "REAL"},
	{ParamName: "Load Sharing Droop Kp Freq",DP: ".LoadSharing_Droop_Kp_Freq",Type: "REAL"},
	{ParamName: "Load Sharing Droop Max Freq",DP: ".LoadSharing_DroopMaxFreq",Type: "REAL"},
	{ParamName: "Load Sharing Droop Min Freq",DP: ".LoadSharing_DroopMinFreq",Type: "REAL"},
	{ParamName: "Load Sharing Weight",DP: ".LoadSharing_Weight",Type: "REAL"},
	{ParamName: "Max Parallel Diesels",DP: ".MaxParallelDiesels",Type: "WORD"},
	{ParamName: "Min Diesel Loading Pcnt",DP: ".MinDieselLoading_Pcnt",Type: "REAL"},
	{ParamName: "Minimum Plant Runtime",DP: ".MinimumPlantRuntime",Type: "TIME"},
	{ParamName: "Ramp Off k W s",DP: ".RampOff_kW_s",Type: "REAL"},
	{ParamName: "Ramp On k W s",DP: ".RampOn_kW_s",Type: "REAL"},
	{ParamName: "Share Diesel Load From Pcnt",DP: ".ShareDieselLoadFrom_Pcnt",Type: "REAL"},
	{ParamName: "Start Timeout",DP: ".StartTimeout",Type: "TIME"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "External Task Cfg",variable: ".ExternalTaskCfg",
	dp_list: [
	],
	childs: [
	{title: "External Task Cfg[1]",variable: ".ExternalTaskCfg[1]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[2]",variable: ".ExternalTaskCfg[2]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[3]",variable: ".ExternalTaskCfg[3]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[4]",variable: ".ExternalTaskCfg[4]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[5]",variable: ".ExternalTaskCfg[5]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[6]",variable: ".ExternalTaskCfg[6]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[7]",variable: ".ExternalTaskCfg[7]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]},
	{title: "External Task Cfg[8]",variable: ".ExternalTaskCfg[8]",
	dp_list: [
	{ParamName: "Module Name",DP: ".ModuleName",Type: "STRING"},
	{ParamName: "Module Path",DP: ".ModulePath",Type: "STRING"},
	{ParamName: "TaskIP",DP: ".TaskIP",Type: "STRING"},
	{ParamName: "Task Name",DP: ".TaskName",Type: "STRING"}
	],
	childs: [
	{title: "Items",variable: ".Items",
	dp_list: [
	],
	childs: [
	{title: "Items[1]",variable: ".Items[1]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[2]",variable: ".Items[2]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[3]",variable: ".Items[3]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[4]",variable: ".Items[4]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[5]",variable: ".Items[5]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[6]",variable: ".Items[6]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[7]",variable: ".Items[7]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]},
	{title: "Items[8]",variable: ".Items[8]",
	dp_list: [
	{ParamName: "External Index",DP: ".ExternalIndex",Type: "INT"},
	{ParamName: "Item Type",DP: ".ItemType",Type: "ENUM"},
	{ParamName: "Local Index",DP: ".LocalIndex",Type: "INT"}
	],
	childs: [
	]}
	]}
	]}
	]},
	{title: "Grid Config",variable: ".GridConfig",
	dp_list: [
	{ParamName: "Default Max Export k W",DP: ".DefaultMaxExport_kW",Type: "REAL"},
	{ParamName: "Default Max Import k W",DP: ".DefaultMaxImport_kW",Type: "REAL"},
	{ParamName: "Reconnect Delay",DP: ".Reconnect_Delay",Type: "TIME"},
	{ParamName: "Reconnect Freq Pcnt",DP: ".Reconnect_FreqPcnt",Type: "REAL"},
	{ParamName: "Reconnect Voltage Pcnt",DP: ".Reconnect_VoltagePcnt",Type: "REAL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Self Consumption Kp",DP: ".SelfConsumption_Kp",Type: "REAL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig",variable: ".PVConfig",
	dp_list: [
	],
	childs: [
	{title: "PVConfig[1]",variable: ".PVConfig[1]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[2]",variable: ".PVConfig[2]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[3]",variable: ".PVConfig[3]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[4]",variable: ".PVConfig[4]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[5]",variable: ".PVConfig[5]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[6]",variable: ".PVConfig[6]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[7]",variable: ".PVConfig[7]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[8]",variable: ".PVConfig[8]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[9]",variable: ".PVConfig[9]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[10]",variable: ".PVConfig[10]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[11]",variable: ".PVConfig[11]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[12]",variable: ".PVConfig[12]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[13]",variable: ".PVConfig[13]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[14]",variable: ".PVConfig[14]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[15]",variable: ".PVConfig[15]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[16]",variable: ".PVConfig[16]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[17]",variable: ".PVConfig[17]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[18]",variable: ".PVConfig[18]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[19]",variable: ".PVConfig[19]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[20]",variable: ".PVConfig[20]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[21]",variable: ".PVConfig[21]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[22]",variable: ".PVConfig[22]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[23]",variable: ".PVConfig[23]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[24]",variable: ".PVConfig[24]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[25]",variable: ".PVConfig[25]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[26]",variable: ".PVConfig[26]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[27]",variable: ".PVConfig[27]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[28]",variable: ".PVConfig[28]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[29]",variable: ".PVConfig[29]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[30]",variable: ".PVConfig[30]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[31]",variable: ".PVConfig[31]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "PVConfig[32]",variable: ".PVConfig[32]",
	dp_list: [
	{ParamName: "Reactive Power Schedule",DP: ".ReactivePowerSchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "System Cfg",variable: ".SystemCfg",
	dp_list: [
	{ParamName: "City",DP: ".City",Type: "STRING"},
	{ParamName: "Country",DP: ".Country",Type: "STRING"},
	{ParamName: "Def Control Place",DP: ".DefControlPlace",Type: "ENUM"},
	{ParamName: "Freq PVReduce",DP: ".Freq_PVReduce",Type: "REAL"},
	{ParamName: "Freq PVShutoff",DP: ".Freq_PVShutoff",Type: "REAL"},
	{ParamName: "Freq Recovery Pcnt Per Min",DP: ".Freq_Recovery_PcntPerMin",Type: "REAL"},
	{ParamName: "Freq Reduction Pcnt Per Hz",DP: ".Freq_Reduction_PcntPerHz",Type: "REAL"},
	{ParamName: "Isochronous Grid",DP: ".IsochronousGrid",Type: "BOOL"},
	{ParamName: "Latitude",DP: ".Latitude",Type: "REAL"},
	{ParamName: "Longitude",DP: ".Longitude",Type: "REAL"},
	{ParamName: "Min Reserve 1 Delay",DP: ".MinReserve1_Delay",Type: "TIME"},
	{ParamName: "Min Reserve 1 kVA",DP: ".MinReserve1_kVA",Type: "REAL"},
	{ParamName: "Min Reserve 1 k W",DP: ".MinReserve1_kW",Type: "REAL"},
	{ParamName: "Min Reserve 2 Delay",DP: ".MinReserve2_Delay",Type: "TIME"},
	{ParamName: "Min Reserve 2 kVA",DP: ".MinReserve2_kVA",Type: "REAL"},
	{ParamName: "Min Reserve 2 k W",DP: ".MinReserve2_kW",Type: "REAL"},
	{ParamName: "Nom Freq Hz",DP: ".NomFreq_Hz",Type: "REAL"},
	{ParamName: "Nom GridLL V",DP: ".NomGridLL_V",Type: "REAL"},
	{ParamName: "Reactive Load Sharing",DP: ".ReactiveLoadSharing",Type: "BOOL"},
	{ParamName: "Required Base Gen Capacity k W",DP: ".RequiredBaseGenCapacity_kW",Type: "REAL"},
	{ParamName: "Reserve After Stop kVA",DP: ".ReserveAfterStop_kVA",Type: "REAL"},
	{ParamName: "Reserve After Stop k W",DP: ".ReserveAfterStop_kW",Type: "REAL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Secured Consumption Buffer k W",DP: ".SecuredConsumptionBuffer_kW",Type: "REAL"},
	{ParamName: "Secured Consumption Fraction",DP: ".SecuredConsumptionFraction",Type: "REAL"},
	{ParamName: "SOC Diesel Off Allowed",DP: ".SOC_DieselOffAllowed",Type: "REAL"},
	{ParamName: "SOC Force Diesel On",DP: ".SOC_ForceDieselOn",Type: "REAL"},
	{ParamName: "SOC ReducePVBy Freq",DP: ".SOC_ReducePVByFreq",Type: "REAL"},
	{ParamName: "Start Microgrid With",DP: ".StartMicrogridWith",Type: "ENUM"},
	{ParamName: "Time Zone",DP: ".TimeZone",Type: "STRING"},
	{ParamName: "Use Dynamic Grid Limits",DP: ".UseDynamicGridLimits",Type: "BOOL"},
	{ParamName: "Use Grid Limit Schedule",DP: ".UseGridLimitSchedule",Type: "BOOL"},
	{ParamName: "Use Grid Reactive Schedule",DP: ".UseGridReactiveSchedule",Type: "BOOL"},
	{ParamName: "Use OldGUI",DP: ".UseOldGUI",Type: "BOOL"},
	{ParamName: "UseSOCSchedule",DP: ".UseSOCSchedule",Type: "BOOL"},
	{ParamName: "Variable As Reserve Above k W",DP: ".VariableAsReserve_Above_kW",Type: "REAL"},
	{ParamName: "Variable As Reserve Fraction",DP: ".VariableAsReserve_Fraction",Type: "REAL"}
	],
	childs: [
	{title: "DI Grid Contactor",variable: ".DI_GridContactor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DI Not Emergency Stop",variable: ".DI_NotEmergencyStop",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DI Start Btn",variable: ".DI_StartBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DI Stop Btn",variable: ".DI_StopBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DI UPSError",variable: ".DI_UPSError",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO Diesel Start Warning",variable: ".DO_DieselStartWarning",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO LED Off",variable: ".DO_LED_Off",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO LED On",variable: ".DO_LED_On",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO LED Warn",variable: ".DO_LED_Warn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined",variable: ".DO_UserDefined",
	dp_list: [
	],
	childs: [
	{title: "DO User Defined[1]",variable: ".DO_UserDefined[1]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[2]",variable: ".DO_UserDefined[2]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[3]",variable: ".DO_UserDefined[3]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[4]",variable: ".DO_UserDefined[4]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[5]",variable: ".DO_UserDefined[5]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[6]",variable: ".DO_UserDefined[6]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[7]",variable: ".DO_UserDefined[7]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DO User Defined[8]",variable: ".DO_UserDefined[8]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig",variable: ".UserDefinedDOConfig",
	dp_list: [
	],
	childs: [
	{title: "User DefinedDOConfig[1]",variable: ".UserDefinedDOConfig[1]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[2]",variable: ".UserDefinedDOConfig[2]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[3]",variable: ".UserDefinedDOConfig[3]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[4]",variable: ".UserDefinedDOConfig[4]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[5]",variable: ".UserDefinedDOConfig[5]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[6]",variable: ".UserDefinedDOConfig[6]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[7]",variable: ".UserDefinedDOConfig[7]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "User DefinedDOConfig[8]",variable: ".UserDefinedDOConfig[8]",
	dp_list: [
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Off Delay",DP: ".OffDelay",Type: "TIME"},
	{ParamName: "On Delay",DP: ".OnDelay",Type: "TIME"}
	],
	childs: [
	{title: "Off Criteria",variable: ".OffCriteria",
	dp_list: [
	],
	childs: [
	{title: "Off Criteria[1]",variable: ".OffCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[2]",variable: ".OffCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Off Criteria[3]",variable: ".OffCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "On Criteria",variable: ".OnCriteria",
	dp_list: [
	],
	childs: [
	{title: "On Criteria[1]",variable: ".OnCriteria[1]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[2]",variable: ".OnCriteria[2]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]},
	{title: "On Criteria[3]",variable: ".OnCriteria[3]",
	dp_list: [
	{ParamName: "Comparator",DP: ".Comparator",Type: "ENUM"},
	{ParamName: "Logic Operator",DP: ".LogicOperator",Type: "ENUM"},
	{ParamName: "Monitor Value",DP: ".MonitorValue",Type: "ENUM"},
	{ParamName: "Threshold Value",DP: ".ThresholdValue",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]}
	]},
	{title: "Virtual Item Cfg",variable: ".VirtualItemCfg",
	dp_list: [
	],
	childs: [
	{title: "Virtual Item Cfg[1]",variable: ".VirtualItemCfg[1]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[2]",variable: ".VirtualItemCfg[2]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[3]",variable: ".VirtualItemCfg[3]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[4]",variable: ".VirtualItemCfg[4]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[5]",variable: ".VirtualItemCfg[5]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[6]",variable: ".VirtualItemCfg[6]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[7]",variable: ".VirtualItemCfg[7]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[8]",variable: ".VirtualItemCfg[8]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[9]",variable: ".VirtualItemCfg[9]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[10]",variable: ".VirtualItemCfg[10]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[11]",variable: ".VirtualItemCfg[11]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[12]",variable: ".VirtualItemCfg[12]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[13]",variable: ".VirtualItemCfg[13]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[14]",variable: ".VirtualItemCfg[14]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[15]",variable: ".VirtualItemCfg[15]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Virtual Item Cfg[16]",variable: ".VirtualItemCfg[16]",
	dp_list: [
	{ParamName: "Group",DP: ".Group",Type: "ENUM"},
	{ParamName: "Index",DP: ".Index",Type: "INT"}
	],
	childs: [
	{title: "Add Values",variable: ".AddValues",
	dp_list: [
	],
	childs: [
	{title: "Add Values[1]",variable: ".AddValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[2]",variable: ".AddValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[3]",variable: ".AddValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Add Values[4]",variable: ".AddValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Rem Values",variable: ".RemValues",
	dp_list: [
	],
	childs: [
	{title: "Rem Values[1]",variable: ".RemValues[1]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[2]",variable: ".RemValues[2]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[3]",variable: ".RemValues[3]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]},
	{title: "Rem Values[4]",variable: ".RemValues[4]",
	dp_list: [
	{ParamName: "Index",DP: ".Index",Type: "INT"},
	{ParamName: "Object",DP: ".Object",Type: "ENUM"}
	],
	childs: [
	]}
	]}
	]}
	]}
	]});
	
paramTable.push({title: "samvac.m",variable: "",
	dp_list: [
	],
	childs: [
	{title: "BCUConfig",variable: ".BCUConfig",
	dp_list: [
	],
	childs: [
	{title: "BCUConfig[1]",variable: ".BCUConfig[1]",
	dp_list: [
	{ParamName: "Capacity Test k W",DP: ".CapacityTest_kW",Type: "REAL"},
	{ParamName: "Comm Loss Action",DP: ".CommLossAction",Type: "ENUM"},
	{ParamName: "Comm Loss Ramp Rate k Ws",DP: ".CommLossRampRate_kWs",Type: "REAL"},
	{ParamName: "External Comm Timeout",DP: ".ExternalCommTimeout",Type: "TIME"},
	{ParamName: "Idle Off Allowed",DP: ".IdleOffAllowed",Type: "BOOL"},
	{ParamName: "Leave Idle Delay",DP: ".LeaveIdle_Delay",Type: "TIME"},
	{ParamName: "Max Idle Time",DP: ".MaxIdle_Time",Type: "TIME"},
	{ParamName: "Nominal Capacity k Wh",DP: ".NominalCapacity_kWh",Type: "REAL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Use Active Power Schedule",DP: ".UseActivePowerSchedule",Type: "BOOL"},
	{ParamName: "Use Reactive Power Schedule",DP: ".UseReactivePowerSchedule",Type: "BOOL"},
	{ParamName: "UseSOCBoundary Schedule",DP: ".UseSOCBoundarySchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Dig In",variable: ".DigIn",
	dp_list: [
	],
	childs: [
	{title: "Mains Switch Closed",variable: ".MainsSwitchClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch Tripped",variable: ".MainsSwitchTripped",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Not Emerg",variable: ".NotEmerg",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Reset Btn",variable: ".ResetBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Safe OpenSWClosed",variable: ".SafeOpenSWClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Stop Btn",variable: ".StopBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail SafeOK",variable: ".SystemFailSafeOK",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Unlock Btn",variable: ".UnlockBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Dig Out",variable: ".DigOut",
	dp_list: [
	],
	childs: [
	{title: "ACPre Charge",variable: ".ACPreCharge",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Off",variable: ".LedOff",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led On",variable: ".LedOn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Warn",variable: ".LedWarn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch",variable: ".MainsSwitch",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail Safe",variable: ".SystemFailSafe",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors",variable: ".EventSensors",
	dp_list: [
	],
	childs: [
	{title: "Event Sensors[1]",variable: ".EventSensors[1]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[2]",variable: ".EventSensors[2]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[3]",variable: ".EventSensors[3]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[4]",variable: ".EventSensors[4]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[5]",variable: ".EventSensors[5]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[6]",variable: ".EventSensors[6]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[7]",variable: ".EventSensors[7]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[8]",variable: ".EventSensors[8]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[9]",variable: ".EventSensors[9]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[10]",variable: ".EventSensors[10]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[11]",variable: ".EventSensors[11]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[12]",variable: ".EventSensors[12]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[13]",variable: ".EventSensors[13]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[14]",variable: ".EventSensors[14]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[15]",variable: ".EventSensors[15]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[16]",variable: ".EventSensors[16]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Temps",variable: ".Temps",
	dp_list: [
	],
	childs: [
	{title: "Temps[1]",variable: ".Temps[1]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[2]",variable: ".Temps[2]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[3]",variable: ".Temps[3]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[4]",variable: ".Temps[4]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[5]",variable: ".Temps[5]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[6]",variable: ".Temps[6]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[7]",variable: ".Temps[7]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[8]",variable: ".Temps[8]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]}
	]},
	{title: "BCUConfig[2]",variable: ".BCUConfig[2]",
	dp_list: [
	{ParamName: "Capacity Test k W",DP: ".CapacityTest_kW",Type: "REAL"},
	{ParamName: "Comm Loss Action",DP: ".CommLossAction",Type: "ENUM"},
	{ParamName: "Comm Loss Ramp Rate k Ws",DP: ".CommLossRampRate_kWs",Type: "REAL"},
	{ParamName: "External Comm Timeout",DP: ".ExternalCommTimeout",Type: "TIME"},
	{ParamName: "Idle Off Allowed",DP: ".IdleOffAllowed",Type: "BOOL"},
	{ParamName: "Leave Idle Delay",DP: ".LeaveIdle_Delay",Type: "TIME"},
	{ParamName: "Max Idle Time",DP: ".MaxIdle_Time",Type: "TIME"},
	{ParamName: "Nominal Capacity k Wh",DP: ".NominalCapacity_kWh",Type: "REAL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Use Active Power Schedule",DP: ".UseActivePowerSchedule",Type: "BOOL"},
	{ParamName: "Use Reactive Power Schedule",DP: ".UseReactivePowerSchedule",Type: "BOOL"},
	{ParamName: "UseSOCBoundary Schedule",DP: ".UseSOCBoundarySchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Dig In",variable: ".DigIn",
	dp_list: [
	],
	childs: [
	{title: "Mains Switch Closed",variable: ".MainsSwitchClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch Tripped",variable: ".MainsSwitchTripped",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Not Emerg",variable: ".NotEmerg",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Reset Btn",variable: ".ResetBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Safe OpenSWClosed",variable: ".SafeOpenSWClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Stop Btn",variable: ".StopBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail SafeOK",variable: ".SystemFailSafeOK",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Unlock Btn",variable: ".UnlockBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Dig Out",variable: ".DigOut",
	dp_list: [
	],
	childs: [
	{title: "ACPre Charge",variable: ".ACPreCharge",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Off",variable: ".LedOff",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led On",variable: ".LedOn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Warn",variable: ".LedWarn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch",variable: ".MainsSwitch",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail Safe",variable: ".SystemFailSafe",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors",variable: ".EventSensors",
	dp_list: [
	],
	childs: [
	{title: "Event Sensors[1]",variable: ".EventSensors[1]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[2]",variable: ".EventSensors[2]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[3]",variable: ".EventSensors[3]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[4]",variable: ".EventSensors[4]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[5]",variable: ".EventSensors[5]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[6]",variable: ".EventSensors[6]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[7]",variable: ".EventSensors[7]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[8]",variable: ".EventSensors[8]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[9]",variable: ".EventSensors[9]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[10]",variable: ".EventSensors[10]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[11]",variable: ".EventSensors[11]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[12]",variable: ".EventSensors[12]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[13]",variable: ".EventSensors[13]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[14]",variable: ".EventSensors[14]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[15]",variable: ".EventSensors[15]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[16]",variable: ".EventSensors[16]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Temps",variable: ".Temps",
	dp_list: [
	],
	childs: [
	{title: "Temps[1]",variable: ".Temps[1]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[2]",variable: ".Temps[2]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[3]",variable: ".Temps[3]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[4]",variable: ".Temps[4]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[5]",variable: ".Temps[5]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[6]",variable: ".Temps[6]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[7]",variable: ".Temps[7]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[8]",variable: ".Temps[8]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]}
	]},
	{title: "BCUConfig[3]",variable: ".BCUConfig[3]",
	dp_list: [
	{ParamName: "Capacity Test k W",DP: ".CapacityTest_kW",Type: "REAL"},
	{ParamName: "Comm Loss Action",DP: ".CommLossAction",Type: "ENUM"},
	{ParamName: "Comm Loss Ramp Rate k Ws",DP: ".CommLossRampRate_kWs",Type: "REAL"},
	{ParamName: "External Comm Timeout",DP: ".ExternalCommTimeout",Type: "TIME"},
	{ParamName: "Idle Off Allowed",DP: ".IdleOffAllowed",Type: "BOOL"},
	{ParamName: "Leave Idle Delay",DP: ".LeaveIdle_Delay",Type: "TIME"},
	{ParamName: "Max Idle Time",DP: ".MaxIdle_Time",Type: "TIME"},
	{ParamName: "Nominal Capacity k Wh",DP: ".NominalCapacity_kWh",Type: "REAL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Use Active Power Schedule",DP: ".UseActivePowerSchedule",Type: "BOOL"},
	{ParamName: "Use Reactive Power Schedule",DP: ".UseReactivePowerSchedule",Type: "BOOL"},
	{ParamName: "UseSOCBoundary Schedule",DP: ".UseSOCBoundarySchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Dig In",variable: ".DigIn",
	dp_list: [
	],
	childs: [
	{title: "Mains Switch Closed",variable: ".MainsSwitchClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch Tripped",variable: ".MainsSwitchTripped",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Not Emerg",variable: ".NotEmerg",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Reset Btn",variable: ".ResetBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Safe OpenSWClosed",variable: ".SafeOpenSWClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Stop Btn",variable: ".StopBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail SafeOK",variable: ".SystemFailSafeOK",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Unlock Btn",variable: ".UnlockBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Dig Out",variable: ".DigOut",
	dp_list: [
	],
	childs: [
	{title: "ACPre Charge",variable: ".ACPreCharge",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Off",variable: ".LedOff",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led On",variable: ".LedOn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Warn",variable: ".LedWarn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch",variable: ".MainsSwitch",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail Safe",variable: ".SystemFailSafe",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors",variable: ".EventSensors",
	dp_list: [
	],
	childs: [
	{title: "Event Sensors[1]",variable: ".EventSensors[1]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[2]",variable: ".EventSensors[2]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[3]",variable: ".EventSensors[3]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[4]",variable: ".EventSensors[4]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[5]",variable: ".EventSensors[5]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[6]",variable: ".EventSensors[6]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[7]",variable: ".EventSensors[7]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[8]",variable: ".EventSensors[8]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[9]",variable: ".EventSensors[9]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[10]",variable: ".EventSensors[10]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[11]",variable: ".EventSensors[11]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[12]",variable: ".EventSensors[12]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[13]",variable: ".EventSensors[13]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[14]",variable: ".EventSensors[14]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[15]",variable: ".EventSensors[15]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[16]",variable: ".EventSensors[16]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Temps",variable: ".Temps",
	dp_list: [
	],
	childs: [
	{title: "Temps[1]",variable: ".Temps[1]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[2]",variable: ".Temps[2]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[3]",variable: ".Temps[3]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[4]",variable: ".Temps[4]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[5]",variable: ".Temps[5]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[6]",variable: ".Temps[6]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[7]",variable: ".Temps[7]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[8]",variable: ".Temps[8]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]}
	]},
	{title: "BCUConfig[4]",variable: ".BCUConfig[4]",
	dp_list: [
	{ParamName: "Capacity Test k W",DP: ".CapacityTest_kW",Type: "REAL"},
	{ParamName: "Comm Loss Action",DP: ".CommLossAction",Type: "ENUM"},
	{ParamName: "Comm Loss Ramp Rate k Ws",DP: ".CommLossRampRate_kWs",Type: "REAL"},
	{ParamName: "External Comm Timeout",DP: ".ExternalCommTimeout",Type: "TIME"},
	{ParamName: "Idle Off Allowed",DP: ".IdleOffAllowed",Type: "BOOL"},
	{ParamName: "Leave Idle Delay",DP: ".LeaveIdle_Delay",Type: "TIME"},
	{ParamName: "Max Idle Time",DP: ".MaxIdle_Time",Type: "TIME"},
	{ParamName: "Nominal Capacity k Wh",DP: ".NominalCapacity_kWh",Type: "REAL"},
	{ParamName: "Schedule Path",DP: ".SchedulePath",Type: "STRING"},
	{ParamName: "Use Active Power Schedule",DP: ".UseActivePowerSchedule",Type: "BOOL"},
	{ParamName: "Use Reactive Power Schedule",DP: ".UseReactivePowerSchedule",Type: "BOOL"},
	{ParamName: "UseSOCBoundary Schedule",DP: ".UseSOCBoundarySchedule",Type: "BOOL"}
	],
	childs: [
	{title: "Dig In",variable: ".DigIn",
	dp_list: [
	],
	childs: [
	{title: "Mains Switch Closed",variable: ".MainsSwitchClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch Tripped",variable: ".MainsSwitchTripped",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Not Emerg",variable: ".NotEmerg",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Reset Btn",variable: ".ResetBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Safe OpenSWClosed",variable: ".SafeOpenSWClosed",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Stop Btn",variable: ".StopBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail SafeOK",variable: ".SystemFailSafeOK",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Unlock Btn",variable: ".UnlockBtn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Dig Out",variable: ".DigOut",
	dp_list: [
	],
	childs: [
	{title: "ACPre Charge",variable: ".ACPreCharge",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Off",variable: ".LedOff",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led On",variable: ".LedOn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Led Warn",variable: ".LedWarn",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Mains Switch",variable: ".MainsSwitch",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Pre Charge Resistor",variable: ".PreChargeResistor",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "System Fail Safe",variable: ".SystemFailSafe",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors",variable: ".EventSensors",
	dp_list: [
	],
	childs: [
	{title: "Event Sensors[1]",variable: ".EventSensors[1]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[2]",variable: ".EventSensors[2]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[3]",variable: ".EventSensors[3]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[4]",variable: ".EventSensors[4]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[5]",variable: ".EventSensors[5]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[6]",variable: ".EventSensors[6]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[7]",variable: ".EventSensors[7]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[8]",variable: ".EventSensors[8]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[9]",variable: ".EventSensors[9]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[10]",variable: ".EventSensors[10]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[11]",variable: ".EventSensors[11]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[12]",variable: ".EventSensors[12]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[13]",variable: ".EventSensors[13]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[14]",variable: ".EventSensors[14]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[15]",variable: ".EventSensors[15]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Event Sensors[16]",variable: ".EventSensors[16]",
	dp_list: [
	{ParamName: "Active Event",DP: ".ActiveEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]}
	]},
	{title: "Info",variable: ".Info",
	dp_list: [
	{ParamName: "Default Control Place",DP: ".DefaultControlPlace",Type: "ENUM"},
	{ParamName: "Icon",DP: ".Icon",Type: "STRING"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "Nom Cap kVA",DP: ".NomCap_kVA",Type: "REAL"},
	{ParamName: "Nom Cons Cap k W",DP: ".NomConsCap_kW",Type: "REAL"},
	{ParamName: "Nom Gen Cap k W",DP: ".NomGenCap_kW",Type: "REAL"}
	],
	childs: [
	]},
	{title: "Temps",variable: ".Temps",
	dp_list: [
	],
	childs: [
	{title: "Temps[1]",variable: ".Temps[1]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[2]",variable: ".Temps[2]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[3]",variable: ".Temps[3]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[4]",variable: ".Temps[4]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[5]",variable: ".Temps[5]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[6]",variable: ".Temps[6]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[7]",variable: ".Temps[7]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]},
	{title: "Temps[8]",variable: ".Temps[8]",
	dp_list: [
	{ParamName: "Alarm Event",DP: ".AlarmEvent",Type: "ENUM"},
	{ParamName: "Event Index",DP: ".EventIndex",Type: "USINT"},
	{ParamName: "Name",DP: ".Name",Type: "STRING"},
	{ParamName: "OTAlarm",DP: ".OTAlarm",Type: "REAL"},
	{ParamName: "OTWarning",DP: ".OTWarning",Type: "REAL"},
	{ParamName: "UTAlarm",DP: ".UTAlarm",Type: "REAL"},
	{ParamName: "UTWarning",DP: ".UTWarning",Type: "REAL"}
	],
	childs: [
	{title: "HW",variable: ".HW",
	dp_list: [
	{ParamName: "AI Factor",DP: ".AI_Factor",Type: "INT"},
	{ParamName: "Card Nr",DP: ".CardNr",Type: "USINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "USINT"},
	{ParamName: "Correction",DP: ".Correction",Type: "REAL"}
	],
	childs: [
	]}
	]}
	]}
	]}
	]},
	{title: "Samsung Cfg",variable: ".SamsungCfg",
	dp_list: [
	],
	childs: [
	{title: "Samsung Cfg[1]",variable: ".SamsungCfg[1]",
	dp_list: [
	{ParamName: "BadSOC Buffer",DP: ".BadSOC_Buffer",Type: "REAL"},
	{ParamName: "BadSOC Lower",DP: ".BadSOC_Lower",Type: "REAL"},
	{ParamName: "BadSOC Offset k W",DP: ".BadSOC_Offset_kW",Type: "REAL"},
	{ParamName: "BadSOC Upper",DP: ".BadSOC_Upper",Type: "REAL"},
	{ParamName: "Black Start Bus Voltage Tolerance",DP: ".BlackStartBusVoltageTolerance",Type: "REAL"},
	{ParamName: "Black Start Pre Charge Delay",DP: ".BlackStartPreChargeDelay",Type: "TIME"},
	{ParamName: "CAN Net Vacon",DP: ".CAN_Net_Vacon",Type: "USINT"},
	{ParamName: "Communication Check Frequency",DP: ".CommunicationCheckFrequency",Type: "TIME"},
	{ParamName: "Connect Sub Timeout",DP: ".ConnectSubTimeout",Type: "TIME"},
	{ParamName: "DC Connect Delay",DP: ".DC_ConnectDelay",Type: "TIME"},
	{ParamName: "DiffDCVoltage Battery Bus",DP: ".DiffDCVoltageBatteryBus",Type: "REAL"},
	{ParamName: "GMP Card Nr",DP: ".GMP_CardNr",Type: "INT"},
	{ParamName: "Max Time BadSOC",DP: ".MaxTime_BadSOC",Type: "TIME"}
	],
	childs: [
	{title: "DO Synch To Grid",variable: ".DO_SynchToGrid",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "Samsung",variable: ".Samsung",
	dp_list: [
	{ParamName: "BMSType",DP: ".BMSType",Type: "ENUM"}
	],
	childs: [
	{title: "Battery Config",variable: ".BatteryConfig",
	dp_list: [
	{ParamName: "Black Start Rack Number",DP: ".BlackStartRackNumber",Type: "INT"},
	{ParamName: "Cell Voltage Tolerance",DP: ".CellVoltageTolerance",Type: "REAL"},
	{ParamName: "Max Cell Voltage",DP: ".MaxCellVoltage",Type: "REAL"},
	{ParamName: "Max Cont Power Per String k W",DP: ".MaxContPowerPerString_kW",Type: "REAL"},
	{ParamName: "Min Cell Voltage",DP: ".MinCellVoltage",Type: "REAL"},
	{ParamName: "Modules Per String",DP: ".ModulesPerString",Type: "USINT"},
	{ParamName: "Nominal Cap Per String k Wh",DP: ".NominalCapPerString_kWh",Type: "REAL"},
	{ParamName: "Rack Count",DP: ".RackCount",Type: "USINT"},
	{ParamName: "SOC Discharge Limited",DP: ".SOC_DischargeLimited",Type: "REAL"},
	{ParamName: "Total String Count",DP: ".TotalStringCount",Type: "USINT"}
	],
	childs: [
	]},
	{title: "RackBMSComm Config",variable: ".RackBMSCommConfig",
	dp_list: [
	{ParamName: "Baudrate",DP: ".Baudrate",Type: "DWORD"},
	{ParamName: "Card Number",DP: ".CardNumber",Type: "DWORD"},
	{ParamName: "ComNOK Empty Data",DP: ".ComNOK_EmptyData",Type: "BOOL"},
	{ParamName: "Data Read Enable",DP: ".DataRead_Enable",Type: "BOOL"},
	{ParamName: "Get Data Only Once",DP: ".GetDataOnlyOnce",Type: "BOOL"},
	{ParamName: "Reset Data Before Read",DP: ".ResetDataBeforeRead",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "SystemBMSComm Config",variable: ".SystemBMSCommConfig",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "BYTE"},
	{ParamName: "Channel Nr",DP: ".ChannelNr",Type: "BYTE"},
	{ParamName: "IP",DP: ".IP",Type: "STRING"},
	{ParamName: "PORT",DP: ".PORT",Type: "WORD"},
	{ParamName: "RXTimeout",DP: ".RXTimeout",Type: "TIME"},
	{ParamName: "Slave Adr",DP: ".SlaveAdr",Type: "BYTE"},
	{ParamName: "TCP",DP: ".TCP",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Vacon",variable: ".Vacon",
	dp_list: [
	{ParamName: "AC k W Correction",DP: ".AC_kW_Correction",Type: "REAL"},
	{ParamName: "Application Version Number",DP: ".ApplicationVersionNumber",Type: "REAL"},
	{ParamName: "Converter Side Voltage",DP: ".ConverterSideVoltage",Type: "REAL"},
	{ParamName: "DCVoltage Bus Tolerance",DP: ".DCVoltageBusTolerance",Type: "REAL"},
	{ParamName: "Delay BetweenDCref Adjustments",DP: ".DelayBetweenDCrefAdjustments",Type: "TIME"},
	{ParamName: "Droop Hz",DP: ".Droop_Hz",Type: "REAL"},
	{ParamName: "Grid Side Voltage",DP: ".GridSideVoltage",Type: "REAL"},
	{ParamName: "Kp DCV Power",DP: ".Kp_DCV_Power",Type: "REAL"},
	{ParamName: "Kp Reactive Power",DP: ".Kp_ReactivePower",Type: "REAL"},
	{ParamName: "kWAC Setpoint Tolerance",DP: ".kWAC_SetpointTolerance",Type: "REAL"},
	{ParamName: "Max Delta Ref 2 Pcnt Per Cycle",DP: ".MaxDeltaRef_2_PcntPerCycle",Type: "INT"},
	{ParamName: "Maximum Charge Voltage",DP: ".MaximumChargeVoltage",Type: "REAL"},
	{ParamName: "Minimum Discharge Voltage",DP: ".MinimumDischargeVoltage",Type: "REAL"},
	{ParamName: "Nom Freq Hz",DP: ".NomFreq_Hz",Type: "REAL"},
	{ParamName: "Rated kVA",DP: ".Rated_kVA",Type: "REAL"},
	{ParamName: "RatedACVoltage",DP: ".RatedACVoltage",Type: "REAL"},
	{ParamName: "Rated Current",DP: ".RatedCurrent",Type: "REAL"},
	{ParamName: "Rated Power",DP: ".RatedPower",Type: "REAL"},
	{ParamName: "Reduced Power Limit DC k W",DP: ".ReducedPowerLimit_DC_kW",Type: "INT"},
	{ParamName: "Supply Voltage",DP: ".SupplyVoltage",Type: "REAL"},
	{ParamName: "Trafo Phase Shift",DP: ".TrafoPhaseShift",Type: "INT"},
	{ParamName: "Voltage Droop Pcnt",DP: ".VoltageDroop_Pcnt",Type: "REAL"}
	],
	childs: [
	{title: "CAN Node",variable: ".CAN_Node",
	dp_list: [
	{ParamName: "CAN Node[1]",DP: ".CAN_Node[1]",Type: "USINT"},
	{ParamName: "CAN Node[2]",DP: ".CAN_Node[2]",Type: "USINT"}
	],
	childs: [
	]},
	{title: "DI MCBClose Active",variable: ".DI_MCBCloseActive",
	dp_list: [
	],
	childs: [
	{title: "DI MCBClose Active[1]",variable: ".DI_MCBCloseActive[1]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]},
	{title: "DI MCBClose Active[2]",variable: ".DI_MCBCloseActive[2]",
	dp_list: [
	{ParamName: "Card Nr",DP: ".CardNr",Type: "DINT"},
	{ParamName: "Channel",DP: ".Channel",Type: "DINT"},
	{ParamName: "Default",DP: ".Default",Type: "BOOL"},
	{ParamName: "Invert Signal",DP: ".InvertSignal",Type: "BOOL"}
	],
	childs: [
	]}
	]},
	{title: "Name",variable: ".Name",
	dp_list: [
	{ParamName: "Name[1]",DP: ".Name[1]",Type: "STRING"},
	{ParamName: "Name[2]",DP: ".Name[2]",Type: "STRING"}
	],
	childs: [
	]}
	]}
	]}
	]}
	]});