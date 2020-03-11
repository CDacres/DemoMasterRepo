
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import Icon from '../../../../components/Icon';

import styles from './styles.js';

const FlyoutNavLink = ({
    title,
    url,
    icon
}) => {
    return (
        <li aria-hidden="false">
            <a href={url} className={css(styles.link)} role="menuitem">
                <div className={css(styles.containerTable)}>
                    <div className={css(
                            styles.containerTableCell,
                            styles.containerTableCell_fullWidth,
                            styles.containerTableCell_alignMiddle
                        )}
                    >
                        <div>
                            <span>{title}</span>
                        </div>
                    </div>
                    {
                        icon ?
                            <div
                                className={css(
                                    styles.containerTableCell,
                                    styles.containerTableCell_alignMiddle
                                )}
                            >
                                <Icon
                                    type={icon}
                                />
                            </div> : null
                    }
                </div>
            </a>
        </li>
    );
};

FlyoutNavLink.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

export default FlyoutNavLink;
