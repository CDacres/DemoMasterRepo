<?php
    if ($reserved_widget_mode)
    {
        $column = 'col-sm-12';
    }
    else
    {
        $column = 'col-sm-4';
        ?>
        <div id="header">
            <div class="container-fluid header-container">
                <div class="logo-wrapper col-sm-6 col-xs-12">
                    <a href="/<?php echo $country_lang_url;?>" class="logo">
                        <img src="/css/images/logo/zipcube-logo-black.svg" title="Zipcube" alt="Zipcube">
                    </a>
                </div>
                <div class="contact col-sm-6 col-xs-12 text-right">
                    <div class="title"><?php echo $lang->line('common_help_call_us');?></div>
                    <div id="contact_us_phone_number" class="phone"><?php echo $phone_number_display;?></div>
                </div>
            </div>
        </div>
        <?php
    }
?>
<div id="root" class="main-view page-container-responsive space-top-md-6 space-md-6 space-top-lg-6 space-lg-6"><?php echo $checkout_component;?></div>