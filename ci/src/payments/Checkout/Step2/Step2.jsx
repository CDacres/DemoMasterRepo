
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Collapse from 'react-collapse';

import SectionHeading from '../../components/SectionHeading';
import AboutEvent from './AboutEvent';
import ProgressButton from '../components/ProgressButton';

const Step2 = ({
    activeStep,
    configurations,
    defaultConfiguration,
    handleChange,
    handleCollapse,
    handleVisited,
    lang
}) => {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <SectionHeading
                        handleCollapse={handleCollapse}
                        headingText={lang.payments.payments_index_form_event_heading}
                        lang={lang}
                        stepNo="2"
                    />
                </div>
            </div>
            <Collapse
                isOpened={activeStep === 2}
                style={{ width: '100%' }}
            >
                {activeStep === 2 &&
                    <div>
                        <AboutEvent
                            configurations={configurations}
                            defaultConfiguration={defaultConfiguration}
                            handleChange={handleChange}
                            handleVisited={handleVisited}
                            lang={lang}
                        />
                        <ProgressButton
                            lang={lang}
                        />
                    </div>
                }
            </Collapse>
        </div>
    );
};

Step2.propTypes = {
    activeStep: PropTypes.number.isRequired,
    configurations: PropTypes.array.isRequired,
    defaultConfiguration: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCollapse: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

const mapStateToProps = ({ activeStep, step }) =>
    ({ activeStep, step });

export default connect(mapStateToProps)(Step2);
