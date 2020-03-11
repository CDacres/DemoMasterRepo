
import React from 'react';
import PropTypes from 'prop-types';

// import FilterGroupAutocomplete from './FilterGroupAutocomplete';
import FilterGroupSmall from './FilterGroupSmall';

const FilterGroup = ({ filterGroup, filterGroupIndex }) => {
    switch (filterGroup.type) {
    // case 'autocomplete':
    //     return (
    //         <FilterGroupAutocomplete
    //             filterGroup={filterGroup}
    //             filterGroupIndex={filterGroupIndex}
    //         />
    //     );
    default:
        return (
            <FilterGroupSmall
                filterGroup={filterGroup}
                filterGroupIndex={filterGroupIndex}
            />
        );
    }
};

FilterGroup.propTypes = {
    filterGroup: PropTypes.object.isRequired,
    filterGroupIndex: PropTypes.number.isRequired
};

export default FilterGroup;
