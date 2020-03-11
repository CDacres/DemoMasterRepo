<footer id="footer" class="hidden-xs">
    <?php
        if ($reserved_widget_mode)
        {
    ?>
            <div class="logo-wrapper col-xs-12 text-center">
                <a href="/<?php echo $country_lang_url;?>" class="logo" target="_blank">
                    <span id="powered_by"><?php echo $lang->line('common_footer_powered_by');?></span>
                    <img id="zipcube_logo" src="/css/images/logo/zipcube-logo-black.svg" alt="Zipcube">
                </a>
            </div>
            <?php
        }
        else
        {
            ?>
            <div class="container">
                <?php
                    if (isset($breadcrumbs))
                    {
                ?>
                        <div class="hidden-xs"><?php echo $this->load->view(THEME_FOLDER . '/includes/breadcrumbs');?></div>
                        <?php
                    }
                        ?>
                <div class="row m-0">
                    <div class="col-md-6 col-xs-6 p-0">
                        <div class="row m-0">
                            <?php
                                if (isset($footer_locations) && isset($footer_tag))
                                {
                            ?>
                                    <div class="col-md-12 col-xs-12 p-0">
                                        <h3 class="title"><?php echo $lang->line('common_footer_popular_search', $footer_tag->get('browse_link_label'));?></h3>
                                    </div>
                                    <?php echo $this->load->view(THEME_FOLDER . '/includes/footer_location_snippet', ['total_locations' => $footer_locations->get_count(), 'footer_locations' => $footer_locations->get_as_array(), 'footer_tag' => $footer_tag], true);
                                }
                                    ?>
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
                <?php $this->load->view(THEME_FOLDER . '/includes/footer_info');?>
            </div>
            <?php
        }
            ?>
</footer>