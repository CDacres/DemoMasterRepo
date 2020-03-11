<div class="menu-group<?php echo (($this->dx_auth->is_admin() && !$room->is_approved())?' sibling-unapproved':'');?>">
    <div class="group-title clearfix toggler-offer">
        <div class="sibling-room">
            <div class="sibling-column image-column">
                <div class="sibling-room-image" style="background-image: url(<?php echo $room->wrangle('image')->get_url('small');?>);">
                    <?php
                        if ($this->dx_auth->is_admin())
                        {
                    ?>
                            <a href="<?php echo get_room_url($room, '', true);?>" class="btn btn-xs btn-edit" target="_blank">Edit Room</a>
                            <?php
                        }
                            ?>
                </div>
            </div>
            <div class="left-p-1 sibling-column">
                <h3 class="title-wrapper">
                    <span class="title-value"><?php echo $room->wrangle('defaulted_name')->value();?></span>
                    <?php
                        if ($room->is_true('uses_live_bookings'))
                        {
                            echo '<span class="glyphicon glyphicon-flash live_booking_flash" aria-hidden="true" title="' . $lang->line('common_instant_book') . '"></span>';
                        }
                    ?>
                    <br />
                    <span class="show-more">
                        <span><?php echo $lang->line('rooms_index_other_rooms_see_more');?></span>
                        <span class="icon site-arrow-more-down-bw"></span>
                    </span>
                </h3>
            </div>
            <div class="p-0 sibling-column">
                <div class="sibling-room">
                    <div class="text-right sibling-column pricing">
                        <span class="price-summary">
                            <div class="row">
                                <div class="col-xs-12">
                                    <span class="price">
                                        <?php
                                            if ($room->get('primary_vertical_id') != Vertical::OFFICE)
                                            {
                                                if ($room->get('min_capacity') == $room->get('max_capacity'))
                                                {
                                                    echo $room->get('min_capacity') . ' ' . $lang->line((($room->get('min_capacity') == 1)?'common_person_upper':'common_people_upper'));
                                                }
                                                else
                                                {
                                                    echo $room->get('min_capacity') . '-' . $room->get('max_capacity') . ' ' . $lang->line('common_people_upper');
                                                }
                                            }
                                        ?>
                                    </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <span class="price">
                                        <span class="from"><?php echo $lang->line('rooms_index_other_rooms_price_from');?></span>
                                        <?php
                                            if ($room->get('hourly_rate') != 0)
                                            {
                                                if (!$room->is_null('user_discount'))
                                                {
                                                    echo '<span class="old-price">' . $room->wrangle('hourly_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_hourly_rate')->formatted(true) . '</span>';
                                                }
                                                else
                                                {
                                                    echo $room->wrangle('hourly_rate')->formatted(true);
                                                }
                                                echo ' /' . $lang->line('common_hour');
                                                if ($this->dx_auth->is_admin())
                                                {
                                                    echo ' (Venue: ' . $room->wrangle('venue_hourly_rate')->formatted(true) . ')';
                                                }
                                            }
                                            if ($room->get('hourly_rate') != 0 && $room->get('monthly_rate') != 0)
                                            {
                                                echo ' ';
                                            }
                                            if ($room->get('monthly_rate') != 0)
                                            {
                                                if (!$room->is_null('user_discount'))
                                                {
                                                    echo '<span class="old-price">' . $room->wrangle('monthly_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_monthly_rate')->formatted(true) . '</span>';
                                                }
                                                else
                                                {
                                                    echo $room->wrangle('monthly_rate')->formatted(true);
                                                }
                                                echo ' /' . $lang->line('common_month');
                                                if ($this->dx_auth->is_admin())
                                                {
                                                    echo ' (Venue: ' . $room->wrangle('venue_monthly_rate')->formatted(true) . ')';
                                                }
                                            }
                                        ?>
                                    </span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12">
                                    <?php
                                        if ($room->get('daily_rate') != 0)
                                        {
                                            echo '<span id="daily-deal-' . $room->get_id() . '" class="value daily-deal" data-room-id="' . $room->get_id() . '" data-hourly-rate="' . ((!$room->is_null('user_discount'))?$room->get('discount_hourly_rate'):$room->get('hourly_rate')) . '" data-daily-rate="' . ((!$room->is_null('user_discount'))?$room->get('discount_daily_rate'):$room->get('daily_rate')) . '" data-currency-code="' . $room->get('currency_code') . '">';
                                            if (!$room->is_null('user_discount'))
                                            {
                                                echo '<span class="old-price">' . $room->wrangle('daily_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_daily_rate')->formatted(true) . '</span>';
                                            }
                                            else
                                            {
                                                echo $room->wrangle('daily_rate')->formatted(true);
                                            }
                                            echo ' /' . $lang->line('common_day') . '</span>';
                                            if ($this->dx_auth->is_admin())
                                            {
                                                echo ' (Venue: ' . $room->wrangle('venue_daily_rate')->formatted(true) . ')';
                                            }
                                        }
                                    ?>
                                </div>
                            </div>
                        </span>
                    </div>
                    <div class="text-right sibling-column">
                        <a href="<?php echo get_room_url($room);?>" class="btn btn-primary book-button"><?php echo $lang->line('Book Now');?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="offers toggler-offer-content">
        <table>
            <tbody>
                <tr>
                    <td class="offer-title">
                        <a href="<?php echo get_room_url($room);?>">
                            <div class="sibling-title-value">
                                <strong><?php echo $room->wrangle('defaulted_name')->value();?></strong>
                            </div>
                            <div class="pricing-module">
                                <?php
                                    if ($room->get('primary_vertical_id') != Vertical::OFFICE)
                                    {
                                        foreach ($room->get('configurations')->object() as $configuration)
                                        {
                                            if ($configuration->data_exists('max_capacity'))
                                            {
                                                ?>
                                                <div class="module-unit">
                                                    <span class="title normal-font"><?php echo $lang->line($configuration->get('desc'));?></span>
                                                    <span class="value-container normal-font config-small"><?php echo $configuration->get('max_capacity');?></span>
                                                    <span class="config-icon-small <?php echo strtolower($configuration->get('desc'));?>"></span>
                                                </div>
                                                <?php
                                            }
                                        }
                                    }
                                ?>
                            </div>
                            <div class="title-value"><?php echo $room->get('description');?></div>
                        </a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>