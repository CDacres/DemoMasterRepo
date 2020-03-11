import { connect } from 'react-redux';

// Selectors
import { getBrowse } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StoreState = {
  browse: Store.Pages.Browse;
};

const mapStateToProps = (state: StoreState) => ({
  browse: getBrowse(state),
});

export default connect(
  mapStateToProps
);
