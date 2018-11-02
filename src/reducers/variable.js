import {VARIABLE_ACTION} from "../actions/variable";
import update from "immutability-helper";

class VariableReducer {
    static handle(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case VARIABLE_ACTION.SET_VARIABLES:
                return update(state, {
                    $set: payload.variables,
                });
            default:
                return state;
        }
    }
}

export default VariableReducer.handle
