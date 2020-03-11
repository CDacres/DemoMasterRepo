/* tslint:disable:max-line-length */
import { AnyAction, Store } from 'redux';
import { of as rxOf } from 'rxjs';

// Root epic
import rootEpic from '@src/store/epics';

export default class StateGenerator {
  public generate: (...laterActions: AnyAction[]) => void;
  protected isServer: boolean;
  protected reduxStore: Store<any>;

  constructor(isServer: boolean, reduxStore: Store<any>) {
    this.isServer = isServer;
    this.reduxStore = reduxStore;
  }

  // For state generators that need to run through the root epic
  async addAsyncStateGenerators(...actions: AnyAction[]) {
    const results = await Promise.all(actions.map((action: AnyAction) => {
      return rootEpic(
        rxOf(action),
        rxOf(this.reduxStore.getState())
      ).toPromise();
    }));

    // Bind the resulting actions to the state generator
    this.bindResultsToGenerator(...results);
  }

  bindResultsToGenerator(...results: AnyAction[]) {
    if (this.generate) {
      // Bind laterActions to the state generator
      this.generate = this.generate.bind(this, ...results);
    } else {
      // Bind initialActions to the state generator
      this.generate = this.generateState.bind(this, results);
    }
  }

  // Fire off actions
  async fireActions(actions: AnyAction[]): Promise<AnyAction[]> {
    return await Promise.all(actions.map(async (action: AnyAction) =>
      await this.reduxStore.dispatch(action)
    ));
  }

  // Generate the state with bound actions
  async generateState(initialActions: AnyAction[], ...laterActions: AnyAction[]): Promise<void> {
    const actions = laterActions ? laterActions : initialActions;
    if (laterActions) {
      await this.fireActions(initialActions);
    }
    await this.fireActions(actions);

    delete this.generate;
  }
}
