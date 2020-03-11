<?php
    if (isset($AB_test))
    {
?>
        <!-- Google Analytics Content Experiment code -->
        <script>
            function utmx_section() {
            }
            function utmx() {
            }
            (function () {
                var
                    k = '79449727-1', d = document, l = d.location, c = d.cookie;
                if (l.search.indexOf('utm_expid=' + k) > 0)return;
                function f(n) {
                    if (c) {
                        var i = c.indexOf(n + '=');
                        if (i > -1) {
                            var j = c.indexOf(';', i);
                            return escape(c.substring(i + n.length + 1, j < 0 ? c.length : j))
                        }
                    }
                }

                var x = f('__utmx'), xx = f('__utmxx'), h = l.hash;
                d.write(
                    '<sc' + 'ript src="' + 'http' + (l.protocol == 'https:' ? 's://ssl' :
                        '://www') + '.google-analytics.com/ga_exp.js?' + 'utmxkey=' + k +
                    '&utmx=' + (x ? x : '') + '&utmxx=' + (xx ? xx : '') + '&utmxtime=' + new Date().valueOf() + (h ? '&utmxhash=' + escape(h.substr(1)) : '') +
                    '" type="text/javascript" charset="utf-8"><\/sc' + 'ript>')
            })();
        </script>
        <script>utmx('url', 'A/B');</script>
        <!-- End of Google Analytics Content Experiment code -->
        <?php
    }
    if (defined('ENVIRONMENT') && ENVIRONMENT == 'development')
    {
//        echo "<script type='text/javascript'>";
//        if (isset($debugOutput))
//        {
//            foreach ($debugOutput as $line)
//            {
//                if (trim($line))
//                {
//                    echo "console.log(\"" . addslashes(str_replace(array("\r", "\n"), "", $line)) . "\");";
//                }
//            }
//        }
//        echo '</script>';
    }
        ?>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<?php
    if (isset($reserved_meta_description))
    {
        echo '<meta name="description" content="' . $reserved_meta_description . '" />';
    }
    if (isset($reserved_meta_keyword))
    {
        echo '<meta name="keywords" content="' . $reserved_meta_keyword . '" />';
    }
    if (isset($reserved_no_index) && $reserved_no_index == true)
    {
        echo '<meta name="robots" content="noindex" />';
    }
?>
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=0"/>
<meta name="apple-touch-fullscreen" content="yes">
<meta name="apple-mobile-web-app-title" content="Zipcube">
<meta name="apple-mobile-web-app-status-bar-style" content="white">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<!-- end META CONTENT -->
<title>
    <?php
        if (isset($reserved_title))
        {
            echo $reserved_title;
        }
        else
        {
            echo '';
        }
    ?>
</title>
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
<link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
<link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
<link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
<link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
<?php
    if (isset($reserved_canon_link) && $reserved_canon_link != false)
    {
        echo '<link rel="canonical" href="' . $reserved_canon_link . '" />';
    }
?>
<link rel="stylesheet" href="<?php echo auto_version('mobile/jquery.mobile.icons.min.css');?>"/>
<link rel="stylesheet" href="//code.jquery.com/mobile/1.4.5/jquery.mobile.structure-1.4.5.min.css"/>
<link rel="stylesheet" href="<?php echo auto_version('font-awesome-4.7.0/css/font-awesome.min.css');?>"/>
<?php
    if (isset($jQueryUI) && $jQueryUI != false)
    {
        echo '<link rel="stylesheet" href="' . auto_version('mobile/jquery-ui-1.10.1.custom.min.css') . '"/>';
    }
?>
<link rel="stylesheet" href="<?php echo auto_version('common.css');?>"/>
<link rel="stylesheet" href="<?php echo auto_version('mobile/zipcube.css');?>"/>
<?php
    foreach ($reserved_css as $cScript)
    {
        echo $cScript . "\n\r";
    }
?>
<link rel="stylesheet" href="<?php echo auto_version('mobile/custom.css');?>"/>
<script src="//code.jquery.com/jquery-1.11.1.min.js" type="text/javascript"></script>
<script src="//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js" type="text/javascript"></script>
<script>
    $(document).on('pagecontainershow',function() {
        setRatingStars();
    });
</script>
<script src="<?php echo auto_version('lodash/lodash.min.js');?>" type="text/javascript"></script>
<script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
<?php
// TODO: add &amp;region=' . $country_lang_url . ' when region biasing is needed
?>
<script src="//maps.googleapis.com/maps/api/js?v=3.40&amp;language=<?php echo config_item('language_code');?>&amp;libraries=places&amp;key=AIzaSyDnWODbV69tYJm9PxIV_1vXuA2j679QCVE" type="text/javascript"></script>
<script src="<?php echo auto_version('url.min.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('common.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('bootstrap.min.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('jquery_plugins/jquery.viewport.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('jquery_plugins/jquery.browser.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('jquery_mobile.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('mobile/webapplinks.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('mobile/common.js');?>" type="text/javascript"></script>
<script src="<?php echo auto_version('mobile/mobile_search.js');?>" type="text/javascript"></script>
<?php
    if (count($reserved_js_variables) > 0)
    {
        echo '<script type="text/javascript">' . js_variables_to_script($reserved_js_variables) . '</script>';
    }
    foreach ($reserved_js_pre as $jScript)
    {
        echo '<script src="' . $jScript . '" type="text/javascript"></script>';
    }
