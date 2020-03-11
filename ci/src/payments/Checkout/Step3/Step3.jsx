
import React from 'react';
import PropTypes from 'prop-types';
import Collapse from 'react-collapse';

import SectionHeading from '../../components/SectionHeading';
import AddOns from './AddOns';
import ProgressButton from '../components/ProgressButton';

const Step3 = ({
    activeStep,
    amenities,
    handleAddOn,
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
                        headingText={lang.payments.payments_index_form_add_ons_heading}
                        lang={lang}
                        stepNo="3"
                    />
                </div>
            </div>
            <Collapse
                isOpened={activeStep === 3}
                style={{ width: '100%' }}
            >
                {activeStep === 3 &&
                    <div>
                        <AddOns
                            amenities={amenities}
                            handleAddOn={handleAddOn}
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

Step3.propTypes = {
    activeStep: PropTypes.number.isRequired,
    amenities: PropTypes.array.isRequired,
    handleAddOn: PropTypes.func.isRequired,
    handleCollapse: PropTypes.func.isRequired,
    handleVisited: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired
};

export default Step3;
