<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="jumbotron">
                <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                        <div class="row">
                            <div class="col-lg-9 col-md-9 col-sd-9">
                                <div class="panel panel-transparent">
                                    <div class="panel-body">
                                        <h4>Payouts</h4>
                                        <div id="zc_payout_table" class="col-lg-6 col-md-6 col-sd-6"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <div class="col-md-6 left-p-0">
                                    <div class="select select-block">
                                        <select id="zc_payment_periods" name="payment_periods">
                                            <?php
                                                if ($payment_periods->exists_in_db())
                                                {
                                                    $last = new DateTime('last day of last month');
                                                    $lastYear = $last->format('Y');
                                                    $lastMonth = $last->format('n');
                                                    foreach ($payment_periods->object() as $payment_period)
                                                    {
                                                        echo '<option value="' . $payment_period->get_id() . '"' . (($payment_period->get('period_year') == $lastYear && $payment_period->get('period_month') == $lastMonth)? ' selected' : '') . '>' . DateTime::createFromFormat('!m', $payment_period->get('period_month'))->format('M') . ' ' . $payment_period->get('period_year') . '</option>';
                                                    }
                                                }
                                            ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid container-fixed-lg bg-white" id="zc_invoice_table">
                <img src="/images/loading.gif" alt="" />
            </div>
        </div>
    </div>
</div>