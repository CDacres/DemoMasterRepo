import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clone } from 'ramda';

import Step1 from './Step1.jsx';

import { saveUserDetails } from './methods';

import actions from '../../actions';

class Step1HOC extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.stopPropagation();
        const { handleUserInputChange } = this.props;
        handleUserInputChange(event.target.id, event.target.value);
    }

    handleCollapse(event) {
        event.preventDefault();
        const { setActiveStep } = this.props;
        setActiveStep(Number(event.target.id));
    }

    handleSubmit() {
        const { handleVisited, setUser, skipSaveDetails, user } = this.props;
        const originalUser = clone(user);
        saveUserDetails(user)
            .then((response) => {
                if (!response.error.occurred) {
                    const newUser = response.data;
                    if (typeof newUser.token !== 'undefined' && newUser.token !== null) {
                        newUser.isGuest = true;
                    } else {
                        newUser.isGuest = false;
                        skipSaveDetails();
                    }
                    newUser.is_admin = originalUser.is_admin;
                    setUser(newUser);
                    handleVisited(1);
                } else {
                    bootstrapError(response.data.error.message);
                }
            })
            .catch(error => new Error(error));
    }

    render() {
        const { handleChange, handleCollapse, handleSubmit } = this;
        const {
            activeStep,
            country_lang_url,
            handleVisited,
            lang,
            linkedin_login_link,
            step,
            user
        } = this.props;
        return (
            <Step1
                activeStep={activeStep}
                country_lang_url={country_lang_url}
                handleChange={handleChange}
                handleCollapse={handleCollapse}
                handleSubmit={handleSubmit}
                handleVisited={handleVisited}
                lang={lang}
                linkedin_login_link={linkedin_login_link}
                user={user}
                step={step}
            />
        );
    }
}

Step1HOC.propTypes = {
    IS_BROWSER: PropTypes.bool.isRequired,
    activeStep: PropTypes.number.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    handleUserInputChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    progress: PropTypes.func.isRequired,
    setActiveStep: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    skipSaveDetails: PropTypes.func.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ activeStep, step }) => ({ activeStep, step });

const mapDispatchToProps = dispatch => {
    return {
        handleVisited: step => {
            dispatch(actions.handleVisited(step));
        },
        progress: () => {
            dispatch(actions.progress());
        },
        setActiveStep: id => {
            dispatch(actions.setActiveStep(id));
        },
        handleUserInputChange: (id, value) => {
            dispatch(actions.handleUserInputChange(id, value));
        },
        setUser: newUser => {
            dispatch(actions.setUser(newUser));
        },
        skipSaveDetails: () => {
            dispatch(actions.skipSaveDetails());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1HOC);
