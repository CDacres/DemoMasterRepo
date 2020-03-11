<div data-role="page" id="rooms-page" tabindex="0" class="ui-page ui-page-theme-a ui-page-active" data-add-back-btn="true" data-back-btn-text="<?php echo $lang->line('common_back');?>">
    <div class="head ui-header ui-bar-inherit" data-role="header">
        <a id="back_btn" data-rel="back" data-direction="reverse" onclick="history.go(-1);"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $results_meta_data->get('space_title');?></h1>
        <a href="#main-menu" id="main-menu-link" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button" data-ajax="true"><?php echo $lang->line('common_menu');?></a>
    </div>
    <div class="content" role="main">
        <div class="filter-block" data-filter-expiry="12">
            <div class="filter-location">
                <ul data-role="listview" class="ui-listview">
                    <li class="ui-first-child ui-last-child">
                        <a href="/<?php echo $country_lang_url;?>/s/select-location" id="selected-location" class="ui-btn ui-btn-icon-right ui-icon-carat-r" data-transition="pop"><?php echo $lang->line('search_index_location');?>: <span class="location-name" data-current-geolocation-name="nearby"><?php echo $results_meta_data->get('location');?></span></a>
                    </li>
                </ul>
            </div>
            <div class="filter-popup">
                <a href="#filter-popup" data-rel="popup" class="ui-link" data-transition="pop" aria-haspopup="true" aria-owns="filter-popup" aria-expanded="false" data-position-to="window">
                    <span class="icon filter-popup-icon"></span>
                    <span class="popup-title ui-btn ui-corner-all ui-shadow ui-btn-inline"><?php echo $lang->line('search_index_filters');?></span>
                </a>
                <div style="display: none;" id="filter-popup-placeholder"><!-- placeholder for filter-popup --></div>
            </div>
        </div>
        <a href="/<?php echo $country_lang_url;?>/s/select-map" id="selected-map" class="mapBtn ui-btn" data-transition="pop" data-ajax="true"><?php echo $lang->line('search_index_mobile_map');?></a>
        <a href="tel:<?php echo $phone_number;?>" class="callToBook ui-btn">
            <i class="fa fa-phone" aria-hidden="true"></i>
        </a>
        <div id="" class="pre-load hide venue-list" style="display: block;">
            <ul data-role="listview" id="results" class="simple-list ui-listview"></ul>
            <ul id="pagination" data-role="listview" class="simple-list ui-listview">
                <li class="load-more ui-last-child">
                    <a href="#" class="ui-btn ui-btn-icon-right ui-icon-carat-r zc_pagination" zc_page_number="1"><?php echo $lang->line('search_index_mobile_load_more');?>...</a>
                </li>
            </ul>
        </div>
        <div class="footer ui-footer ui-bar-inherit" data-role="footer">
            <div class="footer-logo">Zipcube</div>
        </div>
    </div>
    <div data-role="popup" data-dismissible="false" id="filter-popup" class="ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all">
        <div class="head ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
            <h1 class="header-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('search_index_filters');?></h1>
            <div id="clearAllBtn" class="clear-all-btn"><?php echo $lang->line('search_index_mobile_filters_clear_all');?></div>
        </div>
        <div class="filter-block">
            <!-- Do Not Touch It -->
            <div class="filter-none">
                <select class="zc_value_input" disabled="disabled" style="display: none; height: 0;"></select>
            </div>
            <div class="filter-date">
                <div class="ui-select">
                    <div id="filter-date-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right">
                        <span class="date-filter-text"></span>
                        <select class="browse-filter date_section zc_value_input" zc_filter_name="date" name="filter-date" id="date" data-corners="false" data-shadow="false" data-iconshadow="false">
                            <option class="any" value="" selected="selected"><?php echo $lang->line('search_index_mobile_filters_any_date');?></option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="filter-time">
                <div class="ui-select">
                    <div id="filter-date-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right">
                        <span class="time-filter-text"></span>
                        <select class="browse-filter time time_section zc_value_input" id="time" name="time" value="time" zc_filter_name="time" data-corners="false" data-shadow="false" data-iconshadow="false">
                            <option value="-1" selected="selected"><?php echo $lang->line('search_index_filters_select_time');?></option>
                            <?php
                                for ($i = 0; $i < 24; ++$i)
                                {
                                    $minutes = $i * 60;
                                    echo '<option value=' . $minutes . conditional_string($minutes, $initial_filters->get('time'), ' selected="selected"') . '>' . (($i < 10)?'0':'') . $i . ':00</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="filter-duration">
                <div class="ui-select">
                    <div id="filter-date-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right">
                        <span class="duration-filter-text"></span>
                        <select class="browse-filter duration duration_section zc_value_input" id="duration" name="duration" value="duration" zc_filter_name="duration" data-corners="false" data-shadow="false" data-iconshadow="false">
                            <option value="0" selected="selected"><?php echo $lang->line('search_index_filters_select_duration');?></option>
                            <?php
                                foreach ($duration_options as $number => $desc)
                                {
                                    echo '<option value="' . $number . '"' . conditional_string($number, $initial_filters->get('duration'), ' selected="selected"') . '>' . $desc . '</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="filter-guests">
                <div class="ui-select">
                    <div id="filter-date-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right hidden-input">
                        <span class="guests-filter-text"></span>
                        <select class="browse-filter guests guests_section zc_value_input" id="guests" name="guests" zc_filter_name="guests" data-corners="false" data-shadow="false" data-iconshadow="false">
                            <option value="0" selected="selected"><?php echo $lang->line('search_index_mobile_filters_select_guests');?></option>
                            <?php
                                foreach ($guest_number_options->object() as $option)
                                {
                                    echo '<option value="' . $option->get('number') . '"' . conditional_string($results_meta_data->get('guests'), $option->get('number'), ' selected="selected"') . '>' . $option->wrangle('desc')->formatted() . '</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
            <div class="filter-price">
                <div class="ui-select">
                    <div id="filter-price-button" class="ui-btn">
                        <div class="form-input">
                            <div class="form-input-label"><?php echo $lang->line('search_index_filters_price');?></div>
                            <div id="slider-range" class="ui-slider">
                                <div class="ui-slider-handle" style="left: 0%;"></div>
                                <div class="ui-slider-handle" style="left: 100%;"></div>
                                <p class="min-price">
                                    <span class="price">
                                        <sup><?php echo $cross_platform_variables->get('currency_symbol_left');?> </sup>
                                        <span id="slider_user_hourly_min_text"><?php echo $cross_platform_variables->wrangle('price_filter_minimum')->round_up();?></span>
                                        <sub>
                                            <i>/<?php echo $lang->line('common_hour_short');?></i>
                                        </sub>
                                    </span>
                                </p>
                                <p class="max-price">
                                    <span class="price">
                                        <sup><?php echo $cross_platform_variables->get('currency_symbol_left');?> </sup>
                                        <span id="slider_user_hourly_max_text"> <?php echo $cross_platform_variables->wrangle('price_filter_maximum')->round_up();?>+</span>
                                        <sub>
                                            <i>/<?php echo $lang->line('common_hour_short');?></i>
                                        </sub>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="clear: both;"></div>
            <div class="filter-extras">
                <div class="filter-layout">
                    <div class="row no-gutter row-space-top-5">
                        <ul class="layout-list option-selection multi-select">
                            <li class="top-layouts option-header" data-role="list-divider"><?php echo $lang->line('search_index_filters_layout');?></li>
                            <?php
                                foreach ($configurations->object() as $configType)
                                {
                                    echo '<li id="' . $configType->get('id') . '" name="configurations" class="checkbox-option option "><span class="title"> ' . $lang->line($configType->get('desc')) . ' </span><span class="selection"></span><label><input type="checkbox" id="configurations' . $configType->get('id') . '" value="' . $configType->get('id') . '" name="configurations[]" class="pull-left zc_check_input" zc_filter_name="configurations"' . conditional_in_array_string($configType->get('id'), $initial_filters->get('configurations'), ' checked="checked"') . '></label></li>';
                                }
                            ?>
                        </ul>
                    </div>
                </div>
                <div class="filter-amenities">
                    <div class="row no-gutter row-space-top-5">
                        <ul class="layout-list option-selection multi-select">
                            <li class="top-layouts option-header" data-role="list-divider"><?php echo $lang->line('search_index_filters_amenities');?></li>
                            <?php
                                foreach ($amenities->object() as $amenityType)
                                {
                                    echo '<li id="' . $amenityType->get('id') . '" name="amenities" class="checkbox-option option "><span class="title"> ' . $amenityType->get('desc') . ' </span><span class="selection"></span><label><input type="checkbox" id="amenities' . $amenityType->get('id') . '" value="' . $amenityType->get('id') . '" name="amenities[]" class="pull-left zc_check_input" zc_filter_name="amenities"' . conditional_in_array_string($amenityType->get('id'), $initial_filters->get('amenities'), ' checked="checked"') . '></label></li>';
                                }
                            ?>
                        </ul>
                    </div>
                    <?php
                        foreach ($configurations->object() as $configType)
                        {
                            echo '<div><label class="big-checkbox big-label-checkbox text-truncate text-muted" for="configurations' . $configType->get('id') . '" title="' . $lang->line($configType->get('desc')) . '"><input type="checkbox" id="configurations' . $configType->get('id') . '" value="' . $configType->get('id') . '" name="configurations[]" class="pull-left zc_check_input" zc_filter_name="configurations"' . conditional_in_array_string($configType->get('id'), $initial_filters->get('configurations'), ' checked="checked"') . '>' . $lang->line($configType->get('desc')) . '</label></div>';
                        }
                    ?>
                </div>
            </div>
        </div>
        <div class="ok-or-cancel-filters">
            <a id="ok-filters" data-direction="reverse" data-role="button" class="ok-filters ui-link" href="#collapseFilters"><?php echo $lang->line('common_ok');?></a>
            <a data-direction="reverse" data-role="button" class="cancel-filters ui-link" href="#collapseFilters"><?php echo $lang->line('common_cancel');?></a>
        </div>
        <div style="clear: both;"></div>
    </div>
</div>
