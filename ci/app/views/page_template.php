<!DOCTYPE html>
<html lang="<?php echo config_item('language_code');?>">
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
                    foreach ($dataLayer as $item)
                    {
                        ?>
                        dataLayer.push(<?php echo json_encode($item);?>);
                        <?php
                    }
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
                <?php
                    if (!$this->dx_auth->is_admin())
                    {
                ?>
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
                        <!-- End Google Call Conversion Metrics -->
                        <?php
                    }
            }
            $this->load->view(THEME_FOLDER . '/includes/header');
            echo '<script src="' . manifest_item('manifest.js') . '" type="text/javascript"></script>';
            echo '<script src="' . manifest_item('vendor.js') . '" type="text/javascript"></script>';
            if (!$remove_legacy_assets)
            {
                echo '<script src="' . auto_version('jquery_plugins/jquery.cookie.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('jquery_plugins/jquery.validate.min.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('jquery_plugins/jquery.query-object.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('lodash/lodash.min.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('jquery_plugins/jquery.browser.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('common.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('moment/moment.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('jquery_plugins/jquery.fancybox.js') . '" type="text/javascript"></script>';
                echo '<script src="' . auto_version('currency/currency.js') . '" type="text/javascript"></script>';
            }
            if (defined('ENVIRONMENT') && ENVIRONMENT == 'production' && !$this->dx_auth->is_admin())
            {
                echo '<script src="' . auto_version('hubspot_tracking.js') . '" type="text/javascript"></script>';
            }
//            TODO: add &amp;region=' . $country_lang_url . ' when region biasing is needed
            echo '<script src="https://maps.googleapis.com/maps/api/js?v=3.40&amp;language=' . config_item('language_code') . '&amp;libraries=places,geometry&amp;key=AIzaSyDnWODbV69tYJm9PxIV_1vXuA2j679QCVE" type="text/javascript"></script>';
        ?>
    </head>
    <body class="<?php echo $reserved_body_class;?>" data-class="<?php echo $this->router->fetch_class();?>" data-method="<?php echo $this->router->fetch_method();?>">
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
            if (!$this->dx_auth->is_admin())
            {
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
            }
            echo '<div class="alert" role="alert" style="display: none;"></div>';
            echo '<div id="sidebar_container"></div>';
            if ($reserved_show_menu || isset($nav_component))
            {
                $this->load->view(THEME_FOLDER . '/includes/navigation');
            }
            elseif ($reserved_widget_mode)
            {
                $this->load->view(THEME_FOLDER . '/includes/widget_navigation');
            }
            if ($msg = $this->session->flashdata('flash_message'))
            {
                echo $msg;
            }
            $this->load->view(THEME_FOLDER . '/' . $message_element);
            if ($reserved_full_modal)
            {
                $this->load->view(THEME_FOLDER . '/modals/fullpage');
            }
            if ($reserved_show_footer)
            {
                $this->load->view(THEME_FOLDER . '/includes/footer');
            }
            elseif ($reserved_widget_mode)
            {
                $this->load->view(THEME_FOLDER . '/includes/widget_footer');
            }
            if (!$remove_legacy_assets)
            {
                echo '<script src="' . manifest_item('shared.js') . '" type="text/javascript"></script>';
                echo '<script src="' . manifest_item('common.js') . '" type="text/javascript"></script>';
            }
            foreach ($reserved_js_post as $jScript)
            {
                echo '<script src="' . $jScript . '" type="text/javascript"></script>';
            }
            if (!$remove_legacy_assets)
            {
                ?>
                <div class="modal" id="mainModal" tabindex="-1" role="dialog">
                    <div class="modal-dialog">
                        <div class="modal-content-wrapper">
                            <div id="modal_slide_up_content" class="modal-content"></div>
                        </div>
                    </div>
                </div>
                <?php
                if ($reserved_full_dimension_modal)
                {
                    $this->load->view(THEME_FOLDER . '/modals/fulldimension');
                }
            }
                ?>
    </body>
</html>
