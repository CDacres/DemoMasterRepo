
export const getActiveFilters = ({ filters }) => {
    return filters.filter(filter =>
        filter.inputType === 'checkbox' && filter.data.value ||
        filter.inputType === 'toggle-switch' && filter.data.value ||
        filter.inputType === 'radio' && filter.data.value ||
        filter.inputType === 'increment' && filter.data.value > filter.data.min
    ).length;
};

export const getAllActiveFilters = (verticals) => {
    return verticals.map(vertical =>
        vertical.filterGroups.map(filterGroup => filterGroup.filters)
            .filter(filter =>
                filter.inputType === 'checkbox' && filter.data.value ||
                filter.inputType === 'toggle-switch' && filter.data.value ||
                filter.inputType === 'radio' && filter.data.value ||
                filter.inputType === 'increment' && filter.data.value > filter.data.min
            ).length);
};
