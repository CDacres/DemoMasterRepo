
import { createStore } from 'redux';
import rootReducer from '../reducers';

const preloadedState = window.__state__;

delete window.__state__;

const store = createStore(
    rootReducer,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
