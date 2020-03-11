<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Emailtest extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    public function index($hash = null, $emailSubject = '', $languageCode = 'en')
    {
        if ($hash == 'ae2c8899a42cd69c52ab7f57eaaeeabf')
        {
            $this->lang->load('email', $languageCode);
            $this->lang->load('common', $languageCode);
            $email = "dev@zipcube.com";
            $modelUsers = Model__users::class;
            $this->load->model($modelUsers);
            $emailAdmin = [];
            $assignedUser = 1;
            $admins = $this->$modelUsers->get_admin_users();
            foreach ($admins->object() as $admin)
            {
                if ($admin->get_id() == $assignedUser)
                {
                    $emailAdmin = $admin;
                }
            }
            $user = $this->$modelUsers->get_user_by_email($email);
            $emailVariables = [
                "{admin_name}" => ((count($emailAdmin) > 0 && is_email_zipcube($emailAdmin->get('email')))?ucfirst($emailAdmin->get('first_name')):''),
                "{email}" => $email,
                "{name}" => "Test User",
                "{phone}" => "01234 9293 19",
                "{message}" => "A Message",
                "{password}" => "PASSWORD",
                "{username}" => "test_user",
                "{venue_phone}" => "01239 827727",
                "{venue_email}" => "venue_user@venue.com",
                "{venue_name}" => "VENUE NAME",
                "{venue_id}" => 1,
                "{venue_address_extras}" => "1",
                "{venue_address}" => "Venue Road, Venue Street",
                "{venue_transport}" => "Walk down the badly lit alleyway",
                "{room_id}" => 1,
                "{room_name}" => "ROOM TITLE",
                "{host_name}" => "Test User",
                "{client_fname}" => "client fname",
                "{client_lname}" => "client lname",
                "{client_email}" => "client_email@email.com",
                "{client_phone}" => "01999 467 727",
                "{book_date}" => "09/09/16",
                "{book_time}" => "00:00:00",
                "{checkin}" => "09/09/16",
                "{checkout}" => "01/09/16",
                "{time_in}" => "00:00:00",
                "{time_out}" => "12:00:00",
                "{market_price}" => "2500",
                "{topay}" => "100",
                "{currency_price}" => "GBP",
                "{addons}" => "ADDONS",
                "{no_guest}" => 5,
                "{roomconf}" => "meeting configuration",
                "{comments}" => "no comments",
                "{comment}" => "no comment",
                "{reservation_id}" => 1,
                "{zipcube_commission}" => "75",
                "{username_receiver}" => "username",
                "{review}" => "review",
                "{feedback}" => "feedback",
                "{cleanliness}" => "cleanliness",
                "{communication}" => "communication",
                "{location}" => "location",
                "{accuracy}" => "accuracy",
                "{value}" => "value",
                "{review_link}" => base_url() . "uk/write-review/reservation?source=zipcube&medium=email&type=reservation_review&token=3dlkjdfglkjs",
                "{first_name}" => "fname",
                "{set_password_link}" => base_url() . "uk/set-new-password",
                "{reply_author}" => "Reply Author Name",
                "{reply}" => "RE",
                "{review_page_link}" => base_url() . "uk/dashboard/reviews",
                "{company_admin_fname}" => "company admin fname",
                "{calendar_link}" => base_url() . "uk/dashboard/schedule",
                "{login_link}" => base_url() . "uk/users/signin",
                "{widget_link}" => base_url() . "uk/widget/",
                "{company_name}" => "COMPANY NAME",
                "{asset_name}" => "ASSET NAME",
                "{message_request_link}" => base_url() . "uk/dashboard/message-request/3",
                "{room_url}" => base_url() . "uk/dashboard/accept-decline-token?token=3dlkjdfglkjs",
                "{user_country_lang}" => "uk",
                "{step_str}" => "-     VENUE NAME - 2 steps to go (Name, Cancellation Terms)<br>-     ROOM TITLE (VENUE NAME) - 1 step to go (Description)<br>"
            ];
            $modelEmail = Model__email::class;
            $this->load->model($modelEmail);
            if ($emailSubject != '')
            {
                switch ($emailSubject)
                {
                    case 'email_subject_admin_exception':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_exception', ['{message}' => "Exception"], 'admin_failed', 'exception');
                    break;

                    case 'email_subject_admin_void_failed':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_void_failed', ['{trans_id}' => 1], 'admin_failed', 'void');
                    break;

                    case 'email_subject_admin_refund_failed':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_refund_failed', ['{trans_id}' => 1], 'admin_failed', 'refund');
                    break;

                    case 'email_subject_admin_payment_failed':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_payment_failed', ['{trans_id}' => 1], 'admin_failed', 'payment');
                    break;

                    case 'email_subject_no_contact':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_no_contact', $emailVariables);
                    break;

                    case 'email_subject_admin_reservation_notification':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_reservation_notification', $emailVariables);
                    break;

                    case 'email_subject_admin_reservation_expire':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_reservation_expire', $emailVariables, 'admin_reservation', 'expire');
                    break;

                    case 'email_subject_admin_reservation_granted':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_reservation_granted', $emailVariables);
                    break;

                    case 'email_subject_admin_reservation_declined':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_reservation_declined', $emailVariables, 'admin_reservation', 'decline');
                    break;

                    case 'email_subject_admin_reservation_cancelbyhost':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_reservation_cancelbyhost', $emailVariables, 'admin_reservation', 'venueCancel');
                    break;

                    case 'email_subject_contact_form':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'contact_form', $emailVariables);
                    break;

                    case 'email_new_listing':
                        $this->$modelEmail->sendAdminMail($emailSubject, 'new_listing', $emailVariables);
                    break;

                    case 'email_subject_forgot_password':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'forgot_password', $emailVariables);
                    break;

                    case 'email_subject_asset_member_updated_password':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'asset_member_updated_password', $emailVariables, '', '', 'asset', 'member_updated_password');
                    break;

                    case 'email_subject_welcome_to_zipcube':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'users_signin', $emailVariables, '', '', 'sign');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'asset_team_member_created', $emailVariables, '', '', 'asset', 'team_member_created');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'asset_team_member_created', $emailVariables, '', '', 'asset', 'team_member_created_steps');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'asset_user_member_created', $emailVariables, '', '', 'asset', 'user_member_created');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'asset_user_member_created_token', $emailVariables, '', '', 'asset', 'user_member_created_token');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'new_client_non_frontend', $emailVariables, '', '', 'asset', 'new_client_non_frontend');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'signup_token', $emailVariables, '', '', 'sign', 'token');
                    break;

                    case 'email_subject_host_reservation_notification':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_reservation_notification', $emailVariables);
                    break;

                    case 'email_subject_client_reservation_token_notification':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_token_notification', $emailVariables, '', '', 'client_reservation_notification', 'token');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_notification', $emailVariables, '', '', 'client_reservation_notification');
                    break;

                    case 'email_subject_host_reservation_expire':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_reservation_expire', $emailVariables);
                    break;

                    case 'email_subject_client_reservation_expire':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_expire', $emailVariables, '', '', 'client_reservation', 'expire');
                    break;

                    case 'email_subject_host_reservation_granted':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_reservation_granted', $emailVariables);
                    break;

                    case 'email_subject_client_reservation_granted':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_granted', $emailVariables);
                    break;

                    case 'email_subject_host_reservation_declined':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_reservation_declined', $emailVariables);
                    break;

                    case 'email_subject_client_reservation_declined':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_declined', $emailVariables, '', '', 'client_reservation', 'declined');
                    break;

                    case 'email_subject_host_client_reservation_cancel':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_cancelbyclient', $emailVariables, '', '', 'client_reservation_cancel', 'cancelbyclient');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_reservation_cancelbyhost', $emailVariables, '', '', 'host_reservation_cancel', 'cancelbyhost');
                    break;

                    case 'email_subject_reservation_cancel':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_reservation_cancelbyclient', $emailVariables, '', '', 'host_reservation_cancel', 'cancelbyclient');
                        $this->$modelEmail->sendAdminMail($emailSubject, 'admin_reservation_cancelbyclient', $emailVariables, 'admin_reservation', 'cancelbyclient');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_reservation_cancelbyhost', $emailVariables, '', '', 'client_reservation_cancel', 'cancelbyhost');
                    break;

                    case 'email_subject_host_checkin':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_checkin', $emailVariables, '', '', 'check', 'checkin', 'host');
                    break;

                    case 'email_subject_client_checkin':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_checkin', $emailVariables, '', '', 'check', 'checkin', 'client');
                    break;

                    case 'email_subject_admin_checkin':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'admin_checkin', $emailVariables, '', '', 'check', 'checkin', 'admin');
                    break;

                    case 'email_subject_client_checkout':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'client_checkout', $emailVariables, '', '', 'check', 'checkout', 'client', $emailAdmin, 'html_non_brand');
                    break;

                    case 'email_subject_client_review_reminder':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'review_reminder', $emailVariables, '', '', 'review_reminder', '', '', $emailAdmin, 'html_non_brand');
                    break;

                    case 'email_subject_message_notification':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'message_notification', $emailVariables);
                    break;

                    case 'email_subject_host_review_notification':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'host_review_notification', $emailVariables);
                    break;

                    case 'email_subject_venue_review_request':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'venue_review_request', $emailVariables);
                    break;

                    case 'email_subject_thank_reviewer_token':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'thank_reviewer_token', $emailVariables, '', '', 'review', 'token');
                        $this->$modelEmail->sendMail($user, $emailSubject, 'thank_reviewer', $emailVariables, '', '', 'review');
                    break;

                    case 'email_subject_review_reply_notification':
                        $this->$modelEmail->sendMail($user, $emailSubject, 'review_reply_notification', $emailVariables, '', '', 'review', 'reply_notification');
                    break;
                }
            }
            else
            {
                $this->$modelEmail->sendAdminMail('email_subject_admin_exception', 'admin_exception', ['{message}' => "Exception"], 'admin_failed', 'exception');
                $this->$modelEmail->sendAdminMail('email_subject_admin_void_failed', 'admin_void_failed', ['{trans_id}' => 1], 'admin_failed', 'void');
                $this->$modelEmail->sendAdminMail('email_subject_admin_refund_failed', 'admin_refund_failed', ['{trans_id}' => 1], 'admin_failed', 'refund');
                $this->$modelEmail->sendAdminMail('email_subject_admin_payment_failed', 'admin_payment_failed', ['{trans_id}' => 1], 'admin_failed', 'payment');
                $this->$modelEmail->sendAdminMail('email_subject_no_contact', 'admin_no_contact', $emailVariables);
                $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_notification', 'admin_reservation_notification', $emailVariables);
                $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_expire', 'admin_reservation_expire', $emailVariables, 'admin_reservation', 'expire');
                $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_granted', 'admin_reservation_granted', $emailVariables);
                $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_declined', 'admin_reservation_declined', $emailVariables, 'admin_reservation', 'decline');
                $this->$modelEmail->sendAdminMail('email_subject_admin_reservation_cancelbyhost', 'admin_reservation_cancelbyhost', $emailVariables, 'admin_reservation', 'venueCancel');
                $this->$modelEmail->sendAdminMail('email_subject_reservation_cancel', 'admin_reservation_cancelbyclient', $emailVariables, 'admin_reservation', 'cancelbyclient');
                $this->$modelEmail->sendAdminMail('email_subject_contact_form', 'contact_form', $emailVariables);
                $this->$modelEmail->sendAdminMail('email_new_listing', 'new_listing', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_forgot_password', 'forgot_password', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_asset_member_updated_password', 'asset_member_updated_password', $emailVariables, '', '', 'asset', 'member_updated_password');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'users_signin', $emailVariables, '', '', 'sign');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_team_member_created', $emailVariables, '', '', 'asset', 'team_member_created');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_team_member_created', $emailVariables, '', '', 'asset', 'team_member_created_steps');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_user_member_created', $emailVariables, '', '', 'asset', 'user_member_created');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'asset_user_member_created_token', $emailVariables, '', '', 'asset', 'user_member_created_token');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'new_client_non_frontend', $emailVariables, '', '', 'asset', 'new_client_non_frontend');
                $this->$modelEmail->sendMail($user, 'email_subject_welcome_to_zipcube', 'signup_token', $emailVariables, '', '', 'sign', 'token');
                $this->$modelEmail->sendMail($user, 'email_subject_host_reservation_notification', 'host_reservation_notification', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_client_reservation_token_notification', 'client_reservation_token_notification', $emailVariables, '', '', 'client_reservation_notification', 'token');
                $this->$modelEmail->sendMail($user, 'email_subject_client_reservation_token_notification', 'client_reservation_notification', $emailVariables, '', '', 'client_reservation_notification');
                $this->$modelEmail->sendMail($user, 'email_subject_host_reservation_expire', 'host_reservation_expire', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_client_reservation_expire', 'client_reservation_expire', $emailVariables, '', '', 'client_reservation', 'expire');
                $this->$modelEmail->sendMail($user, 'email_subject_host_reservation_granted', 'host_reservation_granted', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_client_reservation_granted', 'client_reservation_granted', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_host_reservation_declined', 'host_reservation_declined', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_client_reservation_declined', 'client_reservation_declined', $emailVariables, '', '', 'client_reservation', 'declined');
                $this->$modelEmail->sendMail($user, 'email_subject_host_client_reservation_cancel', 'host_reservation_cancelbyhost', $emailVariables, '', '', 'host_reservation_cancel', 'cancelbyhost');
                $this->$modelEmail->sendMail($user, 'email_subject_host_client_reservation_cancel', 'client_reservation_cancelbyclient', $emailVariables, '', '', 'client_reservation_cancel', 'cancelbyclient');
                $this->$modelEmail->sendMail($user, 'email_subject_reservation_cancel', 'host_reservation_cancelbyclient', $emailVariables, '', '', 'host_reservation_cancel', 'cancelbyclient');
                $this->$modelEmail->sendMail($user, 'email_subject_reservation_cancel', 'client_reservation_cancelbyhost', $emailVariables, '', '', 'client_reservation_cancel', 'cancelbyhost');
                $this->$modelEmail->sendMail($user, 'email_subject_host_checkin', 'host_checkin', $emailVariables, '', '', 'check', 'checkin', 'host');
                $this->$modelEmail->sendMail($user, 'email_subject_client_checkin', 'client_checkin', $emailVariables, '', '', 'check', 'checkin', 'client');
                $this->$modelEmail->sendMail($user, 'email_subject_admin_checkin', 'admin_checkin', $emailVariables, '', '', 'check', 'checkin', 'admin');
                $this->$modelEmail->sendMail($user, 'email_subject_client_checkout', 'client_checkout', $emailVariables, '', '', 'check', 'checkout', 'client', $emailAdmin, 'html_non_brand');
                $this->$modelEmail->sendMail($user, 'email_subject_client_review_reminder', 'review_reminder', $emailVariables, '', '', 'review_reminder', '', '', $emailAdmin, 'html_non_brand');
                $this->$modelEmail->sendMail($user, 'email_subject_message_notification', 'message_notification', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_host_review_notification', 'host_review_notification', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_venue_review_request', 'venue_review_request', $emailVariables);
                $this->$modelEmail->sendMail($user, 'email_subject_thank_reviewer_token', 'thank_reviewer_token', $emailVariables, '', '', 'review', 'token');
                $this->$modelEmail->sendMail($user, 'email_subject_thank_reviewer_token', 'thank_reviewer', $emailVariables, '', '', 'review');
                $this->$modelEmail->sendMail($user, 'email_subject_review_reply_notification', 'review_reply_notification', $emailVariables, '', '', 'review', 'reply_notification');
            }
        }
        else
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }
}