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
                                                <span style="color:#484848"><?php echo $lang->line('email_booking_accepted');?></span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848">
                                    <span style="font-size:18px; line-height:1.4">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif"><?php echo $lang->line('email_hi');?> {host_name}, <?php echo $lang->line('email_have_accepted');?> {client_fname}<?php echo $lang->line('email_venue_booking_request');?> "{room_name}" ({venue_name}).<br><br><?php echo $lang->line('email_thank_you');?><br><br><?php echo $lang->line('email_refer_cancel');?></span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                            <strong>
                                                <span style="color:#484848"><?php echo $lang->line('email_booking_request_details');?></span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                        <?php echo $lang->line('email_client_name');?>: {client_fname} {client_lname}
                                        <br>
                                        <?php echo $lang->line('email_phone');?>: {client_phone}
                                        <br>
                                        <br>
                                        <?php echo $lang->line('email_venue');?>: {venue_name}
                                        <br>
                                        <?php echo $lang->line('email_phone');?>: {venue_phone}
                                        <br>
                                        <?php echo $lang->line('email_email');?> {venue_email}
                                        <br>
                                        <?php echo $lang->line('email_address_extras');?>: {venue_address_extras}
                                        <br>
                                        <?php echo $lang->line('email_address');?>: {venue_address}
                                        <br>
                                        <?php echo $lang->line('email_instructions');?>: {venue_transport}
                                        <br>
                                        <br>
                                        <?php echo $lang->line('email_space');?>: {room_name}
                                        <br>
                                        <?php echo $lang->line('email_checkin');?> {checkin} <?php echo $lang->line('email_from');?> {time_in}
                                        <br>
                                        <?php echo $lang->line('email_checkout');?> {checkout} <?php echo $lang->line('email_until');?> {time_out}
                                        <br>
                                        <?php echo $lang->line('email_attendees_no');?> {no_guest}
                                        <br>
                                        <?php echo $lang->line('email_room_configuration');?> {roomconf}
                                        <br>
                                        <?php echo $lang->line('email_addons');?>: {addons}
                                        <br>
                                        <?php echo $lang->line('common_comments');?>: {comments}
                                        <br>
                                        <br>
                                        <?php echo $lang->line('email_total_price');?>: {market_price} {currency_price}
                                        <br>
                                        <?php echo $lang->line('email_commission');?>: {zipcube_commission} {currency_price}
                                        <br>
                                        <?php echo $lang->line('email_commission_vat');?>: {zipcube_commission_vat} {currency_price}
                                        <br>
                                        <br>
                                        <span style="font-size: 26px;"><?php echo $lang->line('email_total_payout');?>: {topay} {currency_price}</span>
                                    </span>
                                </span>
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
                                <a class="mcnButton" title="<?php echo $lang->line('email_login_account');?>" href="https://www.zipcube.com/{user_country_lang}/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_login_account');?></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>