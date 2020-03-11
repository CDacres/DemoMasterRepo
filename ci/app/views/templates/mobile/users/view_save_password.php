<div data-role="page" id="save-password" class="new-user-page ui-page ui-page-theme-a ui-page-active" tabindex="0">
    <div class="head no-buttons long-title ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('users_save_password_heading', ucfirst($reservation->get('client_first_name')));?></h1>
    </div>
    <div class="content new-user-content ui-content client-details" data-role="content" role="main">
        <input type="hidden" id="order-id" name="order-id" value="2798510">
        <form id="new-user-signup" class="login-form" novalidate="novalidate">
            <p class="form-intro"><?php echo $lang->line('users_save_password_subheading');?></p>
            <p class="known-value"><?php echo $reservation->get('client_email');?></p>
            <ul class="form-list">
                <li data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                    <label for="zc_create_account_password"><?php echo $lang->line('users_password');?></label>
                    <input id="zc_create_account_password" type="password" name="password" class="password" placeholder="<?php echo $lang->line('users_password');?>">
                </li>
                <li data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                    <label for="zc_create_account_password_confirmation"><?php echo $lang->line('users_confirm_password');?></label>
                    <input id="zc_create_account_password_confirmation" type="password" name="confirm_password" class="password" placeholder="<?php echo $lang->line('users_confirm_password');?>">
                </li>
            </ul>
            <div class="form-action">
                <input type="button" id="zc_create_account_button" class="btn btn-primary btn-text-bold" value="<?php echo $lang->line('users_create_account');?>" />
                <a id="not_this_time" class="right-m-1 light-grey-font pointer"><?php echo $lang->line('users_not_this_time');?></a>
            </div>
        </form>
    </div>
    <div data-role="popup" id="error-popup">
        <div class="error-content">
            <div class="error-text">
                <p id="error-title" class="title"><?php echo $lang->line('common_sorry');?></p>
                <p id="error-message" class="message"></p>
            </div>
            <a href="" data-role="button" data-theme="b" data-rel="back" class="action-btn ui-btn-corner-all ui-btn-up-b ui-btn ui-shadow" role="button">
                <span class="ui-btn-inner ui-btn-corner-all">
                    <span class="ui-btn-text"><?php echo $lang->line('common_close');?></span>
                </span>
            </a>
        </div>
    </div>
</div>
