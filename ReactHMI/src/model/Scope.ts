import * as WebMI from "./WebMI";

/**
 * QUESTIONS
 * - TOC sometimes there is an idxstop and sometimes not. why?
 * - Is TOC fifo, e.g. right now 77 toc entries. this will always be in that range?
 * - Did you use Highstock? Why not? It's not 100% obvious how to ideally use it with stock.
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
export interface TOCEntry {
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

// interface IndexRange {
//     idxstart: number;
//     idxend: number;
// }

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

const READ_BY_INDEX_MAX_BATCH_SIZE: number = 5000;


class IndexRange {
    constructor(readonly start: number, readonly end: number) {
    }
}

/**
 * A table of content.
 */
export class TOC {
    readonly entries: TOCEntry[];
    
    constructor(entries: TOCEntry[]) {
        this.entries = entries;
        this.fixRanges();
    }

    getIndexRangeForTimeRange(timeStart: number, timeEnd: number): IndexRange {
        const a = this.getIndexRangeForTime(timeStart);
        const b = this.getIndexRangeForTime(timeEnd);
        return new IndexRange(a.start, b.end);
    }

    getIndexRangeForTime(time: number): IndexRange {
        // TODO do binary search       
        let index = 0;
        for (let i = 0, n = this.entries.length; i < n; i++) {
            if (time < this.entries[i].timestart) {
                const index = Math.max(0, i - 1);
                const entry = this.entries[index];
                return new IndexRange(entry.idxstart, entry.idxstop);
            }
        }
        const lastEntry = this.entries[this.entries.length - 1];
        return new IndexRange(lastEntry.idxstart, lastEntry.idxstop);
    }

    /**
     * The last entry of the toc is the one where the recorder is currently
     * still recording to. This toc will have a idxstop of 0, because scope
     * won't let us know the actual last index.
     */
    protected fixRanges() {
        const n = this.entries.length;
        if (n === 0) {
            return;
        }
        const lastEntry = this.entries[n - 1];
        if (lastEntry.idxstop === 0) {
            lastEntry.idxstop = lastEntry.idxstart + READ_BY_INDEX_MAX_BATCH_SIZE;
        }
    }


}

export function getDataRecorders(): Promise<DataRecorder[]> {
    return WebMI.call("m1scope_getrecorder", {});
}

export function getChannels(recorderName: string): Promise<Channel[]> {
    return WebMI.call("m1scope_getchannel", { 
        recname: recorderName 
    });
}

export function getTOC(recorderName: string): Promise<TOC> {
    return WebMI.call("m1scope_getcontent", { 
        recname: recorderName,
        idxstart: 0,
        limit: 0
    }).then(entries => new TOC(entries));
}

export function getIndices(recorderName: string, timestart: number, timeend: number): Promise<IndexRange> {
    return WebMI.call("m1scope_querylookup", { 
        recname: recorderName,
        timestart: timestart,
        timeend: timeend
    }).then(result => {
        return new IndexRange(result[0].idxstart, result[0].idxend);  
    });    
}

export function readByIndex(recorderName: string, channelNames: string[], startIndex: number, endIndex: number): Promise<ReadResult> {
    return WebMI.call("m1scope_queryfilter", {
        recname: recorderName,
        idxstart: startIndex,
        idxstop: endIndex,
        limit: READ_BY_INDEX_MAX_BATCH_SIZE, 
        channel: channelNames
    }).then(result => result[0]); // because our api only allows 1 recorder
}

// export function readByTimestamp(recorderName: string, channelNames: string[], startTime: number, endTime: number): Promise<ReadResult> {
//     return WebMI.call("m1scope_querytime", {
//         recname: recorderName,
//         timestart: startTime,
//         timeend: endTime,
//         limit: 5000, 
//         channel: channelNames
//     }).then(result => result[0]);
// }



