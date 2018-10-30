export const CONSTANT_ACTION = {
    ADD_CONSTANT: 'ADD_CONSTANT',
};

export class ConstantActionCreator {

    static addConstant(symbol, value) {
        return {
            type: CONSTANT_ACTION.ADD_CONSTANT,
            payload: {
                symbol: symbol,
                value: value,
            }
        };
    }
}
