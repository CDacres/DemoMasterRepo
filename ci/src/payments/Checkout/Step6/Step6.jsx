
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SaveButton from './SaveButton';

import { parseLangLine } from '../../../lang';
import { saveDetails } from './methods';

import actions from '../../actions';

const Step6 = ({
    handleInputChange,
    lang,
    skipSaveDetails,
    step,
    user
}) => {
    const handleChange = (event) =>
        handleInputChange(event.target.id, event.target.value);
    const handleSave = () => {
        saveDetails(user.id, step[6].password, step[6].password_confirmation, user.token)
        .then((response) => {
            if (!response.error.occurred) {
                handleSkip();
            } else {
                bootstrapError(response.error.message);
            }
        })
        .catch((error) => {
            throw new Error(error);
        });
    };
    const handleSkip = () => {
        skipSaveDetails();
    };
    const fullName = () => {
        if (typeof step[7].requestResponse !== 'undefined') {
            const firstName = step[7].requestResponse.reservation.client_first_name;
            const lastName = step[7].requestResponse.reservation.client_last_name;
            return `${firstName} ${lastName}`;
        }
        return '';
    };
    return (
        <div className="reactStep6">
            <div className="row space-2">
                <div className="col-12">
                    <h3>{
                        parseLangLine(
                            lang.users.users_save_password_heading,
                            fullName()
                        )
                    }</h3>
                    <span>{lang.users.users_save_password_subheading}</span>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className="inputContainer">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="input"
                            placeholder={lang.users.users_password}
                            onChange={handleChange}
                            value={step[6].password}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <div className="inputContainer">
                        <input
                            id="password_confirmation"
                            name="password_confirmation"
                            type="password"
                            className="input"
                            placeholder={lang.users.users_confirm_password}
                            onChange={handleChange}
                            value={step[6].password_confirmation}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <SaveButton
                        handleSave={handleSave}
                        handleSkip={handleSkip}
                        lang={lang}
                    />
                </div>
            </div>
        </div>
    );
};

Step6.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    skipSaveDetails: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ step }) => ({ step });

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: (name, value) => {
            dispatch(actions.handleChange(name, value));
        },
        skipSaveDetails: () => {
            dispatch(actions.skipSaveDetails());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step6);
