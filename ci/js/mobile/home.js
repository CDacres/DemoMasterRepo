$(document).ready(function()
{
    appClickListener();
});

function appClickListener()
{
    $('.app-smart-banner-footer').click(function()
    {
        loadAddToHomeScreen();
    });
}

function loadAddToHomeScreen()
{
    addToHomescreen({
        startDelay: 0,
        lifespan: 0,
        maxDisplayCount: 0,
        debug: true
    });
    addToHomescreen.removeSession();
}
