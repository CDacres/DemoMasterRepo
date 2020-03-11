// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getNavigation } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  navigation: Store.Navigation;
};

const mapStateToProps = (state: Store.State) => ({
  navigation: getNavigation(state),
});

export default function use(Component: React.ComponentType) {
  return connect<StateProps>(
    mapStateToProps
  )(Component) as any;
}
