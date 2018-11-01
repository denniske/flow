import {Helper} from "./util/helper";

it('getVariables result with one variable', () => {
    const result = Helper.getVariables("a + b = c");
    expect(result).toEqual(["a", "b", "c"]);
});

it('getVariables result with index', () => {
    const result = Helper.getVariables("var_test");
    expect(result).toEqual(["var_test"]);
});

it('getVariables result with one number in index', () => {
    const result = Helper.getVariables("a_1");
    expect(result).toEqual(["a_1"]);
});
