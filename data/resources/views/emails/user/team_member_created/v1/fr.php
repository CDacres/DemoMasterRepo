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
                                                <span style="color:#484848;">Salut <?php echo $username;?>,</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;"><?php echo $company_name;?> utilisent Zipcube pour commercialiser leurs salles de réunion en ligne et ont créé un compte pour vous, vous permettant d'accéder à vos réservations, d'éditer les listes de salles et d'utiliser le logiciel de gestion de l'espace libre.</span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        <?php
                                            if ($action == 'steps')
                                            {
                                        ?>
                                                Il nous manque actuellement des informations pour:
                                                <br>
                                                <br>
                                                <?php echo $step_str;?>
                                                <br>
                                                Si vous pouviez <a href="<?php echo $login_link;?>">vous connecter</a> et compléter la liste, nous pouvons alors activer toutes les salles en direct et vous apporter des réservations supplémentaires.
                                                <?php
                                            }
                                            else
                                            {
                                                ?>
                                                Pour accéder aux outils de gestion de votre tableau de bord et de votre espace, <a href="<?php echo $login_link;?>">connectez-vous</a>.
                                                <?php
                                            }
                                                ?>
                                        <br>
                                        <br>
                                        S'identifier: <?php echo $email;?>
                                        <br>
                                        Mot de passe: <?php echo $password;?>
                                        <br>
                                        <br>
                                        La mission de Zipcube est de fournir le moyen le plus rapide, le plus simple et le plus commode de trouver et de réserver des salles de réunion. Si vous êtes intéressé par utiliser Zipcube pour d'autres événements ou si vous avez des commentaires sur notre service, nous aimerions avoir de vos nouvelles au +33 9 74 59 20 00 ou par email <a href="mailto:info@zipcube.com">info@zipcube.com</a>.
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
                                <a class="mcnButton" title="Connectez-vous à votre compte" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Connectez-vous à votre compte</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>