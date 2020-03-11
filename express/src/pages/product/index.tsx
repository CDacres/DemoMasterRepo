import ProductPage from '@pages/Product';
import { createStore, AnyAction } from 'redux';
import langObject from '@src/data/langObject';
import { Provider } from 'react-redux';
import * as React from 'react';

const lang = langObject('gb');

import { exampleTags, exampleVerticals } from '@src/data/references';

type Props = {
  url: string;
};

const storeAdmin = createStore<any, AnyAction, any, any>((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: true,
      isLoggedIn: true,
    },
  },
  config: {
    defaultLocation: {
      lat: '51.5072996',
      locationDesc: 'London, UK',
      locationSlug: 'London--UK',
      lon: '-0.1280232',
    },
    domain: 'uk',
  },
  lang,
  responsive: {},
  search: {
    params: { tag: 'meeting-rooms' },
    tags: exampleTags,
    url: '/s/meeting-rooms',
    verticals: exampleVerticals,
  },
});

export default class DynamicProductPage extends React.Component<Props, {}> {

  // static async getInitialProps({ state: { redux }, req }: Ctx): Promise<object> {
  //   const isServer = !!req;
  //   await super.initStateGenerator(isServer, redux, req);
  //   return {};
  // }

  render() {
    return (
      <Provider store={storeAdmin}>
        <ProductPage />
      </Provider>
    );
  }
}
