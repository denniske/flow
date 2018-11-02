import {NODE_ACTION} from "../actions/node";
import {merge} from "lodash";
import {AssignmentReducer} from "./assignment";
import {ASSIGNMENT_ACTION} from "../actions/assignment";
import update from 'immutability-helper';
import {StringHelper} from "../util/string-helper";
import {EquationHelper} from "../util/equation-helper";
import {REGEX_FORMULA_VARIABLE} from "../constants";

class NodeReducer {
    static handle(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case NODE_ACTION.ADD_NODE:
                return merge({}, state, {
                    [payload.id]: {
                        id: payload.id,
                        formula: payload.formula,
                        latex: payload.latex,
                        x: payload.x,
                        y: payload.y,
                        assignments: {},
                        marker: {},
                    }
                });
            case NODE_ACTION.UPDATE_NODE_FORMULA:
                return update(state, {
                    [payload.id]: {
                        $merge: {
                            formula: payload.formula,
                            latex: payload.latex,
                        },
                    }
                });
            case NODE_ACTION.UPDATE_NODE_FORMULA_MARKER:
                return update(state, {
                    [payload.id]: {
                        marker: {
                            $set: payload.marker,
                        },
                    }
                });
            case NODE_ACTION.ADD_ASSIGNMENT:
                const newLatex = state[payload.id].latex.replace(REGEX_FORMULA_VARIABLE, (_, charBefore, variable) => {
                    if (payload.symbol === variable.replace(/[{}]/g, "")) {
                        return charBefore + EquationHelper.toLatex(payload.parameter);
                    }
                    return charBefore + variable;
                });
                return update(state, {
                    [payload.id]: {
                        $merge: {
                            formula: StringHelper.replaceAll(state[payload.id].formula, payload.symbol, "("+payload.parameter+")"),
                            latex: newLatex,
                        },
                    }
                });
            default:
                return state;
        }
    }
}

export default (state = [], action) => {
    state = NodeReducer.handle(state, action);
    // if (Object.keys(ASSIGNMENT_ACTION).includes(action.type)) {
    //     const previousState = state[action.payload.nodeId].assignments;
    //     const nextState = AssignmentReducer.handle(previousState, action);
    //     if (previousState !== nextState) {
    //         state = merge({}, state, {
    //             [action.payload.nodeId]: {
    //                 assignments: nextState,
    //             }
    //         });
    //     }
    // }
    return state;
};
