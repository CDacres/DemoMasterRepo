
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import shortid from 'shortid';
import MediaQuery from 'react-responsive';

import FilterGroup from '../FilterGroup';

import {
    display
} from '../../commonStyles.js';
import styles from './styles.js';

const FilterBar = ({
    filterGroups,
    getActiveFilters,
    toggleFullScreenPanel,
    toggleMapPanel
}) => {
    return (
        <div>
            <MediaQuery query="(min-width: 1127px)">
                <div className={css(styles.filterBarWrapper)}>
                    <div className={css(styles.container)}>
                        <div role="menubar" className={css(styles.filterBar)}>
                            {filterGroups.map((filterGroup, index) => (
                                <FilterGroup
                                    key={shortid.generate()}
                                    filterGroupIndex={index}
                                    filterGroup={filterGroup}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={css(styles.filterBarWrapperRelative)}></div>
            </MediaQuery>
            <div
                className={css(styles.outContainer)}
                aria-hidden="false"
                data-id="FloatingFilterButtonWrapper"
            >
                <div className={css(styles.container_withMdSplitMap)}>
                    <MediaQuery query="(min-width: 744px)">
                        <button
                            type="button"
                            className={css(styles.buttonWithShadow)}
                            onClick={toggleFullScreenPanel}
                        >
                            <span className={css(styles.wrapper)}>
                                <div className={css(styles.containerTable)}>
                                    <div className={css(styles.containerTableChild)}>
                                        <span>Filters</span>
                                    </div>
                                    <div className={css(styles.containerTableChild)}>
                                        <div style={{ marginLeft: '6px' }}>
                                            <div className={css(styles.icon)}>
                                                <svg
                                                    viewBox="0 0 12 12"
                                                    role="presentation"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    style={{
                                                        display: 'block',
                                                        fill: 'currentcolor',
                                                        height: '1em',
                                                        width: '1em'
                                                    }}
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M2.5.25a.75.75 0 0 0-.75.75v.378a2.25 2.25 0 0 0 0 4.244V11a.75.75 0 0 0 1.5 0V5.622a2.25 2.25 0 0 0 0-4.244V1A.75.75 0 0 0 2.5.25zm0 4a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm3.5-4a.75.75 0 0 0-.75.75v5.378a2.25 2.25 0 0 0 0 4.244V11a.75.75 0 0 0 1.5 0v-.378a2.25 2.25 0 0 0 0-4.244V1A.75.75 0 0 0 6 .25zm0 9a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm4.25-7.872V1a.75.75 0 0 0-1.5 0v.378a2.25 2.25 0 0 0 0 4.244V11a.75.75 0 0 0 1.5 0V5.622a2.25 2.25 0 0 0 0-4.244zM9.5 4.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </span>
                            {
                                getActiveFilters > 0 ?
                                    <span className={css(styles.wrapper)}>
                                        <div
                                            className={css(display.inlineBlock)}
                                            style={{ marginLeft: '6px' }}
                                        >
                                            <div
                                                className={css(styles.badgeContainer)}
                                                aria-label={`${getActiveFilters} filters applied`}
                                            >{getActiveFilters}</div>
                                        </div>
                                    </span> : null
                            }
                        </button>
                    </MediaQuery>
                    <MediaQuery query="(max-width: 743px)">
                        <div className={css(styles.buttonContainer)}>
                            <button
                                className={css(styles.button, styles.buttonLeft)}
                                onClick={toggleMapPanel}
                            >
                                <span className={css(styles.wrapper)}>
                                    <div className={css(styles.containerTable)}>
                                        <div className={css(styles.containerTableChild)}>
                                            <span>Map</span>
                                        </div>
                                        <div className={css(styles.containerTableChild)}>
                                            <div style={{ marginLeft: '6px' }}>
                                                <div className={css(styles.icon)}>
                                                    <svg
                                                        viewBox="0 0 12 12"
                                                        role="presentation"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        style={{
                                                            display: 'block',
                                                            fill: 'currentcolor',
                                                            height: '1em',
                                                            width: '1em'
                                                        }}
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10.377.76l-2.816.469L4.738.288a.753.753 0 0 0-.474 0l-3 1a.75.75 0 0 0-.513.711v9a.75.75 0 0 0 .987.711l2.763-.921 2.763.921c.154.051.32.051.474 0l3-1a.75.75 0 0 0 .513-.711v-8.5a.75.75 0 0 0-.873-.74l-.001.001zM2.25 9.959V2.54l1.5-.5v7.419l-1.5.5zm3-7.919l1.5.5v7.419l-1.5-.5V2.04zm3 .595l1.5-.25v7.074l-1.5.5V2.635z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                            </button>
                            <div className={css(styles.dividerOuter)}>
                                <div className={css(styles.divider)} />
                            </div>
                            <button
                                className={css(styles.button, styles.buttonLeft)}
                                onClick={toggleFullScreenPanel}
                            >
                                <span className={css(styles.wrapper)}>
                                    <div className={css(styles.containerTable)}>
                                        <div className={css(styles.containerTableChild)}>
                                            <span>Filters</span>
                                        </div>
                                        <div className={css(styles.containerTableChild)}>
                                            <div style={{ marginLeft: '6px' }}>
                                                <div className={css(styles.icon)}>
                                                    <svg
                                                        viewBox="0 0 12 12"
                                                        role="presentation"
                                                        aria-hidden="true"
                                                        focusable="false"
                                                        style={{
                                                            display: 'block',
                                                            fill: 'currentcolor',
                                                            height: '1em',
                                                            width: '1em'
                                                        }}
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M2.5.25a.75.75 0 0 0-.75.75v.378a2.25 2.25 0 0 0 0 4.244V11a.75.75 0 0 0 1.5 0V5.622a2.25 2.25 0 0 0 0-4.244V1A.75.75 0 0 0 2.5.25zm0 4a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm3.5-4a.75.75 0 0 0-.75.75v5.378a2.25 2.25 0 0 0 0 4.244V11a.75.75 0 0 0 1.5 0v-.378a2.25 2.25 0 0 0 0-4.244V1A.75.75 0 0 0 6 .25zm0 9a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm4.25-7.872V1a.75.75 0 0 0-1.5 0v.378a2.25 2.25 0 0 0 0 4.244V11a.75.75 0 0 0 1.5 0V5.622a2.25 2.25 0 0 0 0-4.244zM9.5 4.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </span>
                                {
                                    getActiveFilters > 0 ?
                                        <span className={css(styles.wrapper)}>
                                            <div
                                                className={css(display.inlineBlock)}
                                                style={{ marginLeft: '6px' }}
                                            >
                                                <div
                                                    className={css(styles.badgeContainer)}
                                                    aria-label={`${getActiveFilters} filters applied`}
                                                >{getActiveFilters}</div>
                                            </div>
                                        </span> : null
                                }
                            </button>
                        </div>
                    </MediaQuery>
                </div>
            </div>
        </div>
    );
};

FilterBar.propTypes = {
    filterGroups: PropTypes.array.isRequired,
    getActiveFilters: PropTypes.number.isRequired,
    toggleFullScreenPanel: PropTypes.func.isRequired,
    toggleMapPanel: PropTypes.func.isRequired
};

export default FilterBar;
