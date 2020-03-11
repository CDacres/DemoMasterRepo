<?php
    $confirmation = '<style>.clearfix:after{content:"";display:table;clear:both}a{color:#5D6975;text-decoration:underline}body{position:relative;width:21cm;height:29.7cm;margin:0 auto;color:#001028;background:#FFFFFF;font-family:Arial,sans-serif;font-size:12px;font-family:Arial}header{padding:10px 0;margin-bottom:30px}#logo{text-align:center;margin-bottom:10px}#logo img{width: 180px;margin: 40px 0px;}h1{border-top:1px solid  #5D6975;border-bottom:1px solid  #5D6975;color:#5D6975;font-size:2.4em;line-height:1.4em;font-weight:normal;text-align:center;margin:0 0 20px 0;}#project{float:left;}#project span.name_address{display:inline-block;overflow-wrap:break-word;width:400px;white-space:normal;}#project span.title{color:#5D6975;text-align:right;width:52px;margin-right:10px;display:inline-block;font-size:0.8em}#company{float:right;text-align:right}#company span{color:#5D6975;text-align:left;margin-right:10px;display:inline-block;font-size:0.8em}#project div,#company div{white-space:nowrap}table{width:100%;border-collapse:collapse;border-spacing:0;margin-bottom:20px}table tr:nth-child(2n-1) td{background:#FEFEFE}table th,table td{text-align:center}table th{padding:5px 20px;color:#5D6975;border-bottom:1px solid #C1CED9;white-space:nowrap;font-weight:normal}table .service,table .desc{text-align:left}table td{padding:20px;text-align:right}table td.service,table td.desc{vertical-align:top}table td.unit,table td.qty,table td.total{font-size:1.2em}table td.grand{border-top:1px solid #5D6975}#notices .notice{color:#5D6975;font-size:1.2em}footer{color:#5D6975;width:100%;height:30px;position:absolute;bottom:0;border-top:1px solid #C1CED9;padding:8px 0;text-align:center}.ft12{font-size:12px}</style>';
    $confirmation .= '<header class="clearfix"><div id="logo"><img src="https://www.zipcube.com/css/images/logo/smalllogoblue.png" title="Zipcube" alt="Zipcube"></div>';
    if (!$venue_user)
    {
        $confirmation .= '<h1>' . $lang->line('dashboard_payment_receipt') . '</h1><div id="company" class="clearfix"><div>Zipcube LTD</div><div>--------</div><div></div><div><a href="mailto:info@zipcube.com">info@zipcube.com</a></div></div><div id="project"><div><span class="title">' . $lang->line('dashboard_object') . '</span> ' . $lang->line('dashboard_hire_space') . '</div><div><span class="title">' . $lang->line('dashboard_client') . '</span> ' . $reservation->wrangle('client_name')->formatted() . '</div><div><span class="title">' . $lang->line('dashboard_email') . '</span><a href="mailto:' . $reservation->get('client_email') . '">' . $reservation->get('client_email') . '</a></div><div><span class="title">' . $lang->line('dashboard_date') . '</span>' . $reservation->wrangle('reservation_start_date_time')->formatted('inbox') . '</div><div><span class="title">' . $lang->line('dashboard_status') . '</span>' . $lang->line($reservation->get('status_name')) . '</div><div><span class="title">' . $lang->line('dashboard_reference') . '</span>' . $reservation->get_booking_reference() . '</div></div></header>';
        $confirmation .= '<main><p style="padding:5px 5px 5px 725px"><a style="color:#38859B;cursor:pointer;" onClick="javascript:window.print();"><strong>' . $lang->line('dashboard_print') . '</strong></a></p>';
        $confirmation .= '<table class="ft12"><thead><tr><th class="service">' . $lang->line('dashboard_service') . '</th><th class="desc">' . $lang->line('dashboard_description') . '</th><th>' . $lang->line('dashboard_price') . '</th><th></th><th>' . strtoupper($lang->line('common_total')) . '</th></tr></thead>';
        $confirmation .= '<tbody><tr><td class="service">' . $lang->line('dashboard_hire_space') . '</td><td class="desc">' . $lang->line('dashboard_venue_booking', $reservation->wrangle('reservation_guests')->formatted()) . '<br>' . $lang->line('dashboard_space_name') . ': ' . $reservation->get('room_name') . '<br>' . $lang->line('dashboard_checkin') . ': ' . $reservation->wrangle('reservation_start_date_time')->formatted('inbox') . ' ' . $lang->line('dashboard_from', $reservation->wrangle('reservation_start_date_time')->formatted('inboxtime')) . '<br>' . $lang->line('dashboard_checkout') . ': ' . $reservation->wrangle('reservation_end_date_time')->formatted('inbox') . ' ' . $lang->line('dashboard_from', $reservation->wrangle('reservation_end_date_time')->formatted('inboxtime')) . '<br>' . $lang->line('common_duration') . ': ' . $reservation->wrangle('reservation_duration')->formatted() . '<br>' . $lang->line('dashboard_addons') . ': ' . $reservation->get('addOns') . '</td><td class="unit">' . $reservation->wrangle('total_price')->formatted(true) . '</td><td class="qty"></td><td class="total">' . $reservation->wrangle('total_price')->formatted(true) . '</td></tr>';
        $confirmation .= '<tr><td colspan="5"></td></tr>';
        $confirmation .= '<tr><td colspan="5"></td></tr>';
        $confirmation .= '<tr><td colspan="4">' . $lang->line('dashboard_subtotal') . '</td><td class="total">' . $reservation->wrangle('total_price')->formatted(true) . '</td></tr>';
        $confirmation .= '<tr><td colspan="4" class="grand total">' . $lang->line('dashboard_grand_total') . '</td><td class="grand total">' . $reservation->wrangle('total_price')->formatted(true) . '</td></tr></tbody></table>';
        $confirmation .= '</main><footer>' . $lang->line('dashboard_this_payment') . '</footer>';
    }
    else
    {
        $confirmation .= '<h1>' . $lang->line('dashboard_booking_confirmation') . '</h1><div id="company" class="clearfix"><div>Zipcube LTD</div><div>' . $contact_info->get_address() . '</div><div>' . $phone_number_display . '</div><div></div><div><a href="mailto:info@zipcube.com">info@zipcube.com</a></div><div><span>' . $lang->line('dashboard_companies_house_registration') . '</span>08789640</div><div><span>' . $lang->line('dashboard_vat_number') . '</span>GB 275 3996 51</div></div><div id="project"><div><span class="title">' . $lang->line('common_venue') . '</span><span class="name_address">' . $reservation->get('venue_name') . '</span></div><div><span class="title"></span><span class="name_address">' . $reservation->get('venue_address') . '</span><div><span class="title">' . $lang->line('dashboard_booking_id') . '</span>' . $reservation->get_booking_reference() . '</div><div><span class="title">' . $lang->line('dashboard_booking_date') . '</span>' . $reservation->wrangle('booking_date_time')->formatted() . '</div><div><span class="title">' . $lang->line('dashboard_client_name') . '</span>' . $reservation->wrangle('client_name')->formatted() . '</div></div></div></header>';
        $confirmation .= '<main><p style="padding:5px 5px 5px 725px"><a style="color:#38859B;cursor:pointer;" onClick="javascript:window.print();"><strong>' . $lang->line('dashboard_print') . '</strong></a></p>';
        $confirmation .= '<table class="ft12"><thead><tr><th class="service">' . $lang->line('dashboard_service') . '</th><th class="desc">' . $lang->line('dashboard_description') . '</th><th>' . $lang->line('common_total') . '</th><th>' . $lang->line('dashboard_commission') . '</th><th>' . $lang->line('dashboard_commission_vat', $reservation->get('venue_vat')) . '</th><th>' . $lang->line('dashboard_venue_payout') . '</th></tr></thead>';
        $confirmation .= '<tbody><tr><td class="service">' . $lang->line('dashboard_room_hire') . '</td><td class="desc">' . $lang->line('dashboard_venue_booking', $reservation->wrangle('reservation_guests')->formatted()) . '<br>' . $lang->line('dashboard_space_name') . ': ' . $reservation->get('room_name') . '<br>' . $lang->line('dashboard_checkin') . ': ' . $reservation->wrangle('reservation_start_date_time')->formatted('inbox') . ' ' . $lang->line('dashboard_from', $reservation->wrangle('reservation_start_date_time')->formatted('inboxtime')) . '<br>' . $lang->line('dashboard_checkout') . ': ' . $reservation->wrangle('reservation_end_date_time')->formatted('inbox') . ' ' . $lang->line('dashboard_from', $reservation->wrangle('reservation_end_date_time')->formatted('inboxtime')) . '<br>' . $lang->line('common_duration') . ': ' . $reservation->wrangle('reservation_duration')->formatted() . '<br>' . $lang->line('dashboard_addons') . ': ' . $reservation->get('addOns') . '</td><td class="unit">' . $reservation->wrangle('price')->formatted(true) . '</td><td class="qty">' . $reservation->wrangle('admin_commission')->formatted(true) . '</td><td class="qty">' . $reservation->wrangle('payout_vat')->formatted(true) . '</td><td class="total">' . $reservation->wrangle('pay_out')->formatted(true) . '</td></tr>';
        $confirmation .= '<tr><td colspan="6"></td></tr>';
        $confirmation .= '<tr><td colspan="6"></td></tr>';
        $confirmation .= '<tr><td colspan="5">' . $lang->line('dashboard_payout') . '</td><td class="total">' . $reservation->wrangle('pay_out')->formatted(true) . '</td></tr>';
        $confirmation .= '<tr><td colspan="5" class="grand total">' . $lang->line('dashboard_grand_total') . '</td><td class="grand total">' . $reservation->wrangle('pay_out')->formatted(true) . '</td></tr></tbody></table>';
        $confirmation .= '</main>';
    }
?>
<script type="text/javascript">
    function print_confirmation()
    {
        var myWindow = window.open('', '_blank', 'width=800, height=500');
        myWindow.document.write("<p><?php echo addslashes($confirmation);?></p>");
        myWindow.print();
    }
</script>
<div class="container-fluid">
    <div class="col-md-12 top-m-1">
        <div class="title">
            <h2><?php echo $lang->line('dashboard_reservation_request');?></h2>
            <span id="request_print"><?php echo $lang->line('dashboard_print_receipt');?></span>
        </div>
        <div class="requestlist">
            <ul class="details clearfix">
                <li class="top clearfix">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_space_name');?></span>
                    <span class="data col-xs-9"><?php echo $reservation->get('room_name');?></span>
                </li>
                <li class="clearfix">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_checkin');?></span>
                    <span class="data col-xs-9"><?php echo $reservation->wrangle('reservation_start_date_time')->formatted();?></span>
                </li>
                <li class="clearfix">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_checkout');?></span>
                    <span class="data col-xs-9"><?php echo $reservation->wrangle('reservation_end_date_time')->formatted();?></span>
                </li>
                <li class="clearfix">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('common_duration');?></span>
                    <span class="data col-xs-9"><?php echo $reservation->wrangle('reservation_duration')->formatted();?></span>
                </li>
                <li class="bottom">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('common_attendees');?></span>
                    <span class="data col-xs-9"><?php echo $reservation->get('guests');?></span>
                </li>
            </ul>
            <ul class="details clearfix">
                <li class="top clearfix">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_client_name');?></span>
                    <span class="data col-xs-9"><?php echo $reservation->wrangle('client_name')->formatted();?></span>
                </li>
                <li class="clearfix">
                    <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_room_configuration');?></span>
                    <span class="data col-xs-9">
                        <?php
                            if (!empty($reservation->get('configuration')))
                            {
                                echo $lang->line($reservation->get('configuration'));
                            }
                            else
                            {
                                echo $lang->line('dashboard_not_mentioned');
                            }
                        ?>
                    </span>
                </li>
                <?php
                    if (!empty($reservation->get('comments')))
                    {
                ?>
                        <li class="bottom">
                            <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_special_comments');?></span>
                            <span class="data col-xs-9"><?php echo $reservation->get('comments');?></span>
                        </li>
                        <?php
                    }
                        ?>
            </ul>
            <ul class="details clearfix">
                <?php
                    if (!$venue_user)
                    {
                ?>
                        <li class="top clearfix">
                            <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_rates');?></span>
                            <span class="data col-xs-9"><?php echo $lang->line('From');?>:
                                <?php
                                    if (!$reservation->is_null('hourly_rate'))
                                    {
                                        $priceArr[] = $reservation->wrangle('hourly_rate')->formatted(true) . ' /' . $lang->line('common_hour_short');
                                    }
                                    if (!$reservation->is_null('daily_rate'))
                                    {
                                        $priceArr[] = $reservation->wrangle('daily_rate')->formatted(true) . ' /' . $lang->line('common_day');
                                    }
                                    if (!$reservation->is_null('monthly_rate'))
                                    {
                                        $priceArr[] = $reservation->wrangle('monthly_rate')->formatted(true) . ' /' . $lang->line('common_month');
                                    }
                                    echo ' ' . implode(', ', $priceArr);
                                ?>
                            </span>
                        </li>
                        <li class="clearfix">
                            <span class="fieldname col-xs-3 total"><?php echo $lang->line('common_total');?></span>
                            <span class="data col-xs-9 total"><?php echo $reservation->wrangle('total_price')->formatted(true);?></span>
                        </li>
                        <?php
                    }
                    else
                    {
                        ?>
                        <li class="top clearfix">
                            <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_rates');?></span>
                            <span class="data col-xs-9"><?php echo $lang->line('From');?>:
                                <?php
                                    if (!$reservation->is_null('venue_hourly_rate'))
                                    {
                                        $priceArr[] = $reservation->wrangle('venue_hourly_rate')->formatted(true) . ' /' . $lang->line('common_hour_short');
                                    }
                                    if (!$reservation->is_null('venue_daily_rate'))
                                    {
                                        $priceArr[] = $reservation->wrangle('venue_daily_rate')->formatted(true) . ' /' . $lang->line('common_day');
                                    }
                                    if (!$reservation->is_null('venue_monthly_rate'))
                                    {
                                        $priceArr[] = $reservation->wrangle('venue_monthly_rate')->formatted(true) . ' /' . $lang->line('common_month');
                                    }
                                    echo ' ' . implode(', ', $priceArr);
                                ?>
                            </span>
                        </li>
                        <li class="clearfix">
                            <span class="fieldname col-xs-3"><?php echo $lang->line('common_total');?></span>
                            <span class="data col-xs-9"><?php echo $reservation->wrangle('price')->formatted(true);?></span>
                        </li>
                        <li class="clearfix">
                            <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_commission');?></span>
                            <span class="data col-xs-9"><?php echo $reservation->wrangle('admin_commission')->formatted(true);?></span>
                        </li>
                        <li class="clearfix">
                            <span class="fieldname col-xs-3"><?php echo $lang->line('dashboard_commission_vat', $reservation->get('venue_vat'));?></span>
                            <span class="data col-xs-9"><?php echo $reservation->wrangle('payout_vat')->formatted(true);?></span>
                        </li>
                        <li class="clearfix">
                            <span class="fieldname col-xs-3 total"><?php echo $lang->line('dashboard_total_payout');?></span>
                            <span class="data col-xs-9 total"><?php echo $reservation->wrangle('pay_out')->formatted(true);?></span>
                        </li>
                        <?php
                    }
                        ?>
                <li class="clearfix bottom status">
                    <span class="fieldname status col-xs-3">
                        <?php
                            if ($reservation->get_status_id() == Reservation_Status::CREATED)
                            {
                                echo $lang->line('dashboard_expires') . ' ' . $reservation->wrangle('expiry_booking_date_time')->formatted('expiry');
                            }
                            else
                            {
                                echo $lang->line('dashboard_table_status');
                            }
                        ?>
                    </span>
                    <?php
                        if ($venue_user && $reservation->get_status_id() == Reservation_Status::CREATED)
                        {
                    ?>
                            <span class="data col-xs-9">
                                <div>
                                    <input type="hidden" name="reservation_id" id="reservation_id" value="<?php echo $reservation->get_id();?>" />
                                    <input type="hidden" id="checkin" name="checkin" value="<?php echo $reservation->wrangle('reservation_start_date_time')->formatted();?>" />
                                    <input type="hidden" id="checkout" name="checkout" value="<?php echo $reservation->wrangle('reservation_end_date_time')->formatted();?>" />
                                    <?php
                                        if (!isset($action) || $action == 'accepted')
                                        {
                                    ?>
                                            <div class="btn-caret">
                                                <button id="req_accept" class="btn btn-success reservebtn accept" type="button"><?php echo $lang->line('common_accept');?></button>
                                            </div>
                                            <?php
                                        }
                                        if (!isset($action) || $action == 'declined')
                                        {
                                            ?>
                                            <div class="btn-caret">
                                                <button id="req_decline" class="btn btn-danger reservebtn decline" type="button"><?php echo $lang->line('common_decline');?></button>
                                            </div>
                                            <?php
                                        }
                                        if (!isset($action) || $action == 'accepted')
                                        {
                                            ?>
                                            <div id="accept" class="well" style="display: none;">
                                                <p><?php echo $lang->line('dashboard_optional');?></p>
                                                <p>
                                                    <textarea name="comment" id="comment_accept"></textarea>
                                                </p>
                                                <p>
                                                    <button class="btn btn-success accept_button" name="accept_decline_button" decision_type="accept" zc_object_type="<?php echo $object_type;?>" zc_status_id="<?php echo Reservation_Status::ACCEPTED?>" type="button"><?php echo $lang->line('common_accept');?></button>
                                                </p>
                                            </div>
                                            <?php
                                        }
                                        if (!isset($action) || $action == 'declined')
                                        {
                                            ?>
                                            <div id="decline" class="well" style="display: none;">
                                                <p><?php echo $lang->line('dashboard_optional');?></p>
                                                <p>
                                                    <textarea name="comment" id="comment_decline"></textarea>
                                                </p>
                                                <p>
                                                    <button class="btn btn-danger decline_button" name="accept_decline_button" decision_type="decline" zc_object_type="<?php echo $object_type;?>" zc_status_id="<?php echo Reservation_Status::DECLINE?>" type="button"><?php echo $lang->line('common_decline');?></button>
                                                </p>
                                            </div>
                                            <?php
                                        }
                                            ?>
                                    <div id="loader-container" style="display: none;">
                                        <img src="/images/loading.gif" alt="<?php echo $lang->line('common_loading');?>" title="<?php echo $lang->line('common_loading');?>"/>
                                    </div>
                                </div>
                            </span>
                            <?php
                        }
                        else
                        {
                            echo '<span class="data col-xs-9">' . $lang->line($reservation->get('status_name')) . '</span>';
                        }
                            ?>
                </li>
            </ul>
        </div>
    </div>
</div>
