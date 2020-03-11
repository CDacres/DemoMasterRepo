
import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';

import SectionHeading from '../../components/SectionHeading';
import Payment from './Payment';

const Step5 = ({
    activeStep,
    bookingRequest,
    btToken,
    handleChange,
    handleCollapse,
    handleRadioChange,
    handleVisited,
    lang,
    paymentType,
    room,
    user
}) => {
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <SectionHeading
                        handleCollapse={handleCollapse}
                        headingText={lang.payments.payments_index_form_payment_heading}
                        lang={lang}
                        stepNo="5"
                    />
                </div>
            </div>
            <Collapse
                isOpened={activeStep === 5}
                style={{ width: '100%' }}
            >
                {activeStep === 5 &&
                    <Payment
                        bookingRequest={bookingRequest}
                        btToken={btToken}
                        handleChange={handleChange}
                        handleRadioChange={handleRadioChange}
                        handleVisited={handleVisited}
                        lang={lang}
                        paymentType={paymentType}
                        room={room}
                        user={user}
                    />
                }
            </Collapse>
        </div>
    );
};

Step5.propTypes = {
    activeStep: PropTypes.number.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    btToken: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleCollapse: PropTypes.func.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    paymentType: PropTypes.string.isRequired,
    room: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Step5;
