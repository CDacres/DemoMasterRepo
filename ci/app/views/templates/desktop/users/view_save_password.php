<?php
    if (!$reserved_widget_mode)
    {
?>
        <div id="header">
            <div class="wrapper">
                <div class="logo-wrapper col-md-6 col-sm-6 col-xs-12">
                    <a href="/<?php echo $country_lang_url;?>" class="logo">
                        <img src="/css/images/logo/zipcube-logo-black.svg" alt="Zipcube" title="Zipcube">
                    </a>
                </div>
                <div class="contact col-md-6 col-sm-6 col-xs-12">
                    <div class="title"><?php echo $lang->line('common_help_call_us');?></div>
                    <div class="phone"><?php echo $phone_number_display;?></div>
                </div>
            </div>
        </div>
        <?php
    }
        ?>
<div class="container-fluid bg-white">
    <div class="checkout-login zc_login_prompt">
        <div class="wrapper">
            <div class="not-loggedin">
                <div class="section-login-msg overflow-hidden">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 p-0 bottom-m-2">
                        <div class="login">
                            <h3><?php echo $lang->line('users_save_password_heading', ucfirst($reservation->get('client_first_name')));?></h3>
                            <span><?php echo $lang->line('users_save_password_subheading');?></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="checkout-content bottom-p-2">
        <div class="checkout-wrapper">
            <div id="fixed-footer"></div>
            <div class="checkout-section client-details top-m-1">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 bottom-m-1">
                    <span class="right-m-1"><?php echo $lang->line('users_email');?>:</span>
                    <span><?php echo $reservation->get('client_email');?></span>
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 bottom-m-1">
                    <label for="zc_create_account_password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                    <input id="zc_create_account_password" type="password" name="password" class="password">
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 bottom-m-1">
                    <div id="confirm_loading" class="pull-right hide"></div>
                    <label for="zc_create_account_password_confirmation"><?php echo $lang->line('users_confirm_password');?><span class="required">*</span></label>
                    <input id="zc_create_account_password_confirmation" type="password" name="confirm_password" class="password">
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 left-p-0 text-right">
                    <a id="not_this_time" class="right-m-1 light-grey-font"><?php echo $lang->line('users_not_this_time');?></a>
                    <input type="button" id="zc_create_account_button" class="btn btn-primary btn-text-bold" value="<?php echo $lang->line('users_create_account');?>" />
                </div>
            </div>
        </div>
    </div>
</div>