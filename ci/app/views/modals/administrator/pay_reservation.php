<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $reservation->get_id();?></p>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <span class="bold text-uppercase">Previous Payments</span>
                <?php echo $this->load->view('/modals/administrator/snippets/venue_payments', ['venue_payments' => $venue_payments], true);?>
            </div>
        </div>
    </div>
</div>
<form>
    <div class="row bottom-m-1">
        <div class="col-sm-6">
            <label for="amount">Amount (<?php echo $reservation->wrangle('pay_out')->symbols();?>) (inc VAT)</label>
            <?php echo $res_venue_payment->get_html_data_input('amount', 'form-control', 'text', 'zc_reservation_venue_payment', false, ['value' => $reservation->wrangle('pay_out')->round_to_currency_quantum()]);?>
        </div>
    </div>
</form>