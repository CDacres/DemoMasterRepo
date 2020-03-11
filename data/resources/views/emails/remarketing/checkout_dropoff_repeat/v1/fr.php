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
        <p>Bonjour <?php echo $user->first_name;?></p>
        <p>Je fais suite au précédent email que je vous ai envoyé au sujet de la location de salle à <?php echo $checkout->room->getCityAttribute();?>:</p>
        <p>
            <a href="<?php echo $helper->generate_url($checkout->room->id);?>"><?php echo $helper->generate_url($checkout->room->id, true);?></a>
        </p>
        <p>J'ai jeté un coup d'oeil à quelques établissements et je voulais savoir si votre évènement a toujours lieu le <?php echo strftime("%d %B, %Y", strtotime($checkout->start_date_time));?>? Si oui, je peux vous aider à réserver votre espace.</p>
        <p>Cordialement,</p>
        <p></p>
        <p>
            <?php echo $sender->first_name;?>
            <br />
            Passionné de Service Client
            <br />
            <a href="mailto:<?php echo $sender->email;?>?Subject=SOS!" target="_top"><?php echo $sender->email;?></a>
            <br />
            09 74 59 20 00
            <br />
            <a href="<?php echo $helper->generate_url("");?>">Zipcube</a>
        </p>
        <p>PS: Nos services sont 100% gratuit. Tu t'occupes de rien, je m'occupe de tout.</p>
        <img src="<?php echo $tracker_image_url;?>" />
    </body>
</html>