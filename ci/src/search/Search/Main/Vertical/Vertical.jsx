
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import shortid from 'shortid';
import MediaQuery from 'react-responsive';
import { CSSTransitionGroup } from 'react-transition-group';

import FilterBar from '../FilterBar';
import SearchContent from '../SearchContent';
import MapSection from '../MapSection';
import FullScreenPanel from '../FullScreenPanel';
import FilterGroupLarge from '../FilterGroup/FilterGroupLarge';

import styles from '../styles.js';

import actions from '../../../actions';
import { getActiveFilterCount } from '../../../selectors';

const Vertical = ({
    activeVerticalIndex,
    clearAllFilters,
    domContentLoading,
    fullScreenPanel,
    getActiveFilters,
    mapState,
    toggleFullScreenPanel,
    toggleMapPanel,
    user,
    verticals
}) => {
    const filterGroups = verticals[activeVerticalIndex].filterGroups;
    return (
        <main className={css(styles.main)}>
            <div className={css(styles.mapSearch)}>
                <FilterBar
                    filterGroups={filterGroups}
                    getActiveFilters={getActiveFilters}
                    toggleFullScreenPanel={toggleFullScreenPanel}
                    toggleMapPanel={toggleMapPanel}
                />
                <div className={css(styles.mainContentWrapper)}>
                    <SearchContent
                        domContentLoading={domContentLoading}
                        user={user}
                    />
                </div>
                <MediaQuery query="(max-width: 743px)">
                    {
                        mapState.mapPanelVisible ?
                            <MapSection /> : null
                    }
                </MediaQuery>
                <MediaQuery query="(min-width: 744px)">
                    <MapSection />
                </MediaQuery>
                {
                    fullScreenPanel.isVisible ?
                        <CSSTransitionGroup
                            transitionName={{
                                enter: css(styles.panelEnter),
                                enterActive: css(styles.panelEnterActive),
                                leave: css(styles.panelLeave),
                                leaveActive: css(styles.panelLeaveActive)
                            }}
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={300}
                        >
                            <FullScreenPanel
                                handleClose={toggleFullScreenPanel}
                                headerText={`Active Filters (${getActiveFilters})`}
                                header={{
                                    action: clearAllFilters,
                                    actionText: 'Clear All'
                                }}
                                footer={{
                                    withButton: true
                                }}
                            >
                                {filterGroups.map((filterGroup, index) => {
                                    return (
                                        <FilterGroupLarge
                                            key={shortid.generate()}
                                            filterGroup={filterGroup}
                                            filterGroupIndex={index}
                                        />
                                    );
                                })}
                            </FullScreenPanel>
                        </CSSTransitionGroup> : null
                }
            </div>
        </main>
    );
};

Vertical.propTypes = {
    activeVerticalIndex: PropTypes.number.isRequired,
    clearAllFilters: PropTypes.func.isRequired,
    domContentLoading: PropTypes.bool.isRequired,
    fullScreenPanel: PropTypes.object.isRequired,
    getActiveFilters: PropTypes.number.isRequired,
    mapState: PropTypes.object.isRequired,
    toggleFullScreenPanel: PropTypes.func.isRequired,
    toggleMapPanel: PropTypes.func.isRequired,
    user: PropTypes.object,
    verticals: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    activeVerticalIndex: state.activeVerticalIndex,
    domContentLoading: state.domContentLoading,
    fullScreenPanel: state.fullScreenPanel,
    getActiveFilters: getActiveFilterCount(state),
    mapState: state.mapState,
    user: state.user,
    verticals: state.verticals
});

const mapDispatchToProps = dispatch => {
    return {
        clearAllFilters: () => {
            dispatch(actions.clearAllFilters());
        },
        toggleFullScreenPanel: () => {
            dispatch(actions.toggleFullScreenPanel());
        },
        toggleMapPanel: () => {
            dispatch(actions.toggleMapPanel());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vertical);
