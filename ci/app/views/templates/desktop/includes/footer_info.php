<section class="info row m-0">
    <div id="first-row" class="col-md-12 p-0">
        <div class="col-md-10 p-0" id="contact"><?php echo $lang->line('common_footer_more_ways');?>
            <a href="https://www.zipcube.com/<?php echo $country_lang_url;?>" title="Zipcube.com">Zipcube.com</a>, <?php echo $lang->line('common_call');?>
            <a title="<?php echo $lang->line('common_footer_phone');?> - <?php echo $phone_number_display;?>" href="tel:<?php echo $phone_number;?>"><?php echo $phone_number_display;?></a> <?php echo $lang->line('common_footer_or_email_us');?>
            <a title="<?php echo $lang->line('common_footer_email');?> - info@zipcube.com" href="mailto:info@zipcube.com?subject=<?php echo $lang->line('common_enquiries');?>&amp;body=<?php echo $lang->line('please_mention');?>">info@zipcube.com</a>.
        </div>
        <div class="col-md-2 p-0" id="place">
            <?php
                foreach ($country_select->object() as $country)
                {
                    $url = '';
                    if (isset(config_item('supported_locales')[$country->get('locale')]))
                    {
                        if (isset(config_item('supported_cctlds')[config_item('supported_locales')[$country->get('locale')]]) && isset($alternate_url) && isset($alternate_url[config_item('supported_cctlds')[config_item('supported_locales')[$country->get('locale')]]['hreflang']]))
                        {
                            $url = $alternate_url[config_item('supported_cctlds')[config_item('supported_locales')[$country->get('locale')]]['hreflang']];
                        }
                        else
                        {
                            $url = '/' . config_item('supported_locales')[$country->get('locale')];
                        }
                    }
                    echo '<div class="footer-flags pointer"><a class="locale_code" data-val="' . $country->get('locale') . '" href="' . $url . '" title="' . $country->get('country') . '"><img alt="' . config_item('supported_locales')[$country->get('locale')] . '" src="/css/images/footer/' . config_item('supported_locales')[$country->get('locale')] . '.png" /></a></div>';
                }
            ?>
        </div>
    </div>
    <div class="col-md-12 p-0" id="legal">
        <?php echo $lang->line('common_footer_copyright');?> © <?php echo date("Y");?> Zipcube Ltd. <?php echo $lang->line('common_footer_all_rights');?>
        <a href="/<?php echo $country_lang_url;?>/sitemaps" title="<?php echo $lang->line('common_footer_sitemap');?>"><?php echo $lang->line('common_footer_sitemap');?></a> |
        <a href="/<?php echo $country_lang_url;?>/legal" title="<?php echo $lang->line('common_footer_privacy_title');?>"><?php echo $lang->line('common_footer_privacy');?></a> |
        <a href="/<?php echo $country_lang_url;?>/legal" title="<?php echo $lang->line('common_footer_terms_title');?>"><?php echo $lang->line('common_footer_terms');?></a>
        <p class="pull-right"><?php echo ((isset($tracking_cookie_id))?'ID: ' . $tracking_cookie_id:'');?></p>
    </div>
    <meta content="Zipcube" property="name">
    <meta content="<?php echo $phone_number_display;?>" property="telephone">
</section>