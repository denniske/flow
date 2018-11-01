import {VARIABLE_ACTION} from "../actions/variable";
import update from "immutability-helper";

class VariableReducer {
    static handle(state = [], action) {
        console.log("HANDLE VARIABLES", state, action);
        const { type, payload } = action;
        switch (type) {
            case VARIABLE_ACTION.SET_VARIABLES:
                console.log("HANDLE VARIABLES 2", payload.variables);
                return update(state, {
                    $set: payload.variables,
                });
            default:
                return state;
        }
    }
}

export default VariableReducer.handle
