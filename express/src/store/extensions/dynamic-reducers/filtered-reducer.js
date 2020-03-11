import { isPlainObject } from 'lodash';

const FILTER_INIT = {
  type: '@@FILTER/INIT'
};

export default function filteredReducer(reducer) {
  // Get the provided reducer state known keys
  let knownKeys = Object.keys(reducer(undefined, FILTER_INIT));

  // Return a new reducer
  return (state, action) => {
    // Get the filtered state provided to the reducer function
    let filteredState = state;

    // If there were known keys provided initially and the state exists
    if (knownKeys.length && state !== undefined) {
      // Reduce that bi-atch based on those known keys, removing any unknown fuckers in the process
      filteredState = knownKeys.reduce((current, key) => {
        current[key] = state[key];
        return current;
      }, {});
    }

    // Get some tantalising new state from the reducer using the filtered state from above
    const newState = reducer(filteredState, action);

    // If that new state is equal to the filtered state, then just give back the user-provided state
    if (newState === filteredState) {
      return state;
    }

    // If those states differ, check it the new state is a plain object
    if (isPlainObject(newState)) {
      // Replace the known keys variable with the new state keys
      knownKeys = Object.keys(newState);
      // and return a combination of the state and the newState
      return {
        ...state,
        ...newState
      };
    } else {
      // Otherwise just return the new state - BOOM!
      return newState;
    }
  };
}
