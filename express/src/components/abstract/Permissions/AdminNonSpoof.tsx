import * as React from 'react';

// Connectors
import { useAuth } from '@src/store/connectors';

// Components
import LoggedIn from '@src/components/abstract/Permissions/LoggedIn';

// Types
import { Store } from '@src/typings/types';

type Props = {
  auth: Store.Auth;
  children: JSX.Element | JSX.Element[];
};

class AdminNonSpoof extends React.Component<Props> {
  render() {
    const { auth: { user }, children } = this.props;
    return (
      <LoggedIn>
        {(user.isAdmin && !user.isSpoofMode) &&
          <React.Fragment>
            {children}
          </React.Fragment>
        }
      </LoggedIn>
    );
  }
}

export default useAuth(AdminNonSpoof);
