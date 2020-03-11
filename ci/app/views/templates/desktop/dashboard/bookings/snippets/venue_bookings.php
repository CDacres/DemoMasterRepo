<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-3 space-sm-3 leftnav"><?php echo $leftNav->display_family();?></div>
        <div class="col-md-9 space-4">
            <div id="listings-container">
                <div class="suspension-container">
                    <div class="panel space-4">
                        <?php
                            if ($num_results > 0)
                            {
                        ?>
                                <div class="panel-header active-panel-header">
                                    <div class="row">
                                        <div class="col-sm-6 active-panel-padding">
                                            <button id="zc_booking_option_btn" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><?php echo $lang->line('dashboard_bookings_all', $num_results);?><span class="caret"></span></button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a class="zc_booking_list" filter_type="all" page_type="venue"><?php echo $lang->line('dashboard_bookings_all', $num_results);?></a>
                                                </li>
                                                <li role="separator" class="divider"></li>
                                                <li>
                                                    <a class="zc_booking_list" filter_type="current" page_type="venue"><?php echo $lang->line('dashboard_bookings_current', $booking_current);?></a>
                                                </li>
                                                <li>
                                                    <a class="zc_booking_list" filter_type="upcoming" page_type="venue"><?php echo $lang->line('dashboard_bookings_upcoming', $booking_upcoming);?></a>
                                                </li>
                                                <li>
                                                    <a class="zc_booking_list" filter_type="previous" page_type="venue"><?php echo $lang->line('dashboard_bookings_previous', $booking_previous);?></a>
                                                </li>
                                                <li role="separator" class="divider"></li>
                                                <?php
                                                    foreach ($booking_filter->result() as $type)
                                                    {
                                                        echo '<li><a class="zc_booking_list" zc_object_id="' . $type->id . '" page_type="venue">' . $lang->line($type->name) . ' (' . $type->booking_count . ')</a></li>';
                                                    }
                                                ?>
                                            </ul>
                                        </div>
                    <!--                                            <div id="ib-master-switch-container" class="col-sm-4">
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Search for...">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-default" type="button">Search</button>
                                                    make search work
                                                </span>
                                            </div>
                                        </div>-->
                                    </div>
                                </div>
                                <div class="table-responsive panel-body">
                                    <table class="table panel-body panel-light">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <a class="zc_bookings_ordering pointer" title="<?php echo $lang->line('dashboard_table_order_status');?>" ordering_field="status_name" page_type="venue" zc_booking_type="option" zc_booking_option="all" zc_current_order="-1"><?php echo $lang->line('dashboard_table_status');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_bookings_ordering pointer" title="<?php echo $lang->line('dashboard_table_order_room');?>" ordering_field="room_name" page_type="venue" zc_booking_type="option" zc_booking_option="all" zc_current_order="-1"><?php echo $lang->line('common_room');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_bookings_ordering pointer" title="<?php echo $lang->line('dashboard_table_order_client');?>" ordering_field="client_first_name" page_type="venue" zc_booking_type="option" zc_booking_option="all" zc_current_order="-1"><?php echo $lang->line('common_client');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_bookings_ordering pointer" title="<?php echo $lang->line('dashboard_table_order_dates');?>" ordering_field="start_date_time" page_type="venue" zc_booking_type="option" zc_booking_option="all" zc_current_order="-1"><?php echo $lang->line('dashboard_table_dates');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_bookings_ordering pointer" title="<?php echo $lang->line('dashboard_table_order_total');?>" ordering_field="price" page_type="venue" zc_booking_type="option" zc_booking_option="all" zc_current_order="-1"><?php echo $lang->line('dashboard_table_total');?></a>
                                                </th>
                                                <th><?php echo $lang->line('dashboard_table_payout');?></th>
                                                <th><?php echo $lang->line('dashboard_table_options');?></th>
                                            </tr>
                                        </thead>
                                        <tbody id="zc_booking_rows"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/bookings/venue_booking_update_list', ['bookings' => $bookings, 'country_lang_url' => $country_lang_url], true);?></tbody>
                                    </table>
                                </div>
                                <?php
                            }
                            else
                            {
                                ?>
                                <div class="panel-header active-panel-header">
                                    <div class="row"><?php echo $lang->line('dashboard_table_no_book');?></div>
                                </div>
                                <?php
                            }
                                ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>