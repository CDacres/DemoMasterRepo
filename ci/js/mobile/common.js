$(document).on('pagecontainershow', function() {
    setRatingStars();
    homePageLoader();
    if (typeof $.mobile !== 'undefined') {
        $.mobile.silentScroll(0);
    }
});

function setRatingStars() {
    $('.star_rating').each(function() {
        var rating = $(this).attr('zc_rating');
        var fullStarCount = Math.floor(rating);
        $rating = $(this);
        $rating.find('span:lt(' + fullStarCount + ')').addClass('filled-star');
        if (rating % 1 !== 0) {
            $rating.find('span:eq(' + fullStarCount + ')').addClass('half-star');
        }
    });
}

function homePageLoader() {
    $('a.ui-btn.ui-btn-icon-right.ui-icon-carat-r.loader-start').click(function(event) {
        event.preventDefault();
        $.mobile.loading('show');
        var url = $(this).attr('url-param');
        setTimeout(function() {
            window.location.href = url;
            $.browser.iphone && $.mobile.loading('hide');
        }, 50);
    });
}
