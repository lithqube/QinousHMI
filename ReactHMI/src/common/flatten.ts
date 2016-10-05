/**
 * Performs shallow flatten: Converts a 2D-array into a 1D-array.
 */
export default function flatten<T>(array: T[][]): T[] {
    let result: T[] = [];
    for (const outer of array) {
        for (const inner of outer) {
            result.push(inner);
        }
    }
    return result;
}