import { Action } from 'redux';

export default function createReducer(initialState: object, handlers: object) {
  return (state: object = initialState, action: Action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
