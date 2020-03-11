import { observable } from 'mobx';
import { Model } from './Model';

export abstract class DependentModel<TPrincipalModel extends Model = Model> extends Model {

  @observable parent: TPrincipalModel = null;

  constructor(parent: TPrincipalModel) {
    super();
    this.parent = parent;
  }
}
