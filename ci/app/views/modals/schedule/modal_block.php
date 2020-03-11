<form>
    <div class="form-group bottom-p-1">
        <div class="row">
            <div class="col-xs-12 space-4">
                <div id="block_notice" class="notice blue">
                    <div class="row bottom-m-1">
                        <div class="col-sm-2 col-xs-2">
                            <span class="glyphicon glyphicon-ban-circle" aria-hidden="true"></span>
                        </div>
                        <div class="col-sm-10 col-xs-10 left-p-0">
                            <h3><?php echo $lang->line('modals_block_tip');?></h3>
                            <span><?php echo $lang->line('modals_block_tip_text');?></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-2 col-sm-offset-2 col-xs-3 col-xs-offset-2 left-p-0">
                            <button type="button" id="book_instead" class="btn btn-success"><?php echo $lang->line('modals_block_add_booking');?></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h5 id="title"><?php echo $lang->line('common_description');?><span class="required">*</span></h5>
            </div>
        </div>
        <div class="row">
            <div id="description_formgroup" class="form-group col-sm-12">
                <input type="text" class="form-control title" id="block_description">
                <p id="Edescription" class="Credit_Error" style="display: none;"><?php echo $lang->line('modals_block_add_desc');?></p>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h5 id="title"><?php echo $lang->line('modals_block_timing');?></h5>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="form-group form-group-default">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label for="start_date"><?php echo $lang->line('modals_booking_start_date');?><span class="required">*</span></label>
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input type="text" class="form-control datepicker" id="zc_schedule_booking_start_date" autocomplete="off">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="zc_schedule_booking_start_time"><?php echo $lang->line('modals_booking_start_time');?><span class="required">*</span></label>
                            <div class="select select-block">
                                <select id="zc_schedule_booking_start_time">
                                    <?php
                                        $startdateTime = new DateTime();
                                        $startmin = 0;
                                        while ($startmin <= 1440)
                                        {
                                            echo '<option value="' . $startdateTime->setTime(0, $startmin)->format('H:i') . '">' . $startdateTime->setTime(0, $startmin)->format('H:i') . '</option>';
                                            $startmin += 30;
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12">
                <div class="form-group form-group-default">
                    <div class="row">
                        <div class="form-group col-sm-6">
                            <label for="end_date"><?php echo $lang->line('modals_booking_end_date');?><span class="required">*</span></label>
                            <span id="calendar-icon" class="glyphicon glyphicon-calendar" aria-hidden="true"></span>
                            <input type="text" class="form-control datepicker" id="zc_schedule_booking_end_date" autocomplete="off">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="zc_schedule_booking_end_time"><?php echo $lang->line('modals_booking_end_time');?><span class="required">*</span></label>
                            <div class="select select-block">
                                <select id="zc_schedule_booking_end_time">
                                    <?php
                                        $enddateTime = new DateTime();
                                        $endmin = 0;
                                        while ($endmin <= 1440)
                                        {
                                            echo '<option value="' . $enddateTime->setTime(0, $endmin)->format('H:i') . '">' . $enddateTime->setTime(0, $endmin)->format('H:i') . '</option>';
                                            $endmin += 30;
                                        }
                                    ?>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 date_input">
                            <p id="Econtact_dates" class="Credit_Error" style="display: none;"><?php echo $lang->line('modals_block_correct_date');?></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>