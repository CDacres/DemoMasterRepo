
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';
import Collapse from 'react-collapse';
import shortid from 'shortid';

import Filter from '../Filter';

import actions from '../../../../actions';

import styles from './styles.js';

class FilterGroupLarge extends Component {
    constructor(props) {
        super(props);
        const { filterGroup } = props;
        this.state = {
            filterGroup,
            originalFilterGroup: filterGroup
        };
        this.handleApplyFilter = this.handleApplyFilter.bind(this);
        this.handleClearFilters = this.handleClearFilters.bind(this);
        this.handleFilterChange = this.handleFilterChange.bind(this);
        this.handleSetActiveGroup = this.handleSetActiveGroup.bind(this);
    }

    componentWillUnmount() {
        // TODO: Fire new search query
    }

    handleApplyFilter() {
        const { applyFilterGroup, filterGroupIndex } = this.props;
        applyFilterGroup(this.state.filterGroup, filterGroupIndex);
    }

    handleClearFilters() {
        this.setState((prevState) => ({
            filterGroup: prevState.originalFilterGroup
        }));
    }

    handleFilterChange(event) {
        const { filterGroup } = this.state;
        const { applyFilterGroup, filterGroupIndex } = this.props;
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
        const updatedFilterGroup = {
            ...filterGroup,
            filters
        };
        applyFilterGroup(updatedFilterGroup, filterGroupIndex);
    }

    handleSetActiveGroup(e) {
        const { activeFilterGroupIndex, setActiveFilterGroup } = this.props;
        if (Number(activeFilterGroupIndex) === Number(e.target.dataset.filterGroupIndex)) {
            setActiveFilterGroup(-1);
        } else {
            setActiveFilterGroup(e.target.dataset.filterGroupIndex);
        }
    }

    render() {
        const { handleFilterChange, handleSetActiveGroup } = this;
        const { activeFilterGroupIndex, filterGroupIndex } = this.props;
        const { filterGroup } = this.state;
        const { filters, title } = filterGroup;
        return (
            <div className={css(styles.container, styles.baseline)}>
                <div>
                    <div className={css(styles.containerFallback)}>
                        <div className={css(styles.beforeFallback)}>
                            <span
                                className={css(
                                    styles.text,
                                    styles.size_regular,
                                    styles.weight_light
                                )}
                            >
                                <span>{title}</span>
                            </span>
                        </div>
                        {
                            (filterGroupIndex > 1) ?
                                <div className={css(styles.afterFallback)}>
                                    <span className={css(styles.textInline)}>
                                        <button
                                            type="button"
                                            className={css(styles.component_button)}
                                            aria-disabled="false"
                                            data-filter-group-index={filterGroupIndex}
                                            onClick={handleSetActiveGroup}
                                        >
                                            <div className={css(styles.containerInline)}>
                                                <div className={css(styles.containerInline)}>
                                                    <span
                                                        style={{
                                                            pointerEvents: 'none'
                                                        }}
                                                    >{
                                                        // TODO: Translate text
                                                        Number(activeFilterGroupIndex) ===
                                                        Number(filterGroupIndex) ?
                                                            `Close ${title}` :
                                                            'See all'
                                                    }</span>
                                                </div>
                                                <div className={css(styles.containerInline)}>
                                                    <div style={{ marginLeft: '8px' }}>
                                                        <div
                                                            className={css(styles.iconWrapper)}
                                                            style={
                                                                Number(activeFilterGroupIndex) ===
                                                                Number(filterGroupIndex) ?
                                                                { transform: 'rotate(180deg)' } :
                                                                { transform: 'rotate(0deg)' }
                                                            }
                                                        >
                                                            <svg
                                                                viewBox="0 0 18 18"
                                                                role="presentation"
                                                                aria-hidden="true"
                                                                focusable="false"
                                                                style={{
                                                                    display: 'block',
                                                                    fill: 'currentcolor',
                                                                    height: '10px',
                                                                    width: '10px'
                                                                }}
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </button>
                                    </span>
                                </div> : null
                        }
                    </div>
                </div>
                <div
                    className={
                        Number(activeFilterGroupIndex) === Number(filterGroupIndex) ||
                        filterGroupIndex <= 1 ?
                            css(styles.collapsedTitleContainer) : ''
                    }
                >

                    {
                        filterGroupIndex > 1 ?
                            <Collapse
                                isOpened={
                                    Number(activeFilterGroupIndex) === Number(filterGroupIndex)
                                }
                                style={{ width: '100%' }}
                            >
                                {filters.map((filter, index) => (
                                    <Filter
                                        key={shortid.generate()}
                                        filter={filter}
                                        filterIndex={index}
                                        filterGroupIndex={filterGroupIndex}
                                        handleFilterChange={handleFilterChange}
                                    />
                                ))}
                            </Collapse> :
                            filters.map((filter, index) => (
                                <Filter
                                    key={shortid.generate()}
                                    filter={filter}
                                    filterIndex={index}
                                    filterGroupIndex={filterGroupIndex}
                                    handleFilterChange={handleFilterChange}
                                />
                            ))
                    }
                </div>
            </div>
        );
    }
}

FilterGroupLarge.propTypes = {
    activeFilterGroupIndex: PropTypes.number.isRequired,
    applyFilterGroup: PropTypes.func.isRequired,
    filterGroup: PropTypes.object.isRequired,
    filterGroupIndex: PropTypes.number.isRequired,
    setActiveFilterGroup: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    activeFilterGroupIndex: state.activeFilterGroupIndex
});

const mapDispatchToProps = dispatch => {
    return {
        applyFilterGroup: (filterGroup, filterGroupIndex) =>
            dispatch(actions.applyFilterGroup(filterGroup, filterGroupIndex)),
        setActiveFilterGroup: filterGroupIndex => dispatch(actions.setActiveFilterGroup(filterGroupIndex))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterGroupLarge);
