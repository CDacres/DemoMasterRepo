
const actions = {
    applyFilterGroup: (filterGroup, filterGroupIndex) => ({
        type: 'APPLY_FILTER_GROUP',
        payload: {
            filterGroup,
            filterGroupIndex
        }
    }),
    clearAllFilters: () => ({
        type: 'CLEAR_ALL_FILTERS'
    }),
    changeVertical: verticalIndex => ({
        type: 'CHANGE_VERTICAL',
        payload: {
            verticalIndex
        }
    }),
    domContentLoaded: () => ({
        type: 'DOM_CONTENT_LOADED'
    }),
    paginateNext: () => ({
        type: 'PAGINATE_NEXT'
    }),
    paginatePrev: () => ({
        type: 'PAGINATE_PREV'
    }),
    selectDate: date => ({
        type: 'SELECT_DATE',
        payload: {
            date
        }
    }),
    selectEventType: eventType => ({
        type: 'SELECT_EVENT_TYPE',
        payload: {
            eventType
        }
    }),
    selectGuests: guests => ({
        type: 'SELECT_GUESTS',
        payload: {
            guests
        }
    }),
    selectLocation: location => ({
        type: 'SELECT_LOCATION',
        payload: {
            location
        }
    }),
    setActiveFilterGroup: filterGroupIndex => ({
        type: 'SET_ACTIVE_FILTER_GROUP',
        payload: {
            filterGroupIndex
        }
    }),
    toggleFavourite: roomId => ({
        type: 'TOGGLE_FAVOURITE',
        payload: {
            roomId
        }
    }),
    toggleFullScreenPanel: () => ({
        type: 'TOGGLE_FULL_SCREEN_PANEL'
    }),
    toggleMapPanel: () => ({
        type: 'TOGGLE_MAP_PANEL'
    }),
    toggleNavDropdown: () => ({
        type: 'TOGGLE_NAV_DROPDOWN'
    }),
    toggleSearchOnMapMove: () => ({
        type: 'TOGGLE_SEARCH_ON_MAP_MOVE'
    })
};

export default actions;
