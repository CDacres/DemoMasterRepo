<table class="mcnTextBlock" style="min-width:100%;" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tbody class="mcnTextBlockOuter">
        <tr>
            <td class="mcnTextBlockInner" style="padding-top:9px;" valign="top">
                <table style="max-width:100%; min-width:100%;" class="mcnTextContentContainer" width="100%" cellspacing="0" cellpadding="0" border="0" align="left">
                    <tbody>
                        <tr>
                            <td class="mcnTextContent" style="padding-top:0; padding-right:18px; padding-bottom:9px; padding-left:18px;" valign="top">
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Hi <?php echo $host_name;?>, you have a new booking request.</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <?php echo $client_fname;?> has requested to book <?php echo $room_name;?> (<?php echo $venue_name;?>). The booking request was made on <?php echo $book_date;?> at <?php echo $book_time;?>. You have 24 hours to accept or decline the request before it expires.
                                            <br>
                                            <br>
                                            Log in your account to reply to the request.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Your booking request details</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        Booking request by: <?php echo $client_fname;?> <?php echo $client_lname;?>
                                        <br>
                                        <br>
                                        Venue: <?php echo $venue_name;?>
                                        <br>
                                        Space: <?php echo $room_name;?>
                                        <br>
                                        Check-in: <?php echo $checkin;?> from <?php echo $time_in;?>
                                        <br>
                                        Check out: <?php echo $checkout;?> until <?php echo $time_out;?>
                                        <br>
                                        Number of attendees: <?php echo $no_guest;?>
                                        <br>
                                        Room configuration: <?php echo $roomconf;?>
                                        <br>
                                        Add-ons: <?php echo $addons;?>
                                        <br>
                                        Comments: <?php echo $comments;?>
                                        <br>
                                        <br>
                                        Total price: <?php echo $market_price;?> <?php echo $currency_price;?>
                                        <br>
                                        <br>
                                        <span style="font-size:26px;">Total payout: <?php echo $topay;?> <?php echo $currency_price;?></span>
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
                <table class="mcnButtonContentContainer" style="border-collapse:separate !important; border-radius:25px; background-color:#00C6FF;" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td class="mcnButtonContent" style="font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif; font-size:16px; padding:15px;" valign="middle" align="center">
                                <a class="mcnButton" title="Reply to the booking request" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Reply to the booking request</a>
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
            <td style="padding-top:0; padding-bottom:18px; padding-left:18px;" class="mcnButtonBlockInner" valign="top" align="left">
                <table class="mcnButtonContentContainer" style="border-collapse:separate !important; border-radius:25px; background-color:#819F2A;" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td class="mcnButtonContent" style="font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif; font-size:16px; padding:15px;" valign="middle" align="center">
                                <a class="mcnButton" title="Accept" href="<?php echo $accept_decline_url;?>&booking=accepted" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Accept</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
            <td style="padding-top:0; padding-right:18px; padding-bottom:18px; padding-left:18px;" class="mcnButtonBlockInner" valign="top" align="left">
                <table class="mcnButtonContentContainer" style="border-collapse:separate !important; border-radius:25px; background-color:#AA1100;" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                        <tr>
                            <td class="mcnButtonContent" style="font-family:'Helvetica Neue', Helvetica, Arial, Verdana, sans-serif; font-size:16px; padding:15px;" valign="middle" align="center">
                                <a class="mcnButton" title="Decline" href="<?php echo $accept_decline_url;?>&booking=declined" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Decline</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>