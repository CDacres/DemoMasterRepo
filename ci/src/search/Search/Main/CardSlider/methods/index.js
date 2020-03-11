
export const getCardProportions = (cardWidth) => {
    const proportions = {};
    switch (cardWidth) {
    case 'square':
        proportions.width = 16.6667;
        proportions.padding = 100;
        break;
    case 'portraitLarge':
        proportions.width = 16.6667;
        proportions.padding = 150;
        break;
    case 'portraitSmall':
        proportions.width = 12.5;
        proportions.padding = 150;
        break;
    default:
        proportions.width = 20;
        proportions.padding = 66.6667;
        break;
    }
    return proportions;
};
