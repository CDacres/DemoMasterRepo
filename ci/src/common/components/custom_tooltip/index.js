import './CustomTooltip.css';

function CustomTooltip($element, container) {
    $element.tooltip({
        container,
        placement: 'top',
        html: true,
        template: '<div class="tooltip custom-tooltip-layout" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    });
}

export default CustomTooltip;
