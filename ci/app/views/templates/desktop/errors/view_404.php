<!DOCTYPE html>
<html lang="<?php echo config_item('language_code');?>">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <title><?php echo $lang->line('common_page_not_found');?> - Zipcube</title>
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <script>
            //<![CDATA[
                window.webpackManifest = <?php echo inline_chunk_manifest();?>;
            //]]>
        </script>
        <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('common.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('footer.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('home.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('navigation.css');?>" media="screen" rel="stylesheet" type="text/css" />
        <link href="<?php echo auto_version('errors.css');?>" media="screen" rel="stylesheet" type="text/css" />
    </head>
    <body class="home home-index page-home with-new-header">
        <?php
            if (isset($nav_component))
            {
                echo $nav_component;
            }
        ?>
        <article class="billboard mainboard" id="back-gallery">
            <section class="gallery-content gallery-content-meeting dark" id="gallery-content-meeting">
                <div class="block back-image">
                    <div class="background_overlay">
                        <div class="search-area">
                            <div id="billboard_title" class="row bottom-m-1 m-0">
                                <div class="col-sm-10 col-sm-12 p-0">
                                    <h1>404</h1>
                                </div>
                                <div id="billboard_subtitle" class="col-sm-10 col-sm-10 p-0">
                                    <h2 class="white-font"><?php echo $lang->line('common_page_not_exists');?></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </article>
        <footer id="footer" class="hidden-xs">
            <div class="container">
                <!-- old footer -->
                <div class="row m-0">
                    <!-- popular searches -->
                    <div class="col-md-6 col-xs-6 p-0">
                        <div class="row m-0">
                            <div class="col-md-12 col-xs-12 p-0">
                                <h3><?php echo $lang->line('common_footer_popular');?></h3>
                            </div>
                            <div class="col-md-6 col-xs-6 p-0">
                                <ul>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/london" title="<?php echo $lang->line('category_meeting_rooms_in', 'London', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'London', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/birmingham" title="<?php echo $lang->line('category_meeting_rooms_in', 'Birmingham', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Birmingham', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/leeds" title="<?php echo $lang->line('category_meeting_rooms_in', 'Leeds', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Leeds', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/glasgow" title="<?php echo $lang->line('category_meeting_rooms_in', 'Glasgow', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Glasgow', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/sheffield" title="<?php echo $lang->line('category_meeting_rooms_in', 'Sheffield', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Sheffield', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/bradford" title="<?php echo $lang->line('category_meeting_rooms_in', 'Bradford', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Bradford', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/edinburgh" title="<?php echo $lang->line('category_meeting_rooms_in', 'Edinburgh', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Edinburgh', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/liverpool" title="<?php echo $lang->line('category_meeting_rooms_in', 'Liverpool', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Liverpool', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/manchester" title="<?php echo $lang->line('category_meeting_rooms_in', 'Manchester', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Manchester', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/bristol" title="<?php echo $lang->line('category_meeting_rooms_in', 'Bristol', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Bristol', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/euston" title="<?php echo $lang->line('category_meeting_rooms_in', 'Euston', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Euston', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/kings-cross" title="<?php echo $lang->line('category_meeting_rooms_in', 'Kings Cross', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Kings Cross', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/victoria" title="<?php echo $lang->line('category_meeting_rooms_in', 'Victoria', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Victoria', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/st-pancras" title="<?php echo $lang->line('category_meeting_rooms_in', 'St Pancras', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'St Pancras', '');?></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6 col-xs-6 p-0">
                                <ul>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/farringdon" title="<?php echo $lang->line('category_meeting_rooms_in', 'Farringdon', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Farringdon', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/paddington" title="<?php echo $lang->line('category_meeting_rooms_in', 'Paddington', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Paddington', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/waterloo" title="<?php echo $lang->line('category_meeting_rooms_in', 'Waterloo', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Waterloo', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/london-city" title="<?php echo $lang->line('category_meeting_rooms_in', $lang->line('common_determiner') . ' City');?>"><?php echo $lang->line('category_meeting_rooms_in', $lang->line('common_determiner') . ' City');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/shoreditch" title="<?php echo $lang->line('category_meeting_rooms_in', 'Shoreditch', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Shoreditch', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/westminster" title="<?php echo $lang->line('category_meeting_rooms_in', 'Westminster', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Westminster', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/soho" title="<?php echo $lang->line('category_meeting_rooms_in', 'Soho', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Soho', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/mayfair" title="<?php echo $lang->line('category_meeting_rooms_in', 'Mayfair', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Mayfair', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/covent-garden" title="<?php echo $lang->line('category_meeting_rooms_in', 'Covent Garden', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Covent Garden', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/holborn" title="<?php echo $lang->line('category_meeting_rooms_in', 'Holborn', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Holborn', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/liverpool-street" title="<?php echo $lang->line('category_meeting_rooms_in', 'Liverpool St', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Liverpool St', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/oxford-street" title="<?php echo $lang->line('category_meeting_rooms_in', 'Oxford Street', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Oxford Street', '');?></a>
                                    </li>
                                    <li>
                                        <a href="<?php echo '/' . $country_lang_url . '/' . $default_tag_slug;?>/southwark" title="<?php echo $lang->line('category_meeting_rooms_in', 'Southwark', '');?>"><?php echo $lang->line('category_meeting_rooms_in', 'Southwark', '');?></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-xs-6 p-0">
                        <div class="row m-0">
                            <div class="col-md-6 col-xs-6 p-0">
                                <div class="row m-0">
                                    <div class="col-md-12 p-0">
                                        <h3><?php echo $lang->line('common_footer_by_cat');?></h3>
                                        <?php
                                            echo '<ul class="columnlist">';
                                            if (isset($default_tags) && count($default_tags) > 0)
                                            {
                                                foreach ($default_tags as $default_tag)
                                                {
                                                    echo '<li><a title="' . $default_tag->get('home_label') . '" href="/' . $country_lang_url . '/' . $default_tag->get('quick_slug') . '">' . $default_tag->get('home_label') . '</a></li>';
                                                }
                                            }
                                            echo '</ul>';
                                        ?>
                                    </div>
                                    <div class="col-md-12 p-0">
                                        <h3><?php echo $lang->line('common_account');?></h3>
                                        <ul>
                                            <li>
                                                <a href="/<?php echo $country_lang_url;?>/users/signup"><?php echo $lang->line('common_footer_create_an_account');?></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 col-xs-6 p-0">
                                <div class="col-md-12 p-0">
                                    <h3 class="title"><?php echo $lang->line('common_about');?></h3>
                                    <ul>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/about" title="<?php echo $lang->line('common_footer_about_us');?>"><?php echo $lang->line('common_footer_about_us');?></a>
                                        </li>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/faq" title="<?php echo $lang->line('common_footer_faq');?>"><?php echo $lang->line('common_footer_faq');?></a>
                                        </li>
                                        <li>
                                            <a href="http://blog.zipcube.com" title="<?php echo $lang->line('common_footer_blog');?>" target="_blank"><?php echo $lang->line('common_footer_blog');?></a>
                                        </li>
                                        <li>
                                            <a href="https://www.facebook.com/Zipcube" title="<?php echo $lang->line('common_footer_on', 'Facebook');?>" target="_blank">Facebook</a>
                                        </li>
                                        <li>
                                            <a href="https://twitter.com/Zipcube" title="<?php echo $lang->line('common_footer_on', 'Twitter');?>" target="_blank">Twitter</a>
                                        </li>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/legal" title="<?php echo $lang->line('common_footer_legal_title');?>"><?php echo $lang->line('common_footer_legal');?></a>
                                        </li>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/contact" title="<?php echo $lang->line('common_footer_contact');?>"><?php echo $lang->line('common_footer_contact');?></a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="col-md-12 p-0">
                                    <h3 class="title"><?php echo $lang->line('common_footer_zipcube_venues');?></h3>
                                    <ul>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/<?php echo ((!$this->dx_auth->is_logged_in())?'users/signin':'dashboard');?>" title="<?php echo $lang->line('common_nav_access_venue_dashboard');?>"><?php echo $lang->line('common_nav_venue_dashboard');?></a>
                                        </li>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/<?php echo ((!$this->dx_auth->is_logged_in())?'get-started':((isset($reserved_asset_user) && $reserved_asset_user)?'dashboard/listings':'venues/new'));?>" title="<?php echo $lang->line('common_footer_list_your_spaces');?>"><?php echo $lang->line('common_footer_list_your_spaces');?></a>
                                        </li>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/how-it-works" title="<?php echo $lang->line('common_footer_how_it_works');?>"><?php echo $lang->line('common_footer_how_it_works');?></a>
                                        </li>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/how-to-share" title="<?php echo $lang->line('common_footer_how_to_share');?>"><?php echo $lang->line('common_footer_how_to_share');?></a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- footer trail -->
                <section class="info row m-0">
                    <div class="col-md-12 p-0" id="contact"><?php echo $lang->line('common_footer_more_ways');?>
                        <a href="https://www.zipcube.com/<?php echo $country_lang_url;?>" title="Zipcube.com">Zipcube.com</a>, <?php echo $lang->line('common_footer_or_email_us');?>
                        <a title="Zipcube <?php echo $lang->line('common_footer_email');?> - info@zipcube.com" href="mailto:info@zipcube.com?subject=<?php echo $lang->line('common_enquiries');?>&amp;body=<?php echo $lang->line('please_mention');?>">info@zipcube.com</a>.
                    </div>
                    <div class="col-md-12 p-0" id="legal">
                        <?php echo $lang->line('common_footer_copyright');?> © <?php echo date("Y");?> Zipcube Ltd. <?php echo $lang->line('common_footer_all_rights');?>
                        <a href="/<?php echo $country_lang_url;?>/sitemaps" title="<?php echo $lang->line('common_footer_sitemap');?>"><?php echo $lang->line('common_footer_sitemap');?></a> |
                        <a href="/<?php echo $country_lang_url;?>/legal" title="<?php echo $lang->line('common_footer_privacy_title');?>"><?php echo $lang->line('common_footer_privacy');?></a> |
                        <a href="/<?php echo $country_lang_url;?>/legal" title="<?php echo $lang->line('common_footer_terms_title');?>"><?php echo $lang->line('common_footer_terms');?></a>
                    </div>
                    <meta content="Zipcube" property="name">
                </section>
            </div>
        </footer>
        <script src="<?php echo manifest_item('manifest.js');?>" type="text/javascript"></script>
        <script src="<?php echo manifest_item('vendor.js');?>" type="text/javascript"></script>
        <script src="<?php echo manifest_item('shared.js');?>" type="text/javascript"></script>
        <script src="<?php echo manifest_item('common.js');?>" type="text/javascript"></script>
        <script src="<?php echo $main_script;?>" type="text/javascript"></script>
    </body>
</html>
