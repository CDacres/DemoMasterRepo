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
                                        <h4>Enquiries: <?php echo $num_results . ((!$potential_revenue->is_null('potential_revenue'))?' | Revenue: £' . $potential_revenue->wrangle('potential_revenue')->formatted(true):'');?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                            foreach ($filters as $buttonStatus => $buttonText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/enquiries/index/' . $buttonStatus) . '" class="btn admin-button ' . (($buttonStatus == $status)?'btn-success':'btn-default') . '">' . $buttonText . '</a>';
                                            }
                                            if ($admin_users->exists_in_db())
                                            {
                                                $splitStatus = explode('_', $status);
                                        ?>
                                                <br />
                                                <div class="btn-group">
                                                    <a href="<?php echo site_url($country_lang_url . '/administrator/enquiries/index/' . $this->dx_auth->get_user_id());?>" class="btn admin-button <?php echo ((isset($splitStatus[0]) && is_numeric($splitStatus[0]) && !isset($splitStatus[1]))?'btn-success':'btn-default');?>">My Deals</a>
                                                    <?php
                                                        foreach ($status_urls as $status_btn => $status_btnText)
                                                        {
                                                            echo '<a href="' . site_url($country_lang_url . '/administrator/enquiries/index/' . $user->get_id() . '_' . $status_btn) . '" class="btn admin-button ' . ((isset($splitStatus[1]) && $status_btn == $splitStatus[1])?'btn-success':'btn-default') . '">' . $status_btnText . '</a>';
                                                        }
                                                    ?>
                                                    <div class="btn-group" role="group">
                                                        <a class="btn admin-button btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <?php
                                                                if (isset($assign_dropdown))
                                                                {
                                                                    echo $assign_dropdown;
                                                                }
                                                                else
                                                                {
                                                                    echo 'Select admin';
                                                                }
                                                            ?>
                                                            <span class="caret"></span>
                                                        </a>
                                                        <ul class="dropdown-menu">
                                                            <?php
                                                                echo '<li><a href="' . site_url($country_lang_url . '/administrator/enquiries/index/unassigned') . '">Unassigned</a></li>';
                                                                foreach ($admin_users->object() as $admin_user)
                                                                {
                                                                    foreach ($status_urls as $status_admin => $status_adminText)
                                                                    {
                                                            ?>
                                                                        <li>
                                                                            <a href="<?php echo site_url($country_lang_url . '/administrator/enquiries/index/' . $admin_user->get_id() . '_' . $status_admin);?>"><?php echo ucfirst($admin_user->get('first_name')) . ' - ' . $status_adminText;?></a>
                                                                        </li>
                                                                        <?php
                                                                    }
                                                                }
                                                                        ?>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <?php
                                            }
//                                            foreach ($procs as $procName => $procDetails)
//                                            {
//                                                echo '<button class="btn admin-button ' . ((isset($procDetails['classname']))?$procDetails['classname']:'btn-default') . '" id="' . $procName . '">' . $procDetails['text'] . '</button>';
//                                            }
                                                ?>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/enquiries/enquirykeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Enquiries" type="text" value="" />
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
                                                case 'title':
                                                case 'message':
                                                case 'notes':
                                                    echo '15';
                                                break;

                                                case 'eventDate':
                                                case 'user_id':
                                                case 'created':
                                                case 'options':
                                                case 'quality_score':
                                                    echo '7.5';
                                                break;

                                                case 'id':
                                                    echo '2.5';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%">';
                                            if ($field_name == 'options')
                                            {
                                                echo $field_display;
                                            }
                                            else
                                            {
                                                echo '<a href="/' . $country_lang_url . '/administrator/enquiries/' . ((isset($keyword))?'enquirykeyword/' . $keyword:'index/' . $status) . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                                if ($sort_by == $field_name)
                                                {
                                                    echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                                }
                                                echo '</a>';
                                            }
                                            echo '</th>';
                                        }
                                    ?>
                                    <th width="2.5%">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($enquiries->object() as $enquiry)
                                    {
                                ?>
                                        <tr class="text-left">
                                            <td width="2.5%">
                                                <a class="table_edit_enquiry" data-enquiry-id="<?php echo $enquiry->get_id();?>" data-user-id="<?php echo $enquiry->get('user_id');?>"><?php echo $enquiry->get_id();?></a>
                                                <br />
                                                <a class="zc_enquiry_audit pointer" data-id="<?php echo $enquiry->get_id();?>" data-toggle="modal" data-target="#mainModal" title="Audit">Audit</a>
                                            </td>
                                            <td width="7.5%"><?php echo $enquiry->wrangle('created_date')->formatted('admin_full');?></td>
                                            <td width="7.5%">
                                                <?php
                                                    if (!$enquiry->is_null('eventDate'))
                                                    {
                                                        echo $enquiry->wrangle('event_date')->formatted('admin_full');
                                                    }
                                                    elseif (!$enquiry->is_null('tourDate'))
                                                    {
                                                        echo $enquiry->wrangle('tour_date')->formatted('admin_full');
                                                    }
                                                    if (!$enquiry->is_null('eventTime'))
                                                    {
                                                        echo '<br />' . $enquiry->wrangle('event_time')->formatted('time');
                                                    }
                                                    if (!$enquiry->is_null('duration'))
                                                    {
                                                        echo '<br /><br />' . $enquiry->get('duration_desc');
                                                    }
                                                    if (!$enquiry->is_null('eventDate'))
                                                    {
                                                        echo '<br />' . (($enquiry->is_true('dateFlexible'))?' (Flex)':'');
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php echo ((!$enquiry->is_null('potentialValue'))?'R: £' . format_price($enquiry->get('potentialValue')):'');?>
                                                <br />
                                                <?php echo ((!$enquiry->is_null('budget'))?'B: £' . format_price($enquiry->get('budget')):'');?>
                                            </td>
                                            <td width="7.5%" class="hubspot_data_cell">
                                                <?php
                                                    if ($enquiry->is_true('user_enabled'))
                                                    {
                                                        echo $enquiry->wrangle('full_name')->formatted() . ' (<a class="show_user_details" data-user-id="' . $enquiry->get('user_id') . '">' . $enquiry->get('user_id') . '</a>)';
                                                ?>
                                                        <br />
                                                        <?php echo ((!empty($enquiry->get('tracking_cookie_id')))?'Token ID: ' . $enquiry->get('tracking_cookie_id'):'<span class="danger-text">No Token ID</span>');?>
                                                        <br />
                                                        <?php
                                                            echo $enquiry->wrangle('user_email')->get_email_html() . $enquiry->wrangle('user_phone_number')->get_phone_html();
                                                            if ($enquiry->user_has_second_phone())
                                                            {
                                                                echo '<br />' . $enquiry->wrangle('user_phone')->get_phone_html();
                                                            }
                                                        ?>
                                                        <br />
                                                        <?php
                                                            if ($enquiry->get('user_role_id') != User::ADMINUSER)
                                                            {
                                                                echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $enquiry->get('user_id') . '">Adopt</a> · ';
                                                            }
                                                            if (!$enquiry->is_null('user_hubspot_id') && $enquiry->data_not_empty('user_hubspot_id'))
                                                            {
                                                                echo $enquiry->wrangle('user_add_task')->get_add_task_html();
                                                            }
                                                    }
                                                    else
                                                    {
                                                        echo $enquiry->wrangle('full_name')->formatted() . ' (' . $enquiry->get('user_id') . ') (<span class="text-danger">disabled</span>)';
                                                        ?>
                                                        <br />
                                                        <?php echo ((!empty($enquiry->get('tracking_cookie_id')))?'Token ID: ' . $enquiry->get('tracking_cookie_id'):'<span class="danger-text">No Token ID</span>');?>
                                                        <br />
                                                        <?php
                                                            echo $enquiry->wrangle('user_email')->get_email_html() . $enquiry->wrangle('user_phone_number')->get_phone_html();
                                                            if ($enquiry->user_has_second_phone())
                                                            {
                                                                echo '<br />' . $enquiry->wrangle('user_phone')->get_phone_html();
                                                            }
                                                    }
                                                        ?>
                                            </td>
                                            <td width="15%">
                                                <table width="100%">
                                                    <?php
                                                        if ($enquiry->get('rooms')->get_count() > 0)
                                                        {
                                                            foreach ($enquiry->get('rooms')->object() as $enquiry_room)
                                                            {
                                                    ?>
                                                                <tr>
                                                                    <td width="50%" class="enquiries_table__td">
                                                                        <?php
                                                                            if ($enquiry_room->is_true('room_enabled'))
                                                                            {
                                                                                echo '<a href="' . get_room_url($enquiry_room) . '" target="_blank">' . $enquiry_room->get('room_id') . '</a>';
                                                                            }
                                                                            else
                                                                            {
                                                                                echo $enquiry_room->get('room_id') . ' (<span class="text-danger">disabled</span>)';
                                                                            }
                                                                        ?>
                                                                        <br />
                                                                        <?php echo $enquiry_room->get('title');?>
                                                                        <br />
                                                                        Guests: <?php echo $enquiry->get('guests');?>
                                                                    </td>
                                                                    <td width="50%" class="enquiries_table__td enquiries_table__venue_td">
                                                                        <?php
                                                                            if ($enquiry_room->is_true('venue_enabled'))
                                                                            {
                                                                                echo '<a href="' . get_venue_url($enquiry_room) . '" target="_blank">' . $enquiry_room->get('venue_id') . '</a>';
                                                                            }
                                                                            else
                                                                            {
                                                                                echo $enquiry_room->get('venue_id') . ' (<span class="text-danger">disabled</span>)';
                                                                            }
                                                                            if ($enquiry_room->is_true('venue_live_bookings'))
                                                                            {
                                                                                echo '<span class="glyphicon glyphicon-flash live_booking_flash" aria-hidden="true"></span>';
                                                                            }
                                                                        ?>
                                                                        <br />
                                                                        <?php echo $enquiry_room->get('venue_name') . (($enquiry_room->get('venue_name') != $enquiry_room->get('company_name'))?' (' . $enquiry_room->get('company_name') . ')':'') . ((!$enquiry_room->is_null('venue_website') && $enquiry_room->data_not_empty('venue_website'))?' · ' . $enquiry_room->wrangle('venue_website')->get_website_html():'');?>
                                                                        <br />
                                                                        <div class="agree_container">
                                                                            <label class="agree_label" for="zc_venue_agree_to_list">Agreed to list</label>
                                                                            <input type="checkbox" value="<?php echo $enquiry_room->get('venue_id');?>" name="zc_venue_agree_to_list" class="zc_venue_agree_to_list js-switch" data-size="small"
                                                                                <?php
                                                                                    if ($enquiry_room->is_true('venue_agree_to_list'))
                                                                                    {
                                                                                        echo ' checked';
                                                                                    }
                                                                                ?>
                                                                            />
                                                                        </div>
                                                                        <?php echo $enquiry_room->wrangle('main_contact_name')->formatted() . ' (' . $enquiry_room->get('main_user_id') . ')';?>
                                                                        <br />
                                                                        <?php echo $enquiry_room->wrangle('main_user_email')->get_email_html() . $enquiry_room->wrangle('main_user_phone')->get_phone_html();?>
                                                                        <br />
                                                                        <?php
                                                                            if ($enquiry_room->get('main_user_role_id') != User::ADMINUSER)
                                                                            {
                                                                                echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $enquiry_room->get('main_user_id') . '">Adopt</a> · ';
                                                                            }
                                                                            echo '<a class="contact_details pointer" data-toggle="modal" data-target="#mainModal" id="' . $enquiry_room->get('venue_id') . '">Contact Details</a>';
                                                                            if (!$enquiry_room->is_null('main_user_hubspot_id') && $enquiry_room->data_not_empty('main_user_hubspot_id'))
                                                                            {
                                                                                echo ' · ' . $enquiry_room->wrangle('main_user_add_task')->get_add_task_html();
                                                                            }
                                                                        ?>
                                                                    </td>
                                                                </tr>
                                                                <?php
                                                            }
                                                        }
                                                    ?>
                                                </table>
                                            </td>
                                            <td width="15%">
                                                <div class="message_container"><?php echo $enquiry->get('message');?></div>
                                            </td>
                                            <td width="7.5%">
                                                <div class="select select-block">
                                                    <select class="zc_enq_quality_score" data-enquiry-id="<?php echo $enquiry->get_id();?>">
                                                        <?php
                                                            if ($enquiry->get('quality_score') == 0)
                                                            {
                                                                echo '<option value="0" selected />';
                                                            }
                                                            for ($qs = 1; $qs < 30; $qs++)
                                                            {
                                                                echo '<option value="' . $qs . '"';
                                                                if ($qs == $enquiry->get('quality_score'))
                                                                {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $qs . '</option>';
                                                            }
                                                        ?>
                                                    </select>
                                                </div>
                                            </td>
                                            <td width="15%">
                                                <span class="zc_enq_notes" data-id="<?php echo $enquiry->get_id();?>"><?php echo $enquiry->get('notes');?></span>
                                                <br />
                                                <a data-id="<?php echo $enquiry->get_id();?>" class="zc_enq_notes_edit pointer">Edit</a>
                                                <a data-id="<?php echo $enquiry->get_id();?>" class="zc_enq_notes_save pointer" style="display: none;">Save</a>
                                                <a data-id="<?php echo $enquiry->get_id();?>" class="zc_enq_notes_cancel pointer" style="display: none;">Cancel</a>
                                            </td>
                                            <td width="7.5%">
                                                <?php
                                                    if ($enquiry_statuses->exists_in_db())
                                                    {
                                                ?>
                                                        <div class="select select-block">
                                                            <select class="zc_enq_status" data-enquiry-id="<?php echo $enquiry->get_id();?>">
                                                                <?php
                                                                    foreach ($enquiry_statuses->object() as $enqStatus)
                                                                    {
                                                                        echo '<option value="' . $enqStatus->get_id() . '"';
                                                                        if ($enqStatus->get_id() == $enquiry->get('status'))
                                                                        {
                                                                            echo ' selected';
                                                                        }
                                                                        echo '>' . $enqStatus->get('name') . '</option>';
                                                                    }
                                                                ?>
                                                            </select>
                                                        </div>
                                                        <?php
                                                    }
                                                    $showRes = false;
                                                    $showLoss = false;
                                                    if (!$enquiry->is_null('reservation_id'))
                                                    {
                                                        $showRes = true;
                                                    }
                                                    elseif (!$enquiry->is_null('lost_notes'))
                                                    {
                                                        $showLoss = true;
                                                    }
                                                ?>
                                                <br />
                                                <label for="reservation_<?php echo $enquiry->get_id();?>" id="reservation_label_<?php echo $enquiry->get_id();?>"<?php echo ((!$showRes)?' style="display:none;"':'');?>>Booking ID</label>
                                                <div id="reservation_<?php echo $enquiry->get_id();?>"<?php echo ((!$showRes)?' style="display:none;"':'');?>><?php echo $enquiry->get_html_data_input('reservation_id', 'zc_reservation_id form-control', 'text', 'reservation_id_' . $enquiry->get_id());?></div>
                                                <label for="loss_<?php echo $enquiry->get_id();?>" id="loss_label_<?php echo $enquiry->get_id();?>"<?php echo ((!$showLoss)?'style="display:none;"':'');?>>Loss Notes</label>
                                                <div id="loss_<?php echo $enquiry->get_id();?>"<?php echo ((!$showLoss)?' style="display:none;"':'');?>><?php echo $enquiry->get_html_data_textarea('lost_notes', 'zc_lost_notes form-control', 'lost_notes_' . $enquiry->get_id());?></div>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if (isset($sources))
                                                    {
                                                ?>
                                                        <div class="select select-block">
                                                            <select class="zc_enq_source" data-enquiry-id="<?php echo $enquiry->get_id();?>">
                                                                <?php
                                                                    foreach ($sources as $source)
                                                                    {
                                                                        echo '<option value="' . $source . '"';
                                                                        if ($source == $enquiry->get('source'))
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
                                            <td width="5%">
                                                <?php
                                                    if ($admin_users->exists_in_db())
                                                    {
                                                ?>
                                                        <div class="select select-block">
                                                            <select class="enquiry_assigned_admin" data-enquiry-id="<?php echo $enquiry->get_id();?>">
                                                                <option value='' selected>Unassigned</option>
                                                                <?php
                                                                    foreach ($admin_users->object() as $admin_user)
                                                                    {
                                                                        echo '<option value="' . $admin_user->get_id() . '"' . (($admin_user->get_id() == $enquiry->get('assignedAdmin'))?' selected':'') . '>' . $admin_user->wrangle('full_name')->formatted() . '</option>';
                                                                    }
                                                                ?>
                                                            </select>
                                                        </div>
                                                        <?php
                                                    }
                                                        ?>
                                            </td>
                                            <td width="2.5%" class="text-right">
                                                <button class="table_edit_enquiry btn btn-default bottom-m-1" data-user-id="<?php echo $enquiry->get('user_id');?>" data-enquiry-id="<?php echo $enquiry->get_id();?>">Edit</button>
                                                <br />
                                                <a class="resend_enquiry_email" data-enquiry-id="<?php echo $enquiry->get_id();?>">Resend Enquiry</a>
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