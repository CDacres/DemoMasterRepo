import React from 'react';
import PropTypes from 'prop-types';

const PromoBox = () => {
    return (
        <div className="reactPromoBox">
            <div className="panel UrgencyCommitmentWrapper--expanded">
                <div className="panel-body">
                    <div className="icon">
                        <div className="textWrapper">
                            <strong>People are eyeing this place.</strong>
                            <div className="space-top-1">
                                38 others are looking at it for these dates.
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

PromoBox.propTypes = {
    country_lang_url: PropTypes.string.isRequired
};

export default PromoBox;
