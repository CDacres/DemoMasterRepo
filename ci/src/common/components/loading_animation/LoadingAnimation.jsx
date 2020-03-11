/* global $ */

import React from 'react';

function LoadingAnimation() {
    return (
        <div className="loading-container">
            <div className="loader">
                <div className="circleG-container">
                    <div className="circleG circleG_1"></div>
                    <div className="circleG circleG_2"></div>
                    <div className="circleG circleG_3"></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingAnimation;
