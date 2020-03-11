<div id="inputs_container">
    <div class="review_input_row row bottom-m-1">
        <form>
            <div class="col-sm-12">
                <label for="first_name"><?php echo $lang->line('users_first_name');?><span class="required">*</span></label>
                <input class="name_input" type="text" name="first_name" />
            </div>
            <div class="col-sm-12">
                <label for="email_address"><?php echo $lang->line('users_email_address');?><span class="required">*</span></label>
                <input class="email_input email-check" type="email" name="email_address" />
            </div>
        </form>
    </div>
    <hr />
</div>
<div class="row">
    <div class="col-sm-12 text-right">
        <a id="add_another" class="basic-link"><span class="plus">+</span> <?php echo $lang->line('modals_reviewers_add_customer');?></a>
        <hr />
    </div>
</div>
<div class="row">
    <div class="col-sm-12">
        <p id="Emodal_details" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_name_email');?></p>
    </div>
</div>
<div class="row bottom-m-1 venue-selector">
    <div class="col-sm-10">
        <div class="select select-block">
            <select id="modal_venue_select" class="dropdown-toggle zc_value_input">
                <?php
                    if ($venues->get_count() == 1)
                    {
                        $f_venue = $venues->get_first();
                        echo '<option value="' . $f_venue->get_asset_id() . '" selected>' . $f_venue->get('name') . '</option>';
                    }
                    else
                    {
                ?>
                        <option value='-1' disabled selected style='display:none;'><?php echo $lang->line('dashboard_select_venue');?></option>
                        <?php
                            foreach ($venues->object() as $venue)
                            {
                                echo '<option value="' . $venue->get_asset_id() . '">' . $venue->get('name') . '</option>';
                            }
                    }
                        ?>
            </select>
        </div>
    </div>
    <div class="col-sm-2">
        <span class="site-question" data-toggle="tooltip" data-placement="top" title="<?php echo $lang->line('dashboard_review_venue');?>">?</span>
    </div>
</div>
<div class="row">
    <div class="col-sm-12 bottom-m-1">
        <button id="add_new_reviewers" class="btn btn-success btn-block" type="button"><?php echo $lang->line('modals_reviewers_button');?></button>
    </div>
</div>