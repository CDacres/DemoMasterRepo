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
                                                <span style="color:#484848;">Rappel du Check-in</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Salut <?php echo $client_fname;?>,
                                            <br>
                                            Aujourd'hui <?php echo $host_name;?> Vous accueille pour votre <?php echo $room_name;?> (<?php echo $venue_name;?>) réservation.
                                            <br>
                                            <br>
                                            Merci d'avoir utilisé Zipcube.com.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Rappel Détails</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        Etablissement: <?php echo $venue_name;?>
                                        <br>
                                        Téléphone: <?php echo $venue_phone;?>
                                        <br>
                                        Email: <?php echo $venue_email;?>
                                        <br>
                                        Numéro ou nom de l'appartement: <?php echo $venue_address_extras;?>
                                        <br>
                                        Adresse: <?php echo $venue_address;?>
                                        <br>
                                        Instructions spéciales: <?php echo $venue_transport;?>
                                        <br>
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
                                <a class="mcnButton" title="Cliquez pour partager avec vos participants" href="mailto:?subject=FW: Notre prochaine réunion le <?php echo $checkin;?> - Zipcube.com &amp;body=Salut,%0D%0A%0D%0A Voici les détails de notre prochaine réunion récemment réservée avec Zipcube.com: %0D%0A%0D%0A Date/Heure de début: <?php echo $checkin;?> de <?php echo $time_in;?> %0D%0A%0D%0A Date/Heure de fin: <?php echo $checkout;?> jusqu'à <?php echo $time_out;?> %0D%0A%0D%0A Adresse: <?php echo $venue_address;?>. %0D%0A%0D%0A %0D%0A%0D%0A Besoin d'une salle de réunion, d'événement, d'un bureau? Comparez et réservez en ligne https://www.zipcube.com. &amp;cc= &amp;bcc=info@zipcube.com" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Cliquez pour partager avec vos participants</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>