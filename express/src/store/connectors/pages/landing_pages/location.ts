import { connect } from 'react-redux';

// Selectors
import { getLanding } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StoreState = {
  landing: Store.Pages.Landing;
};

const mapStateToProps = (state: StoreState) => ({
  landing: getLanding(state),
});

export default connect(
  mapStateToProps
);
