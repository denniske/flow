import {merge} from "lodash";
import {CONSTANT_ACTION} from "../actions/constant";

class ConstantReducer {
    static handle(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case CONSTANT_ACTION.ADD_CONSTANT:
                return merge({}, state, {
                    [payload.symbol]: {
                        symbol: payload.symbol,
                        value: payload.value,
                    }
                });
            default:
                return state;
        }
    }
}

export default ConstantReducer.handle
