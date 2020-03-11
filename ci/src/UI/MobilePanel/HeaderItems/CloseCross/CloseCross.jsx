
import React from 'react';

const CloseCross = () => {
    return (
        <button aria-haspopup="false" aria-expanded="false" className="mobile-top-panel__dropdown-panel-button-container" type="button" style={{ padding: '20px', margin: '-20px' }}>
            <svg viewBox="0 0 12 12" role="img" aria-label="Close" focusable="false" style={{ display: 'block', fill: 'rgb(72, 72, 72)', height: '15px', width: '15px' }}>
                <path fillRule="evenodd" d="M11.5 10.5c.3.3.3.8 0 1.1-.3.3-.8.3-1.1 0L6 7.1l-4.5 4.5c-.3.3-.8.3-1.1 0-.3-.3-.3-.8 0-1.1L4.9 6 .5 1.5C.2 1.2.2.7.5.4c.3-.3.8-.3 1.1 0L6 4.9 10.5.4c.3-.3.8-.3 1.1 0 .3.3.3.8 0 1.1L7.1 6l4.4 4.5z" />
            </svg>
        </button>
    );
};

export default CloseCross;
