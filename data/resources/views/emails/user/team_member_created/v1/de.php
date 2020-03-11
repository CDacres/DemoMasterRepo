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
                                                <span style="color:#484848;">Hallo <?php echo $username;?>,</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;"><?php echo $company_name;?> benutzen Zipcube um ihre Räumlichkeiten zu vermarkten und haben ein Konto für Sie erstellt, das Ihnen Zugriff auf Ihre Reservierungen erlaubt. Sie können problemlos Ihre Auflistungen ändern und den Terminkalender für Ihre Räumlichkeiten verwalten.</span>
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
                                                Uns fehlen derzeit Informationen für:
                                                <br>
                                                <br>
                                                <?php echo $step_str;?>
                                                <br>
                                                Wenn Sie sich <a href="<?php echo $login_link;?>">anmelden</a> und die Liste vervollständigen konnten, können wir alle Zimmer live schalten und Ihnen zusätzliche Buchungen bringen.
                                                <?php
                                            }
                                            else
                                            {
                                                ?>
                                                Für den Zugriff auf Ihr Dashboard und Ihre Platzverwaltungstools <a href="<?php echo $login_link;?>">anmelden</a>.
                                                <?php
                                            }
                                                ?>
                                        <br>
                                        <br>
                                        E-Mail: <?php echo $email;?>
                                        <br>
                                        Passwort: <?php echo $password;?>
                                        <br>
                                        <br>
                                        Zipcubes Hauptziel ist es, Ihnen den schnellsten und bequemsten Weg zum gewünschten Meetingraum anzubieten. Falls Sie Zipcube auch für andere Veranstaltungsorte benutzen möchten oder falls Sie uns Ihr Feedback mitteilen möchten, würden wir gern mehr von Ihnen erfahren auf +49 (0)3221 1121730 oder <a href="mailto:info@zipcube.com">info@zipcube.com</a>.
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