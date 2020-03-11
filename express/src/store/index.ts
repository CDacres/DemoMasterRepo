import { combineReducers, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createEpicMiddleware } from 'redux-observable';
import reduxCatch from 'redux-catch';
import { reducer as responsiveReducer } from 'react-responsive-redux';
// import logger from 'redux-logger';

// Logging
import Logger from '@src/store/utils/logger';

// Extensions
import createStore from '@src/store/extensions/extended-store';
import createRootEpic from '@src/store/extensions/dynamic-epics';
import { flattenReducers } from '@src/store/extensions/dynamic-reducers';

// Combined observable epics
import combinedEpics from '@src/store/epics';

// Modules
import * as auth from '@src/store/modules/auth';
import * as config from '@src/store/modules/config';
import * as lang from '@src/store/modules/lang';
// import * as order from '@src/store/modules/order';
import * as search from '@src/store/modules/search';

// Create error handler function
const errorHandler = (error, getState) => Logger.error(error, getState());

const rootEpic = createRootEpic(combinedEpics);

// Create root reducer
export const rootReducer = combineReducers({
  auth: auth.reducer,
  config: config.reducer,
  lang: lang.reducer,
  // order: order.reducer,
  responsive: responsiveReducer,
  // room: room.reducer,
  search: search.reducer,
});

// Function for dynamically adding reducers later on
export const attachReducers = (store, reducers) => {
  store.attachReducers({
    auth: auth.reducer,
    config: config.reducer,
    lang: lang.reducer,
    // order: order.reducer,
    responsive: responsiveReducer,
    // room: room.reducer,
    search: search.reducer,
    ...flattenReducers(reducers),
  });
};

// Bind middleware function, attach devtools if not in production
const bindMiddleware = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...args));
  }
  return applyMiddleware(...args);
};

// Initialize the store with middleware
export function initializeStore<T>(initialState: T): Store<T> {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware(
      reduxCatch(errorHandler),
      // logger,
      thunkMiddleware,
      epicMiddleware
    )
  );

  epicMiddleware.run(rootEpic);

  return store as Store<T>;
}

export {
  auth,
  config,
  lang,
  // order,
  // room,
  search
};
