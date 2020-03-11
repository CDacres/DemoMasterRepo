<div class="form-wrapper form-height">
    <div class="auth-form">
        <h2 class="heading-section">
            <span class="glyphicon glyphicon-flash" aria-hidden="true"></span>
            <span class="title"><?php echo $lang->line('common_sign_in');?></span>
        </h2>
        <form id="signin">
            <div class="simple_form inputs inputs--medium" id="new_user">
                <div class="form_input_row email user_email">
                    <div class="form_input_row-input">
                        <label for="username"><?php echo $lang->line('users_email');?><span class="required">*</span></label>
                        <input name="username" id="zc_login_user_name" aria-required="true" class="string email inputs__input" required="required" type="email" value="">
                    </div>
                </div>
                <div class="form_input_row password user_password">
                    <div class="form_input_row-input">
                        <label for="password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                        <input aria-required="true" class="password inputs__input" name="password" type="password" id="zc_login_password" placeholder="<?php echo $lang->line('users_password');?>" required="required">
                    </div>
                </div>
            </div>
        </form>
        <?php /*
        <div class="subtext">
            <p>
                <span id="forgot_password" class="no-link">Forgot Password?</a>
            </p>
        </div>
        */ ?>
    </div>
</div>