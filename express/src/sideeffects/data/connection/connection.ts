import { createUploadLink } from 'apollo-upload-client';
import { ApolloLink, concat } from 'apollo-link';
import { ApolloClient, DefaultOptions } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import fetch from 'node-fetch';
import { State } from '@src/state';

export type ConnectionType = ApolloClient<any>;
export const connectionFactory = (state: State): ConnectionType => {

  const cache = new InMemoryCache({
    addTypename: false,
  });

  const defaultOptions: DefaultOptions = { // TODO: sort out caching
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  };

  let link = createUploadLink({
    uri: `https://api.${process.env.SITE_NAME}/graphql`,
    fetch,
  });

  if (process.browser) {
    persistCache({
      cache,
      storage: localStorage,
      key: 'gql_client',
    });

    const middleware = new ApolloLink((operation, forward) => {
      const auth = state.redux.getState().auth;
      if (auth.tokens && auth.tokens.dataApi) {
        operation.setContext({
          headers: {
            authorization: 'Bearer ' + auth.tokens.dataApi,
          },
        });
      }
      return forward(operation);
    });

    link = concat(middleware, link);
  }

  return new ApolloClient({
    link,
    cache,
    defaultOptions,
  });
};
