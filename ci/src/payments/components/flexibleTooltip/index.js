/* global $ */

function setFlexibleTooltip() {
    $('#flexible-tooltip').tooltip({
        container: '.proceed',
        placement: 'top',
        html: true,
        title: '<span class="tooltip-title">We price match</span><br><span class="glyphicon glyphicon-ok recommended-tick pull-left" aria-hidden="true"></span>Low rates • No booking fees • Find cheaper? We\'ll refund the difference!',
        template: '<div class="tooltip price-match-tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    });
}

export default setFlexibleTooltip;
