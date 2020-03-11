import { connect } from 'react-redux';

// Selectors
import { getRoom } from '@src/store/selectors';

// Types
import { Store } from '@src/typings/types';

type StateProps = {
  room: Store.Room;
};

const mapStateToProps = (state: Store.Room) => ({
  room: getRoom(state),
});

export default function use(Component: React.ComponentType) {
  return connect<StateProps>(
    mapStateToProps
  )(Component) as any;
}
