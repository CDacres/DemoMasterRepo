import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Selectors
// import { getOrderDetails } from '../../selectors';

// Modules
import { orderMsg } from '@src/store/modules/order';

// Types
// import { Store } from '@src/typings/types';

type DispatchProps = {
  orderMsg: (e?: any) => void;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  orderMsg,
}, dispatch);

export default function use(Component: React.ComponentType) {
  return connect<{}, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Component) as any;
}
