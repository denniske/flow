import {Helper} from "./util/helper";
import {EquationHelper} from "./util/equation-helper";

it('toLatex', () => {
    const result = EquationHelper.toLatex("1.602*10^(-18)");
    expect(result).toEqual("1.602\\cdot 10^{-18}");
});
