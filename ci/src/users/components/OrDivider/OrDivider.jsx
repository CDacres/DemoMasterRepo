import React from 'react';
import PropTypes from 'prop-types';

function OrDivider({ lang }) {
    return (
        <div className="divider-wrapper">
            <div className="divider-container">
                <span className="divider-span">
                    <span className="divider-text">
                        <span>{lang.common.common_or}</span>
                    </span>
                </span>
            </div>
        </div>
    );
}

OrDivider.propTypes = {
    lang: PropTypes.object.isRequired
};

export default OrDivider;
