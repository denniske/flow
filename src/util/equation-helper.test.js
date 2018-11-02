import {EquationHelper} from "./equation-helper";

it('toLatex', () => {
    const result = EquationHelper.toLatex("1.602*10^(-18)");
    expect(result).toEqual("1.602\\cdot 10^{-18}");
});

it('variable with index', () => {
    const result = EquationHelper.toLatex("v_0");
    expect(result).toEqual("v_{0}");
});
