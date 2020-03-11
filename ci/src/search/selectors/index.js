
import { createSelector } from 'reselect';

import { concatMap } from '../methods';

const getActiveVerticalIndex = ({ activeVerticalIndex }) => activeVerticalIndex;
const getVerticals = ({ verticals }) => verticals;
// const getSearchResults = ({ searchResults }) => searchResults;

export const getActiveFilterCount = createSelector(
    [ getActiveVerticalIndex, getVerticals ],
    (activeVerticalIndex, verticals) =>
        concatMap(verticals[activeVerticalIndex].filterGroups, filterGroup =>
            filterGroup.filters
        ).filter(filter =>
            filter.inputType === 'checkbox' && filter.data.value ||
            filter.inputType === 'toggle-switch' && filter.data.value ||
            filter.inputType === 'radio' && filter.data.value ||
            filter.inputType === 'increment' && filter.data.value > filter.data.min
        ).length
);

// export const getUserFavourites = createSelector(
//     [ getSearchResults ],
//     (searchResults) =>
//         searchResults.rooms.filter(room => {
//             return room.isFavourite === true;
//         })
// );
