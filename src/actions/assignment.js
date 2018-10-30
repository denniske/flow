export const ASSIGNMENT_ACTION = {
    ADD_ASSIGNMENT: 'ADD_ASSIGNMENT',
};

export class AssignmentActionCreator {

    static addAssignment(nodeId, symbol, parameter) {
        return {
            type: ASSIGNMENT_ACTION.ADD_ASSIGNMENT,
            payload: {
                nodeId: nodeId,
                symbol: symbol,
                parameter: parameter,
            }
        };
    }
}
