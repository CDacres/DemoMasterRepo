/* tslint:disable:max-line-length */
import * as React from 'react';

export type StatefulProps = {
  observers?: Array<(context: any, state: object) => any>;
};

export type StatefulState = {
  machine?: {
    [propName: string]: any;
  };
  name: string;
  [propName: string]: any;
};

export default abstract class StatefulComponent<P extends StatefulProps, S extends StatefulState> extends React.Component<P, S> {
  static defaultProps = { observers: [] };

  state = { name: '' } as S; // Not type safe but haven't worked out how to do this properly yet...

  abstract generateState(stateName: string, stateParam?: any): object;

  shouldComponentUpdate(_: P, nextState: S) {
    const { name } = this.state;
    if (nextState && nextState.name !== name) {
      return true;
    }
    return false;
  }

  goToState = (stateName: string, stateParam?: any) => {
    const { observers } = this.props;
    this.setState(
      {
        name: stateName,
        machine: this.generateState(stateName, stateParam),
      },
      () => {
        if (observers && observers.length) {
          observers.forEach(observer => {
            if (observer instanceof Function) {
              observer(this, this.state);
            }
          });
        }
      }
    );
  }
}
