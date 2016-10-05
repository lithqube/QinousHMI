/**
 * Load component trees.
 * Use getComponentTree(task) to load the component tree defined under a given task.
 * 
 * HOW WE LOAD COMPONENTS
 * 
 * Loading a component tree can be divided into two aspects: On one side there is common data that defines
 * components (e.g. name, type, tree structure). On the other side there is additional data, maybe even additional
 * nodes that have to be loaded depending on specific rules (dynamic events based on node type, rack components
 * if there is a specific module name, etc.)
 * 
 * Thus, the loading mechanism has 2 steps:
 * 
 * 1. We first load the basic structure of the component tree without any special rule, as far as we can get.
 * 2. After that we have a basic tree. We now give so called "editing functions" the chance to go over this tree
 *    and make changes as they see fit. Have a look at the end of getComponentTree() below. You see that we call 
 *    the function "addBatterySensorEvents". This is an editing function that goes through each node of the tree
 *    and adds sensor event tracking to it if it is a battery node.
 * 
 * There are a number of advantages to this approach:
 * - You see in one place which rules are in effect. This makes it easy to remove or add another one.
 * - The rule and its effect are encapsulated in one function that might even be not defined in this file.
 * - It's easier to follow the basic loading mechanism of the component tree because it's
 *   not obstructed by all conditions and exceptions. 
 * - By actively supporting special cases, the loading mechanism will not be more difficult to
 *   read if there are many of those special cases.
 * 
 * One caveat: When adding the editing functions to the loading mechanism be aware that
 * their order of appearance matters. A function will operate on the tree the last function returned.
 */

import * as WebMI from "./WebMI"
import ComponentNode, {ComponentType, Task, safelyDeserializeComponentType} from "./ComponentNode";
import { EventDP, Level } from "./Event";
import { plcEventLevelToEventLevel } from "./EventConfig";
import range from "../common/range";
import flatten from "../common/flatten";

// Define the default system task.
export const systemTask = new Task("Q_SYS", "");

/**
 * Returns a promise for a ComponentNode that contains all active subcomponents.
 * @param {Task} task (Optional) A root task, default is Q_SYS.
 * @return {Promise<ComponentNode>} The root component node with subcomponents. 
 */
export function getComponentTree(task: Task = systemTask): Promise<ComponentNode> {
    const root = createSystemComponent(task);
    const virtualComponents = getVirtualComponents(task);
    const externalComponents = getExternalComponents(task);
    return Promise.all([virtualComponents, externalComponents]).then(components => {
        // Components needs to be flattened because the components are separated by virtual and external.
        const flattened = flatten<ComponentNode>(components);
        flattened.forEach(component => root.addSubComponent(component));        
        return root;
    })
    // Execute editing functions
    .then(root => addBatterySensorEvents(root))
    .then(root => addBatteryTemperatureEvents(root))
    // Catch any error and return the root anyway. Otherwise we'd fail completely.
    .catch(anything => {
        return root;
    });
}

// Ranges for possible indices of various items
const possibleIndicesForVirtualComponents = range(1, 16); // slots 1...16 for virtual components
const possibleIndicesForExternalTasks = range(1, 8); // slots 1...8 for external tasks
const itemIndicesOfExternalTask = range(1, 8); // slots 1...8 for components of external tasks

/**
 * Get all active virtual components.
 * @param {Task} task - A task that is configuring virtual components.
 * @return {Promise} A promise to an array of components.
 */
function getVirtualComponents(task: Task): Promise<ComponentNode[]> {
    const promises = possibleIndicesForVirtualComponents.map(index => {
        const prefix = `/${task.name}/.SystemCfg.Properties.VirtualItems[${index}]`;
        return WebMI.readData([
            `${prefix}.Group`,
            `${prefix}.Index`,
            `${prefix}.Info.Name`
        ]).then(results => {
            const type = safelyDeserializeComponentType(results[0].value);
            const node = new ComponentNode(type, task, results[1].value);
            node.customName = results[2].value;
            return node;
        }).catch(errors => {
            // Catch error by returning a component of undefined type. That way we still can
            // use promises that didn't return an error. Leaving this catch clause
            // away will make the whole request fail if one fails. This component will
            // be filtered out later in this function.
            console.info(`ComponentService can't read group, index or name for '${prefix}', will ignore component.`);
            return new ComponentNode(ComponentType.Undefined, task, -1);
        });
    });
    return Promise.all(promises).then(removeUndefinedComponents);    
}

function removeUndefinedComponents(components: ComponentNode[]) {
    return components.filter(hasType);
}

function hasType(node: ComponentNode) {
    return node.type !== ComponentType.Undefined;
}

/**
 * Get active external tasks of a task that configures them.
 * @param {Task} parentTask - A task that configures the external tasks (e.g. system task)
 * @return {Promise} A promise for an array of tasks.
 */
function getExternalTasks(parentTask: Task): Promise<Task[]> {
    const promises = possibleIndicesForExternalTasks.map(index => {
        const prefix = `/${parentTask.name}/.SystemCfg.Properties.ExternalTasks[${index}]`;
        return WebMI.readData([
            `${prefix}.TaskName`,
            `${prefix}.ModuleName`,
        ]).then(results => {
            return new Task(results[0].value, results[1].value, parentTask, index);
        }).catch(errors => {
            console.info(`ComponentService can't read name or module name of '${prefix}', will ignore task.`);
            return new Task("");
        });
    });
    return Promise.all(promises).then(tasks => tasks.filter(isActiveTask));
}

function isActiveTask(task: Task) {
    return task.name !== "";
}

/**
 * Get all active external components. Does not include the custom name.
 * @param {Task} externalTask - An external task that is configuring external components. Needs to have a parent, e.g. systemTask.
 * @return {Promise} A promise to an array of components.
 */
function getAllExternalComponents(externalTask:Task): Promise<ComponentNode[]> {
    if (externalTask.parent === undefined) {
        throw new Error("External task doesn't have parent task, e.g. systemTask.");
    }
    const prefix = `/${externalTask.parent.name}/.SystemCfg.Properties.ExternalTasks[${externalTask.index}]`;
    const promises = itemIndicesOfExternalTask.map(index => {        
        return WebMI.readData([
            `${prefix}.Items[${index}].ItemType`,
            `${prefix}.Items[${index}].ExternalIndex`
        ]).then(results => {
            const type = safelyDeserializeComponentType(results[0].value);
            return new ComponentNode(type, externalTask, results[1].value);
        }).catch(errors => {
            console.info("ComponentService can't read type or external index of a possible component defined in external task, will ignore it.")
            return new ComponentNode(ComponentType.Undefined, externalTask, -1);
        });
    });
    return Promise.all(promises).then(removeUndefinedComponents);    
}

/**
 * Get the custom name of a component. The result will be assigned to the component argument.
 */
function getComponentName(component: ComponentNode): Promise<ComponentNode> {
    return WebMI.readData([
        `${component.dp.config}.Operation.Info.Name`
    ]).then(results => {
        component.customName = results[0].value;
        return component;
    }).catch(errors => {
        console.info(`ComponentService can't read the custom name of '${component.dp.config}', will use default one.`);
        return component; 
    });
}

/**
 * Get a specific subset of all external components:
 * - No raw meters
 * - Include custom name if defined
 */
function getExternalComponents(parentTask: Task): Promise<ComponentNode[]> {
    return getExternalTasks(parentTask)
        .then(tasks => {
            const promises = tasks.map(getAllExternalComponents)
            return Promise.all(promises);
        })
        .then(componentsByTask => {
            const components = flatten(componentsByTask);
            const promises = components.filter(notRawMeter).map(getComponentName);
            return Promise.all(promises);
        });
}

function notRawMeter(component: ComponentNode) {
    return component.type !== ComponentType.RawMeter;    
}

function createSystemComponent(task: Task) {
    return new ComponentNode(ComponentType.System, task, -1);
}


// -------------------------------------------------------------------------------------------------------------
// TODO put code below in dedicated file?

interface ComponentTreeEditor {
    /**
     * An editing function
     * @param {ComponentNode} node - The root node of the component tree
     * @return {Promise} a Promise for the root node of the component tree after editing
     */
    (node: ComponentNode): Promise<ComponentNode>
}

/**
 * ComponentTreeEditor: Load dynamic event type definitions for batteries. Changes will
 * be written into the provided component tree!
 * @param {ComponentNode} root - The node of the component tree where the search for battery nodes should start (e.g. root)
 * @return {Promise} returns a promise for the root node provided as the argument.
 */
function addBatterySensorEvents(root: ComponentNode): Promise<ComponentNode> {
    let promises: Promise<any>[];
    // Get all battery nodes
    let batteryNodes = root.filter(node => node.type === ComponentType.Battery);
    promises = batteryNodes.map(node => {
        // Add new EventDP to each battery node
        const eventDP = new EventDP(".EventSensors", node, []);
        node.events.push(eventDP);
        // Configure the eventDP instance with event types read from the PLC
        const nodePromises = range(1, 16).map(index => {
            const prefix = `${node.dp.config}.Properties.EventSensors[${index}]`;
            return WebMI.readData([
                prefix + ".Name",
                prefix + ".ActiveEvent"
            ]).then(results => {
                const name = results[0].value;
                // Only add the event type definition if it has a name assigned. 
                // Otherwise treat this as an unknown event.
                if (name !== undefined && name !== "") {
                    const plcEventLevel = parseInt(results[1].value, 10);
                    eventDP.types.push({
                        mask: 2**(index-1),
                        name: name,
                        level: plcEventLevelToEventLevel(plcEventLevel)
                    });
                }
            });
        });
        // Return a promise that all indices of an event sensor config have been read.
        return Promise.all(nodePromises);
    });
    // We don't care what exactly all the promises return (hence 'whatever'), we're only interested
    // *when* all async processes are done and return the root node of the ComponentTree at the end of it.
    return Promise.all(promises).then(whatever => root);
}


function addBatteryTemperatureEvents(root: ComponentNode): Promise<ComponentNode> {
    let promises: Promise<any>[];
    let batteryNodes = root.filter(node => node.type === ComponentType.Battery);
    promises = batteryNodes.map(node => {
        // Add new EventDPs to each battery node
        const alarmEventDP = new EventDP(".TempAlarmWord", node, []);
        const warningEventDP = new EventDP(".TempWarningWord", node, []);
        node.events.push(alarmEventDP);
        node.events.push(warningEventDP);
        // Configure the eventDP instances with event types read from the PLC
        const nodePromises = range(1, 8).map(index => {
            const prefix = `${node.dp.config}.Properties.Temps[${index}]`;
            return WebMI.readData([
                prefix + ".Name",
                prefix + ".AlarmEvent"
            ]).then(results => {
                const name = results[0].value;
                const level = parseInt(results[1].value, 10);
                warningEventDP.types.push({
                    mask: 2**(index-1),
                    name: "UT:" + name,
                    level: Level.Warning
                });
                warningEventDP.types.push({
                    mask: 2**index,
                    name: "OT:" + name,
                    level: Level.Warning
                });
                alarmEventDP.types.push({
                    mask: 2**(index-1),
                    name: "UT:" + name,
                    level: Math.min(level, Level.Error)
                });
                alarmEventDP.types.push({
                    mask: 2**index,
                    name: "OT:" + name,
                    level: Math.min(level, Level.Error)
                });
            });
        });
        return Promise.all(nodePromises);
    });
    return Promise.all(promises).then(whatever => root);
}


// /**
//  * Get the number of racks on a Samsung Battery.
//  */
// function getNumRacks(component: ComponentNode): Promise<number> {
//     const dpRackCount = `/${component.task.name}/.SamsungCfg[${component.index}].Samsung.BatteryConfig.RackCount`;
//     return WebMI.readData([dpRackCount]).then(results => {
//         return parseInt(results[0].value, 10);
//     }).catch(errors => {
//         console.info(`ComponentService can't get number of racks at '${dpRackCount}', returning 0`);
//         return 0;    
//     });    
// }