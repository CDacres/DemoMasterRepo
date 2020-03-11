<?php
    if (!$asset_reviews->is_null_object() && $asset_reviews->get_count() > 0)
    {
?>
        <div class="reviews">
            <?php
                foreach ($asset_reviews->object() as $review)
                {
            ?>
                    <div id="<?php echo $review->get_id();?>" class="review clearfix" itemprop="review" itemscope="" itemtype="http://schema.org/Review">
                        <div class="col-sm-10">
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
                                    <img width="50" height="50" alt="" src="/css/images/commonsite/avatar.png" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>">
                                </div>
                                <span class="author" itemprop="author"><?php echo ucfirst($review->get('author_name'));?></span>
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
                            <div class="text normal-font" itemprop="reviewBody"><?php echo ucfirst($review->get('review'));?></div>
                            <div class="text normal-font" itemprop="itemReviewed"><?php echo ucfirst($review->get('venue_name'));?> - <?php echo ucfirst($review->get('room_name'));?></div>
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
                            if ($review->get('replies')->get_count() == 0)
                            {
                        ?>
                                <div class="col-sm-2 text-right p-0">
                                    <button zc_review_id="<?php echo $review->get_id();?>" class="btn btn-primary review_reply" href="#" type="button"><?php echo $lang->line('dashboard_reply');?></button>
                                </div>
                                <?php
                            }
                                ?>
                    </div>
                    <?php
                }
                    ?>
        </div>
        <?php
    }
    else
    {
        echo '<div class="row"><div class="col-sm-6"><p>' . $lang->line('dashboard_no_reviews') . '</p></div></div>';
    }
