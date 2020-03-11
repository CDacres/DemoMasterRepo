import React from 'react';

function SocialLinks({ lang }) {
    return (
        <div className="social-links-container">
            <div className="social-links-text">
                <button
                    id="facebook_login_button"
                    aria-disabled="false"
                    className="social-links-text-anchor"
                >
                    <span>Facebook</span>
                </button>
                <span> {lang.common.common_or} </span>
                <button
                    id="google_login_button"
                    aria-disabled="false"
                    className="social-links-text-anchor"
                >
                    <span>Google</span>
                </button>
                <span> {lang.common.common_or} </span>
                <button
                    id="linkedin_login_button"
                    aria-disabled="false"
                    className="social-links-text-anchor"
                >
                    <span>LinkedIn</span>
                </button>
            </div>
        </div>
    );
}

export default SocialLinks;
