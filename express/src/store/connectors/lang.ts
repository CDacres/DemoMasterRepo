import { connect } from 'react-redux';

// Selectors
import { getLang } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  lang: Store.Lang;
};

const mapStateToProps = (state: Store.State) => ({
  lang: getLang(state),
});

export default connect<StateProps>(
  mapStateToProps
);
