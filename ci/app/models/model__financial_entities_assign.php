<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__financial_entities_assign extends Model_Base__Unbound
{
    public function get_base_object_by_constraints($constraintArray)
    {
        return new Base__Null();
    }

    public function get_base_object_by_id($id, $userRequested = false)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($id);
        if ($userRequested && !$this->_user_can_update($reservation))
        {
            $finentAssign = new Base__Null();
        }
        else
        {
            $finentAssign = new Financial_Entity_Assign();
            $finentAssign->set('id', $id);
        }
        return $finentAssign;
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
        $reservation = $this->$modelReservations->get_extended_reservation_by_id($object->get('id'));
        if (!$reservation->exists_in_db())
        {
            $object = new Base__Null();
        }
        elseif ($this->user_is_admin() && $reservation->is_null('financial_entity_id'))
        {
            $modelVenues = Model__venues::class;
            $this->load->model($modelVenues);
            $venue = $this->$modelVenues->get_venue_object_by_id($reservation->get('venue_id'), true);
            if ($venue->exists_in_db())
            {
                $modelFinancialEntities = Model__financial_entities::class;
                $this->load->model($modelFinancialEntities);
                if ($object->data_exists('new_name'))
                {
                    $financialData = [];
                    if ($object->data_exists('account_code') && $object->data_not_empty('account_code'))
                    {
                        $financialData['account_code'] = $object->get('account_code');
                    }
                    if ($object->data_exists('sort_routing_code') && $object->data_not_empty('sort_routing_code'))
                    {
                        $financialData['sort_code'] = $object->get('sort_routing_code');
                    }
                    if ($object->data_exists('iban') && $object->data_not_empty('iban') != '')
                    {
                        $financialData['iban'] = $object->get('iban');
                    }
                    if ($object->data_exists('bic') && $object->data_not_empty('bic'))
                    {
                        $financialData['bic'] = $object->get('bic');
                    }
                    $financialEntity = new Financial_Entity();
                    $financialEntity->set('name', $object->get('new_name'));
                    $financialEntity->set('account_user', $venue->get('main_contact'));
                    if (count($financialData) > 0)
                    {
                        $financialEntity->set('financial_data', json_encode($financialData));
                    }
                    $newEntity = $this->$modelFinancialEntities->insert_update($financialEntity);
                    $dataToChange = true;
                    $venue->set('financial_entity_id', $newEntity->get_id());
                }
                elseif ($object->data_exists('existing_fin_id'))
                {
                    $existingEntity = $this->$modelFinancialEntities->get_financial_entity_object_by_id($object->get('existing_fin_id'));
                    if ($existingEntity->exists_in_db() && $venue->is_null('financial_entity_id'))
                    {
                        $dataToChange = true;
                        $venue->set('financial_entity_id', $existingEntity->get_id());
                    }
                }
                if ($dataToChange)
                {
                    $this->$modelVenues->insert_update($venue);
                }
            }
            else
            {
                throw new Exception("The venue does not exist, it has probably been \"deleted\".");
            }
        }
        return $object;
    }
}