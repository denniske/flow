export const NODE_ACTION = {
    ADD_NODE: 'ADD_NODE',
    UPDATE_NODE_FORMULA: 'UPDATE_NODE_FORMULA',
};

export class NodeActionCreator {
    static nextNodeId = 1;

    static addNode(formula, x, y) {
        return {
            type: NODE_ACTION.ADD_NODE,
            payload: {
                id: this.nextNodeId++,
                formula: formula,
                x: x,
                y: y,
            }
        };
    }

    static updateNodeFormula(id, formula, marker) {
        return {
            type: NODE_ACTION.UPDATE_NODE_FORMULA,
            payload: {
                id,
                formula,
                marker,
            }
        };

    }
}
