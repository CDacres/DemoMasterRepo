<form>
    <?php
        if (!$this->dx_auth->is_logged_in())
        {
    ?>
            <div class="row">
                <div class="col-md-12">
                    <h5 id="title">
                        <span id="sign-in" class="no-link"><?php echo $lang->line('modals_enquiry_signin_enquire');?></span>
                    </h5>
                </div>
            </div>
            <?php
        }
            ?>
    <div class="form-group space-top-2 bottom-p-1">
        <?php
            if ($room->get('primary_vertical_id') == Vertical::OFFICE)
            {
        ?>
                <div class="row">
                    <div class="col-sm-3">
                        <label class="control-label" for="eventDate"><?php echo $lang->line('modals_enquiry_move_in');?></label>
                        <div id="calendar_icon_container">
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input id="eventDate" class="datepicker form-control" name="eventDate" type="text" placeholder="<?php echo $lang->line('modals_enquiry_select_date');?>" autocomplete="off" />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="duration"><?php echo $lang->line('common_duration');?></label>
                        <div class="select select-block">
                            <select id="duration" name="duration">
                                <?php
                                    foreach ($enquiry_durations->object() as $enquiry_duration)
                                    {
                                        if ($enquiry_duration->is_true('month_option'))
                                        {
                                            echo '<option value="' . $enquiry_duration->get_id() . '">' . $lang->line($enquiry_duration->get('lang_key')) . '</option>';
                                        }
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-2">
                        <label class="control-label" for="deskCount"><?php echo $lang->line('Desks');?></label>
                        <div class="select select-block">
                            <select id="deskCount" name="deskCount">
                                <?php
                                    for ($c = 0; $c < 21; ++$c)
                                    {
                                        echo '<option value="' . $c . '">' . $c . '</option>';
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-3">
                        <label class="control-label" for="tourDate"><?php echo $lang->line('modals_enquiry_tour');?></label>
                        <div id="calendar_icon_container">
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input id="tourDate" class="datepicker form-control" name="tourDate" type="text" placeholder="<?php echo $lang->line('modals_enquiry_select_date');?>" autocomplete="off" />
                        </div>
                    </div>
                </div>
                <div class="row top-m-1">
                    <div class="col-sm-6 checkbox-input">
                        <label class="big-checkbox big-label-checkbox">
                            <input id="flexible" class="pull-left" name="flexible" type="checkbox" value="">
                            <?php echo $lang->line('modals_enquiry_flexible_date');?>
                        </label>
                    </div>
                </div>
                <?php
            }
            else
            {
                ?>
                <div class="row">
                    <div class="col-sm-4">
                        <label class="control-label" for="eventDate"><?php echo $lang->line('common_date');?></label>
                        <div id="calendar_icon_container">
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input id="eventDate" class="datepicker form-control" name="eventDate" type="text" placeholder="<?php echo $lang->line('modals_enquiry_select_date');?>" autocomplete="off" />
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="eventTime"><?php echo $lang->line('common_time');?></label>
                        <div class="select select-block">
                            <select id="eventTime" name="eventTime">
                                <option value=""><?php echo $lang->line('modals_enquiry_any_time');?></option>
                                <?php
                                    for ($i = 9; $i <= 17; ++$i)
                                    {
                                        for ($j = 0; $j < 60; $j += 30)
                                        {
                                            echo '<option class="day" value="' . str_pad($i, 2, '0', STR_PAD_LEFT) . ':' . str_pad($j, 2, '0', STR_PAD_LEFT) . ':00">' . $i . ':' . str_pad($j, 2, '0', STR_PAD_LEFT) . '</option>';
                                        }
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <label class="control-label" for="duration"><?php echo $lang->line('common_duration');?></label>
                        <div class="select select-block">
                            <select id="duration" name="duration">
                                <?php
                                    foreach ($enquiry_durations->object() as $enquiry_duration)
                                    {
                                        if ($enquiry_duration->is_true('hour_option') || $enquiry_duration->is_true('day_option') || $enquiry_duration->is_true('week_option'))
                                        {
                                            echo '<option value="' . $enquiry_duration->get_id() . '">' . $lang->line($enquiry_duration->get('lang_key')) . '</option>';
                                        }
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row top-m-1">
                    <div class="col-sm-6">
                        <label class="big-checkbox big-label-checkbox">
                            <input id="flexible" class="pull-left" name="flexible" type="checkbox" value="">
                            <?php echo $lang->line('modals_enquiry_flexible_date_time');?>
                        </label>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                        <label class="control-label" for="guests"><?php echo $lang->line('common_guests_upper');?><span class="required">*</span></label>
                        <input id="guests" class="form-control" name="guests" type="text" placeholder="<?php echo $lang->line('modals_booking_valid_guests');?>" />
                    </div>
                </div>
                <?php
            }
                ?>
        <div class="row top-m-1">
            <div class="col-sm-12">
                <textarea id="message" class="form-control" placeholder="<?php echo $lang->line(($room->get('primary_vertical_id') == Vertical::OFFICE)?'modals_enquiry_message_desk':'modals_enquiry_message_meeting');?>"></textarea>
            </div>
        </div>
        <input id="request_desc" name="request_desc" type="hidden" value="<?php echo $request_desc;?>" />
    </div>
    <?php
        if ($this->dx_auth->is_logged_in())
        {
            echo $user->get_html_data_input('first_name', null, 'hidden', 'zc_first_name');
            echo $user->get_html_data_input('last_name', null, 'hidden', 'zc_last_name');
            echo $user->get_html_data_input('email', null, 'hidden', 'zc_email_address');
            if ($user->is_null('phone_number') || !$user->data_not_empty('phone_number'))
            {
    ?>
                <div class="row space-top-2">
                    <div id="phone" class="col-sm-6">
                        <div class="form_input_row-phone-prefix">
                            <div class="b-dropdown js-phone-prefix">
                                <label class="control-label" for="zc_user_phone_number"><?php echo $lang->line('users_phone_number');?><span class="required">*</span></label>
                                <?php echo $user->get_html_data_input('phone_number', 'form-control zc_user_phone_number', 'tel', 'zc_user_phone_number', false, ['autocomplete' => 'off']);?>
                            </div>
                        </div>
                    </div>
                </div>
                <?php
            }
            else
            {
                echo $user->get_html_data_input('phone_number', null, 'hidden', 'zc_user_phone_number');
            }
        }
        else
        {
                ?>
            <div class="form-group">
                <div class="row">
                    <div id="firstName" class="col-sm-6">
                        <label class="control-label" for="zc_first_name"><?php echo $lang->line('users_first_name');?><span class="required">*</span></label>
                        <?php echo $user->get_html_data_input('first_name', 'form-control name-input', 'text', 'zc_first_name', false, ['autocomplete' => 'off']);?>
                    </div>
                    <div id="lastName" class="col-sm-6">
                        <label class="control-label" for="zc_last_name"><?php echo $lang->line('users_last_name');?><span class="required">*</span></label>
                        <?php echo $user->get_html_data_input('last_name', 'form-control name-input', 'text', 'zc_last_name', false, ['autocomplete' => 'off']);?>
                    </div>
                </div>
                <div class="row bottom-p-1">
                    <div id="email" class="col-sm-6">
                        <label class="control-label" for="zc_email_address"><?php echo $lang->line('users_email');?><span class="required">*</span></label>
                        <?php echo $user->get_html_data_input('email', 'form-control email-check', 'email', 'zc_email_address', false, ['autocomplete' => 'off']);?>
                    </div>
                    <div id="phone" class="col-sm-6">
                        <div class="form_input_row-phone-prefix">
                            <div class="b-dropdown js-phone-prefix">
                                <label class="control-label" for="zc_user_phone_number"><?php echo $lang->line('users_phone_number');?><span class="required">*</span></label>
                                <?php echo $user->get_html_data_input('phone_number', 'form-control zc_user_phone_number', 'tel', 'zc_user_phone_number', false, ['autocomplete' => 'off']);?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="row">
                        <div class="col-sm-12">
                            <p><?php echo $lang->line('modals_enquiry_create_password');?></p>
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label" for="zc_user_password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                            <input id="zc_user_password" class="form-control password-input" type="password" name="password">
                        </div>
                        <div class="col-sm-6">
                            <label class="control-label" for="zc_user_password_confirmation"><?php echo $lang->line('users_confirm_password');?><span class="required">*</span></label>
                            <input id="zc_user_password_confirmation" class="form-control password-input" type="password" name="confirm_password">
                        </div>
                    </div>
                </div>
            </div>
            <?php
        }
            ?>
    <input type="hidden" value="" name="ga_id" id="ga_id" />
</form>