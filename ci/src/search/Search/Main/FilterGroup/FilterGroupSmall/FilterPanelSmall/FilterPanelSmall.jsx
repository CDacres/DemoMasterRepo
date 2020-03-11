
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';
import onClickOutside from 'react-onclickoutside';

import Filter from '../../Filter';

import styles from './styles.js';

class FilterPanelSmall extends Component {
    constructor(props) {
        super(props);
        const { filterGroup } = props;
        this.state = {
            filterGroup,
            isCancelled: false,
            originalFilterGroup: filterGroup
        };
        this.applyFilterGroup = this.applyFilterGroup.bind(this);
        this.handleApplyFilters = this.handleApplyFilters.bind(this);
        this.handleCancelFilters = this.handleCancelFilters.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
    }

    componentWillUnmount() {
        const { applyFilterGroup } = this;
        applyFilterGroup();
    }

    applyFilterGroup() {
        const { isCancelled } = this.state;
        const { applyFilterGroup, filterGroupIndex } = this.props;
        if (!isCancelled) {
            // Apply filters to store
            applyFilterGroup(this.state.filterGroup, filterGroupIndex);
            // TODO: Fire new search query
        }
    }

    handleApplyFilters() {
        const { handleActiveFilterGroup } = this.props;
        handleActiveFilterGroup();
    }

    handleCancelFilters() {
        const { handleActiveFilterGroup } = this.props;
        this.setState(() => ({
            isCancelled: true
        }), handleActiveFilterGroup);
    }

    handleClickOutside() {
        const { handleApplyFilters } = this;
        handleApplyFilters();
    }

    handleFilterChange(event) {
        const { filterGroup } = this.state;
        const filterIndex = event.target.dataset.filterIndex;
        const inputType = event.target.dataset.inputType;
        let value;
        if (inputType === 'checkbox') {
            value = event.target.checked;
        } else if (inputType === 'radio') {
            value = event.target.checked;
        } else if (inputType === 'increment') {
            value = Number(event.target.dataset.value);
        }
        const updatedFilter = {
            ...filterGroup.filters[filterIndex],
            data: {
                ...filterGroup.filters[filterIndex].data,
                value
            }
        };
        const filters = filterGroup.filters.map((filter, index) => {
            if (Number(index) !== Number(filterIndex)) {
                return filter;
            }
            return {
                ...filter,
                ...updatedFilter
            };
        });
        this.setState((prevState) => ({
            ...prevState,
            filterGroup: {
                ...filterGroup,
                filters
            }
        }));
    }

    render() {
        const {
            handleApplyFilters,
            handleCancelFilters,
            handleFilterChange
        } = this;
        const { filterGroup } = this.state;
        const { filterGroupIndex } = this.props;
        const { filters } = filterGroup;
        return (

                <div className={css(styles.panelSmall)}>
                    <div className={css(styles.panelContentContainer)}>
                        {filters.map((filter, index) => (
                            <Filter
                                key={shortid.generate()}
                                filter={filter}
                                filterIndex={index}
                                filterGroupIndex={filterGroupIndex}
                                handleFilterChange={handleFilterChange}
                            />
                        ))}
                    </div>
                    <div className={css(styles.panelActionsContainer)}>
                        <a
                            className={css(styles.panelActionLink)}
                            onClick={handleCancelFilters}
                        >Cancel</a>
                        <span className={css(styles.pullRight)}>
                            <a
                                className={css(styles.panelActionLink)}
                                onClick={handleApplyFilters}
                            >Apply</a>
                        </span>
                    </div>
                </div>

        );
    }
}

FilterPanelSmall.propTypes = {
    applyFilterGroup: PropTypes.func.isRequired,
    filterGroup: PropTypes.object.isRequired,
    filterGroupIndex: PropTypes.number.isRequired,
    handleActiveFilterGroup: PropTypes.func.isRequired
};

export default onClickOutside(FilterPanelSmall);
