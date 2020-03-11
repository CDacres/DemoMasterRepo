<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="jumbotron">
                <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                        <div class="row">
                            <div class="col-lg-9 col-md-9 col-sd-9">
                                <div class="panel panel-transparent">
                                    <div class="panel-body">
                                        <h4>Rooms: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                            foreach ($filters as $buttonStatus => $buttonText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/rooms/index/' . $buttonStatus) . '" class="btn admin-button ' . (($buttonStatus == $status)?'btn-success':'btn-default') . '">' . $buttonText . '</a>';
                                            }
                                        ?>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/rooms/roomkeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Rooms" type="text" value="" />
                                    <button type="submit" class="btn btn-default btn-sm">Find</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-heading">
                        <?php
                            if (strlen($pagination))
                            {
                                echo '<div>' . $pagination . '</div>';
                            }
                        ?>
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table table-hover text-left administrator-table">
                            <thead>
                                <tr>
                                    <?php
                                        foreach ($fields as $field_name => $field_display)
                                        {
                                            echo '<th width="';
                                            switch ($field_name)
                                            {
                                                case 'description':
                                                    echo '10';
                                                break;

                                                case 'venue_name':
                                                case 'title':
                                                    echo '8';
                                                break;

                                                case 'created':
                                                    echo '7.5';
                                                break;

                                                case 'asset_id':
                                                    echo '5';
                                                break;

                                                default:
                                                    echo '4';
                                                break;
                                            }
                                            echo '%"><a href="/' . $country_lang_url . '/administrator/rooms/' . ((isset($keyword))?'roomkeyword/' . $keyword:'index/' . $status) . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                            if ($sort_by == $field_name)
                                            {
                                                echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                            }
                                            echo '</a></th>';
                                        }
                                    ?>
                                    <th width="7%">Completion Steps</th>
                                    <th width="4%">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($rooms->object() as $room)
                                    {
                                        $url = $room->wrangle('image')->get_url('small');
                                ?>
                                        <tr class="text-left">
                                            <td width="4%">
                                                <a href="<?php echo get_room_url($room);?>" target="_blank" title="View room"><?php echo $room->get_id();?></a>
                                            </td>
                                            <td width="7.5%"><?php echo $room->wrangle('created_date')->formatted('admin_full');?></td>
                                            <td width="5%">
                                                <a class="fancybox" rel="<?php echo $room->get_id();?>" href="<?php echo $url;?>">
                                                    <img src="<?php echo $url;?>" alt="<?php echo $room->wrangle('defaulted_name')->value();?>"  title="<?php echo $room->wrangle('defaulted_name')->value();?>">
                                                </a>
                                            </td>
                                            <td width="8%">
                                                (<a href="<?php echo get_venue_url($room);?>" target="_blank" title="View venue"><?php echo $room->get('venue_id');?></a> - <a href="<?php echo get_venue_url($room, true);?>" target="_blank" title="Edit listing">Edit listing</a>)
                                                <br />
                                                <?php
                                                    echo $room->wrangle('defaulted_venue_name')->value();
                                                    if ($room->is_true('uses_live_bookings'))
                                                    {
                                                        echo '<span class="glyphicon glyphicon-flash live_booking_flash" aria-hidden="true"></span>';
                                                    }
                                                ?>
                                                <br />
                                                <?php echo $room->get('address');?>
                                                <br />
                                                <?php echo $room->wrangle('main_venue_contact_name')->formatted() . ' (' . $room->get('main_venue_user_id') . ')';?>
                                                <br />
                                                <?php echo $room->wrangle('main_venue_user_email')->get_email_html() . $room->wrangle('main_venue_user_phone')->get_phone_html();?>
                                                <br />
                                                <?php
                                                    if ($room->get('main_venue_user_role_id') != User::ADMINUSER)
                                                    {
                                                        echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $room->get('main_venue_user_id') . '">Adopt</a> · ';
                                                    }
                                                    echo '<a class="contact_details pointer" data-toggle="modal" data-target="#mainModal" id="' . $room->get('venue_id') . '">Contact Details</a>';
                                                ?>
                                            </td>
                                            <td width="8%"><?php echo $room->wrangle('defaulted_name')->value();?></td>
                                            <td width="10%"><?php echo $room->get('description');?></td>
                                            <td>
                                                <?php
                                                    if ($room->get('primary_vertical_id') == Vertical::DINING && !$room->is_null('minimum_spend') && $room->get('minimum_spend') > 0)
                                                    {
                                                        echo 'Minimum spend: ' . $room->wrangle('minimum_spend')->formatted(true) . '<br />';
                                                    }
                                                    if ($room->get('primary_vertical_id') != Vertical::DINING && $room->get('office_type_id') != Office_Type::PRIVATEOFFICE && !$room->is_null('minimum_hourly_stay'))
                                                    {
                                                        echo 'Minimum duration: ' . $room->wrangle('minimum_hourly_stay')->formatted() . '<br />';
                                                    }
                                                    if ($room->get('primary_vertical_id') == Vertical::OFFICE)
                                                    {
                                                        if (!$room->is_null('minimum_term') && $room->get('minimum_term') > 0)
                                                        {
                                                            echo 'Minimum term: ' . $room->wrangle('minimum_term')->formatted() . '<br />';
                                                        }
                                                        if (!$room->is_null('office_size') && $room->get('office_size') != 0 && !$room->is_null('office_size_unit'))
                                                        {
                                                            echo 'Size: ' . format_price($room->get('office_size')) . ' ' . str_replace("2", "<sup>2</sup>", $room->get('office_size_unit')) . '<br />';
                                                        }
                                                        if (!$room->is_null('num_of_desks') && $room->get('num_of_desks') > 0)
                                                        {
                                                            if ($room->get('office_type_id') == Office_Type::PRIVATEOFFICE)
                                                            {
                                                                echo 'Capacity: ' . $room->get('max_capacity');
                                                            }
                                                            else
                                                            {
                                                                echo 'Number of desks: ' . $room->get('num_of_desks') . '<br />';
                                                            }
                                                        }
                                                    }
                                                ?>
                                            </td>
                                            <td width="4%">
                                                <?php
                                                    if ($room->get('monthly_rate') != 0)
                                                    {
                                                        echo $room->wrangle('monthly_rate')->formatted(true) . '/month<br />Venue: ' . $room->wrangle('venue_monthly_rate')->formatted(true) . '/month';
                                                    }
                                                    else
                                                    {
                                                        if ($room->get('hourly_rate') != 0)
                                                        {
                                                            echo $room->wrangle('hourly_rate')->formatted(true) . '/h<br />Venue: ' . $room->wrangle('venue_hourly_rate')->formatted(true) . '/h';
                                                        }
                                                        if ($room->get('daily_rate') != 0)
                                                        {
                                                            echo '<br />' . $room->wrangle('daily_rate')->formatted(true) . '/day<br />Venue: ' . $room->wrangle('venue_daily_rate')->formatted(true) . '/day';
                                                        }
                                                    }
                                                    if (($room->get('primary_vertical_id') == Vertical::MEETING || $room->get('primary_vertical_id') == Vertical::PARTY) && $room->get('daily_delegate_rate') != 0)
                                                    {
                                                        echo '<br />' . $room->wrangle('daily_delegate_rate')->formatted(true) . '/daily delegate rate<br />Venue: ' . $room->wrangle('venue_daily_delegate_rate')->formatted(true) . '/daily delegate rate';
                                                    }
                                                ?>
                                            </td>
                                            <td width="4%"><?php echo $room->get_html_data_input('price_control_percent', 'zc_price_control_percent form-control', 'text', 'zc_price_control_percent');?></td>
                                            <td width="4%">
                                                <?php echo $room->get_html_data_input('flexible_percent', 'zc_flexible_percent form-control', 'text', 'zc_flexible_percent');?>
                                                <br />
                                                <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_flexible_enabled" class="zc_flexible_enabled js-switch"
                                                    <?php
                                                        if ($room->is_true('flexible_enabled'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="4%"><?php echo $room->wrangle('page_views')->formatted();?></td>
                                            <td width="4%"><?php echo $room->get_html_data_input('ranking', 'zc_ranking form-control', 'text', 'zc_ranking');?></td>
                                            <td width="4%">
                                                <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_room_approval" class="zc_room_approval js-switch"
                                                    <?php
                                                        if ($room->is_approved())
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="4%">
                                                <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_room_hidden" class="zc_room_hidden js-switch"
                                                    <?php
                                                        if ($room->is_true('hidden'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="7%">
                                                <?php
                                                    if ($room->is_approved())
                                                    {
                                                        echo '<a href="' . get_room_url($room) . '" target="_blank" title="View room"><span class="label ' . (($room->is_true('hidden'))?'label-warning">Hidden':'label-success">Live');
                                                    }
                                                    else
                                                    {
                                                        echo '<a href="' . get_room_url($room, '', true) . '" target="_blank" title="Edit listing"><span class="label label-warning">';
                                                        $room_steps = $room->get_uncompleted_stages();
                                                        if ($room_steps['todo'] > 0)
                                                        {
                                                            echo $room_steps['todo'] . ' step' . (($room_steps['todo'] > 1)?'s':'') . ' to go (' . $room_steps['stages'] . ')';
                                                        }
                                                        else
                                                        {
                                                            echo 'Pending for approval';
                                                        }
                                                    }
                                                    echo '</span></a>';
                                                ?>
                                            </td>
                                            <td width="4%">
                                                <a href="<?php echo get_room_url($room, '', true);?>" target="_blank" class="btn btn-default bottom-m-1">Edit listing</a>
                                                <br />
                                                <a data-id="<?php echo $room->get_id();?>" class="zc_delete_room_btn link-red">Delete</a>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                        ?>
                            </tbody>
                        </table>
                        <?php
                            if (strlen($pagination))
                            {
                                echo '<div>' . $pagination . '</div>';
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>