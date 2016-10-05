export default function sort<T>(array: T[], descriptor: string, ascending: boolean = true): T[] {
    const up = ascending ? 1 : -1;
    const down = ascending ? -1 : 1;
    const sortFunc = (a, b): number => {
        if (a[descriptor] < b[descriptor]) return up;
        if (a[descriptor] > b[descriptor]) return down;
        return 0;
    }
    return array.slice().sort(sortFunc);
}