<table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody>
                        <tr>
                            <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
                                <?php
                                    if ($action == 'checkin')
                                    {
                                ?>
                                        <h1>
                                            <span style="font-size:32px; line-height:1.3; max-width:485px">
                                                <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                                    <strong>
                                                        <span style="color:#484848"><?php echo $lang->line('email_checkin_reminder');?></span>
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
                                                        echo $lang->line('email_hi') . ' ';
                                                        if ($user == 'host' || $user == 'client')
                                                        {
                                                            if ($user == 'host')
                                                            {
                                                                echo '{host_name},<br>' . $lang->line('email_today') . ' {client_fname} ' . $lang->line('email_arriving') . ' {time_in} ' . $lang->line('email_for') . ' ' . $lang->line('email_their');
                                                            }
                                                            elseif ($user == 'client')
                                                            {
                                                                echo '{client_fname},<br>' . $lang->line('email_today') . ' {host_name} ' . $lang->line('email_welcomes');
                                                            }
                                                            echo ' {room_name} ({venue_name}) ' . $lang->line('email_booking') . '.<br><br>' . $lang->line('email_thank_you');
                                                        }
                                                        elseif ($user == 'admin')
                                                        {
                                                            echo $lang->line('email_admin') . ',<br><br> ' . $lang->line('email_today') . ' {client_fname} ' . $lang->line('email_reservation_in') . ' {room_name} ({venue_name}).';
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
                                                        <span style="color:#484848">
                                                            <?php
                                                                if ($user != 'admin')
                                                                {
                                                                    echo $lang->line('email_reminder') . ' ' . $lang->line('email_details');
                                                                }
                                                                else
                                                                {
                                                                    echo $lang->line('common_details');
                                                                }
                                                            ?>
                                                        </span>
                                                    </strong>
                                                </span>
                                            </span>
                                        </h1>
                                        <br>
                                        <br>
                                        <span style="font-size:18px">
                                            <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                                <?php
                                                    if ($user == 'host' || $user == 'admin')
                                                    {
                                                        echo $lang->line('email_client_name') . ': {client_fname}<br>' . $lang->line('email_phone') . ': {client_phone}';
                                                    }
                                                    elseif ($user == 'client')
                                                    {
                                                        echo $lang->line('email_venue') . ': {venue_name}<br>' . $lang->line('email_phone') . ': {venue_phone}<br>' . $lang->line('email_email') . ' {venue_email}<br>' . $lang->line('email_address_extras') . ': {venue_address_extras}<br>' . $lang->line('email_address') . ': {venue_address}<br>' . $lang->line('email_instructions') . ': {venue_transport}';
                                                    }
                                                ?>
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
                                                <?php echo $lang->line('common_comments') . ': {comments}';?>
                                            </span>
                                        </span>
                                        <br>
                                        <br>
                                        <?php
                                    }
                                    elseif ($action == 'checkout' && $user == 'client')
                                    {
                                        ?>
                                        <span style="color:#484848">
                                            <span style="font-size:13px; line-height:1.4">
                                                <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif"><?php echo $lang->line('email_hi') . ' {client_fname},<br><br>' . $lang->line('email_its') . ' {admin_name} ' . $lang->line('email_from_zipcube') . ' {venue_name}-{room_name} ' . $lang->line('email_booking_hope') . '<br><br>' . $lang->line('email_love_review') . '<br><br><a href="{review_link}">{review_link}</a><br><br>' . $lang->line('email_require_assistance') . '<br><br>' . $lang->line('email_thanks');?></span>
                                            </span>
                                        </span>
                                        <br>
                                        <br>
                                        <?php
                                    }
                                        ?>
                                &nbsp;
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>
<?php
    if ($action == 'checkin')
    {
?>
        <table class="mcnButtonBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
            <tbody class="mcnButtonBlockOuter">
                <tr>
                    <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" class="mcnButtonBlockInner" valign="top" align="left">
                        <table class="mcnButtonContentContainer" style="border-collapse: separate !important;border-radius: 25px;background-color: #00C6FF;" cellspacing="0" cellpadding="0" border="0">
                            <tbody>
                                <tr>
                                    <td class="mcnButtonContent" style="font-family: 'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif; font-size: 16px; padding: 15px;" valign="middle" align="center">
                                        <?php
                                            if ($user == 'host')
                                            {
                                        ?>
                                                <a class="mcnButton" title="<?php echo $lang->line('email_login_account');?>" href="https://www.zipcube.com/{user_country_lang}/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_login_account');?></a>
                                                <?php
                                            }
                                            elseif ($user == 'client')
                                            {
                                                ?>
                                                <a class="mcnButton" title="<?php echo $lang->line('email_click_share');?>" href="mailto:?subject=FW: <?php echo $lang->line('email_next_meeting');?> {checkin} - Zipcube.com &amp;body=<?php echo $lang->line('email_hi');?>,%0D%0A%0D%0A <?php echo $lang->line('email_details_next');?> %0D%0A%0D%0A <?php echo $lang->line('email_checkin');?> {checkin} <?php echo $lang->line('email_from');?> {time_in} %0D%0A%0D%0A <?php echo $lang->line('email_checkout');?> {checkout} <?php echo $lang->line('email_until');?> {time_out} %0D%0A%0D%0A <?php echo $lang->line('email_address');?>: {venue_address}. %0D%0A%0D%0A %0D%0A%0D%0A <?php echo $lang->line('email_need_meeting');?> https://www.zipcube.com. &amp;cc= &amp;bcc=info@zipcube.com" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_click_share');?></a>
                                                <?php
                                            }
                                            elseif ($user == 'admin')
                                            {
                                                ?>
                                                <a class="mcnButton" title="<?php echo $lang->line('email_login_admin');?>" href="https://www.zipcube.com/{user_country_lang}/administrator" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_login_admin');?></a>
                                                <?php
                                            }
                                                ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
        <?php
    }