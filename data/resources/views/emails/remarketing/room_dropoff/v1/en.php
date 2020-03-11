<html>
    <body>
        <p>Hi <?php echo $user->first_name;?></p>
        <p>Welcome to Zipcube!</p>
        <p>Thank you for using the website to look for a space. I noticed that you were looking at some spaces...
            <?php
                $rooms->each(function($room) use ($helper) {
                    echo '<p><a href="' . $helper->generate_url($room->id) . '" title="' . $room->title . '">' . $room->title . '</a></p>';
                });
            ?>
        </p>
        <p>If you have any questions, or if for some reason those aren't quite what you were after, just let me know and I'm sure we can help out.</p>
        <p>Pop me back an email with any questions, or your requirements, and the team here will take care of everything for you.</p>
        <p>Best,</p>
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