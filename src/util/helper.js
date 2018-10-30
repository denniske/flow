
export class Helper {
    static getVariables(str) {
        return str.match(/[A-Za-z_]+/g) || [];
    }
}
