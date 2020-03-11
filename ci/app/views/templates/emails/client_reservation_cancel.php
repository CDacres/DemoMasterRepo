<table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody>
                        <tr>
                            <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                            <strong>
                                                <span style="color:#484848">
                                                    <?php
                                                        if ($action == 'cancelbyhost')
                                                        {
                                                            echo $lang->line('email_reservation_cancelled');
                                                        }
                                                        elseif ($action == 'cancelbyclient')
                                                        {
                                                            echo $lang->line('email_booking_cancelled');
                                                        }
                                                    ?>
                                                </span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848">
                                    <span style="font-size:18px; line-height:1.4">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                            <?php
                                                echo $lang->line('email_hi') . ' {client_fname},<br><br>';
                                                if ($action == 'cancelbyhost')
                                                {
                                                    echo $lang->line('email_confirmed_booking') . ' "{room_name}" ({checkin} {time_in} - {checkout} {time_out}) ' . $lang->line('email_cancelled_by') . ' {host_name}. ' . $lang->line('email_payment_refunded') . '<br><br>{venue_name} ' . $lang->line('email_message') . ' (optional): <i>{comment}</i><br><br>' . $lang->line('email_apologise');
                                                }
                                                elseif ($action == 'cancelbyclient')
                                                {
                                                    echo $lang->line('email_cancelled_booking') . ' {room_name} ({venue_name}) ({checkin} {time_in} - {checkout} {time_out}). ' . $lang->line('email_administer') . ' {venue_name}' . $lang->line('email_page_at_booking_time') . ' ' . $lang->line('email_refund_money') . '<br><br>' . $lang->line('email_thank_you');
                                                }
                                            ?>
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                            <strong>
                                                <span style="color:#484848"><?php echo $lang->line('email_alternatively');?></span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                &nbsp;
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<table class="mcnButtonBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnButtonBlockOuter">
        <tr>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" class="mcnButtonBlockInner" valign="top" align="left">
                <table class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 25px;background-color: #00C6FF;" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td class="mcnButtonContent" style="font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif; font-size: 16px; padding: 15px;" valign="middle" align="center">
                                <a class="mcnButton" title="<?php echo $lang->line('email_search_space');?>" href="https://www.zipcube.com/{user_country_lang}<?php echo $analytics_str;?>" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_search_space');?></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>