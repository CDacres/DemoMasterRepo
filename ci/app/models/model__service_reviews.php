<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__service_reviews extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Service_Review::class);
        parent::__construct();
    }

    protected function _user_can_insert($object)
    {
        $retVal = false;
        $user = $this->get_user();
        if ($user !== null)
        {
            if ($user->is_admin())
            {
                $retVal = true;
            }
            else
            {
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                if ($this->$modelReservations->check_extended_reservation_by_user($object->get('reservation_id'), $this->get_user_id()))
                {
                    $retVal = true;
                }
            }
        }
        return $retVal;
    }

    protected function _pre_insert($object)
    {
        $user = $this->get_user();
        if ($user !== null)
        {
            $object->set('user_id', $this->get_user_id());
        }
        $object->set('created', date("Y-m-d H:i:s"));
    }

    protected function _post_insert($object)
    {
        $this->load->helper('analytics');
        $analytics_helper = new Analytics_Helper();
        $analytics_helper->register_tracking_event('VOLUNTARY_INTERACTION', ['User added net promotor score']);
    }
}