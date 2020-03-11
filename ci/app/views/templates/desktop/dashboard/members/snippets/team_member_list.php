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
                                <button id="zc_venue_option_btn" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><?php echo $lang->line('dashboard_venues_all');?><span class="caret"></span></button>
                                <ul class="dropdown-menu">
                                    <?php
                                        foreach ($venues->object() as $venue)
                                        {
                                    ?>
                                            <li>
                                                <a href="#" class="zc_venue_team_list" filter_type="<?php echo $venue->get('name');?>" zc_object_id="<?php echo $venue->get_asset_id();?>"><?php echo $venue->get('name');?></a>
                                            </li>
                                            <?php
                                        }
                                            ?>
                                    <li role="separator" class="divider"></li>
                                    <li>
                                        <a href="#" class="zc_venue_team_list" filter_type="all"><?php echo $lang->line('dashboard_venues_all');?></a>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-sm-6 active-panel-padding text-right">
                                <button id="add_team_member_modal" class="btn btn-success" data-assetid="<?php echo $assetId;?>" type="button"><span class="plus">+</span> <?php echo $lang->line('dashboard_add_team_member');?></button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive panel-body">
                        <?php
                            if (!$members->is_null_object() && $members->get_count() > 0)
                            {
                        ?>
                                <table class="table panel-body panel-light">
                                    <thead>
                                        <tr>
                                            <th>
                                                <a class="zc_team_members_ordering pointer" title="<?php echo $lang->line('dashboard_member_name_order');?>" ordering_field="first_name" zc_venue_type="option" zc_venue_option="all" zc_current_order="1"><?php echo $lang->line('dashboard_member_name');?></a>
                                            </th>
                                            <th>
                                                <a class="zc_team_members_ordering pointer" title="<?php echo $lang->line('dashboard_member_email_order');?>" ordering_field="email" zc_venue_type="option" zc_venue_option="all" zc_current_order="-1"><?php echo $lang->line('users_email');?></a>
                                            </th>
                                            <th><?php echo $lang->line('dashboard_member_role');?></th>
                                            <th><?php echo $lang->line('dashboard_member_option');?></th>
                                        </tr>
                                    </thead>
                                    <tbody id="zc_member_rows"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/members/team_member_update_list', ['members' => $members, 'assetId' => $assetId], true);?></tbody>
                                </table>
                                <?php
                            }
                            else
                            {
                                echo $lang->line('dashboard_no_members');
                            }
                                ?>
                    </div>
                    <?php
                }
                    ?>
        </div>
    </div>
</div>