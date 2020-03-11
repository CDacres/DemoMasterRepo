import createDynamicReducer from '../create-dynamic-reducer';

describe('createDynamicReducer Tests', () => {
  test('should make reducer', () => {
    const dummyReducer = (state = { value: 0 }, action) =>
      action.type === 'INC' ? { ...state, value: state.value + 1 } : state;

    const inputStructure = {
      foo: dummyReducer,
      'foo.bar': dummyReducer,
      'foo.bar.baz': dummyReducer,
      'foo.bar.qux': dummyReducer,
      'foo.baz': dummyReducer,
      bar: dummyReducer,
      'bar.baz': dummyReducer
    };

    const reducer = createDynamicReducer(inputStructure);

    const initialState = reducer(undefined, { type: 'INIT' });

    expect(initialState).toEqual({
      foo: {
        value: 0,
        bar: {
          value: 0,
          baz: {
            value: 0
          },
          qux: {
            value: 0
          }
        },
        baz: {
          value: 0
        }
      },
      bar: {
        value: 0,
        baz: {
          value: 0
        }
      }
    });
    const finalState = reducer(initialState, { type: 'INC' });

    expect(finalState).toEqual({
      foo: {
        value: 1,
        bar: {
          value: 1,
          baz: {
            value: 1
          },
          qux: {
            value: 1
          }
        },
        baz: {
          value: 1
        }
      },
      bar: {
        value: 1,
        baz: {
          value: 1
        }
      }
    });
  });

});
