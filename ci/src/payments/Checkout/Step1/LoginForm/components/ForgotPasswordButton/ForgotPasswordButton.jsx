import React from 'react';
import PropTypes from 'prop-types';

const ForgotPasswordButton = ({ handleClick, lang }) => {
    return (
        <div className="reactForgotPassword">
            <div className="linkContainer">
                <a
                    href="#"
                    className="forgotPassword"
                    onClick={handleClick}
                >{lang.users.users_forgot_your_password}</a>
            </div>
        </div>
    );
};

ForgotPasswordButton.propTypes = {
    handleClick: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default ForgotPasswordButton;
