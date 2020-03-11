<?php
/*
    if (isset($country_suggest_text) && isset(config_item('supported_locales')[$country_suggest_text->get('locale_code')]))
    {
        $url = '';
        if (isset(config_item('supported_locales')[$country_suggest_text->get('locale_code')]) && isset(config_item('supported_cctlds')[config_item('supported_locales')[$country_suggest_text->get('locale_code')]]) && isset($alternate_url) && isset($alternate_url[config_item('supported_cctlds')[config_item('supported_locales')[$country_suggest_text->get('locale_code')]]['hreflang']]))
        {
            $this->load->view(THEME_FOLDER . '/' . $reserved_dash_header);
        ?>
        <!-- </nav> -->
        <?php
    }
*/
if (isset($nav_component))
{
    echo $nav_component;
}
