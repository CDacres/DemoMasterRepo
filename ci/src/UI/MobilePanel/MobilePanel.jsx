
import React from 'react';
import PropTypes from 'prop-types';

const MobilePanel = ({
    children,
    fullScreen,
    leftHeaderItem,
    centerHeaderItem,
    rightHeaderItem
}) => {
    return (
        <div className="mobile-top-panel">
            <div className="mobile-top-panel__top-panel-wrapper">
                <div
                    className={
                        fullScreen ?
                        'mobile-top-panel__top-panel-container-full-screen' :
                        'mobile-top-panel__dropdown-panel-dropdown'
                    }
                >
                    <div className="mobile-top-panel__dropdown-panel-content">
                        <div className="mobile-top-panel__dropdown-panel-container">
                            {
                                leftHeaderItem &&
                                <div className="mobile-top-panel__dropdown-panel-left-item">
                                    {leftHeaderItem}
                                </div>
                            }
                            {
                                centerHeaderItem &&
                                <div className="mobile-top-panel__dropdown-panel-center-item">
                                    {centerHeaderItem}
                                </div>
                            }
                            {
                                rightHeaderItem &&
                                <div className="mobile-top-panel__dropdown-panel-right-item">
                                    {rightHeaderItem}
                                </div>
                            }
                        </div>
                        <div className="mobile-top-panel__dropdown-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

MobilePanel.propTypes = {
    centerHeaderItem: PropTypes.node,
    children: PropTypes.node,
    fullScreen: PropTypes.bool,
    leftHeaderItem: PropTypes.node,
    rightHeaderItem: PropTypes.node
};

export default MobilePanel;
