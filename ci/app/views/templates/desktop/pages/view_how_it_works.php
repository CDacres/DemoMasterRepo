<div class="container">
    <div id="intro" class="row top-p-2 bottom-p-2">
        <div class="col-sm-5">
            <h1><?php echo $lang->line('pages_how_it_works_heading');?></h1>
            <p><?php echo $lang->line('pages_how_it_works_heading_text1');?></p>
            <p><?php echo $lang->line('pages_how_it_works_heading_text2');?></p>
            <p><?php echo $lang->line('pages_how_it_works_heading_text3');?></p>
            <p><?php echo $lang->line('pages_how_it_works_heading_text4');?></p>
            <?php
                if (isset($default_tags) && count($default_tags) > 0)
                {
                    if (isset($default_tags[Tag::MEETING]))
                    {
            ?>
                        <p>
                            <a href="/<?php echo $country_lang_url;?>/s/<?php echo $default_tags[Tag::MEETING]->get('quick_slug');?>/<?php echo $country_location->get('location_search_url');?>" class="learnMore" title="<?php echo $lang->line('pages_how_it_works_heading_link1', $country_location->get('location_desc'));?>"><?php echo $lang->line('pages_how_it_works_heading_link1', $country_location->get('location_desc'));?></a>
                        </p>
                        <?php
                    }
                    if (isset($default_tags[Tag::EVENTFUNCTION]))
                    {
                        ?>
                        <p>
                            <a href="/<?php echo $country_lang_url;?>/s/<?php echo $default_tags[Tag::EVENTFUNCTION]->get('quick_slug');?>/<?php echo $country_location->get('location_search_url');?>" class="learnMore" title="<?php echo $lang->line('pages_how_it_works_heading_link2', $country_location->get('location_desc'));?>"><?php echo $lang->line('pages_how_it_works_heading_link2', $country_location->get('location_desc'));?></a>
                        </p>
                        <?php
                    }
                }
                        ?>
        </div>
        <div class="col-sm-7 text-right">
            <img class="image" src="<?php echo cdn_css();?>images/howitworks/findspace.png" alt="<?php echo $lang->line('pages_about_find_a_space');?>"  title="<?php echo $lang->line('pages_about_find_a_space');?>">
        </div>
    </div>
</div>
<div class="container-fluid">
    <div id="faq" class="row bg-blue-mystic top-p-1 bottom-p-3">
        <div class="container">
            <h1><?php echo $lang->line('pages_how_it_works_faq_heading');?></h1>
            <div class="column-container bg-white p-1 clearfix">
                <div class="col-sm-4">
                    <h3><?php echo $lang->line('pages_how_it_works_faq_how_much');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_faq_how_much_text');?></p>
                    <p>
                        <a title="Get started" href="/<?php echo $country_lang_url;?>/users/signup" target="_blank"><?php echo $lang->line('pages_how_it_works_faq_button_get_started');?></a>
                    </p>
                </div>
                <div class="col-sm-4">
                    <h3><?php echo $lang->line('pages_how_it_works_faq_what_happens');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_faq_what_happens_text');?></p>
                    <p>
                        <a title="Sign up and find your next workspace" href="/<?php echo $country_lang_url;?>/users/signup" target="_blank"><?php echo $lang->line('pages_how_it_works_faq_button_sign_up');?></a>
                    </p>
                </div>
                <div class="col-sm-4">
                    <h3><?php echo $lang->line('pages_how_it_works_faq_how_can_i');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_faq_how_can_i_text');?></p>
                    <p>
                        <a title="Log in and take a look at our spaces" href="/<?php echo $country_lang_url;?>/users/signup"><?php echo $lang->line('pages_how_it_works_faq_button_log_in');?></a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="container">
    <div id="what_you_get" class="row top-p-2 bottom-p-2">
        <h1><?php echo $lang->line('pages_how_it_works_what_you_get_heading');?></h1>
        <div class="col-sm-6 top-p-2 bottom-p-2">
            <div class="row">
                <div class="col-sm-4 p-0">
                    <img alt="<?php echo $lang->line('common_save_time');?>" title="<?php echo $lang->line('common_save_time');?>" src="<?php echo cdn_css();?>images/howitworks/savetime.png">
                </div>
                <div class="col-sm-8">
                    <h3><?php echo $lang->line('pages_how_it_works_what_you_get_save_time');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_what_you_get_save_time_text');?></p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 p-0">
                    <img alt="<?php echo $lang->line('common_stay_productive');?>" title="<?php echo $lang->line('common_stay_productive');?>" src="<?php echo cdn_css();?>images/howitworks/productive.png">
                </div>
                <div class="col-sm-8">
                    <h3><?php echo $lang->line('pages_how_it_works_what_you_get_stay_productive');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_what_you_get_stay_productive_text');?></p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 p-0">
                    <img alt="<?php echo $lang->line('common_all_you_need');?>" title="<?php echo $lang->line('common_all_you_need');?>" src="<?php echo cdn_css();?>images/howitworks/offer.png">
                </div>
                <div class="col-sm-8">
                    <h3><?php echo $lang->line('pages_how_it_works_what_you_get_all_you_need');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_what_you_get_all_you_need_text');?></p>
                </div>
            </div>
        </div>
        <div class="col-sm-6 top-p-2 bottom-p-2">
            <div class="row">
                <div class="col-sm-4 p-0">
                    <img alt="<?php echo $lang->line('common_best_price');?>" title="<?php echo $lang->line('common_best_price');?>" src="<?php echo cdn_css();?>images/howitworks/savemoney.png">
                </div>
                <div class="col-sm-8">
                    <h3><?php echo $lang->line('pages_how_it_works_what_you_get_best_price');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_what_you_get_best_price_text');?></p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 p-0">
                    <img alt="<?php echo $lang->line('common_free_booking');?>" title="<?php echo $lang->line('common_free_booking');?>" src="<?php echo cdn_css();?>images/howitworks/booking.png">
                </div>
                <div class="col-sm-8">
                    <h3><?php echo $lang->line('pages_how_it_works_what_you_get_hassle_free');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_what_you_get_hassle_free_text');?></p>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4 p-0">
                    <img alt="<?php echo $lang->line('common_support');?>" title="<?php echo $lang->line('common_support');?>" src="<?php echo cdn_css();?>images/howitworks/support.png">
                </div>
                <div class="col-sm-8">
                    <h3><?php echo $lang->line('pages_how_it_works_what_you_get_customer_support');?></h3>
                    <p><?php echo $lang->line('pages_how_it_works_what_you_get_customer_support_text');?></p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <h4><?php echo $lang->line('pages_how_it_works_what_you_get_and_that');?> – <a title="hire a space now" href="/<?php echo $country_lang_url;?>"><?php echo $lang->line('pages_how_it_works_what_you_get_browse_link');?></a></h4>
            </div>
        </div>
    </div>
    <div id="how_to_find" class="row top-p-2 bottom-p-2">
        <h1><?php echo $lang->line('pages_how_it_works_how_to_find_heading');?></h1>
        <div class="row top-p-2 bottom-p-2">
            <div class="col-sm-3 text-center">
                <img alt="<?php echo $lang->line('pages_about_find_a_space');?>" title="<?php echo $lang->line('pages_about_find_a_space');?>" src="<?php echo cdn_css();?>images/howitworks/search.jpg">
            </div>
            <div class="col-sm-3 text-center">
                <img alt="<?php echo $lang->line('common_hire_space');?>" title="<?php echo $lang->line('common_hire_space');?>" src="<?php echo cdn_css();?>images/howitworks/book.jpg">
            </div>
            <div class="col-sm-3 text-center">
                <img alt="<?php echo $lang->line('common_receive_confirmation');?>" title="<?php echo $lang->line('common_receive_confirmation');?>" src="<?php echo cdn_css();?>images/howitworks/confirmation.jpg">
            </div>
            <div class="col-sm-3 text-center">
                <img alt="<?php echo $lang->line('common_enjoy');?>" title="<?php echo $lang->line('common_enjoy');?>" src="<?php echo cdn_css();?>images/howitworks/enjoy.jpg">
            </div>
        </div>
        <div class="row">
            <div class="col-sm-3">
                <h3><?php echo $lang->line('pages_how_it_works_how_to_find_step1_heading');?></h3>
                <p><?php echo $lang->line('pages_how_it_works_how_to_find_step1_text');?></p>
                <p>
                    <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step1_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step1_link');?></a>
                </p>
            </div>
            <div class="col-sm-3">
                <h3><?php echo $lang->line('pages_how_it_works_how_to_find_step2_heading');?></h3>
                <p><?php echo $lang->line('pages_how_it_works_how_to_find_step2_text');?></p>
                <p>
                    <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step2_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step2_link');?></a>
                </p>
            </div>
            <div class="col-sm-3">
                <h3><?php echo $lang->line('pages_how_it_works_how_to_find_step3_heading');?></h3>
                <p><?php echo $lang->line('pages_how_it_works_how_to_find_step3_text');?></p>
                <p>
                    <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step3_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step3_link');?></a>
                </p>
            </div>
            <div class="col-sm-3">
                <h3><?php echo $lang->line('pages_how_it_works_how_to_find_step4_heading');?></h3>
                <p><?php echo $lang->line('pages_how_it_works_how_to_find_step4_text');?></p>
                <p>
                    <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step4_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step4_link');?></a>
                </p>
            </div>
        </div>
    </div>
</div>
<div class="container-fluid bg-white top-p-1 bottom-p-2">
    <div id="become_a_zipcuber" class="row">
        <div class="container p-0">
            <div class="row">
                <div class="col-sm-12">
                    <h1><?php echo $lang->line('pages_how_it_works_become_heading');?></h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-9">
                    <h3><?php echo $lang->line('pages_how_it_works_become_subheading');?></h3>
                </div>
                <div class="col-sm-3 top-p-2">
                    <a class="btn btn-primary" href="https://www.zipcube.com/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_become_button');?>">
                        <span><?php echo $lang->line('pages_how_it_works_become_button');?></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>