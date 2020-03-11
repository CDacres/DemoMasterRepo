import React, { PropTypes } from 'react';

function SubmitButton({ id, buttonText }) {
    return (
        <button id={id} aria-disabled="false" type="submit" className="form-submit-button">
            <span className="form-submit-button-text">
                <span>{buttonText}</span>
            </span>
        </button>
    );
}

SubmitButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};

export default SubmitButton;
