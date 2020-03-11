
import React from 'react';
import { css } from 'aphrodite';
import PropTypes from 'prop-types';

import styles from './styles.js';

const CarouselRowLoading = ({ children }) => {
    return (
        <div className={css(styles.carouselRow)}>
            <span className={css(styles.breakingSpace)} />
                <div className={css(styles.headerContainer)}>
                    <div className={css(styles.titleContainer)}>
                        <div className={css(styles.rowHeaderContainer)}>
                            <h3 className={css(styles.rowHeader)}>
                                <span
                                    aria-busy="true"
                                    className={css(styles.shimmerAnimation)}
                                    style={{
                                        width: '500px',
                                        height: '25px'
                                    }}
                                />
                            </h3>
                        </div>
                    </div>
                    <span
                        aria-busy="true"
                        className={css(styles.shimmerAnimation)}
                        style={{
                            width: '75px',
                            height: '15px'
                        }}
                    />
                </div>
            <div className={css(styles.container)}>
                {children}
            </div>
        </div>
    );
};

CarouselRowLoading.propTypes = {
    children: PropTypes.node
};

export default CarouselRowLoading;
