import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getConfig } from '@src/store/selectors';

// Modules
import { navigate } from '@src/store/modules/config';

// Types
import { Store, Route } from '@src/typings/types';

type StateProps = {
  config: Store.Config;
};

type DispatchProps = {
  navigate: (route: Route) => void;
};

export type Props = StateProps & DispatchProps;

const mapStateToProps = (state: Store.State) => ({
  config: getConfig(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  navigate,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
