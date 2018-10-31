import {EquationHelper} from "../util/equation-helper";

export const NODE_ACTION = {
    ADD_NODE: 'ADD_NODE',
    UPDATE_NODE_FORMULA: 'UPDATE_NODE_FORMULA',
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
}
