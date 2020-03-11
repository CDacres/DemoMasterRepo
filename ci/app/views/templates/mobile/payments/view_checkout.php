<div data-role="page" id="checkout-log-in" class="signin-page ui-page ui-page-theme-a ui-page-active" data-no-loading-indicator="true" data-url="checkout-log-in" data-add-back-btn="true">
    <div class="head no-buttons long-title ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <a id="back_btn" data-rel="back" data-direction="reverse" onclick="history.go(-1);"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('payments_index_mobile_heading');?></h1>
    </div>
    <div class="content signin-content account-login ui-content" data-role="content" role="main">
        <form class="login-form" novalidate="novalidate">
            <p class="form-intro hide"></p>
            <ul class="form-list">
                <li data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                    <label for="login-email" class="ui-input-text"><?php echo $lang->line('users_email');?></label>
                    <input id="zc_login_user_name" type="email" class="persistent-field login-email" data-persist-name="customer-email" name="login-email" placeholder="<?php echo $lang->line('users_email');?>" autocomplete="off">
                    <span class="ui-btn delete-btn" style="display: none;">
                        <span class="ui-icon ui-icon-delete ui-icon-shadow"></span>
                    </span>
                </li>
                <li data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                    <label for="login-psswd" class="ui-input-text"><?php echo $lang->line('users_password');?></label>
                    <input id="zc_login_password" type="password" name="login-psswd" class="login-psswd" value="" placeholder="<?php echo $lang->line('users_password');?>" autocomplete="off">
                    <span class="ui-btn delete-btn" style="display: none;">
                        <span class="ui-icon ui-icon-delete ui-icon-shadow"></span>
                    </span>
                </li>
            </ul>
            <div class="form-action">
                <a id="sign_in" href="#" data-role="button" class="email-login action-btn ui-btn ui-btn-b" role="button" data-transition="slide" data-rel="page"><?php echo $lang->line('common_sign_in');?></a>
            </div>
            <div class="links">
                <a href="#password-popup" data-rel="popup" data-transition="pop" class="ui-link"><?php echo $lang->line('users_forgot_your_password');?></a>
            </div>
            <div class="separator">
                <span><?php echo $lang->line('common_or');?></span>
            </div>
            <div class="form-action">
                <span id="facebook_login_button" class="ui-btn action-btn ui-btn-b social-button facebook-button"><?php echo $lang->line('common_sign_in_with_facebook');?></span>
            </div>
            <div class="form-action">
                <span id="google_login_button" class="ui-btn action-btn ui-btn-b social-button google-button"><?php echo $lang->line('common_sign_in_with_google');?></span>
            </div>
            <div class="form-action">
                <span id="linkedin_login_button" class="ui-btn action-btn ui-btn-b social-button linkedin-button"><?php echo $lang->line('common_sign_in_with_linkedin');?></span>
            </div>
            <div class="form-action">
                <a href="#checkout-page" class="ui-btn action-btn new-user ui-btn-b" data-role="button" data-transition="slide" data-rel="page"><?php echo $lang->line('payments_index_mobile_check_out_as_guest');?></a>
            </div>
        </form>
    </div>
    <div id="password-popup" data-role="popup">
        <div class="content signin-content ui-content" data-role="content" role="main">
            <div class="form-text"><?php echo $lang->line('users_request_new_password_text');?></div>
            <form class="login-form">
                <ul class="form-list">
                    <li data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                        <label for="login-email" class="ui-input-text"><?php echo $lang->line('users_email');?></label>
                        <input class="string email optional inputs__input" id="fp_email_address" name="email" placeholder="<?php echo $lang->line('users_email');?>" type="email" />
                    </li>
                </ul>
                <div class="form-action">
                    <div id="button-container">
                        <button class="btn btn-primary" id="submit_email" type="button" value="Log in"><?php echo $lang->line('users_request_new_password');?></button>
                    </div>
                    <div id="loader-container" style="display: none;">
                        <center>
                            <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>"/>
                        </center>
                    </div>
                </div>
            </form>
        </div>
        <script>
            function forgotPasswordPost()
            {
                $("#submit_email").click(function()
                {
                    $('#button-container').hide();
                    $('#loader-container').show();
                    var email = $('#fp_email_address').val();
                    if (typeof email !== 'undefined' && email !== null && email !== '')
                    {
                        var data = {
                            email: email
                        };
                        $.post(base_url + "users/forgot_password", data, null, "json"
                        ).done(function(response)
                        {
                            if (response.error.occurred === true)
                            {
                                $('#button-container').show();
                                $('#loader-container').hide();
                                bootstrapError('Request failed: ' + response.error.message);
                            }
                            else
                            {
                                $('#button-container').show();
                                $('#loader-container').hide();
                                $('#fp_email_address').val('');
                                bootstrapSuccess(response.error.message);
                            }
                        }).fail(function(response)
                        {
                            $('#button-container').show();
                            $('#loader-container').hide();
                            bootstrapError('Request failed: ' + response);
                        });
                    }
                    else
                    {
                        $('#button-container').show();
                        $('#loader-container').hide();
                        bootstrapError('Please enter an email.');
                    }
                });
            }
            forgotPasswordPost();
        </script>
    </div>
</div>

<div data-role="page" id="checkout-page" data-title="Secure Checkout" class="checkout-page ui-page ui-page-theme-a" data-add-back-btn="true" data-dom-cache="true">
    <div class="head no-buttons ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
        <a id="back_btn" href="#" data-rel="back"></a>
        <h1 class="page-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('payments_index_mobile_confirm_booking');?></h1>
    </div>
    <form id="mobile-checkout" data-process-stored-payments="true" novalidate="novalidate">
        <div class="content checkout-content" data-role="content">
            <div class="order-details-view">
                <div class="main-pic">
                    <div class="pic" style="background-image: url(<?php echo $room->wrangle('image')->get_url('large');?>);"></div>
                </div>
                <div class="order-summary is-appointment" data-sku-id="" data-offer-id="">
                    <h2 class="main-title zip-icon left location"><?php echo $room->get('venue_name');?> - <?php echo $room->get('address');?></h2>
                    <div class="appointment-date zip-icon left date"><?php echo $lang->line('payments_index_sidebar_booking_details_checkin');?>: <?php echo $reservation->wrangle('start_date_time')->formatted('checkoutday');?>, <?php echo $reservation->wrangle('start_date_time')->formatted('checkout');?>, <?php echo $reservation->wrangle('start_date_time')->formatted('checkouttime');?></div>
                    <div class="appointment-duration zip-icon left duration"><?php echo $reservation->get('period')->wrangle('duration')->formatted();?></div>
                    <div class="appointment-guests zip-icon left guests"><?php echo $reservation->wrangle('guests')->formatted();?></div>
                </div>
            </div>
            <div class="mobile-checkout-field">
                <div class="customer-details-view">
                    <h2 class="section-hd">
                        <span class="value"><?php echo $lang->line('payments_index_form_your_details_heading');?></span>
                    </h2>
                    <a data-role="button" href="#client-details-page" data-rel="popup" data-transition="pop" class="read-more-plain client-details ui-link ui-btn ui-shadow ui-corner-all" style="display: none;" aria-haspopup="true" aria-owns="client-details-page" aria-expanded="false" role="button">
                        <ul class="person-info-list">
                            <li class="name"></li>
                            <li class="phone"></li>
                            <li class="mail"></li>
                        </ul>
                    </a>
                    <ul class="form-list client-details">
                        <li data-role="fieldcontain" class="ui-field-contain"><?php echo $user->get_html_data_input('first_name', "persistent-field zc_user_first_name", 'text', null, false, ['placeholder' => 'First name']);?></li>
                        <li data-role="fieldcontain" class="ui-field-contain">
                            <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><?php echo $user->get_html_data_input('last_name', "persistent-field zc_user_last_name", 'text', null, false, ['placeholder' => 'Last name']);?></div>
                        </li>
                        <li data-role="fieldcontain" class="email ui-field-contain">
                            <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><?php echo $user->get_html_data_input('email', "persistent-field zc_user_email", 'email', null, true, ['placeholder' => 'Email address']);?></div>
                        </li>
                        <li data-role="fieldcontain" class="ui-field-contain">
                            <div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><?php echo $user->get_html_data_input('phone_number', "persistent-field zc_user_phone_number", 'tel', 'phone_number', false, ['placeholder' => 'Phone number']);?></div>
                        </li>
                    </ul>
                </div>
                <div class="event-details-view">
                    <h2 class="section-hd">
                        <span class="value"><?php echo $lang->line('payments_booking_confirmed_room_config_heading');?></span>
                    </h2>
                    <?php
                        foreach ($configurations->object() as $config)
                        {
                            if ($configurations->get_count() > 1)
                            {
                                $labelClass = 'right-m-0-5';
                                $inputCheck = '';
                                $checkbox = '';
                            }
                            else
                            {
                                $labelClass = 'active';
                                $inputCheck = ' checked="checked"';
                                $checkbox = 'on';
                            }
                    ?>
                            <div class="room-config-fields">
                                <div class="room-config ui-controlgroup ui-controlgroup-horizontal ui-corner-all" data-role="controlgroup" data-type="horizontal">
                                    <div class="room-config-radio-container checkout-page">
                                        <a href="#" data-role="button" class="room-config-option ui-link ui-btn ui-shadow ui-corner-all <?php echo $checkbox;?>" role="button">
                                            <span class="config-icon <?php echo strtolower($config->get('desc'));?> inline"></span>
                                            <span class="inline inline-label"><?php echo $lang->line('common_room_configuration', $lang->line($config->get('desc')), $config->wrangle('max_capacity')->formatted());?></span>
                                            <input id="roomconf_<?php echo $config->get('id');?>" type="radio" value="<?php echo $config->get('id');?>" class="room-config-radio" name="roomconf"<?php echo $inputCheck;?> style="display: none;">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <?php
                        }
                            ?>
                </div>
                <?php
                    if (!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))
                    {
                        ?>
                        <div class="event-details-view radio-container">
                            <h2 class="section-hd">
                                <span class="value"><?php echo $lang->line('payments_index_form_flexible_heading');?></span>
                            </h2>
                            <div class="room-config-fields">
                                <div class="room-config ui-controlgroup ui-controlgroup-horizontal ui-corner-all" data-role="controlgroup" data-type="horizontal">
                                    <div class="room-config-radio-container checkout-page">
                                        <a href="#" data-role="button" class="flexible-option ui-link ui-btn ui-shadow ui-corner-all check" role="button">
                                            <span class="inline inline-label"><?php echo $lang->line('payments_index_form_flexible_non_refundable');?></span>
                                            <input id="no_protection" class="flexible-radio" type="radio" name="flexible" style="display: none;">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="room-config-fields">
                                <div class="room-config ui-controlgroup ui-controlgroup-horizontal ui-corner-all" data-role="controlgroup" data-type="horizontal">
                                    <div class="room-config-radio-container checkout-page">
                                        <a href="#" data-role="button" class="flexible-option ui-link ui-btn ui-shadow ui-corner-all check on" role="button">
                                            <span class="inline inline-label"><?php echo $lang->line('payments_index_form_flexible_flexible');?></span>
                                            <input id="flexible" class="flexible-radio" type="radio" name="flexible" style="display: none;" checked="checked">
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="room-config-fields">
                                <div class="room-config ui-controlgroup ui-controlgroup-horizontal ui-corner-all" data-role="controlgroup" data-type="horizontal">
                                    <div class="flexible-details">
                                        <div class="ui-grid-b">
                                            <div class="ui-block-a">
                                                <p class="title-push">
                                                    <b><?php echo $lang->line('payments_index_form_flexible_table_heading');?></b>
                                                </p>
                                                <p>&nbsp;</p>
                                                <p><?php echo $lang->line('payments_index_form_flexible_cancel');?></p>
                                                <p><?php echo $lang->line('payments_index_form_flexible_amendments');?></p>
                                                <p><?php echo $lang->line('payments_index_form_flexible_priority');?></p>
                                            </div>
                                            <div class="ui-block-b text-center">
                                                <p class="package-title"><?php echo $lang->line('payments_index_form_flexible_non_refundable');?></p>
                                                <p><?php echo $reservation->wrangle('price')->formatted(true);?></p>
                                                <p class="grey-cross">&#10008;</p>
                                                <p class="grey-cross">&#10008;</p>
                                                <p>&nbsp;</p>
                                                <p class="grey-cross">&#10008;</p>
                                            </div>
                                            <div class="ui-block-c text-center">
                                                <p class="package-title"><b><?php echo $lang->line('payments_index_form_flexible_flexible');?></b></p>
                                                <p class="grey-text faded-price"><?php echo $reservation->wrangle('price')->left_symbol() . ((!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))?$reservation->get_cancel_price():$reservation->get_price()) . $reservation->wrangle('price')->right_symbol();?></p>
                                                <p class="green-tick">&#10004;</p>
                                                <p class="green-tick">&#10004;</p>
                                                <p>&nbsp;</p>
                                                <p class="green-tick">&#10004;</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                ?>
                <div class="payment-details-view">
                    <h2 class="payment-info section-hd payment-header stored-payment-elements">
                        <span class="value"><?php echo $lang->line('payments_index_form_payment_heading');?></span>
                    </h2>
                    <div class="payment-fields">
                        <div class="payment-type ui-controlgroup ui-controlgroup-horizontal ui-corner-all" data-role="controlgroup" data-type="horizontal">
                            <div class="ui-controlgroup-controls">
                                <a id="card-payment" href="#" data-role="button" class="payment-type-option a-payment-type-pre-pay on ui-link ui-btn ui-shadow ui-corner-all ui-first-child" data-payment-method="pre-pay" role="button"><?php echo $lang->line('payments_index_form_payment_card');?></a>
                                <input class="checkout-payment__method-trigger js-update-booking-btn js-toggler-trigger zc_payment_type_toggle radio-label" data-submitcaption="Complete booking" id="checkout_form_booking_payment_type_braintree" name="checkout_form[booking][payment_type]" type="hidden" value="braintree" checked="true">
                                <a id="paypal-payment" href="#" data-role="button" class="payment-type-option a-payment-type-pre-pay-paypal ui-link ui-btn ui-shadow ui-corner-all" data-payment-method="pre-pay-paypal" role="button"><?php echo $lang->line('payments_index_form_payment_paypal');?></a>
                                <input type="hidden" name="checkout_form[booking][payment_type]" class="checkout-payment__method-trigger js-update-booking-btn js-toggler-trigger zc_payment_type_toggle" data-submitcaption="Continue with Paypal" id="checkout_form_booking_payment_type_paypal" value="paypal">
                                <?php /*
                                ------------------------------------------------------------------
                                Code below is for Pay at Venue option
                                ------------------------------------------------------------------
                                <!-- <a href="#" data-role="button" class="payment-type-option a-payment-type-pay-at-venue ui-link ui-btn ui-shadow ui-corner-all ui-last-child" data-payment-method="pay-at-venue" role="button">
                                    Pay at Venue
                                </a> -->
                                */ ?>
                            </div>
                        </div>
                        <div class="pre-pay-paypal-message payment-method-message hide" style="display: none;">
                            <p><?php echo $lang->line('payments_index_mobile_form_payment_paypal_text');?></p>
                        </div>
                        <div class="b-pay-now pre-pay-message payment-method-message">
                            <ul class="payment-info form-list card-details">
                                <li data-role="fieldcontain" class="ui-visible-label credit-card-field ui-field-contain">
                                    <input id="braintree_card_number" class="form-control inspectletIgnore" name="braintree_card_number" type="tel" value="" placeholder="<?php echo $lang->line('payments_index_form_payment_card_number');?>" autocomplete="off">
                                </li>
                                <li data-role="fieldcontain" class="ui-visible-label ui-field-contain">
                                    <input name="braintree_card_name" id="braintree_card_name" type="text" placeholder="<?php echo $lang->line('payments_index_form_payment_card_name');?>"
                                    <?php
                                        if ($user->is_logged_in())
                                        {
                                            echo " value='" . $user->wrangle('full_name')->formatted() . "'";
                                        }
                                    ?>
                                    />
                                </li>
                                <li data-role="fieldcontain" class="ui-visible-label date ui-field-contain">
                                    <div id="expiry-selector" class="ui-grid-b expiry-selector">
                                        <div class="ui-block-a">
                                            <div class="expiry-label-wrapper">
                                                <span id="expiry-label"><?php echo $lang->line('payments_index_mobile_form_payment_card_expiry');?></span>
                                            </div>
                                        </div>
                                        <div class="ui-block-b">
                                            <div class="ui-select">
                                                <div class="ui-btn">
                                                    <span class="braintree_card_month-filter-text"></span>
                                                    <select class="form-control zc_value_input browse-filter" data-encrypted-name="expiryMonth" id="braintree_card_month">
                                                        <option value="-1" disabled selected style='display: none;'><?php echo $lang->line('common_month_dropdown');?></option>
                                                        <?php
                                                            for ($month = 1; $month <= 12; ++$month)
                                                            {
                                                                $monthValue = date("m", mktime(0, 0, 0, $month, 1));
                                                                echo '<option value="' . $monthValue . '">' . $monthValue . '</option>';
                                                            }
                                                        ?>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ui-block-c">
                                            <div class="ui-select">
                                                <div class="ui-btn">
                                                    <span class="braintree_card_year-filter-text"></span>
                                                    <select class="form-control zc_value_input browse-filter"  data-encrypted-name="expiryYear" id="braintree_card_year">
                                                        <option value="-1" disabled selected style='display: none;'><?php echo $lang->line('common_year_dropdown');?></option>
                                                        <?php
                                                            $currYear = date("Y");
                                                            for ($year = 0; $year <= 10; ++$year)
                                                            {
                                                                $yearValue = $currYear + $year;
                                                                echo '<option value="' . $yearValue . '">' . $yearValue . '</option>';
                                                            }
                                                        ?>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <?php /*
                                        ------------------------------------------------------------------
                                        Code below is for CVV number on checkout
                                        ------------------------------------------------------------------
                                        <!-- <div class="ui-block-c">
                                            <input name="security-number" class="inspectletIgnore" id="cvv" type="tel" value="" placeholder="CVV (Optional)" autocomplete="off" maxlength="4" minlength="3">
                                        </div> -->
                                        */ ?>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <?php
                    if ($amenities->exists_in_db())
                    {
                ?>
                        <div class="event-details-view">
                            <h2 class="section-hd add-ons-title">
                                <span class="value"><?php echo $lang->line('payments_index_form_add_ons_heading');?></span>
                            </h2>
                            <div class="filter-popup">
                                <a href="#add-ons-popup" data-rel="popup" data-position-to="window" class="popup-title ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-icon-right ui-icon-carat-r" data-transition="pop" aria-haspopup="true" aria-owns="filter-popup" aria-expanded="false"><?php echo $lang->line('payments_index_mobile_form_select_add_ons');?></a>
                            </div>
                        </div>
                        <?php
                    }
                        ?>
                        <?php /*
                        ------------------------------------------------------------------
                        Code below is for comments box
                        ------------------------------------------------------------------
                        <!-- <div class="event-details-view">
                            <h2 class="section-hd">
                                <span class="value">Comments (Optional)</span>
                            </h2>
                            <div class="payment-type ui-controlgroup ui-controlgroup-horizontal ui-corner-all" data-role="controlgroup" data-type="horizontal">
                                <textarea class="inputs__input" id="comments" name="comments" type="text" maxlength="1000"></textarea>
                            </div>
                        </div> -->
                        */ ?>
            </div>
        </div>
        <div class="footer-view">
            <div class="checkout-action" data-id="place-order-button" data-tap-toggle="false">
                <input type="hidden" class="device-uuid" name="app-device-uuid" value="">
                <input type="hidden" class="advisory-order-total" name="advisoryOrderTotal" value="12">
                <input type="hidden" class="loyalty-points-count" name="loyalty-points" value="0">
                <div class="order-total b-pay-now">
                    <div class="total_wrapper">
                        <span class="order-title"><?php echo $lang->line('payments_index_sidebar_total');?></span>
                        <span class="order-price">
                            <span class="display-price">
                                <span class="title"><?php echo $reservation->wrangle('price')->left_symbol() . '<strong><span class="zc_total_cost">' . ((!$room->is_null('flexible_percent') && $room->is_true('flexible_enabled'))?$reservation->get_cancel_price():$reservation->get_price()) . '</span></strong>' . $reservation->wrangle('price')->right_symbol();?></span>
                            </span>
                        </span>
                    </div>
                    <div id="discount_wrapper" class="discount_wrapper<?php echo (($reservation->is_null('discount'))?' hide':'');?>">
                        <span class="order-title"><?php echo $lang->line('payments_index_sidebar_booking_details_discount');?></span>
                        <span class="order-price">
                            <span class="display-price">
                                <span id="discount_percent" class="title"><?php echo $reservation->get('discount');?>%</span>
                            </span>
                        </span>
                    </div>
                </div>
                <div id="book_loading" class="text-right" style="display: none;">
                    <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>">
                </div>
                <a id="book_button" href="#" class="checkout-button modal-overlay action-btn ui-btn ui-btn-b" data-role="button" role="button"><?php echo $lang->line('Book Now');?></a>
                <div id="paypal-button" class="text-right"></div>
            </div>
        </div>
    </form>
    <div id="password-popup" data-role="popup">
        <div class="content signin-content ui-content" data-role="content" role="main">
            <div class="form-text"><?php echo $lang->line('users_request_new_password_text');?></div>
            <form class="login-form">
                <ul class="form-list">
                    <li data-role="fieldcontain" class="ui-hide-label ui-field-contain">
                        <label for="login-email" class="ui-input-text"><?php echo $lang->line('users_email');?></label>
                        <input class="string email optional inputs__input" id="fp_email_address" name="email" placeholder="<?php echo $lang->line('users_email');?>" type="email" />
                    </li>
                </ul>
                <div class="form-action">
                    <div id="button-container">
                        <button class="btn btn-primary" id="submit_email" type="button" value="Log in"><?php echo $lang->line('users_request_new_password');?></button>
                    </div>
                    <div id="loader-container" style="display: none;">
                        <center>
                            <img src="/images/loading.gif" title="<?php echo $lang->line('common_loading');?>" alt="<?php echo $lang->line('common_loading');?>"/>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div data-role="popup" data-dismissible="false" id="add-ons-popup" class="ui-popup ui-body-inherit ui-overlay-shadow ui-corner-all">
        <div class="head ui-header ui-bar-inherit" data-role="header" data-id="header" role="banner">
            <h1 class="header-title ui-title" role="heading" aria-level="1"><?php echo $lang->line('payments_index_form_add_ons_heading');?></h1>
        </div>
        <div class="filter-block">
            <?php
                if ($amenities->exist())
                {
                    foreach ($amenities->object() as $amenity)
                    {
            ?>
                        <div class="add_on">
                            <div class="add_on_title">
                                <p class="add_on_name">
                                    <?php
                                        if ($amenity->is_true('filterable'))
                                        {
                                            echo $lang->line($amenity->get('amenity_desc'));
                                        }
                                        else
                                        {
                                            echo $amenity->get('amenity_desc');
                                        }
                                        if ($amenity->is_null('price'))
                                        {
                                            echo ' (' . $lang->line('common_included') . ')';
                                        }
                                    ?>
                                </p>
                            </div>
                            <div class="select select-block">
                                <div class="ui-select">
                                    <div class="ui-btn">
                                        <span class="<?php echo $amenity->get('id');?>-filter-text"></span>
                                        <select id="<?php echo $amenity->get('id');?>" zc_amenity_name="<?php echo $amenity->get('amenity_desc');?>" class="dropdown-toggle add_ons_selector zc_value_input browse-filter" zc_add_on_id="<?php echo $amenity->get('id');?>" data-role="none">
                                            <option zc_add_on_price="0" zc_add_on_number="0"><?php echo $lang->line('common_none');?></option>
                                            <?php
                                                for ($i = 1; $i <= $reservation->get('guests')*2; ++$i)
                                                {
                                            ?>
                                                    <option zc_add_on_price="<?php echo $i*$amenity->get('price');?>" zc_add_on_number="<?php echo $i;?>"><?php echo $i . ((!$amenity->is_null('price') && $amenity->get('price') > 0)?$lang->line('common_amenity_price', $amenity->wrangle('price')->multiple_formatted($i, true)):'');?></option>
                                                    <?php
                                                }
                                                    ?>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php
                    }
                }
                        ?>
        </div>
        <div class="ok-or-cancel-filters">
            <a data-direction="reverse" data-role="button" class="ok-filters ui-link" href="#collapseAddons"><?php echo $lang->line('common_ok');?></a>
            <a data-direction="reverse" data-role="button" class="cancel-filters ui-link" href="#collapseAddons"><?php echo $lang->line('common_cancel');?></a>
        </div>
        <div style="clear: both;"></div>
    </div>
    <div data-role="popup" id="error-popup">
        <div class="error-content">
            <div class="error-text">
                <p id="error-title" class="title"><?php echo $lang->line('common_sorry');?></p>
                <p id="error-message" class="message"></p>
            </div>
            <a href="" data-role="button" data-theme="b" data-rel="back" class="action-btn ui-btn-corner-all ui-btn-up-b ui-btn ui-shadow" role="button">
                <span class="ui-btn-inner ui-btn-corner-all">
                    <span class="ui-btn-text"><?php echo $lang->line('common_close');?></span>
                </span>
            </a>
        </div>
    </div>
</div>