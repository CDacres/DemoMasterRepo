
import React from 'react';
import PropTypes from 'prop-types';

import CarouselRow from './CarouselRow.jsx';
import CarouselRowLoading from './CarouselRowLoading.jsx';

const CarouselRowHOC = ({ children, domContentLoading, heading }) => {
    if (domContentLoading) {
        return (
            <CarouselRowLoading>
                {children}
            </CarouselRowLoading>
        );
    }
    return (
        <CarouselRow
            heading={heading}
        >
            {children}
        </CarouselRow>
    );
};

CarouselRowHOC.propTypes = {
    children: PropTypes.node,
    domContentLoading: PropTypes.bool,
    heading: PropTypes.string
};

export default CarouselRowHOC;
