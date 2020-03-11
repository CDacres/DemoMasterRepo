$(document).ready(function()
{
    attachEventTriggers();
    if (!!$(".sidebar-auto-wrapper"))
    {
        fixMenuOnScrollHandler();
    }
    initiateObjects();
    loadFancyBox();
});

function loadFancyBox()
{
    $(".fancybox").fancybox(
    {
        tpl: {
            closeBtn: '<a title="Close" class="close fancybox-item fancybox-close" href="javascript:;"><span>×</span></a>'
        },
        maxWidth: 550,
        maxHeight: 400,
        fitToView: false,
        width: '75%',
        height: '75%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
    $(".map-iframe").fancybox(
    {
        tpl: {
            closeBtn: '<a title="Close" class="close fancybox-item fancybox-close" href="javascript:;"><span>×</span></a>'
        },
        maxWidth: 550,
        maxHeight: 400,
        fitToView: false,
        width: '80%',
        height: '80%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none'
    });
}

function attachEventTriggers()
{
    attachToggleClick();
    attachSmoothAnchorScroll();
}

function attachToggleClick()
{
    $(".toggler-offer-content").hide();
    $(".toggler-offer").click(function()
    {
        $(this).next(".toggler-offer-content").slideToggle(500);
    });
}

function attachSmoothAnchorScroll()
{
    $(".anchor-links-wrapper a").click(function(e)
    {
        e.preventDefault();
        var section = this.id.replace("_link", "");
        var position = $('#' + section).offset().top;
        if (handleStickyMenu(position)) //if the sticky menu has been attached, it changes layout, so recalculate
        {
            position = $('#' + section).offset().top;
        }
        $("html, body").animate(
        {
            scrollTop: position-100
        }, 300);
        $(".anchor-links-wrapper li").removeClass('on');
        $(this).parent().parent().addClass('on');
    });
    $("#book_now").click(function()
    {
        var position = $('#spaces').offset().top;
        if (handleStickyMenu(position)) //if the sticky menu has been attached, it changes layout, so recalculate
        {
            position = $('#spaces').offset().top;
        }
        $("html, body").animate(
        {
            scrollTop: position-100
        }, 300);
    });
}

function fixMenuOnScrollHandler()
{
    $(function()
    {
        $(window).scroll(function()
        {
            handleStickyMenu($(window).scrollTop());
            handleStickyBookButtons($(window).scrollTop());
        });
    });
}

function handleStickyMenu(scroll)
{
    var sticky = true;
    var header = $(".sticky-wrapper");
    if (scroll >= 460)
    {
        header.addClass("sticky-menu-room");
    }
    else
    {
        sticky = false;
        header.removeClass("sticky-menu-room");
    }
    return sticky;
}

function handleStickyBookButtons(scroll)
{
    var sticky = true;
    var header = $(".sidebar-auto-wrapper");
    if (scroll >= 180)
    {
        header.addClass("sticky-book");
    }
    else
    {
        sticky = false;
        header.removeClass("sticky-book");
    }
    return sticky;
}

function initiateObjects()
{
    $('#add').click(function() {
        var section = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(section).offset().top-150
        }, 300);
    });
}