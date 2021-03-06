import {RegexHelper} from "../regex-helper";

export class GeogebraParser {
    trimWhitespace(str) {
        return str.replace(/\s/g, "");
    }
    replaceSpecialSymbols(str) {
        return str
            .replace(/²/g, "^2")
            .replace(/³/g, "^3");
    }
    parse(result) {
        result = this.trimWhitespace(result);
        result = this.replaceSpecialSymbols(result);
        if (result[0] === "{" && result[1] !== "{") {
            result = "{" + result.replace(",", "},{") + "}";
        }
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        // console.log("result", result);
        if (result === "{}") {
            return null;
        }
        const solutions = RegexHelper.getMatches(/{([^{}]+)}/g, result);
        const solutionList = [];
        for (const solution of solutions) {
            // console.log("solution", solution[1]);
            const assignments = RegexHelper.getMatches(/([^,]+)=([^,]+)/g, solution[1]);
            const assignmentMap = {};
            for (const assignment of assignments) {
                // console.log("assignment", assignment);
                assignmentMap[assignment[1]] = {
                    symbol: assignment[1],
                    expr: assignment[2],
                };
            }
            solutionList.push(assignmentMap);
        }
        // console.log("solutionList", solutionList);
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        return solutionList;
    }
}
