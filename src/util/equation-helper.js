import AlgebraLatex from "denniske-algebra-latex";

function mathParseToTex(str) {
    return new AlgebraLatex().parseMath(str).toLatex();
}

function texParseToMath(str) {
    return new AlgebraLatex().parseLatex(str).toMath();
}

export class EquationHelper {
    static toLatex(str) {
        const parts = str.split("=");
        const formulas = parts.map((p) => {
            return mathParseToTex(p);
        });
        // console.log(">>", formulas.join("="));
        return formulas.join("=");
    }
    static toMath(str) {
        return texParseToMath(str);
    }
}
