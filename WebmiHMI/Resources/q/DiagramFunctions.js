getRecorderPrefix = function(node){

	var prefix = node.TaskName;

	switch (node.Type){
	case TYPE_BATTERY:
		prefix = "Q_SYS_BCU";
		break;
	case TYPE_PV:
		prefix = "Q_SYS_PV";
		break;
	case TYPE_DIESEL:
		prefix = "Q_SYS_DIESEL";
		break;
	case TYPE_SYSTEM:
		break;
	//TYPE_PV_GROUP = 101;
	//TYPE_CONSUMER_GROUP = 102;
	//TYPE_BATTERY_GROUP = 104;
	//TYPE_DIESEL_GROUP = 105;
	}

	if (node.Index > 0) {
		prefix = prefix + node.Index;
	}
	return prefix;
}

liveTickerCallback = function(series, browserTimeLocalTimeDiff){

	return function(e){

		if (e == undefined) {
			//console.log("No e on callback!");
		} else if (e.value == undefined) {
			//console.log("No data on callback!");
		} else {
			var x = Date.getTime();
			series.addPoint([x - browserTimeLocalTimeDiff, e.value]);
		}
	}	

}

readAndUpdate = function(dp, series, browserTimeLocalTimeDiff){

	return function(){

		webMI.data.read(dp, liveTickerCallback(series, browserTimeLocalTimeDiff)); 

	}
}

var MAX_DATAPOINTS_PER_READ = 2000;

getContentAndAddSeries = function(toclist, set, seriesList, node, localTimeSystemTimeDiff, fromSystemTime, toSystemTime){

	return function(e){
		console.log("content received", e);
		toclist.toc = e;
		addQueriedDataToSeries(toclist.toc, set, seriesList, node, localTimeSystemTimeDiff, fromSystemTime, toSystemTime);
	}
}

addQueriedDataToSeries = function(toc, set, seriesList, node, localTimeSystemTimeDiff, fromSystemTime, toSystemTime){

	// TODO: maximum 10000 points will be returned ( to avoid overloading CPU)
	// we must (a) iterate calls one after another in order to ge the data out, and
	// (b) translate between index number and time! 

	// don't duplicate points
	//console.log("Looking for data from ", new Date(fromSystemTime), " to ", new Date(toSystemTime));
	//console.log("Received a seriesList", seriesList);

	if (seriesList[0].data.length > 0){

		console.log("series already has data... check for overlap", seriesList[0]);

		var beginSeriesData = seriesList[0].options.data[0][0];
		var endSeriesData = seriesList[0].options.data[seriesList[0].options.data.length-1][0];
	
		if (fromSystemTime <= beginSeriesData) {
	
			toSystemTime = Math.min(toSystemTime, beginSeriesData-1);
			fromSystemTime = Math.min(fromSystemTime, beginSeriesData-1);
	
	
		} else {
	
			fromSystemTime = Math.max(fromSystemTime, endSeriesData+1);
			toSystemTime = Math.max(toSystemTime, endSeriesData+1);
	
		}
	
		if (fromSystemTime == toSystemTime) {
	
			//console.log("from and to time are the same");
			return;

		}
	}

	var channels =  getChannels(set, node);
	console.log("looking for these channels ", channels);
	for (var i=0; i<toc.length; i++){
		
		var thisIndex = toc[i].idxstart;
		var thisTimestart = toc[i].timestart;
		var nextIndex = 0;
		var nextTimestart = 0;
		if (i < (toc.length-1)) {
			nextIndex = toc[i+1].idxstart;
			nextTimestart = toc[i+1].timestart;
		}		
		// (1) find out if this index contains the data we are looking for
		//console.log("Is the starting time(",new Date(fromSystemTime), ") between this index (", new Date(thisTimestart), ") and the next (", new Date(nextTimestart), ")?");
		var shouldReadIndex = false;
		if (thisIndex === undefined){
			console.log("Undefined start index??", toc[i]);
		} else {
			if (thisTimestart < fromSystemTime) {
	
				if ((nextTimestart > fromSystemTime) || (nextTimestart == 0)) {
	
					shouldReadIndex = true;
	
				}
	
			} else if (thisTimestart < toSystemTime) {
	
					shouldReadIndex = true;
	
			}
		}
		if (shouldReadIndex) { 
			// TODO iterate here to get all data? or should readIndexCallback retrigger readIndex? How to know if we are at end of data set?
			var recorder = getRecorderPrefix(node) + "_" + set.recorder;
			console.log("getting data from : "+thisIndex, new Date(toc[i].timestart), recorder);

			Scope.readIndex(
				recorder, 
				channels, 
				thisIndex, 
				thisIndex + MAX_DATAPOINTS_PER_READ, 
				false, 
				readIndexCallback(set, seriesList, node, localTimeSystemTimeDiff, fromSystemTime, toSystemTime, thisIndex, []));

			break;

		}
	
	}

}

getChannels = function(set, node){

	var prefix = "Q_SYS/";
	switch(node.Type){
		case TYPE_BATTERY:
			prefix = prefix + ".BCUData[" + node.Index + "]";
			break;
	}

	var channels = [];
	for (var i=0; i<set.series.length; i++){
		channels.push(prefix + set.series[i].DP);
	}
	return channels;

}

function findNearestIndex(timeSeries, time) {   
	if (time <= timeSeries[0][0]){
		return 0;
	}
    for (var i = 0; i < timeSeries.length-1; i++) {
        if ((timeSeries[i][0] == time) || ((timeSeries[i][0] < time) && (timeSeries[i+1][0] > time))) {
            return i;
        } 
    }
	if (time >= timeSeries[timeSeries.length-1][0]){
		return timeSeries.length-1;
	}
    return -1;
}

readIndexCallback = function(set, seriesList, node, localTimeSystemTimeDiff, fromSystemTime, toSystemTime, indexRead, collectedData){

	return function(g) {  

		if (collectedData === undefined) {
			collectedData = [];
		}
		var channels = getChannels(set, node);
		console.log("...Callback with", g, "timeOffset", localTimeSystemTimeDiff, "data so far", collectedData);
		if (indexRead === undefined) {
			console.log("indexRead is undefined??? ", indexRead, MAX_DATAPOINTS_PER_READ, indexRead+MAX_DATAPOINTS_PER_READ+1);
			return;
		}
		var data = g[0];
		console.log("From, To: ",new Date(fromSystemTime), new Date(toSystemTime));

		var moreDataNeeded = false;
		for (var k=0; k<channels.length; k++){

			if (k >= collectedData.length){
				collectedData.push([]);

			}
			var channel_data
			if (data !== undefined) {
				channel_data = data[channels[k]];
			}

			if (channel_data !== undefined) {
				var nextIndex = indexRead + channel_data.length; 
	
				// (1) adjust each x point to match local time at device
				// (2) get data from series, and then inject, in order, the new data to the series
				// (3) replace the data in the series, and then refresh the chart
				if (channel_data.length > 0) {
					//console.log("channel"+k+", from ",new Date(channel_data[0][0]), " to ", new Date(channel_data[channel_data.length-1][0]));	
		
					moreDataNeeded = false;
					if (channel_data[channel_data.length-1][0] < toSystemTime){
						moreDataNeeded = true;
						//console.log("Need more data!");
					}
		
					// trim as needed
					var startIndex = findNearestIndex(channel_data, fromSystemTime);
					var endIndex = findNearestIndex(channel_data, toSystemTime);
					//console.log("reducing channel_data to [", startIndex, endIndex, "], from [0",channel_data.length-1,"]");
	
	
					if ((endIndex > 0) && (startIndex < endIndex)){
						channel_data = channel_data.slice(startIndex, endIndex);
					
						// use local time
						for (var i=0; i<channel_data.length; i++){
							channel_data[i][0] = channel_data[i][0] + localTimeSystemTimeDiff;
						}
		
						//console.log("adding channel_data", channel_data);
						//console.log("to collected data ("+collectedData[k].length+")", collectedData[k]);
						collectedData[k] = channel_data.concat(collectedData[k]);
						collectedData[k].sort(function (a,b){
								if (a[0] < b[0]) return -1;
								else if (a[0] > b[0]) return 1;
								else return 0;
							});
						//console.log("is now", collectedData[k].length);					
					}
				}
			}
		}
		if (nextIndex === undefined) {
			console.log("NextIndex is undefined??? ", nextIndex, MAX_DATAPOINTS_PER_READ);
		} else if (moreDataNeeded) {
			console.log("more data needed....", set);
			Scope.readIndex(
					getRecorderPrefix(node) + "_" + set.recorder, 
					channels, 
					nextIndex, 
					nextIndex + MAX_DATAPOINTS_PER_READ, 
					false, 
					readIndexCallback(set, seriesList, node, localTimeSystemTimeDiff, fromSystemTime, toSystemTime, nextIndex + MAX_DATAPOINTS_PER_READ+1, collectedData));
		} else {

			// add data to plot
			console.log("adding data to plot");
			for (var k=0; k<channels.length; k++){
/*				console.log("All data received.. plotting (after order check)!", collectedData, channels[k]);

				// check order of collectedData
				for (var w=1; w<collectedData[k].length; w++){
					if (collectedData[k][w][0] === undefined) {
						console.log("Undefined timestamp in data!");
					} else if (collectedData[k][w][0] <= collectedData[k][w-1][0]) {
						console.log("Not ascending!", new Date(collectedData[k][w][0]), collectedData[k][w][0], collectedData[k][w-1][0]);
					}
				}*/
				/*END loading date display here*/ 
				seriesList[k].setData(collectedData[k]);
				console.log("Plotted!");

			}
			// Hide the loader functionality here trigger fire "false"
			console.log("Trigger Fire: False status!");
			webMI.trigger.fire("setLoader", false);
		}
	}
}


getLatestData = function(channel, series){
	return function(){
		//console.log("reading ",channel);
		webMI.data.read("/"+channel, dataCallback(series));
	}
}

dataCallback = function(series){

	return  function(e){
		//console.log("DATA CALLBACK!",e);
		series.addPoint([Date.now(), e.value]);		
		// TODO adjust browser time for local time at device
	}

}

