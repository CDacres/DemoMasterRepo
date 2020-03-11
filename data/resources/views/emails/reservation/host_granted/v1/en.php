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
                                                <span style="color:#484848;">Booking accepted</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Hi <?php echo $host_name;?>, you have accepted <?php echo $client_fname;?>s booking request for "<?php echo $room_name;?>" (<?php echo $venue_name;?>).
                                            <br>
                                            <br>
                                            Thank you for using Zipcube.com.
                                            <br>
                                            <br>
                                            Please refer all cancellations to Zipcube.
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
                                        Client name: <?php echo $client_fname;?> <?php echo $client_lname;?>
                                        <br>
                                        Phone: <?php echo $client_phone;?>
                                        <br>
                                        <br>
                                        Venue: <?php echo $venue_name;?>
                                        <br>
                                        Phone: <?php echo $venue_phone;?>
                                        <br>
                                        Email: <?php echo $venue_email;?>
                                        <br>
                                        Apt Suite: <?php echo $venue_address_extras;?>
                                        <br>
                                        Address: <?php echo $venue_address;?>
                                        <br>
                                        Special instructions: <?php echo $venue_transport;?>
                                        <br>
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
                                        Zipcube Commission: <?php echo $zipcube_commission;?> <?php echo $currency_price;?>
                                        <br>
                                        Commission VAT: <?php echo $zipcube_commission_vat;?> <?php echo $currency_price;?>
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
                                <a class="mcnButton" title="Log in to your account" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Log in to your account</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>