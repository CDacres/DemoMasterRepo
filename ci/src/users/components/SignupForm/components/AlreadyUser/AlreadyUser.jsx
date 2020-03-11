import React, { PropTypes } from 'react';

function AlreadyUser({ country_lang_url, lang }) {
    return (
        <div className="va-container va-container-h">
            <span className="va-middle">
                <div className="already-user-text">{lang.users.users_already_have_account}</div>
            </span>
            <span className="va-middle pull-right">
                <a href={`/${country_lang_url}/users/signin`} className="already-user-button">
                    <span className="already-user-button-text">{lang.common.common_login}</span>
                </a>
            </span>
        </div>
    );
}

AlreadyUser.propTypes = {
    country_lang_url: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired
};

export default AlreadyUser;
