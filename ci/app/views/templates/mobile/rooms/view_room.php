<div data-role="page" id="venue-menu-page" tabindex="0" class="ui-page ui-page-theme-a ui-page-active venue-css" data-add-back-btn="true">
    <div class="head ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <a id="back_btn" data-rel="back" data-direction="reverse"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $room->wrangle('defaulted_name')->value();?></h1>
        <a href="#main-menu" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_menu');?></a>
    </div>
    <div class="ui-content content" role="main" style="padding-bottom: 0px;">
        <div class="main-pic">
            <div class="pic" style="background-image: url(<?php echo $room->wrangle('image')->get_url('large');?>);"></div>
        </div>
        <div class="header-info">
            <div class="main-info ui-link">
                <h1 class="main-title"><?php echo $room->get('title');?></h1>
                <?php
                    if ($room->get('reviews')->exist())
                    {
                ?>
                        <div class="venue-rating">
                            <span class="star-rating">
                                <div class="star_rating" zc_rating="<?php echo $room->get('reviews')->get_overall_star();?>">
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                </div>
                            </span>
                            <span class="rating-value"><?php echo $room->get('reviews')->wrangle('review_count')->formatted();?></span>
                        </div>
                        <?php
                    }
                        ?>
            </div>
        </div>
        <?php
            if ($room->get('primary_vertical_id') != Vertical::OFFICE)
            {
        ?>
                <div class="main-action multi-btn ui-footer basket-buttons">
                    <div class="ui-btn btn basket-btn">
                        <a id="book_it_button" href="<?php echo get_room_url($room, 'book-room');?>" class="button-label btn-block" data-transition="slide" data-ajax="false"><?php echo $lang->line('Book Now');?></a>
                    </div>
                </div>
                <a href="tel:<?php echo $phone_number;?>" class="callToBook ui-btn room-page">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                </a>
                <?php
            }
                ?>
        <ul data-role="listview" class="ui-listview room-info-list">
            <li class="ui-first-child">
                <?php
                    if (!$reserved_widget_mode)
                    {
                        echo '<div class="zip-icon left phone">' . $lang->line('common_call_us') . ' <a id="room_mobile_phone_number" href="tel:' . $phone_number . '"> ' . $phone_number_display . '</a></div>';
                    }
                    if (isset($tracking_cookie_id))
                    {
                        ?>
                        <div class="venue appointment-guests zip-icon left tag">ID: <?php echo $tracking_cookie_id;?></div>
                        <?php
                    }
                ?>
                <div class="venue appointment-guests zip-icon left location"><?php echo $room->get('venue_city');?></div>
                <?php
                    if ($room->get('primary_vertical_id') == Vertical::OFFICE && !$room->is_null('num_of_desks') && $room->get('num_of_desks') > 0)
                    {
                        echo '<div class="appointment-price zip-icon left numdesk">' . (($room->get('num_of_desks') == 1)?$lang->line('rooms_index_mobile_desk'):$lang->line('rooms_index_mobile_desk', $room->get('num_of_desks'))) . '</div>';
                    }
                    else
                    {
                        echo '<div class="appointment-guests zip-icon left guests">' . $lang->line('rooms_index_mobile_for_up_to', ' ' . $room->wrangle('max_capacity')->formatted()) . '</div>';
                    }
                    if ($room->get('primary_vertical_id') != Vertical::OFFICE && !$room->is_null('minimum_hourly_stay'))
                    {
                        echo '<div class="appointment-duration zip-icon left duration">' . $lang->line('rooms_index_mobile_min_duration', $room->wrangle('minimum_hourly_stay')->formatted()) . '</div>';
                    }
                    if ($room->get('monthly_rate') != 0 || $room->get('hourly_rate') != 0 || $room->get('daily_rate') != 0)
                    {
                        echo '<div class="appointment-price zip-icon left price">';
                        if ($room->get('monthly_rate') != 0)
                        {
                            if (!$room->is_null('user_discount'))
                            {
                                echo '<span class="old-price">' . $room->wrangle('monthly_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_monthly_rate')->formatted(true) . ' /' . $lang->line('common_month') . '</span>';
                            }
                            else
                            {
                                echo $room->wrangle('monthly_rate')->formatted(true) . ' /' . $lang->line('common_month');
                            }
                        }
                        else
                        {
                            if ($room->get('hourly_rate') != 0)
                            {
                                if (!$room->is_null('user_discount'))
                                {
                                    echo '<span class="old-price">' . $room->wrangle('hourly_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_hourly_rate')->formatted(true) . ' /' . $lang->line('common_hour_short') . '</span>';
                                }
                                else
                                {
                                    echo $room->wrangle('hourly_rate')->formatted(true) . ' /' . $lang->line('common_hour_short');
                                }
                            }
                            if ($room->get('hourly_rate') != 0 && $room->get('daily_rate') != 0)
                            {
                                echo ' or ';
                            }
                            if ($room->get('daily_rate') != 0)
                            {
                                if (!$room->is_null('user_discount'))
                                {
                                    echo '<span class="old-price">' . $room->wrangle('daily_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_daily_rate')->formatted(true) . ' /' . $lang->line('common_day') . '</span>';
                                }
                                else
                                {
                                    echo $room->wrangle('daily_rate')->formatted(true) . ' /' . $lang->line('common_day');
                                }
                            }
                        }
                        echo '</div>';
                    }
                    if (($room->get('primary_vertical_id') == Vertical::MEETING || $room->get('primary_vertical_id') == Vertical::PARTY) && $room->get('daily_delegate_rate') != 0)
                    {
                        if (!$room->is_null('user_discount'))
                        {
                            $priceStr = '<span class="old-price">' . $room->wrangle('daily_delegate_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_daily_delegate_rate')->formatted(true) . '</span>';
                        }
                        else
                        {
                            $priceStr = '<span class="old-price">' . $room->wrangle('daily_delegate_rate')->formatted(true) . '</span>';
                        }
                        echo '<div class="appointment-price zip-icon left price">' . $lang->line('rooms_index_mobile_day_delegate', $priceStr) . '</div>';
                    }
                    if ($room->get('primary_vertical_id') == Vertical::DINING && !$room->is_null('minimum_spend') && $room->get('minimum_spend') > 0)
                    {
                        echo '<div class="appointment-price zip-icon left price">' . $lang->line('rooms_index_min_spend', $room->wrangle('minimum_spend')->formatted(true)) . '</div>';
                    }
                    if ($room->get('primary_vertical_id') == Vertical::OFFICE && !$room->is_null('minimum_term') && $room->get('minimum_term') > 0)
                    {
                        echo '<div class="appointment-price zip-icon left duration">' . $lang->line('rooms_index_mobile_min_term', $room->wrangle('minimum_term')->formatted()) . '</div>';
                    }
                    if ($room->get('primary_vertical_id') == Vertical::OFFICE && $room->get('office_type_id') == Office_Type::PRIVATEOFFICE && !$room->is_null('office_size') && $room->get('office_size') != 0 && !$room->is_null('office_size_unit'))
                    {
                        echo '<div class="appointment-price zip-icon left size">' . $lang->line('rooms_index_size') . ' - ' . format_price($room->get('office_size')) . ' ' . str_replace('2', '<sup>2</sup>', $room->get('office_size_unit')) . '</div>';
                    }
                ?>
            </li>
        </ul>
        <div class="venue-menu-details">
            <div class="venue-description">
                <div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-content-theme="false" data-inset="false" data-iconpos="right" class="ui-collapsible ui-collapsible-collapsed">
                    <h3><?php echo $lang->line('common_description');?><span class="ui-collapsible-heading-status"> click to expand contents</span></h3>
                    <p><?php echo $room->get('description');?></p>
                </div>
            </div>
            <div class="venue-opening-hours">
                <div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-content-theme="false" data-inset="false" data-iconpos="right" class="ui-collapsible ui-collapsible-collapsed">
                    <h3><?php echo $lang->line('rooms_index_opening_hours');?><span class="ui-collapsible-heading-status"> click to expand contents</span></h3>
                    <table>
                        <tbody class="normal-font">
                            <?php
                                $maxSlots = $weekly_opening_hours->max_periods();
                                foreach ($weekly_opening_hours->object() as $daily_opening_hours)
                                {
                                    echo '<tr><th class="normal-font">' . $lang->line($daily_opening_hours->label()) . '</th>';
                                    if ($daily_opening_hours->get_count() === 0)
                                    {
                                        echo '<td colspan="3" class="closed">- ' . $lang->line('rooms_closed') . ' -</td></tr>';
                                    }
                                    else
                                    {
                                        $subsequentPeriod = false;
                                        foreach ($daily_opening_hours->aggregated_periods_collection(false)->object(true) as $period)
                                        {
                                            if ($subsequentPeriod)
                                            {
                                                echo '<tr><td>&</td>';
                                            }
                                            echo '<td>' . $period->wrangle('start')->formatted() . '</td><td>-</td><td>' . $period->wrangle('end')->formatted() . '</td></tr>';
                                            $subsequentPeriod = true;
                                        }
                                    }
                                }
                            ?>
                        </tbody>
                    </table>
                </div>
            </div>
            <?php
                if ($room->get('primary_vertical_id') != Vertical::OFFICE)
                {
            ?>
                    <div class="venue-room-layout">
                        <div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-content-theme="false" data-inset="false" data-iconpos="right" class="room-config-container ui-collapsible ui-collapsible-collapsed">
                            <h3><?php echo $lang->line('common_layout');?><span class="ui-collapsible-heading-status"> click to expand contents</span></h3>
                            <?php
                                foreach ($room->get('configurations')->object() as $configuration)
                                {
                                    if ($configuration->data_exists('max_capacity'))
                                    {
                            ?>
                                        <div class="module-unit">
                                            <span class="title normal-font"><?php echo $lang->line($configuration->get('desc'));?> - <?php echo $configuration->wrangle('max_capacity')->formatted();?></span>
                                            <span class="config-icon <?php echo strtolower($configuration->get('desc'));?>"></span>
                                        </div>
                                        <?php
                                    }
                                }
                                        ?>
                        </div>
                    </div>
                    <?php
                }
                if ($room->get('amenities')->exist())
                {
            ?>
                    <div class="venue-amenities">
                        <div data-role="collapsible" data-collapsed-icon="arrow-d" data-expanded-icon="arrow-u" data-content-theme="false" data-inset="false" data-iconpos="right" class="ui-collapsible ui-collapsible-collapsed">
                            <h3><?php echo $lang->line('rooms_index_optional_extras');?><span class="ui-collapsible-heading-status"> click to expand contents</span></h3>
                            <?php
                                foreach ($room->get('amenities')->object() as $amenity)
                                {
                                    echo '<p>';
                                    if ($amenity->is_true('filterable'))
                                    {
                                        echo $lang->line($amenity->get('amenity_desc'));
                                    }
                                    else
                                    {
                                        echo $amenity->get('amenity_desc');
                                    }
                                    echo ' - ';
                                    if ($amenity->is_null('cost'))
                                    {
                                        echo $lang->line('common_included');
                                    }
                                    else
                                    {
                                        echo $amenity->wrangle('price')->formatted(true);
                                    }
                                    echo '</p>';
                                }
                            ?>
                        </div>
                    </div>
                    <?php
                }
                    ?>
        </div>
        <div class="venue-location read-more">
            <h3 class="text-hd big-divider">
                <span>
                    <b><?php echo $lang->line('rooms_index_about_venue');?></b>
                </span>
            </h3>
            <span class="room-page-map">
                <a href="<?php echo 'http://maps.apple.com/?q=' . $room->get('lat') . ',' . $room->get('long');?>">
                    <span class="map-wrapper" style="background: url(<?php echo $room->wrangle('map')->get_url(400, 255, 14);?>) center no-repeat;"></span>
                </a>
            </span>
            <a href="<?php echo 'http://maps.apple.com/?q=' . $room->get('lat') . ',' . $room->get('long');?>" class="address ui-link">
                <span class="title"><?php echo $lang->line('common_address');?>:</span>
                <?php
                    if ($this->dx_auth->is_admin())
                    {
                        echo $room->get('address');
                    }
                    else
                    {
                        echo $room->get_venue_address();
                    }
                ?>
            </a>
        </div>
        <?php
            if (!$reserved_widget_mode)
            {
                if ($siblings->exist())
                {
        ?>
                    <ul data-role="listview" class="simple-list venue-list price-list single-group-venue menu-view ui-listview" style="display: block;">
                        <h3 class="text-hd big-divider">
                            <span>
                                <b><?php echo $lang->line('rooms_index_other_rooms');?></b>
                            </span>
                        </h3>
                        <?php
                            foreach ($siblings->object() as $sibling)
                            {
                        ?>
                                <li class="venue ui-li-has-count ui-first-child">
                                    <a href="<?php echo get_room_url($sibling);?>" class="venue-link ui-btn ui-btn-active" rel="" data-ajax="true">
                                        <div class="venue-image" style="background-image: url(<?php echo $sibling->wrangle('image')->get_url('small');?>);"></div>
                                        <h3 class="venue-title"><?php echo $sibling->wrangle('defaulted_name')->value();?></h3>
                                        <p class="venue-other-info">
                                            <?php
                                                if ($room->get('primary_vertical_id') != Vertical::OFFICE)
                                                {
                                                    echo '<span class="venue-address"><span>';
                                                    if ($sibling->get('min_capacity') == $sibling->get('max_capacity'))
                                                    {
                                                        echo $sibling->wrangle('max_capacity')->formatted();
                                                    }
                                                    else
                                                    {
                                                        echo $sibling->capacity_range();
                                                    }
                                                    echo '</span></span>';
                                                }
                                                if ($sibling->get('reviews')->exist())
                                                {
                                            ?>
                                                    <span class="venue-rating">
                                                        <span class="star_rating" zc_rating="<?php echo $sibling->get('review_score');?>">
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                        </span>
                                                        <span class="rating-value"><?php echo $sibling->get('reviews')->wrangle('review_count')->formatted();?></span>
                                                    </span>
                                                    <?php
                                                }
                                                    ?>
                                        </p>
                                        <span class="count ui-li-count ui-body-inherit">
                                            <span class="prices">
                                                <?php
                                                    if ($sibling->get('hourly_rate') != 0)
                                                    {
                                                        echo '<span class="price">';
                                                        if (!$sibling->is_null('user_discount'))
                                                        {
                                                            echo '<span class="old-price">' . $sibling->wrangle('hourly_rate')->formatted(true) . '</span><span>' . $sibling->wrangle('discount_hourly_rate')->formatted(true) . '</span>';
                                                        }
                                                        else
                                                        {
                                                            echo $sibling->wrangle('hourly_rate')->formatted(true);
                                                        }
                                                        echo ' /' . $lang->line('common_hour') . '</span>';
                                                    }
                                                    if ($sibling->get('daily_rate') != 0)
                                                    {
                                                        echo '<br /><span class="price">';
                                                        if (!$sibling->is_null('user_discount'))
                                                        {
                                                            echo '<span class="old-price">' . $sibling->wrangle('daily_rate')->formatted(true) . '</span><span>' . $sibling->wrangle('discount_daily_rate')->formatted(true) . '</span>';
                                                        }
                                                        else
                                                        {
                                                            echo $sibling->wrangle('daily_rate')->formatted(true);
                                                        }
                                                        echo ' /' . $lang->line('common_day') . '</span>';
                                                    }
                                                    if ($sibling->get('monthly_rate') != 0)
                                                    {
                                                        echo '<br /><span class="price">';
                                                        if (!$sibling->is_null('user_discount'))
                                                        {
                                                            echo '<span class="old-price">' . $sibling->wrangle('monthly_rate')->formatted(true) . '</span><span>' . $sibling->wrangle('discount_monthly_rate')->formatted(true) . '</span>';
                                                        }
                                                        else
                                                        {
                                                            echo $sibling->wrangle('monthly_rate')->formatted(true);
                                                        }
                                                        echo ' /' . $lang->line('common_month') . '</span>';
                                                    }
                                                ?>
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <?php
                            }
                                ?>
                    </ul>
                    <?php
                }
            }
                    ?>
        <div class="footer ui-footer ui-bar-inherit" data-role="footer" role="contentinfo">
            <div class="footer-logo">Zipcube</div>
        </div>
    </div>
</div>