import {ASSIGNMENT_ACTION} from "../actions/assignment";
import {merge} from "lodash";

export class AssignmentReducer {
    static handle(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case ASSIGNMENT_ACTION.ADD_ASSIGNMENT:
                return merge({}, state, {
                    [payload.symbol]: {
                        symbol: payload.symbol,
                        parameter: payload.parameter,
                    }
                });
            default:
                return state;
        }
    }
}
