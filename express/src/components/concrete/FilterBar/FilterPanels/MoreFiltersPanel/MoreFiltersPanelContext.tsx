import * as React from 'react';
import some from 'lodash/some';

// Utils
import { createActionCreator } from '@src/store/utils';

// Types
import { Action, ExpandedGroups } from '@src/typings/types';

// Constants
const HANDLE_EXPAND = 'MORE_FILTERS/HANDLE_EXPAND';
const HANDLE_EXPANDED = 'MORE_FILTERS/HANDLE_EXPANDED';

// Reducer
const reducer = (state: State, action: Action) => {
  const { index, classId = 0 } = action;
  if (action.type === HANDLE_EXPAND) {
    if (some(state.expandedGroups, ['index', index])) {
      return {
        ...state,
        expandedGroups: state.expandedGroups.filter(g => g.index !== index),
      };
    }
    return {
      ...state,
      expandedGroups: [
        ...state.expandedGroups,
        {
          index: index,
          classId,
        },
      ],
    };
  } else if (action.type === HANDLE_EXPANDED) {
    return {
      ...state,
      expandedGroups: state.expandedGroups.map(group => {
        if (group.index !== index) {
          return group;
        }
        return {
          ...group,
          classId,
        };
      }),
    };
  }
};

// Actions
export const handleExpand = createActionCreator(HANDLE_EXPAND, 'index', 'classId');
export const handleExpanded = createActionCreator(HANDLE_EXPANDED, 'index', 'classId');

export interface ContextValue {
  expandedGroups: ExpandedGroups;
  handleExpand: (index: number, classId?: number) => void;
  handleExpanded: (index: number, classId: number) => void;
}

type Props = {
  children: JSX.Element | JSX.Element[];
};

type State = {
  expandedGroups: ExpandedGroups;
};

const defaultState: State = { expandedGroups: [] };

const MoreFiltersPanelContext = React.createContext(defaultState);

export const MoreFiltersPanelConsumer = MoreFiltersPanelContext.Consumer;

class MoreFiltersPanelProvider extends React.PureComponent<Props, State> {
  state: State = defaultState;

  dispatch = action => {
    this.setState(state => reducer(state, action));
  }

  handleExpand = (index: number, classId?: number) => {
    this.dispatch(handleExpand(index, classId));
  }

  handleExpanded = (index: number, classId: number) => {
    this.dispatch(handleExpanded(index, classId));
  }

  render() {
    const { children } = this.props;
    const value: ContextValue = {
      ...this.state,
      handleExpand: this.handleExpand,
      handleExpanded: this.handleExpanded,
    };
    return (
      <MoreFiltersPanelContext.Provider value={value}>
        {children}
      </MoreFiltersPanelContext.Provider>
    );
  }
}

export default MoreFiltersPanelProvider;
