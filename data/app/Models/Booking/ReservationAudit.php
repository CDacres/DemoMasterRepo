<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;

class ReservationAudit extends LegacyModel
{
    public $timestamps = false;
    public $table = 'reservation_audits';

    protected $fillable = [
        'reservation_id',
        'reservationStatus_id',
        'user_id',
        'dateTime'
    ];

    public function get_id_field()
    {
        return 'reservation_id';
    }

    public function get_status_field()
    {
        return 'reservationStatus_id';
    }
}