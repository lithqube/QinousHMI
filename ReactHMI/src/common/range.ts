/**
 * Returns an array of numbers ranging from `from` to and including `to`.
 */
export default function range(from: number, toIncluding: number): number[] {
    let result: number[] = [];
    for (let i = from; i <= toIncluding; i++) {
        result.push(i);
    }
    return result;
}