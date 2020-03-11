
import React from 'react';
import PropTypes from 'prop-types';

const MobilePanelInput = ({ icon, text }) => {
    return (
        <button type="button" className="mobile-top-panel__dropdown-button">
            {icon}
            <span className="mobile-top-panel__dropdown-copy">
                <span>{text}</span>
            </span>
        </button>
    );
};

MobilePanelInput.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string
};

export default MobilePanelInput;
