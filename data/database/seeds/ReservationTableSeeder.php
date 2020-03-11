<?php

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\RoomAsset;
use App\Models\Room;
use App\Models\Booking\Booking;
use App\Models\Booking\BookingChannel;
use App\Models\Booking\Payment;
use App\Models\Booking\PaymentAudit;
use App\Models\Booking\PaymentType;
use App\Models\Booking\PaymentStatus;
use App\Models\Booking\Reservation;
use App\Models\Booking\ReservationPeriod;
use App\Models\Booking\ReservationAudit;
use App\Models\Booking\ReservationStatus;
use App\Models\Booking\NetPromoterScore;
use App\Models\Booking\Message;
use App\Models\Booking\MessageType;

use App\Helpers\TokenHelper;

use Carbon\Carbon;

class ReservationTableSeeder extends Seeder
{
    private $_data = [
        [
            'id' => 1,
            'user_id' => 3,
            'hourly' => 1,
            'asset_id' => 9
        ],
        [
            'id' => 2,
            'user_id' => 3,
            'daily' => 1,
            'asset_id' => 95
        ],
        [
            'id' => 3,
            'user_id' => 1,
            'admin' => true,
            'hourly' => 1,
            'asset_id' => 56
        ],
        [
            'id' => 4,
            'user_id' => 1,
            'admin' => true,
            'daily' => 1,
            'asset_id' => 26
        ],
        [
            'id' => 5,
            'user_id' => 5,
            'hourly' => 1,
            'asset_id' => 72
        ],
        [
            'id' => 6,
            'user_id' => 5,
            'daily' => 1,
            'asset_id' => 79
        ]
    ];

    public function run()
    {
        $bookingArr = [];
        $paymentArr = [];
        $paymentAuditArr = [];
        $reservationArr = [];
        $reservationPeriodArr = [];
        $reservationAuditArr = [];
        $netPromoterScoreArr = [];
        $messageArr = [];
        $userArr = [];
        $roomArr = [];
        foreach ($this->_data as $data) {
            $userArr[] = $data['user_id'];
            $roomArr[] = $data['asset_id'];
        }
        $users = User::whereIn('id', $userArr)->get();
        $roomAssets = RoomAsset::whereIn('id', $roomArr)->with(['parent.details.vat_rate', 'parent.commission_rates'])->get();
        foreach ($this->_data as $booking_data) {
            $bookerId = $booking_data['user_id'];
            $client = $users->first(function($item) use ($bookerId) {
                return $item->id == $bookerId;
            });
            $roomAssetId = $booking_data['asset_id'];
            $room = $roomAssets->first(function($item) use ($roomAssetId) {
                return $item->id == $roomAssetId;
            });
            $day = $room->opening_periods->random();
            $dayLength = ($day->first()->end - $day->first()->start);
            if (!is_null($room->hourlyprice)) {
                $bookingLength = ($dayLength / 2);
                $fullDay = false;
                $amount = ($bookingLength * $room->hourlyprice);
            } elseif (!is_null($room->day_rate_details->dailyprice)) {
                $bookingLength = $dayLength;
                $fullDay = true;
                $amount = $room->day_rate_details->dailyprice;
            }
            $bookingChannelId = ((isset($booking_data['admin']))?BookingChannel::ADMIN:BookingChannel::FRONTEND);
            $bookingArr[] = $this->_add_to_booking_array($booking_data, $bookingChannelId);
            $paymentArr[] = $this->_add_to_payment_array($booking_data, $amount, $room->currency);
            $paymentAuditArr[] = $this->_add_to_payment_audit_array($booking_data);
            $reservationArr[] = $this->_add_to_reservation_array($booking_data, $amount, $room, $bookingChannelId, $client->fullname);
            $reservationPeriodArr[] = $this->_add_to_reservation_period_array($booking_data, $day, $bookingLength, $fullDay);
            $reservationAuditArr[] = $this->_add_to_reservation_audit_array($booking_data);
            $netPromoterScoreArr[] = $this->_add_to_net_promoter_score_array($booking_data);
            $messageArr[] = $this->_add_to_message_array($booking_data, $room);
        }
        Booking::insert($bookingArr);
        Payment::insert($paymentArr);
        PaymentAudit::insert($paymentAuditArr);
        Reservation::insert($reservationArr);
        ReservationPeriod::insert($reservationPeriodArr);
        ReservationAudit::insert($reservationAuditArr);
        NetPromoterScore::insert($netPromoterScoreArr);
        Message::insert($messageArr);
        Room::whereIn('asset_id', $roomArr)->update(['last_booked' => date("Y-m-d H:i:s")]);
    }

    private function _add_to_booking_array($booking_data, $bookingChannelId)
    {
        return [
            'id' => $booking_data['id'],
            'booker_id' => $booking_data['user_id'],
            'beneficiary_id' => $booking_data['user_id'],
            'bookingChannel_id' => $bookingChannelId,
            'created' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_payment_array($booking_data, $amount, $currencyCode)
    {
        $faker = Faker\Factory::create();
        return [
            'id' => $booking_data['id'],
            'booking_id' => $booking_data['id'],
            'paymentType_id' => PaymentType::BRAINTREE,
            'external_reference' => $faker->regexify('[0-9a-f]{6}'),
            'amount' => $amount,
            'currency' => $currencyCode,
            'paymentStatus_id' => PaymentStatus::CREATED
        ];
    }

    private function _add_to_payment_audit_array($booking_data)
    {
        return [
            'payment_id' => $booking_data['id'],
            'paymentStatus_id' => PaymentStatus::CREATED,
            'user_id' => $booking_data['user_id'],
            'dateTime' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_reservation_array($booking_data, $amount, $room, $bookingChannelId, $clientName)
    {
        $tokenHelper = new TokenHelper();
        $faker = Faker\Factory::create();
        $commission = $room->parent->commission_rates->first(function($item) use ($bookingChannelId) {
            return $item->bookingChannel_id == $bookingChannelId;
        });
        $vatRate = $room->parent->details->vat_rate->vat_percentage;
        $config = $room->guest_capacities->random();
        $extra_fee = $this->_find_extra_fee($bookingChannelId);
        $price_control_fee = 20;
        $flex_fee = 0;
        $flexible_applied = 0;
        $hasFlexible = $faker->boolean;
        if ($hasFlexible) {
            $flex_fee = 25;
            $flexible_applied = 1;
        }
        $add_on_price = null;
        $addOns = null;
        $hasAddOns = $faker->boolean;
        if ($hasAddOns) {
            $add_on_price = 50;
            $addOns = $faker->words(9, true);
        }
        $price = ($amount - $extra_fee - $flex_fee - $price_control_fee);
        $toZipcube = ((ceil($price * $commission->commissionPercentage * 1000)) / 100000);
        $toVenue = ($price - $toZipcube);
        return [
            'id' => $booking_data['id'],
            'booking_id' => $booking_data['id'],
            'asset_id' => $booking_data['asset_id'],
            'title' => $clientName,
            'guests' => $config->first()->max_capacity,
            'currency' => $room->currency,
            'price' => $price,
            'toZipcube' => $toZipcube,
            'toVenue' => $toVenue,
            'toVenue_vat' => ($toVenue * $vatRate),
            'extra_fee' => $extra_fee,
            'extra_fee_vat' => ($extra_fee * $vatRate),
            'flexible_applied' => $flexible_applied,
            'flexible_fee' => $flex_fee,
            'flexible_fee_vat' => ($flex_fee * $vatRate),
            'price_control_applied' => $room->details->price_control_percent,
            'price_control_fee' => $price_control_fee,
            'price_control_fee_vat' => ($price_control_fee * $vatRate),
            'configuration' => $config->first()->configuration->name,
            'add_on_price' => $add_on_price,
            'addOns' => $addOns,
            'reservationStatus_id' => ReservationStatus::CREATED,
            'review_token' => $tokenHelper->add_token(8),
            'token' => $tokenHelper->add_token(),
            'created' => date("Y-m-d H:i:s")
        ];
    }

    private function _find_extra_fee($bookingChannelId)
    {
        $extra_fee = 0;
        if ($bookingChannelId == BookingChannel::ADMIN) {
            $extra_fee = 15;
        }
        return $extra_fee;
    }

    private function _add_to_reservation_period_array($booking_data, $day, $bookingLength, $fullDay)
    {
        $start = $day->first()->start;
        if ($fullDay) {
            $end = $day->first()->end;
        } else {
            $end = $bookingLength;
        }
        $bookingDay = Carbon::parse($day->first()->day->name . ' next week');
        return [
            'reservation_id' => $booking_data['id'],
            'asset_id' => $booking_data['asset_id'],
            'start' => $bookingDay->addMinutes($start)->toDateString(),
            'end' => $bookingDay->addMinutes($end)->toDateString(),
            'allDay' => $fullDay
        ];
    }

    private function _add_to_reservation_audit_array($booking_data)
    {
        return [
            'reservation_id' => $booking_data['id'],
            'reservationStatus_id' => ReservationStatus::CREATED,
            'user_id' => $booking_data['user_id'],
            'dateTime' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_net_promoter_score_array($booking_data)
    {
        $faker = Faker\Factory::create();
        return [
            'user_id' => $booking_data['user_id'],
            'reservation_id' => $booking_data['id'],
            'rating' => $faker->numberBetween(1, 10),
            'comment' => $faker->sentence(9, true),
            'created' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_message_array($booking_data, $room)
    {
        $faker = Faker\Factory::create();
        return [
            'reservation_id' => $booking_data['id'],
            'conversation_id' => 0,
            'userby' => $booking_data['user_id'],
            'userto' => $room->parent->details->main_contact,
            'message' => $faker->sentence(9, true),
            'message_type_id' => MessageType::REQUEST,
            'created' => date("Y-m-d H:i:s")
        ];
    }
}