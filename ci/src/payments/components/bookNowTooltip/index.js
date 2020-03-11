/* global $ */

const template = $('#book-now-tooltip').html();

function setBookNowTooltip() {
    $('#we-price-match-tooltip').tooltip({
        container: '.proceed',
        placement: 'top',
        html: true,
        title: template,
        template: '<div class="tooltip price-match-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    });
}

export default setBookNowTooltip;
