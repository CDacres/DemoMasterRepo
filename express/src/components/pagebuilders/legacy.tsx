import * as React from 'react';
import { Provider } from 'react-redux';
import { NextPageContext, NextComponentType } from 'next';

// Redux
import { updateInitialState, getOrCreateStore } from '@src/state/redux';

// Initializers
import '@src/lib/init-with-styles-stylesheet'; // tslint:disable-line

// Styles
import '@src/styles/font.css'; // tslint:disable-line

// Components
import initStateGenerator from '@src/components/pagebuilders/initStateGenerator';

// Types
import { Store as StoreShape } from '@src/typings/types';
import { State } from '@src/state';
import { ConnectionsContext, ConnectionsType, connectionsFactory } from '@src/sideeffects/connections';

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export type LegacyContext = {
  state: State;
  connections: ConnectionsType;
};

export default function connect<P, IP>(Child: NextComponentType<NextPageContext, IP, P>) {
  type InitialState = {
    initialState: StoreShape.State;
  };

  type LocalIP = InitialState & IP;

  type LocalAP = InitialState & P;

  const Wrapper: NextComponentType<NextPageContext, LocalIP, LocalAP> = (props) => {
    const { initialState } = props;
    const state: State = {
      redux: getOrCreateStore<StoreShape.State>(initialState),
    };
    const connections: ConnectionsType = connectionsFactory(state);
    return (
      <React.Fragment>
        <Provider store={state.redux}>
          <ConnectionsContext.Provider value={connections}>
            <Child {...{ ...props, store: state.redux }} />
          </ConnectionsContext.Provider>
        </Provider>
      </React.Fragment>
    );
  };

  Wrapper.displayName = `WithLegacy(${getDisplayName(Child)})`;

  Wrapper.getInitialProps = async (ctx) => {
    const { req } = ctx;
    const isServer = !!req;
    const initialState = updateInitialState(ctx);
    const state: State = {
      redux: getOrCreateStore<StoreShape.State>(initialState),
    };
    const connections: ConnectionsType = connectionsFactory(state);

    const zipCtx: NextPageContext & LegacyContext = {
      ...ctx,
      connections,
      state,
    };

    const generator = await initStateGenerator(isServer, state.redux, req);
    await generator.generate();
    const pageIP = await Child.getInitialProps(zipCtx);
    return {
      ...pageIP,
      initialState: state.redux.getState(),
    };
  };
  Wrapper.displayName = `WithLegacy(${getDisplayName(Child)})`;
  return Wrapper;
}
