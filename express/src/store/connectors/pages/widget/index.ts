import { connect } from 'react-redux';

// Selectors
import { getWidget } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StoreState = {
  widget: Store.Pages.Widget;
};

const mapStateToProps = (state: StoreState) => ({
  widget: getWidget(state),
});

export default function use(Component: React.ComponentType) {
  return connect(
    mapStateToProps
  )(Component);
}
