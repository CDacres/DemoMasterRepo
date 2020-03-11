
import initialState from './initialState.js';

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
    case 'APPLY_FILTER_GROUP': {
        const { filterGroup, filterGroupIndex } = action.payload;
        const filterGroups = state.verticals[state.activeVerticalIndex].filterGroups.map((fGroup, index) => {
            if (index !== filterGroupIndex) {
                return fGroup;
            }
            return {
                ...fGroup,
                ...filterGroup
            };
        });
        const verticals = state.verticals.map((vertical, index) => {
            if (index !== state.activeVerticalIndex) {
                return vertical;
            }
            return {
                ...vertical,
                filterGroups
            };
        });
        return {
            ...state,
            verticals
        };
    }
    case 'CLEAR_ALL_FILTERS': {
        const filterGroups = state.verticals[state.activeVerticalIndex].filterGroups.map(filterGroup => {
            const filters = filterGroup.filters.map(filter => {
                return {
                    ...filter,
                    data: {
                        ...filter.data,
                        value: filter.data.default
                    }
                };
            });
            return {
                ...filterGroup,
                filters
            };
        });
        const verticals = state.verticals.map((vertical, index) => {
            if (index !== state.activeVerticalIndex) {
                return vertical;
            }
            return {
                ...vertical,
                filterGroups
            };
        });
        return {
            ...state,
            verticals
        };
    }
    case 'CHANGE_VERTICAL': {
        const { verticalIndex } = action.payload;
        return {
            ...state,
            activeVerticalIndex: Number(verticalIndex)
        };
    }
    case 'DOM_CONTENT_LOADED': {
        return {
            ...state,
            domContentLoading: false
        };
    }
    case 'PAGINATE_NEXT': {
        return {
            ...state,
            pagination: {
                ...state.pagination,
                activePage: state.pagination.activePage + 1
            }
        };
    }
    case 'PAGINATE_PREV': {
        return {
            ...state,
            pagination: {
                ...state.pagination,
                activePage: state.pagination.activePage + 1
            }
        };
    }
    case 'SELECT_DATE': {
        const { date } = action.payload;
        return {
            ...state,
            searchParams: {
                ...state.searchParams,
                date
            }
        };
    }
    case 'SELECT_EVENT_TYPE': {
        const { eventType } = action.payload;
        return {
            ...state,
            searchParams: {
                ...state.searchParams,
                eventType
            }
        };
    }
    case 'SELECT_GUESTS': {
        const { guests } = action.payload;
        return {
            ...state,
            searchParams: {
                ...state.searchParams,
                guests: Number(guests)
            }
        };
    }
    case 'SELECT_LOCATION': {
        const { location } = action.payload;
        return {
            ...state,
            searchParams: {
                ...state.searchParams,
                location
            }
        };
    }
    case 'SET_ACTIVE_FILTER_GROUP': {
        const { filterGroupIndex } = action.payload;
        return {
            ...state,
            activeFilterGroupIndex: Number(filterGroupIndex)
        };
    }
    case 'TOGGLE_FAVOURITE': {
        const { roomId } = action.payload;
        const index = state.user.favourites.indexOf(roomId);
        let favourites = state.user.favourites;
        if (index !== -1) {
            favourites = [
                ...state.user.favourites.slice(0, index),
                ...state.user.favourites.slice(index + 1)
            ];
        } else {
            favourites.push(roomId);
        }
        return {
            ...state,
            user: {
                ...state.user,
                favourites
            }
        };
    }
    case 'TOGGLE_FULL_SCREEN_PANEL': {
        return {
            ...state,
            fullScreenPanel: {
                ...state.fullScreenPanel,
                isVisible: !state.fullScreenPanel.isVisible
            }
        };
    }
    case 'TOGGLE_MAP_PANEL': {
        return {
            ...state,
            mapState: {
                ...state.mapState,
                mapPanelVisible: !state.mapState.mapPanelVisible
            }
        };
    }
    case 'TOGGLE_NAV_DROPDOWN': {
        return {
            ...state,
            navigation: {
                ...state.navigation,
                dropdown: {
                    ...state.navigation.dropdown,
                    isVisible: !state.navigation.dropdown.isVisible
                }
            }
        };
    }
    case 'TOGGLE_SEARCH_ON_MAP_MOVE': {
        return {
            ...state,
            mapState: {
                ...state.mapState,
                searchOnMapMove: !state.mapState.searchOnMapMove
            }
        };
    }
    default:
        return state;
    }
};

export default rootReducer;
