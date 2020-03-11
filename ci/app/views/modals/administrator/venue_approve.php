<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $venue->get_id();?></p>
            </div>
        </div>
    </div>
</div>
<form>
    <?php echo $venue->get_html_data_input('id', null, 'hidden', 'zc_venue_id');?>
    <div class="space-top-2">
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <div class="col-sm-3">
                    <h3>Approved</h3>
                </div>
                <div class="col-sm-3">
                    <input type="checkbox" value="<?php echo $venue->get_id();?>" name="zc_venue_approved" id="zc_venue_approved" class="js-switch"
                        <?php
                            if ($venue->is_approved())
                            {
                                echo ' checked';
                            }
                        ?>
                    />
                </div>
            </div>
        </div>
    </div>
    <div id="venue_rooms" class="space-top-2"<?php echo ((!$venue->is_approved())?' style="display: none;"':'');?>>
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <?php
                    if (!$rooms->exists_in_db())
                    {
                ?>
                        <div class="col-sm-12 bottom-p-1">
                            <b>No Rooms</b>
                        </div>
                        <?php
                    }
                    else
                    {
                        ?>
                        <div class="col-sm-12 bottom-p-1">
                            <div class="col-sm-4">
                            </div>
                            <div class="col-sm-5 venue-room-field-title">
                                <a class="btn btn-default" id="zc_approve_all_rooms">Select all rooms</a>
                            </div>
                            <div class="col-sm-3 venue-room-field-title">
                                Price Control (%)
                            </div>
                        </div>
                        <?php
                            foreach ($rooms->object() as $room)
                            {
                        ?>
                                <div class="col-sm-12 bottom-p-1">
                                    <div class="col-sm-2 venue-room">
                                        <div class="venue-room-image" style="background-image: url(<?php echo $room->wrangle('image')->get_url('small');?>);"></div>
                                    </div>
                                    <div class="col-sm-4 venue-room">
                                        <div class="top-p-1">
                                            <h4 class="venue-room-title">
                                                <a href="<?php echo get_room_url($room);?>" target="_blank" title="View room"><?php echo $room->wrangle('defaulted_name')->value();?></a>
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="col-sm-3 venue-room">
                                        <div class="top-p-1">
                                            <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_room_approved" class="zc_room_approved js-switch"
                                                <?php
                                                    if ($room->is_approved())
                                                    {
                                                        echo ' checked';
                                                    }
                                                ?>
                                            />
                                        </div>
                                    </div>
                                    <div class="col-sm-3 venue-room">
                                        <div class="top-p-1">
                                            <?php echo $room->get_html_data_input('price_control_percent', 'zc_price_control_percent form-control', 'text', 'zc_price_control_percent');?>
                                        </div>
                                    </div>
                                </div>
                                <?php
                            }
                    }
                                ?>
            </div>
        </div>
    </div>
</form>