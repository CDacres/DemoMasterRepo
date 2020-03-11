/* global attachSocialSignupListeners */

import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import qs from 'qs';

import SocialSignup from './components/SocialSignup';
import EmailSignup from './components/EmailSignup';

class SignupForm extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirm_password: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            socialSignup: true
        };
        this.switchForm = this.switchForm.bind(this);
        this.validateSignup = this.validateSignup.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRememberChange = this.handleRememberChange.bind(this);
    }

    componentDidUpdate() {
        const { attachPhoneHelper } = this;
        attachSocialSignupListeners();
        attachPhoneHelper();
    }

    attachPhoneHelper() {
        if ($('#phone_number').length) {
            $('#phone_number').intlTelInput({ initialCountry: locale_code });
            if (!$('#phone_number').intlTelInput('isValidNumber')) {
                $('#phone_number').intlTelInput('setCountry', locale_code);
            }
        }
    }

    switchForm() {
        this.setState({ socialSignup: false });
    }

    validateSignup() {
        const validation = {
            pass: true,
            message: ''
        };
        const {
            email,
            password,
            confirm_password,
            first_name,
            last_name,
            phone_number
        } = this.state;
        const emailReg = /^([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)?$/;
        if (email === '' || !emailReg.test(email.toLowerCase())) {
            validation.pass = false;
            validation.message = 'Please enter a valid email address';
        }
        if (first_name === '') {
            validation.pass = false;
            validation.message = 'Please enter your first name';
        }
        if (last_name === '') {
            validation.pass = false;
            validation.message = 'Please enter your last name';
        }
        if (phone_number === '') {
            validation.pass = false;
            validation.message = 'Please enter a valid phone number';
        }
        if (!$('#phone_number').intlTelInput('isValidNumber')) {
            const error = $('#phone_number').intlTelInput('getValidationError');
            let errMsg;
            switch (error) {
            case intlTelInputUtils.validationError.IS_POSSIBLE:
                errMsg = 'Your contact number is invalid';
                break;
            case intlTelInputUtils.validationError.INVALID_COUNTRY_CODE:
                errMsg = 'Your country code is invalid';
                break;
            case intlTelInputUtils.validationError.TOO_SHORT:
                errMsg = 'Your contact number is too short';
                break;
            case intlTelInputUtils.validationError.TOO_LONG:
                errMsg = 'Your contact number is too long';
                break;
            case intlTelInputUtils.validationError.NOT_A_NUMBER:
                errMsg = 'Your value is not a number';
                break;
            default:
                errMsg = 'Please enter a valid contact number';
                break;
            }
            validation.pass = false;
            validation.message = errMsg;
        }
        if (password.length < 8) {
            validation.pass = false;
            validation.message = 'Your password must be at least 8 characters long';
            if (password === '') {
                validation.message = 'Please enter a password';
            }
        }
        if (password !== confirm_password) {
            validation.pass = false;
            validation.message = 'Password and password confirmation do not match';
        }
        return validation;
    }

    handleSignup(event) {
        event.preventDefault();
        const { handleLogin, validateSignup } = this;
        const validation = validateSignup();
        if (!validation.pass) {
            bootstrapError(validation.message);
        } else {
            const {
                email,
                password,
                confirm_password,
                first_name,
                last_name,
                phone_number,
                token
            } = this.state;
            $('#sign_up').hide();
            $('#loader-container').show();
            axios({
                method: 'post',
                url: '/api/v1/users',
                data: qs.stringify({
                    email,
                    first_name,
                    last_name,
                    phone_number,
                    password,
                    confirm_password,
                    token: $.cookie("zc_tc")
                }),
                validateStatus: (status) => {
                    return status;
                }
            })
                .then((response) => {
                    if (response.status === 201) {
                        handleLogin();
                    } else {
                        $('#loader-container').hide();
                        $('#sign_up').show();
                        bootstrapError(response.data);
                    }
                })
                .catch(console.log);
        }
    }

    handleChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handlePhoneChange() {
        this.setState({
            phone_number: $('#phone_number').intlTelInput(
                'getNumber', intlTelInputUtils.numberFormat.INTERNATIONAL
            )
        });
    }

    handleLogin() {
        const { email, password, rememberMe } = this.state;
        axios({
            method: 'post',
            url: '/users/remote_signin',
            data: qs.stringify({
                'zc_login_user_name': email,
                'zc_login_password': password,
                'remember_me': rememberMe
            }),
            validateStatus: (status) => {
                return status;
            }
        })
        .then((response) => {
            if (response.data.error.occurred) {
                if (isMobileVariable) {
                    $('#error-message').text(response.data.error.message);
                    return $('#error-popup').popup('open', {
                        transition: 'pop'
                    });
                } else {
                    return bootstrapError(response.data.error.message);
                }
            }
            return location.reload();
        })
        .catch(console.log);
    }

    handleRememberChange() {
        this.setState({ rememberMe: !this.state.rememberMe });
    }

    render() {
        const {
            switchForm,
            handleChange,
            handlePhoneChange,
            handleSignup
        } = this;
        const {
            email,
            password,
            confirm_password,
            first_name,
            last_name,
            socialSignup
        } = this.state;
        const { country_lang_url, lang } = this.props;
        if (socialSignup) {
            return (
                <SocialSignup
                    switchForm={switchForm}
                    country_lang_url={country_lang_url}
                    lang={lang}
                />
            );
        } else {
            return (
                <EmailSignup
                    confirm_password={confirm_password}
                    country_lang_url={country_lang_url}
                    email={email}
                    password={password}
                    first_name={first_name}
                    handleChange={handleChange}
                    handlePhoneChange={handlePhoneChange}
                    handleSignup={handleSignup}
                    lang={lang}
                    last_name={last_name}
                />
            );
        }
    }
}

SignupForm.propTypes = {
    country_lang_url: PropTypes.string.isRequired,
    lang: PropTypes.object.isRequired
};

export default SignupForm;
