<!DOCTYPE html>
<html lang="<?php echo config_item('language_code');?>" class="ui-mobile">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1, initial-scale=1, user-scalable=0"/>
        <meta name="apple-touch-fullscreen" content="yes">
        <meta name="apple-mobile-web-app-title" content="Zipcube">
        <meta name="apple-mobile-web-app-status-bar-style" content="white">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
        <link rel="stylesheet" href="<?php echo auto_version('mobile/jquery.mobile.icons.min.css');?>"/>
        <link rel="stylesheet" href="//code.jquery.com/mobile/1.4.5/jquery.mobile.structure-1.4.5.min.css"/>
        <link rel="stylesheet" href="<?php echo auto_version('common.css');?>"/>
        <link rel="stylesheet" href="<?php echo auto_version('mobile/zipcube.css');?>"/>
        <link rel="stylesheet" href="<?php echo auto_version('mobile/custom.css');?>"/>
        <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
        <script src="//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
        <script src="<?php echo auto_version('mobile/webapplinks.js');?>" type="text/javascript"></script>
        <script src="<?php echo auto_version('mobile/common.js');?>" type="text/javascript"></script>
    </head>
    <body class="ui-mobile-viewport ui-overlay-a noscroll">
        <div data-role="page" id="page-not-found" data-url="page-not-found" data-add-back-btn="true">
            <div class="head ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
                <a id="back_btn" data-direction="reverse" onclick="history.go(-1);" href=""></a>
                <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('common_page_not_found');?></h1>
                <a href="#main-menu" data-role="button" data-theme="a" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_menu');?></a>
            </div>
            <div class="content basic-content" data-role="content">
                <h2>404</h2>
                <p><?php echo $lang->line('common_page_not_exists');?></p>
            </div>
        </div>
        <div data-role="page" id="main-menu" data-url="main-menu" data-no-loading-indicator="true" tabindex="0" class="ui-page ui-page-theme-a">
            <div class="head no-buttons ui-header ui-bar-inherit" data-role="header">
                <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo strtoupper($lang->line('common_menu'));?></h1>
                <a id="main-menu-hide" data-rel="back" data-direction="reverse" data-role="button" class="button-hide ui-btn-right ui-link ui-btn ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_hide');?></a>
            </div>
            <div class="content ui-content" role="main">
                <ul class="simple-list ui-listview" data-role="listview">
                    <li class="ui-first-child">
                        <a href="/<?php echo $country_lang_url;?>" class="ui-btn ui-btn-icon-right ui-icon-carat-r" rel="external" data-ajax="false"><?php echo strtoupper($lang->line('common_home'));?></a>
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
    </body>
</html>