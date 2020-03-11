import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const RadioBlockItem = ({
    config_id,
    defaultSelect,
    desc,
    handleChange,
    itemState,
    lang,
    name,
    step,
    value
}) => {
    let panelClass = 'blockRadioPanel';
    switch (itemState) {
    case 1:
        panelClass = 'blockRadioPanelFirst';
        break;
    case 2:
        panelClass = 'blockRadioPanelLast';
        break;
    }
    return (
        <div className="reactRadioBlockItem">
            <div className="blockRadioButton">
                <label className={panelClass}>
                    <div className="row" className="noMarginH">
                        <div className="blockRadioButtonIconContainer">
                            <span
                                className={`blockRadioButtonIcon ${desc.toLowerCase()}`}
                            />
                        </div>
                        <div className="blockRadioButtonLabel">
                            {lang.common[desc]}
                        </div>
                        <div className="blockRadioInputContainer">
                            <input
                                id={`roomconf_${config_id}`}
                                type="radio"
                                value={value}
                                className="blockRadioInput"
                                name={name}
                                checked={step[2].configuration === config_id || defaultSelect}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </label>
            </div>
        </div>
    );
};

RadioBlockItem.propTypes = {
    config_id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    content: PropTypes.object,
    defaultSelect: PropTypes.bool,
    desc: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    itemState: PropTypes.number,
    lang: PropTypes.object.isRequired,
    name: PropTypes.string,
    step: PropTypes.object.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const mapStateToProps = ({ step }) => ({ step });

export default connect(mapStateToProps)(RadioBlockItem);
