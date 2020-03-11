
import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';

import SocialLinks from '../SocialLinks';
import OrDivider from '../../../OrDivider';
import UserInput from '../../../UserInput';
import EmailInput from '../../../EmailInput';
import TelephoneInput from '../../../TelephoneInput';
import PasswordInput from '../../../PasswordInput';
import SubmitButton from '../../components/SubmitButton';
import TermsSection from '../TermsSection';
import Divider from '../../../Divider';
import AlreadyUser from '../../components/AlreadyUser';

function EmailSignup({
    confirm_password,
    country_lang_url,
    email,
    password,
    first_name,
    handleChange,
    handlePhoneChange,
    handleSignup,
    lang,
    last_name
}) {
    return (
        <div className="inner-container">
            <div className="react-form-wrapper">
                <div className="form-content">
                    <div className="form-content-box">
                        <section>
                            <SocialLinks
                                lang={lang}
                            />
                            <OrDivider
                                lang={lang}
                            />
                            <form onSubmit={handleSignup}>
                                <EmailInput
                                    id="email"
                                    name="email"
                                    label={lang.users.users_email_address}
                                    value={email}
                                    handleChange={handleChange}
                                />
                                <UserInput
                                    id="first_name"
                                    name="first_name"
                                    label={lang.users.users_first_name}
                                    value={first_name}
                                    handleChange={handleChange}
                                />
                                <UserInput
                                    id="last_name"
                                    name="last_name"
                                    label={lang.users.users_last_name}
                                    value={last_name}
                                    handleChange={handleChange}
                                />
                                <TelephoneInput
                                    id="phone_number"
                                    name="phone_number"
                                    label={lang.users.users_phone_number}
                                    handleChange={handlePhoneChange}
                                />
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    label={lang.users.users_password}
                                    value={password}
                                    handleChange={handleChange}
                                />
                                <PasswordInput
                                    id="confirm_password"
                                    name="confirm_password"
                                    label={lang.users.users_confirm_password}
                                    value={confirm_password}
                                    handleChange={handleChange}
                                />
                                <TermsSection
                                    country_lang_url={country_lang_url}
                                    lang={lang}
                                />
                                <SubmitButton
                                    id="sign_up"
                                    buttonText={lang.common.common_sign_up}
                                />
                                <div id="loader-container" className={css(styles.loaderGif)}>
                                    <img src="/images/loading.gif" />
                                </div>
                            </form>
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

EmailSignup.propTypes = {
    confirm_password: PropTypes.string.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handlePhoneChange: PropTypes.func.isRequired,
    handleSignup: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    last_name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    loaderGif: {
        display: 'none',
        width: '100%',
        textAlign: 'center'
    }
});

export default EmailSignup;
