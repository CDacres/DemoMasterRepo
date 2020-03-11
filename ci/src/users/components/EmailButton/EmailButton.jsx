import React, { PropTypes } from 'react';

function EmailButton({ id, buttonText, switchForm }) {
    return (
        <div className="form-social-button-wrapper">
            <button id={id} className="form-social-button-email" onClick={switchForm}>
                <span className="form-social-button-text-email">
                    <div className="form-social-button-text-container">
                        <div className="form-social-button-text-container-child">
                            <div style={{ margin: '0px 12px 0px 0px' }}>
                                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" style={{ display: 'block', fill: 'rgb(255, 255, 255)', height: '18px', width: '18px' }}>
                                    <path fillRule="evenodd" d="M22.497 4H1.503C.665 4 0 4.673 0 5.507v12.985C0 19.326.672 20 1.503 20h20.994A1.5 1.5 0 0 0 24 18.492V5.507C24 4.674 23.328 4 22.497 4zM23 18.203l-6.141-7.907L23 5.628v12.575zM22.174 5l-9.685 7.362c-.259.196-.719.196-.977 0L1.827 5h20.347zM1 5.628l6.14 4.667L1 18.185V5.629zM1.634 19l6.302-8.1 2.97 2.258c.616.468 1.572.468 2.188 0l2.969-2.257L22.353 19H1.633z"></path>
                                </svg>
                            </div>
                        </div>
                        <div className="form-social-button-text-container-child">
                            <span>{buttonText}</span>
                        </div>
                    </div>
                </span>
            </button>
        </div>
    );
}

EmailButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    switchForm: PropTypes.func.isRequired
};

export default EmailButton;
