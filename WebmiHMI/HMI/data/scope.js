//Version 1.10 Release
//(c) by Bachmann electronic

var highestDateEver = new Date(8640000000000000).getTime();

function Scope() {
}

// ********************Scope Basic Getters********************

// returns the data recorders of the scope module
Scope.getDatarecorders = function(callbackFunction) {
	webMI.data.call("m1scope_getrecorder", {}, function(e) {
		callbackFunction(e.result);
	});
}

// returns the channels of a specified data recorder
Scope.getChannels = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_getchannel", {"recname": recorderName}, function(e) {
		callbackFunction(e.result);
	});
}

// returns the table of content of a recorder
Scope.getContent = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_getcontent", {"recname": recorderName,"idxstart": 0,"limit": 0}, function(e) {
		callbackFunction(e.result);
	});
}

// returns the indizes of the recording 
Scope.querylookup = function(recorderName, timestart, timeend ,callbackFunction) {
	webMI.data.call("m1scope_querylookup", {"recname": recorderName,"timestart": timestart,"timeend": timeend}, function(e) {
		callbackFunction(e.result);
	});
}

// ********************Scope Command Interfaces********************

// initialize the given data recorder
Scope.initDatarecorder = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_docommand", {"recname": recorderName,"command": 1}, function(e) {
		callbackFunction(e.error, e.errorstring);
	});
}

// starts the given data recorder
Scope.startDatarecorder = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_docommand", { "recname": recorderName,"command": 2}, function(e) {
		callbackFunction(e.error, e.errorstring);
	});
}

// stops the given data recorder
Scope.stopDatarecorder = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_docommand", {"recname": recorderName,"command": 3}, function(e) {
		callbackFunction(e.error, e.errorstring);
	});
}

// deinitialize the given data recorder
Scope.deinitDatarecorder = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_docommand", {"recname": recorderName,"command": 4}, function(e) {
		callbackFunction(e.error, e.errorstring);
	});
}

// manual start trigger
Scope.manualStartTrigger = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_docommand", {"recname": recorderName,"command": 5}, function(e) {
		callbackFunction(e.error, e.errorstring);
	});
}

// manual stop trigger
Scope.manualStopTrigger = function(recorderName, callbackFunction) {
	webMI.data.call("m1scope_docommand", {"recname": recorderName,"command": 6}, function(e) {
		callbackFunction(e.error, e.errorstring);
	});
}

// ***********Scope Data Transfer***************

// cyclic read
Scope.cyclicRead = function(recorder, channels, updateInterval, time, dynamic, callbackFunction) {
	var latestDate = new Array();
	
	for (var i = 0; i < recorder.length; i++) {
		latestDate[i] = time;		
	}
	
	intervalHandle = window.setInterval(function() {
		Scope.read(recorder, channels, latestDate, highestDateEver,dynamic, function(newBuffer) {
			if (newBuffer.length > 0)
				getLatestDate(latestDate, newBuffer);
			callbackFunction(newBuffer);
		});
	},updateInterval);

	return intervalHandle;
}

// stops the cyclic read
Scope.stopCyclicRead = function(intervalHandle) {
	if (intervalHandle)
		clearInterval(intervalHandle);
}

// single read over querytime function
Scope.read = function(recorders, channels, startTime, endTime, dynamic, callbackFunction) {

	if(!startTime || !endTime) {
		console.log("Invalid time: start: " + startTime + " end:" + endTime);
		callbackFunction(new Array());
	} else {
		var lastTimestamp = [];
		var remaining = false;
		var mode = "read";
			
		var tmp = [];
		for (var i = 0; i < recorders.length; i++)
			tmp.push(endTime);

		//--------------------
		webMI.data.call("m1scope_querytime",{"recname": recorders,"timestart" : startTime,"timeend" : tmp,"limit" : 5000,"channel" : channels},function(e) {
			//--------------------
			var existingRecorders = checkInput(e.result,recorders);
			var response = e.result;
			var returnBuffer = new Array();
			// iterate over all recorders
			var buffer = createBuffer(mode, response, existingRecorders, returnBuffer, lastTimestamp, remaining, dynamic, recorders, 0);
			callbackFunction(buffer. returnBuffer,buffer.remaining, buffer.lastTimestamp);
		});
	}
};


// single read over queryFilter function
Scope.readIndex = function(recorders, channels, startIndex, endIndex, dynamic, callbackFunction) {

	var lastIndex = [];
	var remaining = false;
	var mode = "readIndex";

	//--------------------
	webMI.data.call("m1scope_queryfilter",{"recname": recorders,"idxstart" : startIndex,"idxstop" : endIndex,"limit" : 5000,"channel" : channels},function(e) {
		//--------------------
		var existingRecorders = checkInput(e.result,recorders);
		var response = e.result;
		var returnBuffer = new Array();
		// iterate over all recorders
		var buffer = createBuffer(mode, response, existingRecorders, returnBuffer, lastIndex, remaining, dynamic, recorders, endIndex);
		callbackFunction(buffer.returnBuffer,buffer.remaining,buffer.lastIndex);
	});
};

// single read over queryFilter function
Scope.readIndexProgress = function(recorders, channels, startIndex, endIndex, dynamic, callbackFunction) {

	var lastIndex = [];
	var remaining = false;
    var returnedSamplesLength = 0;
	var mode = "readIndex";

	//--------------------
	webMI.data.call("m1scope_queryfilter",{"recname": recorders,"idxstart" : startIndex,"idxstop" : endIndex,"limit" : 5000,"channel" : channels},function(e) {
		//--------------------
		var existingRecorders = checkInput(e.result,recorders);
		var response = e.result;
		var returnBuffer = new Array();
		// iterate over all recorders
		var buffer = createBufferProgress(mode, response, existingRecorders, returnBuffer, lastIndex, returnedSamplesLength, remaining, dynamic, recorders, endIndex);
		callbackFunction(buffer.returnBuffer,buffer.returnedSamplesLength, buffer.remaining,buffer.lastIndex);
	});
};

//*******************************internal functions***************************
function getSamplesForChannel(channelId, samples) {

	var sample;
	var channelSamples = new Array();
	for (var sampleId = 0; sampleId < samples.length; sampleId++) {
		sample = samples[sampleId];
		channelSamples.push([ sample.t, sample.v[channelId] ]);
	}
	return channelSamples;

}

function checkInput(result, recorders) {
	var existingRecorders = new Array();
	for (var i = 0; i < result.length; i++) {
		if (result[i].error > 0) {
			console.log("error: ", result[i].errorstring.split(":") + " in recorder: ",recorders[i]);
		}
		existingRecorders.push(result[i].error);
	}
	return existingRecorders;
}

// returns the highest date value out of the data buffer
function getLatestDate(latestDate, buffer) {
	var tmpDate;
	try {
		for (var recId = 0; recId < buffer.length; recId++) {
			for (var varName in buffer[recId]) {
				if (buffer[recId][varName].length > 0) {
					tmpDate = buffer[recId][varName].slice(-1)[0][0];
					if (tmpDate > latestDate[recId])
						latestDate[recId] = tmpDate;
				}
			}
		}
	} catch (e) {
		console.error("Error in getting last value: " + e);
	}
}


function createBuffer(mode, response, existingRecorders, returnBuffer, lastXXX, remaining, dynamic, recorders, endIndex)
{
	if (mode == "readIndex")
		lastIndex = lastXXX;
	else
		lastTimestamp = lastXXX;

	for (var recId = 0; recId < response.length; recId++) {
		
		//if no channels on the recorder found
		if (response[recId].channels.length == 0)
			continue;
	
		if (existingRecorders[recId] == 0) {
			returnBuffer[recId] = new Array();
			// read all channels and their samples
			for (var channelId = 0; channelId < response[recId].channels.length; channelId++) {
				var name;
				
				if (dynamic == true)
					name = recorders[recId] + "/" + response[recId].channels[channelId];
				else
					name = response[recId].channels[channelId];

				returnBuffer[recId][name] = (getSamplesForChannel(channelId, response[recId].samples));
			
			}
		}
		
		
		if (returnBuffer[recId][name].length == 0)
			continue;

		if (mode == "readIndex")
			lastIndex.push(endIndex[recId]- response[recId].remaining);
		else
			lastTimestamp.push(returnBuffer[recId][name][returnBuffer[recId][name].length-1][0]);
		
		//if remaining > 0 more data available
		if (response[recId].remaining != 0) {
			remaining = true;
		}
	}
	buffer = {};
	buffer.returnBuffer = returnBuffer;
	buffer.remaining = remaining;

	if (mode == "readIndex")
		buffer.lastIndex = lastIndex;
	else
		buffer.lastTimestamp = lastTimestamp;

	return buffer;
}

function createBufferProgress(mode, response, existingRecorders, returnBuffer, lastXXX, returnedSamplesLength, remaining, dynamic, recorders, endIndex)
{
	if (mode == "readIndex")
		lastIndex = lastXXX;
	else
		lastTimestamp = lastXXX;

	for (var recId = 0; recId < response.length; recId++) {
		if (existingRecorders[recId] == 0) {

			returnBuffer[recId] = new Array();

			// read all channels and their samples
			for (var channelId = 0; channelId < response[recId].channels.length; channelId++) {
				var name;
			
				if (dynamic == true)
					name = recorders[recId] + "/" + response[recId].channels[channelId];
				else
					name = response[recId].channels[channelId];

				returnBuffer[recId][name] = (getSamplesForChannel(channelId, response[recId].samples));
			}
		}

		if (mode == "readIndex")
			lastIndex.push(endIndex[recId]- response[recId].remaining);
		else
			lastTimestamp.push(returnBuffer[recId][name][returnBuffer[recId][name].length-1][0]);
		
		//if remaining > 0 more data available
       remaining += response[recId].remaining;	
       returnedSamplesLength += response[recId].samples.length;	
	}
	buffer = {};
	buffer.returnBuffer = returnBuffer;
	buffer.remaining = remaining;
    buffer.returnedSamplesLength = returnedSamplesLength;

	if (mode == "readIndex")
		buffer.lastIndex = lastIndex;
	else
		buffer.lastTimestamp = lastTimestamp;

	return buffer;
}
