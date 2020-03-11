
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { css } from 'aphrodite';

import FilterPanelText from './FilterPanelText';

import actions from '../../../../actions';

import suggestions from './data.js';

import {
    display,
    position
} from '../../../commonStyles.js';
import styles from './styles.js';

class FilterGroupAutocomplete extends Component {
    constructor() {
        super();
        this.state = {
            hideResults: true,
            hover: false,
            inputFocus: false,
            results: []
        };
        this.handleActiveFilterGroup = this.handleActiveFilterGroup.bind(this);
        this.isHovering = this.isHovering.bind(this);
        this.isNotHovering = this.isNotHovering.bind(this);
    }

    handleActiveFilterGroup() {
        const {
            activeFilterGroupIndex,
            filterGroupIndex,
            setActiveFilterGroup
        } = this.props;
        if (Number(activeFilterGroupIndex) === Number(filterGroupIndex)) {
            setActiveFilterGroup(-1);
        } else {
            setActiveFilterGroup(filterGroupIndex);
        }
    }

    handleAutocomplete(e) {
        const value = e.target.value;
        const matches = suggestions.getIndexes(value);
        if (matches.length) {
            console.log(matches);
            // results.empty();
            // matches.each(function(el) {
            //     new Element("div.option[html=" + brands[el] + "]").inject(results);
            // });
            // results.removeClass("hide");
        }
        else {
            // results.empty().addClass("hide");
        }
    }

    isHovering() {
        this.setState({ hover: true });
    }

    isNotHovering() {
        this.setState({ hover: false });
    }

    render() {
        const {
            handleActiveFilterGroup,
            handleAutocomplete,
            isHovering,
            isNotHovering
        } = this;
        const { hover, results } = this.state;
        const {
            activeFilterGroupIndex,
            filterGroup,
            filterGroupIndex
        } = this.props;
        const { title } = filterGroup;
        return (
            <span>
                <div className={css(display.inlineBlock)}>
                    <div className={css(styles.filterGroup)}>
                        <div className={css(position.relative)}>
                            <input
                                className={
                                    css(
                                        styles.menuItem,
                                        Number(
                                            activeFilterGroupIndex
                                        ) === Number(filterGroupIndex) &&
                                        styles.menuItemActive,
                                        hover && styles.menuItemActive
                                    )
                                }
                                onChange={handleAutocomplete}
                                onMouseEnter={isHovering}
                                onMouseLeave={isNotHovering}
                                placeholder={title}
                            />
                            <span className={css(styles.chevron)}>
                                <div
                                    className={
                                        css(
                                            Number(
                                                activeFilterGroupIndex
                                            ) === Number(filterGroupIndex) ?
                                            styles.iconWrapperOpen : styles.iconWrapper
                                        )
                                    }
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
                        </div>
                        <div>
                            {
                                Number(activeFilterGroupIndex) === Number(filterGroupIndex) ?
                                    <FilterPanelText
                                        filterGroupIndex={filterGroupIndex}
                                        handleActiveFilterGroup={handleActiveFilterGroup}
                                        results={results}
                                    /> : null
                            }
                        </div>
                    </div>
                </div>
            </span>
        );
    }
};

FilterGroupAutocomplete.propTypes = {
    activeFilterGroupIndex: PropTypes.number.isRequired,
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
    setActiveFilterGroup: filterGroupIndex =>
        dispatch(actions.setActiveFilterGroup(filterGroupIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterGroupAutocomplete);
