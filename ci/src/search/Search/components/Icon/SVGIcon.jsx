
import React from 'react';
import PropTypes from 'prop-types';
import { clone } from 'ramda';

const SVGIcon = (props) => {
    const properties = clone(props);
    const path = properties.path;
    delete properties.path;
    return (
        <svg
            role="presentation"
            aria-hidden="true"
            focusable="false"
            {...properties}
        >
            <path
                fillRule="evenodd"
                d={path}
            />
        </svg>
    );
};

SVGIcon.propTypes = {
    path: PropTypes.string.isRequired
};

export default SVGIcon;
