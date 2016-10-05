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
		case(TYPE_RACK):
			return "Rack";
	}
}

function getDataDP(itemType){

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
			return ".PVData";
		case(TYPE_CONSUMER):
			return ".ConsumerData";
		case(TYPE_BATTERY):
			return ".BCUData";
		case(TYPE_DIESEL):
			return ".DieselData";
		case(TYPE_SAMSUNG_RACK):
			return ".SamsungIO";
	}

}

function getConfigDP(itemType){

	switch(itemType){
		case(TYPE_SYSTEM):
			return ".SystemCfg";
		case(TYPE_PV_GROUP):
			return "";// "PVGroupConfig";
		case(TYPE_CONSUMER_GROUP):
			return "";// "ConsumerGroupC
		case(TYPE_GRID):
			return ".GridConfig";
		case(TYPE_BATTERY_GROUP):
			return ".BatteryGroupConfig";
		case(TYPE_DIESEL_GROUP):
			return ".DieselGroupConfig";
		case(TYPE_PV):
			return ".PVConfig";
		case(TYPE_CONSUMER):
			return ".ConsumerConfig";
		case(TYPE_BATTERY):
			return ".BCUConfig";
		case(TYPE_DIESEL):
			return ".DieselConfig";			
	}

}

function addVirtualItemsToTree(tree, taskName){
	// add virtual items to component tree first
	console.log("NB: setting up virtual item callback");
	for (var i = 1; i <= 16; i++){
		
		webMI.data.read([
		"/"+taskName+"/.VirtualItemCfg["+i+"].Group",
		"/"+taskName+"/.VirtualItemCfg["+i+"].Index",
		"/"+taskName+"/.VirtualItemCfg["+i+"].Info.Name",
		"/"+taskName+"/.VirtualItemCfg["+i+"].Info.Icon"

		], function(e){
			console.log("Retrieved virtual item info");
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
						"/"+taskName+"/"+getConfigDP(type)+"["+index+"]",
						"/"+taskName+"/"+getDataDP(type)+"["+index+"]",
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
		["/"+taskName+"/.ExternalTaskCfg[" + i + "].TaskName",
		"/"+taskName+"/.ExternalTaskCfg[" + i + "].ModuleName"], 
		externalTaskCallBack("/"+taskName+"/.ExternalTaskCfg[" + i + "]", tree, externalTaskList));
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
			var configPrefix = "/"+TaskName+"/"+getConfigDP(Type)+"["+OwnIndex+"]";
			webMI.data.read(
				[configPrefix+".Info.Name", configPrefix+".Info.Icon"], 
				externalInfoCallback(TaskName, ModuleName, Type, OwnIndex, tree));
			
		}

	}
}

generateSamVacCallback = function(taskNode){

	return function(g){
		//console.log(" call back for component tree on samvac. racks: ", g);
		var rackcount = g.value;
		for (var k=1;k<=rackcount;k++){

			var dpConfig = "/" + taskNode.TaskName+"/.SamsungCfg["+taskNode.Index+"].Rack"
			var dpData= "/" + taskNode.TaskName+"/.SamsungBCU["+taskNode.Index+"].SamsungIO["+k+"].Read"

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

function externalInfoCallback(TaskName, ModuleName, Type, OwnIndex, tree){
				
	return function(f){		

		//console.log ("External task info callback with: ", f);
		var name = f[0].value;
		var icon = f[1].value;
		var configDP = "/"+TaskName+"/"+getConfigDP(Type)+"["+OwnIndex+"]"
		var dataDP = "/"+TaskName+"/"+getDataDP(Type)+"["+OwnIndex+"]"
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
			taskNode.AlarmDPList.push(dataDP+".EventSensors");
			for (var i=0; i<16; i++){
				// get the configurable event sensors and add to dp_list and masks
				webMI.data.read([configDP+".EventSensors["+i+"].Name",
									configDP+".EventSensors["+i+"].ActiveEvent"],
									eventSensorAlarmMaskCallback(taskNode, i)
				);
			}
		}

		////////////////////// CHECK HERE FOR MODULE SPECIFIC SUB-ELEMENTS
		// samvac specific -- add the racks to tree
		if (ModuleName == "samvac.m"){

			var dprackcount = "/" + TaskName + "/.SamsungCfg["+OwnIndex+"].Rack.NumRacks";
			webMI.data.read(dprackcount, generateSamVacCallback(taskNode));

		}
	}
}

function eventSensorAlarmMaskCallback(taskNode, maskIndex){
	
	return function(f) {
		var name = f[0].value;
		var level = f[1].value;
		taskNode.AlarmMaskList.push({
				value: 2^(maskIndex-1),
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
		dpConfig = "/"+taskName+"/"+getConfigDP(itemType)+"["+localIndex+"]";
	}
	this.ConfigDP = dpConfig;

	if (dpData == undefined) {
		dpData = "/" + taskName+"/"+getDataDP(itemType)+"["+localIndex+"]";
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