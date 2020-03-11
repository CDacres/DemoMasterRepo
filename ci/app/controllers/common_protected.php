<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**

 * Zipcube Common Modal Controller Class
 * @package		Zipcube
 * @subpackage          Controllers
 * @category            Modals
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com

 */

class Common_Protected extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if (!$this->dx_auth->is_logged_in())
        {
            redirect('common/no_data');
        }
        $this->_set_display_type(self::MODAL_FRONTEND);
        $this->data['reserved_false_modal_footer'] = true;
    }

    public function modal_pay_reservation($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->data['title'] = "Reservation";
                if (!$reservation->is_null('client_first_name'))
                {
                    $this->data['title'] .= " - " . $reservation->wrangle('client_name')->formatted();
                }
                $this->data['reservation'] = $reservation;
                $modelReservationVenuePayments = Model__reservation_venue_payments::class;
                $this->load->model($modelReservationVenuePayments);
                $this->data['venue_payments'] = $this->$modelReservationVenuePayments->get_reservation_venue_payments_collection_by_id($reservationId);
                $this->data['res_venue_payment'] = new Reservation_Venue_Payment();
                $this->data['buttons']['mark_as_paid'] = [
                    'label' => 'Mark Amount Paid',
                    'class' => 'btn-success'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/pay_reservation";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_update_reservation($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->data['title'] = "Reservation";
                if (!$reservation->is_null('client_first_name'))
                {
                    $this->data['title'] .= " - " . $reservation->wrangle('client_name')->formatted();
                }
                $this->data['reservation'] = $reservation;
                $this->data['redundant_reservation_id'] = $reservationId;
                $this->data['commission_rates'] = $reservation->get_default_commission_rates();
                $modelConfig = Model__configurations::class;
                $this->load->model($modelConfig);
                $this->data['configs'] = $this->$modelConfig->get_config_object_collection_by_asset_id($reservation->get('asset_id'));
                $this->data['buttons']['confirm_update'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-success'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/update_reservation";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_reservation_details($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
        if ($reservation->exists_in_db())
        {
            $modelUserAsset = Model__user_asset_privileges::class;
            $this->load->model($modelUserAsset);
            if ($this->$modelUserAsset->check_your_privilege($reservation->get('asset_id'), $this->get_user_id()))
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $hasButtons = false;
                if (!$reservation->is_blocked())
                {
                    $this->data['title'] = $this->lang->line('common_reservation');
                    if (!$reservation->is_null('client_first_name'))
                    {
                        $this->data['title'] .= " - " . $reservation->wrangle('client_name')->formatted();
                    }
                }
                else
                {
                    $this->data['title'] = $this->lang->line('common_block');
                }
                $isAdmin = $this->user_is_admin();
                if ($reservation->can_be_deleted())
                {
                    $hasButtons = true;
                    $this->data['buttons']['delete_reservation'] = [
                        'label' => $this->lang->line('common_delete'),
                        'attributes' => ['zc_status_id' => Reservation_Status::DELETED],
                        'class' => 'btn-danger'
                    ];
                }
                if (!$reservation->is_blocked())
                {
                    if ($isAdmin && $reservation->resend_request_emails())
                    {
                        $hasButtons = true;
                        $this->data['buttons']['resend_request_email'] = [
                            'label' => 'Send Request Email',
                            'attributes' => ['zc_status_id' => Reservation_Status::CREATED],
                            'class' => 'btn-default'
                        ];
                    }
                    if ($reservation->is_pending_response())
                    {
                        $hasButtons = true;
                        if ($isAdmin && !$reservation->is_true('venue_agree_to_list'))
                        {
                            $this->data['buttons']['accept_reservation_venue_not_agree_to_list'] = [
                                'label' => $this->lang->line('common_accept'),
                                'attributes' => ['zc_status_id' => Reservation_Status::ACCEPTED],
                                'class' => 'btn-success'
                            ];
                        }
                        else
                        {
                            $this->data['buttons']['accept_reservation'] = [
                                'label' => $this->lang->line('common_accept'),
                                'attributes' => ['zc_status_id' => Reservation_Status::ACCEPTED],
                                'class' => 'btn-success'
                            ];
                        }
                        $this->data['buttons']['decline_reservation'] = [
                            'label' => $this->lang->line('common_decline'),
                            'attributes' => ['zc_status_id' => Reservation_Status::DECLINE],
                            'class' => 'btn-danger'
                        ];
                    }
                    elseif ($isAdmin)
                    {
                        $hasButtons = true;
                        if ($reservation->resend_accept_emails())
                        {
                            $this->data['buttons']['resend_accept_email'] = [
                                'label' => 'Send Accept Email',
                                'attributes' => ['zc_status_id' => Reservation_Status::ACCEPTED],
                                'class' => 'btn-success'
                            ];
                        }
                        if ($reservation->resend_decline_emails())
                        {
                            $this->data['buttons']['resend_decline_email'] = [
                                'label' => 'Send Decline Email',
                                'attributes' => ['zc_status_id' => Reservation_Status::DECLINE],
                                'class' => 'btn-danger'
                            ];
                        }
                        if ($reservation->resend_cancel_emails())
                        {
                            $this->data['buttons']['resend_cancel_email'] = [
                                'label' => 'Send Cancel Email',
                                'attributes' => ['zc_status_id' => Reservation_Status::CANCELLEDBYUSER],
                                'class' => 'btn-danger'
                            ];
                        }
                        $this->data['buttons']['mark_as_paid'] = [
                            'label' => 'Mark Paid',
                            'class' => 'btn-default'
                        ];
                    }
                    if ($isAdmin)
                    {
                        $hasButtons = true;
                        if ($reservation->can_be_switched())
                        {
                            $this->data['buttons']['mark_switch'] = [
                                'label' => 'Requires Switch',
                                'class' => 'btn-warning'
                            ];
                        }
                        $this->data['buttons']['update_reservation'] = [
                            'label' => $this->lang->line('common_update'),
                            'class' => 'btn-default'
                        ];
                    }
                }
                $this->data['isAdmin'] = $isAdmin;
                $this->data['message_element'] = "common/reservation_details";
                $this->data['reservation'] = $reservation;
                if ($hasButtons)
                {
                    $this->data['reserved_false_modal_footer'] = false;
                }
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_reservation_audit($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->data['auditObj_id'] = $reservation->get_id();
                $modelReservationAudit = Model__reservations_audit::class;
                $this->load->model($modelReservationAudit);
                $this->data['audits'] = $this->$modelReservationAudit->get_reservation_audit_collection_by_id($reservationId);
                $this->data['message_element'] = "administrator/audit";
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_reservation_messages($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->data['reservation_id'] = $reservation->get_id();
                $modelMessages = Model__message::class;
                $this->load->model($modelMessages);
                $this->data['messages'] = $this->$modelMessages->get_messages_collection_by_reservation_id($reservationId);
                $this->data['message_element'] = "administrator/reservation_messages";
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_reservation_payment_audit($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->data['reservation_id'] = $reservation->get_id();
                $modelReservationVenuePayments = Model__reservation_venue_payments::class;
                $this->load->model($modelReservationVenuePayments);
                $this->data['venue_payments'] = $this->$modelReservationVenuePayments->get_reservation_venue_payments_collection_by_id($reservationId);
                $this->data['message_element'] = "administrator/venue_payment_audit";
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_cancel_reservation($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db() && $reservation->can_be_cancelled())
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->data['title'] = $this->lang->line('common_reservation');
                if (!$reservation->is_null('client_first_name'))
                {
                    $this->data['title'] .= " - " . $reservation->wrangle('client_name')->formatted();
                }
                $this->data['reservation'] = $reservation;
                $modelReservationVenuePayments = Model__reservation_venue_payments::class;
                $this->load->model($modelReservationVenuePayments);
                $this->data['venue_payments'] = $this->$modelReservationVenuePayments->get_reservation_venue_payments_collection_by_id($reservationId);
                $this->data['commission_rates'] = $reservation->get_default_commission_rates();
                $modelAssetCancellations = Model__asset_cancellations::class;
                $this->load->model($modelAssetCancellations);
                $this->data['cancellation'] = $this->$modelAssetCancellations->get_cancellation_type_by_asset($reservation->get('venue_asset_id'));
                $this->data['refund_eligible'] = false;
                $now = new DateTime();
                $interval = $now->diff(DateTime::createFromFormat('Y-m-d H:i:s', $reservation->get('start_date_time')));
                if ($interval->format('%R%a') >= $this->data['cancellation']->get('cancellation_period'))
                {
                    $this->data['refund_eligible'] = true;
                    $this->data['new_price'] = ($reservation->get('price') - ($reservation->get('price') * ($this->data['cancellation']->get('cancellation_percentage')/100)));
                    $venue_vat = $reservation->get_venue_vat();
                    $commission = (($reservation->get_commission_rate() / 100) * $this->data['new_price']);
                    if ($venue_vat > 0)
                    {
                        $this->data['new_payout'] = (-1 * ($commission - $this->data['new_price'])) - ($commission * ($venue_vat / 100));
                    }
                    else
                    {
                        $this->data['new_payout'] = (-1 * ($commission - $this->data['new_price']));
                    }
                }
                $this->data['buttons']['confirm_cancel_host'] = [
                    'label' => 'Cancel Reservation (Host)',
                    'class' => 'btn-danger'
                ];
                $this->data['buttons']['confirm_cancel_user'] = [
                    'label' => 'Cancel Reservation (User)',
                    'class' => 'btn-danger'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/cancel_reservation";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_update_payment_ref($reservationId, $paymentId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $paymentModel = Model__payments::class;
                $this->load->model($paymentModel);
                $payment = $this->$paymentModel->get_payment_object_by_id_and_type($paymentId, Payment_Type::INVOICE);
                if ($payment->exists_in_db())
                {
                    $this->data['title'] = $this->lang->line('common_reservation');
                    if (!$reservation->is_null('client_first_name'))
                    {
                        $this->data['title'] .= " - " . $reservation->wrangle('client_name')->formatted();
                    }
                    $this->data['reservation'] = $reservation;
                    $this->data['payment'] = $payment;
                    $this->data['buttons']['update_payment'] = [
                        'label' => $this->lang->line('common_update'),
                        'class' => 'btn-success'
                    ];
                    $this->data['buttons']['cancel'] = [
                        'label' => $this->lang->line('common_cancel'),
                        'class' => 'btn-default'
                    ];
                    $this->data['message_element'] = "administrator/payment_ref";
                    $this->data['reserved_false_modal_footer'] = false;
                }
                else
                {
                    $this->data['message_element'] = "common/no_data";
                }
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_add_payment($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->lang->load('payments', config_item('language_code'));
                $this->data['title'] = $this->lang->line('common_reservation');
                if (!$reservation->is_null('client_first_name'))
                {
                    $this->data['title'] .= " - " . $reservation->wrangle('client_name')->formatted();
                }
                $this->data['reservation'] = $reservation;
                $this->data['payment'] = new Payment();
                $modelBrainwrap = Model__brainwrap::class;
                $this->load->model($modelBrainwrap);
                $this->data['braintree_client_token'] = $this->$modelBrainwrap->get_client_token();
                $this->data['buttons']['add_payment'] = [
                    'label' => 'Add',
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/new_payment";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_enquiry_audit($enquiryId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelEnquiries = Model__enquiries::class;
            $this->load->model($modelEnquiries);
            $enquiry = $this->$modelEnquiries->get_enquiry_by_id($enquiryId);
            if ($enquiry->exists_in_db())
            {
                $this->data['auditObj_id'] = $enquiry->get_id();
                $modelEnquiryAudit = Model__enquiries_audit::class;
                $this->load->model($modelEnquiryAudit);
                $this->data['audits'] = $this->$modelEnquiryAudit->get_enquiry_audit_collection_by_id($enquiryId);
                $this->data['message_element'] = "administrator/audit";
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_invoice_financial_entity($reservationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $reservation = $this->$modelReservations->get_extended_reservation_by_id($reservationId);
            if ($reservation->exists_in_db())
            {
                $this->data['reservation'] = $reservation;
                $modelFinancialEntities = Model__financial_entities::class;
                $this->load->model($modelFinancialEntities);
                $this->data['financial_entities'] = $this->$modelFinancialEntities->get_financial_entity_by_reservation_id($reservationId);
                $this->data['message_element'] = "administrator/invoice_financial_entity";
                $this->data['buttons']['assign_fin_entity'] = [
                    'label' => 'Assign Financial Entity',
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_financial_entity_fin_data($entityId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelFinancialEntities = Model__financial_entities::class;
            $this->load->model($modelFinancialEntities);
            $entity = $this->$modelFinancialEntities->get_financial_entity_object_by_id($entityId);
            if ($entity->exists_in_db())
            {
                $this->data['entity'] = $entity;
                $this->data['message_element'] = "administrator/financial_entity_financial_data";
                $this->data['buttons']['fin_entity_add_fin_data'] = [
                    'label' => 'Add Bank Details',
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_schedule_select_action()
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->data['message_element'] = "schedule/modal_select_action";
        $this->_render();
    }

    public function modal_schedule_book($assetId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        if ($this->$modelUserAsset->check_your_privilege($assetId, $this->get_user_id()))
        {
            $modelFullRooms = Model__full_rooms::class;
            $this->load->model($modelFullRooms);
            $room = $this->$modelFullRooms->get_room_object_by_asset_id($assetId, true, false);
            if ($room->exists_in_db())
            {
                $this->lang->load('users', config_item('language_code'));
                $this->lang->load('payments', config_item('language_code'));
                $this->data['title'] = $this->lang->line('modals_booking_title') . " - " . $room->wrangle('defaulted_name')->value();
                $this->data['room'] = $room;
                $brainModel = Model__brainwrap::class;
                $this->load->model($brainModel);
                $this->data['bt_client_token'] = $this->$brainModel->get_client_token();
                $this->data['message_element'] = "schedule/modal_book";
                $this->data['buttons']['request_booking'] = [
                    'label' => $this->lang->line('common_book'),
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_schedule_hold($assetId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        if ($this->$modelUserAsset->check_your_privilege($assetId, $this->get_user_id()))
        {
            $modelSimpleRooms = Model__simple_rooms::class;
            $this->load->model($modelSimpleRooms);
            $room = $this->$modelSimpleRooms->get_room_object_by_asset_id($assetId, true, false);
            if ($room->exists_in_db())
            {
                $this->lang->load('users', config_item('language_code'));
                $this->lang->load('payments', config_item('language_code'));
                $this->data['title'] = $this->lang->line('modals_hold_title');
                $this->data['message_element'] = "schedule/modal_hold";
                $this->data['buttons']['add_event'] = [
                    'label' => $this->lang->line('modals_hold_title'),
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_schedule_block($assetId)
    {
        $this->lang->load('modals', config_item('language_code'));
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        if ($this->$modelUserAsset->check_your_privilege($assetId, $this->get_user_id()))
        {
            $modelSimpleRooms = Model__simple_rooms::class;
            $this->load->model($modelSimpleRooms);
            $room = $this->$modelSimpleRooms->get_room_object_by_asset_id($assetId, true, false);
            if ($room->exists_in_db())
            {
                $this->data['title'] = "Block - " . $room->wrangle('defaulted_name')->value();
                $this->data['room'] = $room;
                $this->data['message_element'] = "schedule/modal_block";
                $this->data['buttons']['add_event'] = [
                    'label' => 'Block',
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_location_edit_details($locationId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $location = $this->$modelLocations->get_location_by_id($locationId);
            if ($location->exists_in_db())
            {
                $this->data['title'] = "Edit Location";
                $this->data['location'] = $location;
                $this->data['parent_locations'] = $this->$modelLocations->get_location_objects_collection();
                $modelLocationCategories = Model__location_categories::class;
                $this->load->model($modelLocationCategories);
                $this->data['location_categories'] = $this->$modelLocationCategories->get_location_categories_collection();
                $this->data['message_element'] = "administrator/location";
                $this->data['buttons']['edit_location'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_location_add_details()
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $parent_locations = $this->$modelLocations->get_location_objects_collection();
            if ($parent_locations->exists_in_db())
            {
                $this->data['title'] = "Add Location";
                $this->data['location'] = new Location();
                $this->data['parent_locations'] = $parent_locations;
                $modelLocationCategories = Model__location_categories::class;
                $this->load->model($modelLocationCategories);
                $this->data['location_categories'] = $this->$modelLocationCategories->get_location_categories_collection();
                $this->data['message_element'] = "administrator/location";
                $this->data['buttons']['add_location'] = [
                    'label' => 'Add',
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_image_edit_details($imageId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelImages = Model__images::class;
            $this->load->model($modelImages);
            $image = $this->$modelImages->get_image_object_by_id($imageId);
            if ($image->exists_in_db())
            {
                $this->data['title'] = "Edit Image Comments";
                $this->data['image'] = $image;
                $this->data['message_element'] = "administrator/photo";
                $this->data['buttons']['edit_image'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_edit_member($asset_id, $user_id)
    {
        $this->lang->load('modals', config_item('language_code'));
        $userId = $this->get_user_id();
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        if ($this->$modelUserAsset->check_your_privilege($asset_id, $userId, Runt_User_Asset_Privilege::get_top_privilege()))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venues = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($asset_id, true);
            if ($venues->exists_in_db())
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->lang->load('users', config_item('language_code'));
                $this->data['title'] = $this->lang->line('modals_team_member_edit_title');
                $this->data['current_user_id'] = $userId;
                $modelUsers = Model__users::class;
                $this->load->model($modelUsers);
                $this->data['member'] = $this->$modelUsers->get_user_by_id($user_id);
                $this->data['venues'] = $venues;
                $this->data['member_venues'] = $this->$modelVenues->get_venues_by_user_asset_privileges($user_id, false, true);
                $modelCompanies = Model__companies::class;
                $this->load->model($modelCompanies);
                $this->data['member_company'] = $this->$modelCompanies->get_company_object_by_user_id($user_id);
                $this->data['message_element'] = "members/team_members";
                $this->data['buttons']['edit_member'] = [
                    'label' => $this->lang->line('common_save'),
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_add_team_member($asset_id)
    {
        $this->lang->load('modals', config_item('language_code'));
        $userId = $this->get_user_id();
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        if ($this->$modelUserAsset->check_your_privilege($asset_id, $userId, Runt_User_Asset_Privilege::get_top_privilege()))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venues = $this->$modelVenues->get_venue_object_collection_by_company_asset_id($asset_id, true);
            if ($venues->exists_in_db())
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->lang->load('users', config_item('language_code'));
                $this->data['title'] = $this->lang->line('dashboard_add_team_member');
                $this->data['current_user_id'] = $userId;
                $this->data['member'] = new User();
                $this->data['venues'] = $venues;
                $this->data['member_venues'] = new Base__Null();
                $this->data['member_company'] = new Base__Null();
                $this->data['message_element'] = "members/team_members";
                $this->data['buttons']['add_member'] = [
                    'label' => $this->lang->line('dashboard_add_team_member'),
                    'class' => 'btn-primary'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_add_user_member($asset_id)
    {
        $this->lang->load('modals', config_item('language_code'));
        $userId = $this->get_user_id();
        $modelUserAsset = Model__user_asset_privileges::class;
        $this->load->model($modelUserAsset);
        if ($this->$modelUserAsset->check_your_privilege($asset_id, $userId, Runt_User_Asset_Privilege::get_top_privilege()))
        {
            $this->lang->load('dashboard', config_item('language_code'));
            $this->lang->load('users', config_item('language_code'));
            $this->data['title'] = $this->lang->line('dashboard_add_user_member');
            $this->data['current_user_id'] = $userId;
            $this->data['member'] = new User();
            $this->data['message_element'] = "members/user_members";
            $this->data['buttons']['add_member'] = [
                'label' => $this->lang->line('dashboard_add_user_member'),
                'class' => 'btn-primary'
            ];
            $this->data['buttons']['cancel'] = [
                'label' => $this->lang->line('common_cancel'),
                'class' => 'btn-default'
            ];
            $this->data['reserved_false_modal_footer'] = false;
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_add_reviewer()
    {
        $this->lang->load('modals', config_item('language_code'));
        $userId = $this->get_user_id();
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venues = $this->$modelVenues->get_venues_by_user_asset_privileges($userId, true);
        if ($venues->exists_in_db())
        {
            $modelUserAsset = Model__user_asset_privileges::class;
            $this->load->model($modelUserAsset);
            if ($this->$modelUserAsset->check_your_privilege($venues->get_first()->get_asset_id(), $userId, Runt_User_Asset_Privilege::get_top_privilege()))
            {
                $this->lang->load('dashboard', config_item('language_code'));
                $this->lang->load('users', config_item('language_code'));
                $this->data['title'] = $this->lang->line('modals_reviewers_title');
                $this->data['venues'] = $venues;
                $this->data['message_element'] = "dashboard/modal_add_reviewers";
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_confirm()
    {
        $this->data['message_element'] = "common/modal_confirm";
        $this->data['buttons']['yes'] = [
            'label' => $this->lang->line('common_yes'),
            'class' => 'btn-success'
        ];
        $this->data['buttons']['cancel'] = [
            'label' => $this->lang->line('common_cancel'),
            'class' => 'btn-default'
        ];
        $this->data['reserved_false_modal_footer'] = false;
        $this->_render();
    }

    public function modal_delete()
    {
        $this->data['message_element'] = "common/modal_confirm";
        $this->data['buttons']['delete'] = [
            'label' => $this->lang->line('common_delete'),
            'class' => 'btn-danger'
        ];
        $this->data['buttons']['cancel'] = [
            'label' => $this->lang->line('common_cancel'),
            'class' => 'btn-default'
        ];
        $this->data['reserved_false_modal_footer'] = false;
        $this->_render();
    }

    public function modal_custom_alert()
    {
        $this->data['message_element'] = "common/modal_custom_alert";
        $this->data['buttons']['ok'] = [
            'label' => $this->lang->line('common_ok'),
            'class' => 'btn-default'
        ];
        $this->data['reserved_false_modal_footer'] = false;
        $this->_render();
    }

    public function modal_review_reply()
    {
        $this->lang->load('modals', config_item('language_code'));
        $this->lang->load('dashboard', config_item('language_code'));
        $this->data['title'] = $this->lang->line('modals_review_reply');
        $this->data['user_id'] = $this->get_user_id();
        $this->data['buttons']['reply_to_review'] = [
            'label' => $this->lang->line('dashboard_reply'),
            'class' => 'btn-success'
        ];
        $this->data['buttons']['cancel'] = [
            'label' => $this->lang->line('common_cancel'),
            'class' => 'btn-default'
        ];
        $this->data['message_element'] = "common/review_reply";
        $this->data['reserved_false_modal_footer'] = false;
        $this->_render();
    }

    public function modal_contact_details($venueId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $this->data['venue'] = $this->$modelVenues->get_venue_object_by_id($venueId, true, true);
            $this->data['message_element'] = "venues/venue_contact";
            $this->_set_display_type(self::MODAL);
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_hubspot_contact($vId, $interaction)
    {
        if ($this->user_is_admin())
        {
            $this->data['vId'] = $vId;
            $this->data['interaction'] = $interaction;
            $this->data['message_element'] = "administrator/hubspot_contact";
        }
        else
        {
            $this->lang->load('modals', config_item('language_code'));
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_venue_edit_details($venueId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_id($venueId, true);
            if ($venue->exists_in_db())
            {
                $modelVatRates = Model__vat_rates::class;
                $this->load->model($modelVatRates);
                $this->data['vat_rates'] = $this->$modelVatRates->get_vate_rate_collection();
                $this->data['venue'] = $venue;
                $this->data['buttons']['edit_venue'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-success'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/venue";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_venue_sponsor($venueId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_id($venueId, true);
            if ($venue->exists_in_db())
            {
                $modelRooms = Model__simple_rooms::class;
                $this->load->model($modelRooms);
                $this->data['rooms'] = $this->$modelRooms->get_room_object_collection_by_venue_id($venue->get_id(), true, false, true);
                $this->data['venue'] = $venue;
                $this->data['buttons']['update_venue_sponsor'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-success'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/venue_sponsor";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_venue_approve($venueId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_id($venueId, true);
            if ($venue->exists_in_db())
            {
                $modelRooms = Model__simple_rooms::class;
                $this->load->model($modelRooms);
                $this->data['rooms'] = $this->$modelRooms->get_room_object_collection_by_venue_id($venue->get_id(), true, false, true);
                $this->data['venue'] = $venue;
                $this->data['buttons']['update_venue_approve'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-success'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/venue_approve";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_onboard_venue($venueId)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_id($venueId, true);
            if ($venue->exists_in_db())
            {
                $this->data['venue'] = $venue;
                $this->data['title'] = $venue->get('name');
                $this->data['buttons']['confirm_update'] = [
                    'label' => $this->lang->line('common_update'),
                    'class' => 'btn-success'
                ];
                $this->data['buttons']['cancel'] = [
                    'label' => $this->lang->line('common_cancel'),
                    'class' => 'btn-default'
                ];
                $this->data['message_element'] = "administrator/onboard_venue";
                $this->data['reserved_false_modal_footer'] = false;
            }
            else
            {
                $this->data['message_element'] = "common/no_data";
            }
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }

    public function modal_show_email_status($status)
    {
        $this->lang->load('modals', config_item('language_code'));
        if ($this->user_is_admin())
        {
            $this->data['email_status'] = $status;
            $this->data['message_element'] = "administrator/email_status";
            $this->_set_display_type(self::MODAL);
        }
        else
        {
            $this->data['message_element'] = "common/no_data";
        }
        $this->_render();
    }
}
