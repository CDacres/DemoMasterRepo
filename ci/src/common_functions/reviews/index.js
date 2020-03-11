/* global $ */

function setStarRatings() {
    $('.star_rating').each(function () {
        const rating = $(this).data('zc_rating');
        const fullStarCount = Math.floor(rating);
        const $rating = $(this);
        $rating.find(`span:lt(${fullStarCount})`).addClass('filled-star');
        if (rating % 1 !== 0) {
            $rating.find(`span:eq(${fullStarCount})`).addClass('half-star');
        }
    });
}

export {
    setStarRatings,
};
