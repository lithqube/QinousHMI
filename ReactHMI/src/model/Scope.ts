import * as WebMI from "./WebMI";

/**
 * QUESTIONS
 * - Some calls have the following structure: error, remaining, result. What's "remaining"? is this paging?
 * - TOC sometimes there is an idxstop and sometimes not. why?
 * - Is TOC fifo, e.g. right now 77 toc entries. this will always be in that range?
 */


interface DataRecorder {
    recid: number;
    recname: string; // e.g. Q_SYS_BCU1_FAST
    recstate: number; //?
    recstatechgcnt: number;
    recuuid: string;
    taskstate: number; //?
    taskstatechgcnt: number;
}

interface Channel {
    datatype: string; // e.g. REAL32
    name: string; // The corresponding datapoint address, e.g. Q_SYS/.BCUData[1].Battery.DCPower_kW
}

/**
 * Maps between indices and timestamps
 * Time is relative to the sytem time of the PLC. This is in UTC, but it's possible that it is out of sync.
 */
interface TOC {
    idxstart: number;
    idxstarttrig: number;
    idxstop: number;   
    idxstoptrig: number;
    timeoffset: number;
    timestart: number;
    timestarttrig: number;
    timestop: number;   
    timestoptrig: number;
}

interface IndexRange {
    idxstart: number;
    idxend: number;
}

interface Sample {
    i: number; // index (starting at 1)
    t: number; // timestamp
    v: number[]; // value by channel (according to their order of appearance in request)
}

interface ReadResult {
    channels: string[]; // channel names
    error: number;
    remaining: number; // If the requested range is larger than limit, this is the rest
    samples: Sample[];
}


export function getDataRecorders(): Promise<DataRecorder[]> {
    return WebMI.call("m1scope_getrecorder", {});
}

export function getChannels(recorderName: string): Promise<Channel[]> {
    return WebMI.call("m1scope_getchannel", { 
        recname: recorderName 
    });
}

export function getTOC(recorderName: string): Promise<TOC[]> {
    return WebMI.call("m1scope_getcontent", { 
        recname: recorderName,
        idxstart: 0, // TODO what are these?
        limit: 0
    });
}

export function getIndices(recorderName: string, timestart: number, timeend: number): Promise<IndexRange> {
    return WebMI.call("m1scope_querylookup", { 
        recname: recorderName,
        timestart: timestart,
        timeend: timeend
    }).then(result => {
        return <IndexRange>{ idxstart: result[0].idxstart, idxend: result[0].idxend };  
    });    
}

export function readByIndex(recorderName: string, channelNames: string[], startIndex: number, endIndex: number): Promise<ReadResult> {
    return WebMI.call("m1scope_queryfilter", {
        recname: recorderName,
        idxstart: startIndex,
        idxstop: endIndex,
        limit: 5000, 
        channel: channelNames
    }).then(result => result[0]); // because our api only allows 1 recorder
}

export function readByTimestamp(recorderName: string, channelNames: string[], startTime: number, endTime: number): Promise<ReadResult> {
    return WebMI.call("m1scope_querytime", {
        recname: recorderName,
        timestart: startTime,
        timeend: endTime,
        limit: 5000, 
        channel: channelNames
    }).then(result => result[0]);
}

// Scope.readIndex = function(recorders, channels, startIndex, endIndex, dynamic, callbackFunction) {

// 	var lastIndex = [];
// 	var remaining = false;
// 	var mode = "readIndex";

// 	//--------------------
// 	webMI.data.call("m1scope_queryfilter",{"recname": recorders,"idxstart" : startIndex,"idxstop" : endIndex,"limit" : 5000,"channel" : channels},function(e) {
// 		//--------------------
// 		var existingRecorders = checkInput(e.result,recorders);
// 		var response = e.result;
// 		var returnBuffer = new Array();
// 		// iterate over all recorders
// 		var buffer = createBuffer(mode, response, existingRecorders, returnBuffer, lastIndex, remaining, dynamic, recorders, endIndex);
// 		callbackFunction(buffer.returnBuffer,buffer.remaining,buffer.lastIndex);
// 	});
// };



