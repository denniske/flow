
export class ArrayHelper {
    static flatten(array) {
        return array.reduce((acc, e) => acc.concat(e), []);
    }

    static unique(array) {
        return Array.from(new Set(array));
    }
}
