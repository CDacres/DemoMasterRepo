import React, { PropTypes } from 'react';

function UserInput({ id, name, value, label, handleChange }) {
    return (
        <div className="login-form-input-row-wrapper">
            <div className="login-form-input-row-container">
                <label className="hidden-label">{label}</label>
                <div className="login-form-input-icon">
                    <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        focusable="false"
                        style={{ display: 'block', fill: 'currentcolor', height: '1em', width: '1em' }}
                    >
                        <path
                            fillRule="evenodd"
                            d="M14.757 11.376a6.014 6.014 0 0 0 3.283-5.357A6.02 6.02 0 0 0 6 6.02a6.014 6.014 0 0 0 3.269 5.35C4.46 12.586-.003 16.676 0 20.072.001 21.634 6.803 24 12 24c5.226 0 12-2.343 12-3.929 0-3.389-4.447-7.47-9.243-8.695zM7 6.019a5.02 5.02 0 0 1 10.04 0c0 2.69-2.12 4.866-4.778 4.995-.087-.002-.175-.014-.262-.014-.078 0-.157.01-.236.013C9.113 10.877 7 8.703 7 6.019zm15.904 14.087a3.8 3.8 0 0 1-.642.444c-.623.36-1.504.746-2.52 1.097C17.332 22.482 14.557 23 12 23c-2.55 0-5.321-.523-7.742-1.365-1.013-.352-1.895-.74-2.52-1.1-.468-.269-.738-.513-.738-.464-.003-3.35 5.55-7.847 10.642-8.052.126.008.25.02.378.02.12 0 .238-.012.357-.019 5.085.216 10.624 4.705 10.623 8.051 0-.066-.02-.035-.096.035z"
                        />
                    </svg>
                </div>
                <div className="login-form-input-wrapper">
                    <div className="login-form-input-container">
                        <input
                            type="text"
                            aria-label={label}
                            className="login-form-input"
                            id={id}
                            name={name}
                            placeholder={label}
                            autoComplete="off"
                            value={typeof value !== 'undefined' ? value : ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

UserInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default UserInput;
