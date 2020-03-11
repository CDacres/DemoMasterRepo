<div class="col-xs-12 reviewsection clearfix">
    <div class="col-sm-12 top-m-1">
        <div class="row">
            <div class="col-sm-10">
                <h4><?php echo $lang->line('modals_review_rate_title');?></h4>
            </div>
            <div class="col-sm-2 text-right">
                <h5 id="edit_stars">
                    <a><?php echo $lang->line('common_edit');?></a>
                </h5>
            </div>
        </div>
    </div>
    <form>
        <div class="reviewdetails">
            <?php
                $star_num = 1;
                foreach (Review::get_rating_types() as $ratingType => $ratingTitle)
                {
                    echo '<div class="rating-container col-sm-4 bottom-m-1" style="display: none;"><p>' . $lang->line($ratingTitle) . '</p><div><input type="hidden" class="zc_review_rating_auditor" zc_rating_type="' . $ratingType . '" />';
                    foreach (Review::get_rating_values() as $num => $rating)
                    {
                        echo '<input class="zc_review_rating_holder hover-star' . $star_num . '" type="radio" name="' . $ratingType . '" value="' . $num . '" title="' . $lang->line($rating) . '" />';
                    }
                    echo '<span id="hover-test' . $star_num . '" style="margin: 0 0 0 20px;"></span></div><br></div>';
                    ++$star_num;
                }
            ?>
            <div class="room-select-container col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <hr />
                        <div class="row">
                            <div class="col-sm-10">
                                <h4><?php echo $lang->line('modals_review_space_title');?></h4>
                            </div>
                            <div class="col-sm-2 text-right">
                                <h5 id="edit_room">
                                    <a><?php echo $lang->line('common_edit');?></a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="step_2" class="select select-block" style="display: none;">
                    <select id="book_type" class="dropdown-toggle zc_value_input">
                        <?php
                            if ($rooms->get_count() == 1)
                            {
                                $f_room = $rooms->get_first();
                                echo '<option value="' . $f_room->get_asset_id() . '" selected>' . $f_room->get('title') . '</option>';
                            }
                            else
                            {
                        ?>
                                <option value='-1' disabled selected style='display:none;'><?php echo $lang->line('common_select');?></option>
                                <?php
                                    foreach ($rooms->object() as $room)
                                    {
                                        echo '<option value="' . $room->get_asset_id() . '">' . $room->get('title') . '</option>';
                                    }
                            }
                                ?>
                    </select>
                </div>
            </div>
            <div class="write-review-container col-sm-12">
                <div class="row">
                    <div class="col-sm-12">
                        <hr />
                        <div class="row">
                            <div class="col-sm-10">
                                <h4><?php echo $lang->line('modals_review_public_title');?></h4>
                            </div>
                            <div class="col-sm-2 text-right">
                                <h5 id="edit_review">
                                    <a><?php echo $lang->line('common_edit');?></a>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="step_3" class="row" style="display: none;">
                    <div class="col-sm-12">
                        <?php echo $review->get_html_data_textarea('review', 'zc_review_public', 'zc_review_public', false, ['maxlength' => 5000], false);?>
                        <div id="add-feedback" class="bottom-m-1 text-right">
                            <p>
                                <a id="add-feedback-link" class="no-link"><span class="plus">+</span> <?php echo $lang->line('reviews_add_private');?></a>
                            </p>
                        </div>
                        <div id="feedback-text-area" class="hide bottom-m-1"><?php echo $review->get_html_data_textarea('feedback', 'zc_review_private', 'zc_review_private', false, ['maxlength' => 5000], false);?></div>
                        <hr />
                    </div>
                </div>
            </div>
            <?php
                if (!$this->dx_auth->is_logged_in())
                {
            ?>
                    <div class="user-info-container bottom-m-1" style="display: none;">
                        <div id="name_input" class="col-sm-6">
                            <label for="user_name"><?php echo $lang->line('users_name');?><span class="required">*</span></label>
                            <input id="user_name" class="form-control" name="user_name" type="text">
                            <p id="Econtact_name" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_first_name');?></p>
                        </div>
                        <div id="email_input" class="col-sm-6">
                            <label for="user_email"><?php echo $lang->line('users_email');?><span class="required">*</span></label>
                            <input id="user_email" class="form-control email-check" name="email" type="email">
                            <p id="Econtact_email" class="Credit_Error" style="display: none;"><?php echo $lang->line('users_form_error_email');?></p>
                        </div>
                    </div>
                    <?php
                }
                    ?>
            <div class="submit-button-container" style="display: none;">
                <div class="col-sm-12 top-m-1">
                    <p>
                        <input type="hidden" id="zc_review_data" subject_id="<?php echo $venue->get('asset_id');?>" author_id="<?php echo $user_id;?>" />
                        <button id="zc_modal_review_submit" name="submit" type="button" class="btn btn-primary"><?php echo $lang->line('reviews_publish');?></button>
                        <img class="loading-gif" src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>" style="display: none;">
                    </p>
                </div>
            </div>
        </div>
    </form>
</div>