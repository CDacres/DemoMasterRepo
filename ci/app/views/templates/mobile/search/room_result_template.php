<li class="venue ui-li-has-count ui-first-child">
    <a href="<?php echo get_room_url($room);?>" class="venue-link ui-btn" data-transition="slide" data-ajax="true" data-room-name="<?php echo $room->get('title');?>" data-room-id="<?php echo $room->get_id();?>" data-room-price="<?php
            if (!$room->is_null('hourly_rate'))
            {
                echo $room->wrangle('hourly_rate')->round_up();
            }
            elseif (!$room->is_null('daily_rate'))
            {
                echo $room->wrangle('daily_rate')->round_up();
            }
            elseif (!$room->is_null('monthly_rate'))
            {
                echo $room->wrangle('monthly_rate')->round_up();
            }
        ?>" data-venue-name="<?php echo $room->get('venue_name');?>">
        <div class="venue-image" style="background-image: url(<?php echo $room->wrangle('image')->get_url('small');?>);"></div>
        <h3 class="venue-title"><?php echo $room->get('title');?></h3>
        <p class="venue-other-info">
            <span class="venue-address">
                <?php
                    if ($room->get('primary_vertical_id') == Vertical::OFFICE)
                    {
                        echo $lang->line('common_up_to', ' ' . $room->get('num_of_desks') . ' ' . (($room->get('num_of_desks') > 1)?$lang->line('common_desks_lower'):$lang->line('common_desk_lower')));
                    }
                    else
                    {
                        echo $lang->line('common_up_to', ' ' . $room->wrangle('max_capacity')->formatted());
                    }
                ?>
            </span>
            <?php
                if ($room->get('review_count') > 0 && !$room->is_null('review_score'))
                {
            ?>
                    <span class="venue-rating">
                        <span class="star_rating" zc_rating="<?php echo $room->get('review_score');?>">
                            <span>&#x2606;</span>
                            <span>&#x2606;</span>
                            <span>&#x2606;</span>
                            <span>&#x2606;</span>
                            <span>&#x2606;</span>
                        </span>
                        <span class="rating-value"><?php echo $room->wrangle('venue_review_count')->formatted();?></span>
                    </span>
                    <?php
                }
                    ?>
        </p>
        <span class="count ui-li-count ui-body-inherit">
            <span class="prices">
                <?php
                    if ($room->data_exists('hourly_rate'))
                    {
                ?>
                        <span class="price">
                            <?php
                                if (!$room->is_null('user_discount'))
                                {
                                    echo '<span class="old-price">' . $room->get('currency_symbol_left') . $room->wrangle('hourly_rate')->round_up() . '</span><span>' . $room->get('currency_symbol_left') . $room->wrangle('discount_hourly_rate')->round_up() . '</span>';
                                }
                                else
                                {
                                    echo $room->get('currency_symbol_left') . $room->wrangle('hourly_rate')->round_up();
                                }
                            ?>
                            <i> /<?php echo $lang->line('common_hour');?></i>
                        </span>
                        <?php
                    }
                    if ($room->data_exists('daily_rate'))
                    {
                        ?>
                        <br />
                        <span class="price">
                            <?php
                                if (!$room->is_null('user_discount'))
                                {
                                    echo '<span class="old-price">' . $room->get('currency_symbol_left') . $room->wrangle('daily_rate')->round_up() . '</span><span>' . $room->get('currency_symbol_left') . $room->wrangle('discount_daily_rate')->round_up() . '</span>';
                                }
                                else
                                {
                                    echo $room->get('currency_symbol_left') . $room->wrangle('daily_rate')->round_up();
                                }
                            ?>
                            <i> /<?php echo $lang->line('common_day');?></i>
                        </span>
                        <?php
                    }
                        ?>
            </span>
        </span>
    </a>
</li>