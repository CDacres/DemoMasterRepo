import { createStore as baseCreateStore } from 'redux';
import concatenateReducers from 'redux-concatenate-reducers';

import { createDynamicReducer, filteredReducer, flattenReducers } from '../dynamic-reducers';

const DEFAULT_REDUCER = state => state;

export default function createStore(reducer, ...rest) {
  let dynamicReducers = {};

  // Declare createReducer function
  const createReducer = () => {
    const reducers = [];

    // If a reducer was provided
    if (reducer) {
      // then push it into the rexucers array after filtering it
      reducers.push(filteredReducer(reducer));
    }

    // If any dynamic reducers have been added
    if (Object.keys(dynamicReducers).length !== 0) {
      // then push those fuckers into the reducers array after creating a dynamic reducer from them
      reducers.push(createDynamicReducer(dynamicReducers));
    }

    // If the reducers array has members, concategnate them or just return the default reducer
    return Object.keys(reducers).length > 0 ? concatenateReducers(reducers) : DEFAULT_REDUCER;
  };

  // Declare attachReducers function
  const attachReducers = reducers => {
    dynamicReducers = {
      ...dynamicReducers,
      // Flatten those reducers and add them to the dynmiac reducers object
      ...flattenReducers(reducers)
    };

    // Replace the store reducer with the reducer produced by declared createReducer function
    store.replaceReducer(createReducer());
  };

  // Create the base store with the initial stuff passed through from store/index.ts
  const store = baseCreateStore(createReducer(), ...rest);

  // Attach the attachReducers method to the store
  store.attachReducers = attachReducers;

  // Return that mofo
  return store;
}
