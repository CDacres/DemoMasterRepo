<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $reservation->get('id');?></p>
            </div>
        </div>
    </div>
</div>
<form>
    <input type="hidden" id="zc_redundant_reservation_id" value="<?php echo $redundant_reservation_id;?>" />
    <input type="hidden" id="zc_venue_vat" value="<?php echo $reservation->get_venue_vat();?>" />
    <div class="space-top-2">
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="room_id">Room ID</label>
                    <?php echo $reservation->get_html_data_input('room_id', 'form-control', 'text', 'zc_reservation_room_id');?>
                </div>
                <div class="col-sm-6">
                    <div class="col-sm-6 left-p-0">
                        <label for="total_price">Transaction (<?php echo $reservation->wrangle('total_price')->symbols();?>) (inc VAT)</label>
                        <?php echo $reservation->get_html_data_input('total_price', 'form-control', 'text', 'zc_reservation_total_price', false, ['value' => $reservation->wrangle('total_price')->round_to_currency_quantum()]);?>
                    </div>
                    <div class="col-sm-6">
                        <label for="total_price">Original Transaction (<?php echo $reservation->wrangle('total_price')->symbols();?>) (inc VAT)</label>
                        <br />
                        <?php echo $reservation->wrangle('total_price')->formatted(true);?>
                    </div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <div class="col-sm-6 left-p-0">
                        <label for="zc_reservation_start_time">Start Time</label>
                        <div class="select select-block">
                            <select id="zc_reservation_start_time">
                                <?php
                                    $startdateTime = new DateTime();
                                    $startmin = 0;
                                    $selectedstart = ($reservation->wrangle('reservation_start_date_time')->format_by_string('H') * 60) + $reservation->wrangle('reservation_start_date_time')->format_by_string('i');
                                    while ($startmin <= 1440)
                                    {
                                        echo '<option value="' . $startdateTime->setTime(0, $startmin)->format('H:i') . '"';
                                        if ($startmin == $selectedstart)
                                        {
                                            echo ' selected';
                                        }
                                        echo '>' . $startdateTime->setTime(0, $startmin)->format('H:i') . '</option>';
                                        $startmin += 30;
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 right-p-0">
                        <label for="start_date">Start Date</label>
                        <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                        <?php echo $reservation->get_html_data_input('start_date_time', 'form-control datepicker', 'text', 'zc_reservation_start_date', false, ['value' => $reservation->wrangle('reservation_start_date_time')->formatted('date'), 'autocomplete' => 'off']);?>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label for="extra_fee">- Extra Fee (<?php echo $reservation->wrangle('extra_fee')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('extra_fee', 'form-control', 'text', 'zc_reservation_extra_fee', false, ['readonly' => true, 'value' => $reservation->wrangle('extra_fee')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <div class="col-sm-6 left-p-0">
                        <label for="zc_reservation_end_time">End Time</label>
                        <div class="select select-block">
                            <select id="zc_reservation_end_time">
                                <?php
                                    $enddateTime = new DateTime();
                                    $endmin = 0;
                                    $selectedend = ($reservation->wrangle('reservation_end_date_time')->format_by_string('H') * 60) + $reservation->wrangle('reservation_end_date_time')->format_by_string('i');
                                    while ($endmin <= 1440)
                                    {
                                        echo '<option value="' . $enddateTime->setTime(0, $endmin)->format('H:i') . '"';
                                        if ($endmin == $selectedend)
                                        {
                                            echo ' selected';
                                        }
                                        echo '>' . $enddateTime->setTime(0, $endmin)->format('H:i') . '</option>';
                                        $endmin += 30;
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-6 right-p-0">
                        <label for="end_date">End Date</label>
                        <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                        <?php echo $reservation->get_html_data_input('end_date_time', 'form-control datepicker', 'text', 'zc_reservation_end_date', false, ['value' => $reservation->wrangle('reservation_end_date_time')->formatted('date'), 'autocomplete' => 'off']);?>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="col-sm-7 left-p-0">
                        <label for="flexible_fee">- Flexible Fee (<?php echo $reservation->wrangle('flexible_fee')->symbols();?>) (inc VAT)</label>
                    </div>
                    <div class="col-sm-5 right-p-0">
                        <label for="flexible_applied">Flexible?</label>
                    </div>
                    <div class="col-sm-7 left-p-0"><?php echo $reservation->get_html_data_input('flexible_fee', 'form-control', 'text', 'zc_reservation_flexible_fee', false, ['readonly' => true, 'value' => $reservation->wrangle('flexible_fee')->round_to_currency_quantum()]);?></div>
                    <div class="col-sm-5 right-p-0">
                        <?php
                            $flex_checked = false;
                            if ($reservation->is_true('flexible_applied') && !$reservation->is_null('flexible_fee') && $reservation->get('flexible_fee') > 0)
                            {
                                $flex_checked = true;
                            }
                        ?>
                        <input type="radio" name="zc_reservation_flexible_applied" value="1"<?php echo (($flex_checked)?' checked':'');?> /> Flexible (<span id="zc_reservation_flexible_percent"><?php echo $reservation->get('flexible_percent');?></span>%)
                        <br />
                        <input type="radio" name="zc_reservation_flexible_applied" value="0"<?php echo ((!$flex_checked)?' checked':'');?> /> Non-Refundable
                    </div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="duration">Guests</label>
                    <?php echo $reservation->get_html_data_input('guests', 'form-control', 'text', 'zc_reservation_guests');?>
                </div>
                <div class="col-sm-6 bottom-p-1 separator-dotted">
                    <label for="add_on_price">- Add Ons (<?php echo $reservation->wrangle('add_on_price')->symbols();?>)</label>
                    <?php echo $reservation->get_html_data_input('add_on_price', 'form-control', 'text', 'zc_reservation_add_on_price_readonly', false, ['readonly' => true, 'value' => $reservation->wrangle('add_on_price')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="zc_reservation_configuration"><?php echo $lang->line('common_layout');?></label>
                    <div class="select select-block">
                        <select id="zc_reservation_configuration">
                            <?php
                                foreach ($configs->object() as $configuration)
                                {
                                    echo '<option value="' . $configuration->get('desc') . '"';
                                    if ($reservation->get('configuration') == $configuration->get('desc'))
                                    {
                                        echo ' selected';
                                    }
                                    echo '>' . $configuration->get('desc') . ' (' . $configuration->get('max_capacity') . ')</option>';
                                }
                            ?>
                        </select>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label for="flexible_fee">= Display Price (<?php echo $reservation->wrangle('display_price')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('display_price', 'form-control', 'text', 'zc_reservation_display_price', false, ['readonly' => true, 'value' => $reservation->wrangle('display_price')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6"></div>
                <div class="col-sm-6 bottom-p-1 separator-dotted">
                    <div class="col-sm-9 left-p-0">
                        <label for="price_control_fee">- Price Control Fee (<?php echo $reservation->wrangle('price_control_fee')->symbols();?>) (inc VAT)</label>
                    </div>
                    <div class="col-sm-3 right-p-0">
                        <label for="price_control_applied">%</label>
                    </div>
                    <div class="col-sm-9 left-p-0"><?php echo $reservation->get_html_data_input('price_control_fee', 'form-control', 'text', 'zc_reservation_price_control_fee', false, ['readonly' => true, 'value' => $reservation->wrangle('price_control_fee')->round_to_currency_quantum()]);?></div>
                    <div class="col-sm-3 right-p-0"><?php echo $reservation->get_html_data_input('price_control_applied', 'form-control', 'text', 'zc_reservation_price_control_applied', false, ['readonly' => true]);?></div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="comments">Comments</label>
                    <?php echo $reservation->get_html_data_textarea('comments', 'form-control', 'zc_reservation_comments', false, ['rows' => 1]);?>
                </div>
                <div class="col-sm-6">
                    <div class="col-sm-6 left-p-0">
                        <label for="price">= Base Venue Price (<?php echo $reservation->wrangle('base_venue_price')->symbols();?>) (inc VAT)</label>
                        <?php echo $reservation->get_html_data_input('base_venue_price', 'form-control', 'text', 'zc_reservation_base_price', false, ['value' => $reservation->wrangle('base_venue_price')->round_to_currency_quantum()]);?>
                    </div>
                    <div class="col-sm-6">
                        <label for="total_price">Original Base Venue Price (<?php echo $reservation->wrangle('base_venue_price')->symbols();?>) (inc VAT)</label>
                        <br />
                        <?php echo $reservation->wrangle('base_venue_price')->formatted(true);?>
                    </div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="comments">Add-Ons</label>
                    <?php echo $reservation->get_html_data_textarea('addOns', 'form-control', 'zc_reservation_add_ons', false, ['rows' => 1]);?>
                </div>
                <div class="col-sm-6 bottom-p-1 separator-dotted">
                    <label for="add_on_price">+ Add Ons (<?php echo $reservation->wrangle('add_on_price')->symbols();?>)</label>
                    <?php echo $reservation->get_html_data_input('add_on_price', 'form-control', 'text', 'zc_reservation_add_on_price', false, ['value' => $reservation->wrangle('add_on_price')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="notes">Notes</label>
                    <?php echo $reservation->get_html_data_textarea('zipcube_notes', 'form-control', 'zc_reservation_notes', false, ['rows' => 1]);?>
                </div>
                <div class="col-sm-6">
                    <label for="commissionable_amount">= Commissionable Amount (<?php echo $reservation->wrangle('price')->symbols();?>)</label>
                    <?php echo $reservation->get_html_data_input('commissionable_amount', 'form-control', 'text', 'zc_reservation_commissionable_amount', false, ['readonly' => true, 'value' => $reservation->wrangle('price')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <?php
                        if (!$reservation->is_null('client_discount') && !$reservation->is_null('discount_applied'))
                        {
                    ?>
                            <label for="discount"><?php echo $lang->line('dashboard_discount');?></label>
                            <br />
                            <?php echo $reservation->get('discount_applied');
                        }
                            ?>
                </div>
                <div class="col-sm-6 bottom-p-1 separator-dotted">
                    <div>
                        <label for="zc_reservation_commission">- Commission</label>
                    </div>
                    <div class="col-sm-3 left-p-0">
                        <div class="select select-block">
                            <select id="zc_reservation_commission">
                                <?php
                                    $commission = $reservation->get_commission_rate();
                                    $commission_rounded = format_price($commission);
                                    $rateExists = false;
                                    foreach ($commission_rates as $rate)
                                    {
                                        $rate_value = format_price($rate);
                                        echo '<option value="' . $rate_value . '"';
                                        if ($rate_value == $commission_rounded)
                                        {
                                            echo ' selected';
                                            $rateExists = true;
                                        }
                                        echo '>' . $rate . '%</option>';
                                    }
                                    if (!$rateExists)
                                    {
                                        echo '<option value="' . $commission_rounded . '" selected>' . $commission . '%</option>';
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-9 right-p-0"><?php echo $reservation->get_html_data_input('toZipcube', 'form-control', 'text', 'zc_reservation_toZipcube', false, ['readonly' => true, 'value' => $reservation->wrangle('admin_commission')->round_to_currency_quantum()]);?></div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6"></div>
                <div class="col-sm-6">
                    <?php echo $reservation->get_html_data_input('toVenue', null, 'hidden', 'zc_reservation_toVenue');?>
                    <label for="toVenue">= Payout (<?php echo $reservation->wrangle('pay_out')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('toVenue', 'form-control', 'text', 'zc_reservation_toVenue_with_vat', false, ['value' => $reservation->wrangle('pay_out')->round_to_currency_quantum()]);?>
                </div>
            </div>
        </div>
    </div>
</form>