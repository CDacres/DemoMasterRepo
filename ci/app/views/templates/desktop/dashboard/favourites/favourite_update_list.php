<?php
    if (!$rooms->is_null_object() && $rooms->get_count() > 0)
    {
        foreach ($rooms->object() as $room)
        {
            if (isset($venue_id) && $venue_id != $room->get('venue_id'))
            {
                echo '</section>';
            }
            if (!isset($venue_id) || $venue_id != $room->get('venue_id'))
            {
                $venue_id = $room->get('venue_id');
?>
                <section>
                    <li class="listing panel-body header">
                        <div class="col-sm-12">
                            <h3><?php echo $room->wrangle('defaulted_venue_name')->value();?></h3>
                        </div>
                    </li>
                    <?php
            }
                    ?>
            <li class="listing panel-body favourite">
                <div class="col-sm-2">
                    <a href="<?php echo get_room_url($room);?>" target="_blank">
                        <div class="media-photo media-photo-block">
                            <div class="media-cover text-center">
                                <img class="img-responsive-height" src="<?php echo $room->wrangle('image')->get_url('small');?>" alt="" />
                            </div>
                        </div>
                    </a>
                </div>
                <div class="col-sm-7">
                    <h4><?php echo $room->wrangle('defaulted_name')->value();?></h4>
                    <a href="<?php echo get_room_url($room);?>"><?php echo $lang->line('dashboard_favourites_view');?></a>
                </div>
                <div class="col-sm-3 vert-aligned-container">
                    <input type="checkbox" value="<?php echo $room->get_id();?>" name="favourite" class="favourite_switch js-switch" data-room-id="<?php echo $room->get_id();?>" checked>
                </div>
            </li>
            <?php
                if ($rooms->get_last() == $room)
                {
                    echo '</section>';
                }
        }
    }
    else
    {
        echo '<li class="listing panel-body"><div class="row p-1"><div class="col-sm-6"><p>' . $lang->line('dashboard_favourites_none') . '</p></div></div></li>';
    }