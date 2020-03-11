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
    <div class="row">
        <div class="col-md-12">
            <h5 id="title"><?php echo $lang->line('dashboard_discount');?><span class="required">*</span></h5>
        </div>
    </div>
    <div class="form-group space-top-2">
        <div class="row">
            <div id="discount" class="col-sm-3">
                <div class="select select-block">
                    <select class="form-control" id="zc_person_discount">
                        <?php
                            $discount = 0;
                            while ($discount <= 95)
                            {
                                echo '<option value="' . $discount . '"' . (($member->get('discount') == $discount)?' selected':'') . '>' . (($discount == 100)?$lang->line('dashboard_free_member'):$lang->line('dashboard_member_discount', $discount)) . '</option>';
                                $discount += 5;
                            }
                        ?>
                    </select>
                </div>
                <p id="Econtact_discount" class="Credit_Error" style="display: none;"><?php echo $lang->line('modals_member_valid_discount');?></p>
            </div>
        </div>
    </div>
</form>