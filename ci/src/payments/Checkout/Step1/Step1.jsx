
import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';
import { connect } from 'react-redux';

import SectionHeading from '../../components/SectionHeading';
import LoginForm from './LoginForm';
import DetailsForm from './DetailsForm';
import ProgressButton from '../components/ProgressButton';

import actions from '../../actions';

const Step1 = ({
    activeStep,
    country_lang_url,
    handleBack,
    handleChange,
    handleCollapse,
    handleSubmit,
    lang,
    linkedin_login_link,
    step,
    user
}) => {
    if ((typeof user.isGuest !== 'undefined' && user.isGuest) || user.is_logged_in) {
        return (
            <div className="reactStep1">
                <div className="row">
                    <div className="col-12">
                        <SectionHeading
                            handleCollapse={handleCollapse}
                            headingText={lang.payments.payments_index_form_your_details_heading}
                            lang={lang}
                            stepNo="1"
                        />
                    </div>
                </div>
                <Collapse
                    isOpened={activeStep === 1}
                    style={{ width: '100%' }}
                >
                    {activeStep === 1 &&
                        <div>
                            <DetailsForm
                                country_lang_url={country_lang_url}
                                email={user.email}
                                first_name={user.first_name}
                                handleChange={handleChange}
                                lang={lang}
                                last_name={user.last_name}
                                linkedin_login_link={linkedin_login_link}
                                phone_number={user.phone_number}
                                step={step[1]}
                                user={user}
                            />
                            <ProgressButton
                                lang={lang}
                                progressAction={handleSubmit}
                                childElement={
                                    !user.is_logged_in ?
                                    <button
                                        className="btn btn-default"
                                        onClick={handleBack}
                                    >{lang.common.common_back}</button> : null
                                }
                            />
                        </div>
                    }
                </Collapse>
            </div>
        );
    }
    return (
        <div className="reactStep1">
            <div className="row">
                <div className="col-12">
                    <SectionHeading
                        handleCollapse={handleCollapse}
                        headingText={lang.payments.payments_index_login_heading}
                        lang={lang}
                        stepNo="1"
                    />
                </div>
            </div>
            <Collapse
                isOpened={activeStep === 1}
                style={{ width: '100%' }}
            >
                {activeStep === 1 &&
                    <div>
                        <LoginForm
                            lang={lang}
                            linkedin_login_link={linkedin_login_link}
                        />
                    </div>
                }
            </Collapse>
        </div>
    );
};

Step1.propTypes = {
    activeStep: PropTypes.number.isRequired,
    country_lang_url: PropTypes.string.isRequired,
    handleBack: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCollapse: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    linkedin_login_link: PropTypes.string.isRequired,
    step: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = ({ step }) => ({ step });

const mapDispatchToProps = dispatch => {
    return {
        handleBack: () => dispatch(actions.undoCheckoutAsGuest())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Step1);
