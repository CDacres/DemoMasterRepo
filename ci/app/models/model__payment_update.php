<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__payment_update extends Model_Base__Unbound
{
    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        $modelPayment = Model__payments::class;
        $this->load->model($modelPayment);
        $payment = $this->$modelPayment->get_base_object_by_id($id);
        if ($userRequested && !$this->_user_can_update($payment))
        {
            $resUpdate = new Base__Null();
        }
        else
        {
            $resUpdate = new Payment_Update();
            $resUpdate->set('id', $id);
        }
        return $resUpdate;
    }

    protected function _user_can_update(Payment $object)
    {
        return $this->user_is_admin();
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelPayment = Model__payments::class;
        $this->load->model($modelPayment);
        $payment = $this->$modelPayment->get_base_object_by_id($object->get('id'));
        if (!$payment->exists_in_db())
        {
            $object = new Base__Null();
        }
        else
        {
            if ($this->_user_can_update($payment))
            {
                $payment->suppress_audit_on_update();
                $payment->set('payment_type_id', $object->get('payment_type_id'));
                $payment->set('external_reference', trim($object->get('external_reference')));
                if ($object->get('notes') != '')
                {
                    $payment->set('notes', $object->get('notes'));
                }
                $payment->set('paid_date', $object->get('paid_date'));
                $payment->set('account', $object->get('account'));
                $this->$modelPayment->insert_update($payment);
            }
        }
        return $object;
    }
}