<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservation_switch extends Model_Base__Reservation_Price_Update
{
    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        return new Base__Null();
    }

    protected function _user_can_update(Reservation $object)
    {
        return $this->user_is_admin();
    }

    protected function _user_can_insert()
    {
        return $this->user_is_admin();
    }

    public function insert_update($object, $userRequested = false)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $oldReservation = $this->$modelReservations->get_extended_reservation_by_id($object->get('id'));
        if (!$oldReservation->exists_in_db())
        {
            $object = new Base__Null();
        }
        else
        {
            if (!$oldReservation->can_be_switched())
            {
                throw new Exception("This reservation cannot be switched due to it's status");
            }
            if ($this->_user_can_update($oldReservation))
            {
                $modelAssets = Model__assets::class;
                $this->load->model($modelAssets);
                $asset = $this->$modelAssets->get_asset_object_by_reference_id_and_type($object->get('room_id'), Asset_Type::ROOM);
                if ($asset->exists_in_db())
                {
                    $assetId = $asset->get_id();
                    $modelVenues = Model__venues::class;
                    $this->load->model($modelVenues);
                    $venue = $this->$modelVenues->get_venue_object_by_room_asset_id($assetId);
                    if ($venue->exists_in_db())
                    {
                        $modelRooms = Model__room_skeletons::class;
                        $this->load->model($modelRooms);
                        $room = $this->$modelRooms->get_room_object_by_asset_id($assetId, false, false);
                        if ($room->exists_in_db())
                        {
                            if ($this->_compare_prices($oldReservation, $object))
                            {
                                $this->_handle_payments($oldReservation, $object);
                            }
                            $oldReservation->suppress_finances_on_insert_update();
                            $oldReservation->suppress_emails_on_insert_update(true, false);
                            try
                            {
                                $this->$modelReservations->update_reservation_status($oldReservation, $oldReservation->get_relevant_switch_closure_status(), "Reservation Switch", false);
                            }
                            catch (Exception $exc)
                            {
                                error_log("Unable to update reservation status: " . $exc->getMessage());
                            }
                            if ($this->_user_can_insert())
                            {
                                $newReservation = $object->generate_reservation($assetId);
                                $newReservation->set('booking_id', $oldReservation->get('booking_id'));
                                $newReservation->set('title', $oldReservation->get('title'));
                                $newReservation->set('currency', $room->get('currency_code'));
                                $newReservation->set('discount_applied', $oldReservation->get('discount_applied'));
                                $newReservation->set('assigned_user', $oldReservation->get('assigned_user'));
                                $newReservation->set('source', $oldReservation->get('source'));
                                $newReservation->set('hubspot_id', $oldReservation->get('hubspot_id'));
                                $this->_handle_reservation_prices($newReservation, $object, $venue->get_venue_vat());
                                $newReservation->append_note("Switched from reservation " . $oldReservation->get('id'));
                                try
                                {
                                    $this->$modelReservations->insert_update($newReservation);
                                    $room->set('last_booked', date("Y-m-d H:i:s"));
                                    $this->$modelRooms->insert_update($room);
                                }
                                catch (Exception $ex)
                                {
                                    throw new Exception("This switch has failed. The old reservation has been cancelled, but the new reservation was not made. Please contact the tech team, quoting error: " . $ex->getMessage());
                                }
                                $oldReservation->set('requires_switch', 0);
                                $oldReservation->append_note("Switched to reservation " . $newReservation->get('id'));
                                $this->$modelReservations->insert_update($oldReservation);
                                try
                                {
                                    $this->$modelReservations->update_reservation_status($newReservation, Reservation_Status::CREATED, "Automatic Switch Creation", false);
                                }
                                catch (Exception $exc)
                                {
                                    error_log("Unable to update reservation status: " . $exc->getMessage());
                                }
                                $modelBookings = Model__bookings::class;
                                $this->load->model($modelBookings);
                                $booking = $this->$modelBookings->get_base_object_by_id($newReservation->get('booking_id'));
                                if ($booking->is_closed())
                                {
                                    $booking->set('closed');
                                    $booking->set('bookingStatus_id');
                                    $this->$modelBookings->insert_update($booking);
                                }
                            }
                            else
                            {
                                $object = new Base__Null();
                            }
                        }
                        else
                        {
                            throw new Exception('This room is not approved.');
                        }
                    }
                    else
                    {
                        throw new Exception('This room\'s venue is not approved.');
                    }
                }
                else
                {
                    throw new Exception('This room does not seem to exist.');
                }
            }
            else
            {
                $object = new Base__Null();
            }
        }
        return $object;
    }
}