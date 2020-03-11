<div id="review-<?php echo $review->get_id();?>" class="zc_review_container review clearfix" itemprop="review" itemscope="" itemtype="http://schema.org/Review" data-id="<?php echo $review->get_id();?>">
    <div class="top-container">
        <?php
            if (!$review->is_null('reservation_id'))
            {
        ?>
                <div class="verified-review">
                    <span class="label indented-end status-label label-reviews"><?php echo $lang->line('common_reviews_verified');?></span>
                </div>
                <?php
            }
                ?>
        <div class="avatar">
            <img width="50" height="50" alt="<?php echo $lang->line('Profile');?>" title="<?php echo $lang->line('Profile');?>" src="/css/images/commonsite/avatar.png">
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
            <span class="posted-date" itemprop="dateCreated"><?php echo $lang->line('common_reviews_posted_in', $review->wrangle('created_date_time')->formatted('month_year'));?></span>
        </div>
    </div>
    <div class="zc_review text normal-font" itemprop="reviewBody" data-id="<?php echo $review->get_id();?>"><?php echo $review->get('review');?></div>
    <meta itemprop="itemReviewed" content="<?php echo $room->get('title');?>">
    <?php
        if ($this->dx_auth->is_admin())
        {
    ?>
            <span>
                <button data-id="<?php echo $review->get_id();?>" class="zc_edit_review_btn btn btn-default" type="button"><?php echo $lang->line('common_edit');?></button>
            </span>
            <span>
                <button data-id="<?php echo $review->get_id();?>" class="zc_review_save_btn btn btn-primary" style="display: none;">Save</button>
            </span>
            <span>
                <button data-id="<?php echo $review->get_id();?>" class="zc_review_cancel_btn btn btn-default" style="display: none;">Cancel</button>
            </span>
            <button data-id="<?php echo $review->get_id();?>" class="zc_delete_review_btn btn btn-danger" type="button"><?php echo $lang->line('common_delete');?></button>
            <?php
        }
            ?>
</div>