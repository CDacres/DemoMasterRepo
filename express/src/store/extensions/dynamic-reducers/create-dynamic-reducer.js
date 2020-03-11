import { combineReducers } from 'redux';
import concatenateReducers from 'redux-concatenate-reducers';

import filteredReducer from './filtered-reducer';

const expandReducers = reducers => {
  const expandedReducers = { children: {} };

  // Loop through reducer keys
  for (const key in reducers) {
    // Split the key path by . delimiter
    const path = key.split('.');
    let currentNode = expandedReducers;

    // Run through each path element in split array
    for (const element of path) {
      // If path element doesn't exist in current node's children
      if (!currentNode.children[element]) {
        // then create a new node for this element
        currentNode.children[element] = { children: {} };
      }

      // Change current node to this element's node
      currentNode = currentNode.children[element];
    }

    // Attach reducer to the current node.
    currentNode.reducer = reducers[key];
  }

  // Return the node tree
  return expandedReducers;
};

const collapseReducers = node => {
  // Destructure the node tree
  const { reducer, children } = node;

  // Get the root node's child keys
  const childrenKeys = Object.keys(children);

  // If there are no children
  if (!childrenKeys.length) {
    // then return the reducer
    return reducer;
  }

  // Reduce the children recursively to get all reducers
  const reducersToCombine = childrenKeys.reduce(
    (reducerMap, key) => ({ ...reducerMap, [key]: collapseReducers(children[key]) }),
    {}
  );

  // Combine all child reducers
  const childrenReducer = combineReducers(reducersToCombine);

  // If the root node had a reducer, cocatenate it with the combined child reducers, else return the combined child reducers
  return reducer ? concatenateReducers([filteredReducer(reducer), filteredReducer(childrenReducer)]) : childrenReducer;
};

export default function createDynamicReducer(reducers) {
  // We need to check reducer keys for delimited paths, in which case we need to split these up
  const expandedReducers = expandReducers(reducers);
  // Then we need to collapse and concatenate these bad-boys into one big old mofo of a reducer
  return collapseReducers(expandedReducers);
}
