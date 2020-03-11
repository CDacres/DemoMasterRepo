import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
import { getOrderDetails } from '@src/store/selectors';

// Modules
import { viewing, backToViewing } from '@src/store/modules/order';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  order: Store.Tag;
};

type DispatchProps = {
  viewing: (e?: any) => void;
};

const mapStateToProps = (state: Store.State) => ({
  order: getOrderDetails(state),
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  viewing,
  backToViewing,
}, dispatch);

export default function use(Component: React.ComponentType) {
  return connect<StateProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Component) as any;
}
