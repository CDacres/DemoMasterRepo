/* global $ */

// import "./hero_slider.css";

function attachUnsliderToHeroSlider() {
    $('#main-carousel').unslider({
        infinate: true,
        delay: 6000,
        nav: false,
        arrows: $('.main-carousel-image').length > 1
    });

    $('.main-carousel-image').each(function() {
        // Preload background image and replace placeholder
        const $img = $(`<img src="${$(this).data('image-url')}">`);
        $img.bind('load', () => {
            $(this).css('background-image', `url(${$(this).data('image-url')})`);
            $(this).show();
        });
        if ($img[0].width) $img.trigger('load');
    });
}

export default attachUnsliderToHeroSlider;
