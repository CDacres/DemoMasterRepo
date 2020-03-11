
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../../../../actions';

const Favourites = () => {
    return (

    );
};

Favourites.propTypes = {

};

const mapStateToProps = ({ activeVerticalIndex }) => ({
    activeVerticalIndex
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

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);
