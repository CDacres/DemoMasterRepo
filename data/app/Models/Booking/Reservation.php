<?php

namespace App\Models\Booking;

use App\LaravelExtensions\Model\LegacyModel;
use App\Models\RoomAsset;
use App\Models\User;

use App\Helpers\CommHelper;
use App\Helpers\ReservationHelper;
use App\Helpers\HubspotHelper;

use App\Events\ReservationCreatingEvent;
use App\Events\ReservationCreatedEvent;
use App\Events\ReservationUpdatedEvent;

class Reservation extends LegacyModel
{
    public $timestamps = false;
    public $table = 'reservations';

    protected $fillable = [
        'booking_id',
        'asset_id',
        'title',
        'guests',
        'currency',
        'price',
        'toZipcube',
        'toVenue',
        'toVenue_vat',
        'extra_fee',
        'extra_fee_vat',
        'flexible_fee',
        'flexible_fee_vat',
        'flexible_applied',
        'discount_applied',
        'price_control_applied',
        'price_control_fee',
        'price_control_fee_vat',
        'add_on_price',
        'is_paid',
        'reservationStatus_id',
        'comments',
        'addOns',
        'configuration',
        'zipcube_notes',
        'created',
        'review_token',
        'source',
        'assigned_user',
        'hubspot_id',
        'token',
        'needed_switch',
        'requires_switch',
        'switch_datetime'
    ];

    protected $dispatchesEvents = [
        'creating' => ReservationCreatingEvent::class,
        'created' => ReservationCreatedEvent::class,
        'updated' => ReservationUpdatedEvent::class
    ];

    private $_suppress_client_email = false;
    private $_suppress_venue_email = false;
    private $_suppress_finances = false;
    private $_request_period;
    private $_audit_user_id;
    private $_suppress_audit;
    private $_status_change_comment = '';

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function asset()
    {
        return $this->belongsTo(RoomAsset::class, 'asset_id', 'id');
    }

    public function period()
    {
        return $this->hasMany(ReservationPeriod::class);
    }

    public function admin_user()
    {
        return $this->belongsTo(User::class, 'assigned_user', 'id');
    }

    public function getClientIdAttribute()
    {
        return $this->booking->beneficiary_id;
    }

    public function getClientNameAttribute()
    {
        return $this->booking->clientname;
    }

    public function getClientFirstNameAttribute()
    {
        return $this->booking->clientfirstname;
    }

    public function getClientLastNameAttribute()
    {
        return $this->booking->clientlastname;
    }

    public function getClientEmailAttribute()
    {
        return $this->booking->clientemail;
    }

    public function getClientPhoneAttribute()
    {
        return $this->booking->clientphone;
    }

    public function getClientTokenAttribute()
    {
        return $this->booking->clienttoken;
    }

    public function get_status_id()
    {
        return (int)$this->reservationStatus_id;
    }

    public function get_audit_user_id()
    {
        return $this->_audit_user_id;
    }

    public function set_audit_user_id($userId)
    {
        $this->_audit_user_id = $userId;
    }

    public function suppress_audit_on_update($bool = true)
    {
        $this->_suppress_audit = $bool;
    }

    public function audit_is_suppressed()
    {
        return $this->_suppress_audit;
    }

    public function suppress_emails_on_insert_update($clientbool = true, $venuebool = true)
    {
        $this->_suppress_client_email = $clientbool;
        $this->_suppress_venue_email = $venuebool;
    }

    public function client_emails_are_suppressed()
    {
        return $this->_suppress_client_email;
    }

    public function venue_emails_are_suppressed()
    {
        return $this->_suppress_venue_email;
    }

    public function suppress_finances_on_insert_update($bool = true)
    {
        $this->_suppress_finances = $bool;
    }

    public function finances_are_suppressed()
    {
        return $this->_suppress_finances;
    }

    public function set_request_period($period)
    {
        $this->_request_period = $period;
    }

    public function get_request_period()
    {
        return $this->_request_period;
    }

    public function set_status_change_comment($comment)
    {
        $this->_status_change_comment = $comment;
    }

    public function get_status_change_comment()
    {
        return $this->_status_change_comment;
    }

    public function handle_comms($overwrittenStatusId = false)
    {
        if (!$this->_suppress_client_email || !$this->_suppress_venue_email)
        {
            $commHelper = new CommHelper();
            switch (($overwrittenStatusId != false)?$overwrittenStatusId:$this->get_status_id())
            {
                case ReservationStatus::CREATED:

                    $commHelper->new_reservation_request($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::EXPIRED:

                    $commHelper->reservation_expired($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::ACCEPTED:

                    $commHelper->reservation_accepted($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::DECLINE:

                    $commHelper->reservation_declined($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::CANCELLEDBYHOST:

                    $commHelper->reservation_cancelled_by_host($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::CANCELLEDBYUSER:

                    $commHelper->reservation_cancelled_by_user($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::CHECKIN:

                    $commHelper->reservation_iminent($this, $this->_suppress_client_email, $this->_suppress_venue_email);
                break;

                case ReservationStatus::AWAITINGUSERREVIEW:

                    $commHelper->reservation_requires_user_review($this, $this->_suppress_client_email);
                break;
            }
        }
    }

    public function update_reservation_status($newStatusId, $comment = null)
    {
        if ($this->reservationStatus_id !== $newStatusId)
        {
            $this->reservationStatus_id = $newStatusId;
            $this->set_status_change_comment($comment);
            $this->save();
            $this->_handle_booked_period();
            if ($this->hubspot_id != null)
            {
                try
                {
                    $hubspotId = $this->hubspot_id;
                    $status = ReservationStatus::find($this->reservationStatus_id);
                    if (!is_null($status))
                    {
                        $properties[] = (object) [
                            'name' => 'reservationstatus',
                            'value' => $status
                        ];
                    }
                    $reservationHelper = new ReservationHelper();
                    if ($reservationHelper->hubspot_closed_won($this))
                    {
                        $properties[] = (object) [
                            'name' => 'dealstage',
                            'value' => env('hubspot_closedwon_stage_id')
                        ];
                    }
                    elseif ($reservationHelper->hubspot_closed_lost($this))
                    {
                        $properties[] = (object) [
                            'name' => 'dealstage',
                            'value' => env('hubspot_closedlost_stage_id')
                        ];
                    }
                    $result = (new HubspotHelper())->update_deal($hubspotId, $properties);
                    if (!isset($result['status']) || (isset($result['status']) && $result['status'] != 200))
                    {
                        error_log("Unable to update deal (" . $this->get('id') . ") state on Hubspot: " . json_encode($result));
                    }
                }
                catch (Exception $exc)
                {
                    error_log("Unable to connect to Hubspot to update deal (" . $this->id . ") status: " . $exc->getMessage());
                }
            }
        }
    }

    private function _handle_booked_period()
    {
        $reservationHelper = new ReservationHelper();
        if ($reservationHelper->has_closed_badly($this) || $reservationHelper->has_been_cancelled($this))
        {
            $bookedPeriods = ReservationPeriod::where('reservation_id', $this->id)->get();
            if (!is_null($bookedPeriods))
            {
                foreach ($bookedPeriods as $bookedPeriod)
                {
                    $bookedPeriod->release();
                }
            }
        }
    }

    public function remove_review_token()
    {
        $this->suppress_audit_on_update();
        $this->suppress_emails_on_insert_update();
        $this->suppress_finances_on_insert_update();
        $this->review_token = null;
        $this->save();
    }
}