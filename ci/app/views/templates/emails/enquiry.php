<table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody>
                        <tr>
                            <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
                                <span style="color:#484848">
                                    <span style="font-size:18px; line-height:1.4">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                            <?php echo $lang->line('email_hi');?>,
                                            <br>
                                            <br>
                                            <?php echo $lang->line('email_enquiry_created');?>
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <span style="font-size:18px">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                        <?php echo $lang->line('email_venue');?>: {venue_name}
                                        <br>
                                        <?php echo $lang->line('email_space');?>: {room_name}
                                        <br>
                                        <?php echo $lang->line('email_enquiry_event_date');?> {date}
                                        <br>
                                        <?php echo $lang->line('email_attendees_no');?> {guests}
                                        <br>
                                        <br>
                                        <?php echo $lang->line('email_enquiry_client_message');?> {message}
                                    </span>
                                </span>
                                <br>
                                <br>
                                <span style="font-size:18px">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif"><?php echo $lang->line('email_enquiry_reply');?></span>
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
<table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody>
                        <tr>
                            <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
                                <div style="text-align: left;">
                                    <span style="font-size:18px">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif">
                                            <?php echo $lang->line('email_enquiry_reply_help');?>
                                            <strong>
                                                <a href="tel:<?php echo $lang->line('email_contact_phone_number');?>"><?php echo $lang->line('email_contact_phone_number');?></a>
                                            </strong>
                                        </span>
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>