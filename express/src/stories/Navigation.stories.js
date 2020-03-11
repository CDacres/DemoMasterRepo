import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import langObject from '@src/data/langObject';

import Container from './container';

import Header from '@src/components/concrete/Header';

const lang = langObject();

const store = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: false,
      isSpoofMode: false
    }
  },
  config: {
    domain: 'uk',
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {}
});

const storeAdmin = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: true,
      isLoggedIn: true,
      isSpoofMode: false
    }
  },
  config: {
    domain: 'uk',
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {}
});

const storeAdminSpoof = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: true,
      isLoggedIn: true,
      isSpoofMode: true
    }
  },
  config: {
    domain: 'uk',
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {}
});

const storeVenue = createStore((state, action) => {
  switch (action.type) {
    default:
      return state;
  }
}, {
  auth: {
    user: {
      isAdmin: false,
      isLoggedIn: true,
      isSpoofMode: false,
      isVenueOwner: true
    }
  },
  config: {
    domain: 'uk',
    header: {},
    phone: {
      phoneNumber: '+442071832212',
      phoneNumberDisplay: '+44 (0)20 7183 2212'
    }
  },
  lang,
  responsive: {}
});

storiesOf('Navigation', module)
  .add('admin', () => {
    return (
      <Provider store={storeAdmin}>
        <Container>
          <Header />
        </Container>
      </Provider>
    );
  })
  .add('not logged in', () => {
    return (
      <Provider store={store}>
        <Container>
          <Header />
        </Container>
      </Provider>
    );
  })
  .add('spoof', () => {
    return (
      <Provider store={storeAdminSpoof}>
        <Container>
          <Header />
        </Container>
      </Provider>
    );
  })
  .add('venue', () => {
    return (
      <Provider store={storeVenue}>
        <Container>
          <Header />
        </Container>
      </Provider>
    );
  });
