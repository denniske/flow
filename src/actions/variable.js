export const VARIABLE_ACTION = {
    SET_VARIABLES: 'SET_VARIABLES',
};

export class VariableActionCreator {

    static setVariables(variables) {
        return {
            type: VARIABLE_ACTION.SET_VARIABLES,
            payload: {
                variables,
            }
        };
    }
}
