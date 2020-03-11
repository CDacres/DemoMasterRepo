<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $reservation_id;?></p>
            </div>
        </div>
    </div>
</div>
<div>
    <?php
        if ($messages->exists_in_db())
        {
            foreach ($messages->object() as $message)
            {
                $showRoomURL = true;
                if (!$message->is_true('venue_enabled') || !$message->is_true('venue_approved') || !$message->is_true('room_enabled') || !$message->is_true('room_approved'))
                {
                    $showRoomURL = false;
                }
                echo '<br />From: ' . $message->wrangle('sending_user_full_name')->formatted() . '<br />To: ' . $message->wrangle('receiving_user_full_name')->formatted() . '<br />Sent: ' . $message->wrangle('created_date_time')->formatted('admin_full') . '<br />';
                if ($message->get('message_type') != Message_Type::CONVERSATION)
                {
                    echo $lang->line('dashboard_conversation_title', $lang->line($message->get('name')), (($showRoomURL)?'<a href="' . get_room_url($message) . '" target="_blank">' . $message->get('room_name') . '</a>':$message->get('room_name') . ' (' . $message->get('room_id') . ') (disabled)')) . '<br />';
                }
                echo $message->get('message') . '<br />';
            }
        }
    ?>
</div>