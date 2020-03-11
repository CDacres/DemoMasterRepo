<div id="listings-container">
    <div class="suspension-container">
        <div class="panel space-4">
            <?php
                if (isset($venues))
                {
            ?>
                    <div class="panel-header active-panel-header">
                        <div class="row">
                            <div class="col-sm-6 active-panel-padding">
                                <?php
                                    /*
                                <button id="zc_venue_option_btn" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">All venues<span class="caret"></span></button>
                                <ul class="dropdown-menu">
                                    <?php
                                        foreach ($venues->object() as $venue)
                                        {
                                    ?>
                                            <li>
                                                <a href="#" class="zc_venue_user_list" zc_object_id="<?php echo $venue->get_asset_id();?>"><?php echo $venue->get('name');?></a>
                                            </li>
                                            <?php
                                        }
                                            ?>
                                    <li role="separator" class="divider"></li>
                                    <li>
                                        <a href="#" class="zc_venue_user_list">All venues</a>
                                    </li>
                                </ul>
                                    //comment out until we need user asset members by venue.
                                    */
                                ?>
                            </div>
                            <div class="col-sm-6 active-panel-padding text-right">
                                <button id="add_user_member_modal" class="btn btn-success" data-assetid="<?php echo $assetId;?>" type="button"><span class="plus">+</span> <?php echo $lang->line('dashboard_add_user_member');?></button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive panel-body">
                        <?php
                            if ($members->is_null_object() || $members->get_count() == 0)
                            {
                                echo '<div id="member-list" style="display: none;">';
                            }
                        ?>
                        <table class="table panel-body panel-light">
                            <thead>
                                <tr>
                                    <th>
                                        <a class="zc_user_members_ordering pointer" title="<?php echo $lang->line('dashboard_member_name_order');?>" ordering_field="first_name" zc_venue_option="all" zc_current_order="1"><?php echo $lang->line('dashboard_member_name');?></a>
                                    </th>
                                    <th>
                                        <a class="zc_user_members_ordering pointer" title="<?php echo $lang->line('dashboard_member_email_order');?>" ordering_field="email" zc_venue_option="all" zc_current_order="-1"><?php echo $lang->line('users_email');?></a>
                                    </th>
                                    <th>
                                        <a class="zc_user_members_ordering pointer" title="<?php echo $lang->line('dashboard_discount_order');?>" ordering_field="discount" zc_venue_option="all" zc_current_order="-1"><?php echo $lang->line('dashboard_discount');?></a>
                                    </th>
                                </tr>
                            </thead>
                            <tbody id="zc_member_rows"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/members/user_member_update_list', ['members' => $members, 'assetId' => $assetId], true);?></tbody>
                        </table>
                        <?php
                            if ($members->is_null_object() || $members->get_count() == 0)
                            {
                                echo '</div><div id="no-members">' . $lang->line('dashboard_no_members') . '</div>';
                            }
                        ?>
                    </div>
                    <?php
                }
                    ?>
        </div>
    </div>
</div>