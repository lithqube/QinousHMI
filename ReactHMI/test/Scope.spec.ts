import * as mocha from "mocha";
import { assert } from "chai";
import { mockedWebMI } from "./mock/webMI";
import * as Scope from "../src/model/Scope";

// Need to hold reference to mock or Typescript will shake it away.
const a = mockedWebMI;

// Some fake toc entries
function stubTocEntries(count: number) {
    let entries: Scope.TOCEntry[] = [];
    let indexStart = 1;
    let indexStep = 2;
    let timeStart = 0;
    let timeStep = 2;
    for (let i = 0; i < count; i++) {
        entries.push({
            idxstart: indexStart,
            idxstarttrig: 0,
            idxstop: indexStart + indexStep - 1,
            idxstoptrig: 0,
            timeoffset: 0,
            timestart: timeStart,
            timestarttrig: 0,
            timestop: timeStart + timeStep - 1,
            timestoptrig: 0
        });
        indexStart += indexStep;
        timeStart += timeStep;
    }
    // Last entry has idxstop and timestop of 0
    entries[count - 1].idxstop = 0;
    entries[count - 1].timestop = 0;
    return entries;
}

describe.only("Scope.TOC", function() {

    let toc: Scope.TOC;
    beforeEach(function() {
        toc = new Scope.TOC(stubTocEntries(10));
    });

    it("can fix the index range of last toc entry", function() {
        const lastEntry = toc.entries[toc.entries.length - 1];
        assert.equal(lastEntry.idxstop, lastEntry.idxstart + 5000);
    });

    it("can return the index range for time before available range", function() {
        const range = toc.getIndexRangeForTime(-1);
        const firstEntry = toc.entries[0];
        assert.equal(range.start, firstEntry.idxstart, "index start of first toc entry");
        assert.equal(range.end, firstEntry.idxstop, "index end of first toc entry");
    });

    it("can return the index range for time after available range", function() {
        const range = toc.getIndexRangeForTime(10000000);
        const lastEntry = toc.entries[toc.entries.length - 1];
        assert.equal(range.start, lastEntry.idxstart, "index start of last toc entry");
        assert.equal(range.end, lastEntry.idxstop, "index end of last toc entry");
    });

    it("can return the index range for time somewhere inside the available range", function() {
        const range = toc.getIndexRangeForTime(4.5);
        const thirdEntry = toc.entries[2];
        assert.equal(range.start, thirdEntry.idxstart, "index start of 3rd toc entry");
        assert.equal(range.end, thirdEntry.idxstop, "index end of 3rd toc entry");
    });

    it("can return an index range for a time range inside same toc entry", function() {
        const range = toc.getIndexRangeForTimeRange(2, 3);
        const entry = toc.entries[1];
        assert.equal(range.start, entry.idxstart, "index start of 3rd toc entry");
        assert.equal(range.end, entry.idxstop, "index end of 3rd toc entry");
    });

    it("can return an index range for a time range spanning several toc entries", function() {
        const range = toc.getIndexRangeForTimeRange(2, 7);
        const entry = toc.entries[1];
        assert.equal(range.start, toc.entries[1].idxstart, "index start of 3rd toc entry");
        assert.equal(range.end, toc.entries[3].idxstop, "index end of 3rd toc entry");
    });
});