import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './ReviewSection.css';

import StarRating from 'Common/components/star_rating';

const ReviewSection = () => {
    return (
        <StarRating rating="" />

        <div class="reviews-summary clearfix" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
            <div class="venue-rating">
                <h2 class="title"><?php echo $lang->line('common_reviews_venue_rating');?></h2>
                <p class="rating-value" itemprop="ratingValue"><?php echo $venue->get('review_score');?></p>
                <div id="venue_overall_rating" class="rating_container" data-venue-rating="<?php echo $venue->get('review_score');?>"></div>
                <p class="review-amount">
                    <span itemprop="reviewCount"><?php echo $venue->wrangle('review_count')->number();?></span>
                    <?php echo $venue->wrangle('review_count')->appropriate_term();?>
                                </p>
            </div>
            <div class="facilities">
                <div class="facilities-rating">
                    <div class="row">
                        <div class="col-sm-6">
                            <span class="facility"><?php echo $lang->line('common_review_cleanliness');?></span>
                        </div>
                        <div class="col-sm-6 p-0 star_container">
                            <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('cleanliness');?>"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <span class="facility"><?php echo $lang->line('common_review_communication');?></span>
                        </div>
                        <div class="col-sm-6 p-0 star_container">
                            <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('communication');?>"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <span class="facility"><?php echo $lang->line('common_review_accuracy');?></span>
                        </div>
                        <div class="col-sm-6 p-0 star_container">
                            <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('accuracy');?>"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <span class="facility"><?php echo $lang->line('common_review_checkin');?></span>
                        </div>
                        <div class="col-sm-6 p-0 star_container">
                            <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('checkin');?>"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <span class="facility"><?php echo $lang->line('common_review_location');?></span>
                        </div>
                        <div class="col-sm-6 p-0 star_container">
                            <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('location');?>"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <span class="facility"><?php echo $lang->line('common_review_value');?></span>
                        </div>
                        <div class="col-sm-6 p-0 star_container">
                            <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('value');?>"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CSSModules(ReviewSection, styles, {
    allowMultiple: true
});
