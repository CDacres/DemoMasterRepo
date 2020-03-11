<div class="forgot-password-wrapper">
    <div class="text-center auth-form">
        <div class="form_input_row">
            <h1 class="panel__title"><?php echo $lang->line('users_request_new_password');?></h1>
        </div>
        <div class="alert text-center hide" role="alert"></div>
        <div class="toggle-container">
            <div class="form_input_row"><?php echo $lang->line('users_request_new_password_text');?></div>
            <div class="form-wrapper">
                <div class="simple_form inputs inputs--medium" id="new_user">
                    <div class="form_input_row email user_email">
                        <div class="form_input_row-input p-1">
                            <input class="string email optional inputs__input" id="email_address" name="email" placeholder="<?php echo $lang->line('users_email');?>" type="email" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>