<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'venue'], true);?>
                        <br />
                        <?php
                            if (isset($venue_missing_commission_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_commission" visibility="hidden">Missing commission (<?php echo $venue_missing_commission_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_commission) && count($venue_missing_commission) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_commission');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_commission_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_commission as $miss_comm)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_comm['venue_id'];?>" target="_blank"><?php echo trim($miss_comm['venue_name']) . ' (' . $miss_comm['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_comm['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $miss_comm['room_count'];
                                                                    if ($miss_comm['room_count'] > 0)
                                                                    {
                                                                        $miss_comm_roomsids = explode(",", $miss_comm['room_ids']);
                                                                        $miss_comm_roomsid_total = count($miss_comm_roomsids);
                                                                        if ($miss_comm_roomsid_total > 0)
                                                                        {
                                                                            $miss_comm_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($miss_comm_roomsids as $miss_comm_room_id)
                                                                            {
                                                                                ++$miss_comm_roomid_count;
                                                                                echo '<a href="/rooms/' . $miss_comm_room_id . '" target="_blank">' . $miss_comm_room_id . '</a>' . (($miss_comm_roomid_count != $miss_comm_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_missing_rooms_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_rooms" visibility="hidden">Missing rooms (<?php echo $venue_missing_rooms_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_rooms) && count($venue_missing_rooms) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_rooms');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Approved</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_rooms_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_rooms as $miss_venue_room)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_room['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_room['venue_name']) . ' (' . $miss_venue_room['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_room['venue_approved'];?></td>
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
                            if (isset($venue_missing_hours_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_hours" visibility="hidden">Missing hours (<?php echo $venue_missing_hours_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_hours) && count($venue_missing_hours) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_hours');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_hours_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_hours as $miss_venue_hour)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_hour['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_hour['venue_name']) . ' (' . $miss_venue_hour['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_hour['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $miss_venue_hour['room_count'];
                                                                    if ($miss_venue_hour['room_count'] > 0)
                                                                    {
                                                                        $miss_venue_hour_roomsids = explode(",", $miss_venue_hour['room_ids']);
                                                                        $miss_venue_hour_roomsid_total = count($miss_venue_hour_roomsids);
                                                                        if ($miss_venue_hour_roomsid_total > 0)
                                                                        {
                                                                            $miss_venue_hour_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($miss_venue_hour_roomsids as $miss_venue_hour_room_id)
                                                                            {
                                                                                ++$miss_venue_hour_roomid_count;
                                                                                echo '<a href="/rooms/' . $miss_venue_hour_room_id . '" target="_blank">' . $miss_venue_hour_room_id . '</a>' . (($miss_venue_hour_roomid_count != $miss_venue_hour_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_missing_cancel_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_cancel" visibility="hidden">Missing cancellation policies (<?php echo $venue_missing_cancel_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_cancel) && count($venue_missing_cancel) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_cancel');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_cancel_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_cancel as $miss_venue_cancel)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_cancel['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_cancel['venue_name']) . ' (' . $miss_venue_cancel['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_cancel['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $miss_venue_cancel['room_count'];
                                                                    if ($miss_venue_cancel['room_count'] > 0)
                                                                    {
                                                                        $miss_venue_cancel_roomsids = explode(",", $miss_venue_cancel['room_ids']);
                                                                        $miss_venue_cancel_roomsid_total = count($miss_venue_cancel_roomsids);
                                                                        if ($miss_venue_cancel_roomsid_total > 0)
                                                                        {
                                                                            $miss_venue_cancel_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($miss_venue_cancel_roomsids as $miss_venue_cancel_room_id)
                                                                            {
                                                                                ++$miss_venue_cancel_roomid_count;
                                                                                echo '<a href="/rooms/' . $miss_venue_cancel_room_id . '" target="_blank">' . $miss_venue_cancel_room_id . '</a>' . (($miss_venue_cancel_roomid_count != $miss_venue_cancel_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_missing_reviews_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_reviews" visibility="hidden">Missing reviews (<?php echo $venue_missing_reviews_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_reviews) && count($venue_missing_reviews) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_reviews');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_reviews_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_reviews as $miss_venue_review)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_review['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_review['venue_name']) . ' (' . $miss_venue_review['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_review['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $miss_venue_review['room_count'];
                                                                    if ($miss_venue_review['room_count'] > 0)
                                                                    {
                                                                        $miss_venue_review_roomsids = explode(",", $miss_venue_review['room_ids']);
                                                                        $miss_venue_review_roomsid_total = count($miss_venue_review_roomsids);
                                                                        if ($miss_venue_review_roomsid_total > 0)
                                                                        {
                                                                            $miss_venue_review_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($miss_venue_review_roomsids as $miss_venue_review_room_id)
                                                                            {
                                                                                ++$miss_venue_review_roomid_count;
                                                                                echo '<a href="/rooms/' . $miss_venue_review_room_id . '" target="_blank">' . $miss_venue_review_room_id . '</a>' . (($miss_venue_review_roomid_count != $miss_venue_review_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_missing_image_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_image" visibility="hidden">Missing image (<?php echo $venue_missing_image_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_image) && count($venue_missing_image) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_image');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_image_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_image as $miss_venue_image)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_image['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_image['venue_name']) . ' (' . $miss_venue_image['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_image['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $miss_venue_image['room_count'];
                                                                    if ($miss_venue_image['room_count'] > 0)
                                                                    {
                                                                        $miss_venue_image_roomsids = explode(",", $miss_venue_image['room_ids']);
                                                                        $miss_venue_image_roomsid_total = count($miss_venue_image_roomsids);
                                                                        if ($miss_venue_image_roomsid_total > 0)
                                                                        {
                                                                            $miss_venue_image_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($miss_venue_image_roomsids as $miss_venue_image_room_id)
                                                                            {
                                                                                ++$miss_venue_image_roomid_count;
                                                                                echo '<a href="/rooms/' . $miss_venue_image_room_id . '" target="_blank">' . $miss_venue_image_room_id . '</a>' . (($miss_venue_image_roomid_count != $miss_venue_image_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_missing_feat_image_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_feat_image" visibility="hidden">Missing featured image (<?php echo $venue_missing_feat_image_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_feat_image) && count($venue_missing_feat_image) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_feat_image');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_feat_image_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_feat_image as $miss_venue_feat_image)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_feat_image['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_feat_image['venue_name']) . ' (' . $miss_venue_feat_image['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_feat_image['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $miss_venue_feat_image['room_count'];
                                                                    if ($miss_venue_feat_image['room_count'] > 0)
                                                                    {
                                                                        $miss_venue_feat_image_roomsids = explode(",", $miss_venue_feat_image['room_ids']);
                                                                        $miss_venue_feat_image_roomsid_total = count($miss_venue_feat_image_roomsids);
                                                                        if ($miss_venue_feat_image_roomsid_total > 0)
                                                                        {
                                                                            $miss_venue_feat_image_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($miss_venue_feat_image_roomsids as $miss_venue_feat_image_room_id)
                                                                            {
                                                                                ++$miss_venue_feat_image_roomid_count;
                                                                                echo '<a href="/rooms/' . $miss_venue_feat_image_room_id . '" target="_blank">' . $miss_venue_feat_image_room_id . '</a>' . (($miss_venue_feat_image_roomid_count != $miss_venue_feat_image_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_missing_vat_rate_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_missing_vat_rate" visibility="hidden">Missing vat rate (<?php echo $venue_missing_vat_rate_results;?>)</h4>
                                <?php
                                    if (isset($venue_missing_vat_rate) && count($venue_missing_vat_rate) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_missing_vat_rate');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                    <th>Country</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_missing_vat_rate_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_missing_vat_rate as $miss_venue_vat_rate)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $miss_venue_vat_rate['venue_id'];?>" target="_blank"><?php echo trim($miss_venue_vat_rate['venue_name']) . ' (' . $miss_venue_vat_rate['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $miss_venue_vat_rate['venue_approved'];?></td>
                                                            <td><?php echo $miss_venue_vat_rate['venue_country'];?></td>
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
                            if (isset($venue_same_locations_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_same_locations" visibility="hidden">Same Location (<?php echo $venue_same_locations_results;?>)</h4>
                                <?php
                                    if (isset($venue_same_locations) && count($venue_same_locations) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_same_locations');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Location</th>
                                                    <th>Approved</th>
                                                    <th>Room Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_same_locations_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_same_locations as $same_venue_location)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $same_venue_location['venue_id'];?>" target="_blank"><?php echo trim($same_venue_location['venue_name']) . ' (' . $same_venue_location['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $same_venue_location['venue_lat'] . ", " . $same_venue_location['venue_long'];?></td>
                                                            <td><?php echo $same_venue_location['venue_approved'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $same_venue_location['room_count'];
                                                                    if ($same_venue_location['room_count'] > 0)
                                                                    {
                                                                        $same_venue_location_roomsids = explode(",", $same_venue_location['room_ids']);
                                                                        $same_venue_location_roomsid_total = count($same_venue_location_roomsids);
                                                                        if ($same_venue_location_roomsid_total > 0)
                                                                        {
                                                                            $same_venue_location_roomid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($same_venue_location_roomsids as $same_venue_location_room_id)
                                                                            {
                                                                                ++$same_venue_location_roomid_count;
                                                                                echo '<a href="/rooms/' . $same_venue_location_room_id . '" target="_blank">' . $same_venue_location_room_id . '</a>' . (($same_venue_location_roomid_count != $same_venue_location_roomsid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
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
                            if (isset($venue_same_rooms_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="venue_same_rooms" visibility="hidden">Same Room names (<?php echo $venue_same_rooms_results;?>)</h4>
                                <?php
                                    if (isset($venue_same_rooms) && count($venue_same_rooms) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/venue_same_rooms');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Approved</th>
                                                    <th>Room Count</th>
                                                    <th>Room Name</th>
                                                </tr>
                                            </thead>
                                            <tbody id="venue_same_rooms_rows" style="display: none;">
                                                <?php
                                                    foreach ($venue_same_rooms as $same_venue_room)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <a href="/venues/<?php echo $same_venue_room['venue_id'];?>" target="_blank"><?php echo trim($same_venue_room['venue_name']) . ' (' . $same_venue_room['venue_id'] . ')';?></a>
                                                            </td>
                                                            <td><?php echo $same_venue_room['venue_approved'];?></td>
                                                            <td><?php echo $same_venue_room['room_count'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo trim($same_venue_room['room_name']);
                                                                    $same_venue_room_roomsids = explode(",", $same_venue_room['room_ids']);
                                                                    $same_venue_room_roomsid_total = count($same_venue_room_roomsids);
                                                                    if ($same_venue_room_roomsid_total > 0)
                                                                    {
                                                                        $same_venue_room_roomid_count = 0;
                                                                        echo ' (';
                                                                        foreach ($same_venue_room_roomsids as $same_venue_room_room_id)
                                                                        {
                                                                            ++$same_venue_room_roomid_count;
                                                                            echo '<a href="/rooms/' . $same_venue_room_room_id . '" target="_blank">' . $same_venue_room_room_id . '</a>' . (($same_venue_room_roomid_count != $same_venue_room_roomsid_total)?', ':'');
                                                                        }
                                                                        echo ')';
                                                                    }
                                                                ?>
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
                                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>