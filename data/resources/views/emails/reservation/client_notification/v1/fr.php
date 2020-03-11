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
                                                <span style="color:#484848;">Demande de réservation envoyée!</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Salut <?php echo $client_fname;?>, Votre demande de réservation a bien été envoyée à <?php echo $venue_name;?>.
                                            <br>
                                            <br>
                                            Nous avons fait une autorisation pour le montant total de la transaction, mais la réservation n'a pas encore été payée. Si votre demande est refusée par l'établissement ou expire, la transaction ne se produira pas. L'établissement a jusqu'à 24 heures pour accepter ou rejeter votre demande. Si elle est rejetée, Zipcube vous enverra d'autres options.
                                            <br>
                                            <br>
                                            Plus de 50% de nos demandes de réservation reçoivent une réponse dans un délai d'une heure.
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Vos détails de réservation</span>
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
                                        <br>
                                        <span style="font-size:26px;">Prix total: <?php echo $market_price;?> <?php echo $currency_price;?></span>
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
                                <?php
                                    if (isset($action) && $action == 'token')
                                    {
                                ?>
                                        <a class="mcnButton" title="Configurez votre mot de passe!" href="<?php echo $set_password_link;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Configurez votre mot de passe!</a>
                                        <?php
                                    }
                                    else
                                    {
                                        ?>
                                        <a class="mcnButton" title="Connectez-vous à votre compte" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Connectez-vous à votre compte</a>
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