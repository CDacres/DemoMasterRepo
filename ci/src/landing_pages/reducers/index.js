
const rootReducer = (state = {}, action) => {
    switch (action.type) {
    case 'CHANGE_VERTICAL': {
        const { usageSuperset } = action.payload;
        return {
            ...state,
            usageSuperset
        };
    }
    case 'REQUEST_SEARCH_VERTICALS': {
        return state;
    }
    case 'RECEIVE_SEARCH_VERTICALS': {
        const { verticals } = action.payload;
        return {
            ...state,
            verticals
        };
    }
    case 'REQUEST_TAGS': {
        return state;
    }
    case 'RECEIVE_TAGS': {
        const { tags } = action.payload;
        return {
            ...state,
            tags
        };
    }
    case 'SELECT_DATE': {
        const { date } = action.payload;
        return {
            ...state,
            date
        };
    }
    case 'SELECT_GUEST_OPTION': {
        const { guests } = action.payload;
        return {
            ...state,
            guests
        };
    }
    case 'SELECT_LOCATION': {
        const { location } = action.payload;
        return {
            ...state,
            location_string: location,
            locationSelected: true
        };
    }
    case 'SELECT_TAG': {
        const { tag } = action.payload;
        return {
            ...state,
            tag
        };
    }
    case 'SET_DEFAULT_TAG': {
        return {
            ...state,
            tag: state.tags.defaultTags[0]
        };
    }
    case 'SET_TAG_LABEL': {
        const { tagLabel } = action.payload;
        return {
            ...state,
            tagLabel
        };
    }
    default:
        return state;
    }
};

export default rootReducer;
