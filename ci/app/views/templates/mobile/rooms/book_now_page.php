<div data-role="page" id="book-room" tabindex="0" class="ui-page ui-page-theme-a venue-css">
    <?php
        foreach ($reserved_css as $cScript)
        {
            echo $cScript . "\n\r";
        }
        if (count($reserved_js_variables) > 0)
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
    <div class="head no-buttons ui-header ui-bar-inherit" data-role="header">
        <a id="back_btn" href="#" data-rel="back"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('common_book') . ' ' . $room->get('title');?></h1>
        <a href="#main-menu" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_menu');?></a>
    </div>
    <div class="content offer-details-content ui-content" role="main">
        <div class="offer-summary">
            <div class="b-important absolute">
                <div id="book_it" class="booking-section">
                    <div class="tab-content">
                        <div id="back" class="back_room">
                            <div class="title_mob"><?php echo $lang->line('rooms_index_select_date_time');?></div>
                        </div>
                        <h3 class="home-subhd">
                            <?php
                                if ($room->get('hourly_rate') == 0)
                                {
                                    echo $lang->line('rooms_daily_book');
                                }
                                if ($room->get('daily_rate') == 0)
                                {
                                    echo $lang->line('rooms_hourly_book');
                                }
                            ?>
                        </h3>
                        <div id="booking_type_options" class="ament_title">
                            <div class="btn-group btn-group-justified" role="group" aria-label="...">
                                <div class="btn-group" role="group">
                                    <button id="hourly_booking_toggle" type="button"
                                        <?php
                                            if ($room->get('hourly_rate') == 0)
                                            {
                                                echo ' class="btn btn-block active btn-toggle btn-toggle-disabled disabled" data-toggle="tooltip" data-placement="bottom" title="' . $lang->line('rooms_hourly_unavailable') . '" disabled';
                                            }
                                            else
                                            {
                                                echo ' class="btn btn-block active btn-toggle"';
                                            }
                                        ?>
                                    ><?php echo $lang->line('rooms_index_hourly');?></button>
                                </div>
                                <div class="btn-group" role="group">
                                    <button id="daily_booking_toggle" type="button"
                                        <?php
                                            if ($room->get('daily_rate') == 0)
                                            {
                                                echo ' class="btn btn-block btn-toggle btn-toggle-disabled disabled" data-toggle="tooltip" data-placement="bottom" title="' . $lang->line('rooms_daily_unavailable') . '" disabled';
                                            }
                                            else
                                            {
                                                echo ' class="btn btn-block btn-toggle"';
                                            }
                                        ?>
                                    ><?php echo $lang->line('rooms_index_daily');?></button>
                                </div>
                            </div>
                        </div>
                        <div id="date-selectors">
                            <div id="checkin-selector" class="check-in">
                                <div class="main-icon"></div>
                                <div class="title">
                                    <span id="startdate"><?php echo $lang->line('rooms_index_checkin_date');?>:</span>
                                    <input id="checkin" name="checkin" value="<?php echo $lang->line('common_click_here');?>" type=""/>
                                    <div id="hourly_bubble_book" class="bubble-book bubble-book-position hide">
                                        <div class="bubble-book-text"><?php echo $lang->line('rooms_index_select_checkin_date');?></div>
                                    </div>
                                </div>
                            </div>
                            <div id="checkout-selector" class="check-in" style="display: none;">
                                <div class="main-icon"></div>
                                <div class="title">
                                    <span id="enddate"><?php echo $lang->line('rooms_index_checkout_date');?>:</span>
                                    <input id="checkout" name="checkout" value="<?php echo $lang->line('common_click_here');?>" type=""/>
                                    <div id="daily_bubble_book" class="bubble-book bubble-book-position hide">
                                        <div class="bubble-book-text"><?php echo $lang->line('rooms_index_checkout_date');?></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id="checkin-container" style="display: block;"></div>
                            <div id="checkout-container" style="display: none;"></div>
                        </div>
                        <div id="slots"></div>
                        <div id="filter-popup" class="quantity-selection clearfix">
                            <div class="filter-block">
                                <div class="filter-guests">
                                    <div class="ui-select">
                                        <div id="filter-date-button" class="ui-btn ui-icon-carat-d ui-btn-icon-right hidden-input">
                                            <span class="number_of_guests-filter-text"></span>
                                            <select id="number_of_guests" class="browse-filter guests guests_section zc_value_input" name="attendees" data-corners="false" data-shadow="false" data-iconshadow="false">
                                                <option value="0" selected="selected"><?php echo $lang->line('rooms_mobile_select_attendees');?></option>
                                                <?php
                                                    for ($i = 1; $i <= $room->get('max_capacity'); ++$i)
                                                    {
                                                ?>
                                                        <option value="<?php echo $i;?>" <?php echo ((isset($guests) and $i == $guests)?'selected="selected"':'');?>><?php echo $i;?></option>
                                                        <?php
                                                    }
                                                        ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="clear-all" class="clear-selection clearfix"><?php echo $lang->line('common_clear_all');?></div>
                        <div class="discount-type s_houre" id="zc_duration_wrapper" style="display: none;">
                            <span id="s_houre"></span>
                            <span class="h_text" id="hourse_title"><?php echo $lang->line('rooms_index_hours');?></span>
                        </div>
                        <div class="discount-type duration_days" id="zc_days_duration_wrapper" style="display: none;">
                            <span id="days"></span>
                            <span class="h_text" id="hourse_title"><?php echo $lang->line('rooms_index_days');?></span>
                        </div>
                    </div>
                </div>
                <div id="book_it_bar" class="main-action multi-btn ui-footer basket-buttons">
                    <a href="#checkout-log-in" class="ui-btn btn basket-btn book_it_button" data-transition="slide" data-ajax="true">
                        <span class="button-label"><?php echo $lang->line('rooms_mobile_book_now') . ' ' . $room->get('currency_symbol_left');?>
                            <span id="total_price" class="enabled">-</span><?php echo $room->get('currency_symbol_right');?>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>