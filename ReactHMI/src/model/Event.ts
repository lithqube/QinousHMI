import ComponentNode from "./ComponentNode";

/**
 * Describes a type of event, e.g. see definitions in `EventConfig.ts`
 */
export interface EventType {
    readonly name: string;
    readonly level: Level;
    readonly mask: number; // bit-mask for a 16-bit uint
}

/**
 * An event type has a certain level, it can be purely informative or an alarm.
 * Note: In the frontend, everything is an event. This is different from code 
 * on the PLC where event and alarms are two different things. Here, an alarm is
 * an event with a "alarming" level.
 */
export enum Level {
    None = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Inhibit = 4,
    Limit = 5,
    LimitInhibit = 6,
    Trip = 7
}

/**
 * Holds event types associated with a data point of a ComponentNode. Translates a 16-bit
 * datapoint value to a set of corresponding event types.
 */
export class EventDP {
    readonly relativeDP: string;
    readonly owner: ComponentNode
    public types: EventType[];

    constructor(relativeDP: string, owner: ComponentNode, eventTypes: EventType[]) {
        this.relativeDP = relativeDP;
        this.owner = owner;
        this.types = eventTypes;
    }

    get dp() {
        return this.owner.dp.data + this.relativeDP;
    }

    /**
     * Returns all event types whose mask fits a given value. Also includes unknown events
     * if a bit is set but no EventType has been registered for it. Unknown events have Level.Info.
     * It's also possible to have multiple types with the same mask.
     */
    eventTypesForValue(value: number): EventType[] {
        let types: EventType[] = [];
        let remainder = value;
        for (const type of this.types) {
            if ((type.mask & value) === type.mask) {
                remainder &= ~type.mask; // Remove the bit from the remainder to check later for unknown errors.
                types.push(type);
            }
        }
        // If there is a remainder then we have unknown errors, 
        // find out which bits are set.
        if (remainder > 0) {
            const unknownTypes = getBitValuesUInt16(remainder).map(bitValue => ({
                mask: 0,
                name: `Unknown event (${this.relativeDP}: ${bitValue})`,
                level: Level.Info
            }));
            types = types.concat(unknownTypes);
        }
        return types;
    }
}

// TODO move this to common utils
function getBitValuesUInt16(value: number): number[] {
    const bits: number[] = [];
    for (let i = 0; i < 16; i++) {
        const bit = 1 << i;
        if ((value & bit) === bit) {
            bits.push(bit);
        }        
    }
    return bits;
}