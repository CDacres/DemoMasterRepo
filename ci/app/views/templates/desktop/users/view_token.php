<div class="container bg-white">
    <div class="checkout-login zc_login_prompt">
        <div class="wrapper">
            <div class="not-loggedin">
                <div class="section-login-msg overflow-hidden">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 bottom-m-2">
                        <div class="login">
                            <h3><?php echo $lang->line('users_set_password_title');?></h3>
                            <span><?php echo $lang->line('users_set_password_info');?></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="checkout-content bottom-p-2">
        <div class="checkout-wrapper">
            <div class="checkout-section client-details top-m-1">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 bottom-m-1">
                    <span class="right-m-1"><?php echo $lang->line('users_email');?>:</span>
                    <span id="user_email"><?php echo $user->get('email');?></span>
                </div>
                <div id="zc_create_account_password_enc" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 bottom-m-1">
                    <label for="zc_create_account_password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                    <input id="zc_create_account_password" type="password" name="password" class="password">
                </div>
                <div id="zc_create_account_password_conf_enc" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 bottom-m-1">
                    <label for="zc_create_account_password_confirmation"><?php echo $lang->line('users_confirm_password');?><span class="required">*</span></label>
                    <input id="zc_create_account_password_confirmation" type="password" name="confirm_password" class="password">
                </div>
                <div id="zc_create_account_button_enc" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 text-right">
                    <input type="button" id="zc_create_account_button" class="btn btn-primary btn-text-bold" value="<?php echo $lang->line('users_set_password');?>">
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 text-right">
                    <div id="confirm_loading" class="pull-right hide"></div>
                </div>
            </div>
        </div>
    </div>
</div>
