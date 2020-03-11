<div class="content venue-css">
    <div id="venue-popup" class="venue-transactional">
        <div class="section-top">
            <div id="r-col" class="wrapper">
                <div class="section-aside venue-details">
                <?php
                    if ($room_count > 0 && $rooms->have_reviews())
                    {
                ?>
                        <div class="reviews-summary clearfix" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">
                            <div class="venue-rating">
                                <h2 class="title"><?php echo $lang->line('common_reviews_venue_rating');?></h2>
                                <p class="rating-value" itemprop="ratingValue"><?php echo $venue->get('review_score');?></p>
                                <div class="venue_overall_rating rating_container" data-venue-rating="<?php echo $venue->get('review_score');?>"></div>
                                <p class="review-amount sidebar">
                                    <span itemprop="reviewCount"><?php echo $venue->wrangle('review_count')->number();?></span> <?php echo $venue->wrangle('review_count')->appropriate_term();?>
                                </p>
                                <meta itemprop="itemReviewed" content="<?php echo $venue->get('name');?>">
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
                        <?php
                    }
                        ?>
                    <div <?php if ($reserved_sticky_menu) echo 'class="sidebar-auto-wrapper"';?>>
                        <div class="book-button-wrapper">
                            <?php
                                if ($reserved_sticky_menu && $room_count > 0)
                                {
                            ?>
                                    <button id="book_now" class="btn btn-block btn-primary bottom-m-1" type="button"><?php echo $lang->line('Book Now');?></button>
                                    <?php
                                }
                                    ?>
                            <a href="/<?php echo $country_lang_url;?>/s/<?php echo $default_tag_slug;?>/<?php echo search_url_encode($venue->get('city') . ', ' . $venue->get('country'));?>?lat=<?php echo $venue->get('lat');?>&amp;lon=<?php echo $venue->get('long');?>">
                                <button class="btn btn-block btn-default bottom-m-1" type="button"><?php echo $lang->line('venues_index_nearby');?></button>
                            </a>
                            <?php
                                if ($reserved_sticky_menu)
                                {
                            ?>
                                    <button class="btn btn-block btn-default write_review bottom-m-1" zc_asset_id="<?php echo $venue->get_asset_id();?>" type="button"><?php echo $lang->line('venues_index_write_review');?></button>
                                    <?php
                                }
                                    ?>
                            <div class="content-message">
                                <span class="icon site-arrow-big-left"></span>
                                <span class="text"><?php echo $lang->line('venues_index_please_select_service');?></span>
                            </div>
                        </div>
                    </div>
                    <div class="map">
                        <div id="map" class="map-in-modal">
                            <?php /*<a class="map-iframe fancybox.iframe" href="//maps.google.com/maps?q=loc:<?php echo $venue->get('lat');?>+<?php echo $venue->get('long');?>&z=15&output=embed">*/?>
                                <div id="static-map">
                                    <img class="static-map-img" src="<?php echo $venue->wrangle('map')->get_url(265, 220, 14, 2, false);?>" title="<?php echo $lang->line('common_map');?>" alt="<?php echo $lang->line('common_map');?>" />
                                    <?php /*<div class="zoom">
                                        <div class="icon site-zoom"></div>
                                    </div>*/?>
                                </div>
                            <?php /*</a>*/?>
                        </div>
                        <div class="map-popup-infowindow hide clearfix">
                            <div class="venue-info">
                                <div class="address">
                                    <strong><?php echo $seo_title;?></strong>
                                    <br />
                                    <?php echo $venue->get('name');?>
                                    <br />
                                    <?php
                                        if ($this->dx_auth->is_admin())
                                        {
                                            echo $venue->get('address');
                                        }
                                        else
                                        {
                                            echo $venue->get_venue_address();
                                        }
                                    ?>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="address">
                        <strong><?php echo $seo_title;?></strong>
                        <br />
                        <?php echo $venue->get('name');?>
                        <br />
                        <?php
                            if ($this->dx_auth->is_admin())
                            {
                                echo $venue->get('address');
                            }
                            else
                            {
                                echo $venue->get_venue_address();
                            }
                        ?>
                        <br />
                    </div>
                    <ul class="contact-links">
                        <li>
                            <?php
                                if (!$reserved_widget_mode)
                                {
                                    echo '<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> ' . $lang->line('common_call_us') . ' <a id="venue_phone_number" href="tel:' . $phone_number . '"> ' . $phone_number_display . '</a>';
                                }
                            ?>
                            <span class="result venue-telephone-number-throttled clearfix hide">
                                <span class="icon site-link-phone"></span>
                                <span class="text"><?php echo $lang->line('venues_index_you_are_blocked');?></span>
                            </span>
                            <span class="result venue-telephone-number-failed clearfix hide">
                                <span class="icon site-link-phone"></span>
                                <span class="text"><?php echo $lang->line('venues_index_phone_unavailable');?></span>
                            </span>
                        </li>
                    </ul>
                    <div class="badges">
                        <ul class="clearfix">
                            <li class="badge">
                                <span class="badge-icon site-badge-booking"></span>
                                <span class="badge-title"><?php echo $lang->line('venues_index_accept_bookings');?></span>
                                <div class="badge-tooltip content-tooltip hide">
                                    <div class="tooltip-content">
                                        <p><?php echo $lang->line('venues_index_online_bookings');?></p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="venue-details-wrapper">
                <div class="wrapper clearfix">
                    <h1 class="venue-title">
                        <?php
                            echo $seo_title;
                            if ($venue->is_true('uses_live_bookings'))
                            {
                                echo '<span class="glyphicon glyphicon-flash room_live_booking_flash" aria-hidden="true" title="' . $lang->line('common_instant_book') . '"></span>';
                            }
                        ?>
                    </h1>
                </div>
            </div>
            <div class="venue-location-wrapper">
                <div class="location">
                    <?php
                        if ($this->dx_auth->is_admin())
                        {
                            echo $venue->get('address');
                        }
                        else
                        {
                            echo $venue->get_venue_address();
                        }
                    ?>
                </div>
            </div>
            <?php
                $url = '';
                if ($venue->get('images')->exist())
                {
                    $url = $venue->wrangle('image')->get_url('large');
                }
                elseif ($rooms->exists_in_db() && $room_count > 0 && $rooms->get_first()->get('images')->exist())
                {
                    $url = $rooms->get_first()->wrangle('image')->get_url('large');
                }
                if ($url != '')
                {
            ?>
                    <div class="venue-gallery-wrapper">
                        <div class="venue-gallery">
                            <div class="image">
                                <?php
                                    if ($this->dx_auth->is_admin())
                                    {
                                        if ($rooms->exists_in_db() && $room_count > 0 && $rooms->get_first()->get('images')->exist())
                                        {
                                            $img = $rooms->get_first()->get('images')->get_first();
                                        }
                                        else
                                        {
                                            $img = $venue->get('images')->get_first();
                                        }
                                        if (!$img->is_null_object())
                                        {
                                ?>
                                            <span class="switchery-label img-flag">Remove</span>
                                            <input type="checkbox" value="<?php echo $img->get_id();?>" name="zc_img_flag" class="zc_img_flag js-switch" data-asset-id="<?php echo $img->get('subject_id');?>" data-class="img-flag" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($img->is_true('flagged'))?' checked':'');?>/>
                                            <span class="switchery-label img-cosmetic">Cosmetic</span>
                                            <input type="checkbox" value="<?php echo $img->get_id();?>" name="zc_img_cosmetic" class="zc_img_cosmetic js-switch" data-asset-id="<?php echo $img->get('subject_id');?>" data-class="img-cosmetic" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($img->is_true('cosmetic'))?' checked':'');?>/>
                                            <?php
                                        }
                                            ?>
                                        <div class="listing-btns">
                                            <a href="<?php echo get_venue_url($venue, true);?>" class="btn btn-xs btn-edit" target="_blank">Edit Venue</a>
                                        </div>
                                        <?php
                                    }
                                        ?>
                                <a class="fancybox" rel="gallery1" href="<?php echo $url;?>">
                                    <div class="pic current" style="background-image: url(<?php echo $url;?>);"></div>
                                </a>
                            </div>
                            <div class="thumbnails">
                                <div class="thumb-wrapper">
                                    <?php
                                        foreach ($venue->get_secondary_images() as $venue_image)
                                        {
                                            $url = $venue_image->get_url('large');
                                    ?>
                                            <div>
                                                <?php
                                                    if ($this->dx_auth->is_admin())
                                                    {
                                                ?>
                                                        <span class="switchery-label img-flag">Remove</span>
                                                        <input type="checkbox" value="<?php echo $venue_image->get_id();?>" name="zc_img_flag" class="zc_img_flag js-switch" data-asset-id="<?php echo $venue_image->get('subject_id');?>" data-class="img-flag" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($venue_image->is_true('flagged'))?' checked':'');?>/>
                                                        <span class="switchery-label img-cosmetic">Cosmetic</span>
                                                        <input type="checkbox" value="<?php echo $venue_image->get_id();?>" name="zc_img_cosmetic" class="zc_img_cosmetic js-switch" data-asset-id="<?php echo $venue_image->get('subject_id');?>" data-class="img-cosmetic" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($venue_image->is_true('cosmetic'))?' checked':'');?>/>
                                                        <?php
                                                    }
                                                        ?>
                                                <a href="<?php echo $url;?>" class="fancybox" rel="gallery1">
                                                    <div class="pic" style="background-image: url(<?php echo $url;?>);" data-src="<?php echo $url;?>"></div>
                                                </a>
                                            </div>
                                            <?php
                                        }
                                        if ($room_count > 0)
                                        {
                                            foreach ($rooms->get_secondary_images() as $image)
                                            {
                                                $url = $image->get_url('large');
                                                ?>
                                                <div>
                                                    <?php
                                                        if ($this->dx_auth->is_admin())
                                                        {
                                                    ?>
                                                            <span class="switchery-label img-flag">Remove</span>
                                                            <input type="checkbox" value="<?php echo $image->get_id();?>" name="zc_img_flag" class="zc_img_flag js-switch" data-asset-id="<?php echo $image->get('subject_id');?>" data-class="img-flag" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($image->is_true('flagged'))?' checked':'');?>/>
                                                            <span class="switchery-label img-cosmetic">Cosmetic</span>
                                                            <input type="checkbox" value="<?php echo $image->get_id();?>" name="zc_img_cosmetic" class="zc_img_cosmetic js-switch" data-asset-id="<?php echo $image->get('subject_id');?>" data-class="img-cosmetic" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($image->is_true('cosmetic'))?' checked':'');?>/>
                                                            <?php
                                                        }
                                                            ?>
                                                    <a href="<?php echo $url;?>" class="fancybox" rel="gallery1">
                                                        <div class="pic" style="background-image: url(<?php echo $url;?>);" data-src="<?php echo $url;?>"></div>
                                                    </a>
                                                </div>
                                                <?php
                                            }
                                        }
                                                ?>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                if ($reserved_sticky_menu)
                {
            ?>
                    <div class="sticky-wrapper">
                        <div class="anchor-links-wrapper">
                            <div class="wrapper clearfix">
                                <ul class="page-nav">
                                    <li class="on">
                                        <span>
                                            <a id="overview_link"><?php echo $lang->line('venues_index_menu_overview');?></a>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <a id="spaces_link"><?php echo $lang->line('venues_index_menu_spaces');?></a>
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <a id="reviews_link"><?php echo $lang->line('common_reviews_upper');?></a>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <?php
                }
                    ?>
        </div>
        <div class="section-middle">
            <div class="wrapper clearfix">
                <div class="section-main">
                    <?php
                        if ($this->dx_auth->is_admin())
                        {
                    ?>
                            <div class="details-section">
                                <div class="admin-mod clearfix">
                                    <label for="zc_venue_approval"><?php echo $lang->line('common_approved');?></label>
                                    <input type="checkbox" value="<?php echo $venue->get_id();?>" name="zc_venue_approval" class="zc_venue_approval js-switch" style="display: none;"
                                        <?php
                                            if ($venue->is_approved())
                                            {
                                                echo ' checked';
                                            }
                                        ?>
                                    />
                                    <label for="zc_venue_agree_to_list"><?php echo $lang->line('common_agreed_to_list');?></label>
                                    <input type="checkbox" value="<?php echo $venue->get_id();?>" name="zc_venue_agree_to_list" class="zc_venue_agree_to_list js-switch" style="display: none;"
                                        <?php
                                            if ($venue->is_true('agree_to_list'))
                                            {
                                                echo ' checked';
                                            }
                                        ?>
                                    />
                                    <button data-id="<?php echo $venue->get_id();?>" class="zc_delete_venue_btn btn btn-danger" type="button"><?php echo $lang->line('common_delete');?></button>
                                </div>
                                <div class="details">
                                    <div class="description long block">
                                        <div class="description-section">
                                            <div class="title-section normal-font"><?php echo $lang->line('common_contact_details');?></div>
                                            <span class="title"><?php echo $venue->get('company_name');?></span>
                                            <br />
                                            <?php echo $venue->wrangle('main_contact_name')->formatted() . ' (' . $venue->get('main_contact') . ')';?>
                                            <br />
                                            <?php echo $venue->wrangle('main_user_email')->get_email_html() . $venue->wrangle('main_user_phone')->get_phone_html();?>
                                            <br />
                                            <?php
                                                if ($venue->get('main_user_role_id') != User::ADMINUSER)
                                                {
                                                    echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $venue->get('main_contact') . '">Adopt</a>';
                                                }
                                            ?>
                                            <br />
                                            <br />
                                            <?php echo $this->load->view(THEME_FOLDER . '/venues/snippets/contact_details', ['data' => $venue], true);?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <?php
                        }
                            ?>
                    <div class="details no-top-border">
                        <div class="description top-p-1">
                            <div class="description-section" id="overview">
                                <div class="title-section normal-font">
                                <?php
                                    echo $lang->line('common_description');
                                    if ($this->dx_auth->is_admin())
                                    {
                                ?>
                                        <div class="admin-mod clearfix">
                                            <label for="zc_venue_non_original_desc">Non-Original Content</label>
                                            <input type="checkbox" value="<?php echo $venue->get_id();?>" name="zc_venue_non_original_desc" class="zc_venue_non_original_desc js-switch" data-colour="#f7462b" style="display: none;"
                                                <?php
                                                    if ($venue->is_true('non_original_desc'))
                                                    {
                                                        echo ' checked';
                                                    }
                                                ?>
                                            />
                                        </div>
                                        <?php
                                    }
                                        ?>
                                </div>
                                <div class="fulfillment">
                                    <span class="normal-font" id="venue_desc"><?php echo $venue->get('description');?></span>
                                    <?php
                                        if ($this->dx_auth->is_admin())
                                        {
                                    ?>
                                            <a id="zc_venue_desc_edit" class="pointer">Edit Text</a>
                                            <textarea id="zc_venue_desc" maxlength="5000" rows="15" class="form-control" style="display: none;"><?php echo $venue->get('description');?></textarea>
                                            <span id="zc_venue_desc_save" class="input-group-addon save_button fa fa-check" style="display: none;" data-id="<?php echo $venue->get_id();?>"></span>
                                            <?php
                                        }
                                            ?>
                                </div>
                            </div>
                        </div>
                        <div class="details-section services" id="spaces">
                            <div class="description long block siblings">
                                <h2 class="section-title"><?php echo $lang->line('venues_index_menu_spaces');?></h2>
                                <?php
                                    if ($room_count > 0)
                                    {
                                ?>
                                        <div class="sibling-usage-container">
                                            <?php
                                                $currentUsageSuperset = '';
                                                foreach ($rooms->object() as $room)
                                                {
                                                    if ($currentUsageSuperset === '')
                                                    {
                                                        echo '<div class="usage-superset-title">' . $room->get('usage_superset_desc') . '</div>';
                                                    }
                                                    if ($room->get('usage_superset') !== $currentUsageSuperset && $currentUsageSuperset !== '')
                                                    {
                                                        echo '</div><div class="sibling-usage-container"><div class="usage-superset-title">' . $room->get('usage_superset_desc') . '</div>';
                                                    }
                                                    echo $this->load->view(THEME_FOLDER . '/rooms/snippets/sibling_spaces_snippet.php', ['room' => $room], true);
                                                    $currentUsageSuperset = $room->get('usage_superset');
                                                }
                                            ?>
                                        </div>
                                        <?php
                                    }
                                        ?>
                            </div>
                        </div>
                    </div>
                    <div class="details-section reviews" id="reviews">
                        <h2 class="section-title">
                            <span class="main-title"><?php echo $lang->line('common_reviews_upper');?></span>
                            <span class="note"><?php echo $lang->line('common_reviews_written');?></span>
                        </h2>
                        <div class="detailed-reviews-summary clearfix" id="reviews-section">
                            <div class="about-venue">
                                <?php
                                    if ($room_count > 0 && $rooms->have_reviews())
                                    {
                                ?>
                                        <div class="venue-rating clearfix">
                                            <p class="rating-value"><?php echo $venue->get('review_score');?></p>
                                            <h2 class="title"><?php echo $lang->line('common_reviews_venue_rating');?></h2>
                                            <div class="venue_overall_rating rating_container" data-venue-rating="<?php echo $venue->get('review_score');?>"></div>
                                            <p class="review-amount"><?php echo $lang->line('common_reviews_based_on', $venue->wrangle('review_count')->formatted());?></p>
                                        </div>
                                        <div class="facilities <?php echo (($reserved_sticky_menu)?'col-sm-6':'col-sm-12');?>">
                                            <ul class="facilities-rating">
                                                <li>
                                                    <span class="facility"><?php echo $lang->line('common_review_cleanliness');?></span>
                                                    <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('cleanliness');?>"></div>
                                                </li>
                                                <li>
                                                    <span class="facility"><?php echo $lang->line('common_review_communication');?></span>
                                                    <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('communication');?>"></div>
                                                </li>
                                                <li>
                                                    <span class="facility"><?php echo $lang->line('common_review_accuracy');?></span>
                                                    <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('accuracy');?>"></div>
                                                </li>
                                                <li>
                                                    <span class="facility"><?php echo $lang->line('common_review_checkin');?></span>
                                                    <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('checkin');?>"></div>
                                                </li>
                                                <li>
                                                    <span class="facility"><?php echo $lang->line('common_review_location');?></span>
                                                    <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('location');?>"></div>
                                                </li>
                                                <li>
                                                    <span class="facility"><?php echo $lang->line('common_review_value');?></span>
                                                    <div class="rating_container subrating_container" data-venue-subrating="<?php echo $rooms->get_overall_score('value');?>"></div>
                                                </li>
                                            </ul>
                                        </div>
                                        <?php
                                    }
                                    else
                                    {
                                        ?>
                                        <div class="venue-no-rating clearfix">
                                            <h2 class="title"><?php echo $lang->line('venues_index_reviews_venue_not_rated');?></h2>
                                        </div>
                                        <?php
                                    }
                                    if ($reserved_sticky_menu)
                                    {
                                        ?>
                                        <div id="write_review_container" class="col-sm-6 text-right">
                                            <span><?php echo $lang->line('venues_index_reviews_have_you_used');?></span>
                                            <span>
                                                <a class="write_review" zc_asset_id="<?php echo $venue->get_asset_id();?>" data-toggle="modal" data-target="#mainModal" title="<?php echo $lang->line('venues_write_review');?>"><?php echo $lang->line('venues_write_review');?></a>
                                            </span>
                                        </div>
                                        <?php
                                    }
                                        ?>
                            </div>
                        </div>
                        <?php
                            if ($room_count > 0)
                            {
                                foreach ($rooms->object() as $room)
                                {
                                    $room_reviews = $room->get('reviews');
                                    if ($room_reviews->exist())
                                    {
                                        foreach ($room_reviews->object() as $review)
                                        {
                                            echo $this->load->view(THEME_FOLDER . '/rooms/snippets/room_reviews_snippet.php', ['room' => $room, 'review' => $review]);
                                        }
                                    }
                                }
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>