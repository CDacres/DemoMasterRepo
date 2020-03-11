<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Reservation_Update extends Base__Ghost_Object
{
    protected static $_modelName = Model__Reservation_Update::class;
    protected static $_aliases = [
        'room_id' => [
            'pointer' => 'room_id',
            'validations' => 'is_natural_no_zero'
        ],
        'start_date_time' => [
            'pointer' => 'start_date_time',
            'validations' => 'is_date_time'
        ],
        'end_date_time' => [
            'pointer' => 'end_date_time',
            'validations' => 'is_date_time'
        ],
        'guests' => [
            'pointer' => 'guests',
            'validations' => 'is_natural_no_zero'
        ],
        'price' => [
            'pointer' => 'price',
            'validations' => 'is_numeric_positive'
        ],
        'toVenue' => [
            'pointer' => 'toVenue',
            'validations' => 'is_numeric_positive'
        ],
        'extra_fee' => [
            'pointer' => 'extra_fee',
            'validations' => 'is_numeric|empty_null'
        ],
        'flexible_applied' => [
            'pointer' => 'flexible_applied',
            'validations' => 'is_boolean'
        ],
        'flexible_fee' => [
            'pointer' => 'flexible_fee',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_applied' => [
            'pointer' => 'price_control_applied',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'price_control_fee' => [
            'pointer' => 'price_control_fee',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'add_on_price' => [
            'pointer' => 'add_on_price',
            'validations' => 'is_numeric_positive|empty_null'
        ],
        'configuration' => [
            'pointer' => 'configuration',
            'validations' => ''
        ],
        'add_ons' => [
            'pointer' => 'add_ons',
            'validations' => ''
        ],
        'comments' => [
            'pointer' => 'comments',
            'validations' => ''
        ],
        'zipcube_notes' => [
            'pointer' => 'zipcube_notes',
            'validations' => ''
        ],
        'new_status_id' => [
            'pointer' => 'new_status_id',
            'validations' => 'integer'
        ]
    ];

    public function generate_reservation($assetId)
    {
        $reservation = new Reservation();
        $reservation->set('asset_id', $assetId);
        $reservation->set('reservationStatus_id', Reservation_Status::CREATED);
        $reservation->set('guests', $this->get('guests'));
        $reservation->set('comments', $this->get('comments'));
        $reservation->set('configuration', $this->get('configuration'));
        $reservation->set('price', $this->get('price'));
        $reservation->set('toZipcube', $this->_get_commission());
        $reservation->set('flexible_applied', $this->get('flexible_applied'));
        $reservation->set('toVenue', $this->get('toVenue'));
        $reservation->set('addOns', $this->get('add_ons'));
        if (!$this->is_null('add_on_price'))
        {
            $reservation->set('add_on_price', $this->get('add_on_price'));
        }
        else
        {
            $reservation->set('add_on_price', 0);
        }
        $reservation->set('price_control_applied', $this->get('price_control_applied'));
        $reservation->set('period', $this->_get_period($assetId));
        return $reservation;
    }

    private function _get_commission()
    {
        return ($this->get('price') - $this->get('toVenue'));
    }

    private function _get_period($assetId)
    {
        $period = new Booked_Period();
        $period->set('start', $this->get('start_date_time'));
        $period->set('end', $this->get('end_date_time'));
        $period->set('asset_id', $assetId);
        return $period;
    }
}