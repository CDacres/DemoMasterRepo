import { compose } from 'redux';

let dynamicMiddleware = [];

export const addMiddleware = (...middleware) => {
  dynamicMiddleware = [...dynamicMiddleware, ...middleware];
};

export const removeMiddleware = middleware => {
  const index = dynamicMiddleware.findIndex(mdw => mdw === middleware);

  if (index === -1) {
    // eslint-disable-next-line no-console
    console.error('Middleware does not exist!', middleware);
    return;
  }

  dynamicMiddleware = dynamicMiddleware.filter((_, mdwIndex) => mdwIndex !== index);
};

export const resetMiddleware = () => {
  dynamicMiddleware = [];
};

export default function dynamicMiddlewareExtension({ getState, dispatch }) {
  return next => action => {
    const middlewareAPI = {
      getState,
      dispatch: act => dispatch(act)
    };

    const chain = dynamicMiddleware.map(middleware => middleware(middlewareAPI));

    return compose(...chain)(next)(action);
  };
}
