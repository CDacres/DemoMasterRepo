import { combineReducers } from 'redux';
import createStore from '../../extended-store';

describe('Extended Store integration tests', () => {
  const makeTestReducer = id => (state = `${id} - initialValue`, { type, newValue }) => {
    return type === 'CHANGE_VALUE' ? `${id} - ${newValue}` : state;
  };

  test('should create store', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    });

    const initialState = {
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue'
    };

    const store = createStore(reducer, initialState);

    expect(store.getState()).toEqual(initialState);
  });

  test('should attach reducer', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    });

    const initialState = {
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue'
    };

    const store = createStore(reducer, initialState);

    store.attachReducers({
      'dynamics.dynamic1': makeTestReducer('dynamic1'),
      'dynamics.dynamic2': makeTestReducer('dynamic2')
    });

    expect(store.getState()).toEqual({
      dynamics: {
        dynamic1: 'dynamic1 - initialValue',
        dynamic2: 'dynamic2 - initialValue'
      },
      ...initialState
    });
  });
});
