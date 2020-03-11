import React, { PropTypes } from 'react';
import TranslationHelper from '../../../../../helpers/TranslationHelper';

function TermsSection({ country_lang_url, lang }) {
    const transHelper = new TranslationHelper({ messages: lang});
    const string = transHelper.choice('users.users_signup_terms', 1, {country_url: country_lang_url});
    return (
        <div className="terms-section-container">
            <small className="terms-section-small-text" dangerouslySetInnerHTML={{ __html: string}} />
        </div>
    );
}

TermsSection.propTypes = {
    country_lang_url: PropTypes.string.isRequired
};

export default TermsSection;
