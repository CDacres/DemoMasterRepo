
import React, { PropTypes } from 'react';
import shortid from 'shortid';

const CardExpirySelect = ({ id, name, options, handleChange, value }) => {
    const optionElements = options.map(
        (option) => (
            <option
                key={shortid.generate()}
                value={option}
            >{option}</option>
        )
    );
    return (
        <div className="reactSelect">
            <div className="reactSelectContainer">
                <div className="reactSelectContainerselectContainer">
                    <select
                        id={id}
                        name={name}
                        className="reactSelectContainerSelect"
                        value={value}
                        onChange={handleChange}
                    >
                        {optionElements}
                    </select>
                </div>
                <span className="selectArrow">
                    <svg
                        viewBox="0 0 18 18"
                        aria-hidden="true"
                        focusable="false"
                        className="selectSvg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1   1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"
                        />
                    </svg>
                </span>
            </div>
        </div>
    );
};


CardExpirySelect.propTypes = {
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default CardExpirySelect;
