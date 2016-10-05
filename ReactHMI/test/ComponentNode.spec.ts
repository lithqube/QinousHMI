import * as mocha from "mocha";
import {assert} from "chai";
import ComponentNode, {ComponentType, Task, getGroupTypeForType} from "./../src/model/ComponentNode";

describe("ComponentNode", function() {
    let root: ComponentNode;
    let node: ComponentNode;
    const systemTask = new Task("System", "SystemModule");

    beforeEach(function () {
        root = new ComponentNode(ComponentType.System, systemTask, 0);
        node = new ComponentNode(ComponentType.Battery, systemTask, 1);
    });

    it("can add a subcomponent", function() {
        root.addSubComponent(node);
        assert.equal(root.subComponents.length, 1, "root.subComponents.length");
        assert.equal(root.subComponents[0], node, "added node")
    });

    it("can add a subcomponent to component that already holds one of same type", function() {
        const secondNode = new ComponentNode(ComponentType.Battery, systemTask, 2);
        root.addSubComponent(node);        
        root.addSubComponent(secondNode);

        assert.equal(root.subComponents.length, 1, "number of components in root");
        const group = root.subComponents[0];
        const expectedGroupType = getGroupTypeForType(node.type);
        assert.equal(group.type, expectedGroupType, "group type");
        assert.equal(group.task, root.task, "group task same as task of node it belongs to")
        assert.equal(group.subComponents.length, 2, "number of components in group");
        assert.equal(group.subComponents[0], node, "existing node is first element of group");
        assert.equal(group.subComponents[1], secondNode, "added node is second element of group");
    });

    it("can add a subcomponent to a component that already has a group for this type", function() {
        const secondNode = new ComponentNode(ComponentType.Battery, systemTask, 2);
        const thirdNode = new ComponentNode(ComponentType.Battery, systemTask, 3);
        root.addSubComponent(node);        
        root.addSubComponent(secondNode);
        root.addSubComponent(thirdNode);

        assert.equal(root.subComponents.length, 1, "number of components in root");
        const group = root.subComponents[0];
        const expectedGroupType = getGroupTypeForType(node.type);
        assert.equal(group.type, expectedGroupType, "group type");
        assert.equal(group.subComponents.length, 3, "number of components in group");
        assert.equal(group.subComponents[0], node, "existing node is first element of group");
        assert.equal(group.subComponents[1], secondNode, "second node is second element of group");
        assert.equal(group.subComponents[2], thirdNode, "third node is second element of group");
    });

    it("returns correct config dp", function() {
        assert.equal(node.dp.config, "/System/.BCUCfg[1]", "Correct format");
    });

    it("returns correct data dp", function() {
        assert.equal(node.dp.data, "/System/.BCUData[1]", "Correct format");
    });
});