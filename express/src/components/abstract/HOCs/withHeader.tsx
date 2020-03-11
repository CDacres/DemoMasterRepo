/* tslint:disable:max-line-length */
import * as React from 'react';
import { getDisplayName } from 'recompose';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { omit } from 'lodash';

// Connectors
import { useHeader } from '@src/store/connectors';

// Types
import { HeaderOptions } from '@src/typings/types';

type Props = {
  setHeaderState: (options: HeaderOptions) => void;
};

function withHeader(BaseComponent: React.ComponentType, options: HeaderOptions = { floating: false, smallLogo: false, stayAsLink: false, transparent: false, withCheckoutSteps: false, withSearchBar: false }): React.ComponentClass {
  const { floating, smallLogo, stayAsLink, transparent, withCheckoutSteps, withSearchBar } = options;
  class WrappedComponent extends React.PureComponent<Props> {
    static displayName = `withHeader(${getDisplayName(BaseComponent)})`;

    constructor(props: Props) {
      super(props);
      const { setHeaderState } = this.props;
      setHeaderState({ floating, smallLogo, stayAsLink, transparent, withCheckoutSteps, withSearchBar });
    }

    render() {
      return <BaseComponent {...omit(this.props, ['setHeaderState'])} />;
    }
  }
  // Hoist non-React static methods to the wrapper component
  hoistNonReactStatics(WrappedComponent, BaseComponent);
  return useHeader(WrappedComponent);
}

export default withHeader;
