import React, { PropTypes } from 'react';

const Input = ({ id, additionalClasses, name, placeholder, type, value, handleChange }) => {
    return (
        <input
            id={id}
            type={type}
            name={name}
            className={`input${additionalClasses.length ? ` ${additionalClasses.join(' ')}` : ''}`}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};

Input.propTypes = {
    additionalClasses: PropTypes.array,
    handleChange: PropTypes.func,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default Input;
