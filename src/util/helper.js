import {REGEX_FORMULA_VARIABLE_ONLY} from "../constants";

export class Helper {
    static getVariables(str) {
        return str.match(REGEX_FORMULA_VARIABLE_ONLY) || [];
        // return str.match(/[A-Za-z_]+/g) || [];
    }
}
