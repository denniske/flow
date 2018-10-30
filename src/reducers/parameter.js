import {PARAMETER_ACTION} from "../actions/parameter";
import {merge} from "lodash";

class ParameterReducer {
    static handle(state = [], action) {
        const { type, payload } = action;
        switch (type) {
            case PARAMETER_ACTION.ADD_PARAMETER:
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

// const nodes = (state = [], action) => {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return [
//         ...state,
//         {
//           id: action.id,
//           text: action.text,
//           completed: false
//         }
//       ];
//     case 'TOGGLE_TODO':
//       return state.map(todo =>
//         (todo.id === action.id)
//           ? {...todo, completed: !todo.completed}
//           : todo
//       );
//     default:
//       return state
//   }
// };

export default ParameterReducer.handle
