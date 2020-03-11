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
                                                <span style="color:#484848;">Bienvenue</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            Merci d'avoir utilisé Zipcube.com.
                                            <br>
                                            Avec Zipcube vous pouvez comparer et réserver des espaces de réunions, de bureaux ou d'événements en moins d'une minute. Choisissez l'espace parfait et réservez-le instantanément. C'est aussi simple que cela.
                                            <br>
                                            <br>
                                            <i>
                                                N'hésitez pas à partager et à nous aider à fournir la meilleure expérience en ligne possible pour vous.
                                                <br>
                                                - L'équipe Zipcube
                                            </i>
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <h1>
                                    <span style="font-size:32px; line-height:1.3; max-width:485px;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <strong>
                                                <span style="color:#484848;">Les détails de votre compte:</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">Email (connexion): <?php echo $email;?></span>
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
                                        <a class="mcnButton" title="Définir un mot de passe pour votre compte maintenant" href="<?php echo $set_password_link;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Définir un mot de passe pour votre compte maintenant</a>
                                        <?php
                                    }
                                    else
                                    {
                                        ?>
                                        <a class="mcnButton" title="Commencer à chercher maintenant" href="https://www.zipcube.com/<?php echo $domain . $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Commencer à chercher maintenant</a>
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