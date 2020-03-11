import * as React from 'react';

// Connectors
import { useAuth } from '@src/store/connectors';

// Types
import { Store } from '@src/typings/types';

type Props = {
  auth: Store.Auth;
  children: JSX.Element | JSX.Element[];
};

class SpoofOrNonAdmin extends React.Component<Props> {
  render() {
    const { auth: { user }, children } = this.props;
    return (
      <React.Fragment>
        {(!user.isAdmin || user.isSpoofMode) &&
          <React.Fragment>
            {children}
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}

export default useAuth(SpoofOrNonAdmin);
