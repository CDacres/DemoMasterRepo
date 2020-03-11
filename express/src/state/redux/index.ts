import getInitialState from '@src/store/initial-state';
import { initializeStore } from '@src/store';
import getLangObject from '@src/data/langObject';
import { NextPageContext } from 'next';
import { Store } from 'redux';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

export function getOrCreateStore<T>(initialState: T): Store<T> {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore<T>(initialState);
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore<T>(initialState);
  }

  return window[__NEXT_REDUX_STORE__] as Store<T>;
}

export const updateInitialState = ({ query: { dataApiToken, ...config } }: NextPageContext) => {
  const initialState = getInitialState();
  const updatedInitialState = {
    ...initialState,
    auth: {
      ...initialState.auth,
      tokens: {
        ...initialState.auth.tokens,
        dataApi: dataApiToken as string,
      },
    },
    config: {
      ...initialState.config,
      ...config,
    },
  };
  const { config: { language } } = updatedInitialState;
  const lang = getLangObject(language);
  updatedInitialState.lang = lang;
  return updatedInitialState;
};
