<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__payments extends Model_Base__Object
{
    use Trait__Currency_Handler;

    private $_error_message = null;

    function __construct()
    {
        $this->_set_base_class(Payment::class);
        parent::__construct();
    }

    protected function _post_update($object)
    {
        if (!$object->audit_is_suppressed())
        {
            $this->_audit($object);
        }
    }

    protected function _post_insert($object)
    {
        $this->_audit($object);
    }

    private function _audit($object)
    {
        $auditModel = Model__payments_audit::class;
        $this->load->model($auditModel);
        $this->$auditModel->audit($object);
    }

    public function adjust_booking_payments_to_amount($bookingId, $newAmount)
    {
        $currentPayments = $this->get_payment_reference_collection_by_booking_id($bookingId);
        $this->_update_payment_statuses_against_reality($currentPayments);
        if (!$currentPayments->exist())
        {
            throw new Exception("There are not yet any payments associated with this booking.");
        }
        $grandTotal = round((($currentPayments->get_total_amount() * 100000) / 100000), 2);
        $roundednewAmount = round((($newAmount * 100000) / 100000), 2);
        if ($grandTotal != $roundednewAmount)
        {
            $multi_pay_refs = $this->get_multi_payments_by_booking_id($bookingId);
            if ($multi_pay_refs->get_count() == 0)
            {
                if ($grandTotal > $roundednewAmount)
                {
                    $currentPayments->consolidate_to_price($roundednewAmount);
                    $paymentsModel = Model__payments::class;
                    $this->load->model($paymentsModel);
                    $this->void_payments($currentPayments->get_payments_to_void());
                    $this->refund_payments($currentPayments->get_payments_to_refund());
                    $this->make_payment($currentPayments->get_new_payment_request());
                    $this->insert_update($currentPayments->get_continuing_valid_payments());
                }
                elseif ($grandTotal < $roundednewAmount)
                {
                    $repPayment = $currentPayments->get_representative_payment();
                    $difference = $roundednewAmount - $grandTotal;
                    $paymentRequest = $repPayment->as_cloned_request($difference);
                    $this->make_payment($paymentRequest);
                }
            }
            else
            {
                throw new Exception('The change in amount is trying to update too many braintree references. Please contact the tech team with the reservation id and amounts.');
            }
        }
    }

    public function void_payments(Payment___Collection $payments)
    {
        foreach ($payments->object() as $payment)
        {
            $transId = $payment->get('external_reference');
            try
            {
                switch ($payment->get('payment_type_id'))
                {
                    case Payment_Type::BRAINTREE:

                        $brainwrapModel = Model__brainwrap::class;
                        $this->load->model($brainwrapModel);
                        $this->$brainwrapModel->void_transaction($payment);
                    break;

                    case Payment_Type::INVOICE:
                    case Payment_Type::VENUEINVOICE:
                    case Payment_Type::BACS:
                    break;

                    default:

                        $emailModel = Model__email::class;
                        $this->load->$emailModel;
                        $subject = 'email_subject_admin_void_failed';
                        $this->$emailModel->sendAdminMail($subject, 'admin_void_failed', ['{trans_id}' => $transId], 'admin_failed', 'void');
                        $this->load->helper('analytics');
                        $analytics_helper = new Analytics_Helper();
                        $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$payment->get('booking_id'), 'void', $transId]);
                    break;
                }
            }
            catch (Exception $ex)
            {
                throw new Exception("Payment provider problem with voiding " . $transId . ". Please check the logs and rectify. Message - " . $ex->getMessage());
            }
            $this->_update_payment_status($payment, Payment_Status::VOID);
        }
    }

    public function refund_payments(Payment___Collection $payments)
    {
        foreach ($payments->object() as $payment)
        {
            $transId = $payment->get('external_reference');
            try
            {
                $transactionId = null;
                switch ($payment->get('payment_type_id'))
                {
                    case Payment_Type::BRAINTREE:

                        $brainwrapModel = Model__brainwrap::class;
                        $this->load->model($brainwrapModel);
                        $transactionId = $this->$brainwrapModel->refund_transaction($payment);
                    break;

                    case Payment_Type::INVOICE:
                    case Payment_Type::VENUEINVOICE:
                    case Payment_Type::BACS:

                        $transactionId = "REFUND AGAINST " . $transId;
                    break;

                    default:

                        $emailModel = Model__email::class;
                        $this->load->$emailModel;
                        $subject = 'email_subject_admin_refund_failed';
                        $this->$emailModel->sendAdminMail($subject, 'admin_refund_failed', ['{trans_id}' => $transId], 'admin_failed', 'refund');
                        $this->load->helper('analytics');
                        $analytics_helper = new Analytics_Helper();
                        $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$payment->get('booking_id'), 'refund', $transId]);
                    break;
                }
            }
            catch (Exception $ex)
            {
                throw new Exception("Payment provider problem with refunding " . $transId . ". Please check the logs and rectify. Message - " . $ex->getMessage());
            }
            $payment->anonymise();
            $payment->set('external_reference', $transactionId);
            $this->_update_payment_status($payment, Payment_Status::REFUND);
        }
    }

    public function void_transaction_from_booking_id($bookingId)
    {
        $objectOrCollection = $this->get_base_object_collection_by_constraints(['booking_id' => $bookingId]);
        $this->void_payments($objectOrCollection);
    }

    public function settle_transaction_from_booking_id($bookingId)
    {
        $objectOrCollection = $this->get_base_object_collection_by_constraints(['booking_id' => $bookingId]);
        foreach ($objectOrCollection->object() as $payment)
        {
            if ($payment->is_pending())
            {
                $transId = $payment->get('external_reference');
                try
                {
                    switch ($payment->get('payment_type_id'))
                    {
                        case Payment_Type::BRAINTREE:

                            $brainwrapModel = Model__brainwrap::class;
                            $this->load->model($brainwrapModel);
                            $this->$brainwrapModel->submit_for_settlement($payment);
                        break;

                        case Payment_Type::INVOICE:
                        case Payment_Type::VENUEINVOICE:
                        case Payment_Type::BACS:
                        break;

                        default:

                            $emailModel = Model__email::class;
                            $this->load->$emailModel;
                            $subject = 'email_subject_admin_payment_failed';
                            $this->$emailModel->sendAdminMail($subject, 'admin_payment_failed', ['{trans_id}' => $transId], 'admin_failed', 'payment');
                            $this->load->helper('analytics');
                            $analytics_helper = new Analytics_Helper();
                            $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$payment->get('booking_id'), 'payment - unknown payment type', $transId]);
                        break;
                    }
                }
                catch (Exception $ex)
                {
                    throw new Exception("Payment provider problem with settling " . $transId . ". Please check the logs and rectify. Message - " . $ex->getMessage());
                }
                $this->_update_payment_status($payment, Payment_Status::COMPLETE);
            }
        }
    }

    public function refund_transaction_from_booking_id($bookingId) //Not currently used - needs to be confirmed by admin.
    {
        $payments = $this->get_base_object_collection_by_constraints(['booking_id' => $bookingId]);
        $this->refund_payments($payments);
    }

    private function _update_payment_status($payment, $status)
    {
        $payment->set('payment_status_id', $status);
        $this->insert_update($payment);
    }

    public function make_payment(Payment_Request $paymentRequest = null)
    {
        if ($paymentRequest !== null)
        {
            $transactionId = null;
            $paymentTypeId = $paymentRequest->get('payment_type_id');
            switch ($paymentTypeId)
            {
                case Payment_Type::INVOICE:

                    $modelBusinessUsers = Model__business_users::class;
                    $this->load->model($modelBusinessUsers);
                    $business_user = $this->$modelBusinessUsers->get_business_user_by_id($this->get_user_id());
                    if (!$this->user_is_admin() && $business_user->is_null('id'))
                    {
                        throw new Exception('Error generating payment: you do not have permission to make an invoice payment. If you feel this is an error please contact the Zipcube team.');
                    }
                    $transactionId = "INVOICE";
                break;

                case Payment_Type::BRAINTREE:

                    $transactionId = $this->_make_braintree_payment($paymentRequest);
                break;

                case Payment_Type::VENUEINVOICE:

                    if ($paymentRequest->can_be_cloned())
                    {
                        $transactionId = $paymentRequest->get('clone_payment_ref');
                    }
                    else
                    {
                        $transactionId = $paymentRequest->get('external_reference');
                    }
                break;

                case Payment_Type::BACS:

                    if (!$this->user_is_admin())
                    {
                        throw new Exception('Error generating payment: you do not have permission to make an bacs payment. If you feel this is an error please contact the Zipcube team.');
                    }
                    $transactionId = $paymentRequest->get('external_reference');
                break;

                default:
                break;
            }
            if ($transactionId !== null)
            {
                try
                {
                    $payment = $paymentRequest->generate_payment($transactionId);
                    $this->insert_update($payment);
                    if ($paymentRequest->has_instant_settlement())
                    {
                        $this->_update_payment_status($payment, Payment_Status::COMPLETE);
                    }
                }
                catch (Exception $ex)
                {
                    throw new Exception('Error generating payment: ' . $ex->getMessage());
                }
            }
            else
            {
                throw new Exception('Error generating payment: invalid payment type. Please report this error to the Zipcube team.');
            }
        }
    }

    private function _make_braintree_payment(Payment_Request $paymentRequest)
    {
        $brainwrapModel = Model__brainwrap::class;
        $this->load->model($brainwrapModel);
        if ($this->$brainwrapModel->make_sale($paymentRequest))
        {
            return $this->$brainwrapModel->get_last_transaction_id();
        }
        else
        {
            $this->load->helper('analytics');
            $analytics_helper = new Analytics_Helper();
            $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$paymentRequest->get('booking_id'), 'payment']);
            throw new Exception("We're afraid your payment attempt was unsuccessful - the secure credit card server returned this response: " . $this->$brainwrapModel->get_last_error_message());
        }
    }

    private function _set_error($message)
    {
        $this->_error_message = $message;
    }

    public function get_last_error()
    {
        $message = $this->_error_message;
        $this->_error_message = null;
        return $message;
    }

    public function get_payment_reference_collection_by_booking_id($bookingid)
    {
        $this->db->advanced_join(Payment::class, Payment_Status::class, Payment::column('payment_status_id', false), Payment_Status::id_column(false));
        $this->db->select_alias(Payment_Status::column('name'), Payment::alias('status_name'));
        $this->db->where(Payment::column('booking_id'), $bookingid);
        return new Payment___Collection($this->_query_init_and_run(false));
    }

    private function _update_payment_statuses_against_reality($currentPayments)
    {
        foreach ($currentPayments->object() as $payment)
        {
            $this->_update_payment_status_against_reality($payment);
        }
    }

    private function _update_payment_status_against_reality(Payment $payment)
    {
        switch ($payment->get('payment_type_id'))
        {
            case Payment_Type::BRAINTREE:

                $brainwrapModel = Model__brainwrap::class;
                $this->load->model($brainwrapModel);
                $this->$brainwrapModel->update_status_against_reality($payment);
            break;

            case Payment_Type::VENUEINVOICE:
            case Payment_Type::BACS:

                $payment->set('payment_status_id', Payment_Status::COMPLETE);
            break;

            default:
            break;
        }
    }

    public function get_payment_object_by_id_and_type($id, $type_id)
    {
        return new Payment($this->_get_payment_object_by_id_and_type($id, $type_id));
    }

    private function _get_payment_object_by_id_and_type($id, $type_id)
    {
        $this->_query_join_currencies(Payment::class, Payment::column('currency', false), [
            'left' => 'pay_currency_symbol_left',
            'right' => 'pay_currency_symbol_right'
        ]);
        $this->db->where(Payment::id_column(), $id);
        $this->db->where(Payment::column('payment_type_id'), $type_id);
        return $this->_query_init_and_run();
    }

    public function get_payments_needing_status_check()
    {
        return new Payment___Collection($this->_get_payments_needing_status_check());
    }

    private function _get_payments_needing_status_check()
    {
        $this->db->distinct();
        $this->db->advanced_join(Payment::class, Booking::class, Payment::column('booking_id', false), Booking::id_column(false));
        $this->db->advanced_join(Booking::class, Reservation::class, Booking::id_column(false), Reservation::column('booking_id', false));
        $this->db->start_group_where(Payment::column('payment_status_id'), Payment_Status::CREATED);
        $this->db->or_where(Payment::column('payment_status_id'), Payment_Status::SUBMITTED);
        $this->db->close_group_where();
        $this->db->where(Payment::column('payment_type_id'), Payment_Type::BRAINTREE);
        $this->db->where(Payment::column('external_reference') . ' <> "STRIPE"');
        $this->db->where(Payment::column('external_reference') . ' <> "paypal"');
        $this->db->where(Reservation::column('reservationStatus_id') . ' <>', Reservation_Status::CREATED);
        $this->db->where(Reservation::column('reservationStatus_id') . ' <>', Reservation_Status::BLOCKED);
        $this->db->where(Reservation::column('reservationStatus_id') . ' <>', Reservation_Status::DELETED);
        $this->db->where(Reservation::column('reservationStatus_id') . ' <>', Reservation_Status::EXPIRED);
        $this->db->where(Reservation::column('reservationStatus_id') . ' <>', Reservation_Status::DECLINE);
        return $this->_query_init_and_run(false);
    }

    public function get_multi_payments_by_booking_id($bookingid)
    {
        return new Payment___Collection($this->_get_multi_payments_by_booking_id($bookingid));
    }

    private function _get_multi_payments_by_booking_id($bookingid)
    {
        $multi_ref = 'multi_ref';
        $this->db->advanced_join(Payment::class, Payment::class, Payment::column('external_reference', false), Payment::column('external_reference', false), "INNER", null, $multi_ref);
        $this->db->where(Payment::column('booking_id'), $bookingid);
        $this->db->where(Payment::column('payment_type_id'), Payment_Type::BRAINTREE);
        $this->db->where(Payment::column('payment_type_id', true, $multi_ref), Payment_Type::BRAINTREE);
        $this->db->where(Payment::column('booking_id') . ' <> ' . Payment::column('booking_id', true, $multi_ref));
        return $this->_query_init_and_run(false);
    }
}