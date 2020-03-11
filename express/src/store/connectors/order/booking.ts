import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Modules
import { booking } from '@src/store/modules/order';

// Types
// import { Store } from '@src/typings/types';

type DispatchProps = {
  booking: (e?: any) => void;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps =>
  bindActionCreators({
    booking,
  }, dispatch);

export default function use(Component: React.ComponentType) {
  return connect<{}, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Component) as any;
}
