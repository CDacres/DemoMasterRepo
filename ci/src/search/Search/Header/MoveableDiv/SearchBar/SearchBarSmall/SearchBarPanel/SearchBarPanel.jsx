
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import Icon from '../../../../../components/Icon';
import FullScreenPanel from '../../../../../Main/FullScreenPanel';

import styles from './styles.js';

const SearchBarPanel = ({ closePanel }) => {
    return (
        <div>
            <div className={css(styles.container)}>
                <div
                    className={css(styles.container, styles.container_dropdown)}
                    aria-hidden="true"
                    onClick={closePanel}
                />
                <div className={css(styles.panel)}>
                    <div className={css(styles.panelContent)}>
                        <div className={css(styles.innerContainer)}>
                            <div className={css(styles.left)}>
                                <button
                                    type="button"
                                    className={css(styles.buttonContainer)}
                                    aria-expanded="false"
                                    onClick={closePanel}
                                >
                                    <Icon
                                        type="cross"
                                    />
                                </button>
                            </div>
                            <div className={css(styles.right)}>
                                <div className={css(styles.text)}>
                                    <button
                                        type="button"
                                        className={css(styles.componentButton)}
                                        aria-disabled="false"
                                    >
                                        <span>Clear all</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={css(styles.body)}>
                            <button
                                type="button"
                                className={css(styles.button)}
                            >
                                <span className={css(styles.icon)}>
                                    <Icon
                                        type="location-pin"
                                    />
                                </span>
                                <span className={css(styles.copy)}>
                                    <span>What</span>
                                </span>
                            </button>
                            <button type="button" className={css(styles.button)}>
                                <span className={css(styles.icon)}>
                                    <Icon
                                        type="location-pin"
                                    />
                                </span>
                                <span className={css(styles.copy)}>
                                    <span>Where</span>
                                </span>
                            </button>
                            <div
                                style={{
                                    marginTop: '16px',
                                    marginBottom: '16px'
                                }}
                            >
                                <button
                                    type="button"
                                    className={css(styles.button)}
                                >
                                    <span className={css(styles.icon)}>
                                        <Icon
                                            type="calendar"
                                        />
                                    </span>
                                    <span className={css(styles.copy)}>Anytime</span>
                                </button>
                            </div>
                            <button type="button" className={css(styles.button)}>
                                <span className={css(styles.icon)}>
                                    <Icon
                                        type="people"
                                    />
                                </span>
                                <span className={css(styles.copy)}>
                                    <span>
                                        <span>1 guest</span>
                                    </span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
        </div>
    );
};

SearchBarPanel.propTypes = {
    closePanel: PropTypes.func.isRequired
};

export default SearchBarPanel;
