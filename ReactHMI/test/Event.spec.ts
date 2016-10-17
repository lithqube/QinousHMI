import * as mocha from "mocha";
import { assert } from "chai";
import { EventDP, EventType, Level } from "./../src/model/Event";
import ComponentNode, {ComponentType, Task} from "./../src/model/ComponentNode";

describe("EventDP", function() {

    let task: Task;
    let node: ComponentNode;
    let types: EventType[];

    beforeEach(function() {
        task = new Task("test");
        node = new ComponentNode(ComponentType.BCU, task, 1);
        types = [
            {
                mask: 1,
                level: Level.Info,
                name: "Test"
            },
            {
                mask: 2,
                level: Level.Info,
                name: "Test2"
            },
            {
                mask: 16,
                level: Level.Info,
                name: "Test16"
            },
            {
                mask: 128,
                level: Level.Info,
                name: "Test128"
            },             
        ];
    });

    it("can build correct dp from relative dp", function() {
        const task = new Task("test");
        const node = new ComponentNode(ComponentType.BCU, task, 1);
        const eventDP = new EventDP(".someEventDP", node, []);
        const dataDP = node.dp.data;
        assert.equal(eventDP.dp, node.dp.data + ".someEventDP", "Absolute datapoint");
    });

    it("can return event types for an arbitrary datapoint value", function() {
        const eventDP = new EventDP(".someEventDP", node, types);
        const test = eventDP.eventTypesForValue(2 | 16);
        assert.equal(test.length, 2, "Number of events");
        assert.equal(test[0].name, "Test2", "First event type");
        assert.equal(test[1].name, "Test16", "Second event type");
    });

    it("can return empty array for a datapoint value of 0", function() {
        const eventDP = new EventDP(".someEventDP", node, types);
        const test = eventDP.eventTypesForValue(0);
        assert.equal(test.length, 0, "Number of events");
    });

    it("can report unknown errors", function() {
        const eventDP = new EventDP(".someEventDP", node, types);
        const test = eventDP.eventTypesForValue(16 | 32 | 512);
        assert.equal(test.length, 3, "Number of events");
        assert.equal(test[0].name, "Test16");
        assert.equal(test[1].name, "Unknown event (.someEventDP: 32)");
        assert.equal(test[2].name, "Unknown event (.someEventDP: 512)");
    });
});