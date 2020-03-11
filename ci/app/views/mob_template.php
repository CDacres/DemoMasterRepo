<!DOCTYPE html>
<html lang="<?php echo config_item('language_code');?>" class="ui-mobile">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <meta http-equiv="window-target" content="_top" />
        <meta http-equiv="content-style-type" content="text/css" />
        <meta http-equiv="content-script-type" content="text/javascript" />
        <!-- needs to be at top of head!! -->
        <script>
            window.dataLayer = window.dataLayer || [];
            <?php
                if (isset($dataLayer))
                {
                    ?>
                    dataLayer.push(<?php echo json_encode($dataLayer);?>);
                    <?php
                }
            ?>
        </script>
        <?php
            if (defined('ENVIRONMENT') && ENVIRONMENT == 'production')
            {
        ?>
                <!-- Google Tag Manager -->
                <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-K3TTXZ');</script>
                <!-- End Google Tag Manager -->

                <!-- Google Call Conversion Metrics -->
                <script type="text/javascript">
                    ;(function(a,e,c,f,g,h,b,d){var k={ak:"931280193",cl:"GOQ-CPX97W4QweqIvAM"};a[c]=a[c]||function(){(a[c].q=a[c].q||[]).push(arguments)};a[g]||(a[g]=k.ak);b=e.createElement(h);b.async=1;b.src="//www.gstatic.com/wcm/loader.js";d=e.getElementsByTagName(h)[0];d.parentNode.insertBefore(b,d);a[f]=function(b,d,e){a[c](2,b,k,d,null,new Date,e)};a[f]()})(window,document,"_googWcmImpl","_googWcmGet","_googWcmAk","script");

                    //Replace with business's phone number EXACTLY as it appears on the website.
                    var business_number = "<?php echo $phone_number_display;?>";

                    //Replace with business's phone number without spaces or symbols.
                    var business_number_unformatted = "<?php echo $phone_number;?>";

                    function callback(formattedNumber, mobileNumber) {

                        // get all possible elements on the page...
                        var elements = [];
                        elements.push(document.querySelector('#phone_number'));
                        elements.push(document.querySelector('#contact_us_phone_number'));
                        elements.push(document.querySelector('#venue_phone_number'));
                        elements.push(document.querySelector('#room_phone_number'));
                        elements.push(document.querySelector('#room_mobile_phone_number'));
                        elements.push(document.querySelector('#contact_us_mobile_phone_number'));

                        // loop each element and change values
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                            if (element) {
                                element.innerHTML = "";
                                element.appendChild(document.createTextNode(formattedNumber));
                                if (element.hasAttribute('href')) {
                                    element.href = "tel:" + mobileNumber;
                                }
                            }
                        }
                    };

                    //The line of code below is for testing with GTM's debug mode.
                    //It replaces the business phone number with a testing number (01234 567891).
                    //window.onload = callback('01234 567891', '+4401234567891');

                    //This code executes everything. When you're done testing and you're ready to publish the
                    //GTM container, place '//' in front of the code above, and remove the '//' below.
                    window.onload = _googWcmGet(callback, business_number);
                </script>

                 <!-- facebook pixel -->
                <noscript>
                    <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=170331983385803&ev=PageView&noscript=1" />
                </noscript>
                <?php
            }
            $this->load->view(MOBILE_THEME_FOLDER . '/includes/mob_head');
        ?>
    </head>
    <body class="ui-mobile-viewport ui-overlay-a noscroll">
        <!-- needs to be at top of body!! -->
        <?php
            if (defined('ENVIRONMENT') && ENVIRONMENT == 'production')
            {
        ?>
                <!-- Google Tag Manager (noscript) -->
                <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K3TTXZ"
                height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                <!-- End Google Tag Manager (noscript) -->
                <?php
            }
        ?>
            <div id="fb-root"></div>
            <script>
                (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.8&appId=286304788451093";
                fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            </script>
            <?php
                $this->load->view(MOBILE_THEME_FOLDER . '/' . $message_element);
        ?>
        <div data-role="page" id="main-menu" data-url="main-menu" data-no-loading-indicator="true" tabindex="0" class="ui-page ui-page-theme-a">
            <div class="head no-buttons ui-header ui-bar-inherit" data-role="header">
                <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('common_menu');?></h1>
                <a id="main-menu-hide" data-rel="back" data-direction="reverse" data-role="button" class="button-hide ui-btn-right ui-link ui-btn ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_hide');?></a>
            </div>
            <div class="content ui-content" role="main">
                <ul class="simple-list ui-listview" data-role="listview">
                    <li class="ui-first-child">
                        <a href="/<?php echo $country_lang_url;?>" class="ui-btn ui-btn-icon-right ui-icon-carat-r" rel="external" data-ajax="false"><?php echo $lang->line('common_home');?></a>
                    </li>
                </ul>
                <?php
                    echo '<ul id="search_tabs" class="simple-list rooms-types ui-listview" data-role="listview">';
                    if (isset($default_tags) && count($default_tags) > 0)
                    {
                        foreach ($default_tags as $default_tag)
                        {
                            echo '<li><a title="' . $default_tag->get('home_label') . '" href="/' . $country_lang_url . '/s/' . $default_tag->get('quick_slug') . '" class="ui-btn ui-btn-icon-right ui-icon-carat-r" rel="external" data-ajax="false">' . $default_tag->get('home_label') . '</a></li>';
                        }
                    }
                    echo '</ul>';
                ?>
            </div>
        </div>
        <?php
            foreach ($reserved_js_post as $jScript)
            {
                echo '<script src="' . $jScript . '" type="text/javascript"></script>';
            }
        ?>
    </body>
</html>