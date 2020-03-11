import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { attachPhoneHelper } from '../methods';

class DetailsForm extends Component {
    componentDidMount() {
        attachPhoneHelper();
    }

    render() {
        const {
            email,
            first_name,
            handleChange,
            lang,
            last_name,
            phone_number,
            user
        } = this.props;
        return (
            <div className="detailsForm">
                <div className="row">
                    <div className="col-6">
                        <div className="inputContainer">
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                className="inputContainerInput zc_user_first_name"
                                placeholder={lang.users.users_first_name}
                                onChange={handleChange}
                                value={first_name}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="inputContainer">
                            <input
                                id="last_name"
                                name="last_name"
                                type="text"
                                className="inputContainerInput zc_user_last_name"
                                placeholder={lang.users.users_last_name}
                                onChange={handleChange}
                                value={last_name}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="inputContainer">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="inputContainerInput zc_user_email"
                                placeholder={lang.users.users_email_address}
                                onChange={handleChange}
                                value={email}
                                disabled={user.is_logged_in}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="inputContainer">
                            <input
                                id="phone_number"
                                name="phone_number"
                                type="tel"
                                className="inputContainerInput zc_user_phone_number"
                                autoComplete="off"
                                onChange={handleChange}
                                value={phone_number}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DetailsForm.propTypes = {
    country_lang_url: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    last_name: PropTypes.string.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    phone_number: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
};

export default DetailsForm;
