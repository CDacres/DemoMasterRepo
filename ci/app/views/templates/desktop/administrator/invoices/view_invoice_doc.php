<style>
    .clearfix:after{content:"";display:table;clear:both;}
    a{color:#5D6975;text-decoration:underline;}
    body{position:relative;width:21cm;height:29.7cm;margin:0 auto;color:#001028;background:#FFFFFF;font-family:Arial,sans-serif;font-size:12px;font-family:Arial;}
    header{padding:10px 0;margin-bottom:30px;}
    #logo{margin-bottom:10px;}
    #logo img{width:180px;margin: 10px 0px;}
    h1{font-size:2.4em;line-height:1.4em;font-weight:normal;margin:20px 0;padding-left:5px;}
    h2{font-size:1.2em;text-align:center;padding:5px 0px;}
    #print_link{padding:5px 5px 5px 725px;}
    #print_link a{color:#38859B;cursor:pointer;font-weight:bold;}
    #zipcube{padding-left:5px;}
    #entity{float:left;padding-left:5px;}
    #entity span{display:inline-block;overflow-wrap:break-word;width:400px;white-space:normal;}
    #invoice_details{float:right;text-align:right;display:table;}
    #invoice_details div{display:table-row;}
    #invoice_details div span{text-align:right;width:62px;display:table-cell;}
    #invoice_details div span.details{padding-right:5px;}
    #invoice_details div span.title{color:#5D6975;font-size:0.8em;padding-right:5px;}
    #entity div,#invoice_details div{white-space:nowrap;}
    table{width:100%;border-collapse:collapse;border-spacing:0;margin-bottom:20px;}
    table thead{border-bottom-style: double;}
    table tr:nth-child(2n-1) td{background:#FEFEFE;}
    table.payments tbody, table tr.main-row{border-bottom-style: double;}
    table th,table td{text-align:center;}
    table th{padding:5px 0px;color:#5D6975;border-bottom:1px solid #C1CED9;white-space:nowrap;font-weight:normal;}
    table th.total{text-align:right;}
    table .table-text{text-align:left;}
    table td{padding:20px 0px;text-align:right;}
    table.payments td, table td.subtotal{padding:5px 0px;}
    table td.cost_subtotal{padding:0px;}
    table td.payment_date{padding:0px 5px 0px 20px;font-style:italic;font-size:10px;color:#5D6975;}
    table td.table-text{vertical-align:top;}
    table td.unit,table td.qty,table td.total{font-size:1.2em;}
    table td.grand{border-top-style:double;font-weight:bold;font-size:2.4em;}
    #notices .notice{color:#5D6975;font-size:1.2em;}
    .ft12{font-size:12px;}
    footer{color:#5D6975;width:100%;height:30px;position:absolute;bottom:0;border-top:1px solid #C1CED9;padding:8px 0;text-align:center}
</style>
<header class="clearfix">
    <div id="logo">
        <img src="https://www.zipcube.com/css/images/logo/smalllogoblue.png" title="Zipcube" alt="Zipcube">
    </div>
    <div id="zipcube" class="clearfix">
        <div>Zipcube LTD</div>
        <div><?php echo $contact_info->get_address();?></div>
        <div><?php echo $phone_number_display;?></div>
        <div>
            <a href="mailto:info@zipcube.com">info@zipcube.com</a>
        </div>
        <div>GB 275 3996 51</div>
    </div>
    <h1><?php echo $lang->line('common_invoice');?></h1>
    <div id="entity">
        <div>
            <span><?php echo $entity->get('name');?></span>
        </div>
        <div>
            <span><?php echo $entity->get('address');?></span>
        </div>
        <div>
            <span><?php echo $entity->get('vat_number');?></span>
        </div>
        <div>
            <span><?php echo $entity->get('account_user_email');?></span>
        </div>
        <div>
            <span><?php echo $entity->get('account_user_phone');?></span>
        </div>
    </div>
    <div id="invoice_details">
        <div>
            <span class="details">
                <b><?php echo $lang->line('common_details');?></b>
            </span>
        </div>
        <div>
            <span class="title"><?php echo $lang->line('common_date');?>:</span>
            <span><?php echo $date;?></span>
        </div>
        <div>
            <span class="title"><?php echo $lang->line('dashboard_inv_invoice_num');?>:</span>
            <span><?php echo $invoice_num;?></span>
        </div>
        <div>
            <span class="title"><?php echo $lang->line('dashboard_inv_due_date');?>:</span>
            <span><?php echo $date;?></span>
        </div>
    </div>
</header>
<main>
    <p id="print_link">
        <a onClick="javascript:window.print();"><?php echo $lang->line('dashboard_print');?></a>
    </p>
    <h2><?php echo $lang->line('dashboard_inv_cost_record');?></h2>
    <table class="ft12">
        <thead>
            <tr>
                <th class="table-text"><?php echo $lang->line('common_date');?></th>
                <th class="table-text"><?php echo $lang->line('common_description');?></th>
                <th class="total"><?php echo $lang->line('dashboard_inv_vat', $vat_rate->get('vat_percentage'));?></th>
                <th class="total"><?php echo $lang->line('dashboard_inv_amount_vat');?></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="2" class="subtotal"></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
            </tr>
            <tr class="main-row">
                <td class="table-text"><?php echo $date;?></td>
                <td class="table-text"><?php echo $description;?></td>
                <td><?php echo format_price($reservations_total['total_payout_vat']);?></td>
                <td><?php echo format_price($reservations_total['total_commission']);?></td>
            </tr>
            <tr>
                <td colspan="3" class="cost_subtotal"><?php echo $lang->line('dashboard_inv_subtotal');?>:</td>
                <td class="total cost_subtotal"><?php echo format_price($reservations_total['total_commission']);?></td>
            </tr>
            <tr>
                <td colspan="3" class="cost_subtotal"><?php echo $lang->line('dashboard_inv_vat', $vat_rate->get('vat_percentage'));?>:</td>
                <td class="total cost_subtotal"><?php echo format_price($reservations_total['total_payout_vat']);?></td>
            </tr>
            <tr>
                <td colspan="3" class="cost_subtotal"><?php echo $lang->line('common_total');?>:</td>
                <td class="total cost_subtotal"><?php echo format_price($reservations_total['total_payout_vat'] + $reservations_total['total_commission']);?></td>
            </tr>
            <tr>
                <td colspan="2" class="cost_subtotal"></td>
                <td class="grand cost_subtotal"><?php echo $lang->line('dashboard_inv_balance_due');?>:</td>
                <td class="grand total cost_subtotal"><?php echo $reservations_total['currency'];?> 0</td>
            </tr>
        </tbody>
    </table>
    <h2><?php echo $lang->line('dashboard_inv_payment_record');?></h2>
    <table class="payments ft12">
        <thead>
            <tr>
                <th class="table-text"><?php echo $lang->line('dashboard_inv_date_paid');?></th>
                <th class="table-text">ID</th>
                <th class="table-text"><?php echo $lang->line('common_description');?></th>
                <th class="table-text total"><?php echo $lang->line('dashboard_inv_amount');?></th>
                <th class="table-text total"><?php echo $lang->line('dashboard_inv_commission');?></th>
                <th class="table-text total"><?php echo $lang->line('dashboard_inv_vat', $vat_rate->get('vat_percentage'));?></th>
                <th class="table-text total"><?php echo $lang->line('dashboard_table_payout');?></th>
                <th class="table-text total"><?php echo $lang->line('dashboard_inv_payout_due');?></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="3" class="table-text subtotal"></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
                <td class="subtotal"><?php echo $reservations_total['currency'];?></td>
            </tr>
            <?php
                foreach ($reservations->object() as $reservation)
                {
            ?>
                    <tr>
                        <td class="table-text">
                            <?php
                                if ($reservation->get('venue_payments')->get_total_count() > 0)
                                {
                                    echo $reservation->get('venue_payments')->get_first()->wrangle('date_time')->formatted('venue_payment');
                                }
                                else
                                {
                                    echo '---';
                                }
                            ?>
                        </td>
                        <td class="table-text"><?php echo $reservation->get_id();?></td>
                        <td class="table-text">
                            <?php
                                echo $reservation->get('venue_name') . ' - ' . $reservation->get('room_name') . ' - ' . $reservation->wrangle('reservation_start_date_time')->formatted('invoice') . ' - ';
                                if (date('Y-m-d', strtotime($reservation->get('start_date_time'))) == date('Y-m-d', strtotime($reservation->get('end_date_time'))))
                                {
                                    echo $reservation->wrangle('reservation_end_date_time')->formatted('checkouttime');
                                }
                                else
                                {
                                    echo $reservation->wrangle('reservation_end_date_time')->formatted('invoice');
                                }
                                echo ' - ' . $reservation->wrangle('client_name')->formatted();
                            ?>
                        </td>
                        <td><?php echo $reservation->wrangle('price')->round_to_currency_quantum();?></td>
                        <td><?php echo $reservation->wrangle('admin_commission')->round_to_currency_quantum();?></td>
                        <td><?php echo $reservation->wrangle('payout_vat')->round_to_currency_quantum();?></td>
                        <td><?php echo $reservation->wrangle('pay_out')->round_to_currency_quantum();?></td>
                        <td>
                            <?php
                                $payout = $reservation->get_payout_amount();
                                if (!isset($payment_total[$reservation->get_id()]))
                                {
                                    echo format_price($payout);
                                }
                                elseif (isset($payment_total[$reservation->get_id()]) && round($payout, 2) != round($payment_total[$reservation->get_id()], 2))
                                {
                                    echo format_price($payout - $payment_total[$reservation->get_id()]);
                                }
                                else
                                {
                                    echo '0';
                                }
                            ?>
                        </td>
                    </tr>
                    <?php
                        if ($reservation->get('venue_payments')->get_total_count() > 1)
                        {
                            $paymentCount = 1;
                            foreach ($reservation->get('venue_payments')->object() as $venue_payment)
                            {
                    ?>
                                <tr>
                                    <td colspan="2" class="subtotal"></td>
                                    <td class="table-text payment_date"><?php echo $venue_payment->wrangle('date_time')->formatted('venue_payment') . ' ' . $lang->line('dashboard_inv_payment', $paymentCount) . ' ' . $venue_payment->wrangle('payment_amount')->formatted(true);?></td>
                                    <td colspan="5" class="subtotal"></td>
                                </tr>
                                <?php
                                ++$paymentCount;
                            }
                        }
                }
                                ?>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3" class="subtotal">Total:</td>
                <td class="subtotal"><?php echo format_price($reservations_total['total_venue_price']);?></td>
                <td class="subtotal"><?php echo format_price($reservations_total['total_commission']);?></td>
                <td class="subtotal"><?php echo format_price($reservations_total['total_payout_vat']);?></td>
                <td class="subtotal"><?php echo format_price($reservations_total['total_payout']);?></td>
                <td class="subtotal"><?php echo format_price($reservations_total['total_payout_due']);?></td>
            </tr>
        </tfoot>
    </table>
</main>
<?php
    if ($reservations_total['currency'] == 'EUR')
    {
?>
        <footer><?php echo $lang->line('dashboard_inv_footer');?></footer>
        <?php
    }