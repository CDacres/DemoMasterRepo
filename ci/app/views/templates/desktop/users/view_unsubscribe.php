<div class="container bg-white">
    <div class="checkout-login zc_login_prompt">
        <div class="wrapper">
            <div class="not-loggedin">
                <div class="section-login-msg overflow-hidden">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 bottom-m-2">
                        <?php
                            if (isset($confirmed))
                            {
                        ?>
                                <h3><?php echo $lang->line('users_unsubscribed');?></h3>
                                <p><?php echo $lang->line('users_unsubscribed_text', $user->get('email'));?></p>
                                <?php
                            }
                            else
                            {
                                ?>
                                <h3><?php echo $lang->line('users_unsubscribe_title');?></h3>
                                <p><?php echo $lang->line('users_unsubscribe');?></p>
                                <p><?php echo $lang->line('users_notifications', $country_lang_url);?></p>
                                <a href="/<?php echo $country_lang_url;?>/unsubscribe?_mut=<?php echo $token;?>&confirm=true" class="btn btn-primary"><?php echo $lang->line('users_unsubscribe_me');?></a>
                                <?php
                            }
                                ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>