$(document).ready(function()
{
    initSubmenu();
    submenuHover();
});

function initSubmenu()
{
    $(document).mouseup(function(e)
    {
        var container = $('#secondary_nav_wrapper');
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            $('.nav-unit').removeClass('on');
            $('.subnav-wrapper').hide();
            $('.subnav').hide();
        }
    });
    $('.nav-unit').click(function()
    {
        if ($(this).hasClass('on'))
        {
            $(this).toggleClass('on');
            $('.subnav-wrapper').hide();
            $('.subnav').hide();
        }
        else
        {
            $('.nav-unit').removeClass('on');
            $('.subnav-wrapper').hide();
            $('.subnav').hide();
            var id = $(this).attr('data-tab-id');
            $(this).toggleClass('on');
            $('.subnav-wrapper').show();
            $('.tab-' + id).show();
        }
    });
}

function submenuHover()
{
    $('.country').hover(function()
    {
        $('.city').hide();
        $('.city.' + $(this).attr('country')).show();
    });
}
