import React from 'react';
import PropTypes from 'prop-types';

const OrDividerVertical = ({ lang }) => {
    return (
        <div className="dividerVerticalWrapper">
            <div className="dividerVerticalContainer">
                <span className="dividerVerticalSpan">
                    <span className="dividerVerticalText">
                        <span>{lang.common.common_or}</span>
                    </span>
                </span>
            </div>
        </div>
    );
};

OrDividerVertical.propTypes = {
    lang: PropTypes.object.isRequired
};

export default OrDividerVertical;
