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
                                                        if ($action == 'payment')
                                                        {
                                                            echo $lang->line('email_payment_failed') . ' ' . $lang->line('email_transaction') . ': {trans_id}. ' . $lang->line('email_transaction_settled') . ' ' . $lang->line('email_check_bd') . '<br><br>' . $lang->line('email_booking_confirmed');
                                                        }
                                                        elseif ($action == 'void')
                                                        {
                                                            echo $lang->line('email_void_failed') . ' ' . $lang->line('email_transaction') . ': {trans_id}. ' . $lang->line('email_transaction_void') . ' ' . $lang->line('email_check_bd') . '<br><br>' . $lang->line('email_booking_declined');
                                                        }
                                                        elseif ($action == 'refund')
                                                        {
                                                            echo $lang->line('email_refund_failed') . ' ' . $lang->line('email_transaction') . ': {trans_id}. ' . $lang->line('email_check_bd') . '<br><br>' . $lang->line('email_booking_declined');
                                                        }
                                                        elseif ($action == 'location')
                                                        {
                                                            echo $lang->line('email_exception') . '<br><br>{message}';
                                                        }
                                                        elseif ($action == 'exception')
                                                        {
                                                            echo $lang->line('email_exception') . '<br><br>{message}<br><br>' . $lang->line('email_alert_tech');
                                                        }
                                                    ?>
                                                </span>
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
                                <a class="mcnButton" title="<?php echo $lang->line('email_login_admin');?>" href="https://www.zipcube.com/{user_country_lang}/administrator" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_login_admin');?></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>