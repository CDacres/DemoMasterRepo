
import React from 'react';
// import PropTypes from 'prop-types';

const CollapseChevron = () => {
    return (
        <button
            aria-haspopup="false"
            aria-expanded="false"
            className="mobile-top-panel__dropdown-panel-button-container"
            type="button"
            style={{ padding: '20px', margin: '-20px' }}
        >
            <svg
                viewBox="0 0 18 18"
                role="img"
                aria-label="Close"
                focusable="false"
                style= {{
                    display: 'block',
                    fill: 'rgb(72, 72, 72)',
                    height: '16px',
                    width: '16px'
                }}
            >
                <path
                    fillRule="evenodd"
                    d="M1.705 13.705A1 1 0 1 1 .29 12.29l8-7.995a1 1 0 0 1 1.414 0l8 7.995a1 1 0 1 1-1.414 1.415l-7.293-7.29-7.293 7.29z"
                />
            </svg>
        </button>
    );
};

export default CollapseChevron;
