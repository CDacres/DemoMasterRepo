<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <span class="semi-bold"><?php echo $venue->get_id();?></span></p>
            </div>
        </div>
    </div>
</div>
<form>
    <h5>
        <b>Step 1 - Agree to List</b>
    </h5>
    <div class="form-group bottom-p-1 separator-dotted">
        <div class="row">
            <div class="col-sm-6">
                <input type="checkbox" value="<?php echo $venue->get_id();?>" id="zc_agree_to_list" />
            </div>
        </div>
        <div class="row space-top-2">
            <div class="col-sm-6">
                <a id="onboard_update" class="btn btn-success" data-venueid="<?php echo $venue->get_id();?>">Update</a>
            </div>
        </div>
    </div>
    <h5>
        <b>Step 2 - Users</b>
    </h5>
    <?php
        foreach ($venue->get('contact_details')->object() as $contact_details)
        {
            if ($contact_details->get('role_id') != User::ADMINUSER)
            {
    ?>
                <div class="form-group bottom-p-1 separator-dotted">
                    <div class="row">
                        <?php echo $contact_details->get_html_data_input('id', '', 'hidden', 'zc_user_id_' . $contact_details->get_id());?>
                        <div id="firstName_<?php echo $contact_details->get_id();?>" class="col-sm-6">
                            <label for="zc_first_name">First Name<span class="required">*</span></label>
                            <?php echo $contact_details->get_html_data_input('first_name', 'form-control', 'text', 'zc_first_name_' . $contact_details->get_id(), false, ['autocomplete' => 'off']);?>
                            <p id="Econtact_first_name_<?php echo $contact_details->get_id();?>" class="Credit_Error" style="display: none;">Please enter a valid first name</p>
                        </div>
                        <div id="lastName_<?php echo $contact_details->get_id();?>" class="col-sm-6">
                            <label for="zc_last_name">Last Name<span class="required">*</span></label>
                            <?php echo $contact_details->get_html_data_input('last_name', 'form-control', 'text', 'zc_last_name_' . $contact_details->get_id(), false, ['autocomplete' => 'off']);?>
                            <p id="Econtact_last_name_<?php echo $contact_details->get_id();?>" class="Credit_Error" style="display: none;">Please enter a valid last name</p>
                        </div>
                    </div>
                    <div class="row space-top-2">
                        <div id="email_<?php echo $contact_details->get_id();?>" class="col-sm-6">
                            <label for="zc_email_address">Email<span class="required">*</span></label>
                            <?php echo $contact_details->get_html_data_input('email', 'form-control', 'email', 'zc_email_address_' . $contact_details->get_id(), false, ['autocomplete' => 'off']);?>
                            <p id="Econtact_email_<?php echo $contact_details->get_id();?>" class="Credit_Error" style="display: none;">Please enter a valid email address</p>
                        </div>
                        <div id="phone_<?php echo $contact_details->get_id();?>" class="col-sm-6">
                            <div class="form_input_row-phone-prefix">
                                <div class="b-dropdown js-phone-prefix">
                                    <label for="zc_user_phone_number">Phone<span class="required">*</span></label>
                                    <?php echo $contact_details->get_html_data_input('phone_number', 'form-control zc_user_phone_number', 'tel', 'zc_user_phone_number_' . $contact_details->get_id(), false, ['autocomplete' => 'off']);?>
                                </div>
                                <p id="Econtact_phone_<?php echo $contact_details->get_id();?>" class="Credit_Error" style="display: none;">Please enter a valid contact number</p>
                            </div>
                        </div>
                    </div>
                    <div class="row space-top-2 bottom-p-1">
                        <div id="password_<?php echo $contact_details->get_id();?>" class="col-sm-6">
                            <label for="zc_user_password">Password<span class="required">*</span></label>
                            <input id="zc_user_password_<?php echo $contact_details->get_id();?>" type="password" name="password">
                        </div>
                        <div id="passwordconfirm_<?php echo $contact_details->get_id();?>" class="col-sm-6">
                            <label for="zc_user_password_confirmation">Confirm Password<span class="required">*</span></label>
                            <input id="zc_user_password_confirmation_<?php echo $contact_details->get_id();?>" type="password" name="confirm_password">
                        </div>
                    </div>
                    <div class="row space-top-2">
                        <div class="col-sm-6">
                            <a class="onboard_update btn btn-success" data-venueuserid="<?php echo $contact_details->get_id();?>">Update</a>
                        </div>
                    </div>
                </div>
                <?php
            }
        }
                ?>
    <div class="row space-top-2">
        <div class="col-sm-12"></div>
    </div>
</form>
