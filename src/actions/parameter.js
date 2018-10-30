export const PARAMETER_ACTION = {
    ADD_PARAMETER: 'ADD_PARAMETER',
};

export class ParameterActionCreator {

    static addParameter(symbol, value) {
        return {
            type: PARAMETER_ACTION.ADD_PARAMETER,
            payload: {
                symbol: symbol,
                value: value,
            }
        };
    }
}
