import * as React from 'react';

import getInitialState from '@src/store/initial-state';
import { initializeStore } from '@src/store';
import getLangObject from '@src/data/langObject';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState);
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }

  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  return class Redux extends React.Component {
    static async getInitialProps(appContext) {

      const initialState = getInitialState();

      const { dataApiToken, ...config } = appContext.ctx.query;

      const updatedInitialState = {
        ...initialState,
        auth: {
          ...initialState.auth,
          tokens: {
            ...initialState.auth.tokens,
            dataApi: dataApiToken
          }
        },
        config: {
          ...initialState.config,
          ...config
        }
      };

      const reduxStore = getOrCreateStore(updatedInitialState);

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      const { config: { language } } = updatedInitialState;
      const lang = getLangObject(language);

      const initialReduxState = {
        ...reduxStore.getState(),
        lang
      };

      return {
        ...appProps,
        initialReduxState
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
