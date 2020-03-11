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
                                        <h4>Bookings: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($invoice_amounts))
                                            {
                                                echo 'Future Invoice Amount(s):<br />';
                                                foreach ($invoice_amounts as $currency => $amount)
                                                {
                                                    if (isset($currencies[$currency]))
                                                    {
                                                        echo $currencies[$currency];
                                                    }
                                                    echo format_price($amount) . '<br />';
                                                }
                                                foreach ($invoice_csvs as $invoicecsvName => $invoicecsvText)
                                                {
                                                    echo '<a href="' . site_url($country_lang_url . '/administrator/payments/bookings_csv/' . $invoicecsvName) . '" class="btn admin-button btn-default" target="_blank">' . $invoicecsvText . ' <img src="/css/images/common/excel.png" alt="Download" style="vertical-align: top;" height="12"></a>';
                                                }
                                                echo '<br />';
                                            }
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                            foreach ($filters as $buttonStatus => $buttonText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/payments/bookings/' . $buttonStatus) . '" class="btn admin-button ' . (($buttonStatus == $status)?'btn-success':'btn-default') . '">' . $buttonText . '</a>';
                                            }
                                            if (isset($tog_dates))
                                            {
                                                ?>
                                                <div class="btn-group" style="margin: 0 1em 0 0;" role="group">
                                                    <a class="btn admin-button btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        Office Group Monthly Bookings
                                                        <img src="/css/images/common/excel.png" alt="Download" style="vertical-align: top;" height="12">
                                                        <span class="caret"></span>
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                    <?php
                                                        echo '<li><a href="' . site_url($country_lang_url . '/administrator/payments/bookings_csv/tog/' . date('n') . '/' . date('Y')) . '" target="_blank">Current Month</a></li>';
                                                        foreach ($tog_dates as $tog_year => $tog_months)
                                                        {
                                                            foreach ($tog_months as $tog_month)
                                                            {
                                                                echo '<li><a href="' . site_url($country_lang_url . '/administrator/payments/bookings_csv/tog/' . $tog_month['monthnum'] . '/' . $tog_year) . '" target="_blank">' . $tog_year . ' - ' . $tog_month['monthname'] . '</a></li>';
                                                            }
                                                        }
                                                    ?>
                                                    </ul>
                                                </div>
                                                <?php
                                            }
                                            foreach ($csvs as $csvName => $csvText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/payments/bookings_csv/' . $csvName) . '" class="btn admin-button btn-default" target="_blank">' . $csvText . ' <img src="/css/images/common/excel.png" alt="Download" style="vertical-align: top;" height="12"></a>';
                                            }
                                        ?>
                                    </div>
                                </div>
                                <?php
                                    if (count($payment_problems) > 0)
                                    {
                                        echo '<div class="panel panel-transparent"><div class="panel-body"><span class="label label-danger">Payment problems: ' . implode(', ', $payment_problems) . '</span></div></div>';
                                    }
                                ?>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/payments/bookingkeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Bookings" type="text" value="" />
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
                                                case 'assignedAdmin':
                                                case 'room_id':
                                                case 'booking_date_time':
                                                case 'start_date_time':
                                                case 'price':
                                                    echo '7.5';
                                                break;

                                                case 'id':
                                                case 'is_paid':
                                                    echo '2.5';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%"><a href="/' . $country_lang_url . '/administrator/payments/' . ((isset($keyword))?'bookingkeyword/' . $keyword:'bookings/' . $status) . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                            if ($sort_by == $field_name)
                                            {
                                                echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                            }
                                            echo '</a></th>';
                                        }
                                    ?>
                                    <th width="5%">Options</th>
                                    <th width="15%">Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($bookings->object() as $booking)
                                    {
                                ?>
                                        <tr class="text-left">
                                            <td width="2.5%">
                                                <?php echo $booking->get_id();?>
                                                <br />
                                                <a class="zc_reservation_audit pointer" data-id="<?php echo $booking->get_id();?>" data-toggle="modal" data-target="#mainModal" title="Audit">Audit</a>
                                                <br />
                                                <a class="zc_reservation_messages pointer" data-id="<?php echo $booking->get_id();?>" data-toggle="modal" data-target="#mainModal" title="Messages">Messages</a>
                                            </td>
                                            <td width="7.5%">
                                                <?php echo $booking->get_booking_reference();?>
                                                <br />
                                                <?php echo $this->load->view(THEME_FOLDER . '/administrator/payment/snippets/payment_details', ['data' => $booking], true);?>
                                                <a data-id="<?php echo $booking->get_id();?>" class="zc_add_payment">+ Add Payment</a>
                                            </td>
                                            <td width="2.5%">
                                                <?php
                                                    echo $booking->get('is_paid');
                                                    if ($booking->is_true('is_paid'))
                                                    {
                                                ?>
                                                        <br />
                                                        <a class="zc_reservation_payment_audit pointer" data-id="<?php echo $booking->get_id();?>" data-toggle="modal" data-target="#mainModal" title="Audit">Audit</a>
                                                        <?php
                                                    }
                                                        ?>
                                            </td>
                                            <td width="7.5%">
                                                <?php
                                                    echo 'Transaction: <b>' . $booking->wrangle('total_price')->formatted(true) . '</b>';
                                                    if (!$booking->is_null('client_discount') && !$booking->is_null('discount_applied'))
                                                    {
                                                        echo '<br />Member: ' . $booking->get('discount_applied') . '% off';
                                                    }
                                                    echo '<br />- Extra: ' . $booking->wrangle('extra_fee')->formatted(true);
                                                    echo '<br />- Flex: ' . $booking->wrangle('flexible_fee')->formatted(true) . ' ' . (($booking->is_true('flexible_applied') && !$booking->is_null('flexible_fee') && $booking->get('flexible_fee') > 0)?'(Flex)':'(Non-Refund)');
                                                    echo '<br />- P Control: ' . $booking->wrangle('price_control_fee')->formatted(true) . ' ' . (($booking->get('price_control_applied') > 0 && !$booking->is_null('price_control_fee') && $booking->get('price_control_fee') > 0)?'(' . $booking->get('price_control_applied') . '%)':'');
                                                    echo '<br />Venue Price: <b>' . $booking->wrangle('price')->formatted(true) . '</b>';
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    echo '<span class="text-success">' . $booking->wrangle('pay_out')->formatted(true) . '</span><br />Com: ' . $booking->get_commission_rate() . '%';
                                                    if ($booking->get_shownBookingChannels())
                                                    {
                                                        echo '<br />' . $booking->get('booking_channel_desc');
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if ($booking->is_true('room_enabled') && $booking->is_true('venue_enabled'))
                                                    {
                                                        echo '<a href="' . get_room_url($booking) . '" target="_blank">' . $booking->get('room_id') . '</a>';
                                                    }
                                                    else
                                                    {
                                                        echo $booking->get('room_id') . ' (<span class="text-danger">disabled</span>)';
                                                    }
                                                ?>
                                                <br />
                                                <?php echo $booking->get('room_name');?>
                                                <br />
                                                Guests: <?php echo $booking->get('guests');?>
                                                <?php
                                                    if ($booking->is_true('flexible_applied'))
                                                    {
                                                        echo '<br />(Flex offered)';
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <span class="label label-<?php echo $booking->get_status_label_colour()['name'];?>"><?php echo $booking->get('status_name');?></span>
                                                <?php
                                                    if ($booking->is_true('requires_switch'))
                                                    {
                                                        echo '<span class="label label-info"> - Switch</span>';
                                                    }
                                                ?>
                                            </td>
                                            <td width="7.5%"><?php echo $booking->wrangle('booking_date_time')->formatted('admin_full');?></td>
                                            <td width="7.5%">
                                                <?php echo $booking->wrangle('reservation_start_date_time')->formatted('admin_full');?>
                                                <br />
                                                <?php echo $booking->wrangle('reservation_end_date_time')->formatted('admin_full');?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if ($booking->is_true('client_enabled'))
                                                    {
                                                        echo $booking->wrangle('client_name')->formatted() . ' (<a class="show_user_details" data-user-id="' . $booking->get('client_id') . '">' . $booking->get('client_id') . '</a>)';
                                                ?>
                                                        <br />
                                                        <?php echo $booking->wrangle('client_email')->get_email_html() . $booking->wrangle('client_phone')->get_phone_html();?>
                                                        <br />
                                                        <?php
                                                            if ($booking->get('client_role_id') != User::ADMINUSER)
                                                            {
                                                                echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $booking->get('client_id') . '">Adopt</a> · ';
                                                            }
                                                            if (!$booking->is_null('enquiry_id'))
                                                            {
                                                                echo 'Enquiry (<a target="_blank" href="/' . $country_lang_url . '/administrator/enquiries/enquirykeyword/' . $booking->get('enquiry_id') . '">' . $booking->get('enquiry_id') . '</a>) · ';
                                                            }
                                                            if (!$booking->is_null('client_hubspot_id') && $booking->data_not_empty('client_hubspot_id'))
                                                            {
                                                                echo $booking->wrangle('client_add_task')->get_add_task_html();
                                                            }
                                                    }
                                                    else
                                                    {
                                                        echo $booking->wrangle('client_name')->formatted() . ' (' . $booking->get('client_id') . ') (<span class="text-danger">disabled</span>)';
                                                        ?>
                                                        <br />
                                                        <?php echo $booking->wrangle('client_email')->get_email_html() . $booking->wrangle('client_phone')->get_phone_html();?>
                                                        <br />
                                                        <?php
                                                            if (!$booking->is_null('enquiry_id'))
                                                            {
                                                                echo 'Enquiry (<a target="_blank" href="/' . $country_lang_url . '/administrator/enquiries/enquirykeyword/' . $booking->get('enquiry_id') . '">' . $booking->get('enquiry_id') . '</a>) · ';
                                                            }
                                                    }
                                                        ?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if ($booking->is_true('venue_enabled'))
                                                    {
                                                        echo '<a href="' . get_venue_url($booking) . '" target="_blank">' . $booking->get('venue_id') . '</a>';
                                                    }
                                                    else
                                                    {
                                                        echo $booking->get('venue_id') . ' (<span class="text-danger">disabled</span>)';
                                                    }
                                                    if ($booking->is_true('venue_live_bookings'))
                                                    {
                                                        echo '<span class="glyphicon glyphicon-flash live_booking_flash" aria-hidden="true"></span>';
                                                    }
                                                ?>
                                                <br />
                                                <?php echo $booking->get('venue_name') . (($booking->get('venue_name') != $booking->get('company_name'))?' (' . $booking->get('company_name') . ')':'') . ((!$booking->is_null('venue_website') && $booking->data_not_empty('venue_website'))?' · ' . $booking->wrangle('venue_website')->get_website_html():'');?>
                                                <br />
                                                <div class="agree_container">
                                                    <label class="agree_label" for="zc_venue_agree_to_list">Agreed to list</label>
                                                    <input type="checkbox" value="<?php echo $booking->get('venue_id');?>" name="zc_venue_agree_to_list" class="zc_venue_agree_to_list js-switch" data-size="small"
                                                        <?php
                                                            if ($booking->is_true('venue_agree_to_list'))
                                                            {
                                                                echo ' checked';
                                                            }
                                                        ?>
                                                    />
                                                </div>
                                                <?php echo $booking->wrangle('main_contact_name')->formatted() . ' (' . $booking->get('main_user_id') . ')';?>
                                                <br />
                                                <?php echo $booking->wrangle('main_user_email')->get_email_html() . $booking->wrangle('main_user_phone')->get_phone_html();?>
                                                <br />
                                                <?php
                                                    if ($booking->get('main_user_role_id') != User::ADMINUSER)
                                                    {
                                                        echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $booking->get('main_user_id') . '">Adopt</a> · ';
                                                    }
                                                    echo '<a class="contact_details pointer" data-toggle="modal" data-target="#mainModal" id="' . $booking->get('venue_id') . '">Contact Details</a>';
                                                    if (!$booking->is_null('main_user_hubspot_id') && $booking->data_not_empty('main_user_hubspot_id'))
                                                    {
                                                        echo ' · ' . $booking->wrangle('main_user_add_task')->get_add_task_html();
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if (isset($sources))
                                                    {
                                                ?>
                                                        <div class="select select-block">
                                                            <select class="zc_source" zc_object_id="<?php echo $booking->get_id();?>">
                                                                <?php
                                                                    foreach ($sources as $source)
                                                                    {
                                                                        echo '<option value="' . $source . '"';
                                                                        if ($source == $booking->get('source'))
                                                                        {
                                                                            echo ' selected';
                                                                        }
                                                                        echo '>' . $source . '</option>';
                                                                    }
                                                                ?>
                                                            </select>
                                                        </div>
                                                        <?php
                                                    }
                                                        ?>
                                            </td>
                                            <td width="7.5%">
                                                <?php
                                                    if ($admin_users->exists_in_db())
                                                    {
                                                ?>
                                                        <div class="select select-block">
                                                            <select class="zc_assigned_user" zc_object_id="<?php echo $booking->get_id();?>">
                                                                <option value='' selected>Unassigned</option>
                                                                <?php
                                                                    foreach ($admin_users->object() as $admin_user)
                                                                    {
                                                                        echo '<option value="' . $admin_user->get_id() . '"' . (($admin_user->get_id() == $booking->get('assigned_user'))?' selected':'') . '>' . $admin_user->wrangle('full_name')->formatted() . '</option>';
                                                                    }
                                                                ?>
                                                            </select>
                                                        </div>
                                                        <?php
                                                    }
                                                        ?>
                                            </td>
                                            <td width="5%">
                                                <button data-id="<?php echo $booking->get_id();?>" class="zc_view_booking_btn btn btn-default" type="button">Edit</button>
                                                <?php
                                                    if ($booking->can_be_cancelled())
                                                    {
                                                        echo '<br /><br /><a data-id="' . $booking->get_id() . '" class="zc_cancel_booking_btn pointer link-red">Cancel</a>';
                                                    }
//                                                    if (!$booking->is_true('venue_agree_to_list'))
//                                                    {
//                                                        echo '<br /><br /><a data-id="' . $booking->get('venue_id') . '" class="zc_onboard_venue_btn pointer link-red">Onboard Venue!!!</a>';
//                                                    }
                                                ?>
                                            </td>
                                            <td width="15%">
                                                <span class="zc_notes" data-id="<?php echo $booking->get_id();?>"><?php echo $booking->get('zipcube_notes');?></span>
                                                <br />
                                                <a data-id="<?php echo $booking->get_id();?>" class="zc_notes_edit pointer">Edit</a>
                                                <a data-id="<?php echo $booking->get_id();?>" class="zc_notes_save pointer" style="display: none;">Save</a>
                                                <a data-id="<?php echo $booking->get_id();?>" class="zc_notes_cancel pointer" style="display: none;">Cancel</a>
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
