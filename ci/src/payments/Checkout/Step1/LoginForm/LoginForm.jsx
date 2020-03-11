import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import Input from './components/Input';
import Submit from '../../../../common/components/Form/Inputs/Submit';
import SocialButton from './components/SocialButton';
import OrDividerVertical from '../../../components/OrDividerVertical';
import ForgotPasswordButton from './components/ForgotPasswordButton';

import actions from '../../../actions';

const LoginForm = ({
    checkoutAsGuest,
    handleForgotPassword,
    handlePasswordChange,
    handleUndoForgotPassword,
    handleUserInputChange,
    isLoggedIn,
    lang,
    linkedin_login_link,
    step,
    user
}) => {
    const handleChange = (event) => {
        if (event.target.id === 'password') {
            handlePasswordChange(event.target.value);
        } else {
            handleUserInputChange(event.target.name, event.target.value);
        }
    };
    const handleLogin = (event) => {
        event.preventDefault();
        axios.post('/users/new_remote_signin', qs.stringify({
            email: user.email,
            password: step[1].password
        }))
            .then((response) => {
                if (response.data.error.occurred) {
                    return bootstrapError(response.data.error.message);
                }
                if (typeof response.data.data.last_name === 'undefined')
                {
                    response.data.data.last_name = '';
                }
                if (typeof response.data.data.phone_number === 'undefined')
                {
                    response.data.data.phone_number = '';
                }
                if (Number(response.data.data.role_id) === 2) {
                    return isLoggedIn(response.data.data, true);
                }
                return isLoggedIn(response.data.data, false);
            })
            .catch(error => new Error(error));
    };
    const resetPassword = (event) => {
        event.preventDefault();
        axios.post('/users/forgot_password', qs.stringify({
            email: user.email
        }))
            .then(({ data }) => {
                if (data.error.occurred === true) {
                    bootstrapError(data.error.message);
                } else {
                    bootstrapSuccess(lang.users.users_request_reset_success);
                    handleUndoForgotPassword();
                }
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    const handleGuest = () => {
        checkoutAsGuest();
    };
    if (step[1].forgotPassword) {
        return (
            <div id="login_form_container" className="overflow-hidden reactLoginForm">
                <div className="row aligner">
                    <div className="col-lg-6 col-md-6 col-sm-6 aligner-item--top">
                        <form
                            action="/users/forgot_password"
                            method="POST"
                            onSubmit={resetPassword}
                        >
                            <div className="row space-2">
                                <div className="login-form-fields col-12">
                                    <input
                                        name="email"
                                        placeholder={lang.users.users_email_address}
                                        className="login-email"
                                        type="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="row space-2">
                                <div className="login-form-fields col-6">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >{lang.users.users_request}</button>
                                </div>
                                <div className="login-form-fields col-6 text-right">
                                    <button
                                        className="btn btn-default"
                                        onClick={handleUndoForgotPassword}
                                    >{lang.common.common_back}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div id="login_form_container" className="overflow-hidden reactLoginForm">
            <div className="row aligner">
                <div className="col-lg-6 col-md-6 col-sm-6 aligner-item--top">
                    <form
                        action="/users/new_remote_signin"
                        method="POST"
                        onSubmit={handleLogin}
                    >
                        <div className="row space-2">
                            <div className="login-form-fields col-12">
                                <Input
                                    id="login_email"
                                    additionalClasses={['login-email']}
                                    name="email"
                                    placeholder={lang.users.users_email_address}
                                    type="email"
                                    value={user.email}
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row space-2">
                            <div className="login-form-fields col-12">
                                <Input
                                    id="password"
                                    additionalClasses={['password']}
                                    name="password"
                                    placeholder={lang.users.users_password}
                                    type="password"
                                    value={step[1].password}
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >{lang.common.common_login}</button>
                            </div>
                            <div className="col-lg-8 col-md-8 col-sm-8">
                                <ForgotPasswordButton
                                    handleClick={handleForgotPassword}
                                    lang={lang}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-1 col-md-1 col-sm-1 aligner-item--top no-padding">
                    <OrDividerVertical
                        lang={lang}
                    />
                </div>
                <div className="col-lg-5 col-md-5 col-sm-5 aligner-item--top">
                    <div className="table">
                        <div className="tableCell">
                            <div className="space-2">
                                <SocialButton
                                    id="facebook_login_button"
                                    innerText={lang.users.users_login_with_facebook}
                                    type="facebook"
                                />
                            </div>
                            <div className="space-2">
                                <SocialButton
                                    id="google_login_button"
                                    innerText={lang.users.users_login_with_google}
                                    type="google"
                                />
                            </div>
                            <div className="space-2">
                                <SocialButton
                                    id="linkedin_login_button"
                                    innerText={lang.users.users_login_with_linkedin}
                                    type="linkedin"
                                    dataUrl={linkedin_login_link}
                                />
                            </div>
                            <div className="space-2">
                                <button
                                    className="btn btn-primary btn-block btn-light-font"
                                    onClick={handleGuest}
                                >{lang.payments.payments_index_mobile_check_out_as_guest}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    checkoutAsGuest: PropTypes.func.isRequired,
    handleForgotPassword: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    handleUndoForgotPassword: PropTypes.func.isRequired,
    handleUserInputChange: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ step, user }) => ({ step, user });

const mapDispatchToProps = dispatch => {
    return {
        handleForgotPassword: () => dispatch(actions.forgotPassword()),
        handlePasswordChange: (value) => dispatch(actions.handlePasswordChange(value)),
        handleUndoForgotPassword: () => dispatch(actions.undoForgotPassword()),
        handleUserInputChange: (name, value) =>
            dispatch(actions.handleUserInputChange(name, value)),
        isLoggedIn: ({ email, first_name, last_name, phone_number }, is_admin) => {
            const user = {
                email,
                first_name,
                last_name,
                phone_number
            };
            dispatch(actions.isLoggedIn(user, is_admin));
        },
        checkoutAsGuest: () => dispatch(actions.checkoutAsGuest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
