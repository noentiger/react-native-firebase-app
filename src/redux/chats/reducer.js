/**
 * Recipe Reducer
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import Store from './store';

// Set initial state
export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHATS_REPLACE': {
      return {
        ...state,
        chats: action.data,
      };
    }
    default:
      return state;
  }
}
