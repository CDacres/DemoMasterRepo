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
                                                <span style="color:#484848;">Hurrah - Your booking request has been accepted!</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Hi <?php echo $client_fname;?>,
                                            <br>
                                            <br>
                                            Booking accepted <?php echo $venue_name;?>
                                            <br>
                                            <br>
                                            <?php echo $comment;?>
                                            <br>
                                            <br>
                                            Please review the details of your reservation and contact <?php echo $host_name;?> if you need to clarify anything.
                                            <br>
                                            <br>
                                            If you require an invoice or receipt of payment please follow <a href="<?php echo $message_request_link . $analytics_str;?>">this link</a>, click 'print receipt' and then you can save the file. Please note not all venues charge VAT on their rooms.
                                            <br>
                                            <br>
                                            Please note that if you receive an invoice from the venue, this has been sent by them in error, and you should ignore it. Your room has been secured and paid for through Zipcube, and all cancellations must be made through Zipcube.
                                            <br>
                                            <br>
                                            Thank you for using Zipcube.com.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Your booking details to be shared with your attendees.</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
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
                                        <span style="font-size:26px;">Total price: <?php echo $market_price;?> <?php echo $currency_price;?></span>
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
                                <a class="mcnButton" title="Click to share with your attendees" href="mailto:?subject=FW: Our next Meeting on <?php echo $checkin;?> - Zipcube.com &amp;body=Hi,%0D%0A%0D%0A Here are the details for our next meeting recently booked with Zipcube.com: %0D%0A%0D%0A Check-in: <?php echo $checkin;?> from <?php echo $time_in;?> %0D%0A%0D%0A Check out: <?php echo $checkout;?> from <?php echo $time_out;?> %0D%0A%0D%0A Address: <?php echo $venue_address;?>. %0D%0A%0D%0A %0D%0A%0D%0A Need a meeting space, desk, event space? Compare and book online https://www.zipcube.com. &amp;cc=&amp;bcc=info@zipcube.com" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Click to share with your attendees</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>