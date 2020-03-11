import { connect } from 'react-redux';

// Selectors
import { getIsMobile } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  isMobile: boolean;
};

const mapStateToProps = (state: Store.State) => ({
  isMobile: getIsMobile(state),
});

export default connect<StateProps>(
  mapStateToProps
);
