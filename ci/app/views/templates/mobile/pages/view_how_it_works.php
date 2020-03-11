<div data-role="page" id="about-page" data-url="about-page" data-add-back-btn="true">
    <div class="head ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <a id="back_btn" href="/<?php echo $country_lang_url;?>"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('pages_how_it_works_mobile_heading');?></h1>
        <a href="#main-menu" data-role="button" data-theme="a" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_menu');?></a>
    </div>
    <div class="content basic-content" data-role="content">
        <p>
            <b><?php echo $lang->line('pages_how_it_works_heading');?></b>
        </p>
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
                    ?>
                <br>
                <?php
            }
                ?>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_faq_heading');?></b>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_faq_how_much');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_faq_how_much_text');?></p>
        <p>
            <a title="<?php echo $lang->line('pages_get_started_title');?>" href="/<?php echo $country_lang_url;?>/users/signup" target="_blank"><?php echo $lang->line('pages_how_it_works_faq_button_get_started');?></a>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_faq_what_happens');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_faq_what_happens_text');?></p>
        <p>
            <a title="<?php echo $lang->line('pages_how_it_works_faq_button_sign_up');?>" href="/<?php echo $country_lang_url;?>/users/signup" target="_blank"><?php echo $lang->line('pages_how_it_works_faq_button_sign_up');?></a>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_faq_how_can_i');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_faq_how_can_i_text');?></p>
        <p>
            <a title="<?php echo $lang->line('pages_how_it_works_faq_button_log_in');?>" href="/<?php echo $country_lang_url;?>/users/signup"><?php echo $lang->line('pages_how_it_works_faq_button_log_in');?></a>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_heading');?></b>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_save_time');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_save_time_text');?></p>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_stay_productive');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_stay_productive_text');?></p>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_all_you_need');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_all_you_need_text');?></p>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_best_price');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_best_price_text');?></p>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_hassle_free');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_hassle_free_text');?></p>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_what_you_get_customer_support');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_customer_support_text');?></p>
        <p><?php echo $lang->line('pages_how_it_works_what_you_get_and_that');?> – <a title="<?php echo $lang->line('pages_how_it_works_what_you_get_browse_link');?>" href="/<?php echo $country_lang_url;?>"><?php echo $lang->line('pages_how_it_works_what_you_get_browse_link');?></a></p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_how_to_find_heading');?></b>
        </p>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_how_to_find_step1_heading');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_how_to_find_step1_text');?></p>
        <p>
            <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step1_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step1_link');?></a>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_how_to_find_step2_heading');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_how_to_find_step2_text');?></p>
        <p>
            <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step2_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step2_link');?></a>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_how_to_find_step3_heading');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_how_to_find_step3_text');?></p>
        <p>
            <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step3_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step3_link');?></a>
        </p>
        <br>
        <p>
            <b><?php echo $lang->line('pages_how_it_works_how_to_find_step4_heading');?></b>
        </p>
        <p><?php echo $lang->line('pages_how_it_works_how_to_find_step4_text');?></p>
        <p>
            <a href="/<?php echo $country_lang_url;?>" title="<?php echo $lang->line('pages_how_it_works_how_to_find_step4_link');?>"><?php echo $lang->line('pages_how_it_works_how_to_find_step4_link');?></a>
        </p>
    </div>
</div>