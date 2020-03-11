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
    <div class="space-top-2">
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <input type="radio" name="payment_type" value="<?php echo Payment_Type::BRAINTREE;?>" checked /> Braintree
                    <br />
                    <input type="radio" name="payment_type" value="<?php echo Payment_Type::BACS;?>" /> BACS
                    <br />
                    <input type="radio" name="payment_type" value="<?php echo Payment_Type::INVOICE;?>" /> Invoice
                </div>
                <div class="col-sm-6">
                    <label for="payment_notes">Payment Notes</label>
                    <br />
                    <?php echo $payment->get_html_data_textarea('notes', 'form-control', 'zc_payment_notes', false, ['rows' => 1]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-12">
                    <b>Original Reservation Price (<?php echo $reservation->wrangle('total_price')->symbols();?>): <?php echo $reservation->wrangle('price')->round_to_currency_quantum();?></b>
                    <br />
                    <b>Extra Fee (<?php echo $reservation->wrangle('extra_fee')->symbols();?>) (inc VAT): <?php echo $reservation->wrangle('extra_fee')->round_to_currency_quantum();?></b>
                    <br />
                    <b>Flexible Fee (<?php echo $reservation->wrangle('flexible_fee')->symbols();?>) (inc VAT): <?php echo $reservation->wrangle('flexible_fee')->round_to_currency_quantum();?></b>
                    <br />
                    <b>Price Control Fee (<?php echo $reservation->wrangle('price_control_fee')->symbols();?>) (inc VAT): <?php echo $reservation->wrangle('price_control_fee')->round_to_currency_quantum();?></b>
                    <hr />
                    <b>Original Total (<?php echo $reservation->wrangle('total_price')->symbols();?>) (inc VAT): <span id="zc_grand_total"><?php echo $reservation->wrangle('total_price')->round_to_currency_quantum();?></span></b>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="price">Amount Added (<?php echo $reservation->wrangle('price')->symbols();?>)</label>
                    <input id="zc_reservation_pay_price" name="zc_reservation_pay_price" class="form-control" value="" type="text">
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="extra_fee">Extra Fee Added (<?php echo $reservation->wrangle('extra_fee')->symbols();?>) (inc VAT)</label>
                    <input id="zc_reservation_pay_extra_fee" name="zc_reservation_pay_extra_fee" class="form-control" value="" type="text">
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="flexible_fee">Flexible Fee Added (<?php echo $reservation->wrangle('flexible_fee')->symbols();?>) (inc VAT)</label>
                    <input id="zc_reservation_pay_flexible_fee" name="zc_reservation_pay_flexible_fee" class="form-control" value="" type="text">
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <b>Payment Total (<?php echo $reservation->wrangle('total_price')->symbols();?>) (inc VAT): <span id="zc_payment_total">0</span></b>
                    <input type="hidden" id="zc_payment_total_amount" value="0" />
                    <br />
                    <b>New Reservation Total (<?php echo $reservation->wrangle('total_price')->symbols();?>) (inc VAT): <span id="zc_total"><?php echo $reservation->wrangle('total_price')->round_to_currency_quantum();?></span></b>
                </div>
            </div>
            <div id="braintree_card_details" class="row bottom-m-1">
                <input type="hidden" id="braintree_client_token" value="<?php echo $braintree_client_token;?>" />
                <div id="card_number" class="col-sm-8">
                    <label for="braintree_card_number"><?php echo $lang->line('payments_index_form_payment_card_number');?><span class="required">*</span></label>
                    <input id="braintree_card_number" class="form-control inspectletIgnore" name="braintree_card_number" type="tel" value="" autocomplete="off" maxlength="16" minlength="15">
                </div>
                <div class="col-sm-4">
                    <label for="security-number"><?php echo $lang->line('payments_index_form_payment_card_cvv');?></label>
                    <input name="security-number" class="inspectletIgnore" id="" type="tel" value="" autocomplete="off" maxlength="4" minlength="3">
                </div>
                <div class="form_input_row">
                    <div class="col-sm-8">
                        <label for="braintree_card_name"><?php echo $lang->line('payments_index_form_payment_card_name');?><span class="required">*</span></label>
                        <input name="braintree_card_name" id="braintree_card_name" type="text" value="<?php echo $reservation->wrangle('client_name')->formatted();?>" />
                    </div>
                    <div class="col-sm-4">
                        <label><?php echo $lang->line('payments_index_form_payment_card_expiry');?><span class="required">*</span></label>
                        <div id="expiry-selector">
                            <div class="col-sm-6 left-p-0">
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
                            <div class="col-sm-6 right-p-0">
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
                        </div>
                    </div>
                </div>
            </div>
            <div id="bacs_invoice" class="row bottom-m-1" style="display: none;">
                <div class="col-sm-6">
                    <label for="zc_paid_date">Date Paid<span class="required">*</span></label>
                    <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                    <?php echo $payment->get_html_data_input('paid_date', 'form-control datepicker', 'text', 'zc_paid_date', false, ['autocomplete' => 'off']);?>
                </div>
                <div class="col-sm-6">
                    <label for="zc_account">Account<span class="required">*</span></label>
                    <div class="select select-block">
                        <select id="zc_account">
                            <option value="Active Saver">Active Saver</option>
                            <option value="ePayment">ePayment</option>
                        </select>
                    </div>
                </div>
                <div class="form_input_row">
                    <div class="col-sm-8">
                        <label for="zc_external_reference">Reference<span class="required">*</span></label>
                        <?php echo $payment->get_html_data_input('external_reference', 'form-control', 'text', 'zc_external_reference');?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>