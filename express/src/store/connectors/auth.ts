import { connect } from 'react-redux';

// Selectors
import { getAuth } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  auth: Store.Auth;
};

const mapStateToProps = (state: Store.State): StateProps => ({
  auth: getAuth(state),
});

export default connect(
  mapStateToProps
);
