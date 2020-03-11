import React, { PropTypes } from 'react';

import ButtonLarge from '../../../ButtonLarge';
import GoogleButton from '../../../GoogleButton';
import OrDivider from '../../../OrDivider';
import Divider from '../../../Divider';
import AlreadyUser from '../AlreadyUser';

function SocialSignup({ country_lang_url, lang, switchForm }) {
    return (
        <div className="inner-container">
            <div className="react-form-wrapper">
                <div className="form-content">
                    <div className="form-content-box">
                        <section>
                            <ButtonLarge
                                id="facebook_login_button"
                                buttonText={lang.users.users_signup_with_facebook}
                                type="facebook"
                            />
                            <GoogleButton
                                id="google_login_button"
                                buttonText={lang.users.users_signup_with_google}
                            />
                            <ButtonLarge
                                id="linkedin_login_button"
                                buttonText={lang.users.users_signup_with_linkedin}
                                type="linkedin"
                            />
                            <OrDivider
                                lang={lang}
                            />
                            <ButtonLarge
                                id="email_login_button"
                                action={switchForm}
                                buttonText={lang.users.users_signup_with_email}
                                type="envelope-o"
                            />
                            <Divider />
                            <AlreadyUser
                                country_lang_url={country_lang_url}
                                lang={lang}
                            />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

SocialSignup.propTypes = {
    country_lang_url: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired,
    switchForm: PropTypes.func.isRequired
};

export default SocialSignup;
