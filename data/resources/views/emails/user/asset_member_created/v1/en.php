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
                                        <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                            <?php echo $asset_name;?> are now using Zipcube to manage their meeting rooms and have created an account for you so that you can book their rooms online. Please
                                            <?php
                                                if ($action == 'token')
                                                {
                                                    echo ' <a href="' . $set_password_link . '">activate your account now</a> to gain access to your booking dashboard and to update your password.';
                                                }
                                                else
                                                {
                                                    echo ' <a href="' . $login_link . '">activate your account now</a> to gain access to your exclusive member booking rate and to update your password.';
                                                }
                                            ?>
                                        </span>
                                    </span>
                                </span>
                                <br>
                                <br>
                                <span style="font-size:18px;">
                                    <span style="font-family:helvetica neue,helvetica,arial,verdana,sans-serif;">
                                        <?php
                                            if ($action != 'token')
                                            {
                                        ?>
                                                Login: <?php echo $email;?>
                                                <br>
                                                Password: <?php echo $password;?>
                                                <br>
                                                <br>
                                                <?php
                                            }
                                                ?>
                                        With your account you can:
                                        <br>
                                        <br>
                                        - Book <?php echo $asset_name;?> meeting rooms using <a href="<?php echo $widget_link;?>">their microsite</a>
                                        <br>
                                        <br>
                                        - View your upcoming bookings and access payment receipts
                                        <br>
                                        <br>
                                        - Leave positive reviews for <?php echo $asset_name;?>
                                        <br>
                                        <br>
                                        Zipcube's mission is to provide the fastest, easiest and most convenient way to find and book meeting rooms. If you are interested in using Zipcube for your office or if you have any feedback on our service, we would love to hear from you on +44 (0)20 7183 2212 or email <a href="mailto:info@zipcube.com">info@zipcube.com</a>.
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
                                    if ($action == 'token')
                                    {
                                ?>
                                        <a class="mcnButton" title="Set a password for your account now" href="<?php echo $set_password_link;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Set a password for your account now</a>
                                        <?php
                                    }
                                    else
                                    {
                                        ?>
                                        <a class="mcnButton" title="Log in to your account" href="https://www.zipcube.com/<?php echo $domain;?>/users/signin<?php echo $analytics_str;?>" target="_blank" style="font-weight:normal; letter-spacing:normal; line-height:100%; text-align:center; text-decoration:none; color:#FFFFFF;">Log in to your account</a>
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