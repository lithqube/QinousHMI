function getDefaultName(itemType){
	
	switch(itemType){
		case(TYPE_PV_GROUP):
			return "PV Group";
		case(TYPE_CONSUMER_GROUP):
			return "Consumer Group";
		case(TYPE_GRID):
			return "Grid";
		case(TYPE_BATTERY_GROUP):
			return "Battery Group";
		case(TYPE_DIESEL_GROUP):
			return "Diesel Group";
		case(TYPE_PV):
			return "PV";
		case(TYPE_CONSUMER):
			return "Consumer";
		case(TYPE_BATTERY):
			return "Battery";
		case(TYPE_DIESEL):
			return "Diesel";	
		case(TYPE_SAMSUNG_RACK):
			return "Rack";
		case(TYPE_BATTERY_STRING):
			return "String";
	}
}

function getDataDP(itemType, index){

	switch(itemType){
		case(TYPE_SYSTEM):
			return ".SystemData";
		case(TYPE_PV_GROUP):
			return ".PVGroupData";
		case(TYPE_CONSUMER_GROUP):
			return ".ConsumerGroupData";
		case(TYPE_GRID):
			return ".GridData";
		case(TYPE_BATTERY_GROUP):
			return ".BatteryGroupData";
		case(TYPE_DIESEL_GROUP):
			return ".DieselGroupData";
		case(TYPE_PV):
			return ".PVData"+"["+index+"]";
		case(TYPE_CONSUMER):
			return ".ConsumerData"+"["+index+"]";
		case(TYPE_BATTERY):
			return ".BCUData"+"["+index+"]";
		case(TYPE_DIESEL):
			return ".DieselData"+"["+index+"]";
		case(TYPE_SAMSUNG_RACK):
			return ".SamsungIO"+"["+index+"]";
		case(TYPE_BATTERY_STRING):
			return ".Battery.Strings"+"["+index+"]";
	}

}

function getConfigDP(itemType, index){

	switch(itemType){
		case(TYPE_SYSTEM):
			return ".SystemCfg";
		case(TYPE_PV_GROUP):
			return "";// "PVGroupConfig";
		case(TYPE_CONSUMER_GROUP):
			return "";// "ConsumerGroupC
		case(TYPE_GRID):
			return ".GridCfg";
		case(TYPE_BATTERY_GROUP):
			return ".BatteryGroupCfg";
		case(TYPE_DIESEL_GROUP):
			return ".DieselGroupCfg";
		case(TYPE_PV):
			return ".PVCfg"+"["+index+"]";
		case(TYPE_CONSUMER):
			return ".ConsumerCfg"+"["+index+"]";
		case(TYPE_BATTERY):
			return ".BCUCfg"+"["+index+"]";
		case(TYPE_DIESEL):
			return ".DieselCfg"+"["+index+"]";			
	}

}

function addVirtualItemsToTree(tree, taskName){
	// add virtual items to component tree first
	//console.log("virtual item callback");
	for (var i = 1; i <= 16; i++){
		
		webMI.data.read([
		"/"+taskName+"/.SystemCfg.Properties.VirtualItems["+i+"].Group",
		"/"+taskName+"/.SystemCfg.Properties.VirtualItems["+i+"].Index",
		"/"+taskName+"/.SystemCfg.Properties.VirtualItems["+i+"].Info.Name",
		"/"+taskName+"/.SystemCfg.Properties.VirtualItems["+i+"].Info.Icon"

		], function(e){
			//console.log("Retrieved virtual item info");
			var type = e[0].value;
			var index = e[1].value;
			if (type!= 0) {
				//add item to system tree
				var name = e[2].value;	
				var icon = e[3].value;
				var newNode = new ComponentTreeNode(
						name,
						icon,
						type,
						index,
						taskName,
						"",
						"/"+taskName+"/"+getConfigDP(type, index),
						"/"+taskName+"/"+getDataDP(type, index),
						[],
						[]); // virtual items have no alarms or alarm masks
				addItemToTree(newNode, tree);
			}
		});
		
	}
}

function addExternalItemsToTree(tree, taskName, externalTaskList){
	
	for (var i = 1; i <= 8; i++){
		webMI.data.read(
		["/"+taskName+"/.SystemCfg.Properties.ExternalTasks[" + i + "].TaskName",
		"/"+taskName+"/.SystemCfg.Properties.ExternalTasks[" + i + "].ModuleName"], 
		externalTaskCallBack("/"+taskName+"/.SystemCfg.Properties.ExternalTasks[" + i + "]", tree, externalTaskList));
	}

}

externalTaskCallBack = function(prefix, tree, externalTaskList){

	return function(e){
		var TaskName = e[0].value;
		var ModuleName = e[1].value;

		// only continue if there is actually an external task configured here
		if (TaskName !== ""){
			externalTaskList.push({task: TaskName, module: ModuleName});

			// get items
			for (var j = 1; j <= 8; j++){

				webMI.data.read(
				[prefix + ".Items[" + j +"].ItemType",
				prefix + ".Items[" + j +"].ExternalIndex",
				prefix + ".Items[" + j +"].LocalIndex",
				], externalTaskItemCallBack(TaskName, ModuleName, tree));

				//console.log ("Created item callback: "+prefix);
			}
		}
	}
}


externalTaskItemCallBack = function(TaskName, ModuleName, tree){

	return function(f){
		var Type = f[0].value;
		var OwnIndex = f[1].value;
		var QsysIndex = f[2].value;

		if ((Type == "0") || (Type == 0)) {
			//			console.log("no item configured ");
		} else if (Type == TYPE_RAWMETER) {
			//			console.log("ignore raw meters");
		} else {

			// get the name and icon from the external task and add the component
			// to the system tree
			var configPrefix = "/"+TaskName+"/"+getConfigDP(Type, OwnIndex);
			webMI.data.read(
				[configPrefix+".Operation.Info.Name", configPrefix+".Operation.Info.Icon"], 
				externalInfoCallback(TaskName, ModuleName, Type, OwnIndex, tree));
			
		}

	}
}

generateSamVacCallback = function(taskNode){

	return function(g){
		console.log(" call back for component tree on samvac. racks: ", g);
		var rackcount = g.value;
		if (g.value !== undefined) {
			for (var k=1;k<=rackcount;k++){
	
				var dpConfig = "/" + taskNode.TaskName+"/.SamsungCfg["+taskNode.Index+"].BatteryConfig"
				var dpData= "/" + taskNode.TaskName+"/.Samsung_ReadData["+taskNode.Index+"].Rack["+k+"]"
	
				var alarmInfo = getStdAlarmInfo(dpData, TYPE_SAMSUNG_RACK);
				var racknode =	new ComponentTreeNode(
						"Rack "+k,
						"",
						TYPE_SAMSUNG_RACK, 
						taskNode.Index, 
						taskNode.TaskName, 
						taskNode.ModuleName, 
						dpConfig, 
						dpData,
						alarmInfo.DP_List,
						alarmInfo.Masks
						);
				racknode.RackNumber = k;
				taskNode.addSubComponent(racknode);
			}
		}
	}

}

generateBatteryStringCallback = function(taskNode){

	return function(g){
		console.log(" call back for component tree on battery strings: ", g);
		var stringcount = g.value;
		if (g.value !== undefined) {
			for (var k=1;k<=stringcount;k++){
	
				var dpConfig = "/" + taskNode.TaskName+"/.SamsungCfg["+taskNode.Index+"].BatteryConfig"
				var dpData= "/" + taskNode.TaskName+"/.BCUData["+taskNode.Index+"].Battery.Strings["+k+"]"
	
				var alarmInfo = getStdAlarmInfo(dpData, TYPE_BATTERY_STRING);
				var stringnode =	new ComponentTreeNode(
						"String "+k,
						"",
						TYPE_BATTERY_STRING, 
						taskNode.Index, 
						taskNode.TaskName, 
						taskNode.ModuleName, 
						dpConfig, 
						dpData,
						alarmInfo.DP_List,
						alarmInfo.Masks
						);
				stringnode.StringNumber = k;
				taskNode.addSubComponent(stringnode);
			}
		}
	}

}

function externalInfoCallback(TaskName, ModuleName, Type, OwnIndex, tree){
				
	return function(f){		

		//console.log ("External task info callback with: ", f);
		var name = f[0].value;
		var icon = f[1].value;
		var configDP = "/"+TaskName+"/"+getConfigDP(Type, OwnIndex)
		var dataDP = "/"+TaskName+"/"+getDataDP(Type, OwnIndex)
		var alarmInfo = getStdAlarmInfo(dataDP, Type);
		var	taskNode = new ComponentTreeNode(
			name,
			icon,
			Type, 
			OwnIndex, 
			TaskName, 
			ModuleName,
			configDP,
			dataDP,
			alarmInfo.DP_List,
			alarmInfo.Masks);
		addItemToTree(taskNode, tree);
		
		if (Type == TYPE_BATTERY){

			var dprackcount = configDP + ".Properties.Battery.TotalStringCount";
			webMI.data.read(dprackcount, generateBatteryStringCallback(taskNode));

			taskNode.AlarmDPList.push(dataDP+".EventSensors");
			taskNode.AlarmMaskList.push([]);
			var maskList_EventIndex = taskNode.AlarmDPList.length - 1;

			taskNode.AlarmDPList.push(dataDP+".TempAlarmWord");
			taskNode.AlarmMaskList.push([]);
			var maskList_TempWarnIndex = taskNode.AlarmDPList.length - 1;

			taskNode.AlarmDPList.push(dataDP+".TempWarningWord");
			taskNode.AlarmMaskList.push([]);
			var maskList_TempAlarmIndex = taskNode.AlarmDPList.length - 1;

			for (var i=1; i<=16; i++){
				// get the configurable event sensors and add to dp_list and masks
				webMI.data.read([configDP+".EventSensors["+i+"].Name",
									configDP+".EventSensors["+i+"].ActiveEvent"],
									eventSensorAlarmMaskCallback(taskNode, i-1, maskList_EventIndex)
				);
				// get temperature names and events
				if (i<=8) {
					webMI.data.read([configDP+".Temps["+i+"].Name",
										configDP+".Temps["+i+"].AlarmEvent"],
										temperatureAlarmMaskCallback(taskNode, i-1, maskList_TempWarnIndex, maskList_TempAlarmIndex)
						);
				}
			}

		}

		////////////////////// CHECK HERE FOR MODULE SPECIFIC SUB-ELEMENTS
		// samvac specific -- add the racks to tree
/*		if (ModuleName == "samvac.m"){

			var dprackcount = "/" + TaskName + "/.SamsungCfg["+OwnIndex+"].Samsung.BatteryConfig.RackCount";
			webMI.data.read(dprackcount, generateSamVacCallback(taskNode));

		}*/

	}
}

function temperatureAlarmMaskCallback(taskNode, maskIndex, warnIndex, alarmIndex){
	
	return function(f) {
		var name = f[0].value;
		var level = f[1].value;
		taskNode.AlarmMaskList[warnIndex].push({
				value: Math.pow(2,maskIndex),
				name: "UT:" + name,
				level: ALARM_LEVEL_WARNING		
		});
		taskNode.AlarmMaskList[warnIndex].push({
				value: Math.pow(2,maskIndex+8),
				name: "OT:" + name,
				level: ALARM_LEVEL_WARNING		
		});

		taskNode.AlarmMaskList[alarmIndex].push({
				value: Math.pow(2,maskIndex),
				name: "UT: " + name,
				level: Math.min(level, ALARM_LEVEL_ERROR)
		});
		taskNode.AlarmMaskList[alarmIndex].push({
				value: "OT: "+Math.pow(2,maskIndex+8),
				name: name,
				level: Math.min(level, ALARM_LEVEL_ERROR)
		});
	}
}

function eventSensorAlarmMaskCallback(taskNode, maskIndex, listIndex){
	
	return function(f) {
		var name = f[0].value;
		var level = eventToAlarmLevel(f[1].value);
		taskNode.AlarmMaskList[listIndex].push({
				value: Math.pow(2,maskIndex),
				name: name,
				level: level
		});
	}
}

function addItemToTree(pNewNode, tree){

	//console.log("Adding node to tree: ", tree);
	var itemFound = false;
	var mainElementCount = tree.subComponentList.length;

	for (var i=0; i<mainElementCount; i++){

		if ((tree.subComponentList[i].Type == pNewNode.Type) || (tree.subComponentList[i].Type == (pNewNode.Type+100))){

			var mainNode = tree.subComponentList[i];

			itemFound = true;

			var memberCount = mainNode.subComponentList.length;
			if (memberCount == 0) {

				// use the group now instead of the single item
				//console.log("Creating a group item for "+mainNode.Type);
				var groupType = mainNode.Type + 100;
				groupNode = new ComponentTreeNode(			
					getDefaultName(groupType),
					"",
					groupType,
					0,
					SYSTEM_TASK,
					"",
					"/"+SYSTEM_TASK+"/"+getConfigDP(groupType),
					"/"+SYSTEM_TASK+"/"+getDataDP(groupType)
				);
				tree.subComponentList[i] = groupNode;
				groupNode.subComponentList[0] = mainNode;
				
			}

			// append to the list
			groupNode.subComponentList.push(pNewNode);
			//console.log("Added node to existing group of type "+groupNode.Type+", it now has "+groupNode.subComponentList.length+" items");
		}

	}
	if (!itemFound) {

		tree.subComponentList.push(pNewNode);

		//console.log("added group item: Type="+tree.subComponentList[mainElementCount].Type+", Index="+tree.subComponentList[mainElementCount].Index+", TaskName="+tree.subComponentList[mainElementCount].TaskName);
		//console.log("subcomponents="+tree.subComponentList.length);

	}
	return tree;
}

function ComponentTreeNode(
	name,
	icon,
	itemType, 
	localIndex, 
	taskName, 
	moduleName, 
	dpConfig, 
	dpData,
	alarm_dps,
	alarm_masks){

	this.Name = name,
	this.Icon = icon,
	this.Type = itemType;
	this.Index = localIndex;
	this.TaskName = taskName;
	this.ModuleName = moduleName;
	if (dpConfig == undefined) {
		dpConfig = "/"+taskName+"/"+getConfigDP(itemType,localIndex);
	}
	this.ConfigDP = dpConfig;

	if (dpData == undefined) {
		dpData = "/" + taskName+"/"+getDataDP(itemType,localIndex);
	}
	this.DataDP = dpData;
	
	if (alarm_dps == undefined) {
		alarm_dps = [];
	}
	if (alarm_masks == undefined){
		alarm_masks = [];
	}
	this.AlarmDPList = alarm_dps;
	this.AlarmMaskList = alarm_masks;
	this.ActiveAlarms = [];
	this.subComponentList = [];

	return this;

}

ComponentTreeNode.prototype.addSubComponent = function(newNode){


	var itemFound = false;
	var subCompCount = this.subComponentList.length;

	this.subComponentList.push(newNode);

	return this;

}