<?php $checkout = $checkouts->first();?>
<html>
    <body>
        <p>Bonjour <?php echo $user->first_name;?></p>
        <p>Comment allez-vous?</p>
        <p>Sauf erreur de ma part, j'ai remarqué que vous étiez intéressé par une salle...
            <a href="<?php echo $helper->generate_url($checkout->room->id);?>"><?php echo $checkout->room->title;?></a>. Est-ce-toujours le cas? Veuillez trouver le lien ci-dessous:
        </p>
        <p>
            <a href="<?php echo $helper->generate_url($checkout->room->id);?>"><?php echo $helper->generate_url($checkout->room->id, true);?></a>
        </p>
        <p>Je suis là pour vous aider, répondez simplement “Oui”, “à l'aide”, ou “SOS” et je viens à votre rescousse.</p>
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