
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import PanelHeader from './PanelHeader';
import PanelFooter from './PanelFooter';

import styles from './styles.js';

const FullScreenPanel = ({
    children,
    handleClose,
    headerText,
    footer,
    header
}) => {
    return (
        <div>
            <div
                className={css(styles.outerContainer)}
            >
                <div
                    className={css(styles.panel)}
                >
                    {
                        header ?
                            <PanelHeader
                                handleClose={handleClose}
                                headerText={headerText}
                                headerAction={header.action}
                                headerActionText={header.actionText}
                            /> : null
                    }
                    <div
                        className={css(
                            styles.panelContent,
                            styles.panelContent_full,
                            styles.panelContent_withFixedHeader,
                            styles.panelContent_withFooter
                        )}
                    >
                        <div className={css(styles.panelBody)}>
                            {children}
                        </div>
                    </div>
                    {
                        footer.withButton ?
                            <PanelFooter
                                handleButtonClick={handleClose}
                            /> : null
                    }
                </div>
            </div>
        </div>
    );
};

FullScreenPanel.propTypes = {
    children: PropTypes.node,
    footer: PropTypes.object,
    handleClose: PropTypes.func,
    header: PropTypes.object,
    headerText: PropTypes.string
};

export default FullScreenPanel;
