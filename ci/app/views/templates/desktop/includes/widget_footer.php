<?php
    if (!isset($replace_widget_footer))
    {
?>
        <div id="footer">
            <div class="logo-wrapper col-xs-12 text-center">
                <a href="/<?php echo $country_lang_url;?>" class="logo" target="_blank">
                    <span id="powered_by"><?php echo $lang->line('common_footer_powered_by');?></span>
                    <img id="zipcube_logo" src="/css/images/logo/zipcube-logo-black.svg" alt="Zipcube">
                </a>
            </div>
        </div>
        <?php
    }