import React from 'react';

import { loadLang } from '../../../lang';

function SignInModal() {
    loadLang(['common', 'users'])
    .then((lang) => {
        return (
            <div className="modal-body row clearfix forcesignin">
                <div className="col-sm-6 col-sm-push-6 col-xs-10 top-p-1">
                    <div className="col-sm-12">
                        <h3 className="sign-up-login-form__title">{lang.users.users_find}</h3>
                        <p id="signInLinkText" className="sign-up-login-form__alternative text-muted">
                            <i>{lang.users.users_already_account} <a id="signInLink" className="no-link">{lang.common.common_sign_in}</a></i>
                        </p>
                        <p id="signUpLinkText" className="sign-up-login-form__alternative text-muted" style="display: none;">
                            <i>{lang.users.users_no_account} <a id="signUpLink" className="no-link">{lang.common.common_sign_up}</a></i>
                        </p>
                    </div>
                    <div className="col-sm-12">
                        <form id="signUpForm" name="signUpLoginModalForm" autocomplete="off">
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <label for="first_name">{lang.common.users_first_name}<span className="required">*</span></label>
                                        <input type="text" name="first_name" className="form-control" placeholder="Steely" />
                                    </div>
                                    <div className="col-sm-6">
                                        <label for="last_name">{lang.common.users_last_name}<span className="required">*</span></label>
                                        <input type="text" name="last_name" className="form-control" placeholder="Dan" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label for="email">{lang.common.users_email_address}<span className="required">*</span></label>
                                <input type="email" name="email" className="form-control" placeholder="you@example.com" />
                            </div>
                            <div className="form-group">
                                <label for="phone-number">{lang.common.users_phone_number}</label>
                                <input id="phone_number" className="form-control zc_user_phone_number" type="tel" name="phone_number" />
                            </div>
                            <div className="form-group">
                                <label for="password">{lang.common.users_password}<span className="required">*</span></label>
                                <input type="password" name="password" className="form-control" />
                                <input type="hidden" name="ga_id" id="ga_id" />
                            </div>
                            <div className="form-group">
                                <div className="button-container">
                                    <input type="submit" className="btn btn-primary btn-block" value={lang.common.common_sign_up} />
                                </div>
                                <div className="loader-container" style="display: none;">
                                    <center>
                                        <img src="/images/loading.gif" title={lang.common.common_loading} alt={lang.common.common_loading} />
                                    </center>
                                </div>
                            </div>
                        </form>
                        <form id="signInForm" name="signInLoginModalForm" autocomplete="off" style="display: none;">
                            <div className="form-group">
                                <label for="email">{lang.common.users_email_address}<span className="required">*</span></label>
                                <input type="email" name="email" className="form-control" placeholder="you@example.com" />
                            </div>
                            <div className="form-group">
                                <label for="password">{lang.common.users_password}<span className="required">*</span></label>
                                <input type="password" name="password" className="form-control" />
                            </div>
                            <div className="form-group">
                                <div className="button-container">
                                    <input type="submit" className="btn btn-primary btn-block" value={lang.common.common_sign_in} />
                                </div>
                                <div className="loader-container" style="display: none;">
                                    <center>
                                        <img src="/images/loading.gif" title={lang.common.common_loading} alt={lang.common.common_loading} />
                                    </center>
                                </div>
                            </div>
                            <div className="form-group">
                                <p id="forgotPasswordLinkText" className="sign-up-login-form__alternative text-muted">
                                    <a id="forgotPasswordLink" className="no-link">{lang.common.users_forgot_your_password}</a>
                                </p>
                            </div>
                        </form>
                        <form id="forgotPasswordForm" name="forgotPasswordModalForm" autocomplete="off" style="display: none;">
                            <div className="form-group">
                                <label for="email">{lang.common.users_email_address}<span className="required">*</span></label>
                                <input type="email" name="email" className="form-control" placeholder="you@example.com" />
                            </div>
                            <div className="form-group">
                                <div className="button-container">
                                    <input type="submit" className="btn btn-primary btn-block" value={lang.common.users_request_new_password} />
                                </div>
                                <div className="loader-container" style="display: none;">
                                    <center>
                                        <img src="/images/loading.gif" title={lang.common.common_loading} alt={lang.common.common_loading} />
                                    </center>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-sm-6 col-sm-pull-6 col-xs-10 gating-modal__why-sign-up">
                    <div className="gating-modal__why-sign-up-text top-p-2 bottom-p-2">
                        <h1 className="gating-modal__header">{lang.users.users_find}</h1>
                        <div className="divider"></div>
                        <div className="gating-modal__benefit-container">
                            <h3>{lang.users.users_book_with}</h3>
                        </div>
                        <div className="gating-modal__benefit-container">
                            <h3>{lang.users.users_book_power}</h3>
                        </div>
                        <div className="gating-modal__benefit-container">
                            <h3>{lang.users.users_book_best}</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    });
}

export default SignInModal;
