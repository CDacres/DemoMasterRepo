import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getAuthUser } from '@src/store/selectors';

// Modules
import { fetchUserAccountSuccess } from '@src/store/modules/auth/user';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  user: Store.User;
};

type DispatchProps = {
  fetchUserAccountSuccess: (e?: any) => void;
};

const mapStateToProps = (state: Store.State) => ({
  user: getAuthUser(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  fetchUserAccountSuccess,
}, dispatch);

export default function use(Component: React.ComponentType) {
  return connect<StateProps, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Component) as any;
}
