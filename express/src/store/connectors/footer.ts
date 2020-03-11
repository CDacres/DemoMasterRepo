import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

// Modules
import { setFooterState } from '@src/store/modules/config';

// Types
import { FooterOptions } from '@src/typings/types';

type DispatchProps = {
  setFooterState: (options: FooterOptions) => void;
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>): DispatchProps => bindActionCreators({
  setFooterState,
}, dispatch);

export default function use(Component: React.ComponentType) {
  return connect<{}, DispatchProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Component) as any;
}
