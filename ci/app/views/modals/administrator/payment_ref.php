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
                <div class="col-sm-12">
                    <div class="form-group form-group-default">
                        <label>Amount (<?php echo $payment->wrangle('price')->symbols();?>)</label>
                        <br />
                        <?php echo $payment->wrangle('price')->round_to_currency_quantum();?>
                    </div>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <input type="radio" name="payment_type" value="<?php echo Payment_Type::BRAINTREE;?>" checked /> Braintree
                    <br />
                    <input type="radio" name="payment_type" value="<?php echo Payment_Type::BACS;?>" /> BACS
                </div>
                <div class="col-sm-6">
                    <label for="payment_notes">Payment Notes</label>
                    <br />
                    <?php echo $payment->get_html_data_textarea('notes', 'form-control', 'zc_payment_notes', false, ['rows' => 1]);?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="zc_external_reference">Reference</label>
                    <?php echo $payment->get_html_data_input('external_reference', 'form-control', 'text', 'zc_external_reference', false, ['value' => (($payment->get('external_reference') == 'INVOICE'))?'':$payment->get('external_reference')]);?>
                </div>
            </div>
            <div id="bacs_invoice" class="row bottom-m-1" style="display: none;">
                <div class="col-sm-6">
                    <label for="zc_paid_date">Date Paid</label>
                    <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                    <?php echo $payment->get_html_data_input('paid_date', 'form-control datepicker', 'text', 'zc_paid_date', false, ['autocomplete' => 'off']);?>
                </div>
                <div class="col-sm-6">
                    <label for="zc_account">Account</label>
                    <div class="select select-block">
                        <select id="zc_account">
                            <option value="Active Saver">Active Saver</option>
                            <option value="ePayment">ePayment</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>