import { EventDP } from "./Event";
import { CommonDP, getStandardEventDPs } from "./ComponentConfig";
import titelize from "../common/titelize";

export enum ComponentType {
    Undefined = 0,
    System = -1,
    PV = 1,
    Consumer = 2,
    Grid = 3,
    Battery = 4,
    Diesel = 5,
    RawMeter = 6,  
    PVGroup = 101,
    ConsumerGroup = 102,
    BatteryGroup = 104,
    DieselGroup = 105,
    SamsungRack = 201,
    Climate = 301
};

// Map single types to group types
const groupForType = {};
groupForType[ComponentType.PV] = ComponentType.PVGroup;
groupForType[ComponentType.Consumer] = ComponentType.ConsumerGroup;
groupForType[ComponentType.Battery] = ComponentType.BatteryGroup;
groupForType[ComponentType.Diesel] = ComponentType.DieselGroup;

/**
 * Returns the corresponding group type of a given type. Returns undefined if there is none.
 */
export function getGroupTypeForType(type: ComponentType): ComponentType | undefined {
    return groupForType[type];
}

/**
 * Returns a formatted name of a component type, e.g. BatteryGroup will be "Battery Group".
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

export default class ComponentNode {
    readonly type: ComponentType;
    readonly task: Task;
    readonly index: number;
    readonly dp: CommonDP;
    readonly events: EventDP[] = [];
    public customName: string = "";
    public subComponents: ComponentNode[] = [];

    constructor(type: ComponentType, task: Task, index: number) {
        this.type = type;
        this.task = task;
        this.index = index;
        this.dp = new CommonDP(this);
        this.events = getStandardEventDPs(this);
    }

    get hasSubComponents() {
        return this.subComponents.length > 0;
    }

    get hasCustomName() {
        return this.customName !== undefined && this.customName !== "";
    }

    get isConsumer() {
        return this.type === ComponentType.Consumer || this.type === ComponentType.ConsumerGroup;
    }

    get name(): string {
        let name = this.hasCustomName ? this.customName : describeType(this.type);
        if (this.hasSubComponents) {
            name += " Group";
        }
        else if (this.index > -1) {
            name += " " + this.index;
        }
        return name;
    }

    /**
     * Traverses the tree (depth-first) and calls given callback on each node.
     */
    traverse(callback: (node: ComponentNode) => void): void {
        callback(this);
        for (const subcomponent of this.subComponents) {
            subcomponent.traverse(callback);
        }
    }

    /**
     * Returns an array of all nodes that are part of this tree and fulfill a given condition.
     * You can use this for example to get a list of all battery nodes like this:
     * let batteries = system.filter(node => node.type === ComponentType.Battery)
     */
    filter(condition: (node: ComponentNode) => boolean): ComponentNode[] {
        const filtered: ComponentNode[] = [];
        this.traverse(node => {
            if (condition(node)) filtered.push(node);
        });
        return filtered;
    }

    /**
     * Traverses the tree (depth-first) and returns the first component where
     * the condition returns true. Traversal will stop as soon as there is a result.
     */
    find(condition: (node: ComponentNode) => boolean): any {
        if (condition(this)) {
            return this;
        }
        for (const subcomponent of this.subComponents) {
            const result = subcomponent.find(condition);
            if (result !== undefined) {
                return result;
            }
        }
        return undefined;
    }

    /**
     * Checks whether this node contains another given node somewhere down the tree.
     */
    contains(other: ComponentNode): boolean {
        return this.find(node => node === other) !== undefined;
    }

    // TODO fix addSubComponent
    // TODO add parent prop and use it make faster contains() check
    // TODO use this contains to filter events in protocol view

    /**
     * Adds a sub-component.
     * There are 3 ways how a component is inserted as sub component:
     * 1) There is no sub component of the same type yet: Append to sub components.
     * 2) There is a sub component with the same type: Create a group representing
     *    components of this type, remove the existing component and put it in this
     *    group along with the new component, add the group to the sub components of this node.
     * 3) There is a group for this sub component type: Add the new component to this group.
     */
    addSubComponent(component: ComponentNode) {        
        const groupType = getGroupTypeForType(component.type);
        const existingComponent = this.getSubComponent(component.type);
        if (existingComponent) {
            if (!groupType) {
                console.error(`No group possible for type ${component.typeDescription}, won't create one for component`, component);
                return;
            }
            const group = new ComponentNode(groupType, this.task, 0); // DAVE: Group node same task like "this" (currently always qsys), correct?
            
            
            group.subComponents.push(existingComponent);
            group.subComponents.push(component);
            const index = this.subComponents.indexOf(existingComponent);
            this.subComponents[index] = group;
            return;
        }
        if (groupType) {
            const existingGroup = this.getSubComponent(groupType);
            if (existingGroup) {
                existingGroup.subComponents.push(component);
                return;
            }
        }
        this.subComponents.push(component);
    }

    protected getSubComponent(type: ComponentType) {
        for (let component of this.subComponents) {
            if (component.type === type) {
                return component;
            }
        }
    }

    protected typeDescription() {
        return ComponentType[this.type];
    }
}


