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
                                                <span style="color:#484848;">Hallo <?php echo $host_name;?>, <?php echo $venue_name;?> - <?php echo $room_name;?> hat eine neue Bewertung erhalten.</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        Bewertung: <?php echo $review;?>
                                        <br>
                                        Feedback: <?php echo $feedback;?>
                                        <br>
                                        Sauberkeit: <?php echo $cleanliness;?>
                                        <br>
                                        Kommunikation: <?php echo $communication;?>
                                        <br>
                                        Sorgfalt: <?php echo $accuracy;?>
                                        <br>
                                        Check-In: <?php echo $checkin;?>
                                        <br>
                                        Standort: <?php echo $location;?>
                                        <br>
                                        Wert: <?php echo $value;?>
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
                                <a class="mcnButton" title="Diese Bewertung anzeigen" href="<?php echo $review_link;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Diese Bewertung anzeigen</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>