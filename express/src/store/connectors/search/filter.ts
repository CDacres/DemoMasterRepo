import { connect } from 'react-redux';

// Types
import { Store } from '@src/typings/types';

export type StateProps = {
  buttonText: string;
  isActive: boolean;
};

const mapStateToProps = (state: Store.State, { filterStateSelector }) => filterStateSelector(state);

export default function use(Component: React.ComponentType) {
  return connect<StateProps>(mapStateToProps)(Component) as any;
}
