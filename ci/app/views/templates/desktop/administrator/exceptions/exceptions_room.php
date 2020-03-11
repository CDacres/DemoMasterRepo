<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'room'], true);?>
                        <br />
                        <?php
                            if (isset($room_unapproved_venue_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="room_unapproved_venue" visibility="hidden">Approved rooms in unapproved venue (<?php echo $room_unapproved_venue_results;?>)</h4>
                                <?php
                                    if (isset($room_unapproved_venue) && count($room_unapproved_venue) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/room_unapproved_venue');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Room (ID)</th>
                                                    <th>Room Hidden</th>
                                                    <th>Venue (ID)</th>
                                                </tr>
                                            </thead>
                                            <tbody id="room_unapproved_venue_rows" style="display: none;">
                                                <?php
                                                    foreach ($room_unapproved_venue as $room_venue)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/rooms/<?php echo $room_venue['room_id'];?>" target="_blank"><?php echo trim($room_venue['room_name']) . ' (' . $room_venue['room_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $room_venue['room_hidden'];?></td>
                                                            <td>
                                                                <a href="/venues/<?php echo $room_venue['venue_id'];?>" target="_blank"><?php echo trim($room_venue['venue_name']) . ' (' . $room_venue['venue_id'] . ')';?></a>
                                                            </td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($room_missing_hours_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="room_missing_hours" visibility="hidden">Missing hours (<?php echo $room_missing_hours_results;?>)</h4>
                                <?php
                                    if (isset($room_missing_hours) && count($room_missing_hours) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/room_missing_hours');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Room (ID)</th>
                                                    <th>Room Approved</th>
                                                    <th>Room Hidden</th>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                </tr>
                                            </thead>
                                            <tbody id="room_missing_hours_rows" style="display: none;">
                                                <?php
                                                    foreach ($room_missing_hours as $miss_room_hour)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/rooms/<?php echo $miss_room_hour['room_id'];?>" target="_blank"><?php echo trim($miss_room_hour['room_name']) . ' (' . $miss_room_hour['room_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_hour['room_approved'];?></td>
                                                            <td><?php echo $miss_room_hour['room_hidden'];?></td>
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_room_hour['venue_id'];?>" target="_blank"><?php echo trim($miss_room_hour['venue_name']) . ' (' . $miss_room_hour['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_hour['venue_approved'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($room_missing_config_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="room_missing_config" visibility="hidden">Missing configurations (<?php echo $room_missing_config_results;?>)</h4>
                                <?php
                                    if (isset($room_missing_config) && count($room_missing_config) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/room_missing_config');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Room (ID)</th>
                                                    <th>Room Approved</th>
                                                    <th>Room Hidden</th>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                </tr>
                                            </thead>
                                            <tbody id="room_missing_config_rows" style="display: none;">
                                                <?php
                                                    foreach ($room_missing_config as $miss_room_config)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/rooms/<?php echo $miss_room_config['room_id'];?>" target="_blank"><?php echo trim($miss_room_config['room_name']) . ' (' . $miss_room_config['room_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_config['room_approved'];?></td>
                                                            <td><?php echo $miss_room_config['room_hidden'];?></td>
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_room_config['venue_id'];?>" target="_blank"><?php echo trim($miss_room_config['venue_name']) . ' (' . $miss_room_config['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_config['venue_approved'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($room_missing_image_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="room_missing_image" visibility="hidden">Missing image (<?php echo $room_missing_image_results;?>)</h4>
                                <?php
                                    if (isset($room_missing_image) && count($room_missing_image) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/room_missing_image');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Room (ID)</th>
                                                    <th>Room Approved</th>
                                                    <th>Room Hidden</th>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                </tr>
                                            </thead>
                                            <tbody id="room_missing_image_rows" style="display: none;">
                                                <?php
                                                    foreach ($room_missing_image as $miss_room_image)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/rooms/<?php echo $miss_room_image['room_id'];?>" target="_blank"><?php echo trim($miss_room_image['room_name']) . ' (' . $miss_room_image['room_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_image['room_approved'];?></td>
                                                            <td><?php echo $miss_room_image['room_hidden'];?></td>
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_room_image['venue_id'];?>" target="_blank"><?php echo trim($miss_room_image['venue_name']) . ' (' . $miss_room_image['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_image['venue_approved'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($room_missing_feat_image_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="room_missing_feat_image" visibility="hidden">Missing featured image (<?php echo $room_missing_feat_image_results;?>)</h4>
                                <?php
                                    if (isset($room_missing_feat_image) && count($room_missing_feat_image) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/room_missing_feat_image');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Room (ID)</th>
                                                    <th>Room Approved</th>
                                                    <th>Room Hidden</th>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                </tr>
                                            </thead>
                                            <tbody id="room_missing_feat_image_rows" style="display: none;">
                                                <?php
                                                    foreach ($room_missing_feat_image as $miss_room_feat_image)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/rooms/<?php echo $miss_room_feat_image['room_id'];?>" target="_blank"><?php echo trim($miss_room_feat_image['room_name']) . ' (' . $miss_room_feat_image['room_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_feat_image['room_approved'];?></td>
                                                            <td><?php echo $miss_room_feat_image['room_hidden'];?></td>
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_room_feat_image['venue_id'];?>" target="_blank"><?php echo trim($miss_room_feat_image['venue_name']) . ' (' . $miss_room_feat_image['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_room_feat_image['venue_approved'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>