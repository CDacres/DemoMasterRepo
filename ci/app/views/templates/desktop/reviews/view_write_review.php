<div class="bg-white">
    <div class="container">
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
            <?php
                if (isset($review_set))
                {
            ?>
                    <div class="col-sm-12 top-m-1 bottom-m-1">
                        <h3><?php echo $lang->line('reviews_set_title');?></h3>
                        <p>
                            <a href="/<?php echo $country_lang_url;?>"><?php echo $lang->line('common_home');?></a>
                        </p>
                    </div>
                    <?php
                }
                else
                {
                    ?>
                    <div class="col-sm-12 top-m-1 bottom-m-1">
                        <h3><?php echo $lang->line('reviews_title', ucfirst((isset($reservation))?$reservation->get('client_first_name'):$user_first_name));?></h3>
                        <p><?php echo $lang->line('reviews_venue_feedback', $venue->get('name'));?></p>
                    </div>
                    <div class="reviewdetails bottom-m-3"<?php echo ((isset($reservation))?' zc_asset_id="' . $reservation->get('asset_id') . '" zc_reservation_id="' . $reservation->get_id() . '"':'');?>>
                        <?php
                            if (!isset($reservation))
                            {
                        ?>
                                <div class="room-select-container col-sm-12 bottom-m-1">
                                    <p>
                                        <b><?php echo $lang->line('reviews_room');?></b>
                                    </p>
                                    <div class="select select-block bottom-m-1">
                                        <select id="room_select" class="dropdown-toggle zc_value_input">
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
                                <?php
                            }
                            $star_num = 1;
                            foreach (Review::get_rating_types() as $ratingType => $ratingTitle)
                            {
                                echo '<div class="rating-container col-sm-2 bottom-m-1" style="display: none;"><p>' . $lang->line($ratingTitle) . '</p><div><input type="hidden" class="zc_review_rating_auditor" zc_rating_type="' . $ratingType . '" />';
                                foreach (Review::get_rating_values() as $num => $rating)
                                {
                                    echo '<input class="zc_review_rating_holder hover-star' . $star_num . '" type="radio" name="' . $ratingType . '" value="' . $num . '" title="' . $lang->line($rating) . '" />';
                                }
                                echo '<span id="hover-test' . $star_num . '" style="margin: 0 0 0 20px;"></span></div><br></div>';
                                ++$star_num;
                            }
                                ?>
                        <div class="write-review-container col-sm-8 col-sm-offset-2" style="display: none;">
                            <p>
                                <b><?php echo $lang->line('reviews_public');?></b>
                            </p>
                            <?php echo $review->get_html_data_textarea('review', 'zc_review_public', 'zc_review_public', false, ['maxlength' => 5000], false);?>
                            <div id="add-feedback" class="bottom-m-1 text-right">
                                <p>
                                    <a id="add-feedback-link" class="no-link"><span class="plus">+</span> <?php echo $lang->line('reviews_add_private');?></a>
                                </p>
                            </div>
                            <div id="feedback-text-area" class="hide bottom-m-1">
                                <p>
                                    <b><?php echo $lang->line('reviews_private');?></b>
                                </p>
                                <?php echo $review->get_html_data_textarea('feedback', 'zc_review_private', 'zc_review_private', false, ['maxlength' => 5000], false);?>
                            </div>
                        </div>
                        <div class="submit-button-container text-center bottom-m-1" style="display: none;">
                            <div class="col-sm-12 top-m-1">
                                <p>
                                    <div id="button-container">
                                        <button id="zc_modal_review_submit" name="submit" type="submit" class="btn btn-primary">
                                            <span><?php echo $lang->line('reviews_publish');?></span>
                                        </button>
                                    </div>
                                    <div id="loader-container" style="display: none;">
                                        <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>"/>
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                    ?>
        </div>
    </div>
</div>