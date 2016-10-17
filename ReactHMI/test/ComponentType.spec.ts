import * as mocha from "mocha";
import { assert } from "chai";
import { ComponentType, getGroupTypeForType, safelyDeserializeComponentType } from "./../src/model/ComponentNode";
 
const tests =    [ComponentType.PV,      ComponentType.Consumer,      ComponentType.BCU,      ComponentType.Diesel];
const expected = [ComponentType.PVGroup, ComponentType.ConsumerGroup, ComponentType.BCUGroup, ComponentType.DieselGroup];
const ungroupables = [
    ComponentType.PVGroup, 
    ComponentType.ConsumerGroup, 
    ComponentType.BCUGroup, 
    ComponentType.DieselGroup, 
    ComponentType.Grid, 
    ComponentType.RawMeter, 
    ComponentType.BatteryString, 
    ComponentType.Climate, 
    ComponentType.System,
    ComponentType.Undefined
];
 
describe("ComponentType Group Types", function() {
    tests.forEach((test, index) => {
        it("can return the group type for " + ComponentType[test], function() {
            assert.equal(getGroupTypeForType(test), expected[index], ComponentType[test]);
        });
    });
 
    ungroupables.forEach(test => {
        it("can return undefined when asking for group type of " + ComponentType[test], function() {
            assert.equal(getGroupTypeForType(test), undefined, ComponentType[test]);
        });
    });
});

describe("ComponentType Deserialization", function() {
    it("can deserialize component type from number", function() {
        assert.equal(safelyDeserializeComponentType(1), ComponentType.PV);
    });

    it("can deserialize component type from string that is a number", function() {
        assert.equal(safelyDeserializeComponentType("1"), ComponentType.PV);
    });

    it("can deserialize component type from string that is not a number", function() {
        assert.equal(safelyDeserializeComponentType("foo"), ComponentType.Undefined);
    });

    it("can deserialize component type from undefined", function() {
        assert.equal(safelyDeserializeComponentType(undefined), ComponentType.Undefined);
    });

    it("can deserialize component type from null", function() {
        assert.equal(safelyDeserializeComponentType(null), ComponentType.Undefined);
    });

    it("can deserialize component type from unknown number/type", function() {
        assert.equal(safelyDeserializeComponentType(9999), ComponentType.Undefined);
    });    
});
