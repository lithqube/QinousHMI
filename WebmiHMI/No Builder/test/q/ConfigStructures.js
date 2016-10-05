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

var systemConfig = {
		title: "System Config",
		variable: ".SystemCfg", 
		dp_list: [
			{ParamName: "City", DP: ".City", Type:"STRING"},
			{ParamName: "ControlPlace", DP: ".ControlPlace", Type:"ENUM"},
			{ParamName: "Country", DP: ".Country", Type:"STRING"},
			{ParamName: "Freq_PVReduce", DP: ".Freq_PVReduce", Type:"REAL"},
			{ParamName: "Freq_PVShutoff", DP: ".Freq_PVShutoff", Type:"REAL"},
			{ParamName: "Freq_Recovery_PcntPerMin", DP: ".Freq_Recovery_PcntPerMin", Type:"REAL"},
			{ParamName: "Freq_Reduction_PcntPerHz", DP: ".Freq_Reduction_PcntPerHz", Type:"REAL"},
			{ParamName: "IsochronousGrid", DP: ".IsochronousGrid", Type:"BOOL"},
			{ParamName: "Latitude", DP: ".Latitude", Type:"REAL"},
			{ParamName: "Longitude", DP: ".Longitude", Type:"REAL"},
			{ParamName: "NomFreq_Hz", DP: ".NomFreq_Hz", Type:"REAL"},
			{ParamName: "NomGridLL_V", DP: ".NomGridLL_V", Type:"REAL"},
			{ParamName: "RequiredBaseGenCapacity_kW", DP: ".RequiredBaseGenCapacity_kW", Type:"REAL"},
			{ParamName: "SchedulePath", DP: ".SchedulePath", Type:"STRING"},
			{ParamName: "SOC_DieselOffAllowed", DP: ".SOC_DieselOffAllowed", Type:"REAL"},
			{ParamName: "SOC_ForceDieselOn", DP: ".SOC_ForceDieselOn", Type:"REAL"},
			{ParamName: "SOC_ReducePV", DP: ".SOC_ReducePV", Type:"REAL"},
			{ParamName: "SpinningReserve_Delay1", DP: ".SpinningReserve_Delay1", Type:"TIME"},
			{ParamName: "SpinningReserve_Delay2", DP: ".SpinningReserve_Delay2", Type:"TIME"},
			{ParamName: "SpinningReserve_Limit1_kW", DP: ".SpinningReserve_Limit1_kW", Type:"REAL"},
			{ParamName: "SpinningReserve_Limit2_kW", DP: ".SpinningReserve_Limit2_kW", Type:"REAL"},
			{ParamName: "SpinningReserveAfterStop", DP: ".SpinningReserveAfterStop", Type:"REAL"},
			{ParamName: "StartMicrogridWith", DP: ".StartMicrogridWith", Type:"ENUM"},
			{ParamName: "TimeZone", DP: ".TimeZone", Type:"STRING"},
			{ParamName: "UseDynamicGridLimits", DP: ".UseDynamicGridLimits", Type:"BOOL"},
			{ParamName: "UseGridLimitSchedule", DP: ".UseGridLimitSchedule", Type:"BOOL"},
			{ParamName: "UseGridReactiveSchedule", DP: ".UseGridReactiveSchedule", Type:"BOOL"},
			{ParamName: "UseOldGUI", DP: ".UseOldGUI", Type:"BOOL"},
			{ParamName: "UseSOCSchedule", DP: ".UseSOCSchedule", Type:"BOOL"},
			{ParamName: "VariableBufferForSpinningReserve", DP: ".VariableBufferForSpinningReserve", Type:"REAL"}
		],
		childs: [
			dioConfig("DI_GridContactor", ".DI_GridContactor"),
			dioConfig("DI_MCBCloseCommandActive", ".DI_MCBCloseCommandActive"),
			dioConfig("DI_NotEmergencyStop", ".DI_NotEmergencyStop"),
			dioConfig("DI_StartBtn", ".DI_StartBtn"),
			dioConfig("DI_StopBtn", ".DI_StopBtn"),
			dioConfig("DI_SystemFailSafeOK", ".DI_SystemFailSafeOK"),
			dioConfig("DI_UPSError", ".DI_UPSError"),
			dioConfig("DO_DieselStartWarning", ".DO_DieselStartWarning"),
			dioConfig("DO_LED_Off", ".DO_LED_Off"),
			dioConfig("DO_LED_On", ".DO_LED_On"),
			dioConfig("DO_LED_Warn", ".DO_LED_Warn"),
			dioConfig("DO_SystemFailSafe", ".DO_SystemFailSafe"),
			userDefinedDOList("DO_UserDefined", ".DO_UserDefined")
		]
	};

var gridConfig = {
		title: "Grid Config",
		variable: ".GridConfig", 
		dp_list: [
			{ParamName: "Self Consumption kP", DP: ".SelfConsumption_kP", Type:"REAL"},
			{ParamName: "Default Max Export", DP: ".DefaultMaxExport_kW", Type:"REAL", Unit: "kW"},
			{ParamName: "Default Max Import", DP: ".DefaultMaxImport_kW", Type:"REAL", Unit: "kW"},
			{ParamName: "Schedule", DP: ".SchedulePath", Type:"STRING"},
			{ParamName: "Reconnect Voltage", DP: ".Reconnect_VoltagePcnt", Type:"STRING", Unit:"%"},
			{ParamName: "Reconnect Frequency", DP: ".Reconnect_FreqPcnt", Type:"STRING", Unit:"%"},
			{ParamName: "Reconnect Delay", DP: ".Delay", Type:"STRING"},
			],
		childs: [
			infoConfig("Info", ".Info")
			]
	};


function infoConfig(title, variable){

	return {
		title: title,
		variable: variable,
		dp_list: [
			{ParamName: "Name", DP: ".Name", Type:"STRING"},
			{ParamName: "Icon", DP: ".Icon", Type:"STRING"},
			{ParamName: "Nom. Generation Cap", DP: ".NomGenCap_kW", Type:"REAL"},
			{ParamName: "Nom. Consumption Cap", DP: ".NomConsCap_kW", Type:"REAL"},
			{ParamName: "Control Place", DP: ".ControlPlace", Type:"ENUM"}
		]
	}
}

function BCUConfig(title, variable){
	return {
		title: title,
		variable: variable,
		dp_list: [
			{ParamName: "Nominal Capacity", DP: ".NominalCapacity_kWh", Type:"REAL", Unit: "kWh"},
			{ParamName: "Capacity Test", DP: ".CapacityTest_kW", Type:"REAL"},
			{ParamName: "Idle Off Allowed", DP: ".IdleOffAllowed", Type:"BOOL"},
			{ParamName: "Max Idle Time", DP: ".MaxIdle_Time", Type:"TIME"},
			{ParamName: "Many more missing right now", DP: ".ControlPlace", Type:"ENUM"}
		],
		childs: [
			infoConfig("Info", ".Info")
		]
	}
}

var BCUParamTree = [];
for(var i=1; i<=4; i++){
	BCUParamTree.push(BCUConfig("BCU "+i+" Standard Config", ".BCUConfig["+i+"]"));
}

var qsysParamTree = [
		systemConfig, 
		gridConfig
	];


function dioConfig(title, variable){
	return {
		title: title,
		variable: variable,
		dp_list: [
			{ParamName: "CardNr", DP: ".CardNr", Type: "DINT"},
			{ParamName: "Channel", DP: ".Channel", Type: "DINT"},
			{ParamName: "Default", DP: ".Default", Type: "BOOL"},
			{ParamName: "Invert Signal", DP: ".InvertSignal", Type: "BOOL"}
		]
	}
}

function userDefinedDOList(title, variable){

	var listNode = {
		title: title,
		variable: variable,
		dp_list: [],
		childs :[]
	};
	for (var i=1; i<=8; i++){
		listNode.childs[i-1] = dioConfig(title+"["+i+"]", "["+i+"]");
	}

	return listNode;

}