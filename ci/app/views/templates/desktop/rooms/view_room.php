<div class="content venue-css">
    <div class="zipcube-popup">
        <div id="offer-popup" class="clearfix offer-popup">
            <div class="popup-content">
                <div class="section-top">
                    <div id="r-col" class="wrapper">
                        <div id="dp" class="section-aside section-higher b-sidebar">
                            <?php
                                if (((!$room->is_null('hourly_rate') && $room->get('hourly_rate') > 0) || (!$room->is_null('daily_rate') && $room->get('daily_rate') > 0)) && $room->get('daily_rate') < 5000 && $room->get('primary_vertical_id') != Vertical::OFFICE)
                                {
                                    $sidebar_class = "book_now_sidebar";
                            ?>
                                    <div class="b-important">
                                        <div id="book_it" class="booking-section">
                                            <div class="toptitle">
                                                <span><?php echo $lang->line('common_book');?></span>
                                                <br />
                                                <?php echo $room->get('usage_superset_itemname');?>
                                            </div>
                                            <div class="tab-content">
                                                <div id="back" class="back_room">
                                                    <a class="back_btn"><?php echo $lang->line('common_back');?></a>
                                                    <div class="title_mob"><?php echo $lang->line('rooms_index_select_date_time');?></div>
                                                </div>
                                                <div id="booking_type_options" class="ament_title">
                                                  <div class="btn-group btn-group-justified" role="group" aria-label="...">
                                                    <div class="btn-group" role="group">
                                                        <button id="hourly_booking_toggle" type="button"
                                                            <?php
                                                                if ($room->get('hourly_rate') == 0)
                                                                {
                                                                    echo ' class="btn btn-block active btn-toggle-disabled disabled" data-toggle="tooltip" data-placement="bottom" title="' . $lang->line('rooms_hourly_unavailable') . '" disabled';
                                                                }
                                                                else
                                                                {
                                                                    echo ' class="btn btn-block active btn-toggle"';
                                                                }
                                                            ?>
                                                        ><?php echo $lang->line('rooms_index_hourly');?></button>
                                                    </div>
                                                    <div class="btn-group" role="group">
                                                        <button id="daily_booking_toggle" type="button"
                                                            <?php
                                                                if ($room->get('daily_rate') == 0)
                                                                {
                                                                    echo ' class="btn btn-block btn-toggle-disabled disabled" data-toggle="tooltip" data-placement="bottom" title="' . $lang->line('rooms_daily_unavailable') . '" disabled';
                                                                }
                                                                else
                                                                {
                                                                    echo ' class="btn btn-block btn-toggle"';
                                                                }
                                                            ?>
                                                        ><?php echo $lang->line('rooms_index_daily');?></button>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div id="date-selectors">
                                                    <div id="checkin-selector" class="check-in">
                                                        <div class="main-icon"></div>
                                                        <div class="title">
                                                            <span id="startdate"><?php echo $lang->line('rooms_index_checkin_date');?>:</span>
                                                            <input id="checkin" name="checkin" value="<?php echo $lang->line('common_click_here');?>" />
                                                            <div id="hourly_bubble_book" class="bubble-book bubble-book-position hide">
                                                                <div class="bubble-book-text"><?php echo $lang->line('rooms_index_select_checkin_date');?></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="checkout-selector" class="check-in" style="display: none;">
                                                        <div class="main-icon"></div>
                                                        <div class="title">
                                                            <span id="enddate"><?php echo $lang->line('rooms_index_checkout_date');?>:</span>
                                                            <input id="checkout" name="checkout" value="<?php echo $lang->line('common_click_here');?>" />
                                                            <div id="daily_bubble_book" class="bubble-book bubble-book-position hide">
                                                                <div class="bubble-book-text"><?php echo $lang->line('rooms_index_checkout_date');?></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div id="checkin-container" style="display: none;"></div>
                                                    <div id="checkout-container" style="display: none;"></div>
                                                </div>
                                                <div id="slots"></div>
                                                <div class="quantity-selection clearfix">
                                                    <div id="guest_numbers">
                                                        <div class="label">
                                                            <span><?php echo $lang->line('common_attendees');?>:</span>
                                                        </div>
                                                        <div class="select select-block dropdown-small">
                                                            <select id="number_of_guests" name="number_of_guests">
                                                                <option value="0"><?php echo $lang->line('common_select');?>...</option>
                                                                <?php
                                                                    for ($i = 1; $i <= $room->get('max_capacity'); ++$i)
                                                                    {
                                                                ?>
                                                                        <option value="<?php echo $i;?>" <?php if (isset($guests) && $i == $guests) { echo 'selected="selected"';}?>><?php echo $i;?></option>
                                                                        <?php
                                                                    }
                                                                        ?>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="clear-all" class="clear-selection clearfix"><?php echo $lang->line('common_clear_all');?></div>
                                                <div id="booking-options" class="total">
                                                    <div id="book_it_bar">
                                                        <div class="centering-wrapper">
                                                            <img id="price-loader" title="<?php echo $lang->line('rooms_spin');?>" alt="<?php echo $lang->line('rooms_spin');?>" src="/images/page2_spinner.gif" style="display:none; margin-bottom:10px;">
                                                            <div class="pay"><?php echo $lang->line('common_total');?>
                                                                <strong><?php echo $room->get('currency_symbol_left');?> <span id="total_price" class="enabled">-</span> <?php echo $room->get('currency_symbol_right');?></strong>
                                                            </div>
                                                            <div class="discount-type s_houre" id="zc_duration_wrapper" style="display: none;">
                                                                <span id="s_houre"></span><span class="h_text" id="hourse_title"><?php echo $lang->line('common_hour_short');?></span>
                                                            </div>
                                                            <div class="discount-type duration_days" id="zc_days_duration_wrapper" style="display: none;">
                                                                <span id="days"></span><span class="h_text" id="hourse_title"><?php echo $lang->line('common_day_short');?></span>
                                                            </div>
                                                        </div>
                                                        <span id="book_it_button" class="action">
                                                            <span class="appointment"><?php echo $lang->line('common_book');?></span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                }
                                    ?>
                            <!--<div class="c-important absolute enquire-help<?php //echo (($room->get('primary_vertical_id') == Vertical::OFFICE)?' reposition':'');?>">
                                <div class="sidebar-auto-wrapper">
                                    <div class="book-button-wrapper">
                                        <?php
                                            // if (!$reserved_widget_mode)
                                            // {
                                            //     echo '<span class="glyphicon glyphicon-earphone" aria-hidden="true"></span> ' . $lang->line('common_call_us') . ' <a id="room_phone_number" href="tel:' . $phone_number . '">' . $phone_number_display . '</a>';
                                            // }
                                            // echo '<button id="enquire_now" class="btn btn-default btn-block enquiries-button bottom-m-1 top-m-1" data-modal="enquire_now" type="button">';
                                            // if ($room->get('primary_vertical_id') == Vertical::OFFICE || $room->get('primary_vertical_id') == Vertical::PARTY)
                                            // {
                                            //     echo 'Book a viewing';
                                            // }
                                            // else
                                            // {
                                            //     echo 'Enquire Now';
                                            // }
                                            // echo '</button>';
                                            // /* <button id="request_to_book" class="btn btn-default btn-block enquiries-button" data-modal="request_to_book" type="button">Request to Book</button>*/
                                            // if ($past_bookings >= 10)
                                            // {
                                            //     echo '<div class="content-message text-center small">' . $past_bookings . ' clients already booked this space.</div>';
                                            // }
                                        ?>
                                    </div>
                                </div>
                                    <?php /* EXTRA BUTTONS FOR FUTURE SHARING CAPABILITIES
                                    <div class="btn-group btn-group-justified" role="group" aria-label="..." style="border-top: 1px solid #ddd;">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default" style="border:none">Left</button>
                                      </div>
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default" style="border-right: 1px solid #DDD;border-left: 1px solid #DDD;border-top: none;border-bottom: none;">Middle</button>
                                      </div>
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-default dropdown-toggle" style="border:none" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                          ... More
                                          <span class="caret"></span>
                                        </button>
                                        <ul class="dropdown-menu">
                                          <li><a href="#">Dropdown link</a></li>
                                          <li><a href="#">Dropdown link</a></li>
                                        </ul>
                                      </div>
                                    </div> */ ?>
                            </div>-->
                            <!--<div id="review-highlights" class="absolute review-highlights"></div>-->
                            <?php /*
                            ---------------------------------------------------------------
                            NOTE: Code below for ipad_promo box under room page booking sidebar
                            ---------------------------------------------------------------
                            <div class="d-important absolute hidden-xs ipad_promo room_promo_box<?php echo (($room->get('primary_vertical_id') == Vertical::OFFICE)?' reposition':'');?>">
                                <div class="room_promo_text">Book Today<br>and Win an iPad mini!</div>
                                <div class="room_promo_picture"></div>
                            </div> */ ?>
                        </div>
                        <div class="secondary-sidebar<?php echo ((isset($sidebar_class))?' ' . $sidebar_class:'');?>">
                            <div class="space-sidebar">
                                <div class="space-sidebar__wrapper">
                                    <?php
                                        if ($room->get('primary_vertical_id') == Vertical::OFFICE)
                                        {
                                            ?>
                                            <div class="space-sidebar__main-action">
                                                <button class="btn btn-primary btn-block enquiries-button" data-modal="request_to_book" type="button"><span class="glyphicon glyphicon-flash"></span> <?php echo $lang->line('rooms_index_book_a_viewing');?></button>
                                            </div>
                                            <div class="space-sidebar__why-zipcube">
                                                <p>
                                                    <strong><?php echo $lang->line('rooms_why_zipcube');?></strong>
                                                </p>
                                                <ul>
                                                    <li><?php echo $lang->line('rooms_why_zipcube_office_1');?></li>
                                                    <li class="custom-tooltip" title="<?php echo $lang->line('rooms_why_zipcube_office_2a');?>">
                                                        <span class="underline"><?php echo $lang->line('rooms_why_zipcube_office_2');?></span>
                                                    </li>
                                                    <li><?php echo $lang->line('rooms_why_zipcube_office_3');?></li>
                                                    <li class="custom-tooltip" title="<?php echo $lang->line('rooms_why_zipcube_office_4a');?>">
                                                        <span class="underline"><?php echo $lang->line('rooms_why_zipcube_office_4');?></span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <?php
                                        }
                                        elseif ($room->get('primary_vertical_id') == Vertical::DINING || $room->get('primary_vertical_id') == Vertical::PARTY)
                                        {
                                            ?>
                                            <div class="space-sidebar__main-action">
                                                <button class="btn btn-primary btn-block enquiries-button" data-modal="message_host" type="button"><?php echo $lang->line('rooms_index_contact_venue');?></button>
                                            </div>
                                            <div class="space-sidebar__why-zipcube">
                                                <p>
                                                    <strong><?php echo $lang->line('rooms_why_zipcube');?></strong>
                                                </p>
                                                <ul>
                                                    <li class="custom-tooltip" title="<?php echo $lang->line('rooms_why_zipcube_meeting_1a');?>">
                                                        <span class="underline"><?php echo $lang->line('rooms_why_zipcube_event_1');?></span>
                                                    </li>
                                                    <li class="custom-tooltip" title="<?php echo $lang->line('rooms_why_zipcube_event_2a');?>">
                                                        <span class="underline"><?php echo $lang->line('rooms_why_zipcube_event_2');?></span>
                                                    </li>
                                                    <li><?php echo $lang->line('rooms_why_zipcube_event_3');?></li>
                                                    <li><?php echo $lang->line('rooms_why_zipcube_event_4');?></li>
                                                </ul>
                                            </div>
                                            <?php
                                        }
                                        elseif ($room->get('primary_vertical_id') == Vertical::MEETING)
                                        {
                                            ?>
                                            <div class="space-sidebar__why-zipcube">
                                                <p>
                                                    <strong><?php echo $lang->line('rooms_why_zipcube');?></strong>
                                                </p>
                                                <ul>
                                                    <li class="custom-tooltip" title="<?php echo $lang->line('rooms_why_zipcube_meeting_1a');?>">
                                                        <span class="underline"><?php echo $lang->line('rooms_why_zipcube_meeting_1');?></span>
                                                    </li>
                                                    <li><?php echo $lang->line('rooms_why_zipcube_meeting_2');?></li>
                                                    <li class="custom-tooltip" title="<?php echo $lang->line('rooms_why_zipcube_meeting_3a');?>">
                                                        <span class="underline"><?php echo $lang->line('rooms_why_zipcube_meeting_3');?></span>
                                                    </li>
                                                    <li><?php echo $lang->line('rooms_why_zipcube_meeting_4');?></li>
                                                </ul>
                                            </div>
                                            <?php
                                        }
                                    ?>
                                    <div class="space-sidebar__ask-question">
                                        <p>
                                            <strong><?php echo $lang->line('rooms_need_help');?></strong>
                                        </p>
                                        <!--<button id="ask_question_by_home" class="btn btn-default btn-block" type="button"><span class="glyphicon glyphicon-earphone"></span> <?php echo $lang->line('rooms_need_help_ask_question');?></button>-->
                                        <div id="phone_number" class="space-sidebar__ask-question__number"><?php echo '<span class="space-sidebar__ask-question__number__bold">' . $lang->line('common_call') . ' <a id="room_phone_number" href="tel:' . $phone_number . '">' . $phone_number_display . '</a></span><br />' . $lang->line('rooms_need_help_ask_question__inner_text') . ((isset($tracking_cookie_id))?' <b>' . $tracking_cookie_id . '</b>':'');?></div>
                                    </div>
                                    <div class="space-sidebar__contact-venue">
                                        <button id="contact_venue" class="btn btn-default btn-block enquiries-button" data-modal="message_host" type="button"><?php echo $lang->line('rooms_index_contact_venue');?></button>
                                    </div>
                                    <div class="space-sidebar__on-peoples-minds">
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <p><?php echo $lang->line('rooms_on_peoples_minds', $room->get('usage_superset_itemname'));?></p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-9 right-p-0">
                                                <p class="highlight-green"><?php echo $lang->line('rooms_on_peoples_minds_viewed', $room->wrangle('page_views')->formatted());?></p>
                                            </div>
                                            <div class="col-sm-3">
                                                <img src="/css/images/spaces/stopwatch.svg" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="space-sidebar__wishlist">
                                    <div class="space-sidebar__wishlist__wrapper">
                                        <button id="toggle_favourite" class="btn btn-default btn-block" data-room-id="<?php echo $room->get_id();?>" type="button">
                                            <span id="favourite-heart" class="glyphicon glyphicon-heart-empty"></span> <span id="wishlist_text"><?php echo $lang->line('rooms_save_to_wishlist');?></span>
                                        </button>
                                        <div class="space-sidebar__wishlist__count">
                                            <span id="favourite-count"></span>
                                        </div>
                                    </div>
                                    <div class="space-sidebar__share-buttons">
                                        <div class="col-sm-4 p-0">
                                            <a class="btn btn-tab btn-block" href="mailto:?bcc=info@zipcube.com&subject=<?php echo $lang->line('rooms_email_subject', ((isset($user))?$user->wrangle('full_name')->formatted():$lang->line('rooms_email_person')));?>&body=<?php echo $lang->line('rooms_email_body', ((isset($user))?$user->wrangle('full_name')->formatted():$lang->line('rooms_email_person')));?>%0A%0A<?php echo $room->get('title');?>%20at%20<?php echo $room->get('venue_name');?>%0A<?php echo get_room_url($room);?>">
                                                <span class="glyphicon glyphicon-envelope"></span> <?php echo $lang->line('rooms_share_email');?>
                                            </a>
                                        </div>
                                        <div class="col-sm-4 p-0">
                                            <a href="http://www.facebook.com/dialog/send?app_id=286304788451093&link=<?php echo urlencode(current_url());?>&redirect_uri=<?php echo urlencode(current_url());?>" class="btn btn-tab btn-block" target="_blank">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="pluginButtonIconSVG glyphicon">
                                                    <path fill="#70838c" d="
                                                        M5.4743532,13.6041412 C6.2578121,13.8601407 7.10947545,14 8,14
                                                        C11.8662465,14 15,11.3637984 15,8.03240966 C15,4.70069681
                                                        11.8662465,2 8,2 C4.1337535,2 1,4.70069681 1,8.03240966
                                                        C1,9.70838442 1.79313872,11.2084105 3.07366666,12.2853409
                                                        L3.07366666,15.048 L5.4743532,13.6041412 Z M8.65733333,9.78033333
                                                        L6.934,8.005 L3.61466667,9.825 L7.254,5.99633333
                                                        L8.97733333,7.77133333 L12.2963333,5.95166667
                                                        L8.65733333,9.78033333 Z">
                                                    </path>
                                                </svg>
                                                <?php echo $lang->line('rooms_share_messenger');?>
                                            </a>
                                        </div>
                                        <div id="share_more" class="col-sm-4 p-0">
                                            <a href="#" class="btn btn-tab btn-block"><span class="glyphicon glyphicon-option-horizontal"></span> <?php echo $lang->line('rooms_share_more');?></a>
                                            <span id="share_more_dropdown_caret" class="space-sidebar__share-buttons__share_more_dropdown_caret"></span>
                                            <div id="share_more_dropdown" class="space-sidebar__share-buttons__share_more_dropdown">
                                                <ul>
                                                    <li>
                                                        <a class="fb-share" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(current_url());?>" target="_blank">Facebook</a>
                                                    </li>
                                                    <li>
                                                        <a href="https://twitter.com/home?status=<?php echo urlencode(current_url());?>" target="_blank">Twitter</a>
                                                    </li>
                                                    <li>
                                                        <a href="https://plus.google.com/share?url=<?php echo urlencode(current_url());?>" target="_blank">Google+</a>
                                                    </li>
                                                    <li>
                                                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode(current_url());?>&title=<?php echo $room->get('title');?>%20at%20<?php echo $room->get('venue_name');?>&summary=<?php echo $room->get('title');?>%20at%20<?php echo $room->get('venue_name');?>&source=<?php echo base_url();?>" target="_blank">LinkedIn</a>
                                                    </li>
                                                    <li>
                                                        <a href="https://pinterest.com/pin/create/button/?url=<?php echo urlencode(current_url());?>&media=<?php echo $room->wrangle('image')->get_url('medium');?>&description=<?php echo $room->get('title');?>%20at%20<?php echo $room->get('venue_name');?>" target="_blank">Pinterest</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="offer-details-wrapper">
                        <div class="wrapper clearfix">
                            <h1 class="offer-name">
                                <?php
                                    echo $room->wrangle('defaulted_name')->value() . ', ' . $room->get('venue_city');
                                    if ($room->is_true('uses_live_bookings'))
                                    {
                                        echo '<span class="glyphicon glyphicon-flash room_live_booking_flash" aria-hidden="true" title="' . $lang->line('common_instant_book') . '"></span>';
                                    }
                                ?>
                                <span id="deal-label-container"></span>
                            </h1>
                        </div>
                    </div>
                    <div class="venue-location-wrapper">
                        <div class="location">
                            <a id="map_link" href="#">
                                <?php
                                    if ($this->dx_auth->is_admin())
                                    {
                                        echo $room->get('address');
                                    }
                                    else
                                    {
                                        echo $room->get_venue_address();
                                    }
                                ?>
                            </a>
                        </div>
                    </div>
                    <div class="venue-rating-wrapper">
                        <?php
                            if (isset($venue_rooms) && $venue_rooms->have_reviews())
                            {
                        ?>
                                <div class="star_rating" zc_rating="<?php echo $venue->get('review_score');?>">
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                    <span>&#x2606;</span>
                                </div>
                                <span class="review-amount">
                                    <a href="#reviews">
                                        <span><?php echo $venue->wrangle('review_count')->formatted();?></span>
                                        <span class="icon site-arrow-more-right-tiny"></span>
                                    </a>
                                </span>
                                <?php
                            }
                                ?>
                        <span class="review-amount"><?php echo ((isset($tracking_cookie_id))?'<span>ID: ' . $tracking_cookie_id . '</span>':'');?></span>
                    </div>
                    <div class="venue-gallery-wrapper">
                        <div class="venue-gallery">
                            <div class="image">
                                <?php
                                    $url = $room->wrangle('image')->get_url('large');
                                    if ($this->dx_auth->is_admin())
                                    {
                                        $img = $room->get('images')->get_first();
                                        if (!$img->is_null_object())
                                        {
                                ?>
                                            <span class="switchery-label img-flag">Remove</span>
                                            <input type="checkbox" value="<?php echo $img->get_id();?>" name="zc_img_flag" class="zc_img_flag js-switch" data-asset-id="<?php echo $img->get('subject_id');?>" data-class="img-flag" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($img->is_true('flagged'))?' checked':'');?>/>
                                            <span class="switchery-label img-cosmetic">Cosmetic</span>
                                            <input type="checkbox" value="<?php echo $img->get_id();?>" name="zc_img_cosmetic" class="zc_img_cosmetic js-switch" data-asset-id="<?php echo $img->get('subject_id');?>" data-class="img-cosmetic" data-size="small" data-colour="#f7462b" style="display: none;"<?php echo (($img->is_true('cosmetic'))?' checked':'');?>/>
                                            <?php
                                        }
                                        if (isset($attributes) && $attributes->exists_in_db())
                                        {
                                            echo '<div class="attribute-btns">';
                                            foreach ($attributes->object() as $attribute)
                                            {
                                                $selectedAttribute = false;
                                                if (in_array($attribute->get_id(), $asset_attributes))
                                                {
                                                    $selectedAttribute = true;
                                                }
                                                echo '<button class="btn btn-xs btn-attribute';
                                                if ($selectedAttribute)
                                                {
                                                    echo ' selected';
                                                }
                                                echo '" type="button" data-assetid="' . $room->get_asset_id() . '" data-attributeid="' . $attribute->get_id() . '" data-state="' . (($selectedAttribute)?'1"><i class="state-icon glyphicon glyphicon-check"></i>':'0"><i class="state-icon glyphicon glyphicon-unchecked"></i>') . ' ' . $attribute->get('desc') . '</button>';
                                            }
                                            echo '</div>';
                                        }
                                        if (!$img->is_null_object() && isset($configs) && $configs->exists_in_db())
                                        {
                                            echo '<div class="config-btns">';
                                            foreach ($configs->object() as $config)
                                            {
                                                $selectedConfig = false;
                                                if ($img->get('configuration_id') == $config->get_id())
                                                {
                                                    $selectedConfig = true;
                                                }
                                                echo '<button class="btn btn-xs btn-config';
                                                if ($selectedConfig)
                                                {
                                                    echo ' selected';
                                                }
                                                echo '" type="button" data-id="' . $img->get_id() . '" data-asset-id="' . $img->get('subject_id') . '" data-configid="' . $config->get_id() . '" data-state="' . (($selectedConfig)?'1"><i class="state-icon glyphicon glyphicon-check"></i>':'0"><i class="state-icon glyphicon glyphicon-unchecked"></i>') . ' ' . $config->get('desc') . '</button>';
                                            }
                                            echo '</div>';
                                        }
                                            ?>
                                        <div class="listing-btns">
                                            <a href="<?php echo get_room_url($room, '', true);?>" class="btn btn-xs btn-edit" target="_blank">Edit Room</a>
                                            <a href="<?php echo get_venue_url($venue, true);?>" class="btn btn-xs btn-edit" target="_blank">Edit Venue</a>
                                        </div>
                                        <?php
                                    }
                                        ?>
                                <a class="fancybox" rel="<?php echo $room->get_id();?>" href="<?php echo $url;?>">
                                    <div class="pic current" rel="gallery1" style="background-image: url(<?php echo $url;?>);"></div>
                                </a>
                            </div>
                            <div class="thumbnails">
                                <div class="thumb-wrapper">
                                    <?php
                                        foreach ($room->get_secondary_images() as $image)
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
                                                <a href="<?php echo $url;?>" class="fancybox" rel="<?php echo $room->get_id();?>">
                                                    <div class="pic" style="background-image: url(<?php echo $url;?>);" data-src="<?php echo $url;?>"></div>
                                                </a>
                                            </div>
                                            <?php
                                        }
                                            ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php
                    if ($reserved_sticky_menu)
                    {
                ?>
                        <div class="sticky-wrapper">
                            <div class="anchor-links-wrapper">
                                <div class="wrapper clearfix">
                                    <ul class="page-nav">
                                        <li class="on">
                                            <span>
                                                <a id="details_link"><?php echo $lang->line('common_details');?></a>
                                            </span>
                                        </li>
                                        <?php
                                            if (isset($venue_rooms) && $venue_rooms->have_reviews())
                                            {
                                        ?>
                                                <li>
                                                    <span>
                                                        <a id="reviews_link"><?php echo $lang->line('common_review_upper');?></a>
                                                    </span>
                                                </li>
                                                <?php
                                            }
                                                ?>
                                        <li>
                                            <span>
                                                <a id="venue_link"><?php echo $lang->line('common_venue');?></a>
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                <a id="venue_link"><?php echo $lang->line('rooms_index_menu_location');?></a>
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
                <div class="section-middle" id="details">
                    <div class="wrapper clearfix">
                        <div class="section-main">
                            <div class="details-section">
                                <div class="pricing-module clearfix">
                                    <?php
                                        if ($room->get('monthly_rate') != 0)
                                        {
                                    ?>
                                            <div class="module-unit price">
                                                <span class="title"><?php echo $lang->line('common_month');?></span>
                                                <span class="value-container">
                                                    <?php
                                                        if (!$room->is_null('user_discount'))
                                                        {
                                                            echo '<span class="old-price">' . $room->wrangle('monthly_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_monthly_rate')->formatted(true) . '</span>';
                                                        }
                                                        else
                                                        {
                                                            echo $room->wrangle('monthly_rate')->formatted(true);
                                                        }
                                                    ?>
                                                </span>
                                            </div>
                                            <?php
                                        }
                                        else
                                        {
                                            if ($room->get('hourly_rate') != 0)
                                            {
                                            ?>
                                                <div class="module-unit price">
                                                    <span class="title"><?php echo $lang->line('common_hour');?></span>
                                                    <span class="value-container">
                                                        <?php
                                                            if (!$room->is_null('user_discount'))
                                                            {
                                                                echo '<span class="old-price">' . $room->wrangle('hourly_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_hourly_rate')->formatted(true) . '</span>';
                                                            }
                                                            else
                                                            {
                                                                echo $room->wrangle('hourly_rate')->formatted(true);
                                                            }
                                                        ?>
                                                    </span>
                                                </div>
                                                <?php
                                            }
                                            if ($room->get('daily_rate') != 0)
                                            {
                                                ?>
                                                <div class="module-unit price">
                                                    <span class="title"><?php echo $lang->line('rooms_index_daily');?></span>
                                                    <span id="daily-price" class="value-container">
                                                        <?php
                                                            if (!$room->is_null('user_discount'))
                                                            {
                                                                echo '<span class="old-price">' . $room->wrangle('daily_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_daily_rate')->formatted(true) . '</span>';
                                                            }
                                                            else
                                                            {
                                                                echo $room->wrangle('daily_rate')->formatted(true);
                                                            }
                                                        ?>
                                                    </span>
                                                </div>
                                                <?php
                                            }
                                        }
                                        if (($room->get('primary_vertical_id') == Vertical::MEETING || $room->get('primary_vertical_id') == Vertical::PARTY) && $room->get('daily_delegate_rate') != 0)
                                        {
                                                ?>
                                            <div class="module-unit price">
                                                <span class="title"><?php echo $lang->line('rooms_index_day_delegate');?></span>
                                                <span class="value-container">
                                                    <?php
                                                        if (!$room->is_null('user_discount'))
                                                        {
                                                            echo '<span class="old-price">' . $room->wrangle('daily_delegate_rate')->formatted(true) . '</span><span>' . $room->wrangle('discount_daily_delegate_rate')->formatted(true) . '</span>';
                                                        }
                                                        else
                                                        {
                                                            echo $room->wrangle('daily_delegate_rate')->formatted(true);
                                                        }
                                                    ?>
                                                </span>
                                            </div>
                                            <?php
                                        }
                                        if ($room->get('primary_vertical_id') == Vertical::DINING && !$room->is_null('minimum_spend') && $room->get('minimum_spend') > 0)
                                        {
                                            ?>
                                            <div class="module-unit price">
                                                <span class="title"><?php echo $lang->line('rooms_index_min_spend');?></span>
                                                <span class="value-container"><?php echo $room->wrangle('minimum_spend')->formatted(true);?></span>
                                            </div>
                                            <?php
                                        }
                                        if (($room->get('primary_vertical_id') == Vertical::OFFICE && $room->get('office_type_id') != Office_Type::PRIVATEOFFICE || $room->get('primary_vertical_id') != Vertical::DINING) && !$room->is_null('minimum_hourly_stay') && $room->get('minimum_hourly_stay') > 60)
                                        {
                                            ?>
                                            <div class="module-unit duration">
                                                <span class="title"><?php echo $lang->line('rooms_index_min_duration');?></span>
                                                <span class="value-container"><?php echo $room->wrangle('minimum_hourly_stay')->formatted();?></span>
                                            </div>
                                            <?php
                                        }
                                        if ($room->get('primary_vertical_id') == Vertical::OFFICE)
                                        {
                                            if (!$room->is_null('minimum_term') && $room->get('minimum_term') > 0)
                                            {
                                            ?>
                                                <div class="module-unit price">
                                                    <span class="title"><?php echo $lang->line('rooms_index_min_term');?></span>
                                                    <span class="value-container"><?php echo $room->wrangle('minimum_term')->formatted();?></span>
                                                </div>
                                                <?php
                                            }
                                            if (!$room->is_null('num_of_desks') && $room->get('num_of_desks') > 0)
                                            {
                                                ?>
                                                <div class="module-unit price">
                                                    <span class="title"><?php echo $lang->line('rooms_index_num_desks');?></span>
                                                    <span class="value-container"><?php echo $room->get('num_of_desks');?></span>
                                                </div>
                                                <?php
                                            }
                                            elseif ($room->get('office_type_id') == Office_Type::PRIVATEOFFICE)
                                            {
                                                if (!$room->is_null('office_size') && $room->get('office_size') != 0 && !$room->is_null('office_size_unit'))
                                                {
                                                ?>
                                                    <div class="module-unit price">
                                                        <span class="title"><?php echo $lang->line('rooms_index_size');?></span>
                                                        <span class="value-container"><?php echo format_price($room->get('office_size')) . ' ' . str_replace("2", "<sup>2</sup>", $room->get('office_size_unit'));?></span>
                                                    </div>
                                                    <?php
                                                }
                                                if (!$room->is_null('max_capacity') && $room->get('max_capacity') != 0)
                                                {
                                                    ?>
                                                    <div class="module-unit price">
                                                        <span class="title"><?php echo $lang->line('rooms_index_capacity');?></span>
                                                        <span class="value-container"><?php echo $room->get('max_capacity');?></span>
                                                    </div>
                                                    <?php
                                                }
                                            }
                                        }
                                        if ($this->dx_auth->is_admin())
                                        {
                                            if ($room->get('venue_monthly_rate') != 0)
                                            {
                                                    ?>
                                                <div class="module-unit price">
                                                    <span class="title">Venue <?php echo $lang->line('common_month');?></span>
                                                    <span class="value-container"><?php echo $room->wrangle('venue_monthly_rate')->formatted(true);?></span>
                                                </div>
                                                <?php
                                            }
                                            else
                                            {
                                                if ($room->get('venue_hourly_rate') != 0)
                                                {
                                                ?>
                                                    <div class="module-unit price">
                                                        <span class="title">Venue <?php echo $lang->line('common_hour');?></span>
                                                        <span class="value-container"><?php echo $room->wrangle('venue_hourly_rate')->formatted(true);?></span>
                                                    </div>
                                                    <?php
                                                }
                                                if ($room->get('venue_daily_rate') != 0)
                                                {
                                                    ?>
                                                    <div class="module-unit price">
                                                        <span class="title">Venue <?php echo $lang->line('rooms_index_daily');?></span>
                                                        <span class="value-container"><?php echo $room->wrangle('venue_daily_rate')->formatted(true);?></span>
                                                    </div>
                                                    <?php
                                                }
                                                if (($room->get('primary_vertical_id') == Vertical::MEETING || $room->get('primary_vertical_id') == Vertical::PARTY) && $room->get('venue_daily_delegate_rate') != 0)
                                                {
                                                    ?>
                                                    <div class="module-unit price">
                                                        <span class="title">Venue <?php echo $lang->line('rooms_index_day_delegate');?></span>
                                                        <span class="value-container"><?php echo $room->wrangle('venue_daily_delegate_rate')->formatted(true);?></span>
                                                    </div>
                                                    <?php
                                                }
                                            }
                                        }
                                                    ?>
                                </div>
                                <?php
                                    if ($this->dx_auth->is_admin())
                                    {
                                ?>
                                        <div class="admin-mod clearfix">
                                            <label for="zc_venue_approval">Venue Approval</label>
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
                                            <label for="zc_room_approval">Room Approval</label>
                                            <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_room_approval" class="zc_room_approval js-switch" style="display: none;"
                                                <?php
                                                    if ($room->is_approved())
                                                    {
                                                        echo ' checked';
                                                    }
                                                ?>
                                            />
                                            <label for="zc_room_approval">Room Hidden</label>
                                            <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_room_hidden" class="zc_room_hidden js-switch" style="display: none;"
                                                <?php
                                                    if ($room->is_true('hidden'))
                                                    {
                                                        echo ' checked';
                                                    }
                                                ?>
                                            />
                                            <button data-id="<?php echo $room->get_id();?>" class="zc_delete_room_btn btn btn-danger" type="button"><?php echo $lang->line('common_delete');?></button>
                                        </div>
                                        <?php
                                    }
                                        ?>
                                <div class="details">
                                    <div class="row">
                                        <div id="notifications"></div>
                                    </div>
                                    <?php
                                        if ($room->get('primary_vertical_id') != Vertical::OFFICE)
                                        {
                                    ?>
                                            <div class="description long block">
                                                <div class="description-section">
                                                    <div class="title-section normal-font"><?php echo $lang->line('common_meeting_room_layout');?></div>
                                                    <div class="pricing-module clearfix">
                                                        <?php
                                                            foreach ($room->get('configurations')->object() as $configuration)
                                                            {
                                                                if ($configuration->data_exists('max_capacity'))
                                                                {
                                                        ?>
                                                                    <div class="module-unit">
                                                                        <span class="title normal-font"><?php echo $lang->line($configuration->get('desc'));?></span>
                                                                        <span class="value-container normal-font config"><?php echo $configuration->get('max_capacity');?></span>
                                                                        <span class="config-icon <?php echo strtolower($configuration->get('desc'));?>"></span>
                                                                    </div>
                                                                    <?php
                                                                }
                                                            }
                                                                    ?>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                        }
                                        if ($this->dx_auth->is_admin())
                                        {
                                            ?>
                                            <div class="description long block">
                                                <div class="description-section">
                                                    <div class="title-section normal-font"><?php echo $lang->line('common_contact_details');?></div>
                                                    <span class="title">
                                                        <a target="_blank" href="<?php echo get_venue_url($room);?>"><?php echo $room->get('company_name') . ' - ' . $room->get('venue_name');?></a>
                                                    </span>
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
                                            <?php
                                        }
                                            ?>
                                    <div class="description long block">
                                        <div class="description-section">
                                            <div class="title-section normal-font">
                                                <?php
                                                    echo $lang->line('common_description');
                                                    if ($this->dx_auth->is_admin())
                                                    {
                                                ?>
                                                        <div class="admin-mod clearfix">
                                                            <label for="zc_room_non_original_desc">Non-Original Content</label>
                                                            <input type="checkbox" value="<?php echo $room->get_id();?>" name="zc_room_non_original_desc" class="zc_room_non_original_desc js-switch" data-colour="#f7462b" style="display: none;"
                                                                <?php
                                                                    if ($room->is_true('non_original_desc'))
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
                                                <span class="normal-font" id="room_desc"><?php echo $room->get('description');?></span>
                                                <?php
                                                    if ($this->dx_auth->is_admin())
                                                    {
                                                ?>
                                                        <a id="zc_room_desc_edit" class="pointer">Edit Text</a>
                                                        <textarea id="zc_room_desc" maxlength="5000" rows="15" class="form-control" style="display: none;"><?php echo $room->get('description');?></textarea>
                                                        <span id="zc_room_desc_save" class="input-group-addon save_button fa fa-check" style="display: none;" data-id="<?php echo $room->get_id();?>"></span>
                                                        <?php
                                                    }
                                                    /*
                                                        ?>
                                                <br />
                                                <p id="nearby_stations_title"><?php echo $lang->line('common_nearby_stations');?>:</p>
                                                <div id="loading-container">
                                                    <div id="circleG">
                                                        <div id="circleG_1" class="circleG"></div>
                                                        <div id="circleG_2" class="circleG"></div>
                                                        <div id="circleG_3" class="circleG"></div>
                                                    </div>
                                                </div>
                                                <div id="nearest_poi"></div>
                                                    */
                                                        ?>
                                                <br />
                                                <p>
                                                    <a id="message_host" class="enquiries-button no-link" data-modal="message_host">
                                                        <span class="cancellation-summary normal-font"><?php echo $lang->line('rooms_index_message_host');?></span>
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <?php
                                        if ($room->get('amenities')->exist())
                                        {
                                            ?>
                                            <div class="description long block">
                                                <div class="description-section">
                                                    <div class="title-section normal-font"><?php echo $lang->line('rooms_index_optional_extras');?></div>
                                                    <div>
                                                        <?php
                                                            foreach ($room->get('amenities')->object() as $amenity)
                                                            {
                                                        ?>
                                                                <div class="ament_block">
                                                                    <div class="ament_name normal-font">
                                                                        <?php
                                                                            if ($amenity->is_true('filterable'))
                                                                            {
                                                                                echo $lang->line($amenity->get('amenity_desc'));
                                                                            }
                                                                            else
                                                                            {
                                                                                echo $amenity->get('amenity_desc');
                                                                            }
                                                                        ?> -
                                                                        <span class="normal-font pricing-font">
                                                                            <?php
                                                                                if ($amenity->is_null('cost'))
                                                                                {
                                                                                    echo $lang->line('common_included');
                                                                                }
                                                                                else
                                                                                {
                                                                                    echo $amenity->wrangle('price')->formatted(true);
                                                                                }
                                                                            ?>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <?php
                                                            }
                                                                ?>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                        }
                                        if (!$reserved_widget_mode)
                                        {
                                            if ($siblings->exist())
                                            {
                                                ?>
                                                <div class="description long block siblings">
                                                    <div class="description-section">
                                                        <div class="title-section normal-font"><?php echo $lang->line('rooms_index_other_rooms');?></div>
                                                        <div class="sibling-usage-container">
                                                            <?php
                                                                $currentUsageSuperset = '';
                                                                foreach ($siblings->object() as $sibling)
                                                                {
                                                                    if ($currentUsageSuperset === '')
                                                                    {
                                                                        echo '<div class="usage-superset-title">' . $sibling->get('usage_superset_desc') . '</div>';
                                                                    }
                                                                    if ($sibling->get('usage_superset') !== $currentUsageSuperset && $currentUsageSuperset !== '')
                                                                    {
                                                                        echo '</div><div class="sibling-usage-container"><div class="usage-superset-title">' . $sibling->get('usage_superset_desc') . '</div>';
                                                                    }
                                                                    echo $this->load->view(THEME_FOLDER . '/rooms/snippets/sibling_spaces_snippet.php', ['room' => $sibling], true);
                                                                    $currentUsageSuperset = $sibling->get('usage_superset');
                                                                }
                                                            ?>
                                                        </div>
                                                    </div>
                                                </div>
                                                <?php
                                            }
                                        }
                                                ?>
                                </div>
                            </div>
                            <?php
                                if (isset($venue_rooms) && $venue_rooms->have_reviews())
                                {
                            ?>
                                    <div id="reviews" class="details-section">
                                        <div class="reviews description long block">
                                            <h2 class="section-title">
                                                <span class="main-title"><?php echo $lang->line('common_reviews_upper');?></span>
                                                <span class="note"><?php echo $lang->line('common_reviews_written');?></span>
                                            </h2>
                                            <div class="detailed-reviews-summary clearfix" id="reviews-section">
                                                <div class="about-venue">
                                                    <div class="venue-rating clearfix">
                                                        <p class="rating-value"><?php echo $venue->get('review_score');?></p>
                                                        <h2 class="title"><?php echo $lang->line('common_reviews_venue_rating');?></h2>
                                                        <div class="star_rating" zc_rating="<?php echo $venue->get('review_score');?>">
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                            <span>&#x2606;</span>
                                                        </div>
                                                        <p class="review-amount"><?php echo $lang->line('common_reviews_based_on', $venue->wrangle('review_count')->formatted());?></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                                foreach ($venue_rooms->object() as $venue_room)
                                                {
                                                    $room_reviews = $venue_room->get('reviews');
                                                    if ($room_reviews->exist())
                                                    {
                                                        foreach ($room_reviews->object() as $review)
                                                        {
                                                            echo $this->load->view(THEME_FOLDER . '/rooms/snippets/room_reviews_snippet.php', ['room' => $room, 'review' => $review]);
                                                        }
                                                    }
                                                }
                                            ?>
                                        </div>
                                    </div>
                                    <?php
                                }
                                    ?>
                            <div id="venue" class="details-section">
                                <div class="description-section description long block">
                                    <h2 class="section-title">
                                        <span class="main-title"><?php echo $lang->line('rooms_index_about_venue');?></span>
                                    </h2>
                                    <br />
                                    <div id="map" class="map-in-modal">
                                        <?php /*<a class="map-iframe fancybox.iframe" href="//maps.google.com/maps?q=loc:<?php echo $room->get('lat');?>+<?php echo $room->get('long');?>&z=15&output=embed">*/?>
                                            <div id="static-map">
                                                <img class="static-map-img" title="<?php echo $lang->line('common_map');?>" alt="<?php echo $lang->line('common_map');?>" src="<?php echo $room->wrangle('map')->get_url(740, 355, 15, 2, false);?>" />
                                                <?php /*<div class="zoom">
                                                    <div class="icon site-zoom"></div>
                                                </div>*/?>
                                            </div>
                                        <?php /*</a>*/?>
                                    </div>
                                    <div class="fulfillment cancellation-wrapper pre-pay">
                                        <div class="opening-hours">
                                            <div class="title-section normal-font bold"><?php echo $lang->line('rooms_index_opening_hours');?></div>
                                            <table>
                                                <tbody class="normal-font">
                                                    <?php
                                                        $maxSlots = $weekly_opening_hours->max_periods();
                                                        foreach ($weekly_opening_hours->object() as $daily_opening_hours)
                                                        {
                                                            echo '<tr><th class="normal-font">' . $lang->line($daily_opening_hours->label()) . '</th>';
                                                            if ($daily_opening_hours->get_count() === 0)
                                                            {
                                                                echo '<td colspan="3" class="closed">- ' . $lang->line('rooms_closed') . ' -</td></tr>';
                                                            }
                                                            else
                                                            {
                                                                $subsequentPeriod = false;
                                                                foreach ($daily_opening_hours->aggregated_periods_collection(false)->object(true) as $period)
                                                                {
                                                                    if ($subsequentPeriod)
                                                                    {
                                                                        echo '<tr><td>&&nbsp;</td>';
                                                                    }
                                                                    if ($period->get('start') == 0 && $period->get('end') == 1440)
                                                                    {
                                                                        echo '<td colspan="3" class="open24">' . $lang->line('common_open_all_day') . '</td></tr>';
                                                                    }
                                                                    else
                                                                    {
                                                                        echo '<td>' . $period->wrangle('start')->formatted() . '</td><td class="sep">-</td><td>' . $period->wrangle('end')->formatted() . '</td></tr>';
                                                                        $subsequentPeriod = true;
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    ?>
                                                </tbody>
                                            </table>
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
    <div class="filters-footer btn_fixed">
        <div id="add" class="btn btn-block btn-large btn-success search-button row-space-4-sm"><?php echo $lang->line('rooms_index_quick_book');?></div>
    </div>
</div>

<script id="signInModal" type="text/template">
    <div class="modal-body row clearfix forcesignin">
        <div class="col-sm-6 col-sm-push-6 col-xs-10 top-p-1">
            <div class="col-sm-12">
                <h3 class="sign-up-login-form__title"><?php echo $lang->line('users_get_started');?></h3>
                <p id="signInLinkText" class="sign-up-login-form__alternative text-muted">
                    <i><?php echo $lang->line('users_already_account');?> <a id="signInLink" class="no-link"><?php echo $lang->line('common_sign_in');?></a></i>
                </p>
                <p id="signUpLinkText" class="sign-up-login-form__alternative text-muted" style="display: none;">
                    <i><?php echo $lang->line('users_no_account');?> <a id="signUpLink" class="no-link"><?php echo $lang->line('common_sign_up');?></a></i>
                </p>
            </div>
            <div class="col-sm-12">
                <form id="signUpForm" name="signUpLoginModalForm" autocomplete="off">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-6">
                                <label for="first_name"><?php echo $lang->line('users_first_name');?><span class="required">*</span></label>
                                <input type="text" name="first_name" class="form-control" placeholder="Steely">
                            </div>
                            <div class="col-sm-6">
                                <label for="last_name"><?php echo $lang->line('users_last_name');?><span class="required">*</span></label>
                                <input type="text" name="last_name" class="form-control" placeholder="Dan">
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email"><?php echo $lang->line('users_email_address');?><span class="required">*</span></label>
                        <input type="email" name="email" class="form-control email-check" placeholder="you@example.com">
                    </div>
                    <div class="form-group">
                        <label for="phone-number"><?php echo $lang->line('users_phone_number');?></label>
                        <input id="phone_number" class="form-control zc_user_phone_number" type="tel" name="phone_number">
                    </div>
                    <div class="form-group">
                        <label for="password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                        <input type="password" name="password" class="form-control">
                        <input type="hidden" name="ga_id" id="ga_id" />
                    </div>
                    <div class="form-group">
                        <div class="button-container">
                            <input type="submit" class="btn btn-primary btn-block" value="<?php echo $lang->line('common_sign_up');?>">
                        </div>
                        <div class="loader-container" style="display: none;">
                            <center>
                                <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>" />
                            </center>
                        </div>
                    </div>
                </form>
                <form id="signInForm" name="signInLoginModalForm" autocomplete="off" style="display: none;">
                    <div class="form-group">
                        <label for="email"><?php echo $lang->line('users_email_address');?><span class="required">*</span></label>
                        <input type="email" name="email" class="form-control" placeholder="you@example.com">
                    </div>
                    <div class="form-group">
                        <label for="password"><?php echo $lang->line('users_password');?><span class="required">*</span></label>
                        <input type="password" name="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <div class="button-container">
                            <input type="submit" class="btn btn-primary btn-block" value="<?php echo $lang->line('common_sign_in');?>">
                        </div>
                        <div class="loader-container" style="display: none;">
                            <center>
                                <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>" />
                            </center>
                        </div>
                    </div>
                    <div class="form-group">
                        <p id="forgotPasswordLinkText" class="sign-up-login-form__alternative text-muted">
                            <a id="forgotPasswordLink" class="no-link"><?php echo $lang->line('users_forgot_your_password');?></a>
                        </p>
                    </div>
                </form>
                <form id="forgotPasswordForm" name="forgotPasswordModalForm" autocomplete="off" style="display: none;">
                    <div class="form-group">
                        <label for="email"><?php echo $lang->line('users_email_address');?><span class="required">*</span></label>
                        <input type="email" name="email" class="form-control" placeholder="you@example.com">
                    </div>
                    <div class="form-group">
                        <div class="button-container">
                            <input type="submit" class="btn btn-primary btn-block" value="<?php echo $lang->line('users_request_new_password');?>">
                        </div>
                        <div class="loader-container" style="display: none;">
                            <center>
                                <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>" />
                            </center>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col-sm-6 col-sm-pull-6 col-xs-10 gating-modal__why-sign-up">
            <div class="gating-modal__why-sign-up-text top-p-2 bottom-p-2">
                <h1 class="gating-modal__header"><?php echo $lang->line('users_find');?></h1>
                <div class="divider"></div>
                <div class="gating-modal__benefit-container">
                    <h3><?php echo $lang->line('users_book_with');?></h3>
                </div>
                <div class="gating-modal__benefit-container">
                    <h3><?php echo $lang->line('users_book_power');?></h3>
                </div>
                <div class="gating-modal__benefit-container">
                    <h3><?php echo $lang->line('users_book_best');?></h3>
                </div>
            </div>
        </div>
    </div>
</script>