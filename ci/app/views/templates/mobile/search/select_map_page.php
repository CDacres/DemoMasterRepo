<div data-role="page" id="select-map" data-url="select-map" tabindex="0" class="ui-page ui-page-theme-a">
    <?php
        if (count($reserved_js_variables)>0)
        {
            echo '<script type="text/javascript">' . js_variables_to_script($reserved_js_variables) . '</script>';
        }
        foreach ($reserved_js_pre as $jScript)
        {
            echo '<script src="' . $jScript . '" type="text/javascript"></script>';
        }
        foreach ($reserved_js_post as $jScript)
        {
            echo '<script src="' . $jScript . '" type="text/javascript"></script>';
        }
    ?>
    <div class="map-block">
        <a data-rel="back" data-direction="reverse" data-role="button"
           class="mapBtn button-hide ui-link ui-btn ui-shadow ui-corner-all" role="button"><?php echo $lang->line('search_index_mobile_list');?></a>
        <a href="tel:<?php echo $phone_number;?>" class="callToBook ui-btn">
            <i class="fa fa-phone" aria-hidden="true"></i>
        </a>
        <div id="map" class="map">
            <div id="map_options" class="Google hidden-xs">
                <div class="panel map-auto-refresh">
                    <label class="checkbox">
                        <input class="map-auto-refresh-checkbox" id="redo_search_in_map" name="redo_search_in_map" type="checkbox" checked="checked">
                        <small><?php echo $lang->line('search_index_move_map');?></small>
                    </label>
                </div>
            </div>
            <div id="search_map" class="map-canvas"></div>
            <div id="map_view_loading" class="rounded_more" style="display: none;">
                <img src="<?php echo base_url();?>images/page2_spinner.gif" style="display:block; float:left; padding:0 12px 0 0;" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>" /><?php echo $lang->line('common_loading');?>
            </div>
            <div id="map_message" style="display:none;"></div>
        </div>
    </div>
</div>