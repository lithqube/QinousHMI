//table functions
function getWriteFunction(address, type) {
//	console.log("getting the write function ", address, type);
	if (type == 'TIME'){
		return function(e) {
			var value = prompt("Value? Give as Time T#xxx[h/m/s/ms]");
//			console.log("Got: ", value, " for ", address);
			if (value != null) {
				var time = value;
				var type = "";
				var splitIndex = value.search(/[^\d\.]/);
				if (splitIndex >= 0){
					time = value.substr(0, splitIndex);
					type = value.substr(splitIndex, value.length).trim();
				}
//				console.log("Split into: "+time+", "+type+" using "+splitIndex);
				if (type == 's') {
					time = time*1000;
				} else if (type == 'm') {
					time = time*60*1000;
				} else if (type == 'h') {
					time = time*60*60*1000;
				} else if (type == 'd') {
					time = time*24*60*60*1000;
				} else {
					time = time; // keep as ms
				}			
				webMI.data.write(address,time);
			}
		};
	
	} else if (type == 'ENUM') {

		return function(e) {
			var enumHash = getEnumHash(address);
			var promptString = "Value?";
			for (var i=0; i<enumHash.length; i++){
				promptString = promptString + "\n"+enumHash[i].Name+"="+enumHash[i].Index;
			}
			var value = prompt(promptString);
			if (value != null) {
				webMI.data.write(address,value);
			}
		};

	} else {
		return function(e) {
			var value = prompt("Value?");
			if (value != null) {
				webMI.data.write(address,value);
			}
		};
	}

}
function getEnumHash(dp){

	var enumHash = [];

	var tokenArray = dp.split(/[.]/);
	var rel_key = tokenArray[tokenArray.length-1];
//	console.log("relative key is ", rel_key);


	if (rel_key.indexOf('ConverterMode') >= 0){

		enumHash.push({Index:0, Name:"Unknown"});
		enumHash.push({Index:1, Name:"VS Isochron"});
		enumHash.push({Index:2, Name:"VS Droop"});
		enumHash.push({Index:3, Name:"Grid Follow"});
		
	} else if (rel_key.indexOf('CommLoss') >= 0) {

		enumHash.push({Index:0, Name:"Do Nothing"});
		enumHash.push({Index:1, Name:"Ramp to Droop"});
		enumHash.push({Index:2, Name:"Ramp Off"});
		enumHash.push({Index:3, Name:"Mode Dependent"});
		enumHash.push({Index:4, Name:"Switch To Master"});

	} else if (rel_key.indexOf('ControlPlace') >= 0){

		enumHash.push({Index:1, Name:"Blocked"});
		enumHash.push({Index:2, Name:"GUI"});
		enumHash.push({Index:3, Name:"Qinous"});
		enumHash.push({Index:4, Name:"Modbus"});
		enumHash.push({Index:5, Name:"IEC60870_104"});

	} else if (rel_key.indexOf('State') >= 0){

		enumHash.push({Index:1, Name:"Initializing"});
		enumHash.push({Index:2, Name:"Communication Check"});
		enumHash.push({Index:3, Name:"No Communication"});
		enumHash.push({Index:4, Name:"Connected"});
		enumHash.push({Index:5, Name:"Off"});
		enumHash.push({Index:6, Name:"Shutting Down"});
		enumHash.push({Index:7, Name:"Configuring Parameters"});
		enumHash.push({Index:8, Name:"Standby"});
		enumHash.push({Index:9, Name:"Starting Up"});
		enumHash.push({Index:10, Name:"Faulted"});
		enumHash.push({Index:11, Name:"Running"});
		enumHash.push({Index:12, Name:"Connecting"});
		enumHash.push({Index:13, Name:"Disconnecting"});
		enumHash.push({Index:14, Name:"Unknown"});

	} else if ((rel_key.indexOf('Event') >= 0) || (rel_key.indexOf('Action') >= 0)){

		enumHash.push({Index:1, Name:"None"});
		enumHash.push({Index:2, Name:"Inhibit"});
		enumHash.push({Index:3, Name:"Limit"});
		enumHash.push({Index:4, Name:"Inhibit & Limit"});
		enumHash.push({Index:5, Name:"Em. Stop"});

	}
	return enumHash;
}


function addSubscribe(col, rowfunc, dp, type, atviseTable)
{
//	console.log("newest addSubscribe for ", col, rowfunc, dp, type);	
	if (type == 'TIME'){

		webMI.data.subscribe(dp,function(e){			
			var row = rowfunc(dp);
			var dataObj = atviseTable.dataProvider().dataObject(row, col);

			var time = e.value;
			if (time < 1000) {

				dataObj.text = e.value + " ms";

			} else if (time < 60*1000) {

				dataObj.text = e.value/1000 + " s";
			
			} else if (time < 60*60*1000) {

				dataObj.text = e.value/(60*1000) + " m";

			} else if (time < 24*60*60*1000) {

				dataObj.text = e.value/(60*60*1000) + " h";

			} else {

				dataObj.text = e.value/(24*60*60*1000) + " d";

			}
			
			atviseTable.dataProvider().setDataObject(row, col, dataObj);
		});

	
	} else if (type == 'ENUM') {


		webMI.data.subscribe(dp,function(e){			
			var row = rowfunc(dp);
			var enumHash = getEnumHash(dp);
			var dataObj = atviseTable.dataProvider().dataObject(row, col);
//			console.log("enum found", dataObj);

			var origValue = e.value;
			dataObj.text = "Unknown (" + origValue + ")";
			for (var i=0; i<enumHash.length; i++){

				if (enumHash[i].Index == origValue) {

					dataObj.text = enumHash[i].Name;			
					
				}
			}
			atviseTable.dataProvider().setDataObject(row, col, dataObj);
		});


	} else if (type == 'REAL') {

		webMI.data.subscribe(dp,function(e){

				var row = rowfunc(dp);
				var dataObj = atviseTable.dataProvider().dataObject(row, col);
//				console.log("real found", dataObj);
				dataObj.text = e.value.toFixed(2);
				atviseTable.dataProvider().setDataObject(row, col, dataObj);
			});

	} else {

		webMI.data.subscribe(dp,function(e){

				var row = rowfunc(dp);
				var dataObj = atviseTable.dataProvider().dataObject(row, col);
//				console.log("is there an alignment we can set here?????????", dataObj);
				dataObj.text = e.value;
				atviseTable.dataProvider().setDataObject(row, col, dataObj);
			});
	
	}


}