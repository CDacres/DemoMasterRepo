try
{
    (function(i,s,o,g,r,a,m)
    {
        i['GoogleAnalyticsObject']=r;i[r]=i[r]||function()
        {
            (i[r].q=i[r].q||[]).push(arguments)
        },i[r].l=1*new Date();
        a=s.createElement(o),m=s.getElementsByTagName(o)[0];
        a.async=1;
        a.src=g;
        m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
}
catch (ex)
{
    console.log(ex);
}
if (typeof ga !== 'function')
{
    (function ga()
    {
        console.log('Google Analytics disabled.');
    });
}
ga('create', 'UA-46012545-1', 'auto');
ga('require', 'displayfeatures');
ga('require', 'linkid', 'linkid.js');
ga('require', 'ec');
ga('send', 'pageview');