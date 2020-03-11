<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-3 space-sm-3 leftnav"><?php echo $leftNav->display_family();?></div>
        <div class="col-md-9 space-4">
            <?php
                if ($reserved_asset_user && $venues->get_count() > 0)
                {
            ?>
                    <div class="row">
                        <div id="flash_instruction_container" class="col-sm-12 text-right">
                            <div id="flash_instruction" style="display: none;"><?php echo $lang->line('dashboard_reviews_boost');?></div>
                            <img id="instruction_arrow" style="display: none;" src="/css/images/arrow-green.png" width="75px" alt="<?php echo $lang->line('dashboard_write_review');?>" title="<?php echo $lang->line('dashboard_write_review');?>"/>
                        </div>
                    </div>
                    <?php
                }
                    ?>
            <div id="sent-list" class="listings-container sent-invitations">
                <div class="suspension-container">
                    <div class="panel space-4">
                        <div class="panel-header active-panel-header">
                            <div class="row">
                                <div class="col-sm-6 active-panel-padding">
                                    <?php
                                        if ($venues->get_count() == 0)
                                        {
                                            echo '<span>' . $lang->line('dashboard_sent_invitations') . '</span>';
                                        }
                                        else
                                        {
                                            echo '<span class="table_title">' . $lang->line('dashboard_sent_invitations') . '</span>';
                                        }
                                    ?>
                                </div>
                                <?php
                                    if ($venues->get_count() > 0)
                                    {
                                ?>
                                        <div class="col-sm-6 active-panel-padding text-right">
                                            <button class="btn btn-success add_reviewer" data-toggle="tooltip" data-placement="bottom" title="<?php echo $lang->line('dashboard_invite_title');?>" type="button"><span class="plus">+</span> <?php echo $lang->line('dashboard_invite');?></button>
                                        </div>
                                        <?php
                                    }
                                        ?>
                            </div>
                        </div>
                        <div class="table-responsive panel-body">
                            <?php
                                if ($venues->get_count() > 0)
                                {
                            ?>
                                    <table class="table panel-body panel-light">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <a class="zc_review_ordering pointer" title="<?php echo $lang->line('dashboard_member_name_order');?>" ordering_field="first_name" zc_current_order="-1"><?php echo $lang->line('users_first_name');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_review_ordering pointer" title="<?php echo $lang->line('dashboard_member_email_order');?>" ordering_field="email" zc_current_order="-1"><?php echo $lang->line('users_email');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_review_ordering pointer" title="<?php echo $lang->line('dashboard_venue_name_order');?>" ordering_field="venue_name" zc_current_order="-1"><?php echo $lang->line('dashboard_venue_name');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_review_ordering pointer" title="<?php echo $lang->line('dashboard_sent_date_order');?>" ordering_field="created" zc_current_order="-1"><?php echo $lang->line('dashboard_sent_date');?></a>
                                                </th>
                                                <th>
                                                    <a class="zc_review_ordering pointer" title="<?php echo $lang->line('dashboard_table_order_status');?>" ordering_field="review_token" zc_current_order="-1"><?php echo $lang->line('dashboard_table_status');?></a>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id="zc_sent_rows"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/reviews/sent_update_list', ['review_audits' => $review_audits], true);?></tbody>
                                    </table>
                                    <?php
                                }
                                else
                                {
                                    echo '<span class="venue-css">' . $lang->line('dashboard_no_approved_venues') . '</span>';
                                }
                                    ?>
                        </div>
                    </div>
                </div>
            </div>
            <?php
                if ($venues->get_count() > 0)
                {
            ?>
                    <div class="listings-container
                        <?php
                            if (!$review_audits->exists_in_db())
                            {
                                echo ' sent-invitations';
                            }
                        ?>
                    ">
                        <div class="suspension-container">
                            <div class="panel space-4">
                                <div class="panel-header active-panel-header">
                                    <div class="row">
                                        <div class="col-sm-6 active-panel-padding">
                                            <span class="table_title"><?php echo $lang->line('dashboard_send_bulk');?></span>
                                        </div>
                                        <div class="col-sm-6 active-panel-padding text-right">
                                            <button class="btn btn-success add_reviewer" data-toggle="tooltip" data-placement="bottom" title="<?php echo $lang->line('dashboard_invite_title');?>" type="button"><span class="plus">+</span> <?php echo $lang->line('dashboard_invite');?></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-sm-12 venue-css">
                                            <div id="zc_review_list" class="panel-list list-unstyled list-layout">
                                                <p><?php echo $lang->line('dashboard_name_address');?></p>
                                                <textarea id="user_info" class="bottom-m-1" placeholder="e.g. Paul, paul@gmail.com, Jerry, jerry@gmail.com"></textarea>
                                                <p id="Edetails" class="Credit_Error" style="display: none;"><?php echo $lang->line('dashboard_name_error');?></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row bottom-m-1">
                                        <div class="col-sm-4">
                                            <div class="select select-block">
                                                <select id="venue_select" class="dropdown-toggle zc_value_input">
                                                    <?php
                                                        if ($venues->get_count() == 1)
                                                        {
                                                            $f_venue = $venues->get_first();
                                                            echo '<option value="' . $f_venue->get_asset_id() . '" selected>' . $f_venue->get('name') . '</option>';
                                                        }
                                                        else
                                                        {
                                                    ?>
                                                            <option value='-1' disabled selected style='display:none;'><?php echo $lang->line('dashboard_select_venue');?></option>
                                                            <?php
                                                                foreach ($venues->object() as $venue)
                                                                {
                                                                    echo '<option value="' . $venue->get_asset_id() . '">' . $venue->get('name') . '</option>';
                                                                }
                                                        }
                                                            ?>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-sm-8">
                                            <span class="site-question" data-toggle="tooltip" data-placement="top" title="<?php echo $lang->line('dashboard_review_venue');?>">?</span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12">
                                            <button id="request_reviews" class="btn btn-success" style="display: none;" type="button"><?php echo $lang->line('dashboard_request_review');?></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                    ?>
        </div>
    </div>
</div>