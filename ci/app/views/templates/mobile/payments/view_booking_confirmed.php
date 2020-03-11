<div data-role="page" id="booking-confirmed-page" class="checkout-complete-page ui-page ui-page-theme-a ui-page-active" tabindex="0">
    <div class="head no-buttons ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('payments_booking_confirmed_mobile_heading');?>: <?php echo $reservation->get('id');?></h1>
    </div>
    <div class="content checkout-complete-content ui-content" data-role="content" role="main">
        <div class="order-summary">
            <img alt="<?php echo htmlspecialchars($room->get('title')) . ' ' . $lang->line('payments_at') . ' ' .htmlspecialchars($room->get('venue_name'));?>" title="<?php echo htmlspecialchars($room->get('title')) . ' ' . $lang->line('payments_at') . ' ' . htmlspecialchars($room->get('venue_name'));?>" class="room-image" src="<?php echo $room->wrangle('image')->get_url('large');?>">
            <ul data-role="listview" class="link-list simple-list ui-listview">
                <li class="ui-first-child">
                    <div class="venue zip-icon left location"><?php echo $room->get('venue_name');?> - <?php echo $room->get('address');?></div>
                    <div class="appointment-date zip-icon left date"><?php echo $reservation->wrangle('reservation_start_date_time')->formatted('checkoutday');?>, <?php echo $reservation->wrangle('reservation_start_date_time')->formatted('checkout');?>, <?php echo $reservation->wrangle('reservation_start_date_time')->formatted('checkouttime');?></div>
                    <div class="appointment-duration zip-icon left duration"><?php echo $reservation->wrangle('reservation_duration')->formatted();?></div>
                    <div class="appointment-guests zip-icon left guests"><?php echo $reservation->wrangle('reservation_guests')->formatted();?></div>
                    <div class="appointment-config zip-icon left config"><?php echo $lang->line('common_room_configuration', $lang->line($configuration->get('desc')), $configuration->wrangle('max_capacity')->formatted());?></div>
                    <div class="appointment-price zip-icon left price"><?php echo '<strong>' . $reservation->wrangle('price')->left_symbol() . '<span class="zc_total_cost">' . $reservation->wrangle('total_price')->round_to_currency_quantum() . '</span>' . '</strong>' . $reservation->wrangle('price')->right_symbol();?></div>
                </li>
                <?php
                    if (!$reservation->is_null('client_discount'))
                    {
                ?>
                        <li class="no-border ui-li-static ui-body-inherit">
                            <strong><?php echo $lang->line('payments_index_sidebar_booking_details_discount');?>:</strong> <?php echo $reservation->get('client_discount');?>%
                        </li>
                        <?php
                    }
                    if ($reservation->data_not_empty('addOns'))
                    {
                        ?>
                        <li class="no-border ui-li-static ui-body-inherit">
                            <h4><?php echo $lang->line('payments_booking_confirmed_add_ons_heading');?>:</h4>
                            <input id="addons" type="hidden" value="<?php echo $reservation->get('addOns');?>" />
                            <ul id="addons_list"></ul>
                        </li>
                        <?php
                    }
                    /*
                    ------------------------------------------------------------
                    NOTE: Code below is for showing user reservation comments
                    ------------------------------------------------------------
                    if ($reservation->get('comments'))
                    {
                        ?>
                        <li class="no-border ui-li-static ui-body-inherit">
                            <h4>Your Comments:</h4>
                            <p><?php echo $reservation->get('comments');?></p>
                        </li>
                        <?php
                    }
                    */
                        ?>
            </ul>
        </div>
        <ul data-role="listview" class="ui-listview bottom-border-0">
            <li clas="no-border ui-li-static ui-body-inherit ui-first-child">
                <p><?php echo $lang->line('payments_booking_confirmed_request_text_1', $room->get('venue_name'));?></p>
                <p><?php echo $lang->line('payments_booking_confirmed_request_text_2');?></p>
                <p><?php echo $lang->line('payments_booking_confirmed_request_text_3', $reservation->get('client_email'));?></p>
            </li>
        </ul>
        <ul data-role="listview" class="link-list simple-list return ui-listview">
            <?php /*
            ------------------------------------------------------------------
            Code below is for Book Again at this Venue - currently breaks history chain (back button)
            ------------------------------------------------------------------
            <!-- <li class="ui-first-child">
                <a href="/<?php echo $country_lang_url;?>/rooms/<?php echo $room->get('id');?>" rel="external" class="ui-icon-refresh ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false">Book again at this venue</a>
            </li> -->
            */ ?>
            <li class="ui-last-child">
                <a href="/<?php echo $country_lang_url;?>" rel="external" class="ui-icon-close ui-btn ui-btn-icon-right ui-icon-carat-r" data-ajax="false"><?php echo $lang->line('payments_booking_confirmed_mobile_return');?></a>
            </li>
        </ul>
    </div>
</div>
