/**
 * Defines model around components.
 */
import { EventDP } from "./Event";
import { CommonDP, getStandardEventDPs } from "./ComponentConfig";
import titelize from "../common/titelize";

// Every component is of a certain type
export enum ComponentType {
    Undefined = 0,
    System = -1,
    PV = 1,
    Consumer = 2,
    Grid = 3,
    BCU = 4, // Battery Converter Unit
    Diesel = 5,
    RawMeter = 6,
    PVGroup = 101,
    ConsumerGroup = 102,
    BCUGroup = 104,
    DieselGroup = 105,
    BatteryString = 201,
    Climate = 301
};

// Map single types to group types
const groupForType = {};
groupForType[ComponentType.PV] = ComponentType.PVGroup;
groupForType[ComponentType.Consumer] = ComponentType.ConsumerGroup;
groupForType[ComponentType.BCU] = ComponentType.BCUGroup;
groupForType[ComponentType.Diesel] = ComponentType.DieselGroup;

/**
 * Returns the corresponding group type of a given type. Returns undefined if there is none.
 */
export function getGroupTypeForType(type: ComponentType): ComponentType | undefined {
    return groupForType[type];
}

/**
 * Returns a formatted name of a component type, e.g. BCUGroup will be "BCU Group".
 * NOTE/TODO: This will likely be replaced once the app is internationalized.
 */
export function describeType(type: ComponentType): string {
    return titelize(ComponentType[type]);
}

/**
 * Converts a value from any type safely to a ComponentType. TypeScript only gives us type-safety 
 * on compile-time, not during run-time. It's possible that webMI sends a type not as a number 
 * but as a string for example ("0" instead of 0).
 * @return {ComponentType} the component type, if unknown then ComponentType.Undefined will be returned.
 */
export function safelyDeserializeComponentType(type: any): ComponentType {
    const value = parseInt(type, 10);
    const isKnownType = ComponentType[type] !== undefined;
    return isKnownType ? value : ComponentType.Undefined;
}

/**
 * Represents a task on the PLC.
 */
export class Task {
    readonly name: string;
    readonly moduleName: string;
    readonly parent: Task | undefined;
    readonly index: number;
    
    constructor(name: string, moduleName: string = "", parent: Task | undefined = undefined, index: number = -1) {
        this.name = name;
        this.moduleName = moduleName;
        this.parent = parent;
        this.index = index;
    }
}

/**
 * Represents a component on the PLC.
 * 
 * We are using one type of class for every type of component. This class represents everything
 * components have in common. Everything more specific is handled in associated objects (e.g. CommonDP, EventDP).
 * See /docs/Model.svg for a simple UML class diagram.
 */
export default class ComponentNode {
    // A component has to be of a certain type
    readonly type: ComponentType;
    // Every component is handled by a task
    readonly task: Task;
    // Every component has an index used when referring to its datapoint (see ComponentConfig#getDataDP)
    readonly index: number;
    // CommonDP offers commonly used datapoints (data, config, etc.)
    readonly dp: CommonDP;
    // A component can be associated with datapoints that emit events (see EventDP)
    public events: EventDP[] = [];
    // A custom name may be set in the PLC configuration datapoint
    public customName: string = "";
    // ComponentNodes are nodes in a tree. You should not use _subComponents and _parent directly.
    // Use addSubComponent, removeSubComponent and parent. This is because addSubComponent() does 
    // more than just append a child node, see the method for more information.
    protected _subComponents: ComponentNode[] = [];
    protected _parent: ComponentNode | undefined;

    constructor(type: ComponentType, task: Task, index: number) {
        this.type = type;
        this.task = task;
        this.index = index;
        this.dp = new CommonDP(this);
        this.events = getStandardEventDPs(this);
    }

    get hasSubComponents() {
        return this._subComponents.length > 0;
    }

    get parent(): ComponentNode | undefined {
        return this._parent;
    }

    get subComponents(): ReadonlyArray<ComponentNode> {
        return this._subComponents;
    }

    get hasCustomName() {
        return this.customName !== undefined && this.customName !== "";
    }

    get isConsumer() {
        return this.type === ComponentType.Consumer || this.type === ComponentType.ConsumerGroup;
    }

    get name(): string {
        if (this.hasCustomName) {
            return this.customName;
        }
        let name = describeType(this.type);
        if (this.index > -1) {
            name += " " + this.index;
        }
        return name;
    }

    /**
     * Traverses the tree (depth-first) and calls given callback on each node.
     */
    traverse(callback: (node: ComponentNode) => void): void {
        callback(this);
        for (const subcomponent of this._subComponents) {
            subcomponent.traverse(callback);
        }
    }

    /**
     * Returns an array of all nodes in the tree that fulfill a given condition.
     * You can use this for example to get a list of all battery nodes like this:
     * let batteries = system.filter(node => node.type === ComponentType.BCU)
     */
    filter(condition: (node: ComponentNode) => boolean): ComponentNode[] {
        const filtered: ComponentNode[] = [];
        this.traverse(node => {
            if (condition(node)) filtered.push(node);
        });
        return filtered;
    }

    /**
     * Checks whether this node contains another given node somewhere down the tree.
     */
    contains(other: ComponentNode | undefined): boolean {
        while(other) {
            if (this === other) {
                return true;
            }
            other = other.parent;            
        }
        return false;
    }

    /**
     * Adds a sub-component.
     * 
     * This follows very specific rules:
     * a) If there is already a sub-component with the same type and there is a compatible
     *    group type available, replace the existing component with a group of this group type 
     *    and put both the new and existing node in it.
     * b) If there is a sub-component that is a group for the type of the new component, add
     *    the new component to the group.
     * c) In all other cases, append the component to the array of sub-components. This can happen
     *    if there is no sub-component of this type yet. But also if there is no compatible group
     *    type for it. For example BatteryString doesn't have an associated group type. In this case,
     *    multiple BatteryString components will just be appended directly to the array of sub-components.
     */
    addSubComponent(component: ComponentNode) {
        // Is there a sub component with the same type?  
        const existingComponent = this.subComponentByType(component.type);
        if (existingComponent) {
            // Is there a group type available for the type? This also implies that
            // the existing component and the new component we add are themselves not group components.
            const groupType = getGroupTypeForType(component.type);
            if (groupType) {
                // Replace the existing component with a group component of compatible type.
                // Add the existing component and the new one to this group.
                const group = new ComponentNode(groupType, this.task, 1);
                const index = this.subComponents.indexOf(existingComponent);
                this._subComponents[index] = group;
                group._parent = this;
                group._appendSubComponent(existingComponent);
                group._appendSubComponent(component);
                return;
            }
        }
        // Is there a already a group component that holds the kind component we want to add?
        const groupType = getGroupTypeForType(component.type);
        if (groupType) {
            const existingGroup = this.subComponentByType(groupType);
            if (existingGroup) {
                existingGroup._appendSubComponent(component);
                return;
            }
        }
        // Otherwise just append the component.
        this._appendSubComponent(component);
    }

    removeSubComponent(node: ComponentNode) {
        const index = this.subComponents.indexOf(node);
        this._subComponents.splice(index, 1);
        node._parent = undefined;
    }

    // Internal use only, please use addSubComponent
    protected _appendSubComponent(node: ComponentNode) {
        this._subComponents.push(node);
        node._parent = this;
    }

    protected subComponentByType(type: ComponentType) {
        for (let component of this._subComponents) {
            if (component.type === type) {
                return component;
            }
        }
    }

    protected typeDescription() {
        return ComponentType[this.type];
    }
}


