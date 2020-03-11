<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $reservation->get_id();?></p>
            </div>
        </div>
    </div>
</div>
<?php
    if ($reservation->is_true('is_paid'))
    {
?>
        <div class="row">
            <div class="col-sm-12">
                <span class="label label-danger">
                    <strong>This reservation has been paid!</strong>
                </span>
                <?php echo $this->load->view('/modals/administrator/snippets/venue_payments', ['venue_payments' => $venue_payments], true);?>
            </div>
        </div>
        <?php
    }
        ?>
<div class="row">
    <div class="col-sm-12">
        <div class="form-group form-group-default">
            <label>Cancellation policy</label>
            <br />
            <?php
                if ($cancellation->get('cancellation_type') == Cancellation_Type::CUSTOM || ($cancellation->is_null('cancellation_type') && !$cancellation->is_null('cancellation_percentage')))
                {
                    echo 'The client gets ' . $cancellation->get('cancellation_percentage') . '% refund ' . $cancellation->get('cancellation_period') . ' working day(s) before the meeting happens.';
                }
                else
                {
                    if (!$cancellation->is_null('cancellation_type_desc'))
                    {
                        echo $cancellation->get('cancellation_type_desc') . '.';
                    }
                    else
                    {
                        echo 'No cancellation policy set.';
                    }
                }
            ?>
        </div>
    </div>
</div>
<div class="row">
    <?php
        if ($reservation->is_true('flexible_applied') && !$reservation->is_null('flexible_fee') && $reservation->get('flexible_fee') > 0)
        {
            ?>
            <div class="col-sm-6">
                <span class="label label-success">
                    <?php
                        if ($refund_eligible)
                        {
                            echo 'Eligible for refund - new price would be ' . $reservation->wrangle('price')->left_symbol() . format_price($new_price) . $reservation->wrangle('price')->right_symbol();
                        }
                        else
                        {
                            echo 'Eligible for full refund due to flexible booking';
                        }
                    ?>
                </span>
                <br />
                <button class="btn btn-success" id="full_refund_btn" type="button">Full Refund</button>
            </div>
            <?php
        }
        else
        {
            ?>
            <div class="col-sm-6">
                <span class="label label-danger">Non-Refundable</span>
            </div>
            <?php
        }
            ?>
</div>
<form>
    <input type="hidden" id="zc_status_host" value="<?php echo Reservation_Status::CANCELLEDBYHOST;?>" />
    <input type="hidden" id="zc_status_user" value="<?php echo Reservation_Status::CANCELLEDBYUSER;?>" />
    <?php echo $reservation->get_html_data_input('room_id', null, 'hidden', 'zc_reservation_room_id');?>
    <input type="hidden" id="zc_venue_vat" value="<?php echo $reservation->get_venue_vat();?>" />
    <div class="space-top-2">
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="room_id">Room ID</label>
                    <br />
                    <?php echo $reservation->get('room_id');?>
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
                    <label>Start Date - Time</label>
                    <br />
                    <?php echo $reservation->wrangle('reservation_start_date_time')->formatted();?>
                </div>
                <div class="col-sm-6">
                    <label for="extra_fee">- Extra Fee (<?php echo $reservation->wrangle('extra_fee')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('extra_fee', 'form-control', 'text', 'zc_reservation_extra_fee', false, ['readonly' => true, 'value' => $reservation->wrangle('extra_fee')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label>End Date - Time</label>
                    <br />
                    <?php echo $reservation->wrangle('reservation_end_date_time')->formatted();?>
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
                            if ($reservation->is_true('flexible_applied') && !$reservation->is_null('flexible_fee') && $reservation->get('flexible_fee') > 0)
                            {
                                echo 'Flexible (<span id="zc_reservation_flexible_percent">' . $reservation->get('flexible_percent') . '</span>%)';
                            }
                            else
                            {
                                echo 'Non-Refundable';
                            }
                        ?>
                    </div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="duration">Guests</label>
                    <br />
                    <?php echo $reservation->get('guests');?>
                </div>
                <div class="col-sm-6 bottom-p-1 separator-dotted">
                    <label for="add_on_price">- Add Ons (<?php echo $reservation->wrangle('add_on_price')->symbols();?>)</label>
                    <?php echo $reservation->get_html_data_input('add_on_price', 'form-control', 'text', 'zc_reservation_add_on_price_readonly', false, ['readonly' => true, 'value' => $reservation->wrangle('add_on_price')->round_to_currency_quantum()]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="configuration"><?php echo $lang->line('common_layout');?></label>
                    <br />
                    <?php echo $reservation->get('configuration');?>
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