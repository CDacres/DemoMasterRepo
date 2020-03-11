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
                                                <span style="color:#484848;">Salut <?php echo $host_name;?>, Vous avez une nouvelle demande de réservation.</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <?php echo $client_fname;?> a demandé à réserver <?php echo $room_name;?> (<?php echo $venue_name;?>). La demande de réservation a été faite le <?php echo $book_date;?> à <?php echo $book_time;?>. Vous avez 24 heures pour accepter ou décliner la demande de réservation avant son expiration.
                                            <br>
                                            <br>
                                            Connectez vous à votre compte pour répondre à cette demande.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848">Vos détails de réservation</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        Demande de réservation par: <?php echo $client_fname;?> <?php echo $client_lname;?>
                                        <br>
                                        <br>
                                        Etablissement: <?php echo $venue_name;?>
                                        <br>
                                        Espace: <?php echo $room_name;?>
                                        <br>
                                        Date/Heure de début: <?php echo $checkin;?> de <?php echo $time_in;?>
                                        <br>
                                        Date/Heure de fin: <?php echo $checkout;?> jusqu'à <?php echo $time_out;?>
                                        <br>
                                        Nombre de participants: <?php echo $no_guest;?>
                                        <br>
                                        Configuration de la pièce: <?php echo $roomconf;?>
                                        <br>
                                        Suppléments: <?php echo $addons;?>
                                        <br>
                                        Commentaires: <?php echo $comments;?>
                                        <br>
                                        <br>
                                        Prix total: <?php echo $market_price;?> <?php echo $currency_price;?>
                                        <br>
                                        <br>
                                        <span style="font-size:26px;">Paiement total: <?php echo $topay;?> <?php echo $currency_price;?></span>
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
                                <a class="mcnButton" title="Répondre à la demande de réservation" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Répondre à la demande de réservation</a>
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
                                <a class="mcnButton" title="Accepter" href="<?php echo $accept_decline_url;?>&booking=accepted" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Accepter</a>
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
                                <a class="mcnButton" title="Décliner" href="<?php echo $accept_decline_url;?>&booking=declined" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Décliner</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>