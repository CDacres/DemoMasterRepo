import { observable, computed, action, toJS } from 'mobx';

// Can also act a principal model
export class Model {
  @observable workers: number = 0;

  children: Model[] = [];

  // generic model operations
  init: () => Promise<void>;
  create: () => Promise<void>;
  load: () => Promise<void>;
  valid: () => Promise<void>;
  submit: () => Promise<void>;

  @computed get isBusy() {
    return this.workers > 0;
  }

  @action
  async invoke<T>(action: () => Promise<T>) {
    this.workers++;
    let result = null;
    try {
      result = await action();
      this.workers--;
      return result;
    } catch (e) {
      this.workers--;
      throw e;
    }
  }

  @action applyChanges<T>(target: T, changes: Partial<T>) {
    if (!!target && !!changes) {
      Object.assign(target, changes);
    }
  }

  dispatchInit = async () => {
    for (const model of this.children) {
      if (!!model.init) {
        await model.init();
      }
    }
  }

  dispatchCreate = async () => {
    for (const model of this.children) {
      if (!!model.create) {
        await model.create();
      }
    }
  }

  dispatchLoad = async () => {
    for (const model of this.children) {
      if (!!model.load) {
        await model.load();
      }
    }
  }

  dispatchValid = async () => {
    for (const model of this.children) {
      if (!!model.valid) {
        await model.valid();
      }
    }
  }

  dispatchSubmit = async () => {
    for (const model of this.children) {
      if (!!model.submit) {
        await model.submit();
      }
    }
  }

  cloneRx = (entry: any): any => {
    return observable(toJS(entry));
  }
}
