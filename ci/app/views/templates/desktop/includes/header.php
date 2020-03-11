<?php
    if (isset($AB_test))
    {
?>
        <!-- Google Analytics Content Experiment code -->
        <script>function utmx_section(){}function utmx(){}(function(){var
        k='79449727-1',d=document,l=d.location,c=d.cookie;
        if(l.search.indexOf('utm_expid='+k)>0)return;
        function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
        indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
        length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
        '<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
        '://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
        '&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
        valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
        '" type="text/javascript" charset="utf-8"><\/sc'+'ript>')})();
        </script><script>utmx('url','A/B');</script>
        <!-- End of Google Analytics Content Experiment code -->
        <?php
    }
    if (defined('ENVIRONMENT') && ENVIRONMENT == 'development')
    {
        echo "<script type='text/javascript'>";
        if ($reserved_title === 0)
        {
            echo "alert('Meta Alert');";
        }
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
        echo '</script>';
    }
        ?>
<link href="https://plus.google.com/+Zipcube"  rel="publisher">
<?php
    if (isset($reserved_meta_geo_country))
    {
        echo '<meta name="geo.country" content="' . $reserved_meta_geo_country . '">' . "\r\n";
    }
    if (isset($reserved_meta_geo_position))
    {
        echo '<meta name="geo.position" content="' . $reserved_meta_geo_position . '">' . "\r\n";
    }
    if (isset($reserved_meta_geo_placename))
    {
        echo '<meta name="geo.placename" content="' . $reserved_meta_geo_placename . '">' . "\r\n";
    }
    if (isset($reserved_meta_geo_region))
    {
        echo '<meta name="geo.region" content="' . $reserved_meta_geo_region . '">' . "\r\n";
    }
    if (isset($reserved_meta_country))
    {
        echo '<meta name="country" content="' . $reserved_meta_country . '">' . "\r\n";
    }
    if (isset($reserved_google_site_verification))
    {
        echo '<meta name="google-site-verification" content="' . $reserved_google_site_verification . '">' . "\r\n";
    }
    if (isset($alternate_url))
    {
        foreach ($alternate_url as $lng => $url)
        {
            echo '<link rel="alternate" type="text/html" hreflang="' . $lng . '" href="' . $url . '" />' . "\r\n";
        }
    }
    if (isset($reserved_canonical))
    {
        echo '<link rel="canonical" href="' . $reserved_canonical . '" />' . "\r\n";
    }
    if (isset($reserved_meta_description))
    {
        echo '<meta name="description" content="' . $reserved_meta_description . '" />'."\r\n";
    }
    if (isset($reserved_meta_keywords))
    {
        echo '<meta name="keywords" content="' . $reserved_meta_keywords . ', Zipcube" />'."\r\n";
    }
    if (isset($reserved_meta_og_type))
    {
        echo '<meta property="og:type" content="' . $reserved_meta_og_type . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_title))
    {
        echo '<meta property="og:title" content="' . $reserved_meta_og_title . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_image))
    {
        echo '<meta property="og:image" content="' . $reserved_meta_og_image . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_description))
    {
        echo '<meta property="og:description" content="' . $reserved_meta_og_description . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_locale))
    {
        echo '<meta property="og:locale" content="' . $reserved_meta_og_locale . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_url))
    {
        echo '<meta property="og:url" content="' . $reserved_meta_og_url . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_latitude))
    {
        echo '<meta property="og:latitude" content="' . $reserved_meta_og_latitude . '" />'."\r\n";
    }
    if (isset($reserved_meta_og_longitude))
    {
        echo '<meta property="og:longitude" content="' . $reserved_meta_og_longitude . '" />'."\r\n";
    }
    echo '<meta property="og:site_name" content="Zipcube.com" />'."\r\n";
    if (isset($reserved_meta_twitter_title))
    {
        echo '<meta name="twitter:title" content="' . $reserved_meta_twitter_title . '" />'."\r\n";
    }
    if (isset($reserved_meta_twitter_description))
    {
        echo '<meta name="twitter:description" content="' . $reserved_meta_twitter_description . '" />'."\r\n";
    }
    if (isset($reserved_meta_twitter_image))
    {
        echo '<meta name="twitter:image" content="' . $reserved_meta_twitter_image . '" />'."\r\n";
    }
    echo '<meta name="twitter:card" content="summary" />'."\r\n";
    echo '<meta name="twitter:site" content="@Zipcube" />'."\r\n";
    echo '<meta name="twitter:creator" content="@Zipcube" />'."\r\n";
    echo '<meta name="google-signin-client_id" content="' . getenv('GOOGLE_CLIENT_ID') . '.apps.googleusercontent.com">'."\r\n";
    if (isset($reserved_no_index) && $reserved_no_index == true)
    {
        echo '<meta name="robots" content="noindex" />'."\r\n";
    }
?>
<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0" />
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
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
<?php
    if (defined('ENVIRONMENT') && ENVIRONMENT == 'production' && !$this->dx_auth->is_admin())
    {
?>
        <noscript>
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=170331983385803&ev=PageView&noscript=1" />
        </noscript>
        <!-- End Facebook Pixel Code -->
        <?php
    }
    if (isset($reserved_canon_link) && $reserved_canon_link != false)
    {
        echo '<link rel="canonical" href="' . $reserved_canon_link . '" />';
    }
    if (isset($reserved_apple_touch_icon))
    {
        echo '<link rel="apple-touch-icon" href="' . $reserved_apple_touch_icon . '">';
    }
    /*if ($this->router->fetch_class() === 'payments' && $this->router->fetch_method() === 'index')
    {
        ?>
        <script type="text/javascript" src="//platform.linkedin.com/in.js">
            api_key: <?php echo getenv('LINKEDIN_APP_ID') . ";\n\r";?>
            authorize: true;<?php echo "\n\r";?>
        </script>
        <?php
    }*/
        ?>
<script>
    // FOR ERROR TRACKING (MUST BE FIRST SCRIPT)
    addEventListener('error', window.__e=function f(e){f.q=f.q||[];f.q.push(e);});
</script>
<script>
    // FOR CHUNK MANIFEST
    //<![CDATA[
        window.webpackManifest = <?php echo inline_chunk_manifest();?>;
    //]]>
    var gaClientId="<?php echo $ga_client_id;?>";
</script>
<link href="<?php echo auto_version('navigation.css');?>" media="screen" rel="stylesheet" type="text/css" />
<?php
    if (!isset($new_css))
    {
        ?>
        <link href="<?php echo auto_version('vendor/bootstrap.min.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('vendor/jquery.fancybox.2.1.5.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="<?php echo auto_version('font-awesome-4.7.0/css/font-awesome.min.css');?>">
        <?php
            if (isset($has_super_nav) || isset($is_landing_page))
            {
                echo '<link href="' . auto_version('subnavigation.css') . '" media="screen" rel="stylesheet" type="text/css" />';
            }
        ?>
        <link href="<?php echo auto_version('common.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('footer.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <?php
    }
    else
    {
        ?>
        <link href="<?php echo auto_version('vendor/bootstrap-grid.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="<?php echo auto_version('font-awesome-4.7.0/css/font-awesome.min.css');?>">
        <link href="<?php echo auto_version('new/common.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <?php
    }
    foreach ($reserved_css as $cScript)
    {
        echo $cScript . "\n\r";
    }
    if (count($reserved_js_variables) > 0)
    {
        echo '<script type="text/javascript">' . js_variables_to_script($reserved_js_variables) . '</script>';
    }
    foreach ($reserved_js_pre as $jScript)
    {
        echo '<script src="' . $jScript . '" type="text/javascript"></script>';
    }