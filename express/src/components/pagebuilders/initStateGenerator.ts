import { NextPageContext } from 'next';
import { Store as ReduxStore } from 'redux';
import { setMobileDetect, mobileParser } from 'react-responsive-redux';

// Redux stuff
import { fetchUserAccount } from '@src/store/modules/auth/user';

// Lib
import StateGenerator from '@src/lib/generate-state';

// Types
import { Store } from '@src/typings/types';
import { ConnectionsType } from '@src/sideeffects/connections';
import { State } from '@src/state';

export type PageProps = {
  reduxStore: ReduxStore<any>;
  req: object;
};

export type Ctx = NextPageContext & {
  state: State;
  connections: ConnectionsType;
};

export default async (isServer: boolean, reduxStore: ReduxStore<Store.State>, req: object) => {
  const stateGenerator = new StateGenerator(isServer, reduxStore);

  const { auth: { tokens: { dataApi } } } = reduxStore.getState();
  // For state generators that need to run through the root epic
  if (dataApi) {
    await stateGenerator.addAsyncStateGenerators(
      fetchUserAccount()
    );
  }

  const mobileDetect = mobileParser(req);
  stateGenerator.bindResultsToGenerator(
    setMobileDetect(mobileDetect)
  );

  stateGenerator.generate();

  return stateGenerator;
};
