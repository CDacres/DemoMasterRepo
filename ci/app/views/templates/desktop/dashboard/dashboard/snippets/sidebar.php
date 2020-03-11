<div class="row">
    <div class="col-md-12 col-sm-4">
        <div class="panel space-4">
            <div class="text-center space-top-3">
                <img height="50" width="50" alt="<?php echo $user->get('first_name');?>" title="<?php echo $user->get('first_name');?>" src="<?php echo $user->wrangle('image')->get_user_url('profile');?>" />
            </div>
            <div id="user_profile" class="panel-body">
                <h2 id="user_name"><?php echo $user->wrangle('full_name')->formatted();?></h2>
                <p>
                    <a href="/<?php echo $country_lang_url;?>/dashboard/edit-profile"><?php echo $lang->line('dashboard_edit_profile');?></a>
                </p>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-4">
        <div class="panel space-4">
            <div class="panel-header active-panel-header"><?php echo $lang->line('dashboard_verifications');?></div>
            <div id="verifications" class="panel-body">
                <div class="va-container">
                    <div class="text-wrap va-middle">
                        <span class="item-name"><?php echo $lang->line('Email Address');?></span>
                        <?php
                            if ($user->data_exists('email'))
                            {
                        ?>
                                <span class="item-status"><?php echo $user->get('email');?></span>
                                <?php
                            }
                                ?>
                    </div>
                    <?php
                        if ($user->data_exists('email'))
                        {
                    ?>
                            <div class="pull-right verification-icon">
                                <span class="icon glyphicon glyphicon-ok-sign"></span>
                            </div>
                            <?php
                        }
                            ?>
                </div>
                <div class="va-container">
                    <div class="text-wrap va-middle">
                        <span class="item-name"><?php echo $lang->line('Phone Number');?></span>
                        <?php
                            if ($user->data_exists('phone_number') && $user->get('phone_number') != '')
                            {
                        ?>
                                <span class="item-status"><?php echo $user->get('phone_number');?></span>
                                </div>
                                <div class="pull-right verification-icon">
                                    <span class="icon glyphicon glyphicon-ok-sign"></span>
                                <?php
                            }
                            else
                            {
                                ?>
                                <span class="item-status">
                                    <a href="/<?php echo $country_lang_url;?>/dashboard/edit-profile"><?php echo $lang->line('dashboard_add_phone');?></a>
                                </span>
                                </div>
                                <div class="pull-right verification-icon">
                                    <span class="icon icon-red glyphicon glyphicon-remove-sign"></span>
                                <?php
                            }
                                ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-12 col-sm-4">
        <div class="panel space-4">
            <div class="panel-header active-panel-header"><?php echo $lang->line('dashboard_quick_links');?></div>
            <div id="quick_links" class="panel-body">
                <?php
                    if ($user->has_assets())
                    {
                        echo '<p><a href="/' . $country_lang_url . '/dashboard/listings">' . $lang->line('dashboard_manage_listings') . '</a></p>';
                    }
                ?>
                <p>
                    <?php
                        if ($user->has_assets())
                        {
                            echo '<a href="/' . $country_lang_url . '/dashboard/venue-bookings">' . $lang->line('common_nav_bookings') . '</a>';
                        }
                        else
                        {
                            echo '<a href="/' . $country_lang_url . '/dashboard/bookings">' . $lang->line('common_nav_bookings') . '</a>';
                        }
                    ?>
                </p>
                <p>
                    <a href="/<?php echo $country_lang_url;?>/dashboard/reviews"><?php echo $lang->line('common_reviews_upper');?></a>
                </p>
            </div>
        </div>
    </div>
</div>
