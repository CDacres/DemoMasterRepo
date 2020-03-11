<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-3 leftnav"><?php echo $leftNav->display_family();?></div>
        <div class="col-md-9 space-4">
            <?php
                if ($reserved_asset_user && $venues->get_count() > 0)
                {
            ?>
                    <div class="row">
                        <div id="flash_instruction_container" class="col-sm-12 text-right">
                            <div id="flash_instruction" style="display: none;"><?php echo $lang->line('dashboard_reviews_boost');?></div>
                            <img id="instruction_arrow" style="display: none;" src="/css/images/arrow-green.png" width="75px" alt="<?php echo $lang->line('dashboard_write_review');?>" title="<?php echo $lang->line('dashboard_write_review');?>"/>
                        </div>
                    </div>
                    <?php
                }
                    ?>
            <div id="reviews-container">
                <div>
                    <div class="suspension-container">
                        <ul class="nav nav-tabs reviews" role="tablist">
                            <?php
                                $active = false;
                                if ($reserved_asset_user)
                                {
                            ?>
                                    <li id="about_you" class="active">
                                        <a id="review_about_you" href="#received" class="tab-item" role="tab" data-toggle="tab" aria-controls="received"><?php echo $lang->line('dashboard_review_about_you');?></a>
                                    </li>
                                    <?php
                                }
                                else
                                {
                                    $active = true;
                                }
                                    ?>
                            <li id="by_you"<?php if ($active) { echo ' class="active"';}?>>
                                <a id="reviews_by_you" href="#sent" class="tab-item" role="tab" data-toggle="tab" aria-controls="sent"><?php echo $lang->line('dashboard_review_by_you');?></a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <?php
                                if ($reserved_asset_user)
                                {
                            ?>
                                    <div role="tabpanel" class="tab-pane active" id="received">
                                        <div class="panel space-4">
                                            <div class="panel-header active-panel-header">
                                                <div class="row">
                                                    <?php
                                                        if ($rooms->get_count() > 0)
                                                        {
                                                    ?>
                                                            <div class="col-sm-6 active-panel-padding">
                                                                <button id="zc_room_option_btn" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"><?php echo $lang->line('dashboard_rooms_all');?><span class="caret"></span></button>
                                                                <ul class="dropdown-menu">
                                                                    <?php
                                                                        foreach ($rooms->object() as $room)
                                                                        {
                                                                            if (!isset($venue_id) || $venue_id != $room->get('venue_id'))
                                                                            {
                                                                                $venue_id = $room->get('venue_id');
                                                                    ?>
                                                                                <li class="venue_name"><?php echo $room->get('venue_name');?></li>
                                                                                <?php
                                                                            }
                                                                                ?>
                                                                            <li>
                                                                                <a href="#" class="zc_room_list" filter_type="<?php echo $room->get('title');?>" zc_object_id="<?php echo $room->get_asset_id();?>"><?php echo $room->get('title');?></a>
                                                                            </li>
                                                                            <?php
                                                                        }
                                                                            ?>
                                                                    <li role="separator" class="divider"></li>
                                                                    <li>
                                                                        <a href="#" class="zc_room_list" filter_type="all"><?php echo $lang->line('dashboard_rooms_all');?></a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div class="col-sm-6 active-panel-padding text-right">
                                                                <button class="btn btn-success add_reviewer" data-toggle="tooltip" data-placement="bottom" title="<?php echo $lang->line('dashboard_invite_title');?>" type="button"><span class="plus">+</span> <?php echo $lang->line('dashboard_invite');?></button>
                                                            </div>
                                                            <?php
                                                        }
                                                            ?>
                                                </div>
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-sm-12 venue-css">
                                                        <div id="zc_review_list" class="panel-list list-unstyled list-layout">
                                                            <?php
                                                                if ($rooms->get_count() > 0)
                                                                {
                                                                    echo $this->load->view(THEME_FOLDER . '/dashboard/reviews/reviews_update_list', ['asset_reviews' => $asset_reviews], true);
                                                                }
                                                                else
                                                                {
                                                                    echo $lang->line('dashboard_no_approved_rooms');
                                                                }
                                                            ?>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                                    ?>
                            <div role="tabpanel" class="tab-pane <?php if ($active) { echo 'active';}?>" id="sent">
                                <div class="panel space-4">
                                    <div class="panel-body">
                                        <?php
                                            if ($user_reviews->get_count() > 0)
                                            {
                                        ?>
                                                <div class="row">
                                                    <div class="col-sm-12 venue-css">
                                                        <div id="reviews">
                                                            <div class="reviews">
                                                                <?php
                                                                    foreach ($user_reviews->object() as $review)
                                                                    {
                                                                ?>
                                                                        <div id="<?php echo $review->get_id();?>" class="review clearfix" itemprop="review" itemscope="" itemtype="http://schema.org/Review">
                                                                            <div class="top-container">
                                                                                <?php
                                                                                    if (!$review->is_null('reservation_id'))
                                                                                    {
                                                                                ?>
                                                                                        <div class="verified-review">
                                                                                            <span class="label indented-end status-label label-reviews"><?php echo $lang->line('dashboard_verified_review');?></span>
                                                                                        </div>
                                                                                        <?php
                                                                                    }
                                                                                        ?>
                                                                                <div class="avatar">
                                                                                    <img width="50" height="50" alt="" src="/css/images/commonsite/avatar.png" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>" >
                                                                                </div>
                                                                                <span class="author" itemprop="itemReviewed"><?php echo $review->get('room_name');?> - <?php echo $review->get('venue_name');?></span>
                                                                                <div>
                                                                                    <div itemprop="reviewRating" itemscope="" itemtype="http://schema.org/Rating">
                                                                                        <meta itemprop="worstRating" content="1">
                                                                                        <meta itemprop="ratingValue" content="<?php echo $review->get_average_star();?>">
                                                                                        <meta itemprop="bestRating" content="5">
                                                                                        <div class="star_rating" zc_rating="<?php echo $review->get_average_star();?>">
                                                                                            <span>&#x2606;</span>
                                                                                            <span>&#x2606;</span>
                                                                                            <span>&#x2606;</span>
                                                                                            <span>&#x2606;</span>
                                                                                            <span>&#x2606;</span>
                                                                                        </div>
                                                                                    </div>
                                                                                    <span class="posted-date" itemprop="dateCreated"><?php echo $lang->line('dashboard_posted_on', $review->wrangle('created_date_time')->formatted());?></span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="text normal-font" itemprop="reviewBody"><?php echo $review->get('review');?></div>
                                                                            <?php
                                                                                if ($review->get('replies')->get_count() > 0)
                                                                                {
                                                                                    foreach ($review->get('replies')->object() as $review_reply)
                                                                                    {
                                                                            ?>
                                                                                        <div class="col-sm-12">
                                                                                            <div class="row">
                                                                                                <hr />
                                                                                                <div class="col-sm-12">
                                                                                                    <div class="text normal-font">
                                                                                                        <span class="bold">
                                                                                                            <?php
                                                                                                                if ($review_reply->get('author_id') == $user_id)
                                                                                                                {
                                                                                                                    echo $lang->line('dashboard_you');
                                                                                                                }
                                                                                                                else
                                                                                                                {
                                                                                                                    echo ucfirst($review_reply->get('reply_author'));
                                                                                                                }
                                                                                                            ?>
                                                                                                        </span> <span><?php echo $lang->line('dashboard_replied_on', $review_reply->wrangle('created_date_time')->formatted());?></span>
                                                                                                    </div>
                                                                                                    <div class="text normal-font"><?php echo ucfirst($review_reply->get('reply'));?></div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <?php
                                                                                    }
                                                                                }
                                                                                        ?>
                                                                        </div>
                                                                        <?php
                                                                    }
                                                                        ?>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <?php
                                            }
                                            else
                                            {
                                                ?>
                                                <div class="row">
                                                    <div class="col-sm-12 venue-css">
                                                        <div id="reviews">
                                                            <div class="reviews"><?php echo $lang->line('dashboard_no_written_reviews');?></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <?php
                                            }
                                                ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>