<ul class="list-layout panel-body">
<?php
    foreach ($messages->object() as $message)
    {
?>
        <li class="thread<?php if ($message->is_true('is_read')) { echo ' thread--read';}?>" message_id="<?php echo $message->get_id();?>" message_type="<?php echo $message->get('name');?>" message_read="<?php echo $message->get('is_read');?>">
            <div class="row message-row">
                <div class="col-xs-12 col-sm-3 bottom-m-1">
                    <div class="row-table">
                        <div class="col-xs-3 col-sm-5 p-0">
                            <img height="50" width="50" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>" src="<?php echo $message->wrangle('sending_user_image')->get_user_url('profile');?>" class="img-circle" />
                        </div>
                        <div class="col-xs-9 col-sm-7 p-0">
                            <p><?php echo $message->wrangle('sending_user_full_name_length_limited')->limited(20);?></p>
                            <p><?php echo $message->wrangle('created_date')->formatted();?></p>
                        </div>
                    </div>
                </div>
                <?php
                    if ($message->get('message_type') == Message_Type::VENUEMADE || $message->get('message_type') == Message_Type::CONVERSATION || $message->get('message_type') == Message_Type::INQUIRY)
                    {
                        $link = site_url($country_lang_url . '/' . $message->get('url') . '/' . $message->get('conversation_id'));
                    }
                    else
                    {
                        $link = site_url($country_lang_url . '/' . $message->get('url') . '/' . $message->get('reservation_id'));
                    }
                    if ($message->get('message_type') == Message_Type::INQUIRY)
                    {
                ?>
                        <div class="col-xs-12 col-sm-5 col-md-5 col-lg-6">
                            <a class="link-reset text-muted" href="#" name="messagelink" message_id="<?php echo $message->get_id();?>" redirect_url="<?php echo $link;?>">
                                <span class="message_subject"><?php echo $lang->line('dashboard_inquiry', $message->wrangle('room_name_length_limited')->limited(40));?></span>
                            </a>
                        </div>
                        <?php
                    }
                    else
                    {
                        ?>
                        <div class="col-xs-12 col-sm-4 col-md-5 <?php echo (($inbox)?'col-lg-6':'col-lg-5');?> bottom-m-1">
                            <a class="link-reset text-muted" href="#" name="messagelink" message_id="<?php echo $message->get_id();?>" redirect_url="<?php echo $link;?>">
                                <span class="message_subject">
                                    <?php
                                        if (!$message->is_true('is_read'))
                                        {
                                            echo '<span class="text-highlight">' . $lang->line('dashboard_message_new') . '</span> ';
                                        }
                                        echo $message->wrangle('message_length_limited')->limited(145);
                                    ?>
                                </span>
                                <div>
                                    <span><?php echo $message->wrangle('room_name_length_limited')->limited(40);?></span>
                                    <span>(<?php echo $message->wrangle('reservation_start_date_time')->formatted('inbox') . ' - ' . $message->wrangle('reservation_end_date_time')->formatted('inbox');?>)</span>
                                </div>
                            </a>
                        </div>
                        <?php
                    }
                        ?>
                <div class="col-xs-12 col-sm-5 col-md-4 <?php echo (($inbox)?'col-lg-3':'col-lg-4');?> bottom-m-1">
                    <div class="col-xs-7 col-sm-7 p-0">
                        <p class="reservation_inquiry label label-default"><?php echo $lang->line($message->get('name'));?></p>
                        <?php
                            if (!$message->is_null('price'))
                            {
                        ?>
                                <br />
                                <span class="hide-sm">
                                    <strong>
                                        <?php
                                            if ($venue_user[$message->get_id()])
                                            {
                                                echo $message->wrangle('reservation_pay_out')->formatted(true);
                                            }
                                            else
                                            {
                                                echo $message->wrangle('reservation_price')->formatted(true);
                                            }
                                            if (!$message->is_null('client_discount') && !$message->is_null('discount_applied'))
                                            {
                                                echo '<br />' . $lang->line('common_member_discount', $message->get('discount_applied'));
                                            }
                                        ?>
                                    </strong>
                                </span>
                                <?php
                            }
                                ?>
                    </div>
                    <div class="col-xs-5 col-sm-5 p-0">
                        <?php
                            if ($message->is_true('is_starred'))
                            {
                                $class = "glyphicon-star";
                                $hide = "";
                                $text = $lang->line('dashboard_message_starred');
                            }
                            else
                            {
                                $class = "glyphicon-star-empty";
                                $hide = "hide";
                                $text = $lang->line('dashboard_message_star');
                            }
                        ?>
                        <p class="inbox_action zc_starred message-icon <?php echo $hide;?>" message_id="<?php echo $message->get_id();?>">
                            <span id="starred_<?php echo $message->get_id();?>" class="glyphicon starred <?php echo $class;?>" aria-hidden="true"></span><span class="icon-text star-text"><?php echo $text;?></span>
                        </p>
                        <p class="inbox_action zc_delete message-icon trash hide">
                            <span class="glyphicon glyphicon-trash icon-lg" message_id="<?php echo $message->get_id();?>" aria-hidden="true"></span><span class="icon-text"><?php echo $lang->line('common_delete');?></span>
                        </p>
                    </div>
                </div>
            </div>
        </li>
        <div class="separator-border"></div>
        <?php
    }
        ?>
</ul>
