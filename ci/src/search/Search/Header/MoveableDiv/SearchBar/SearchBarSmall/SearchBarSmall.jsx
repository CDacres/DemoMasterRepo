
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import Icon from '../../../../components/Icon';
import SearchBarPanel from './SearchBarPanel';

import {
    input
} from '../../../../commonStyles.js';
import styles from './styles.js';

import actions from '../../../../../actions';

class SearchBarSmall extends Component {
    constructor() {
        super();
        this.state = {
            searchBarPanelOpen: false
        };
        this.closeSearchBarPanel = this.closeSearchBarPanel.bind(this);
        this.toggleSearchBarPanel = this.toggleSearchBarPanel.bind(this);
    }

    closeSearchBarPanel() {
        this.setState({ searchBarPanelOpen: false });
    }

    toggleSearchBarPanel() {
        this.setState({ searchBarPanelOpen: !this.state.searchBarPanelOpen });
    }

    render() {
        const { closeSearchBarPanel, toggleSearchBarPanel } = this;
        const { searchBarPanelOpen } = this.state;
        const { guests } = this.props;
        return (
            <div className={css(styles.container)}>
                <div className={css(styles.container_fullWidth)}>
                    <button
                        type="button"
                        className={css(styles.button)}
                        onClick={toggleSearchBarPanel}
                    >
                        <span className={css(styles.icon)}>
                            <Icon
                                type="search"
                            />
                        </span>
                        <span className={css(styles.copy)}>What · Where · When · 1 guest</span>
                    </button>
                    <div className={css(input.focusUnderline)} />
                </div>
                {
                    searchBarPanelOpen ?
                        <SearchBarPanel
                            closePanel={closeSearchBarPanel}
                        /> : null
                }
            </div>
        );
    }
}

SearchBarSmall.propTypes = {
    guests: PropTypes.number.isRequired,
    selectGuests: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    guests: state.searchParams.guests
});

const mapDispatchToProps = dispatch => {
    return {
        selectGuests: value => {
            dispatch(actions.selectGuests(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarSmall);
