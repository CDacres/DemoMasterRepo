
import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';

import SectionHeading from '../../components/SectionHeading';
import FlexibleTable from './FlexibleTable';
import ProgressButton from '../components/ProgressButton';

const Step4 = ({
    activeStep,
    bookingRequest,
    flex,
    handleCollapse,
    handleRadioChange,
    handleVisited,
    lang
}) => {
    let flexible = true;
    if (flex !== 'true') {
        flexible = false;
    }
    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <SectionHeading
                        handleCollapse={handleCollapse}
                        headingText={lang.payments.payments_index_form_flexible_heading}
                        lang={lang}
                        stepNo="4"
                    />
                </div>
            </div>
            <Collapse
                isOpened={activeStep === 4}
                style={{ width: '100%' }}
            >
                {activeStep === 4 &&
                    <div>
                        <FlexibleTable
                            cancelPrice={bookingRequest.cancel_price.toFixed(2)}
                            currencySymbol={bookingRequest.currency_symbol_left}
                            handleRadioChange={handleRadioChange}
                            handleVisited={handleVisited}
                            flex={flexible}
                            lang={lang}
                            price={bookingRequest.base_price.toFixed(2)}
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

Step4.propTypes = {
    activeStep: PropTypes.number.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    flex: PropTypes.string.isRequired,
    handleCollapse: PropTypes.func.isRequired,
    handleRadioChange: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default Step4;
