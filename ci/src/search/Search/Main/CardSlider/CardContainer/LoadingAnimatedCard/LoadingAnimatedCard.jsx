
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import {
    display,
    position
} from '../../../../commonStyles.js';
import cardCommonStyles from '../cardCommonStyles.js';
import styles from './styles.js';

const LoadingAnimatedCard = ({ cardPadding }) => {
    return (
        <div
            className={css(styles.container_fullWidth)}
        >
            <button
                type="button"
                className={css(styles.link)}
            >
                <div>
                    <div
                        className={css(styles.container_fullWidth)}
                        style={{
                            background: '#D8D8D8',
                            paddingTop: `${cardPadding}%`
                        }}
                    >
                        <div className={css(styles.children)}>
                            <div
                                style={{
                                    width: '100%',
                                    height: '100%'
                                }}
                            >
                                <span style={{ fontSize: 0 }} />
                                <div
                                    className={css(position.relative)}
                                    style={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                >
                                    <div className={css(styles.shimmer)}>
                                        <span
                                            aria-busy="true"
                                            className={css(styles.shimmerAnimation)}
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <div className={css(styles.twoLineTitle)}>
                            <span className={css(
                                cardCommonStyles.text,
                                cardCommonStyles.size_small,
                                cardCommonStyles.weight_bold,
                                display.inline
                            )}>
                                <span
                                    aria-busy="true"
                                    className={css(styles.shimmerAnimation)}
                                    style={{
                                        width: '60%',
                                        height: '1ex'
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                    <div style={{ marginTop: '4px' }}>
                        <div />
                    </div>
                </div>
            </button>
        </div>
    );
};

LoadingAnimatedCard.propTypes = {
    cardPadding: PropTypes.number.isRequired
};

export default LoadingAnimatedCard;
