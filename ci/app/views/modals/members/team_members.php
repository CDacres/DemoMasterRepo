<form>
    <div class="row">
        <div class="col-md-12">
            <h5 id="title"><?php echo $lang->line('modals_member_user_details');?></h5>
        </div>
    </div>
    <div class="form-group space-top-2 bottom-p-1 separator-dotted">
        <div class="row">
            <div id="firstName" class="col-sm-6">
                <label for="zc_first_name"><?php echo $lang->line('users_first_name');?><span class="required">*</span></label>
                <?php echo $member->get_html_data_input('first_name', 'form-control', 'text', 'zc_first_name', false, ['autocomplete' => 'off']);?>
                <p id="Econtact_first_name" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_first_name');?></p>
            </div>
            <div id="lastName" class="col-sm-6">
                <label for="zc_last_name"><?php echo $lang->line('users_last_name');?><span class="required">*</span></label>
                <?php echo $member->get_html_data_input('last_name', 'form-control', 'text', 'zc_last_name', false, ['autocomplete' => 'off']);?>
                <p id="Econtact_last_name" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_last_name');?></p>
            </div>
        </div>
        <div class="row space-top-2">
            <div id="email" class="col-sm-6">
                <label for="zc_email_address"><?php echo $lang->line('users_email');?><span class="required">*</span></label>
                <?php echo $member->get_html_data_input('email', 'form-control email-check', 'email', 'zc_email_address', false, ['autocomplete' => 'off']);?>
                <p id="Econtact_email" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_email');?></p>
            </div>
            <div id="phone" class="col-sm-6">
                <div class="form_input_row-phone-prefix">
                    <div class="b-dropdown js-phone-prefix">
                        <label for="zc_user_phone_number"><?php echo $lang->line('users_phone_number');?></label>
                        <?php echo $member->get_html_data_input('phone_number', 'form-control zc_user_phone_number', 'tel', 'zc_user_phone_number', false, ['autocomplete' => 'off']);?>
                    </div>
                    <p id="Econtact_phone" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_phone');?></p>
                </div>
            </div>
        </div>
    </div>
    <?php
        if ($current_user_id != $member->get('id'))
        {
    ?>
            <div class="row">
                <div class="col-md-12">
                    <h5 id="title"><?php echo $lang->line('users_password');?><span class="required">*</span></h5>
                </div>
            </div>
            <div class="form-group space-top-2 bottom-p-1 separator-dotted">
                <?php
                    if (!$member->is_null('id'))
                    {
                ?>
                        <span class="btn btn-default btn-sm" id="reset_pass_btn"><?php echo $lang->line('users_reset_password');?></span>
                        <div id="reset_pass">
                            <div class="radio space-top-2">
                                <label for="generatepass">
                                    <input class="pass_select" type="radio" name="password_radio" id="generatepass" value="generate" /> <?php echo $lang->line('users_auto_password');?>
                                </label>
                            </div>
                            <div class="radio">
                                <label for="usermadepass">
                                    <input class="pass_select" type="radio" name="password_radio" id="usermadepass" value="usermade" /> <?php echo $lang->line('users_create_password');?>
                                </label>
                            </div>
                            <div id="password_fields" class="row space-top-2 dropdown">
                                <div id="password" class="col-sm-6">
                                    <label for="zc_user_password"><?php echo $lang->line('users_password');?></label>
                                    <input id="zc_user_password" type="password" name="password">
                                </div>
                                <div id="passwordconfirm" class="col-sm-6">
                                    <label for="zc_user_password_confirmation"><?php echo $lang->line('users_confirm_password');?></label>
                                    <input id="zc_user_password_confirmation" type="password" name="confirm_password">
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                    else
                    {
                        ?>
                        <div class="radio">
                            <label for="generatepass">
                                <input class="pass_select" type="radio" name="password_radio" id="generatepass" value="generate" /> <?php echo $lang->line('users_auto_password');?>
                            </label>
                        </div>
                        <div class="radio">
                            <label for="usermadepass">
                                <input class="pass_select" type="radio" name="password_radio" id="usermadepass" value="usermade" /> <?php echo $lang->line('users_create_password');?>
                            </label>
                        </div>
                        <div id="password_fields" class="row space-top-2 dropdown">
                            <div id="password" class="col-sm-6">
                                <label for="zc_user_password"><?php echo $lang->line('users_password');?></label>
                                <input id="zc_user_password" type="password" name="password">
                            </div>
                            <div id="passwordconfirm" class="col-sm-6">
                                <label for="zc_user_password_confirmation"><?php echo $lang->line('users_confirm_password');?></label>
                                <input id="zc_user_password_confirmation" type="password" name="confirm_password">
                            </div>
                        </div>
                        <?php
                    }
                        ?>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <h5 id="title"><?php echo $lang->line('modals_team_member_auth');?><span class="required">*</span></h5>
                </div>
            </div>
            <div class="form-group space-top-2 bottom-p-1 separator-dotted">
                <div class="radio">
                    <label for="companyadmin">
                        <input class="auth_select pointer" type="radio" name="adminlevels" id="companyadmin" value="company"
                            <?php
                                if (!$member_company->is_null_object() && $member_company->exists_in_db())
                                {
                                    echo ' checked';
                                }
                            ?>
                        />
                        <strong><?php echo $lang->line('dashboard_company_admin');?></strong> - <?php echo $lang->line('modals_team_company_admin_text');?>
                    </label>
                </div>
                <div class="radio">
                    <label for="venueadmin">
                        <input class="auth_select pointer" type="radio" name="adminlevels" id="venueadmin" value="venue"
                            <?php
                                if (!$member_company->is_null_object() && !$member_company->exists_in_db())
                                {
                                    echo ' checked';
                                }
                            ?>
                        />
                        <strong><?php echo $lang->line('dashboard_venue_admin');?></strong> - <?php echo $lang->line('modals_team_venue_admin_text');?>
                    </label>
                </div>
                <div id="venue_options" class="row space-top-2 dropdown">
                    <?php
                        foreach ($venues->object() as $venue)
                        {
                    ?>
                            <div class="col-md-3 checkbox-input">
                                <label class="big-checkbox big-label-checkbox text-truncate text-muted pointer" title="<?php echo $venue->get('name');?>">
                                    <input type="checkbox" value="<?php echo $venue->get_id();?>" name="venues[]" class="pull-left zc_venue_check pointer"
                                        <?php
                                            if (!$member_venues->is_null_object() && in_array($venue->get_id(), $member_venues->get_ids()))
                                            {
                                                echo ' checked';
                                            }
                                        ?>
                                    /><?php echo $venue->wrangle('defaulted_name_length_limited')->limited(16);?>
                                </label>
                            </div>
                            <?php
                        }
                            ?>
                    <div class="col-md-10">
                        <a href="/<?php echo $country_lang_url;?>/venues/new"><?php echo $lang->line('modals_team_not_listed_venue');?></a>
                    </div>
                </div>
            </div>
            <?php
        }
        else
        {
            ?>
            <div class="row">
                <div class="col-md-12">
                    <h5 id="title"><?php echo $lang->line('users_password');?></h5>
                </div>
            </div>
            <div class="form-group space-top-2 bottom-p-1 separator-dotted">
                <span class="btn btn-default btn-sm" id="change_pass_btn"><?php echo $lang->line('dashboard_change_password');?></span>
                <div id="change_pass">
                    <div class="row">
                        <div id="password" class="col-sm-6 space-top-2">
                            <label for="zc_old_password"><?php echo $lang->line('dashboard_old_password');?><span class="required">*</span></label>
                            <input id="zc_old_password" type="password" name="password">
                        </div>
                    </div>
                    <div class="row space-top-2">
                        <div id="password" class="col-sm-6">
                            <label for="zc_user_password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                            <input id="zc_user_password" type="password" name="password">
                        </div>
                    </div>
                    <div class="row space-top-2">
                        <div id="passwordconfirm" class="col-sm-6">
                            <label for="zc_user_password_confirmation"><?php echo $lang->line('users_confirm_password');?><span class="required">*</span></label>
                            <input id="zc_user_password_confirmation" type="password" name="confirm_password">
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }
            ?>
</form>