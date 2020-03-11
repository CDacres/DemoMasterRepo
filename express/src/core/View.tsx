import * as React from 'react';
import { Model } from './Models';

interface ViewModelProps<TModel extends Model> {
  model?: TModel;
}

export abstract class View<TModel extends Model, P = {}, S = {}>
  extends React.Component<P & ViewModelProps<TModel>, S> {
  get model() { return this.props.model; }
}
