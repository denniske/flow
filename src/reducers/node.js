import {NODE_ACTION} from "../actions/node";
import {merge} from "lodash";
import {AssignmentReducer} from "./assignment";
import {ASSIGNMENT_ACTION} from "../actions/assignment";

class NodeReducer {
    static handle(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case NODE_ACTION.ADD_NODE:
                return merge({}, state, {
                    [payload.id]: {
                        id: payload.id,
                        formula: payload.formula,
                        x: payload.x,
                        y: payload.y,
                        assignments: {},
                    }
                });
            case NODE_ACTION.UPDATE_NODE_FORMULA:
                console.log("UPDATE_NODE_FORMULA marker=", payload.marker);
                return merge({}, state, {
                    [payload.id]: {
                        formula: payload.formula,
                        marker: payload.marker,
                    }
                });
            default:
                return state;
        }
    }
}

export default (state = [], action) => {
    state = NodeReducer.handle(state, action);
    if (Object.keys(ASSIGNMENT_ACTION).includes(action.type)) {
        const previousState = state[action.payload.nodeId].assignments;
        const nextState = AssignmentReducer.handle(previousState, action);
        if (previousState !== nextState) {
            state = merge({}, state, {
                [action.payload.nodeId]: {
                    assignments: nextState,
                }
            });
        }
    }
    return state;
};
