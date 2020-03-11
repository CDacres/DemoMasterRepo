
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import FilterPanelSmall from './FilterPanelSmall';

import { getActiveFilters } from '../methods';

import actions from '../../../../actions';

import {
    display
} from '../../../commonStyles.js';
import styles from './styles.js';

class FilterGroupSmall extends Component {
    constructor() {
        super();
        this.state = {
            hover: false
        };
        this.handleActiveFilterGroup = this.handleActiveFilterGroup.bind(this);
        this.isHovering = this.isHovering.bind(this);
        this.isNotHovering = this.isNotHovering.bind(this);
    }

    handleActiveFilterGroup() {
        const { activeFilterGroupIndex, filterGroupIndex, setActiveFilterGroup } = this.props;
        if (Number(activeFilterGroupIndex) === Number(filterGroupIndex)) {
            setActiveFilterGroup(-1);
        } else {
            setActiveFilterGroup(filterGroupIndex);
        }
    }

    isHovering() {
        this.setState({ hover: true });
    }

    isNotHovering() {
        this.setState({ hover: false });
    }

    render() {
        const { handleActiveFilterGroup, isHovering, isNotHovering } = this;
        const { hover } = this.state;
        const {
            activeFilterGroupIndex,
            applyFilterGroup,
            filterGroup,
            filterGroupIndex
        } = this.props;
        const { title } = filterGroup;
        return (
            <span>
                <div className={css(display.inlineBlock)}>
                    <div className={css(styles.filterGroup)}>
                        <button
                            role="menuitem"
                            aria-haspopup="true"
                            className={css(
                                styles.menuItem,
                                Number(activeFilterGroupIndex) === Number(filterGroupIndex) &&
                                styles.menuItemActive,
                                hover && styles.menuItemActive
                            )}
                            onMouseEnter={isHovering}
                            onMouseLeave={isNotHovering}
                            onClick={handleActiveFilterGroup}
                        >
                            <div className={css(styles.label)}>
                                <span>{title}</span>
                                {
                                    getActiveFilters(filterGroup) > 0 ?
                                    <div
                                        className={css(display.inlineBlock)}
                                        style={{ marginLeft: '4px' }}
                                    >
                                        <div
                                            className={css(styles.badgeContainer)}
                                            aria-label={
                                                // TODO: translation
                                                getActiveFilters(filterGroup) > 1 ?
                                                    `${getActiveFilters(
                                                        filterGroup
                                                    )} filters applied` :
                                                    `${getActiveFilters(
                                                        filterGroup
                                                    )} filter applied`
                                            }
                                        >{getActiveFilters(filterGroup)}</div>
                                    </div> : null
                                }
                            </div>
                            <span className={css(styles.chevron)}>
                                <div
                                    className={css(
                                        Number(activeFilterGroupIndex) === Number(filterGroupIndex) ?
                                        styles.iconWrapperOpen : styles.iconWrapper
                                    )}
                                >
                                    <svg
                                        className={css(styles.chevronSvg)}
                                        viewBox="0 0 18 18"
                                        role="presentation"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                                        />
                                    </svg>
                                </div>
                            </span>
                        </button>
                        <div>
                            {Number(activeFilterGroupIndex) === Number(filterGroupIndex) ?
                                <FilterPanelSmall
                                    applyFilterGroup={applyFilterGroup}
                                    disableOnClickOutside={
                                        Number(activeFilterGroupIndex) !== Number(filterGroupIndex)
                                    }
                                    filterGroup={filterGroup}
                                    filterGroupIndex={filterGroupIndex}
                                    handleActiveFilterGroup={handleActiveFilterGroup}
                                /> : null
                            }
                        </div>
                    </div>
                </div>
            </span>
        );
    }
}

FilterGroupSmall.propTypes = {
    activeFilterGroupIndex: PropTypes.number.isRequired,
    applyFilterGroup: PropTypes.func.isRequired,
    filterGroup: PropTypes.object.isRequired,
    filterGroupIndex: PropTypes.number.isRequired,
    setActiveFilterGroup: PropTypes.func.isRequired
};

const mapStateToProps = ({
    activeFilterGroupIndex,
    filterGroups
}) => ({
    activeFilterGroupIndex,
    filterGroups
});

const mapDispatchToProps = dispatch => ({
    applyFilterGroup: (filterGroup, filterGroupIndex) =>
            dispatch(actions.applyFilterGroup(filterGroup, filterGroupIndex)),
    setActiveFilterGroup: filterGroupIndex =>
        dispatch(actions.setActiveFilterGroup(filterGroupIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterGroupSmall);
