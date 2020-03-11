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
                                        <h4>Venues: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                            foreach ($filters as $buttonStatus => $buttonText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/members/venues/' . $buttonStatus) . '" class="btn admin-button ' . (($buttonStatus == $status)?'btn-success':'btn-default') . '">' . $buttonText . '</a>';
                                            }
                                            if ($admin_users->exists_in_db())
                                            {
                                                $splitStatus = explode('_', $status);
                                        ?>
                                                <br />
                                                <div class="btn-group">
                                                    <a href="<?php echo site_url($country_lang_url . '/administrator/members/venues/' . $this->dx_auth->get_user_id());?>" class="btn admin-button <?php echo ((isset($splitStatus[0]) && is_numeric($splitStatus[0]) && !isset($splitStatus[1]))?'btn-success':'btn-default');?>">My Deals</a>
                                                    <?php
                                                        foreach ($source_stage_filters as $stage_btn => $stage_btnText)
                                                        {
                                                            echo '<a href="' . site_url($country_lang_url . '/administrator/members/venues/' . $user->get_id() . '_' . $stage_btn) . '" class="btn admin-button ' . ((isset($splitStatus[1]) && $stage_btn == $splitStatus[1])?'btn-success':'btn-default') . '">' . $stage_btnText . '</a>';
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
                                                                echo '<li><a href="' . site_url($country_lang_url . '/administrator/members/venues/unassigned') . '">Unassigned</a></li>';
                                                                foreach ($admin_users->object() as $admin_user)
                                                                {
                                                                    foreach ($source_stage_filters as $stage_admin => $stage_adminText)
                                                                    {
                                                            ?>
                                                                        <li>
                                                                            <a href="<?php echo site_url($country_lang_url . '/administrator/members/venues/' . $admin_user->get_id() . '_' . $stage_admin);?>"><?php echo ucfirst($admin_user->get('first_name')) . ' - ' . $stage_adminText;?></a>
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
                                                ?>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
	            		<form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/members/venuekeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Venues" type="text" value="" />
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
                                                case 'notes':
                                                    echo '15';
                                                break;

                                                case 'status':
                                                    echo '8';
                                                break;

                                                case 'address':
                                                case 'name':
                                                case 'created':
                                                    echo '7.5';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%">';
                                            if ($field_name == 'contacts' || $field_name == 'finance' || $field_name == 'status')
                                            {
                                                echo $field_display;
                                            }
                                            else
                                            {
                                                echo '<a href="/' . $country_lang_url . '/administrator/members/' . ((isset($keyword))?'venuekeyword/' . $keyword:'venues/' . $status) . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                                if ($sort_by == $field_name)
                                                {
                                                    echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                                }
                                                echo '</a>';
                                            }
                                            echo '</th>';
                                        }
                                    ?>
                                    <th width="5%">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($venues->object() as $venue)
                                    {
                                ?>
                                        <tr class="text-left">
                                            <td width="5%">
                                                <a href="<?php echo get_venue_url($venue);?>" target="_blank" title="View venue"><?php echo $venue->get_id();?></a>
                                            </td>
                                            <td width="7.5%"><?php echo $venue->wrangle('created_date')->formatted('admin_full');?></td>
                                            <td width="7.5%"><?php echo $venue->wrangle('defaulted_name')->value() . ((!$venue->is_null('website') && $venue->data_not_empty('website'))?' · ' . $venue->wrangle('website')->get_website_html():'');?></td>
                                            <td width="7.5%">
                                                <?php echo '<b>' . $venue->get('country_code') . '</b> > <b>' . $venue->get('city') . '</b>';?>
                                                <br />
                                                <?php
                                                    echo $venue->get_html_data_text('address');
                                                    if ($venue->is_null('city') || $venue->is_null('country') || $venue->is_null('town'))
                                                    {
                                                        echo '<br /><label for="zc_venue_city">City</label>' . $venue->get_html_data_input('city', 'form-control zc_venue_city', 'text', 'zc_venue_city_' . $venue->get_id(), false, ['zc_venue_token' => $venue->get('token')]) . '<label for="zc_venue_town">Town</label>' . $venue->get_html_data_input('town', 'form-control zc_venue_town', 'text', 'zc_venue_town_' . $venue->get_id(), false, ['zc_venue_token' => $venue->get('token')]) . '<label for="zc_venue_country">Country</label>' . $venue->get_html_data_input('country', 'form-control zc_venue_country', 'text', 'zc_venue_country_' . $venue->get_id(), false, ['zc_venue_token' => $venue->get('token')]);
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php echo $venue->wrangle('main_contact_name')->formatted() . ' (' . $venue->get('main_contact') . ')';?>
                                                <br />
                                                <?php echo $venue->wrangle('main_user_email')->get_email_html() . $venue->wrangle('main_user_phone')->get_phone_html();?>
                                                <br />
                                                <?php
                                                    if ($venue->get('main_user_role_id') != User::ADMINUSER)
                                                    {
                                                        echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $venue->get('main_contact') . '">Adopt</a> · ';
                                                    }
                                                    echo '<a class="contact_details pointer" data-toggle="modal" data-target="#mainModal" id="' . $venue->get_id() . '">Contact Details</a>';
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if ($venue->is_true('sponsored'))
                                                    {
                                                        echo '<div class="venue-box venue-sponsor-box">Sponsored</div><br /><a class="zc_venue_sponsor_btn pointer" data-toggle="modal" data-target="#mainModal" data-id="' . $venue->get_id() . '">Edit</a>';
                                                    }
                                                    else
                                                    {
                                                        echo '<a class="zc_venue_sponsor_btn pointer" data-toggle="modal" data-target="#mainModal" data-id="' . $venue->get_id() . '">Add Sponsored</a>';
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%"><?php echo $venue->get('source');?></td>
                                            <td width="5%">
                                                <b>Comm (%): <?php echo $venue->get('commission_percent_frontend');?></b>
                                                <br />
                                                Vat (%): <?php echo $venue->get('vat_rate');?>
                                            </td>
                                            <td width="5%">
                                                <input type="checkbox" value="<?php echo $venue->get_id();?>" name="zc_venue_agree_to_list" class="zc_venue_agree_to_list js-switch"
                                                    <?php
                                                        if ($venue->is_true('agree_to_list'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="5%">
                                                <input type="checkbox" value="<?php echo $venue->get_id();?>" name="zc_venue_live_bookings" class="zc_venue_live_bookings js-switch"
                                                    <?php
                                                        if ($venue->is_true('uses_live_bookings'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="8%">
                                                <?php
                                                    if ($venue->is_approved())
                                                    {
                                                        echo '<a href="' . get_venue_url($venue) . '" target="_blank" title="View venue"><span class="label label-success">Live';
                                                    }
                                                    else
                                                    {
                                                        echo '<a href="' . get_venue_url($venue, true) . '" target="_blank" title="Edit listing"><span class="label label-warning">';
                                                        $venue_steps = $venue->get_uncompleted_stages();
                                                        if ($venue_steps['todo'] > 0)
                                                        {
                                                            echo $venue_steps['todo'] . ' step' . (($venue_steps['todo'] > 1)?'s':'') . ' to go (' . $venue_steps['stages'] . ')';
                                                        }
                                                        else
                                                        {
                                                            echo 'Pending for approval';
                                                        }
                                                    }
                                                    echo '</span></a>';
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if ($venue->is_approved())
                                                    {
                                                        echo '<div class="venue-box venue-approve-box">Approved</div><br /><a class="zc_venue_approve_btn pointer" data-toggle="modal" data-target="#mainModal" data-id="' . $venue->get_id() . '">Edit</a>';
                                                    }
                                                    else
                                                    {
                                                        echo '<a class="zc_venue_approve_btn pointer" data-toggle="modal" data-target="#mainModal" data-id="' . $venue->get_id() . '">Add Approved</a>';
                                                    }
                                                ?>
                                            </td>
                                            <td width="15%">
                                                <span class="zc_venue_notes" data-id="<?php echo $venue->get_id();?>"><?php echo $venue->get('notes');?></span>
                                                <br />
                                                <a data-id="<?php echo $venue->get_id();?>" class="zc_venue_notes_edit pointer">Edit</a>
                                                <a data-id="<?php echo $venue->get_id();?>" class="zc_venue_notes_save pointer" style="display: none;">Save</a>
                                                <a data-id="<?php echo $venue->get_id();?>" class="zc_venue_notes_cancel pointer" style="display: none;">Cancel</a>
                                            </td>
                                            <td width="5%">
                                                <?php
                                                    if (isset($stages))
                                                    {
                                                ?>
                                                        <div class="select select-block">
                                                            <select class="zc_venue_stage" zc_object_id="<?php echo $venue->get_id();?>">
                                                                <?php
                                                                    foreach ($stages as $stage)
                                                                    {
                                                                        echo '<option value="' . $stage . '"';
                                                                        if ($stage == $venue->get('stage'))
                                                                        {
                                                                            echo ' selected';
                                                                        }
                                                                        echo '>' . $stage . '</option>';
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
                                                            <select class="zc_venue_assigned_admin" zc_object_id="<?php echo $venue->get_id();?>">
                                                                <option value='' selected>Unassigned</option>
                                                                <?php
                                                                    foreach ($admin_users->object() as $admin_user)
                                                                    {
                                                                        echo '<option value="' . $admin_user->get_id() . '"' . (($admin_user->get_id() == $venue->get('assignedAdmin'))?' selected':'') . '>' . $admin_user->wrangle('full_name')->formatted() . '</option>';
                                                                    }
                                                                ?>
                                                            </select>
                                                        </div>
                                                        <?php
                                                    }
                                                        ?>
                                            </td>
                                            <td width="5%">
                                                <a href="<?php echo get_venue_url($venue, true);?>" target="_blank" class="btn btn-default bottom-m-1">Edit listing</a>
                                                <br />
                                                <a data-id="<?php echo $venue->get_id();?>" class="zc_edit_venue_btn">Advanced</a>
                                                <br />
                                                <a data-id="<?php echo $venue->get_id();?>" class="zc_delete_venue_btn link-red">Delete</a>
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