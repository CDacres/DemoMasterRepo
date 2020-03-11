function attachUnsliderToTrustCarousel() {
    const roomSlider = $('.room-carousel').unslider({
        infinite: true,
        delay: 6000,
        nav: false,
        arrows: {
            prev: '<span class="arrow prev glyphicon glyphicon-chevron-left" aria-hidden="true"></span>',
            next: '<span class="arrow next glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
        }
    });
    if ($('.unslider-carousel').find('li').length > 1) $('.unslider').find('.next').show();
    roomSlider.unslider('calculateSlides');
    $('#trust-carousel li').show();
}

export {
    attachUnsliderToTrustCarousel
};
