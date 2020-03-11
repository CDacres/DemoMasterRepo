
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import AddOnSelect from './AddOnSelect';
import { parseLangLine } from '../../../../../lang';

const AddOn = ({
    amenity,
    bookingRequest,
    handleAddOn,
    lang,
    step
}) => {
    const { amenity_desc, cost, currency, filterable, instructions } = amenity;
    const { guests } = bookingRequest;
    const options = [];
    for (let i = 0; i <= guests * 2; i += 1) {
        if (i === 0) {
            options.push({
                text: lang.common.common_none,
                value: i
            });
        } else if (typeof cost !== 'undefined' && cost !== null) {
            const currencySymbol = Currency.getCurrency(currency).symbol;
            options.push({
                text: `${i}${
                    parseLangLine(
                        lang.common.common_amenity_price,
                        `${currencySymbol}${
                            (Math.ceil(100000 * (i * Number(cost))) / 100000).toFixed(2)
                        }`
                    )
                }`,
                value: i
            });
        } else {
            options.push({
                text: i,
                value: i
            });
        }
    }
    return (
        <div className="reactAddOn">
            <div className="addonContainer">
                <div className="addOnTextContainer">
                    <p className="addOnText">
                        {Number(filterable) === 1 ? lang.common[amenity_desc] : amenity_desc}
                        {
                            typeof cost === 'undefined' || cost === null ?
                                ` (${lang.common.common_included})` : ''
                        }
                        {typeof instructions !== 'undefined' && instructions !== '' ?
                            <i
                                className="fa fa-info-circle tippy addOnIcon"
                                aria-hidden="true"
                                data-tip={instructions}
                            /> : null
                        }
                    </p>
                </div>
                <div className="selectContainer">
                    <div className="selectAlign">
                        <AddOnSelect
                            id={`addon_${amenity.id}`}
                            name={`addon_${amenity.id}`}
                            dataAttribute={{
                                cost,
                                desc: amenity_desc
                            }}
                            options={options}
                            value={
                                typeof step[3].addOns[amenity.id] !== 'undefined' ?
                                    Number(step[3].addOns[amenity.id].quantity) :
                                    ''
                            }
                            handleChange={handleAddOn}
                        />
                    </div>
                </div>
            </div>
            <ReactTooltip
                place="right"
                className="addOnTooltip"
                html
            />
        </div>
    );
};

AddOn.propTypes = {
    amenity: PropTypes.object.isRequired,
    bookingRequest: PropTypes.object.isRequired,
    handleAddOn: PropTypes.func.isRequired,
    lang: PropTypes.object.isRequired,
    step: PropTypes.object.isRequired
};

const mapStateToProps = ({ step, bookingRequest }) => ({ step, bookingRequest });

export default connect(mapStateToProps)(AddOn);
