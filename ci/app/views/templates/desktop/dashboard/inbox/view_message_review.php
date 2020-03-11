<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-12 space-4">
            <div id="listings-container">
                <div class="suspension-container">
                    <div class="panel space-4">
                        <div id="main_reserve">
                            <div class="title">
                                <h2><?php echo $lang->line('common_review_upper');?></h2>
                            </div>
                            <?php
                                if ($reservation->get_status_id() == Reservation_Status::AWAITINGUSERREVIEW)
                                {
                            ?>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
                                        <div class="reviewvisability">
                                            <span class="public"><?php echo $lang->line('dashboard_public');?></span>
                                        </div>
                                        <div class="reviewdetails">
                                            <h3><?php echo $lang->line('dashboard_review_share');?></h3>
                                            <p><?php echo $lang->line('dashboard_review_host');?></p>
                                            <?php echo $review->get_html_data_textarea('review', 'zc_review_public', 'zc_review_public', false, ['maxlength' => 5000], false);?>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
                                        <div class="reviewvisability">
                                            <span class="private"><?php echo $lang->line('dashboard_private');?></span>
                                        </div>
                                        <div class="reviewdetails">
                                            <h3><?php echo $lang->line('dashboard_feedback');?></h3>
                                            <p><?php echo $lang->line('dashboard_feedback_suggest');?></p>
                                            <?php echo $review->get_html_data_textarea('feedback', 'zc_review_private', 'zc_review_private', false, ['maxlength' => 5000], false);?>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
                                        <div class="reviewvisability">
                                            <span class="private"><?php echo $lang->line('dashboard_private');?></span>
                                        </div>
                                        <div class="reviewdetails">
                                            <?php
                                                $star_num = 1;
                                                foreach (Review::get_rating_types() as $ratingType => $ratingTitle)
                                                {
                                                    echo '<h3>' . $lang->line($ratingTitle) . '</h3><div><input type="hidden" class="zc_review_rating_auditor" zc_rating_type="' . $ratingType . '" />';
                                                    foreach (Review::get_rating_values() as $num => $rating)
                                                    {
                                                        echo '<input class="zc_review_rating_holder hover-star' . $star_num . '" type="radio" name="' . $ratingType . '" value="' . $num . '" title="' . $lang->line($rating) . '" />';
                                                    }
                                                    echo '<span id="hover-test' . $star_num . '" style="margin: 0 0 0 20px;"></span></div><br>';
                                                    ++$star_num;
                                                }
                                            ?>
                                            <p>
                                                <input type="hidden" id="zc_review_data" subject_id="<?php echo $reservation->get('asset_id');?>" author_id="<?php echo $reservation->get('client_id');?>" reservation_id="<?php echo $reservation->get_id();?>" />
                                                <button id="zc_review_submit" name="submit" type="submit" class="btn btn-primary">
                                                    <span><?php echo $lang->line('dashboard_submit');?></span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                    <?php
                                }
                                elseif ($review->exists_in_db())
                                {
                                    ?>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
                                        <div class="reviewvisability">
                                            <span class="public"><?php echo $lang->line('dashboard_public');?></span>
                                        </div>
                                        <div class="reviewdetails">
                                            <h3><?php echo $lang->line('dashboard_review_share');?></h3>
                                            <p><?php echo $review->get('review');?></p>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
                                        <div class="reviewvisability">
                                            <span class="private"><?php echo $lang->line('dashboard_private');?></span>
                                        </div>
                                        <div class="reviewdetails">
                                            <h3><?php echo $lang->line('dashboard_feedback');?></h3>
                                            <p><?php echo $review->get('feedback');?></p>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 reviewsection clearfix">
                                        <div class="reviewvisability">
                                            <span class="private"><?php echo $lang->line('dashboard_private');?></span>
                                        </div>
                                        <div class="reviewdetails">
                                            <h3><?php echo $lang->line('common_review_cleanliness');?></h3>
                                            <p><?php echo $review->get('cleanliness');?></p>
                                            <h3><?php echo $lang->line('common_review_communication');?></h3>
                                            <p><?php echo $review->get('communication');?></p>
                                            <h3><?php echo $lang->line('common_review_accuracy');?></h3>
                                            <p><?php echo $review->get('accuracy');?></p>
                                            <h3><?php echo $lang->line('common_review_checkin');?></h3>
                                            <p><?php echo $review->get('checkin');?></p>
                                            <h3><?php echo $lang->line('common_review_location');?></h3>
                                            <p><?php echo $review->get('location');?></p>
                                            <h3><?php echo $lang->line('common_review_value');?></h3>
                                            <p><?php echo $review->get('value');?></p>
                                        </div>
                                    </div>
                                    <?php
                                }
                                else
                                {
                                    echo '<div class="panel-header active-panel-header"><div class="row"><div class="col-sm-6 active-panel-padding">' . $lang->line('dashboard_no_review') . '</div></div></div>';
                                }
                                    ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>