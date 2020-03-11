<div data-role="page" id="about-page" data-url="about-page" data-add-back-btn="true">
    <div class="head ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <a id="back_btn" href="/<?php echo $country_lang_url;?>"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('pages_contact_mobile_heading');?></h1>
        <a href="#main-menu" data-role="button" data-theme="a" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_menu');?></a>
    </div>
    <div class="content basic-content" data-role="content">
        <p>
            <b><?php echo $lang->line('pages_contact_section_telephone');?></b> <span id="contact_us_mobile_phone_number"><?php echo $contact_info->get('phone');?></span> (9:00am to 6:00pm)
        </p>
        <p>
            <b><?php echo $lang->line('pages_contact_section_address');?></b> <?php echo $contact_info->get_address();?>
        </p>
    </div>
</div>