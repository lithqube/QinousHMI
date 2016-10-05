var $ = top.$;

setupBasicData = function(comp_id, basicdata, isFocus){

	var str_Icon	= basicdata.icon;
	// Show the right icon
	//console.log("Setting icon for "+basicdata.type+"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
	var icon_id = "";
	switch(basicdata.type)
	{
		case TYPE_PV:
		case TYPE_PV_GROUP:
			icon_id = "icon_pv";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			break;
		case TYPE_CONSUMER:
		case TYPE_CONSUMER_GROUP:
			icon_id = "icon_consumer";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			break;
		case TYPE_GRID:
			icon_id = "icon_grid";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			 break;
		case TYPE_BATTERY:
		case TYPE_BATTERY_GROUP:
			icon_id = "icon_battery";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			break;
		case TYPE_DIESEL:
		case TYPE_DIESEL_GROUP:
			icon_id = "icon_diesel";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			break;
		case TYPE_RAWMETER:
			icon_id = "icon_rawmeter";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			break;
		case TYPE_SAMSUNG_RACK:
		case TYPE_BATTERY_STRING:
			icon_id = "icon_samrack";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
			break;
		default:
			icon_id = "icon_unknowns";
			webMI.gfx.setVisible(comp_id+"_"+icon_id, true);
			webMI.gfx.setVisible(comp_id+"_"+"icon_pv", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_grid", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_battery", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_diesel", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_rawmeter", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_samrack", false);
			webMI.gfx.setVisible(comp_id+"_"+"icon_consumer", false);
	}
	
	//console.log("BASICDAT: Subscribing to: "+basicdata.datapoints);
	baseDataSubscription = webMI.data.subscribeBlock(basicdata.datapoints, basicDataCallback(comp_id, basicdata, isFocus));

}

basicDataCallback = function(comp_id, basicdata, isFocus){
	//console.log("BASICDAT: creating callback for comp_id "+comp_id+" with ", basicdata);
	
	getID = function(id_name) {
		if (isFocus) {
			Focus = isFocus;	
			return id_name;
		} else {
			return id_name+"_sub";
		}
	}
	var str_Name			= basicdata.name;	
	// Fill in static data
	webMI.gfx.setText(getID(comp_id+"_"+"txt_name"), str_Name); 
	webMI.gfx.setVisible(getID(comp_id+"_"+"txt_name"), true);


	webMI.trigger.connect("AppendSubcomponents", function(e){
		var currentNode = e.value; 

		if (currentNode != 0){
			webMI.gfx.setVisible(getID(comp_id+"_"+"connectedbottom"), true);	
		}else{
			webMI.gfx.setVisible(getID(comp_id+"_"+"connectedbottom"), false);	
		}
	});
	
	
	for (var i=1; i<=basicdata.lines.length; i++){
		//console.log("Subscribing to line data for "+basicdata.lines[i-1].dp);
		webMI.data.subscribe(basicdata.lines[i-1].dp, new lineCallback(basicdata.lines[i-1].title, basicdata.lines[i-1].unit, getID(comp_id+"_"+"txt_line"+i)));
	}

	//console.log("BASICDAT: subscribed to lines");
	//console.log("/////////////////////// returning the basicdata callback function");
	return function(e){
		//console.log(" Main subscription callback!! ", this);
		if (typeof e == 'undefined'){
//			console.log("==== no comp data on callaback ====");
			return;
		} else if (typeof e.length == 0) {
//			console.log("==== component data empty on callaback ====");
			return;
		}

		var val_ControlPlace	= e[0].value;		
		var val_MainsConnected	= e[1].value;
		var val_Power			= e[2].value;
		var val_State			= e[3].value;
		var val_NomConsCap_kW	= e[4].value;
		var val_NomGenCap_kW	= e[5].value;
		var val_Reactive		= e[6].value;

		if (typeof val_Power == 'undefined'){
			val_Power = 0;
		}
		if (typeof val_Reactive == 'undefined'){
			val_Reactive = 0;
		}
		var val_Generation = val_Power;
		if (!basicdata.generator) {
			val_Generation = -val_Generation;
		}

		// -------------------------------------------------
		//console.log("Setting the state");
		var power = val_Power;
		var state = val_State;
		var state_text;
		switch (state) {
			case 1:
				state_text = "Initializing";
				break;
			case 2:
				state_text = "Communication Check";
				break;
			case 3:
				state_text = "No Communication";
				break;
			case 4:
				state_text = "Connected";
				break;
			case 5:
				state_text = "Off";
				break;
			case 6:
				state_text = "Shutting Down";
				break;
			case 7:
				state_text = "Configuring Parameters";
				break;
			case 8:
				state_text = "Standby";
				break;
			case 8:
				state_text = "Starting Up";
				break;
			case 10:
				state_text = "Faulted";
				break;
			case 11:
				state_text = "Running";
				break;
			case 12:
				state_text = "Connecting Subcomponent";
				break;
			case 13:
				state_text = "Disconnecting Subcomponent";
				break;
			case 14:
				state_text = "Unknown";
				break;
		   default: 
				webMI.gfx.setText(id, "???");
		}
		
		var id = getID("txt_summary");
		// check this implementation set the text on different function (maybe)		
		webMI.gfx.setText(comp_id+"_"+id, state_text +" / "+power.toFixed(1)+" kW / "+val_Reactive.toFixed(2)+" kvar");
		webMI.gfx.setVisible(comp_id+"_"+id, true);
	
// show MainsConnected
		var id = "disconnect";
		if (val_MainsConnected == false) {
			if (isFocus){
			webMI.gfx.setVisible(comp_id+"_"+"lineFocus", false);
			}
			webMI.gfx.setVisible(comp_id+"_"+id, true);
		}
		else {
			if (isFocus){
			webMI.gfx.setVisible(comp_id+"_"+"lineFocus", true);

			}
			webMI.gfx.setVisible(comp_id+"_"+id, false);
		}
		setArrows(val_Generation, val_NomGenCap_kW, val_NomConsCap_kW, basicdata.arrowsOnTop, comp_id);
	}
//


}

function getFractionalPower(power, total, max){
	if (typeof max == 'undefined'){
		max = 3;
	}
	return Math.round(max*(power/total));	
}

function setArrows(GenPower, GenCap, ConsCap, OnTop, comp_id){
	//console.log("Setting arrows");
	// --------------------------------------------- 
	// AT TOP 
	var downarrows_top	= [comp_id+"_"+"connectednode_sub",
							comp_id+"_"+"arrow_down1",
							comp_id+"_"+"arrow_down2",
							comp_id+"_"+"arrow_down3",
							comp_id+"_"+"lineNode_component"];
	var uparrows_top = [comp_id+"_"+"connectednode_sub",
							comp_id+"_"+"arrow_up1",
							comp_id+"_"+"arrow_up2",
							comp_id+"_"+"arrow_up3",
							comp_id+"_"+"lineNode_component"];
	var downarrows_bottom	= [comp_id+"_"+"connectednode_sub",
							comp_id+"_"+"arrowbottom_down1",
							comp_id+"_"+"arrowbottom_down2",
							comp_id+"_"+"arrowbottom_down3"];
	var uparrows_bottom = [comp_id+"_"+"connectednode_sub",
							comp_id+"_"+"arrowbottom_up1",
							comp_id+"_"+"arrowbottom_up2",
							comp_id+"_"+"arrowbottom_up3"];
	if (OnTop){

		// hide bottom arrows
		for (var i=0; i<downarrows_bottom.length; i++){
			webMI.gfx.setVisible(downarrows_bottom[i], false);
		}		
		for (var i=0; i<uparrows_bottom.length; i++){
			webMI.gfx.setVisible(uparrows_bottom[i], false);
		}	

		if (GenPower <= 0){
			// Down direction 

			// hide up arrows
			for (var i=0; i<uparrows_top.length; i++){
				webMI.gfx.setVisible(uparrows_top[i], false);
			}	

			if (GenPower < 0){
				var arrowcount = getFractionalPower(-GenPower, ConsCap, downarrows_top.length);
				// show down arrows correctly 
				for (var i=0; i<downarrows_top.length; i++){
					webMI.gfx.setVisible(downarrows_top[i], true);

					if (i<=arrowcount){
						webMI.gfx.setFill(downarrows_top[i], COLOR_ARROW_GREEN);
					} else {
						webMI.gfx.setFill(downarrows_top[i], COLOR_ARROW_GREY);
					}
				}
			}

		} 

		if (GenPower >= 0) {	
			//Up direction
			// hide down arrows
			for (var i=0; i<downarrows_top.length; i++){
				webMI.gfx.setVisible(downarrows_top[i], false);
			}	

			if (GenPower > 0){
				var arrowcount = getFractionalPower(GenPower, GenCap, uparrows_top.length);
				//console.log("Arrow count", arrowcount);
				// show down arrows correctly 
				for (var i=0; i<uparrows_top.length; i++){
					webMI.gfx.setVisible(uparrows_top[i], true);
					
					if (i<=arrowcount){
						webMI.gfx.setFill(uparrows_top[i], COLOR_ARROW_GREEN);
					} else {
						webMI.gfx.setFill(uparrows_top[i], COLOR_ARROW_GREY);
					}
				}
			}
	
		}

	} else { // onBottom

		for (var i=0; i<downarrows_top.length; i++){
			webMI.gfx.setVisible(downarrows_top[i], false);
		}		
		for (var i=0; i<uparrows_top.length; i++){
			webMI.gfx.setVisible(uparrows_top[i], false);
		}	

		if (GenPower >= 0){
		
		// Down direction 

			// hide up arrows
			for (var i=0; i<uparrows_bottom.length; i++){
				webMI.gfx.setVisible(uparrows_bottom[i], false);
			}	

			if (GenPower > 0){
				var arrowcount = getFractionalPower(GenPower, GenCap, downarrows_bottom.length);

				// show down arrows correctly 
				for (var i=0; i<downarrows_bottom.length; i++){
					webMI.gfx.setVisible(downarrows_bottom[i], true);
					if (i<=arrowcount){
						webMI.gfx.setFill(downarrows_bottom[i], COLOR_ARROW_GREEN);
					} else {
						webMI.gfx.setFill(downarrows_bottom[i], COLOR_ARROW_GREY);
					}
				}
			}

		} 

		if (GenPower <= 0) {	
		
			//Up direction
			// hide down arrows
			for (var i=0; i<downarrows_bottom.length; i++){
				webMI.gfx.setVisible(downarrows_bottom[i], false);
			}	

			if (GenPower < 0){
				var arrowcount = getFractionalPower(-GenPower, ConsCap, uparrows_bottom.length);

				// show down arrows correctly 
				for (var i=0; i<uparrows_bottom.length; i++){
					webMI.gfx.setVisible(uparrows_bottom[i], true);
					if (i<=arrowcount){
						webMI.gfx.setFill(uparrows_bottom[i], COLOR_ARROW_GREEN);
					} else {
						webMI.gfx.setFill(uparrows_bottom[i], COLOR_ARROW_GREY);
					}
				}
			}
	
		}
	}	

}

lineCallback = function(i_title, i_unit, i_id){

	var title = i_title;
	var unit = i_unit;
	var id = i_id;
	//console.log("lineCallback "+title+" "+id+" "+unit);	
	return function(e){
		var value	= e.value;
		if (typeof value === 'undefined'){
			val_Value_1 = "---";
		}
		//console.log("Setting "+id+" with "+value);
		webMI.gfx.setText(id, title+": "+ value.toFixed(1) +" "+unit);
		webMI.gfx.setVisible(id, true);

		
	}
}

createClickEvent = function(id){
	//console.log("adding click event: ",id);
	return function(e) {
			//console.log("You clicked on me ");
			//console.log("You clicked on me "+id);
			if (id >= 0) {
				webMI.trigger.fire("MoveToSubcomponent", id);
			}
		}
};



///////////////////////////////

function recursiveIDUpdate(component, new_id){

	var full_id = component.attr("id");
	$(component).find("*").each(function(){
		var old_id = this.id;
		this.id = old_id.replace(full_id, new_id);
	});
	$(component).attr("id", new_id);
	
}


///////////////////////////////////////////////
getLinesFor = function(node){

	//console.log("Getting lines for: ", node);
	switch(node.Type){
		case TYPE_DIESEL:
		case TYPE_DIESEL_GROUP:
			return [{
					title: 'Apparent Power',
					dp: node.DataDP + ".Live.ApparentPower_kVA",
					unit: "kVA"
					},
					{
					title: 'PF',
					dp: node.DataDP + ".Live.PowerFactor",
					unit: ""
					},
					{
					title: 'Fuel Level',
					dp: node.DataDP + ".FuelLevel_pcnt",
					unit: "%"
					}];
		case TYPE_PV:
		case TYPE_PV_GROUP:
			return [{
					title: 'Active Power',
					dp: node.DataDP + ".Live.TotalPower_kW",
					unit: "kW"
					},
					{
					title: 'Reactive Power',
					dp: node.DataDP + ".Live.ReactivePower_kvar",
					unit: "kvar"
					},
					{
					title: 'PF',
					dp: node.DataDP + ".Live.PowerFactor",
					unit: ""
					}];
		case TYPE_GRID :
			return [];
		case TYPE_BATTERY:
		case TYPE_BATTERY_GROUP:
			return [{
					title: 'Setpoint',
					dp: node.DataDP + ".ControlStatus.ActivePowerSetpoint",
					unit: "kW"
					},
					{
					title: 'SOE',
					dp: node.DataDP + ".Battery.AvailableSOE",
					unit: "kWh"
					},
					{
					title: 'Delivered AC',
					dp: node.DataDP + ".Converter.AC.TotalDelivered_kWh",
					unit: "kWh"
					},
					{
					title: 'Charged AC',
					dp: node.DataDP + ".Converter.AC.TotalConsumed_kWh",
					unit: "kWh"
					}
					];
		case TYPE_SAMSUNG_RACK:
			return [{
					title: 'SOC',
					dp: node.DataDP + ".RackSOC",
					unit: "%"
					},
					{
					title: 'Voltage',
					dp: node.DataDP + ".RackVoltage",
					unit: "V"
					},
					{
					title: 'Ave Cell Temp',
					dp: node.DataDP + ".AverageCellTemperature",
					unit: "V"
					}
					];
		case TYPE_BATTERY_STRING:
			return [{
					title: 'SOC',
					dp: node.DataDP + ".SOC",
					unit: "%"
					},
					{
					title: 'Voltage',
					dp: node.DataDP + ".StringVoltage",
					unit: "V"
					},
					{
					title: 'Min Voltage',
					dp: node.DataDP + ".MinCellVoltage",
					unit: "V"
					},
					{
					title: 'Max Voltage',
					dp: node.DataDP + ".MaxCellVoltage",
					unit: "V"
					}
					];
		case TYPE_CONSUMER:
		case TYPE_CONSUMER_GROUP:	
			return [{
					title: 'Consumption',
					dp: node.DataDP + ".Live.TotalPower_kW",
					unit: "kW"
					},
					{
					title: 'Consumed',
					dp: node.DataDP + ".Live.TotalConsumed_kWh",
					unit: "kWh"
					}];
		default:
			return [];
	}

}

///////////////////////////// end set node


getBasicData = function(node, arrowsOnTop){

	//console.log("Getting basic data for ", node);	

	if (typeof arrowsOnTop === 'undefined') {
		arrowsOnTop = true;
	}

	if (node == undefined){
//		console.log("No node supplied!? Then no basic data");
		return;

	} else {

		if ((node.Type == TYPE_CONSUMER) || (node.Type == TYPE_CONSUMER_GROUP)) {
			powerIsGeneration	= false;
			dp_Power			= node.DataDP + ".Overview.FilteredCons_kW"; 
			dp_ControlPlace		= node.DataDP + ".Overview.MainsConnected"; // no control place for consumers....
		} else {
			powerIsGeneration	= true;
			dp_Power			= node.DataDP + ".Overview.FilteredGen_kW"; 
			dp_ControlPlace		= node.DataDP + ".ControlStatus.ControlPlace";
		}

		if (node.Type == TYPE_BATTERY) {
			dp_Nominal = ".Converter.Nominal";
			dp_ReactivePower = node.DataDP + ".Converter.AC.ReactivePower_kvar";
		} else {
			dp_Nominal = ".Capacity";
			dp_ReactivePower = node.DataDP + ".Live.ReactivePower_kvar";
		}

	}

	return {
			datapoints: 
				[
					dp_ControlPlace,			
					node.DataDP + ".Overview.MainsConnected",
					dp_Power,
					node.DataDP + ".Overview.State",
					node.ConfigDP + ".Properties"+dp_Nominal+".NomConsCap_kW",
					node.ConfigDP + ".Properties"+dp_Nominal+".NomGenCap_kW",
					dp_ReactivePower
				],
			name: node.Name,
			icon: node.Icon,	
			type: node.Type,
			generator: powerIsGeneration,
			arrowsOnTop: arrowsOnTop,
			lines: getLinesFor(node),
	};
}

function getFooterConfig(tree){

	var configArray = [];

	// System Voltage
	configArray.push({
		title: "Voltage",
		dp:	"/" + SYSTEM_TASK + "/.SystemData.GridVoltage",
		unit: "V"
	});

	// System Frequency
	configArray.push({
		title: "Freq",
		dp:	"/" + SYSTEM_TASK + "/.SystemData.GridFrequency",
		unit: "Hz"
	});

	// Power for each group
	for (var i=0; i<tree.subComponentList.length; i++){

		var node = tree.subComponentList[i];
		var powerDP = ".FilteredGen_kW"
		if ((node.Type ==  TYPE_CONSUMER) || (node.Type == TYPE_CONSUMER_GROUP)) {
			powerDP = ".FilteredCons_kW";
		}

		if (node.Name == undefined){

			console.log("no name? ", node);
			node.Name = 'undefined';
	
		}
		configArray.push({
			title: node.Name.substring(0,6),
			dp:	node.DataDP + ".Overview" + powerDP,
			unit: "kW"
		});

		if ((node.Type == TYPE_BATTERY) || (node.Type == TYPE_BATTERY_GROUP)) {
			configArray.push({
				title: "SOC",
				dp:	node.DataDP + ".Battery.AvailableSOC",
				unit: "%"
			});
			configArray.push({
				title: "SOE",
				dp:	node.DataDP + ".Battery.AvailableSOE",
				unit: "kWh"
			});
		}

	}
	return configArray;

}

/////////////////////////////
