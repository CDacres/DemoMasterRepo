<form>
    <div class="form-group space-top-2 bottom-p-1 separator-dotted">
        <div class="row">
            <div id="firstName" class="col-sm-6">
                <label for="first_name"><?php echo $lang->line('modals_booking_client_first_name');?><span class="required">*</span></label>
                <input type="text" class="form-control" id="first_name" autocomplete="off">
                <p id="Econtact_first_name" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_first_name');?></p>
            </div>
            <div id="lastName" class="col-sm-6">
                <label for="last_name"><?php echo $lang->line('modals_booking_client_last_name');?><span class="required">*</span></label>
                <input type="text" class="form-control title" id="last_name" autocomplete="off">
                <p id="Econtact_last_name" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_last_name');?></p>
            </div>
        </div>
        <div class="row space-top-2">
            <div id="email" class="col-sm-6">
                <label for="email"><?php echo $lang->line('modals_booking_client_email');?><span class="required">*</span></label>
                <input type="email" class="form-control email-check" id="email_address" autocomplete="off">
            </div>
            <div id="phone" class="col-sm-6">
                <div class="form_input_row-phone-prefix">
                    <div class="b-dropdown js-phone-prefix">
                        <label for="phone_number"><?php echo $lang->line('modals_booking_client_phone');?><span class="required">*</span></label>
                        <input type="tel" name="phone_number" class="form-control zc_user_phone_number" id="phone_number" autocomplete="off">
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <p id="Econtact_email" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_email');?></p>
            </div>
            <div class="form-group col-sm-6">
                <p id="Econtact_phone" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_phone');?></p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h5 id="title"><?php echo $lang->line('modals_hold_details');?></h5>
        </div>
    </div>
    <div class="form-group space-top-2 bottom-p-1 separator-dotted">
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group form-group-default">
                    <div class="row">
                        <div class="col-sm-6 date_input">
                            <label for="start_date"><?php echo $lang->line('modals_booking_start_date');?><span class="required">*</span></label>
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input type="text" class="form-control datepicker" id="zc_schedule_booking_start_date" autocomplete="off">
                        </div>
                        <div class="col-sm-6">
                            <label for="zc_schedule_booking_start_time"><?php echo $lang->line('modals_booking_start_time');?><span class="required">*</span></label>
                            <div class="select select-block">
                                <select id="zc_schedule_booking_start_time">
                                    <?php
                                        $startdateTime = new DateTime();
                                        $startmin = 0;
                                        while ($startmin <= 1440)
                                        {
                                            echo '<option value="' . $startdateTime->setTime(0, $startmin)->format('H:i') . '">' . $startdateTime->setTime(0, $startmin)->format('H:i') . '</option>';
                                            $startmin += 30;
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group form-group-default">
                    <div class="row">
                        <div class="col-sm-6 date_input">
                            <label for="end_date"><?php echo $lang->line('modals_booking_end_date');?><span class="required">*</span></label>
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input type="text" class="form-control datepicker" id="zc_schedule_booking_end_date" autocomplete="off">
                        </div>
                        <div class="col-sm-6">
                            <label for="zc_schedule_booking_end_time"><?php echo $lang->line('modals_booking_end_time');?><span class="required">*</span></label>
                            <div class="select select-block">
                                <select id="zc_schedule_booking_end_time">
                                    <?php
                                        $enddateTime = new DateTime();
                                        $endmin = 0;
                                        while ($endmin <= 1440)
                                        {
                                            echo '<option value="' . $enddateTime->setTime(0, $endmin)->format('H:i') . '">' . $enddateTime->setTime(0, $endmin)->format('H:i') . '</option>';
                                            $endmin += 30;
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 date_input">
                            <p id="Econtact_dates" class="Credit_Error" style="display: none;"><?php echo $lang->line('modals_booking_multi_day_error');?></p>
                        </div>
                    </div>
                </div>
                <div class="form-group form-group-default">
                    <div class="row">
                        <div id="price_container" class="col-sm-6">
                            <label for="price"><?php echo $lang->line('modals_reservation_price');?> (<?php echo $room->get('currency_symbol_left');?>)<span class="required">*</span></label>
                            <input type="text" class="form-control" id="price">
                        </div>
                        <div id="guests_container" class="col-sm-6">
                            <label for="guests"><?php echo $lang->line('common_guests_upper');?><span class="required">*</span></label>
                            <div class="select select-block">
                                <select id="guests" name="guests" class="form-control">
                                    <option value="0" disabled selected style='display:none;'><?php echo $lang->line('common_select');?></option>
                                    <?php
                                        for ($i = 1; $i <= $room->get('max_capacity'); ++$i)
                                        {
                                    ?>
                                            <option value="<?php echo $i;?>"><?php echo $i;?></option>
                                            <?php
                                        }
                                            ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <p id="Econtact_price" class="Credit_Error" style="display: none;"><?php echo $lang->line('modals_booking_valid_price');?></p>
                        </div>
                        <div class="col-sm-6">
                            <p id="Econtact_guests" class="Credit_Error" style="display: none;"><?php echo $lang->line('modals_booking_valid_guests');?></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <h5 id="title"><?php echo $lang->line('payments_booking_confirmed_room_config_heading');?><span class="required">*</span></h5>
        </div>
    </div>
    <div class="form-group space-top-2 bottom-p-1 separator-dotted">
        <div class="btn-group" data-toggle="buttons">
            <?php
                foreach ($room->get('configurations')->object() as $configuration)
                {
                    if ($configuration->data_exists('max_capacity'))
                    {
                        if ($configuration == $room->get('configurations')->get_first() || $configuration->get_id() == Configuration::BOARDROOM)
                        {
                            $inputCheck = ' checked="checked"';
                        }
                        else
                        {
                            $inputCheck = '';
                        }
            ?>
                        <div class="block-radio-button">
                            <label class="btn btn-block block-radio-button__panel">
                                <div class="row no-margin-h">
                                    <div class="pull-left">
                                        <span class="config-icon <?php echo strtolower($configuration->get('desc'));?>"></span>
                                    </div>
                                    <div class="pull-left text-lead block-radio-button__label">
                                        <span><?php echo $lang->line('common_room_configuration', $lang->line($configuration->get('desc')), $configuration->wrangle('max_capacity')->formatted());?></span>
                                    </div>
                                    <div class="pull-right">
                                        <input id="roomconf_<?php echo $configuration->get('id');?>" type="radio" value="<?php echo $configuration->get('id');?>" class="room-config-radio" name="roomconf"<?php echo $inputCheck;?>>
                                    </div>
                                </div>
                            </label>
                        </div>
                        <?php
                    }
                }
                        ?>
        </div>
        <p id="Eroomconf" class="Credit_Error" style="display: none;"><?php echo $lang->line('payments_index_form_error_room_config');?></p>
        <div class="row">
            <div class="col-sm-6">
                <a data-toggle="collapse" href="#add_comment" aria-expanded="false" aria-controls="add_comment"><span class="plus">+</span> <?php echo $lang->line('payments_index_form_event_add_comments');?></a>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 space-top-1">
                <div class="collapse" id="add_comment">
                    <input type="text" id="comments" class="bottom-m-1" placeholder="<?php echo $lang->line('modals_booking_comment');?>">
                </div>
            </div>
        </div>
    </div>
    <?php
        /*if ($room->get('amenities')->exist())
        {
    ?>
            <div class="row">
                <div class="col-md-12">
                    <h5 id="title">Add-Ons (Optional)</h5>
                </div>
            </div>
            <div class="form-group separator-dotted">
                <div class="row">
                    <div class="form-group col-sm-6">
                        <a data-toggle="collapse" href="#add_add_ons" aria-expanded="false" aria-controls="add_add_ons"><span class="plus">+</span> Add Add-Ons</a>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-12 space-top-2">
                        <div class="collapse" id="add_add_ons">
                            <?php
                                foreach ($room->get('amenities')->object() as $amenity)
                                {
                                    if ($amenity->is_true('allow_price'))
                                    {
                            ?>
                                        <div class="add_on overflow-hidden bottom-m-1 bottom-p-1 separator-dotted-light">
                                            <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9 only-right-p-1">
                                                <p class="add_on_name">
                                                    <?php
                                                        echo $amenity->get('amenity_desc');
                                                        if ($amenity->is_null('price'))
                                                        {
                                                            echo ' (Included)';
                                                        }
                                                    ?>
                                                </p>
                                            </div>
                                            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-3 p-0">
                                                <div class="select select-block">
                                                    <select class="dropdown-toggle add_ons_selector" zc_add_on_id="<?php echo $amenity->get('id');?>">
                                                        <option zc_add_on_price="0" zc_add_on_number="0">None</option>
                                                        <?php
                                                            for ($i = 1; $i <= $room->get('max_capacity')*2; ++$i)
                                                            {
                                                        ?>
                                                                <option zc_add_on_price="<?php echo $i*$amenity->get('price');?>" zc_add_on_number="<?php echo $i;?>">
                                                                    <?php
                                                                        echo $i;
                                                                        if (!$amenity->is_null('price'))
                                                                        {
                                                                            echo ' for ' . $amenity->wrangle('price')->multiple_formatted($i, true);
                                                                        }
                                                                    ?>
                                                                </option>
                                                                <?php
                                                            }
                                                                ?>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <?php
                                    }
                                }
                                        ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }*/
            ?>
    <div class="form-group bottom-p-1 left-p-0 separator-dotted col-sm-10">
        <div class="checkout-section payment bottom-m-1">
            <div class="checkout-section payment-select bottom-m-1">
                <div class="double-button b-payment-methods">
                    <div class="zipcube-radio radio unit pre-pay">
                        <label class="checked" for="checkout_form_booking_payment_type_braintree">
                            <input class="checkout-payment__method-trigger js-update-booking-btn js-toggler-trigger zc_payment_type_toggle radio-label" data-submitcaption="Complete booking" id="checkout_form_booking_payment_type_braintree" name="checkout_form[booking][payment_type]" type="radio" value="braintree" checked="true">
                            <?php echo $lang->line('payments_index_form_payment_card');?>
                        </label>
                    </div>
                    <div class="zipcube-radio radio unit pay-at-venue">
                        <label for="checkout_form_booking_payment_type_venue">
                            <input type="radio" name="checkout_form[booking][payment_type]" class="checkout-payment__method-trigger js-update-booking-btn js-toggler-trigger zc_payment_type_toggle" data-submitcaption="Pay at Venue" id="checkout_form_booking_payment_type_venue" value="venue">
                            <a data-container=".modal-body" data-toggle="popover" data-placement="top" data-html="true" data-trigger="hover" data-content="<?php echo $lang->line('modals_booking_pay_at_venue_tooltip');?>"><?php echo $lang->line('modals_booking_pay_at_venue');?></a>
                        </label>
                    </div>
                </div>
            </div>
            <div id="toggler_braintree" class="payment-method-decription pre-pay card-details toggler__content">
                <div class="new-card top1 bottom1">
                    <div class="payment-cards form_input_row overflow-hidden">
                        <span class="title"><?php echo $lang->line('payments_index_form_payment_card_heading');?></span>
                        <div class="card-type">
                            <span class="card site-card-visa">Visa</span>
                            <span class="card site-card-mastercard">Master Card</span>
                            <span class="card site-card-amex">American Express</span>
                        </div>
                    </div>
                    <div class="form_input_row">
                        <div id="card_number" class="form-group col-lg-9 col-md-9 col-sm-8 col-xs-12 left-p-0">
                            <label for="braintree_card_number"><?php echo $lang->line('payments_index_form_payment_card_number');?><span class="required">*</span></label>
                            <input id="braintree_card_number" class="form-control inspectletIgnore" name="braintree_card_number" type="tel" value="" autocomplete="off" maxlength="16" minlength="15">
                            <p id="Ebtree_card_number" class="Credit_Error" style="display: none;"><?php echo $lang->line('payments_index_form_error_card_number');?></p>
                        </div>
                        <div id="cvv" class="form-group col-lg-3 col-md-3 col-sm-4 col-xs-6 left-p-0 right-p-0 hidden-xs">
                            <label for="security-number">
                                <?php echo $lang->line('payments_index_form_payment_card_cvv');?>
                                <span class="site-question hidden-sm hidden-xs" data-toggle="tooltip" data-placement="top" title="<?php echo $lang->line('payments_index_form_payment_card_tooltip');?>">?</span>
                            </label>
                            <input name="security-number" class="inspectletIgnore" id="" type="tel" value="" autocomplete="off" maxlength="4" minlength="3">
                        </div>
                    </div>
                    <div class="form_input_row overflow-hidden">
                        <div class="form-group col-lg-9 col-md-9 col-sm-8 col-xs-12 left-p-0">
                            <label for="braintree_card_name"><?php echo $lang->line('payments_index_form_payment_card_name');?><span class="required">*</span></label>
                            <input name="braintree_card_name" id="braintree_card_name" type="text">
                        </div>
                        <div class="form-group col-lg-3 col-md-3 col-sm-4 col-xs-6 left-p-0 right-p-0">
                            <label><?php echo $lang->line('payments_index_form_payment_card_expiry');?><span class="required">*</span></label>
                            <div id="expiry-selector">
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 card-expiry-month-dropdown">
                                    <div class="select select-block">
                                        <select class="form-control" data-encrypted-name="expiryMonth" id="braintree_card_month">
                                            <option value="-1" disabled selected style='display:none;'><?php echo $lang->line('common_month_dropdown');?></option>
                                            <?php
                                                for ($month = 1; $month <= 12; ++$month)
                                                {
                                                    $monthValue = date("m", mktime(0, 0, 0, $month, 1));
                                                    echo '<option value="' . $monthValue . '">' . $monthValue . '</option>';
                                                }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 card-expiry-year-dropdown">
                                    <div class="select select-block">
                                        <select class="form-control" data-encrypted-name="expiryYear" id="braintree_card_year">
                                            <option value="-1" disabled selected style='display:none;'><?php echo $lang->line('common_year_dropdown');?></option>
                                            <?php
                                                $currYear = date("Y");
                                                for ($year = 0; $year <= 10; ++$year)
                                                {
                                                    $yearValue = $currYear + $year;
                                                    echo '<option value="' . $yearValue . '">' . $yearValue . '</option>';
                                                }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                                <p id="Ebtree_exp_date" class="Credit_Error" style="display: none;"><?php echo $lang->line('payments_index_form_error_card_expiry');?></p>
                            </div>
                        </div>
                        <div class="form-group col-xs-6 visible-xs">
                            <label for="security-number"><?php echo $lang->line('payments_index_form_payment_card_cvv');?></label>
                            <input name="security-number" class="inspectletIgnore" id="" type="tel" value="" autocomplete="off" maxlength="4" minlength="3">
                        </div>
                    </div>
                </div>
            </div>
            <div id="toggler_venue" class="payment-method-decription pre-pay card-details toggler__content">
                <div class="new-card top1 bottom1 clearfix">
                    <div class="payment-cards form_input_row overflow-hidden">
                        <span class="title"><?php echo $lang->line('modals_booking_pay_at_venue');?></span>
                    </div>
                    <div class="form_input_row">
                        <div class="form-group col-xs-12 left-p-0">
                            <label for="braintree_card_number"><?php echo $lang->line('modals_booking_reference');?></label>
                            <input id="payment_reference" name="payment_reference" type="text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--    <div class="checkout-section">
        <div class="form_input_row overflow-hidden2">
            <div class="b-line-items">
                <div class="order-total">
                    <span class="amount col-md-12 col-sm-12 col-xs-12 text-right bottom-m-2 p-0">
                        <span class="dark-blue-font">Booking total:</span>
                        <span class="dark-blue-font"><strong><?php //echo $reservation->wrangle('price')->left_symbol() . '<span id="booking_total" class="zc_total_cost">' . $reservation->get('base_price') . '</span>' . $reservation->wrangle('price')->right_symbol();?></strong></span>
                    </span>
                </div>
            </div>
        </div>
    </div>-->
</form>