import React, { PropTypes } from 'react';

function NotRegistered({ country_lang_url, lang }) {
    return (
        <div className="va-container va-container-h">
            <span className="va-middle">
                <div className="already-user-text">{lang.users.users_not_registered_yet}</div>
            </span>
            <span className="va-middle pull-right">
                <a href={`/${country_lang_url}/users/signup`} className="already-user-button">
                    <span className="already-user-button-text">{lang.common.common_sign_up}</span>
                </a>
            </span>
        </div>
    );
}

NotRegistered.propTypes = {
    country_lang_url: PropTypes.string.isRequired
};

export default NotRegistered;
