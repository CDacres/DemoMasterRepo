<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $reservation->get('id');?></p>
            </div>
        </div>
    </div>
</div>
<div class="form-group-attached">
    <?php
        if ($isAdmin && !$reservation->is_blocked())
        {
    ?>
            <div class="row bottom-m-1">
                <div class="col-sm-12">
                    <label>Payments</label>
                    <br />
                    <?php echo $this->load->view(THEME_FOLDER . '/administrator/payment/snippets/payment_details', ['data' => $reservation], true);?>
                </div>
            </div>
            <?php
        }
            ?>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <label><?php echo $lang->line('common_room');?></label>
            <br />
            <?php
                echo $reservation->get('room_name');
                if ($reservation->is_true('room_enabled') && $reservation->is_true('venue_enabled'))
                {
                    echo ' (<a href="' . get_room_url($reservation) . '" target="_blank">' . $reservation->get('room_id') . '</a>)';
                }
            ?>
        </div>
        <div class="col-sm-6">
            <label><?php echo $lang->line('common_venue');?></label>
            <br />
            <?php
                echo $reservation->get('venue_name');
                if ($reservation->is_true('venue_enabled'))
                {
                    echo ' (<a href="' . get_venue_url($reservation) . '" target="_blank">' . $reservation->get('venue_id') . '</a>)';
                }
            ?>
            <br />
            <a data-toggle="collapse" data-parent="#accordion" href="#collapsePhone" class="collapsed"><span class="plus">+</span> <?php echo $lang->line('common_contact');?></a>
            <div id="collapsePhone" class="panel-collapse collapse" role="tabpanel" style="height: 0px;">
                <div class="panel-body">
                    <a href="tel:<?php echo $reservation->get('venue_phone');?>"><?php echo $reservation->get('venue_phone');?></a>
                </div>
            </div>
        </div>
    </div>
    <div class="row bottom-m-1">
    <?php
        if (!$reservation->is_blocked())
        {
    ?>
            <div class="col-sm-6">
                <label><?php echo $lang->line('common_client');?></label>
                <br />
                <?php echo $reservation->wrangle('client_name')->formatted() . ' (' . $reservation->get('client_id') . ')';?>
                <br />
                <a data-toggle="collapse" data-parent="#accordion" href="#collapseClient" class="collapsed"><span class="plus">+</span> <?php echo $lang->line('common_contact');?></a>
                <div id="collapseClient" class="panel-collapse collapse" role="tabpanel" style="height: 0px;">
                    <div class="panel-body">
                        <a href="tel:<?php echo $reservation->get('client_phone');?>"><?php echo $reservation->get('client_phone');?></a>
                        <?php
                            if ($isAdmin)
                            {
                                echo '<br />' . $reservation->get('client_email');
                            }
                        ?>
                    </div>
                </div>
            </div>
            <?php
        }
        if ($isAdmin)
        {
            ?>
                <div class="col-sm-6">
                    <label for="total_price">Transaction (<?php echo $reservation->wrangle('total_price')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('total_price', 'form-control', 'text', 'zc_reservation_total_price', false, ['readonly' => true, 'value' => $reservation->wrangle('total_price')->round_to_currency_quantum()]);?>
                </div>
            <?php
        }
            ?>
    </div>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <label><?php echo $lang->line('modals_reservation_start_date_time');?></label>
            <br />
            <?php echo $reservation->wrangle('reservation_start_date_time')->formatted();?>
        </div>
        <?php
            if ($isAdmin)
            {
        ?>
                <div class="col-sm-6">
                    <label for="extra_fee">- Extra Fee (<?php echo $reservation->wrangle('extra_fee')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('extra_fee', 'form-control', 'text', 'zc_reservation_extra_fee', false, ['readonly' => true, 'value' => $reservation->wrangle('extra_fee')->round_to_currency_quantum()]);?>
                </div>
                <?php
            }
                ?>
    </div>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <label><?php echo $lang->line('modals_reservation_end_date_time');?></label>
            <br />
            <?php echo $reservation->wrangle('reservation_end_date_time')->formatted();?>
        </div>
        <?php
            if ($isAdmin)
            {
        ?>
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
                                echo 'Flexible (' . $reservation->get('flexible_percent') . '%)';
                            }
                            else
                            {
                                echo 'Non-Refundable';
                            }
                        ?>
                    </div>
                </div>
                <?php
            }
                ?>
    </div>
    <?php
        if (!$reservation->is_blocked())
        {
    ?>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label><?php echo $lang->line('common_guests_upper');?></label>
                    <br />
                    <?php echo $reservation->get('guests');?>
                </div>
                <?php
                    if ($isAdmin)
                    {
                ?>
                        <div class="col-sm-6 bottom-p-1 separator-dotted">
                            <label for="add_on_price">- Add Ons (<?php echo $reservation->wrangle('add_on_price')->symbols();?>)</label>
                            <?php echo $reservation->get_html_data_input('add_on_price', 'form-control', 'text', 'zc_reservation_add_on_price_readonly', false, ['readonly' => true, 'value' => $reservation->wrangle('add_on_price')->round_to_currency_quantum()]);?>
                        </div>
                        <?php
                    }
                        ?>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label><?php echo $lang->line('common_layout');?></label>
                    <br />
                    <?php echo $reservation->get('configuration');?>
                </div>
                <?php
                    if ($isAdmin)
                    {
                ?>
                        <div class="col-sm-6">
                            <label for="flexible_fee">= Display Price (<?php echo $reservation->wrangle('display_price')->symbols();?>) (inc VAT)</label>
                            <?php echo $reservation->get_html_data_input('display_price', 'form-control', 'text', 'zc_reservation_display_price', false, ['readonly' => true, 'value' => $reservation->wrangle('display_price')->round_to_currency_quantum()]);?>
                        </div>
                        <?php
                    }
                        ?>
            </div>
            <?php
                if ($isAdmin)
                {
            ?>
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
                    <?php
                }
        }
                    ?>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <label for="comments">Comments</label>
            <br />
            <?php echo $reservation->get('comments');?>
        </div>
        <?php
            if ($isAdmin)
            {
        ?>
                <div class="col-sm-6">
                    <label for="price">= Base Venue Price (<?php echo $reservation->wrangle('base_venue_price')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('base_venue_price', 'form-control', 'text', 'zc_reservation_base_price', false, ['readonly' => true, 'value' => $reservation->wrangle('base_venue_price')->round_to_currency_quantum()]);?>
                </div>
                <?php
            }
                ?>
    </div>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <label for="comments">Add-Ons</label>
            <br />
            <?php echo $reservation->get('addOns');?>
        </div>
        <?php
            if ($isAdmin)
            {
        ?>
                <div class="col-sm-6 bottom-p-1 separator-dotted">
                    <label for="add_on_price">+ Add Ons (<?php echo $reservation->wrangle('add_on_price')->symbols();?>)</label>
                    <?php echo $reservation->get_html_data_input('add_on_price', 'form-control', 'text', 'zc_reservation_add_on_price', false, ['readonly' => true, 'value' => $reservation->wrangle('add_on_price')->round_to_currency_quantum()]);?>
                </div>
                <?php
            }
                ?>
    </div>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <?php
                if ($isAdmin)
                {
            ?>
                    <label for="notes">Notes</label>
                    <br />
                    <?php echo $reservation->get('zipcube_notes');
                }
                else
                {
                    ?>
                    <label for="price"><?php echo $lang->line('modals_reservation_price');?></label>
                    <br />
                    <?php echo $reservation->wrangle('price')->formatted(true);
                }
                    ?>
        </div>
        <?php
            if ($isAdmin)
            {
        ?>
                <div class="col-sm-6">
                    <label for="commissionable_amount">= Commissionable Amount (<?php echo $reservation->wrangle('price')->symbols();?>)</label>
                    <?php echo $reservation->get_html_data_input('commissionable_amount', 'form-control', 'text', 'zc_reservation_commissionable_amount', false, ['readonly' => true, 'value' => $reservation->wrangle('price')->round_to_currency_quantum()]);?>
                </div>
                <?php
            }
                ?>
    </div>
    <?php
        if ($isAdmin)
        {
    ?>
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
                        <label for="commission">- Commission</label>
                    </div>
                    <div class="col-sm-3 left-p-0"><?php echo $reservation->get_html_data_input('commissionable_rate', 'form-control', 'text', 'zc_commissionable_rate', false, ['readonly' => true, 'value' => $reservation->get_commission_rate() . '%']);?></div>
                    <div class="col-sm-9 right-p-0"><?php echo $reservation->get_html_data_input('toZipcube', 'form-control', 'text', 'zc_reservation_toZipcube', false, ['readonly' => true, 'value' => $reservation->wrangle('admin_commission')->round_to_currency_quantum()]);?></div>
                </div>
            </div>
            <?php
        }
            ?>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <?php
                if (!$isAdmin)
                {
            ?>
                    <label for="payout"><?php echo $lang->line('dashboard_table_payout');?></label>
                    <br />
                    <?php echo $reservation->wrangle('pay_out')->formatted(true);
                }
                    ?>
        </div>
        <?php
            if ($isAdmin)
            {
        ?>
                <div class="col-sm-6">
                    <label for="toVenue">= Payout (<?php echo $reservation->wrangle('pay_out')->symbols();?>) (inc VAT)</label>
                    <?php echo $reservation->get_html_data_input('toVenue', 'form-control', 'text', 'zc_reservation_toVenue_with_vat', false, ['readonly' => true, 'value' => $reservation->wrangle('pay_out')->round_to_currency_quantum()]);?>
                </div>
                <?php
            }
                ?>
    </div>
</div>
<?php
    if ($isAdmin && !$reservation->is_blocked())
    {
?>
        <div class="row bottom-m-1">
            <div class="col-sm-12">
                <div class="clearfix p-l-10 m-t-10 sm-m-t-10">
                    <div class="pull-left"></div>
                    <div class="pull-right">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseInstructions" class="collapsed pull-right bold text-uppercase p-r-10"><span class="plus">+</span> Instructions</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row bottom-m-1">
            <div class="col-sm-12">
                <div id="collapseInstructions" class="panel-collapse collapse" role="tabpanel" style="height: 0px;">
                    <div class="row">
                        <div class="col-sm-12">
                            <h3>Instructions</h3>
                            <ol>
                                <li>Check all info before any change</li>
                                <li>Extra Charge needed? Verify <a href="https://www.braintreegateway.com/merchants/wqndsmqq8kxbxy4h/transactions/" target="_blank">Braintree id</a> and charge the card before switching. (Debit/ Credit card OK, Paypal call client)</li>
                                <li>Don't make any changes before the payment has been confirmed!</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php
    }