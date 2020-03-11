import * as React from 'react';

// Connectors
import { useAuth, useConfig } from '@src/store/connectors';

// Components
import LoadingAnimation from '@src/components/concrete/LoadingAnimation';

// Types
import { Store } from '@src/typings/types';

type Props = {
  auth: Store.Auth;
  config: Store.Config;
};

class Component extends React.Component<Props, {}> {

  componentDidMount() {
    const { auth: { user: { isLoggedIn } }, config: { domain } } = this.props;
    if (!isLoggedIn) {
      window.location.assign(`/${domain}/users/signin`);
    }
  }

  render() {
    const { auth: { user: { isLoggedIn } }, children } = this.props;
    if (isLoggedIn) {
      return (
        <React.Fragment>
          {children}
        </React.Fragment>
      );
    } else {
      return <LoadingAnimation spacing={'dotsWrapperLarge'} />;
    }
  }
}

export const RequiresLogIn = useConfig(useAuth(Component));
