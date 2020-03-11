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
                                                <span style="color:#484848"><?php echo $lang->line('email_hi');?> {username},</span>
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
                                                if ($action == 'member_updated_password')
                                                {
                                                    echo '{company_admin_fname} ' . $lang->line('email_changed_settings') . ' <a href="{login_link}">' . $lang->line('email_login_now') . '</a>.';
                                                }
                                                elseif ($action == 'team_member_created' || $action == 'team_member_created_steps')
                                                {
                                                    echo '{company_name} ' . $lang->line('email_use_zipcube');
                                                }
                                                elseif ($action == 'user_member_created')
                                                {
                                                    echo '{asset_name} ' . $lang->line('email_use_zipcube_to_manage') . ' <a href="{login_link}">' . $lang->line('email_activate') . '</a> ' . $lang->line('email_gain_access_to_exclusive');
                                                }
                                                elseif ($action == 'user_member_created_token')
                                                {
                                                    echo '{asset_name} ' . $lang->line('email_use_zipcube_to_manage') . ' <a href="{set_password_link}">' . $lang->line('email_activate') . '</a> ' . $lang->line('email_gain_access_to_booking');
                                                }
                                                elseif ($action == 'new_client_non_frontend')
                                                {
                                                    echo '{venue_name} ' . $lang->line('email_use_for_their_rooms') . ' <a href="{set_password_link}">' . $lang->line('email_activate') . '</a> ' . $lang->line('email_gain_access_to_booking');
                                                }
                                            ?>
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <span style="font-size:18px">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                        <?php
                                            if ($action == 'member_updated_password')
                                            {
                                                echo $lang->line('email_login');?> {email}
                                                <br>
                                                <?php echo $lang->line('email_password');?> {password}
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_take_credit_card');?> <a href="{calendar_link}"><?php echo $lang->line('email_from_calendar');?></a>? <?php echo $lang->line('email_using_bespoke');?> <a href="{widget_link}"><?php echo $lang->line('email_microsite');?></a> <?php echo $lang->line('email_live_bookings');
                                            }
                                            elseif ($action == 'team_member_created' || $action == 'team_member_created_steps')
                                            {
                                                if ($action == 'team_member_created')
                                                {
                                                    echo $lang->line('email_team_access');
                                                }
                                                elseif ($action == 'team_member_created_steps')
                                                {
                                                    echo $lang->line('email_team_missing') . '<br><br>{step_str}<br>' . $lang->line('email_complete_listing');
                                                }
                                        ?>
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_login');?> {email}
                                                <br>
                                                <?php echo $lang->line('email_password');?> {password}
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_mission');?> <?php echo $lang->line('email_additional_venues');
                                            }
                                            elseif ($action == 'user_member_created')
                                            {
                                                echo $lang->line('email_login');?> {email}
                                                <br>
                                                <?php echo $lang->line('email_password');?> {password}
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_with_account');?>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_book');?> {asset_name} <?php echo $lang->line('email_meeting_rooms_using');?> <a href="{widget_link}"><?php echo $lang->line('email_their');?> <?php echo $lang->line('email_microsite');?></a>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_view_bookings');?>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_positive_reviews');?> {asset_name}
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_mission');?> <?php echo $lang->line('email_use_for_your_office');
                                            }
                                            elseif ($action == 'user_member_created_token')
                                            {
                                                echo $lang->line('email_with_account');?>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_book');?> {asset_name} <?php echo $lang->line('email_meeting_rooms_using');?> <a href="{widget_link}"><?php echo $lang->line('email_their');?> <?php echo $lang->line('email_microsite');?></a>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_view_bookings');?>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_positive_reviews');?> {asset_name}
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_mission');?> <?php echo $lang->line('email_use_for_your_office');
                                            }
                                            elseif ($action == 'new_client_non_frontend')
                                            {
                                                echo $lang->line('email_with_account');?>
                                                <br>
                                                <br>
                                                - "<?php echo $lang->line('email_quick_book');?>" {venue_name} <?php echo $lang->line('email_meeting_rooms_using');?> <a href="{widget_link}"><?php echo $lang->line('email_their');?> <?php echo $lang->line('email_microsite');?></a>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_view_bookings');?>
                                                <br>
                                                <br>
                                                - <?php echo $lang->line('email_positive_reviews');?> {venue_name}
                                                <br>
                                                <br>
                                                <?php echo $lang->line('email_mission');?> <?php echo $lang->line('email_use_for_your_office');
                                            }
                                                ?>
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
                                <?php
                                    if ($action == 'user_member_created_token' || $action == 'new_client_non_frontend')
                                    {
                                        ?>
                                        <a class="mcnButton" title="<?php echo $lang->line('email_set_password');?>" href="{set_password_link}" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_set_password');?></a>
                                        <?php
                                    }
                                    else
                                    {
                                        ?>
                                        <a class="mcnButton" title="<?php echo $lang->line('email_login_account');?>" href="https://www.zipcube.com/{user_country_lang}/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_login_account');?></a>
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