import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Modules
import { setHeaderState } from '@src/store/modules/config';

// Types
import { HeaderOptions } from '@src/typings/types';

type DispatchProps = {
  setHeaderState: (options: HeaderOptions) => void;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  setHeaderState,
}, dispatch);

export default function use(Component: React.ComponentType) {
  return connect<{}, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Component) as any;
}
