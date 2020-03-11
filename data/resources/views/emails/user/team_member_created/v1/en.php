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
                                                <span style="color:#484848;">Hi <?php echo $username;?>,</span>
                                            </strong>
                                        </span>
                                    </span>
                                </h1>
                                <br>
                                <br>
                                <span style="color:#484848;">
                                    <span style="font-size:18px; line-height:1.4;">
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;"><?php echo $company_name;?> are using Zipcube to market their meeting rooms online and have created an account for you, allowing you to access your bookings, edit the room listings and use the free space management software.</span>
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
                                                We are currently missing information for:
                                                <br>
                                                <br>
                                                <?php echo $step_str;?>
                                                <br>
                                                If you could <a href="<?php echo $login_link;?>">log in</a> and complete the listing, we can then turn all of the rooms live and bring you additional bookings.
                                                <?php
                                            }
                                            else
                                            {
                                                ?>
                                                To access your dashboard and space management tools please <a href="<?php echo $login_link;?>">log in</a>.
                                                <?php
                                            }
                                                ?>
                                        <br>
                                        <br>
                                        Login: <?php echo $email;?>
                                        <br>
                                        Password: <?php echo $password;?>
                                        <br>
                                        <br>
                                        Zipcube's mission is to provide the fastest, easiest and most convenient way to find and book meeting rooms. If you are interested in using Zipcube for additional venues or if you have any feedback on our service, we would love to hear from you on +44 (0)20 7183 2212 or email <a href="mailto:info@zipcube.com">info@zipcube.com</a>.
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
                                <a class="mcnButton" title="Log in to your account" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Log in to your account</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>