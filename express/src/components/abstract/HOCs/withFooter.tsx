/* tslint:disable:max-line-length */
import * as React from 'react';
import { getDisplayName } from 'recompose';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { omit } from 'lodash';

// Connectors
import { useFooter } from '@src/store/connectors';

// Types
import { FooterOptions } from '@src/typings/types';

type Props = {
  setFooterState: (options: FooterOptions) => void;
};

function withFooter(BaseComponent: React.ComponentType<any>, options: FooterOptions = { squashed: false }): React.ComponentClass<any> {
  const { squashed } = options;
  class WrappedComponent extends React.PureComponent<Props> {
    static displayName = `withFooter(${getDisplayName(BaseComponent)})`;

    constructor(props: Props) {
      super(props);
      const { setFooterState } = this.props;
      setFooterState({ squashed });
    }

    render() {
      return <BaseComponent {...omit(this.props, ['setFooterState'])} />;
    }
  }
  // Hoist non-React static methods to the wrapper component
  hoistNonReactStatics(WrappedComponent, BaseComponent);
  return useFooter(WrappedComponent);
}

export default withFooter;
