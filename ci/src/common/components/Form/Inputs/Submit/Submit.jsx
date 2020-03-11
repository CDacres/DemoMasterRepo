import React, { PropTypes } from 'react';

const Submit = ({ id, value, handleClick }) => {
    return (
        <input
            type="button"
            id={id}
            className="btn btn-primary"
            value={value}
            onClick={handleClick}
        />
    );
};

Submit.propTypes = {
    handleClick: PropTypes.func,
    id: PropTypes.string,
    value: PropTypes.string.isRequired
};

export default Submit;
