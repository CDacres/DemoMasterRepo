<div data-role="page" id="token-page" class="signin-page ui-page ui-page-theme-a ui-page-active" data-add-back-btn="true" tabindex="0">
    <div class="head ui-header ui-bar-inherit" data-role="header">
        <a id="back_btn" data-direction="reverse" onclick="history.go(-1);" href=""></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('users_set_password_title');?></h1>
        <a href="#main-menu" class="button-menu ui-link ui-btn-right ui-btn ui-btn-a ui-shadow ui-corner-all" role="button"><?php echo $lang->line('common_menu');?></a>
    </div>
    <div class="content signin-content ui-content" data-role="content" role="main">
        <div class="form-text"><?php echo $lang->line('users_set_password_info');?></div>
        <span class="left-m-1 right-m-1"><?php echo $lang->line('users_email');?>:</span>
        <span id="user_email"><?php echo $user->get('email');?></span>
        <form id="password-form">
            <ul class="form-list">
                <li id="zc_create_account_password_enc" data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                    <label for="password" class="ui-input-text"><?php echo $lang->line('users_password');?></label>
                    <input id="zc_create_account_password" aria-required="true" class="password required inputs__input" name="password" type="password" placeholder="<?php echo $lang->line('users_password');?>" required="required">
                </li>
                <li id="zc_create_account_password_conf_enc" data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                    <label for="confirm_password" class="ui-input-text"><?php echo $lang->line('users_confirm_password');?></label>
                    <input id="zc_create_account_password_confirmation" aria-required="true" class="password required inputs__input" name="confirm_password" type="password" placeholder="<?php echo $lang->line('users_confirm_password');?>" required="required">
                </li>
            </ul>
            <div class="form-action" id="zc_create_account_button_enc">
                <button id="zc_create_account_button" class="btn btn-primary" name="setpassword" type="button" value="<?php echo $lang->line('users_set_password');?>"><?php echo $lang->line('users_set_password');?></button>
            </div>
        </form>
        <div id="confirm_loading" class="form-text hide"></div>
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
