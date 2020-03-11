import React, { PropTypes } from 'react';

function ButtonLarge({ id, buttonText, customClass, type, action }) {
    return (
        <div className="form-social-button-wrapper">
            <button
                id={id}
                className={`btn icon-btn btn-block signup-login-form__btn btn-large btn-${type}`}
                name="button"
                type="submit"
                onClick={typeof action !== undefined ? action : ''}
            >
                <span className="icon-container">
                    <span className="icon">
                        <i className={`fa fa-${type}`}></i>
                    </span>
                </span>
                <span className="text-container">
                    {buttonText}
                </span>
            </button>
        </div>
    );
}

ButtonLarge.propTypes = {
    action: PropTypes.func,
    buttonText: PropTypes.string.isRequired,
    customClass: PropTypes.string,
    id: PropTypes.string,
    type: PropTypes.string.isRequired
};

export default ButtonLarge;
