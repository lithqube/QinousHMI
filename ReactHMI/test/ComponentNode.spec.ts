import * as mocha from "mocha";
import {assert} from "chai";
import ComponentNode, {ComponentType, Task, getGroupTypeForType} from "./../src/model/ComponentNode";

describe("ComponentNode", function() {
    let root: ComponentNode;
    let bcu: ComponentNode;
    const systemTask = new Task("System", "SystemModule");

    beforeEach(function () {
        root = new ComponentNode(ComponentType.System, systemTask, 0);
        bcu = new ComponentNode(ComponentType.BCU, systemTask, 1);
    });

    it("can add a subcomponent to component without other subcomponents", function() {
        root.addSubComponent(bcu);
        assert.equal(root.subComponents.length, 1, "root.subComponents.length");
        assert.equal(root.subComponents[0], bcu, "added node")
    });

    it("can add a subcomponent to component that already holds one of same type", function() {
        const secondNode = new ComponentNode(ComponentType.BCU, systemTask, 2);
        root.addSubComponent(bcu);        
        root.addSubComponent(secondNode);

        assert.equal(root.subComponents.length, 1, "number of components in root");
        const group = root.subComponents[0];
        const expectedGroupType = getGroupTypeForType(bcu.type);
        assert.equal(group.type, expectedGroupType, "group type");
        assert.equal(group.task, root.task, "group task same as task of node it belongs to")
        assert.equal(group.subComponents.length, 2, "number of components in group");
        assert.equal(group.subComponents[0], bcu, "existing node is first element of group");
        assert.equal(group.subComponents[1], secondNode, "added node is second element of group");
    });

    it("can add a subcomponent to a component that already has a group for this type", function() {
        const secondNode = new ComponentNode(ComponentType.BCU, systemTask, 2);
        const thirdNode = new ComponentNode(ComponentType.BCU, systemTask, 3);
        root.addSubComponent(bcu);        
        root.addSubComponent(secondNode);
        root.addSubComponent(thirdNode);

        assert.equal(root.subComponents.length, 1, "number of components in root");
        const group = root.subComponents[0];
        const expectedGroupType = getGroupTypeForType(bcu.type);
        assert.equal(group.type, expectedGroupType, "group type");
        assert.equal(group.subComponents.length, 3, "number of components in group");
        assert.equal(group.subComponents[0], bcu, "existing node is first element of group");
        assert.equal(group.subComponents[1], secondNode, "second node is second element of group");
        assert.equal(group.subComponents[2], thirdNode, "third node is second element of group");
    });

    it("can add a subcomponent to component that already holds one of same type but there is no compatible group type", function() {
        const firstNode = new ComponentNode(ComponentType.RawMeter, systemTask, 2);
        const secondNode = new ComponentNode(ComponentType.RawMeter, systemTask, 3);
        root.addSubComponent(firstNode);        
        root.addSubComponent(secondNode);
        assert.equal(root.subComponents.length, 2, "number of components in root");
    });

    it("shouldn't make a group goddamit", function() { 
        root.addSubComponent(bcu);
        const firstNode = new ComponentNode(ComponentType.BatteryString, bcu.task, 1);
        const secondNode = new ComponentNode(ComponentType.BatteryString, bcu.task, 2);
        bcu.addSubComponent(firstNode);        
        bcu.addSubComponent(secondNode);
        assert.equal(bcu.type, ComponentType.BCU, "still bcu");
        assert.equal(bcu.subComponents.length, 2, "number of strings in bcu");
    });

    it("returns correct config dp", function() {
        assert.equal(bcu.dp.config, "/System/.BCUCfg[1]", "Correct format");
    });

    it("returns correct data dp", function() {
        assert.equal(bcu.dp.data, "/System/.BCUData[1]", "Correct format");
    });

    it("can tell if a node contains another a child", function() {
        root.addSubComponent(bcu);
        assert.equal(root.contains(bcu), true, "node contains child");
    });

    it("can tell if a node contains another as a grand-child", function() {
        const grandChild = new ComponentNode(ComponentType.RawMeter, systemTask, 2);
        root.addSubComponent(bcu);
        bcu.addSubComponent(grandChild);
        assert.equal(root.contains(grandChild), true, "node contains grand-child");
    });

    it("can filter components", function() {
        const grandChild = new ComponentNode(ComponentType.RawMeter, systemTask, 2);
        root.addSubComponent(bcu);
        bcu.addSubComponent(grandChild);
        const rawMeters = root.filter(node => node.type === ComponentType.RawMeter);
        assert.equal(rawMeters.length, 1, "number of filtered items");
        assert.equal(rawMeters[0].type, ComponentType.RawMeter, "type of filtered item");
    });

    it("can return the default name of component without custom name", function() {
        assert.equal(bcu.name, "BCU 1", "default node name");
    });

    it("can return a name of component with custom name", function() {
        bcu.customName = "aCustomName"
        assert.equal(bcu.name, "aCustomName", "custom node name");
    });

    it("can return the default name of a group component without custom name", function() {
        const group = new ComponentNode(ComponentType.BCUGroup, systemTask, 2);
        assert.equal(group.name, "BCU Group 2", "default group name");
    });

    it("can return the custom name of a group", function() {
        const group = new ComponentNode(ComponentType.BCUGroup, systemTask, 2);
        group.customName = "aCustomName";
        assert.equal(group.name, "aCustomName", "default group name");        
    });
});