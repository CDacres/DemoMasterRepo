<?php
    $checkout = $checkouts->first();
    if ($user->language_pref == 'en_IE' || $user->language_pref == 'en_US')
    {
        $locale = $user->language_pref;
    }
    else
    {
        $locale = $user->language_pref . '_' . strtoupper($user->locale_pref);
    }
    setlocale(LC_TIME, $locale, $locale . '.utf8', $locale . '.UTF-8');
?>
<html>
    <body>
        <p>Hello <?php echo $user->first_name;?></p>
        <p>I'm following-up my previous email about the meeting room linked below:</p>
        <p>
            <a href="<?php echo $helper->generate_url($checkout->room->id);?>"><?php echo $helper->generate_url($checkout->room->id, true);?></a>
        </p>
        <p>I've had a look just for you at a few venues available on the <?php echo strftime("%d %B, %Y", strtotime($checkout->start_date_time));?> for the event you're organising in <?php echo $checkout->room->getCityAttribute();?>. Do you still require a room for that day?</p>
        <p>Please give me a shout and I will be happy to help you book the perfect space.</p>
        <p>Many thanks,</p>
        <p></p>
        <p>
            <?php echo $sender->first_name;?>
            <br />
            <a href="mailto:<?php echo $sender->email;?>?Subject=Please%20help!" target="_top"><?php echo $sender->email;?></a>
            <br />
            020 7183 2212
            <br />
            <a href="<?php echo $helper->generate_url("");?>">Zipcube</a>
        </p>
        <p>PS Our services are 100% free and we'll do all the work!</p>
        <img src="<?php echo $tracker_image_url;?>" />
    </body>
</html>