<table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody>
                        <tr>
                            <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
                                <?php
                                    if (!isset($action) || (isset($action) && $action != 'reply_notification'))
                                    {
                                ?>
                                        <h1>
                                            <span style="font-size:32px; line-height:1.3; max-width:485px">
                                                <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                                    <strong>
                                                        <span style="color:#484848"><?php echo $lang->line('email_subject_thank_reviewer_token');?></span>
                                                    </strong>
                                                </span>
                                            </span>
                                        </h1>
                                        <br>
                                        <br>
                                        <?php
                                    }
                                        ?>
                                <span style="color:#484848">
                                    <span style="font-size:18px; line-height:1.4">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif"><?php echo $lang->line('email_hi');?> {first_name},</span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <span style="font-size:18px">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                        <?php
                                            if (!isset($action) || (isset($action) && $action != 'reply_notification'))
                                            {
                                                echo $lang->line('email_your_review') . ' {venue_name} ' . $lang->line('email_been_published');
                                            }
                                            else
                                            {
                                                echo '{reply_author} ' . $lang->line('email_replied_review') . ' {venue_name}:';
                                            }
                                            if (isset($action))
                                            {
                                                echo '<br><br>';
                                                if ($action == 'token')
                                                {
                                                    echo $lang->line('email_by_the_way');
                                                }
                                                elseif ($action == 'reply_notification')
                                                {
                                                    echo '"{reply}"';
                                                }
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
<?php
    if (isset($action))
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
                                            if ($action == 'token')
                                            {
                                        ?>
                                                <a class="mcnButton" title="<?php echo $lang->line('email_set_password');?>" href="{set_password_link}" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_set_password');?></a>
                                                <?php
                                            }
                                            elseif ($action == 'reply_notification')
                                            {
                                                ?>
                                                <a class="mcnButton" title="<?php echo $lang->line('email_see_reply');?>" href="{review_page_link}" target="_blank" style="font-weight: normal;letter-spacing: normal;line-height: 100%;text-align: center;text-decoration: none;color: #FFFFFF;"><?php echo $lang->line('email_see_reply');?></a>
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