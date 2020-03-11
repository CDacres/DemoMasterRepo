<div class="panel space-4">
    <div class="panel-header active-panel-header"><?php echo $lang->line('Profile');?></div>
    <div class="panel-body">
        <h4><?php echo $lang->line('dashboard_update_profile');?></h4>
        <div class="row space-top-6 space-6">
            <div class="col-md-7">
                <form id="update_profile" class="form-horizontal edit_account_details">
                    <div class="form-group">
                        <div id="firstName" class="col-sm-8">
                            <label for="first_name"><?php echo $lang->line('users_first_name');?><span class="required">*</span></label>
                            <?php echo $user->get_html_data_input('first_name', "zc_user_first_name form-control", 'text', null, false);?>
                        </div>
                    </div>
                    <div class="form-group">
                        <div id="lastName" class="col-sm-8">
                            <label for="last_name"><?php echo $lang->line('users_last_name');?><span class="required">*</span></label>
                            <?php echo $user->get_html_data_input('last_name', "zc_user_last_name form-control", 'text', null, false);?>
                            <p id="Econtact_name" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_names');?></p>
                        </div>
                    </div>
                    <div class="form-group">
                        <div id="email_container" class="col-sm-8">
                            <label for="email"><?php echo $lang->line('users_email');?><span class="required">*</span></label>
                            <?php echo $user->get_html_data_input('email', "zc_user_email_address form-control email-check", 'text', null, false);?>
                            <p id="Econtact_email" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_email');?></p>
                        </div>
                    </div>
                    <div id="email_confirmation_input" class="form-group hide">
                        <div class="col-sm-8">
                            <label for="email_confirmation"><?php echo $lang->line('dashboard_confirm_email');?></label>
                            <input type="text" class="zc_user_email_address_confirmation form-control" id="email_confirmation">
                        </div>
                    </div>
                    <div class="form-group">
                        <div id="phone" class="col-sm-8">
                            <label for="phone_number"><?php echo $lang->line('users_phone_number');?><span class="required">*</span></label>
                            <div class="b-dropdown js-phone-prefix">
                                <?php echo $user->get_html_data_input('phone_number', "zc_user_phone_number form-control", 'tel', 'phone_number');?>
                                <p id="Econtact_phone" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_phone');?></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-5">
                <div class="photo-item empty-photo-frame">
                    <div class="text-center space-top-3">
                        <img id="zc_user_profile_img" height="50" width="50" alt="<?php echo $user->get('first_name');?>" title="<?php echo $user->get('first_name');?>" src="<?php echo $user->wrangle('image')->get_user_url('profile');?>" />
                    </div>
                    <p class="space-top-4 text-center">
                        <input id="zc_upload" class="hide" type="file" name="zc_upload">
                        <button class="btn btn-primary space-top-4 zc_user_photo_upload" type="button">
                            <i class="icon icon-upload"></i>
                            <span class="glyphicon glyphicon-cloud-upload icon-lightgrey"></span> <?php echo $lang->line('dashboard_add_photo');?>
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="panel-footer text-right">
        <span id="success" class="green-font right-m-1 hide"><?php echo $lang->line('dashboard_profile_success');?></span>
        <button id="zc_update_profile_submit" type="submit" class="btn btn-primary"><?php echo $lang->line('dashboard_update_profile_short');?></button>
        <img id="loader" src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>" style="display: none;">
    </div>
</div>
