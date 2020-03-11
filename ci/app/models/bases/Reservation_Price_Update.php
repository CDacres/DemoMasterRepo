<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Model_Base__Reservation_Price_Update extends Model_Base__Unbound
{
    protected function _compare_prices($reservation, $object)
    {
        $retVal = false;
        if ($object->data_exists('price') && $object->get('price') != $reservation->get('price'))
        {
            $retVal = true;
        }
        elseif ($object->data_exists('extra_fee') && $object->get('extra_fee') != $reservation->get_price_update_extra_fee())
        {
            $retVal = true;
        }
        elseif ($object->data_exists('flexible_fee') && $object->get('flexible_fee') != $reservation->get_price_update_flexible_fee())
        {
            $retVal = true;
        }
        elseif ($object->data_exists('price_control_fee') && $object->get('price_control_fee') != $reservation->get_price_update_price_control_fee())
        {
            $retVal = true;
        }
        return $retVal;
    }

    protected function _handle_payments($reservation, $object)
    {
        //change braintree amounts
        $newPrice = $object->get('price');
        if (!$object->is_null('extra_fee') && $object->data_exists('extra_fee'))
        {
            $newPrice += $object->get('extra_fee');
        }
        if (!$object->is_null('flexible_fee') && $object->data_exists('flexible_fee'))
        {
            $newPrice += $object->get('flexible_fee');
        }
        if (!$object->is_null('price_control_fee') && $object->data_exists('price_control_fee'))
        {
            $newPrice += $object->get('price_control_fee');
        }
        $modelPayments = Model__payments::class;
        $this->load->model($modelPayments);
        $this->$modelPayments->adjust_booking_payments_to_amount($reservation->get('booking_id'), $newPrice);
    }

    protected function _handle_reservation_prices($reservation, $object, $venue_vat, $switch = false)
    {
        if (!$object->is_null('extra_fee') && $object->data_exists('extra_fee'))
        {
            $extra_fee = $object->get('extra_fee');
        }
        if (!$object->is_null('flexible_fee') && $object->data_exists('flexible_fee') && $object->get('flexible_fee') > 0)
        {
            $flexible_fee = $object->get('flexible_fee');
        }
        if (!$object->is_null('price_control_fee') && $object->data_exists('price_control_fee') && $object->get('price_control_fee') > 0)
        {
            $price_control_fee = $object->get('price_control_fee');
        }
        if (!$switch)
        {
            $price = $object->get('price');
            $toVenue = $object->get('toVenue');
            $reservation->set('price', $price);
            $reservation->set('toVenue', $toVenue);
            $reservation->set('flexible_applied', $object->get('flexible_applied'));
            if (!$object->is_null('add_on_price'))
            {
                $reservation->set('add_on_price', $object->get('add_on_price'));
            }
            else
            {
                $reservation->set('add_on_price', 0);
            }
            $reservation->set('price_control_applied', $object->get('price_control_applied'));
        }
        if ($venue_vat > 0)
        {
            $reservation->set('toVenue_vat', ((($switch)?$reservation->get('toZipcube'):($price - $toVenue)) * ($venue_vat / 100)));
            if (isset($extra_fee))
            {
                $extra_fee_without_vat = ($extra_fee / (1 + ($venue_vat / 100)));
                $reservation->set('extra_fee', $extra_fee_without_vat);
                $reservation->set('extra_fee_vat', ($extra_fee - $extra_fee_without_vat));
            }
            else
            {
                $reservation->set('extra_fee', 0);
                $reservation->set('extra_fee_vat', 0);
            }
            if (isset($flexible_fee))
            {
                $flexible_fee_without_vat = ($flexible_fee / (1 + ($venue_vat / 100)));
                $reservation->set('flexible_fee', $flexible_fee_without_vat);
                $reservation->set('flexible_fee_vat', ($flexible_fee - $flexible_fee_without_vat));
            }
            else
            {
                $reservation->set('flexible_fee', 0);
                $reservation->set('flexible_fee_vat', 0);
            }
            if (isset($price_control_fee))
            {
                $price_control_fee_without_vat = ($price_control_fee / (1 + ($venue_vat / 100)));
                $reservation->set('price_control_fee', $price_control_fee_without_vat);
                $reservation->set('price_control_fee_vat', ($price_control_fee - $price_control_fee_without_vat));
            }
            else
            {
                $reservation->set('price_control_fee', 0);
                $reservation->set('price_control_fee_vat', 0);
            }
        }
        else
        {
            $reservation->set('toVenue_vat', 0);
            $reservation->set('extra_fee', ((isset($extra_fee))?$extra_fee:0));
            $reservation->set('extra_fee_vat', 0);
            $reservation->set('flexible_fee', ((isset($flexible_fee))?$flexible_fee:0));
            $reservation->set('flexible_fee_vat', 0);
            $reservation->set('price_control_fee', ((isset($price_control_fee))?$price_control_fee:0));
            $reservation->set('price_control_fee_vat', 0);
        }
    }
}