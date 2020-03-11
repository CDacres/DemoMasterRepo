
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Recommendations from './Recommendations';
import Vertical from './Vertical';

import actions from '../../actions';

const Main = ({ activeVerticalIndex, domContentLoaded, verticals }) => {
    // TODO: Remove this and fire domContentLoaded when API returns data
    setTimeout(domContentLoaded, 1500);
    switch (verticals[activeVerticalIndex].layoutType) {
    case 2:
        return <Recommendations />;
    default:
        return <Vertical />;
    }
};

Main.propTypes = {
    activeVerticalIndex: PropTypes.number.isRequired,
    domContentLoaded: PropTypes.func.isRequired,
    verticals: PropTypes.array.isRequired
};

const mapStateToProps = ({ activeVerticalIndex, verticals }) => ({
    activeVerticalIndex,
    verticals
});

const mapDispatchToProps = dispatch => {
    return {
        domContentLoaded: () => {
            dispatch(actions.domContentLoaded());
        },
        toggleFullScreenPanel: () => {
            dispatch(actions.toggleFullScreenPanel());
        },
        toggleMapPanel: () => {
            dispatch(actions.toggleMapPanel());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
