<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__payment_insert extends Model_Base__Unbound
{
    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $protoReservation = $this->$modelReservations->get_extended_reservation_by_id($id);
        if ($userRequested && !$this->_user_can_update($protoReservation))
        {
            $resUpdate = new Base__Null();
        }
        else
        {
            $resUpdate = new Payment_Insert();
            $resUpdate->set('reservation_id', $id);
        }
        return $resUpdate;
    }

    protected function _user_can_insert(Payment_Insert $object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_update(Reservation $object)
    {
        return $this->user_is_admin();
    }

    public function insert_update($object, $userRequested = false)
    {
        if (!$this->_user_can_insert($object))
        {
            throw new Exception("Only admins can create payments");
        }
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $protoReservation = $this->$modelReservations->get_extended_reservation_by_id($object->get('reservation_id'));
        if (!$protoReservation->exists_in_db())
        {
            $object = new Base__Null();
        }
        else
        {
            $this->_handle_payment_insert($object, $protoReservation);
            $this->_handle_reservation_update($object, $protoReservation, $modelReservations);
        }
        return $object;
    }

    private function _handle_payment_insert($object, $protoReservation)
    {
        $paymentRequest = new Payment_Request();
        $paymentRequest->set('booking_id', $protoReservation->get('booking_id'));
        $paymentRequest->set('payment_type_id', $object->get('payment_type_id'));
        $paymentRequest->set('amount', $object->get('payment_amount'));
        $paymentRequest->set('payment_nonce', $object->get('payment_nonce'));
        $paymentRequest->set('currency', $protoReservation->get('currency'));
        $paymentRequest->set('notes', $object->get('notes'));
        if ($object->get('payment_type_id') == Payment_Type::BACS)
        {
            $paymentRequest->requires_instant_settlement();
            $paymentRequest->set('external_reference', trim($object->get('external_reference')));
            $paymentRequest->set('paid_date', $object->get('paid_date'));
            $paymentRequest->set('account', $object->get('account'));
        }
        $modelPayments = Model__payments::class;
        $this->load->model($modelPayments);
        try
        {
            $this->$modelPayments->make_payment($paymentRequest);
        }
        catch (Exception $ex)
        {
            throw new Exception($ex->getMessage());
        }
    }

    private function _handle_reservation_update($object, $protoReservation, $modelReservations)
    {
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($protoReservation->get('asset_id'), true);
        if (!$venue->exists_in_db())
        {
            throw new Exception('Sorry - that space is not currently available.');
        }
        $commissionRate = $this->$modelVenues->get_asset_commission_percentage($venue, $protoReservation->get('booking_channel_id'));
        $price = $protoReservation->get('price');
        if (!$object->is_null('payment_price') && $object->get('payment_price') > 0)
        {
            $price += $object->get('payment_price');
        }
        $commission = ((ceil($price * $commissionRate * 1000)) / 100000);
        $protoReservation->set('price', $price);
        $protoReservation->set('toZipcube', $commission);
        $protoReservation->set('toVenue', ($price - $commission));
        $protoReservation->set('flexible_applied', $object->get('flexible_applied'));
        $venue_vat = $venue->get_venue_vat();
        $extra_fee = ((!$protoReservation->is_null('extra_fee'))?($protoReservation->get('extra_fee') + $protoReservation->get('extra_fee_vat')):0);
        if (!$object->is_null('payment_extra_fee') && $object->get('payment_extra_fee') > 0)
        {
            $extra_fee += $object->get('payment_extra_fee');
        }
        $flexible_fee = ((!$protoReservation->is_null('flexible_fee'))?($protoReservation->get('flexible_fee') + $protoReservation->get('flexible_fee_vat')):0);
        if (!$object->is_null('payment_flexible_fee') && $object->get('payment_flexible_fee') > 0)
        {
            $flexible_fee += $object->get('payment_flexible_fee');
        }
        if ($venue_vat > 0)
        {
            $protoReservation->set('toVenue_vat', ($commission * ($venue_vat / 100)));
            if (isset($extra_fee))
            {
                $extra_fee_without_vat = ($extra_fee / (1 + ($venue_vat / 100)));
                $protoReservation->set('extra_fee', $extra_fee_without_vat);
                $protoReservation->set('extra_fee_vat', ($extra_fee - $extra_fee_without_vat));
            }
            else
            {
                $protoReservation->set('extra_fee', 0);
                $protoReservation->set('extra_fee_vat', 0);
            }
            if (isset($flexible_fee))
            {
                $flexible_fee_without_vat = ($flexible_fee / (1 + ($venue_vat / 100)));
                $protoReservation->set('flexible_fee', $flexible_fee_without_vat);
                $protoReservation->set('flexible_fee_vat', ($flexible_fee - $flexible_fee_without_vat));
            }
            else
            {
                $protoReservation->set('flexible_fee', 0);
                $protoReservation->set('flexible_fee_vat', 0);
            }
        }
        else
        {
            $protoReservation->set('toVenue_vat', 0);
            $protoReservation->set('extra_fee', ((isset($extra_fee))?$extra_fee:0));
            $protoReservation->set('extra_fee_vat', 0);
            $protoReservation->set('flexible_fee', ((isset($flexible_fee))?$flexible_fee:0));
            $protoReservation->set('flexible_fee_vat', 0);
        }
        $this->$modelReservations->insert_update($protoReservation, true);
    }
}