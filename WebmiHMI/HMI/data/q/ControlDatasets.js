
function getCommandsList(type){

	switch(type){
		case TYPE_BATTERY:
			return [
					{ParamName: "Active Power Setpoint",DP: ".ActivePowerSetpoint",Type: "REAL",Unit: "kW"},
					{ParamName: "Converter Mode",DP: ".ConverterMode",Type: "ENUM",Unit: "-"},
					{ParamName: "Frequency Adjust",DP: ".FrequencyAdjust",Type: "REAL",Unit: "Hz"},
					{ParamName: "MaxSOC Setpoint",DP: ".MaxSOC_Setpoint",Type: "REAL",Unit: "%"},
					{ParamName: "MinSOC Setpoint",DP: ".MinSOC_Setpoint",Type: "REAL",Unit: "%"},
					{ParamName: "Reactive Power Setpoint",DP: ".ReactivePowerSetpoint",Type: "REAL",Unit: "kvar"},
					{ParamName: "Start",DP: ".ControlWord.B00_Start",Type: "BOOL", Unit: ""},
					{ParamName: "Stop",DP: ".ControlWord.B01_Stop",Type: "BOOL", Unit: ""},
					{ParamName: "Reset Faults",DP: ".ControlWord.B02_ResetFaults",Type: "BOOL", Unit: ""},
				//	{ParamName: "Start Capacity Test",DP: ".ControlWord.B08_StartCapacityTest",Type: "BOOL", Unit: ""},
				//	{ParamName: "Stop Capacity Test",DP: ".ControlWord.B09_StopCapacityTest",Type: "BOOL", Unit: ""},
					{ParamName: "Synch To Grid",DP: ".ControlWord.B12_SynchToGrid",Type: "BOOL", Unit: ""}
				]
	}

}

function getMonitoringList(type){

	switch(type){
		case TYPE_BATTERY:
			return [
					{ParamName: "Active Power",DP: ".Live.TotalPower_kW",Type: "REAL",Unit: "kW"},
					{ParamName: "DC Voltage",DP: ".DCVoltage",Type: "REAL",Unit: "V"},
					{ParamName: "Active Converter Mode",DP: ".ActiveConverterMode",Type: "ENUM",Unit: ""},
					{ParamName: "Frequency",DP: ".Live.Frequency_Hz",Type: "REAL",Unit: "Hz"},
					{ParamName: "SOC",DP: ".AvailableSOC",Type: "REAL",Unit: "%"},
					{ParamName: "Reactive Power",DP: ".Live.ReactivePower_kvar",Type: "REAL",Unit: "kvar"},
					{ParamName: "State",DP: ".Overview.State",Type: "ENUM", Unit: ""},	
					{ParamName: "Voltage LL",DP: ".Live.Voltage_LL",Type: "REAL", Unit: "V"},
					{ParamName: "Voltage LN",DP: ".Live.Voltage_LN",Type: "REAL", Unit: "V"},
					{ParamName: "ShouldRun",DP: ".ControlStatus.StatusWord.B00_ShouldRun",Type: "BOOL", Unit: ""}
				]
	}

}