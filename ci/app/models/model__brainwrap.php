<?php

class Model__brainwrap extends MY_Model
{
    function __construct()
    {
        parent::__construct();
        if (defined('ENVIRONMENT') && ENVIRONMENT == 'development')
        {
            Braintree_Configuration::environment('sandbox');
            Braintree_Configuration::merchantId('mbdph6fphphf4bm5');
            Braintree_Configuration::publicKey('qq75m3pzj6n682gb');
            Braintree_Configuration::privateKey('9bb18980ce205a64c00f36a6d723271c');
        }
        else
        {
            Braintree_Configuration::environment('production');
            Braintree_Configuration::merchantId('wqndsmqq8kxbxy4h');
            Braintree_Configuration::publicKey('jvpfs5vxsbdhz6hm');
            Braintree_Configuration::privateKey('0ed74ca7b22691b1f59c4c48fce26701');
        }
    }

    /*
     * Generate and return a client token
     *
     * @access  public
     * @return  int     the braintree client token
     */

    public function get_client_token()
    {
        return Braintree_ClientToken::generate();
    }

    /*
     * Make a sale and return the transaction id
     *
     * @access      public
     * @param       decimal     Transaction amount
     * @param       string      Payment Nonce
     * @return      boolean     true for success, false for failure
     *
     */

    public function make_sale(Payment_Request $paymentRequest)
    {
        $merchant_account_id = $this->_determine_merchant_account_from_currency($paymentRequest->get('currency'));
        $configArray = ['amount' => $paymentRequest->get('amount')];
        if ($paymentRequest->has_nonce())
        {

            $configArray['merchantAccountId'] = $merchant_account_id;
            $configArray['paymentMethodNonce'] = $paymentRequest->get('payment_nonce');
            $result = Braintree_Transaction::sale($configArray);
        }
        elseif ($paymentRequest->can_be_cloned())
        {
            if ($paymentRequest->has_instant_settlement())
            {
                $configArray['options']['submitForSettlement'] = true;
            }
            else
            {
                $configArray['options']['submitForSettlement'] = false;
            }
            $result = Braintree_Transaction::cloneTransaction($paymentRequest->get('clone_payment_ref'), $configArray);
        }
        if (isset($result))
        {
            $success = $result->success;
            if ($success)
            {
                $this->_last_transaction_id = $result->transaction->id;
            }
            else
            {
                $this->_last_transaction_error = $result->message;
            }
        }
        else
        {
            $success = false;
        }
        return $success;
    }

    public function get_last_transaction_id()
    {
        $retVal = false;
        if (isset($this->_last_transaction_id))
        {
            $retVal = $this->_last_transaction_id;
        }
        return $retVal;
    }

    public function get_last_error_message()
    {
        $retVal = false;
        if (isset($this->_last_transaction_error))
        {
            $retVal = print_r($this->_last_transaction_error, true);
        }
        return $retVal;
    }

    public function submit_for_settlement(Payment $payment)
    {
        $trans_id = $payment->get('external_reference');
        $amount = $payment->get('amount');
        $result = Braintree_Transaction::submitForSettlement($trans_id, $amount);
        $success = true;
        if (!$result->success)
        {
            $success = false;
            $emailModel = Model__email::class;
            $this->load->model($emailModel);
            $this->$emailModel->sendAdminMail('email_subject_admin_payment_failed', 'admin_payment_failed', ['{trans_id}' => $trans_id], 'admin_failed', 'payment');
            $this->load->helper('analytics');
            $analytics_helper = new Analytics_Helper();
            $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$payment->get('booking_id'), 'payment - settlement', $trans_id]);
            throw new Exception($result->message);
        }
        return $success;
    }

    public function void_transaction(Payment $payment)
    {
        $trans_id = $payment->get('external_reference');
        $result = Braintree_Transaction::void($trans_id);
        if (!$result->success)
        {
            $emailModel = Model__email::class;
            $this->load->model($emailModel);
            $this->$emailModel->sendAdminMail('email_subject_admin_void_failed', 'admin_void_failed', ['{trans_id}' => $trans_id], 'admin_failed', 'void');
            $this->load->helper('analytics');
            $analytics_helper = new Analytics_Helper();
            $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$payment->get('booking_id'), 'void', $trans_id]);
            throw new Exception($result->message);
        }
    }

    public function refund_transaction(Payment $payment)
    {
        $trans_id = $payment->get('external_reference');
        $result = Braintree_Transaction::refund($trans_id, $payment->get('amount'));
        if (!$result->success)
        {
            $emailModel = Model__email::class;
            $this->load->model($emailModel);
            $this->$emailModel->sendAdminMail('email_subject_admin_refund_failed', 'admin_refund_failed', ['{trans_id}' => $trans_id], 'admin_failed', 'refund');
            $this->load->helper('analytics');
            $analytics_helper = new Analytics_Helper();
            $analytics_helper->register_tracking_event('PAYMENT_FAILED', [$payment->get('booking_id'), 'refund', $trans_id]);
            throw new Exception($result->message);
        }
        return $result->transaction->id;
    }

    public function update_status_against_reality(Payment $payment)
    {
        $payment->set('payment_status_id', $this->_get_our_payment_status_from_braintree_ref(trim($payment->get('external_reference'))));
    }

    private function _get_our_payment_status_from_braintree_ref($paymentRef)
    {
        $paymentStatus = null;
        $transaction = Braintree_Transaction::find($paymentRef);
        if ($transaction->type === 'credit')
        {
            $paymentStatus = Payment_Status::REFUND;
        }
        else
        {
            switch ($transaction->status)
            {
                case "authorized":
                case "authorizing":

                    $paymentStatus = Payment_Status::CREATED;
                break;

                case "settlement_pending":
                case "settlement_confirmed":
                case "submitted_for_settlement":

                    $paymentStatus = Payment_Status::SUBMITTED;
                break;

                case "settled":
                case "settling":

                    $paymentStatus = Payment_Status::COMPLETE;
                break;

                case "voided":
                case "settlement_declined":
                case "failed":
                case "authorization_expired":
                case "gateway_rejected":
                case "processor_declined":

                    $paymentStatus = Payment_Status::VOID;
                break;

                default:
                    throw new Exception("Unknown payment status encountered. Please inform the Zipcube team! Thank you.");
            }
        }
        return $paymentStatus;
    }

    private function _determine_merchant_account_from_currency($currency)
    {
        $merchant_account_id = 'zipcubeGBP';
        switch ($currency)
        {
            case 'GBP':
            break;

            case 'EUR':

                $merchant_account_id = 'zipcubeEUR';
            break;

            case 'USD':

                $merchant_account_id = 'zipcubeUSD';
            break;

            default:
            break;
        }
        if (defined('ENVIRONMENT') && ENVIRONMENT == 'development')
        {
            $merchant_account_id = 'hhpdd746dcz36qfm';
        }
        return $merchant_account_id;
    }
}