import {EquationHelper} from "../util/equation-helper";
import {ASSIGNMENT_ACTION} from "./assignment";

export const NODE_ACTION = {
    ADD_NODE: 'ADD_NODE',
    UPDATE_NODE_FORMULA: 'UPDATE_NODE_FORMULA',
    UPDATE_NODE_FORMULA_MARKER: 'UPDATE_NODE_FORMULA_MARKER',
    ADD_ASSIGNMENT: 'ADD_ASSIGNMENT',
};

export class NodeActionCreator {
    static nextNodeId = 1;

    static addNode(formula, latex, x, y) {
        if (latex == null) {
            latex = EquationHelper.toLatex(formula);
        }
        return {
            type: NODE_ACTION.ADD_NODE,
            payload: {
                id: this.nextNodeId++,
                formula,
                latex,
                x,
                y,
            }
        };
    }

    static updateNodeFormula(id, formula, latex, marker) {
        return {
            type: NODE_ACTION.UPDATE_NODE_FORMULA,
            payload: {
                id,
                formula,
                latex,
                marker,
            }
        };
    }

    static updateNodeFormulaMarker(id, marker) {
        return {
            type: NODE_ACTION.UPDATE_NODE_FORMULA_MARKER,
            payload: {
                id,
                marker,
            }
        };
    }

    static addAssignment(id, symbol, parameter) {
        return {
            type: NODE_ACTION.ADD_ASSIGNMENT,
            payload: {
                id: id,
                symbol: symbol,
                parameter: parameter,
            }
        };
    }
}
