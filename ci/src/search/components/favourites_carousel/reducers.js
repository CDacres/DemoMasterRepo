const favourites = (state = [], action) => {
    switch (action.type) {
    case 'SET_FAVOURITES':
        return action.favourites;
    case 'ADD_FAVOURITE':
        return [
            ...state,
            action.favourite
        ];
    case 'REMOVE_FAVOURITE':
        return state.filter(favourite => Number(favourite.id) !== action.id);
    default:
        return state;
    }
};

const slider = (state = {}, action) => {
    switch (action.type) {
    case 'SET_SLIDER':
        return {
            ...state,
            columns: action.slider.columns,
            height: action.slider.height
        };
    default:
        return state;
    }
};

export {
    favourites,
    slider
};
