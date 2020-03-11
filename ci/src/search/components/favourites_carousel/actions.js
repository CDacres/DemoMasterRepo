const actions = {
    setFavourites: favourites => ({
        type: 'SET_FAVOURITES',
        favourites
    }),
    addFavourite: favourite => ({
        type: 'ADD_FAVOURITE',
        favourite
    }),
    removeFavourite: id => ({
        type: 'REMOVE_FAVOURITE',
        id
    }),
    setSlider: slider => ({
        type: 'SET_SLIDER',
        slider
    })
};

export default actions;
