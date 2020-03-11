
import React from 'react';

const CalendarIcon = () => {
    return (
        <span className="mobile-top-panel__dropdown-icon">
            <svg
                viewBox="0 0 24 24"
                role="presentation"
                aria-hidden="true"
                focusable="false"
                style={{
                    display: 'block',
                    fill: 'currentcolor',
                    height: '1em',
                    width: '1em'
                }}
            >
                <path d="M22 9.5V3h-4.75V1a.75.75 0 1 0-1.5 0v2H8.249l.001-2a.75.75 0 1 0-1.5 0l-.001 2H2v19.008a1 1 0 0 0 .992.992h18.016a1 1 0 0 0 .992-.992V9.5zm-18.5-5h3.248V5a.75.75 0 0 0 1.5 0v-.5h7.502V5a.75.75 0 0 0 1.5 0v-.5h3.25V8h-17V4.5zm0 17v-12h17v12h-17z" fillRule="evenodd" />
            </svg>
        </span>
    );
};

export default CalendarIcon;
