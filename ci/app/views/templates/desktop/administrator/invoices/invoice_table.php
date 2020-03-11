<div class="panel panel-transparent">
    <div class="panel-body table-responsive">
        <div>
            <button id="zc_all_btn" class="btn btn-<?php echo (($type == 'all') ? 'primary' : 'default');?>" type="button">All (<?php echo $total_count;?>)</button>
            <button id="zc_attention_btn" class="btn btn-<?php echo (($type == 'attention') ? 'primary' : 'default');?>" type="button">Needs Attention (<?php echo $attention_count;?>)</button>
            <button id="zc_to_pay_EUR_btn" class="btn btn-<?php echo (($type == 'to_pay_EUR') ? 'primary' : 'default');?>" type="button">To Pay EUR (<?php echo $to_pay_EUR_count;?>)</button>
            <button id="zc_to_pay_GBP_btn" class="btn btn-<?php echo (($type == 'to_pay_GBP') ? 'primary' : 'default');?>" type="button">To Pay GBP (<?php echo $to_pay_GBP_count;?>)</button>
            <button id="zc_to_pay_USD_btn" class="btn btn-<?php echo (($type == 'to_pay_USD') ? 'primary' : 'default');?>" type="button">To Pay USD (<?php echo $to_pay_USD_count;?>)</button>
            <button id="zc_paid_btn" class="btn btn-<?php echo (($type == 'paid') ? 'primary' : 'default');?>" type="button">Paid (<?php echo $paid_count;?>)</button>
            <?php
                if ($type == 'to_pay_EUR' && $to_pay_EUR_count > 0 || $type == 'to_pay_GBP' && $to_pay_GBP_count > 0 || $type == 'to_pay_USD' && $to_pay_USD_count > 0)
                {
                    $currency = (($type == 'to_pay_EUR') ? 'EUR' : (($type == 'to_pay_GBP') ? 'GBP' : (($type == 'to_pay_USD') ? 'USD' : '')));
            ?>
                    <a class="left-m-3" href="<?php echo site_url($country_lang_url . '/administrator/payouts/batch_payment_csv?period=' . $period_id . '&currency=' . $currency);?>" target="_blank">
                        Download Batch csv
                        <img src="/css/images/common/excel.png" alt="Download" height="35">
                    </a>
                    <?php
                }
                    ?>
        </div>
        <table class="table table-hover text-left administrator-table">
            <thead>
                <tr>
                    <?php
                        foreach ($columns as $column_name)
                        {
                            echo '<th width="';
                            switch ($column_name)
                            {
                                case 'Transaction':
                                case 'Contact':
                                    echo '12.5';
                                break;

                                case 'Financial Entity':
                                case 'Notes':
                                    echo '10';
                                break;

                                default:
                                    echo '5';
                                break;
                            }
                            echo '%">' . $column_name . '</th>';
                        }
                    ?>
                    <th width="5%"></th>
                </tr>
            </thead>
            <tbody>
                <?php
                    if (count($entity_reservations) > 0)
                    {
                        foreach ($entity_reservations as $entity_id => $entity_country)
                        {
                            foreach ($entity_country as $entity_countryKey => $entity_details)
                            {
                ?>
                                <tr<?php echo (($entity_details['payment_diff'] || $entity_id == null)?' class="bg-table-red"':'');?>>
                                    <td width="10%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>">
                                        <?php
                                            if ($entity_id == null)
                                            {
                                                echo '<span class="label label-danger"><b>MISSING FINANCIAL ENTITY</b></span>';
                                            }
                                            else
                                            {
                                                echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/financial_entities/entitykeyword/' . $entity_id . '">' . $entity_details['name'] . '</a>' . (($entity_details['cancelled_count'] > 0)?' (<span class="label label-danger">' . $entity_details['cancelled_count'] . 'x Cancelled</span>)':'');
                                            }
                                        ?>
                                    </td>
                                    <td width="12.5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>"><?php echo $entity_details['currency_symbol'] . format_price($entity_details['total_price']);?></td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>"><?php echo $entity_details['currency_symbol'] . format_price($entity_details['total_venue_price']);?></td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>"><?php echo round(($entity_details['commission_percent'] / $entity_details['total_count']), 2);?>%</td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>"><?php echo $entity_details['currency_symbol'] . format_price($entity_details['total_commission']);?></td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>"><?php echo $entity_details['currency_symbol'] . format_price($entity_details['total_payout_vat']);?></td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>"><?php echo $entity_details['currency_symbol'] . format_price($entity_details['total_payout']);?></td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>">
                                        <b>
                                            <?php
                                                $total_payout_amount = $entity_details['total_payout'] - $entity_details['total_venue_payment'];
                                                if ($total_payout_amount < 0)
                                                {
                                                    echo '<span class="label label-danger">-' . $entity_details['currency_symbol'] . format_price(-1 * $total_payout_amount) . '</span>';
                                                }
                                                else
                                                {
                                                    echo $entity_details['currency_symbol'] . format_price($total_payout_amount);
                                                }
                                            ?>
                                        </b>
                                    </td>
                                    <td width="5%" class="zc_entity pointer" data-id="<?php echo $entity_id;?>">
                                        <?php
                                            if ($entity_details['paid_count'] == $entity_details['total_count'])
                                            {
                                                echo '<span class="label label-success">Paid</span>';
                                            }
                                            elseif ($entity_details['paid_count'] >= 1)
                                            {
                                                echo '<span class="label label-warning">Partially Paid</span>';
                                            }
                                            else
                                            {
                                                echo '<span class="label label-danger">Not Paid</span>';
                                            }
                                        ?>
                                    </td>
                                    <td width="5%">
                                        <?php
                                            if (($type == 'to_pay_EUR' || $type == 'to_pay_GBP' || $type == 'to_pay_USD') && $entity_details['paid_count'] != $entity_details['total_count'] && $entity_id != null)
                                            {
                                                echo '<a data-period="' . $period_id . '" data-entity="' . $entity_id . '" data-country="' . $entity_countryKey . '" data-type="' . $type . '" class="zc_invoice_paid">Mark Paid</a>';
                                            }
                                            if ($entity_id != null && $entity_details['financial_data'] == '')
                                            {
                                                echo '<a class="zc_financial_data_fin_ent btn btn-default btn-sm" data-id="' . $entity_id . '" data-toggle="modal" data-target="#mainModal">Add Bank Details</a>';
                                            }
                                        ?>
                                    </td>
                                    <td width="5%"><?php echo (($entity_id != null)?$entity_details['number']:'');?></td>
                                    <td width="5%"><?php echo $entity_details['financial_data'];?></td>
                                    <td width="10%">
                                        <span class="zc_invoice_notes" data-entity="<?php echo $entity_id;?>" data-country="<?php echo $entity_countryKey;?>"><?php echo $entity_details['notes'];?></span>
                                        <?php
                                            if ($entity_id != null)
                                            {
                                                if ($entity_details['notes'] != '')
                                                {
                                                    echo '<br />';
                                                }
                                        ?>
                                                <a data-entity="<?php echo $entity_id;?>" data-country="<?php echo $entity_countryKey;?>" class="zc_invoice_notes_edit pointer">Edit</a>
                                                <a data-period="<?php echo $period_id;?>" data-entity="<?php echo $entity_id;?>" data-country="<?php echo $entity_countryKey;?>" class="zc_invoice_notes_save pointer" style="display: none;">Save</a>
                                                <a data-entity="<?php echo $entity_id;?>" data-country="<?php echo $entity_countryKey;?>" class="zc_invoice_notes_cancel pointer" style="display: none;">Cancel</a>
                                                <?php
                                            }
                                                ?>
                                    </td>
                                    <td width="12.5%"><?php echo $entity_details['user'];?></td>
                                    <td width="5%">
                                        <?php
                                            if ($entity_id != null)
                                            {
                                                /*if ($entity_details['financial_data'] != '')
                                                {
                                        ?>
                                                    <a href="<?php echo site_url($country_lang_url . '/administrator/payouts/payment_csv?period=' . $period_id . '&entity=' . $entity_id . '&country=' . $entity_countryKey);?>" target="_blank">
                                                        Download csv
                                                        <img src="/css/images/common/excel.png" alt="Download" height="12">
                                                    </a>
                                                    <br />
                                                    <?php
                                                }*/
                                                    ?>
                                                <a class="zc_view_invoice" data-entity="<?php echo $entity_id;?>" data-country="<?php echo $entity_countryKey;?>">Invoice</a>
                                                <?php
                                            }
                                                ?>
                                    </td>
                                </tr>
                                <?php
                                    if (!$reservations->is_null_object())
                                    {
                                        foreach ($reservations->object() as $reservation)
                                        {
                                            if ($reservation->get('financial_entity_id') == $entity_id && $reservation->get('venue_country_code') == $entity_countryKey)
                                            {
                                                $res_pay_diff = round(($reservation->get('payment_amount') - $reservation->get_transaction_price_total()), 2);
                                ?>
                                                <tr class="zc_entity_reservations bg-table-grey<?php echo (($res_pay_diff != 0)?' bg-table-red':'');?>" data-entity="<?php echo $entity_id;?>" style="display: none;">
                                                    <td width="10%">
                                                        <a target="_blank" href="/<?php echo $country_lang_url;?>/administrator/payments/bookingkeyword/<?php echo $reservation->get_id();?>"><?php echo $reservation->get_id();?></a>
                                                        (<a class="zc_reservation_audit pointer" data-id="<?php echo $reservation->get_id();?>" data-toggle="modal" data-target="#mainModal" title="Audit">Audit</a>)
                                                        <?php
                                                            if ($reservation->get('booking_closure_status') == Booking_Status::CANCELLED)
                                                            {
                                                                echo '(<span class="label label-danger">' . $reservation->get('status_name') . '</span>)';
                                                            }
                                                        ?>
                                                        (<a href="<?php echo get_venue_url($reservation);?>" target="_blank" title="View venue"><?php echo $reservation->get('venue_name') . ' (' . $reservation->get('venue_id') . ')';?></a>)
                                                    </td>
                                                    <td width="12.5%"<?php echo (($res_pay_diff != 0)?' class="red-font"':'');?>>Cash in hand - DB = <?php echo $reservation->wrangle('total_payment')->formatted(true);?> - <?php echo $reservation->wrangle('total_price')->formatted(true);?> = <?php echo (($res_pay_diff < 0)?'-' . $entity_details['currency_symbol'] . format_price(-1 * $res_pay_diff):$entity_details['currency_symbol'] . format_price($res_pay_diff));?></td>
                                                    <td width="5%"><?php echo $reservation->wrangle('price')->formatted(true);?></td>
                                                    <td width="5%"><?php echo round($reservation->get_commission_rate(), 2);?>%</td>
                                                    <td width="5%"><?php echo $reservation->wrangle('admin_commission')->formatted(true);?></td>
                                                    <td width="5%"><?php echo $reservation->wrangle('payout_vat')->formatted(true);?></td>
                                                    <td width="5%"><?php echo $reservation->wrangle('pay_out')->formatted(true);?></td>
                                                    <td width="5%">
                                                        <b>
                                                            <?php
                                                                $payout_amount_line = $reservation->get_payout_amount() - ((isset($payment_totals[$reservation->get_id()]))?$payment_totals[$reservation->get_id()]:0);
                                                                if ($payout_amount_line < 0)
                                                                {
                                                                    echo '<span class="label label-danger">-' . $entity_details['currency_symbol'] . format_price(-1 * $payout_amount_line) . '</span>';
                                                                }
                                                                else
                                                                {
                                                                    echo $entity_details['currency_symbol'] . format_price($payout_amount_line);
                                                                }
                                                            ?>
                                                        </b>
                                                    </td>
                                                    <td width="5%"><?php echo '<span class="label label-' . (($reservation->is_true('is_paid'))?'success">Paid':'danger">Not Paid') . '</span>';?></td>
                                                    <td width="5%">
                                                        <?php
                                                            if ($reservation->is_null('financial_entity_id'))
                                                            {
                                                                echo '<a class="zc_inv_fin_ent btn btn-default btn-sm" data-id="' . $reservation->get_id() . '" data-toggle="modal" data-target="#mainModal">Choose Financial Entity</a>';
                                                            }
                                                        ?>
                                                    </td>
                                                    <td width="5%"></td>
                                                    <td width="5%"></td>
                                                    <td width="10%"></td>
                                                    <td width="12.5%">
                                                      <?php echo $reservation->wrangle('main_contact_name')->formatted() . ' (' . $reservation->get('main_user_id') . ')';?>
                                                      <br />
                                                      <?php echo $reservation->wrangle('main_user_email')->get_email_html() . $reservation->wrangle('main_user_phone')->get_phone_html();?>
                                                      <br />
                                                        <?php
                                                            if ($reservation->get('main_user_role_id') != User::ADMINUSER)
                                                            {
                                                                echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $reservation->get('main_user_id') . '">Adopt</a> · ';
                                                            }
                                                            echo '<a class="contact_details pointer" data-toggle="modal" data-target="#mainModal" id="' . $reservation->get('venue_id') . '">Contact Details</a>';
                                                        ?>
                                                    </td>
                                                    <td width="5%"></td>
                                                </tr>
                                                <?php
                                            }
                                        }
                                    }
                            }
                        }
                    }
                                                ?>
            </tbody>
        </table>
    </div>
</div>
