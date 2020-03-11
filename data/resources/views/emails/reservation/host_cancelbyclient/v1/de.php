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
                                                <span style="color:#484848;">Reservierung storniert von Kunde</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Hallo <?php echo $host_name;?>, <?php echo $client_fname;?> hat die Buchung storniert für <?php echo $room_name;?> (<?php echo $venue_name;?>).
                                            <br>
                                            Wir werden die Stornierung in Übereinstimmung mit <?php echo $venue_name;?>s gültige Stornobedingungen auf Zipcbe.com zur Zeit der Buchung bearbeiten.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Reservierungsanfrage Details</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        Kunde: <?php echo $client_fname;?> <?php echo $client_lname;?>
                                        <br>
                                        Kundentelefonnnummer: <?php echo $client_phone;?>
                                        <br>
                                        <br>
                                        Veranstaltungsort: <?php echo $venue_name;?>
                                        <br>
                                        Raum: <?php echo $room_name;?>
                                        <br>
                                        Telefonnummer: <?php echo $venue_phone;?>
                                        <br>
                                        Check-in: <?php echo $checkin;?> von <?php echo $time_in;?>
                                        <br>
                                        Check-out: <?php echo $checkout;?> bis <?php echo $time_out;?>
                                        <br>
                                        Teilnehmerzahl: <?php echo $no_guest;?>
                                        <br>
                                        Bestuhlungsart: <?php echo $roomconf;?>
                                        <br>
                                        <br>
                                        <span style="font-size:26px;">Gesamtpreis: <?php echo $market_price;?> <?php echo $currency_price;?></span>
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
                                <a class="mcnButton" title="Melden Sie sich an" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Melden Sie sich an</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>