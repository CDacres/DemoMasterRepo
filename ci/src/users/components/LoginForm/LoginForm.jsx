
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite/no-important';
import axios from 'axios';
import qs from 'qs';

import ButtonLarge from '../ButtonLarge';
import GoogleButton from '../GoogleButton';
import OrDivider from '../OrDivider';
import EmailInput from '../EmailInput';
import PasswordInput from '../PasswordInput';
import Divider from '../Divider';
import NotRegistered from '../NotRegistered';

class LoginForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            rememberMe: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRememberChange = this.handleRememberChange.bind(this);
        this.getUserEmail = this.getUserEmail.bind(this);
    }

    componentDidMount() {
        const { readCookie, getUserEmail } = this;
        if (readCookie('zc_rm') !== null) {
            getUserEmail();
        }
    }

    readCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
            if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    getUserEmail() {
        const { readCookie } = this;
        axios.post('/api/v1/users/remember', qs.stringify({
            token: readCookie('zc_rm')
        })).then((response) => {
            if (response) {
                this.setState({
                    email: JSON.parse(response.data).data[0],
                    rememberMe: 1
                });
            }
        })
        .catch(error => {
            throw new Error(error);
        });
    }

    handleChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleLogin(event) {
        event.preventDefault();
        const { email, password, rememberMe } = this.state;
        $('#log_in').hide();
        $('#loader-container').show();
        axios({
            method: 'post',
            url: '/users/remote_signin',
            data: qs.stringify({
                'zc_login_user_name': email,
                'zc_login_password': password,
                'remember_me': rememberMe
            }),
            validateStatus: (status) => status
        })
        .then((response) => {
            if (response.data.error.occurred) {
                $('#loader-container').hide();
                $('#log_in').show();
                if (isMobileVariable) {
                    $('#error-message').text(response.data.error.message);
                    return $('#error-popup').popup('open', {
                        transition: 'pop'
                    });
                } else {
                    return bootstrapError(response.data.error.message);
                }
            }
            return window.location.reload();
        })
        .catch(error => {
            console.log(error);
            throw new Error(error);
        });
    }

    handleRememberChange() {
        this.setState({ rememberMe: !this.state.rememberMe });
    }

    render() {
        const {
            handleChange,
            handleLogin,
            handleRememberChange
        } = this;
        const {
            email,
            password,
            rememberMe
        } = this.state;
        const { country_lang_url, lang } = this.props;
        return (
            <div className="inner-container">
                <div className="react-form-wrapper">
                    <div className="form-content">
                        <div className="form-content-box">
                            <section>
                                <ButtonLarge
                                    id="facebook_login_button"
                                    buttonText={lang.users.users_login_with_facebook}
                                    type="facebook"
                                />
                                <GoogleButton
                                    id="google_login_button"
                                    buttonText={lang.users.users_login_with_google}
                                />
                                <ButtonLarge
                                    id="linkedin_login_button"
                                    buttonText={lang.users.users_login_with_linkedin}
                                    type="linkedin"
                                />
                                <OrDivider
                                    lang={lang}
                                />
                                <div className="login-form-wrapper">
                                    <form onSubmit={handleLogin}>
                                        <EmailInput
                                            id="email"
                                            name="email"
                                            label={lang.users.users_email_address}
                                            handleChange={handleChange}
                                            value={email}
                                        />
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            label={lang.users.users_password}
                                            handleChange={handleChange}
                                            value={password}
                                        />
                                        <div className="login-form-input-row-wrapper">
                                            <div className="va-container">
                                                <div className="va-middle">
                                                    <label
                                                        className="remember-me-checkbox-label"
                                                        htmlFor="remember-me-checkbox"
                                                    >
                                                        <div className="fast-click-container">
                                                            <span
                                                                className="remember-me-checkbox-container"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id="remember-me-checkbox"
                                                                    name="remember-me-checkbox"
                                                                    value={rememberMe}
                                                                    onChange={handleRememberChange}
                                                                    checked={rememberMe}
                                                                />
                                                            </span>
                                                        </div>
                                                        <div className="fast-click-container">
                                                            <span
                                                                className="remember-me-text"
                                                            >{lang.users.users_remember_me}</span>
                                                        </div>
                                                    </label>
                                                </div>
                                                <div className="pull-right va-middle">
                                                    <a
                                                        href={`/${country_lang_url}/request-new-password`}
                                                        aria-disabled="false"
                                                    >{lang.users.users_forgot_password}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <button id="log_in" aria-disabled="false" type="submit" className="login-button">
                                            <span className="login-button-text">
                                                <span>{lang.common.common_login}</span>
                                            </span>
                                        </button>
                                        <div id="loader-container" className={css(styles.loaderGif)}>
                                            <img src="/images/loading.gif" />
                                        </div>
                                    </form>
                                </div>
                                <Divider />
                                <NotRegistered
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
}

LoginForm.propTypes = {
    country_lang_url: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
    loaderGif: {
        display: 'none',
        width: '100%',
        textAlign: 'center'
    }
});

export default LoginForm;
