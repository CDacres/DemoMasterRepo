<?php
    if ($messages->get_first()->get('sending_user_id') == $reserved_user->get('id'))
    {
        $conversation_user = 'receiving_user_';
    }
    else
    {
        $conversation_user = 'sending_user_';
    }
?>
<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-12 space-4">
            <div id="listings-container">
                <div class="suspension-container">
                    <div class="panel space-4">
                        <div class="panel-header active-panel-header">
                            <div class="row">
                                <div class="profile active-panel-padding">
                                    <div class="profileimg">
                                        <img height="68" width="68" src="<?php echo $messages->get_first()->wrangle($conversation_user . 'image')->get_user_url('profile');?>" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>"/>
                                    </div>
                                    <div class="profilename">
                                        <h3><?php echo $messages->get_first()->wrangle($conversation_user . 'full_name')->formatted();?></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="conversation">
                            <ul class="panel-list clearfix">
                                <li class="clearfix">
                                    <div class="smalluserprofile">
                                        <img height="50" width="50" alt="" src="<?php echo $reserved_user->wrangle('image')->get_user_url('profile');?>" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>"/>
                                        <br />
                                        <?php echo $lang->line('dashboard_you');?>
                                    </div>
                                    <div class="createmessage col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                        <textarea id="zc_message_text" name="comment"></textarea>
                                        <input type="hidden" id="zc_message_data" receiving_user_id="<?php echo $messages->get_first()->get($conversation_user . 'id');?>" sending_user_id="<?php echo $reserved_user->get('id');?>" reservation_id="<?php echo $messages->get_first()->get('reservation_id');?>" message_type="<?php echo Message_Type::CONVERSATION;?>" is_conversation="true" />
                                        <button id="zc_message_submit" name="submit" class="btn btn-primary" type="submit"><?php echo $lang->line('dashboard_message_send');?></button>
                                        <span class="arrowimg rightarrow"></span>
                                    </div>
                                </li>
                                <?php
                                    foreach ($messages->object() as $message)
                                    {
                                        $showRoomURL = true;
                                        if (!$message->is_true('venue_enabled') || !$message->is_true('venue_approved') || !$message->is_true('room_enabled') || !$message->is_true('room_approved'))
                                        {
                                            $showRoomURL = false;
                                        }
                                        if ($message->get('sending_user_id') == $reserved_user->get('id'))
                                        {
                                ?>
                                            <li class="clearfix">
                                                <div class="smalluserprofile">
                                                    <img height="50" width="50" alt="" src="<?php echo $message->wrangle('sending_user_image')->get_user_url('profile');?>" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>"/>
                                                    <br />
                                                    <?php echo $lang->line('dashboard_you');?>
                                                </div>
                                                <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                                    <?php
                                                        if ($message->get('message_type') != Message_Type::CONVERSATION)
                                                        {
                                                    ?>
                                                            <div class="conversation_type">
                                                                <p><?php echo $lang->line('dashboard_conversation_title', $lang->line($message->get('name')), (($showRoomURL)?'<a href="' . get_room_url($message) . '" target="_blank">' . $message->get('room_name') . '</a>':$message->get('room_name')));?></p>
                                                                <?php
                                                                    if ($message->get('message_type') != Message_Type::INQUIRY)
                                                                    {
                                                                ?>
                                                                        <p>
                                                                            <span><?php echo $message->wrangle('reservation_start_date_time')->formatted() . ' - ' . $message->wrangle('reservation_end_date_time')->formatted() . ', ' . $message->wrangle('reservation_guests')->formatted();?></span>
                                                                        </p>
                                                                        <?php
                                                                    }
                                                                        ?>
                                                                <span class="arrowimg rightarrow"></span>
                                                            </div>
                                                            <?php
                                                        }
                                                        if ($message->get('message_type') == Message_Type::CONVERSATION)
                                                        {
                                                            ?>
                                                            <div class="conversation_details no_type">
                                                                <p><?php echo $message->get('message');?></p>
                                                                <span class="arrowimg rightarrow"></span>
                                                            </div>
                                                            <?php
                                                        }
                                                        else
                                                        {
                                                            ?>
                                                            <div class="conversation_details">
                                                                <p><?php echo $message->get('message');?></p>
                                                            </div>
                                                            <?php
                                                        }
                                                            ?>
                                                </div>
                                            </li>
                                            <?php
                                        }
                                        else
                                        {
                                            ?>
                                            <li class="clearfix">
                                                <div class="answer col-xs-10 col-sm-10 col-md-10 col-lg-10">
                                                    <?php
                                                        if ($message->get('message_type') != Message_Type::CONVERSATION)
                                                        {
                                                    ?>
                                                            <div class="conversation_type">
                                                                <p><?php echo $lang->line('dashboard_conversation_title', $lang->line($message->get('name')), (($showRoomURL)?'<a href="' . get_room_url($message) . '" target="_blank">' . $message->get('room_name') . '</a>':$message->get('room_name')));?></p>
                                                                <?php
                                                                    if ($message->get('message_type') != Message_Type::INQUIRY)
                                                                    {
                                                                ?>
                                                                        <p>
                                                                            <span><?php echo $message->wrangle('reservation_start_date_time')->formatted() . ' - ' . $message->wrangle('reservation_end_date_time')->formatted();?></span>
                                                                            <span><?php echo $message->wrangle('reservation_guests')->formatted();?></span>
                                                                        </p>
                                                                        <?php
                                                                    }
                                                                        ?>
                                                                <span class="arrowimg leftarrow"></span>
                                                            </div>
                                                            <?php
                                                        }
                                                        if ($message->get('message_type') == Message_Type::CONVERSATION)
                                                        {
                                                            ?>
                                                            <div class="conversation_details no_type">
                                                                <p><?php echo $message->get('message');?></p>
                                                                <span class="arrowimg leftarrow"></span>
                                                            </div>
                                                            <?php
                                                        }
                                                        else
                                                        {
                                                            ?>
                                                            <div class="conversation_details">
                                                                <p><?php echo $message->get('message');?></p>
                                                            </div>
                                                            <?php
                                                        }
                                                            ?>
                                                </div>
                                                <div class="useranswer smalluserprofile">
                                                    <img height="50" width="50" alt="" src="<?php echo $message->wrangle('sending_user_image')->get_user_url('profile');?>" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>"/>
                                                    <br />
                                                    <?php echo $message->wrangle('sending_user_full_name')->formatted();?>
                                                </div>
                                            </li>
                                            <?php
                                        }
                                    }
                                            ?>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>