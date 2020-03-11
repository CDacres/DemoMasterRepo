<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'reservation'], true);?>
                        <br />
                        <?php
                            if (isset($reservation_missing_venue_pay_date_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="reservation_missing_venue_pay_date" visibility="hidden">Reservations paid without date (<?php echo $reservation_missing_venue_pay_date_results;?>)</h4>
                                <?php
                                    if (isset($reservation_missing_venue_pay_date) && count($reservation_missing_venue_pay_date) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/reservation_missing_venue_pay_date');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                </tr>
                                            </thead>
                                            <tbody id="reservation_missing_venue_pay_date_rows" style="display: none;">
                                                <?php
                                                    foreach ($reservation_missing_venue_pay_date as $miss_res_paid)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $miss_res_paid['reservation_id'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($reservation_diff_payment_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="reservation_diff_payment" visibility="hidden">Reservations with different price to payment total (<?php echo $reservation_diff_payment_results;?>)</h4>
                                <?php
                                    if (isset($reservation_diff_payment) && count($reservation_diff_payment) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/reservation_diff_payment');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Reservation Total</th>
                                                    <th>Payment(s) Total</th>
                                                    <th>Difference</th>
                                                </tr>
                                            </thead>
                                            <tbody id="reservation_diff_payment_rows" style="display: none;">
                                                <?php
                                                    foreach ($reservation_diff_payment as $res_diff_pay)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $res_diff_pay['reservation_id'];?></td>
                                                            <td><?php echo $res_diff_pay['reservation_price'];?></td>
                                                            <td><?php echo $res_diff_pay['paymentAmount'];?></td>
                                                            <td><?php echo $res_diff_pay['diffAmount'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($payout_diff_venue_payments_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="payout_diff_venue_payments" visibility="hidden">Reservations with different payout to venue payment total (<?php echo $payout_diff_venue_payments_results;?>)</h4>
                                <?php
                                    if (isset($payout_diff_venue_payments) && count($payout_diff_venue_payments) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/payout_diff_venue_payments');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Payout</th>
                                                    <th>Payment(s) Total</th>
                                                    <th>Difference</th>
                                                </tr>
                                            </thead>
                                            <tbody id="payout_diff_venue_payments_rows" style="display: none;">
                                                <?php
                                                    foreach ($payout_diff_venue_payments as $res_payout_diff_pay)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $res_payout_diff_pay['reservation_id'];?></td>
                                                            <td>
                                                                <a href="/venues/<?php echo $res_payout_diff_pay['venue_id'];?>" target="_blank"><?php echo trim($res_payout_diff_pay['venue_name']) . ' (' . $res_payout_diff_pay['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $res_payout_diff_pay['payoutAmo'];?></td>
                                                            <td><?php echo $res_payout_diff_pay['totAmo'];?></td>
                                                            <td><?php echo $res_payout_diff_pay['diffAmount'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>