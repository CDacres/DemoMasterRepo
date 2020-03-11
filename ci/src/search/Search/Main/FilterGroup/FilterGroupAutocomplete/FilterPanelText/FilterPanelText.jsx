
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import shortid from 'shortid';

import OnClickOutside from '../../../../../../UI/HOCs/OnClickOutside';

import actions from '../../../../../actions';

import styles from './styles.js';

class FilterPanelText extends Component {
    constructor() {
        super();
        this.handleCancelFilter = this.handleCancelFilter.bind(this);
        this.handleSelectEventType = this.handleSelectEventType.bind(this);
    }

    componentWillUnmount() {
        const { isCancelled } = this.state;
        const { applyFilterGroup, filterGroupIndex } = this.props;
        if (!isCancelled) {
            // Apply filters to store
            applyFilterGroup(this.state.filterGroup, filterGroupIndex);
            // TODO: Fire new search query
        }
    }

    handleSelectEventType() {
        const { handleActiveFilterGroup } = this.props;
        handleActiveFilterGroup();
    }

    handleCancelFilter() {
        const { handleActiveFilterGroup } = this.props;
        this.setState({ isCancelled: true }, handleActiveFilterGroup);
    }

    render() {
        const {
            handleCancelFilter
        } = this;
        const { results } = this.props;
        return (
            <OnClickOutside
                outsideClickAction={handleCancelFilter}
            >
                <div className={css(styles.panelSmall)}>
                    <div className={css(styles.panelContentContainer)}>
                        {results.map(result => (
                            <span
                                key={shortid.generate()}
                            >{result.title}</span>
                        ))}
                    </div>
                </div>
            </OnClickOutside>
        );
    }
}

FilterPanelText.propTypes = {
    applyFilterGroup: PropTypes.func.isRequired,
    filterGroup: PropTypes.object.isRequired,
    filterGroupIndex: PropTypes.number.isRequired,
    handleActiveFilterGroup: PropTypes.func.isRequired,
    results: PropTypes.array.isRequired
};

const mapStateToProps = (state) => (state);

const mapDispatchToProps = dispatch => {
    return {
        applyFilterGroup: (filterGroup, filterGroupIndex) =>
            dispatch(actions.applyFilterGroup(filterGroup, filterGroupIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanelText);
