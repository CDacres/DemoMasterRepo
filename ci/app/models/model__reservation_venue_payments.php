<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__reservation_venue_payments extends Model_Base__Object
{
    use Trait__Currency_Handler;

    public function __construct()
    {
        $this->_set_base_class(Reservation_Venue_Payment::class);
        parent::__construct();
    }

    protected function _user_can_insert($object)
    {
        return $this->user_is_admin();
    }

    protected function _pre_insert($object)
    {
        $object->set('user_id', $this->get_user_id());
        $object->set('date_time', date("Y-m-d H:i:s"));
    }

    protected function _post_insert($object)
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        $reservation = $this->$modelReservations->get_base_object_by_id($object->get('reservation_id'));
        if ($reservation->exists_in_db() && !$reservation->is_true('is_paid'))
        {
            $reservation->set('is_paid', true);
            $this->$modelReservations->insert_update($reservation);
        }
    }

    public function get_reservation_venue_payments_collection_by_id($reservation_id)
    {
        return new Reservation_Venue_Payment___Collection($this->_get_reservation_venue_payments_collection_by_id($reservation_id));
    }

    private function _get_reservation_venue_payments_collection_by_id($reservation_id)
    {
        $this->db->advanced_join(Reservation_Venue_Payment::class, Reservation::class, Reservation_Venue_Payment::column('reservation_id', false), Reservation::id_column(false));
        $this->_query_join_currencies(Reservation::class, Reservation::column('currency', false), [
            'left' => 'currency_symbol_left',
            'right' => 'currency_symbol_right'
        ]);
        $this->db->advanced_join(Reservation_Venue_Payment::class, User::class, Reservation_Venue_Payment::column('user_id', false), User::id_column(false));
        $this->db->advanced_join(User::class, Profile::class, User::id_column(false), Profile::column('user_id', false));
        $this->db->select_alias(Profile::column('first_name'), Reservation_Venue_Payment::alias('first_name'));
        $this->db->select_alias(Profile::column('last_name'), Reservation_Venue_Payment::alias('last_name'));
        $this->db->select_alias(Profile::column('phone_number'), Reservation_Venue_Payment::alias('phone_number'));
        $this->db->select_alias(Profile::column('phone_number_search'), Reservation_Venue_Payment::alias('phone_number_search'));
        $this->db->select_alias(User::column('email'), Reservation_Venue_Payment::alias('email'));
        $this->db->where(Reservation_Venue_Payment::column('reservation_id'), $reservation_id);
        $this->db->order_by(Reservation_Venue_Payment::column('date_time'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}