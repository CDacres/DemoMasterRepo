<html>
    <body>
        <p>Bonjour <?php echo $user->first_name;?></p>
        <p>J ai remarqué que vous aviez un intérêt pour les salles suivante:
            <?php
                $rooms->each(function($room) use ($helper) {
                    echo '<p><a href="' . $helper->generate_url($room->id) . '" title="' . $room->title . '">' . $room->title . '</a></p>';
                });
            ?>
        </p>
        <p>C’est votre jour de chance et je suis disposé à vous aider dans votre quête.</p>
        <p>100% de réussite jusqu’à présent et ce n’est pas près de changer.</p>
        <p>Juste répondez à cet email par “Oui” et je viens à votre rescousse. En attendant, je repasse ma cape.</p>
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
        <p>PS: La location de salle et tous nos services sont gratuits. Ne perdez plus de temps, laissez faire les pro.</p>
        <img src="<?php echo $tracker_image_url;?>" />
    </body>
</html>