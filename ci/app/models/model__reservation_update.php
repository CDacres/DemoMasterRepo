<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservation_update extends Model_Base__Reservation_Price_Update
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
            $resUpdate = new Reservation_Update();
            $resUpdate->set('id', $id);
        }
        return $resUpdate;
    }

    protected function _user_can_update(Reservation $object)
    {
        if (!is_a($object, Extended_Reservation::class))
        {
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $object = $this->$modelReservations->get_extended_reservation_by_id($object->get('id'));
        }
        $currentUserId = $this->get_user_id();
        if ($this->user_is_admin())
        {
            $retVal = true;
        }
        elseif ($object->waiting_on_user() && $object->get('client_id') === $currentUserId)
        {
            $retVal = true;
        }
        else
        {
            $modelUserAsserPriv = Model__user_asset_privileges::class;
            $this->load->model($modelUserAsserPriv);
            $retVal = $object->waiting_on_venue() && $this->$modelUserAsserPriv->check_your_privilege($object->get('asset_id'), $currentUserId, Runt_User_Asset_Privilege::APPROVAL);
        }
        return $retVal;
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $protoReservation = $this->$modelReservations->get_extended_reservation_by_id($object->get('id'));
        if (!$protoReservation->exists_in_db())
        {
            $object = new Base__Null();
        }
        else
        {
            if ($this->user_is_admin() && $object->data_exists('room_id') && $object->data_exists('start_date_time') && $object->data_exists('end_date_time') && ($object->get('room_id') != $protoReservation->get('room_id') || $object->get('start_date_time') != $protoReservation->get('start_date_time') || $object->get('end_date_time') != $protoReservation->get('end_date_time')))
            {
                if ($this->user_is_admin_in_spoofmode())
                {
                    throw new Exception('Please un-adopt the adopted profile in order to create switch.');
                }
                else
                {
                    $modelRooms = Model__room_skeletons::class;
                    $this->load->model($modelRooms);
                    $room = $this->$modelRooms->get_room_object_by_id($object->get('room_id'), false, false);
                    if ($room->exists_in_db())
                    {
                        $modelBookedPeriods = Model__booked_periods::class;
                        $this->load->model($modelBookedPeriods);
                        $reservation_check = $this->$modelBookedPeriods->check_booked_dates_with_reservation($room->get_asset_id(), $object->get('start_date_time'), $object->get('end_date_time'), $protoReservation->get_id());
                        if ($reservation_check !== false)
                        {
                            throw new Exception("Those dates are already booked by another reservation(s) (" . $reservation_check . ").");
                        }
                        $modelReservationSwitch = Model__reservation_switch::class;
                        $this->load->model($modelReservationSwitch);
                        $this->$modelReservationSwitch->insert_update($object, true);
                    }
                    else
                    {
                        throw new Exception('This room does not seem to exist.');
                    }
                }
            }
            else
            {
                if ($this->user_is_admin())
                {
                    if ($this->_compare_prices($protoReservation, $object))
                    {
                        $this->_handle_payments($protoReservation, $object);
                        if ($protoReservation->has_expired() && (!$object->data_exists('new_status_id') || ($object->data_exists('new_status_id') && ($object->get('new_status_id') != Reservation_Status::CANCELLEDBYHOST || $object->get('new_status_id') != Reservation_Status::CANCELLEDBYUSER))))
                        {
                            try
                            {
                                $this->$modelReservations->update_reservation_status($protoReservation, Reservation_Status::ACCEPTED, "Update of expired reservation", false);
                            }
                            catch (Exception $exc)
                            {
                                error_log("Unable to update reservation status: " . $exc->getMessage());
                            }
                        }
                    }
                    $dataToChange = false;
                    if ($object->data_exists('price') && $object->data_exists('toVenue') && ($object->get('toVenue') != $protoReservation->get('toVenue') || $this->_compare_prices($protoReservation, $object)))
                    {
                        $this->_handle_reservation_prices($protoReservation, $object, $protoReservation->get_venue_vat());
                        $dataToChange = true;
                    }
                    if ($object->data_exists('add_ons') && $object->get('add_ons') != $protoReservation->get('addOns'))
                    {
                        $protoReservation->set('addOns', $object->get('add_ons'));
                        $dataToChange = true;
                    }
                    $fieldArr = [
                        'guests',
                        'configuration',
                        'comments',
                        'zipcube_notes'
                    ];
                    foreach ($fieldArr as $field)
                    {
                        if ($object->data_exists($field) && $object->get($field) != $protoReservation->get($field))
                        {
                            $protoReservation->set($field, $object->get($field));
                            $dataToChange = true;
                        }
                    }
                    if ($dataToChange)
                    {
                        $this->$modelReservations->insert_update($protoReservation, true);
                    }
                }
                if ($object->data_exists('new_status_id') && $object->get('new_status_id') != $protoReservation->get('reservationStatus_id'))
                {
                    if (($protoReservation->get('reservationStatus_id') == Reservation_Status::CREATED && ($object->get('new_status_id') == Reservation_Status::ACCEPTED || $object->get('new_status_id') == Reservation_Status::DECLINE)) || ($protoReservation->get('reservationStatus_id') != Reservation_Status::CREATED && $object->get('new_status_id') != Reservation_Status::ACCEPTED && $object->get('new_status_id') != Reservation_Status::DECLINE))
                    {
                        try
                        {
                            $this->$modelReservations->update_reservation_status($protoReservation, $object->get('new_status_id'), $object->get('comments'), false);
                        }
                        catch (Exception $exc)
                        {
                            error_log("Unable to update reservation status: " . $exc->getMessage());
                        }
                    }
                }
            }
        }
        return $object;
    }
}