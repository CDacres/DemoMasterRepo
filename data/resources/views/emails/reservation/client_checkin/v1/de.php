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
                                                <span style="color:#484848;">Check-In Erinnerung</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Hallo <?php echo $client_fname;?>,
                                            <br>
                                            Heute <?php echo $host_name;?> heißt Sie willkommen <?php echo $room_name;?> (<?php echo $venue_name;?>) Reservierung.
                                            <br>
                                            <br>
                                            Vielen Dank dass Sie Zipcube.com genutzt haben.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Erinnerung Details</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        Veranstaltungsort: <?php echo $venue_name;?>
                                        <br>
                                        Telefonnummer: <?php echo $venue_phone;?>
                                        <br>
                                        E-Mail: <?php echo $venue_email;?>
                                        <br>
                                        Name oder Nummer des Apartments: <?php echo $venue_address_extras;?>
                                        <br>
                                        Adresse: <?php echo $venue_address;?>
                                        <br>
                                        Besondere Hinweise: <?php echo $venue_transport;?>
                                        <br>
                                        <br>
                                        Raum: <?php echo $room_name;?>
                                        <br>
                                        Check-in: <?php echo $checkin;?> von <?php echo $time_in;?>
                                        <br>
                                        Check-out: <?php echo $checkout;?> bis <?php echo $time_out;?>
                                        <br>
                                        Teilnehmerzahl: <?php echo $no_guest;?>
                                        <br>
                                        Bestuhlungsart: <?php echo $roomconf;?>
                                        <br>
                                        Extras: <?php echo $addons;?>
                                        <br>
                                        Anmerkungen: <?php echo $comments;?>
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
                                <a class="mcnButton" title="Klick hier um mit allen Teilnehmern zu teilen" href="mailto:?subject=FW: Unser nächstes Meeting am <?php echo $checkin;?> - Zipcube.com &amp;body=Hallo,%0D%0A%0D%0A Hier sind alle Details zu unserem nächsten Meeting, das wir neulich über Zipcube.com gebucht haben: %0D%0A%0D%0A Check-in: <?php echo $checkin;?> von <?php echo $time_in;?> %0D%0A%0D%0A Check-out: <?php echo $checkout;?> bis <?php echo $time_out;?> %0D%0A%0D%0A Adresse: <?php echo $venue_address;?>. %0D%0A%0D%0A %0D%0A%0D%0A Brauchen Sie einen Meetingraum, Büroraum, Event-Space? Jetzt vergleichen und online reservieren https://www.zipcube.com. &amp;cc= &amp;bcc=info@zipcube.com" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Klick hier um mit allen Teilnehmern zu teilen</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>