
import React from 'react';
import PropTypes from 'prop-types';

const TextLink = ({ handleClick, text }) => {
    return (
        <div className="mobile-top-panel__dropdown-panel-text">
            <button
                aria-disabled="false"
                className="mobile-top-panel__dropdown-panel-anchor-text"
                type="button"
                onClick={handleClick}
            >
                <span>{text}</span>
            </button>
        </div>
    );
};

TextLink.propTypes = {
    handleClick: PropTypes.func,
    text: PropTypes.string
};

export default TextLink;
