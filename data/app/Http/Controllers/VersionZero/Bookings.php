<?php

namespace App\Http\Controllers\VersionZero;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use DateTime;
use DatePeriod;
use DateInterval;
use stdClass;
use Dingo\Api\Http\Request;
use App\Models\Booking\Booking;
use App\Models\VenueAsset;
use App\Models\Booking\PaymentType;
use App\Models\Booking\PaymentStatus;
use App\Models\Booking\AssetCommission;
use App\Models\User;
use App\Models\Profile;
use App\Models\Pivots\UserAssetMember;
use App\Models\Booking\BookingChannel;
use App\Models\Booking\ReservationPeriod;
use App\Models\DayRate;
use App\Models\Pivots\AssetUserPrivilege;
use App\Helpers\RolesAndPrivilegesHelper;
use App\Models\Booking\Payment;
use App\Models\Booking\Reservation;
use App\Models\Booking\ReservationStatus;
use App\Models\Room;

use App\Helpers\BookingHelper;
use App\Helpers\ReservationHelper;
use App\Helpers\BraintreeHelper;
use App\Helpers\HubspotHelper;
use App\Helpers\AnalyticsHelper;
use App\Helpers\Formatting\PriceHelper;
use App\Helpers\CommHelper;

use App\Contracts\Facades\ChannelLog as Log;

class Bookings extends Controller
{
    protected $defaultClass = Booking::class;

    public function create_booking_request(Request $request)
    {
        $this->_handle_asset($request);
        $this->_handle_user($request);
        $this->_handle_periods($request);
        if (!is_null($request->get('extras'))) {
            $this->_handle_extras($request);
        }
        $this->_handle_price($request);
        $this->_handle_config($request);
        return $this->_insert_data($request);
    }

    private function _handle_asset($request)
    {
        $assetId = $request->get('asset_id');
        $room = Room::where('asset_id', $assetId)->first();
        if (is_null($room)) {
            throw new Exception('Sorry - that space is not currently available.');
        }
        $venue = VenueAsset::fromChild($assetId)->with('details')->first();
        if (is_null($venue)) {
            throw new Exception('Sorry - that space is not currently available.');
        }
        $request->room_currency_code = $room->currency;
        if (!is_null($room->flexible_percent) && $room->flexible_enabled) {
            $request->flexible_percent = $room->flexible_percent;
            $request->flexible_applied = true;
        }
        if (!is_null($room->price_control_percent)) {
            $request->price_control_applied = $room->price_control_percent;
        }
        if ($this->_needs_commission_percentage($request)) {
            $commission = AssetCommission::where('asset_id', $venue->id)->where('bookingChannel_id', $request->get('bookingChannel_id'))->first();
            if (!is_null($commission)) {
                $request->commissionPercentage = $commission->commissionPercentage;
            }
            $request->commissionVAT = $this->_get_venue_vat($venue);
        }
    }

    private function _has_attribute($object, $attribute)
    {
        $retVal = false;
        if (array_key_exists($attribute, $object) && !is_null($object->$attribute)) {
            $retVal = true;
        }
        return $retVal;
    }

    private function _needs_commission_percentage($request)
    {
        $retVal = false;
        if ($this->_get_payment_type_id($request) !== PaymentType::VENUEINVOICE) {
            $retVal = true;
        } else {
            $request->commissionPercentage = 0;
            $request->commissionVAT = 0;
        }
        return $retVal;
    }

    private function _get_payment_type_id($request)
    {
        /*
         * Make sure that any additional payment types get reflected in the 'needs_commission_percentage' method
         */
        $paymentType = $request->get('payment_type');
        $paymentTypeId = null;
        switch ($paymentType) {
            case 'admin':
                $paymentTypeId = PaymentType::INVOICE;
                break;

            case 'braintree':
            case 'paypal':
                $paymentTypeId = PaymentType::BRAINTREE;
                break;

            case 'venue':
                $paymentTypeId = PaymentType::VENUEINVOICE;
                break;

            default:
                break;
        }
        return $paymentTypeId;
    }

    private function _get_venue_vat($venue)
    {
        $retVat = 0;
        $vatRate = $venue->vat_rate->first()->vat_percentage;
        if (!is_null($vatRate) && $vatRate > 0) {
            $retVat = $vatRate;
        }
        return $retVat;
    }

    private function _handle_user($request)
    {
        if ($this->user_is_logged_in()) {
            $bookingUser = $this->authority();
            $this->_update_user_details($bookingUser, $request);
            $this->_get_user_discount($bookingUser, $request);
        } else {
            $bookingUser = $this->_get_user($request);
        }
        $request->booker = $bookingUser;
        if ($this->_has_beneficiary($request)) {
            $beneficiaryUser = $this->_get_user($request, true);
            $request->beneficiary = $beneficiaryUser;
        } else {
            $request->beneficiary = $bookingUser;
        }
    }

    private function _update_user_details($user, $request, $beneficiary = false)
    {
        $userProfile = Profile::where('user_id', $user->id)->first();
        if ($beneficiary) {
            if ($user->email == $request->get('beneficiary_email')) {
                $userProfile->phnum = $request->get('beneficiary_phone_number');
                $userProfile->phnum_search = preg_replace('/[\s\+]/', '', $request->get('beneficiary_phone_number'));
                if ($request->get('bookingChannel_id') == BookingChannel::FRONTEND) {
                    $userProfile->Fname = trim($request->get('beneficiary_first_name'));
                    $userProfile->Lname = trim($request->get('beneficiary_last_name'));
                }
            }
        } else {
            if ($user->email == $request->get('email')) {
                $userProfile->phnum = $request->get('phone_number');
                $userProfile->phnum_search = preg_replace('/[\s\+]/', '', $request->get('phone_number'));
                if ($request->get('bookingChannel_id') == BookingChannel::FRONTEND) {
                    $userProfile->Fname = trim($request->get('first_name'));
                    $userProfile->Lname = trim($request->get('last_name'));
                }
            }
        }
        $userProfile->save();
    }

    private function _get_user_discount($user, $request)
    {
        $userDiscount = UserAssetMember::where('asset_id', $request->get('asset_id'))->where('user_id', $user->id)->first();
        if (!is_null($userDiscount)) {
            $request->discount = $userDiscount->discount;
        }
    }

    private function _get_user($request, $beneficiary = false)
    {
        $emailIdentifier = "email";
        if ($beneficiary) {
            $emailIdentifier = "beneficiary_email";
        }
        $email = $request->get($emailIdentifier);
        if (!is_null($email)) {
            $user = User::where('email', $email)->with('profile')->first();
            if (is_null($user)) {
                $protoPaymentUser = new User();
                $protoPaymentUser->email = strtolower($email);
                $protoPaymentProfile = $this->_generate_new_user_profile($request, $beneficiary);
//                $user = $this->$modelUsers->create_new_user_with_profile($protoPaymentUser, $protoPaymentProfile);
                $request->user_requires_password = true;
            } else {
                $this->_update_user_details($user, $request, $beneficiary);
                $this->_get_user_discount($user, $request);
                $request->user_requires_password = false;
            }
            return $user;
        }
        return null;
    }

    private function _generate_new_user_profile($request, $beneficiary = false)
    {
        if ($beneficiary) {
            $retObj = $this->_generate_new_beneficiary_profile($request);
        } else {
            $retObj = $this->_generate_new_booker_profile($request);
        }
        return $retObj;
    }

    private function _generate_new_beneficiary_profile($request)
    {
        $profile = new Profile();
        $profile->Fname = $request->get('beneficiary_first_name');
        $profile->Lname = $request->get('beneficiary_last_name');
        $profile->phnum = $request->get('beneficiary_phone_number');
        $profile->phnum_search = preg_replace('/[\s\+]/', '', $request->get('beneficiary_phone_number'));
        return $profile;
    }

    private function _generate_new_booker_profile($request)
    {
        $profile = new Profile();
        $profile->Fname = $request->get('first_name');
        $profile->Lname = $request->get('last_name');
        $profile->phnum = $request->get('phone_number');
        $profile->phnum_search = preg_replace('/[\s\+]/', '', $request->get('phone_number'));
        return $profile;
    }

    private function _has_beneficiary($request)
    {
        return (!is_null($request->get('beneficiary_email')) && $request->get('beneficiary_email') != $request->get('email'));
    }

    private function _handle_periods($request)
    {
        if (!($this->user_is_admin() && !is_null($request->get('period')) && count($request->get('period')) == 0)) {
            if ($this->_is_daily($request)) {
                $this->_daily_machinations($request);
            } else {
                $this->_hourly_machinations($request);
            }
        }
    }

    private function _is_daily($request)
    {
        $bookingType = $request->get('booking_type');
        return ($bookingType == 1 || $bookingType == 2);
    }

    private function _daily_machinations($request)
    {
        if (!$this->_check_valid_dates($request)) {
            throw new Exception("We're sorry, but someone has booked this room since you began your request. Please return to the search page to find another great Zipcube room!");
        }
        $assetId = $request->get('asset_id');
        $openingHours = $this->_get_weekly_opening_times($assetId);
        $hourArr = $openingHours->reduce(function ($hourArr, $openHour) {
            $hourArr[$openHour->id][] = [
                'start' => $openHour->start,
                'end' => $openHour->end,
                'minimum_minutes' => $openHour->minimum_minutes,
                'slot_length_minutes' => $openHour->slot_length_minutes
            ];
            return $hourArr;
        }, []);
        $bookedPeriods = $this->_as_booked_period($hourArr, $request->get('start_date'), $request->get('end_date'), $assetId);
        $request->period = $bookedPeriods;
        $dayPrice = DayRate::where('asset_id', $assetId)->first();
        if (!is_null($dayPrice)) {
            $price = $dayPrice->standard_day_rate * $this->_find_duration($bookedPeriods);
            if ($this->_has_attribute($request, 'discount')) {
                $price = ($price * ((100 - $request->discount) / 100));
            }
            $request->base_price = $price;
        } else {
            $request->base_price = null;
        }
    }

    private function _check_valid_dates($request)
    {
        $retVal = false;
        if (!is_null($request->get('start_date')) && !is_null($request->get('end_date'))) {
            $startDT = new DateTime($request->get('start_date'));
            $endDT = new DateTime($request->get('end_date'));
            $endDT->modify("+1day");
            $formatString = ReservationPeriod::format_string();
            $reqStart = $startDT->format($formatString);
            $reqEnd = $endDT->format($formatString);
            $response = $this->_booked_dates($request->get('asset_id'), $reqStart, $reqEnd);
            if (count($response) == 0) {
                $retVal = true;
            }
        }
        return $retVal;
    }

    private function _booked_dates($assetId, $reqStart, $reqEnd, $reservationId = null)
    {
        $query = DB::table('reservation_periods')->select('*')->where('asset_id', $assetId)->where('enabled', 1);
        if ($reservationId != null) {
            $query->where('reservation_id', '<>', $reservationId);
        }
        $query->where(function ($query) use ($reqStart, $reqEnd) {
            $query->where(function ($query) use ($reqStart, $reqEnd) {
                $query->where('reservation_periods.start', '>=', $reqStart)->where('reservation_periods.start', '<', $reqEnd);
            })->orWhere(function ($query) use ($reqStart, $reqEnd) {
                $query->where('reservation_periods.end', '>', $reqStart)->where('reservation_periods.end', '<=', $reqEnd);
            });
        })->orWhere(function ($query) use ($reqStart, $reqEnd) {
            $query->where('reservation_periods.start', '<=', $reqStart)->where('reservation_periods.end', '>', $reqEnd);
        });
        return $query->get();
    }

    private function _get_weekly_opening_times($assetId)
    {
        $query = DB::table('opening_periods')->select('*')->rightJoin('days', function ($join) use ($assetId) {
            $join->on('opening_periods.day_id', 'days.id')->where('opening_periods.asset_id', $assetId);
        })->where('days.enabled', 1)->where(function ($query) {
            $query->where('opening_periods.aggregate', 0)->orWhere(function ($query) {
                $query->whereNull('opening_periods.aggregate');
            });
        })->orderBy('days.id', 'ASC')->orderBy('opening_periods.start', 'ASC');
        return $query->get();
    }

    private function _as_booked_period($hourArr, $startDate, $endDate, $assetId)
    {
        if (is_string($startDate) || $startDate === null) {
            $startDate = new DateTime($startDate);
        }
        if (is_string($endDate) || $endDate === null) {
            $endDate = new DateTime($endDate);
        }
        $startTime = $this->_get_opening_time($hourArr, $startDate);
        $endTime = $this->_get_closing_time($hourArr, $startDate, $endDate);
        if ($startTime === null || $endTime === null) {
            throw new Exception("We're sorry, but this room is no longer accepting bookings. Please go back to the search page and try again.");
        }
        $bookedPeriod = new stdClass();
        $bookedPeriod->start = $this->_set_date_time($startDate, $startTime);
        $bookedPeriod->end = $this->_set_date_time($endDate, $endTime);
        $bookedPeriod->duration_days = $this->_duration_days($hourArr, $bookedPeriod->start, $bookedPeriod->end);
        $bookedPeriod->duration_minutes = $endTime - $startTime;
        $bookedPeriod->all_day = true;
        $bookedPeriod->asset_id = $assetId;
        return $bookedPeriod;
    }

    private function _get_opening_time($hourArr, $startDate, $counter = 0)
    {
        if ($counter === 7) {
            return null;
        }
        $dayId = $startDate->format('w');
        $dailyOpeningHours = $hourArr[$dayId];
        if (count($dailyOpeningHours) > 0) {
            return $dailyOpeningHours[0]['start'];
        } else {
            $startDate->modify("+1 day");
            return $this->_get_opening_time($hourArr, $startDate, ($counter + 1));
        }
    }

    private function _get_closing_time($hourArr, $startDate, $endDate, $counter = 0)
    {
        if ($endDate < $startDate || $counter === 7) {
            return null;
        }
        $dayId = $endDate->format('w');
        $dailyOpeningHours = $hourArr[$dayId];
        if (count($dailyOpeningHours) > 0) {
            end($dailyOpeningHours);
            return $dailyOpeningHours[key($dailyOpeningHours)]['end'];
        } else {
            $endDate->modify("-1 day");
            return $this->_get_closing_time($hourArr, $startDate, $endDate, ($counter + 1));
        }
    }

    private function _set_date_time($date, $time)
    {
        $formatString = ReservationPeriod::format_string();
        if (is_string($date) || $date === null) {
            $date = new DateTime($date);
        }
        $date->setTime(0, $time, 0);
        return $date->format($formatString);
    }

    private function _duration_days($hourArr, $startDate, $endDate)
    {
        if (is_string($startDate) || $startDate === null) {
            $startDate = new DateTime($startDate);
        }
        if (is_string($endDate) || $endDate === null) {
            $endDate = new DateTime($endDate);
        }
        $datesIterator = new DatePeriod($startDate, new DateInterval('P1D'), $endDate);
        $datesArray = iterator_to_array($datesIterator);
        $count = 0;
        foreach ($datesArray as $date) {
            $dayId = $date->format('w');
            $dailyOpeningHours = $hourArr[$dayId];
            if (count($dailyOpeningHours) > 0) {
                ++$count;
            }
        }
        if ($startDate->format("H:i:s") === $endDate->format("H:i:s")) {
            ++$count;
        }
        return max(($count - 1), 0);
    }

    private function _find_duration($bookedPeriods)
    {
        $total_minutes = (($bookedPeriods->duration_days * 1440) + $bookedPeriods->duration_minutes);
        $leftover_minutes = ($total_minutes % 1440);
        $adjusted_hours = round(($leftover_minutes / 60), 1);
        $adjusted_days = (($total_minutes - $leftover_minutes) / 1440);
        $days = $adjusted_days;
        if ($adjusted_hours > 0) {
            ++$days;
        }
        return $days;
    }

    private function _hourly_machinations($request)
    {
        $period = null;
        $assetId = $request->get('asset_id');
        if ($this->_has_period($request)) {
            $period = $request->get('period');
            $period['asset_id'] = $assetId;
            $period['all_day'] = false;
            $period['duration_days'] = 0;
            $date = (new DateTime($period['start']))->format("Y-m-d");
            $maskCollection = $this->_convert_array_to_daily_mask($period);
        } elseif ($this->_has_slots($request)) {
            $date = $request->get('start_date');
            $originalSlots = $request->get('slots');
            if (!$this->_check_valid_slots($assetId, $originalSlots, $date)) {
                throw new Exception("We're sorry, but someone has booked this room since you began your request. Please return to the search page to find another great Zipcube room!");
            }
            $period = $this->_slots_as_booked_period($originalSlots, $date, $assetId);
            $maskCollection = $this->_convert_obj_to_daily_mask($period);
        } else {
            throw new Exception("We're sorry, but this booking does not have valid times and dates. Please try again.");
        }
        $openingHours = $this->_get_daily_availability($request->beneficiary->id, $assetId, $date);
        $allPeriods = $this->_push_periods($openingHours, $maskCollection);
        $timesForPrice = $this->_filter_on_availability($allPeriods);
        $price = $this->_get_total_price($timesForPrice);
        $request->period = $this->_times_as_booked_period($timesForPrice, $date, $assetId);
        //hourly prices based on slots already have client discount taken into account.
        $request->base_price = $price;
    }

    private function _has_period($request)
    {
        $period = $request->get('period');
        return (!is_null($period) && !is_null($period['start']) && !is_null($period['end']));
    }

    private function _has_slots($request)
    {
        return (!is_null($request->get('start_date')) && !is_null($request->get('slots')) && count($request->get('slots')) > 0);
    }

    private function _check_valid_slots($assetId, $slots, $date)
    {
        $start = $this->_find_slot_start($slots);
        $end = $this->_find_slot_end($slots);
        $duration = $end - $start;
        $query = DB::table('rooms')->select('rooms.*')->where('rooms.asset_id', $assetId)->where('rooms.enabled', 1)->leftJoin('opening_periods', 'rooms.asset_id', 'opening_periods.asset_id')->where(function ($query) {
            $query->where('opening_periods.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('opening_periods.enabled');
            });
        });
        if (!($duration == 0 && $date == '' && ($start < 0 || $start >= 1440))) {
            $this->_query_filter_opening_times($query, $duration, $start);
            if ($date != '') {
                $this->_query_filter_opening_hours_by_date($query, $date);
                $this->_query_filter_available_periods($query, $duration, $date, $start);
                $this->_query_filter_booked_periods($query, $date);
            }
        }
        $result = $query->get();
        if (!empty($result)) {
            $retVal = true;
        } else {
            $retVal = false;
        }
        return $retVal;
    }

    private function _find_slot_start($slots)
    {
        reset($slots);
        return (int)$slots[key($slots)]['start'];
    }

    private function _find_slot_end($slots)
    {
        end($slots);
        return (int)$slots[key($slots)]['end'];
    }

    private function _query_filter_opening_times($query, $duration, $start)
    {
        if ($start >= 0 && $start < 1440) {
            $query->where('opening_periods.start', '<=', $start);
            if ($duration != 0) {
                $end = ($start + $duration);
                $query->whereRaw('opening_periods.end >= ? AND opening_periods.minimum_minutes <= ?', [$end, $duration]);
            } else {
                $query->whereRaw('opening_periods.end >= ? + opening_periods.minimum_minutes', [$start]);
            }
        } elseif ($duration != 0) {
            $query->where('opening_periods.minimum_minutes', '<=', $duration);
        }
    }

    private function _query_filter_opening_hours_by_date($query, $date, $nullable = false)
    {
        $day = date("w", strtotime($date));
        if ($nullable) {
            $query->where(function ($query) use ($day) {
                $query->where('opening_periods.day_id', $day)->orWhere(function ($query) {
                    $query->whereNull('opening_periods.day_id');
                });
            });
        } else {
            $query->where('opening_periods.day_id', $day);
        }
    }

    private function _query_filter_available_periods($query, $duration, $date, $start)
    {
        $query->leftJoin('room_availability', function ($join) use ($date) {
            $join->on('opening_periods.asset_id', 'room_availability.asset_id')->where('room_availability.date', $date)->where(function ($query) {
                $query->where('opening_periods.id', 'room_availability.openingPeriod_id')->orWhere(function ($query) {
                    $query->whereNull('room_availability.openingPeriod_id');
                });
            });
        })->where(function ($query) use ($start, $duration) {
            $query->whereNotNull('room_availability.openingPeriod_id');
            if ($start >= 0 && $start < 1440) {
                $query->where('room_availability.start', '<=', $start);
                if ($duration != 0) {
                    $query->where('room_availability.end', '>=', $start + $duration);
                } else {
                    $query->whereRaw('room_availability.end >= ? + opening_periods.minimum_minutes', [$start]);
                }
            }
            $query->orWhere(function ($query) {
                $query->whereNull('room_availability.date');
            });
        });
    }

    private function _query_filter_booked_periods($query, $date)
    {
        $reqStartDT = new DateTime($date);
        $reqEndDT = clone $reqStartDT;
        $reqEndDT->setTime(24, 0, 0);
        $formatString = ReservationPeriod::format_string();
        $reqStart = $reqStartDT->format($formatString);
        $reqEnd = $reqEndDT->format($formatString);
        $query->leftJoin('reservation_periods', function ($join) use ($reqStart, $reqEnd) {
            $join->on('rooms.asset_id', 'reservation_periods.asset_id')->where('reservation_periods.allDay', 1)->where('reservation_periods.enabled', 1)->where(function ($query) use ($reqStart, $reqEnd) {
                $query->where(function ($query) use ($reqStart, $reqEnd) {
                    $query->where(function ($query) use ($reqStart, $reqEnd) {
                        $query->where('reservation_periods.start', '>=', $reqStart)->where('reservation_periods.start', '<', $reqEnd);
                    })->orWhere(function ($query) use ($reqStart, $reqEnd) {
                        $query->where('reservation_periods.end', '>', $reqStart)->where('reservation_periods.end', '<=', $reqEnd);
                    });
                })->orWhere(function ($query) use ($reqStart, $reqEnd) {
                    $query->where('reservation_periods.start', '<=', $reqStart)->where('reservation_periods.end', '>', $reqEnd);
                });
            });
        })->whereNull('reservation_periods.asset_id');
    }

    private function _slots_as_booked_period($slots, $date, $assetId)
    {
        $start = $this->_find_slot_start($slots);
        $end = $this->_find_slot_end($slots);
        return $this->_periods_as_booked_period($start, $end, $date, $assetId);
    }

    private function _periods_as_booked_period($start, $end, $date, $assetId)
    {
        $bookedPeriod = new stdClass();
        $bookedPeriod->start = $this->_set_date_time($date, $start);
        $bookedPeriod->end = $this->_set_date_time($date, $end);
        $bookedPeriod->asset_id = $assetId;
        $startDateTime = new DateTime($bookedPeriod->start);
        $endDateTime = new DateTime($bookedPeriod->end);
        $interval = $startDateTime->diff($endDateTime)->format('%a');
        if ($interval >= 1) {
            $bookedPeriod->all_day = true;
            $bookedPeriod->duration_days = $interval;
        } else {
            $bookedPeriod->all_day = false;
            $bookedPeriod->duration_days = 0;
        }
        return $bookedPeriod;
    }

    private function _get_daily_availability($userId, $assetId, $date)
    {
        $dayId = date('w', strtotime($date));
        $query = DB::table('opening_periods')->select('opening_periods.*')->leftJoin('hour_rates', 'opening_periods.id', 'hour_rates.openingPeriod_id')->where(function ($query) {
            $query->where('hour_rates.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('hour_rates.enabled');
            });
        })->leftJoin('rooms', 'opening_periods.asset_id', 'rooms.asset_id')->where(function ($query) {
            $query->where('rooms.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('rooms.enabled');
            });
        })->addSelect(DB::raw('CEIL(100000 * hour_rates.price_per_hour) / 100000 AS price_per_hour, 1 AS available'));
        if ($this->user_is_logged_in()) {
            $query->leftJoin('user_asset_members', function ($join) use ($userId) {
                $join->on('rooms.asset_id', 'user_asset_members.asset_id')->where('user_asset_members.user_id', $userId)->where(function ($query) {
                    $query->where('user_asset_members.enabled', 1)->orWhere(function ($query) {
                        $query->whereNull('user_asset_members.enabled');
                    });
                });
            })->addSelect('user_asset_members.discount AS user_discount');
        }
        $query->leftJoin('currency', 'rooms.currency', 'currency.code')->where(function ($query) {
            $query->where('currency.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('currency.enabled');
            });
        })->where('opening_periods.asset_id', $assetId)->where('day_id', $dayId)->where('opening_periods.aggregate', 0)->where('opening_periods.enabled', 1)->orderBy('opening_periods.start', 'ASC');
        return $query->get();
    }

    private function _convert_array_to_daily_mask($period)
    {
        $startTime = $this->_getTime($period['start']);
        $endTime = $this->_getTime($period['end']);
        return $this->_convert_to_daily_mask($startTime, $endTime);
    }

    private function _convert_obj_to_daily_mask($period)
    {
        $startTime = $this->_getTime($period->start);
        $endTime = $this->_getTime($period->end);
        return $this->_convert_to_daily_mask($startTime, $endTime);
    }

    private function _convert_to_daily_mask($startTime, $endTime)
    {
        $time = 0;
        $objectArray = [];
        if ($startTime > $time) {
            $maskObject = new stdClass();
            $this->_populate_period($maskObject, $time, $startTime);
            $objectArray[] = $maskObject;
        }
        if ($endTime < 1440) {
            $maskObject = new stdClass();
            $this->_populate_period($maskObject, $endTime, 1440);
            $objectArray[] = $maskObject;
        }
        return $objectArray;
    }

    private function _getTime($date)
    {
        $dateTime = new DateTime($date);
        $minutes = (int)$dateTime->format('i');
        $hours = (int)$dateTime->format('G');
        return ((60 * $hours) + $minutes);
    }

    private function _populate_period($period, $startTime = null, $endTime = null, $slotLength = null, $available = false, $periodId = null, $price = null, $minimumMinutes = null, $isAggregate = false, $assetId = null, $discount = null)
    {
        $period->available = $available;
        $period->start = $startTime;
        $period->end = $endTime;
        $period->id = $periodId;
        $period->price_per_hour = $price;
        $period->user_discount = $discount;
        $period->slot_length_minutes = $slotLength;
        $period->minimum_minutes = $minimumMinutes;
        $period->asset_id = $assetId;
        $period->aggregate = $isAggregate;
        $period->enabled = 1;
    }

    private function _push_periods($openingHours, $maskCollection)
    {
        foreach ($maskCollection as $period) {
            $this->_push_period($openingHours, $period);
        }
        return $openingHours;
    }

    private function _push_period(&$openingHours, $pushedPeriod)
    {
        $newPeriod = new stdClass();
        $this->_populate_from_period($newPeriod, $pushedPeriod);
        $newStart = $newPeriod->start;
        $newEnd = $newPeriod->end;
        $mergedPeriods = [];
        $embedded = false;
        foreach ($openingHours as $key => $naturalPeriod) {
            if ($newStart < $naturalPeriod->start && !$embedded) {
                $mergedPeriods[] = $newPeriod;
                $embedded = true;
            }
            if ($naturalPeriod->start < $newStart && $newStart < $naturalPeriod->end) {
                if ($newEnd < $naturalPeriod->end) {
                    $mergedPeriods = array_merge($this->_split_period($openingHours, $key, $newPeriod), $mergedPeriods);
                    $embedded = true;
                } else {
                    $truncatedPeriod = $openingHours[$key];
                    $truncatedPeriod->end = $newStart;
                    $mergedPeriods[] = $truncatedPeriod;
                    $mergedPeriods[] = $newPeriod;
                    $embedded = true;
                }
            } elseif ($naturalPeriod->start < $newEnd && $newEnd < $naturalPeriod->end) {
                $truncatedPeriod = $openingHours[$key];
                $truncatedPeriod->start = $newEnd;
                $mergedPeriods[] = $truncatedPeriod;
            } elseif ($naturalPeriod->start >= $newStart && $naturalPeriod->end <= $newEnd) {
                //Don't add the natural period - it has been superceded completely
                if (!$embedded) {
                    $mergedPeriods[] = $newPeriod;
                    $embedded = true;
                }
            } else {
                $mergedPeriods[] = $naturalPeriod;
            }
        }
        if (!$embedded) {
            $mergedPeriods[] = $newPeriod;
        }
        $openingHours = $mergedPeriods;
    }

    private function _populate_from_period($retPeriod, $period)
    {
        $this->_populate_period($retPeriod, $period->start, $period->end, $period->slot_length_minutes, $period->available, $period->id, $period->price_per_hour, $period->minimum_minutes, $period->aggregate, $period->asset_id, $period->user_discount);
    }

    private function _split_period($openingHours, $key, $newPeriod)
    {
        $preObject = new stdClass();
        $postObject = new stdClass();
        $originalPeriod = $openingHours[$key];
        $this->_populate_from_period($preObject, $originalPeriod->start, $newPeriod->start, $originalPeriod->slot_length_minutes, $originalPeriod->available, $originalPeriod->id, $originalPeriod->price_per_hour, $originalPeriod->minimum_minutes, $originalPeriod->aggregate, $originalPeriod->asset_id, $originalPeriod->user_discount);
        $this->_populate_from_period($postObject, $newPeriod->end, $originalPeriod->end, $originalPeriod->slot_length_minutes, $originalPeriod->available, $originalPeriod->id, $originalPeriod->price_per_hour, $originalPeriod->minimum_minutes, $originalPeriod->aggregate, $originalPeriod->asset_id, $originalPeriod->user_discount);
        return [$preObject, $newPeriod, $postObject];
    }

    private function _filter_on_availability($allPeriods, $availableIsTrue = true)
    {
        foreach ($allPeriods as $id => $object) {
            if (is_array($object)) {
                $object->filter_on_availability($availableIsTrue);
            } elseif ($object->available xor $availableIsTrue) {
                unset($allPeriods[$id]);
            }
        }
        return $allPeriods;
    }

    private function _get_total_price($timesForPrice)
    {
        $runningTotal = 0;
        $success = true;
        foreach ($timesForPrice as $timePeriod) {
            $objectTotal = $this->_get_period_price($timePeriod);
            if ($objectTotal === null) {
                $success = false;
                break;
            } else {
                $runningTotal += $objectTotal;
            }
        }
        return $runningTotal;
    }

    private function _get_period_price($timePeriod)
    {
        $pricePerHour = $timePeriod->price_per_hour;
        $durationMinutes = $this->_duration_minutes($timePeriod);
        $userDiscount = null;
        if ($this->_has_attribute($timePeriod, 'user_discount')) {
            $userDiscount = $timePeriod->user_discount;
        }
        if (!($pricePerHour === null || $durationMinutes === null)) {
            if ($userDiscount == null) {
                $retVal = $pricePerHour * ($durationMinutes / 60);
            } else {
                $retVal = round(round($pricePerHour * (100 - $userDiscount) / 100, 2) * ($durationMinutes / 60), 2);
            }
        } else {
            $retVal = null;
        }
        return $retVal;
    }

    private function _duration_minutes($timePeriod)
    {
        $end = $timePeriod->end;
        $start = $timePeriod->start;
        if (!($end === null || $start === null)) {
            $retVal = $end - $start;
        } else {
            $retVal = null;
        }
        return $retVal;
    }

    private function _times_as_booked_period($times, $date, $assetId)
    {
        reset($times);
        $start = (int)$times[key($times)]->start;
        end($times);
        $end = (int)$times[key($times)]->end;
        return $this->_periods_as_booked_period($start, $end, $date, $assetId);
    }

    private function _handle_extras($request)
    {
        $priceHelper = new PriceHelper();
        $totalPrice = 0;
        $addOnString = '';
        $amenities = $this->_get_amenities_by_asset_id($request->get('asset_id'));
        $amenityArr = $amenities->reduce(function ($amenityArr, $amenity) {
            $amenityArr[$amenity->id] = [
                'amenity_desc' => $amenity->amenity_desc,
                'price' => $amenity->price,
                'cost' => $amenity->cost,
                'currency_symbol_left' => $amenity->currency_symbol_left,
                'currency_symbol_right' => $amenity->currency_symbol_right
            ];
            return $amenityArr;
        }, []);
        foreach ($request->get('extras') as $extra) {
            if (!isset($amenityArr[$extra['id']])) {
                throw new Exception("One of your add on requests is no longer available. Please go back and try again.");
            }
            $amenity = $amenityArr[$extra['id']];
            $number = $extra['quantity'];
            $addOnString .= $number . " x " . $amenity['amenity_desc'];
            if (!is_null($amenity['price'])) {
                $priceHelper->currency_symbol_left = $amenity['currency_symbol_left'];
                $priceHelper->currency_symbol_right = $amenity['currency_symbol_right'];
                $priceHelper->price = $amenity['price'];
                $addOnString .= ": " . $priceHelper->formatted(true);
            }
            $addOnString .= "; ";
            $totalPrice += (float)$amenity['cost'] * $number;
        }
        $request->add_on_price = $totalPrice;
        $request->addOns = $addOnString;
    }

    private function _get_add_on_price($request)
    {
        $retVal = 0;
        if ($this->_has_attribute($request, 'add_on_price')) {
            $retVal = $request->add_on_price;
        }
        return $retVal;
    }

    private function _get_amenities_by_asset_id($assetId)
    {
        $query = DB::table('asset_amenity')->select('asset_amenity.*')->addSelect(DB::raw('CEIL(100000 * asset_amenity.cost) / 100000 AS price'))->leftJoin('rooms', 'asset_amenity.asset_id', 'rooms.asset_id')->where(function ($query) {
            $query->where('rooms.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('rooms.enabled');
            });
        })->leftJoin('amenities', 'asset_amenity.amenity_id', 'amenities.id')->where(function ($query) {
            $query->where('amenities.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('amenities.enabled');
            });
        })->addSelect('amenities.desc AS amenity_desc')->orderBy('amenities.desc', 'ASC')->leftJoin('amenity_types', 'amenities.amenity_types_id', 'amenity_types.id')->where(function ($query) {
            $query->where('amenity_types.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('amenity_types.enabled');
            });
        })->leftJoin('currency', 'rooms.currency', 'currency.code')->where(function ($query) {
            $query->where('currency.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('currency.enabled');
            });
        })->addSelect('currency.symbol_left AS currency_symbol_left')->addSelect('currency.symbol_right AS currency_symbol_right')->where('asset_amenity.asset_id', $assetId)->where('asset_amenity.available', 1)->where('asset_amenity.enabled', 1);
        return $query->get();
    }

    private function _handle_price($request)
    {
        $venue_vat = $request->commissionVAT;
        $addOnPrice = $this->_get_add_on_price($request);
        if (!$this->_user_can_override_price($request) && $this->_has_attribute($request, 'price_control_applied')) {
            if ($this->_has_attribute($request, 'flexible_percent') && $request->get('cancel_applied')) {
                $flexible_fee = (($request->flexible_percent / 100) * (round($request->base_price * (1 + ($request->price_control_applied / 100)))));
                $this->_set_flexible_fees($request, $venue_vat, $flexible_fee);
                $cancel_price = ($request->base_price + $request->flexible_fee + $request->flexible_fee_vat);
                $request->cancel_price = $cancel_price;
                $price_control_fee = ($request->get('given_price') - $addOnPrice - $cancel_price);
            } else {
                $price_control_fee = ($request->get('given_price') - $addOnPrice - $request->base_price);
            }
            if ($venue_vat > 0) {
                $price_control_fee_without_vat = ($price_control_fee / (1 + ($venue_vat / 100)));
                $request->price_control_fee = $price_control_fee_without_vat;
                $request->price_control_fee_vat = ($price_control_fee - $price_control_fee_without_vat);
            } else {
                $request->price_control_fee = $price_control_fee;
                $request->price_control_fee_vat = 0;
            }
        } else {
            if ($this->_has_attribute($request, 'flexible_percent') && $request->get('cancel_applied')) {
                $flexible_fee = (($request->flexible_percent / 100) * $request->base_price);
                $this->_set_flexible_fees($request, $venue_vat, $flexible_fee);
                $request->cancel_price = ($request->base_price + $request->flexible_fee + $request->flexible_fee_vat);
            }
        }
        if ($this->_user_can_override_price($request)) {
            if (is_null($request->get('given_price'))) {
                throw new Exception("Please enter a price for this transaction, or enter 0 to confirm a free booking.");
            } else {
                $extra_fee = $request->get('extra_fee');
                if ($venue_vat > 0) {
                    $extra_fee_without_vat = ($extra_fee / (1 + ($venue_vat / 100)));
                    $request->extra_fee = $extra_fee_without_vat;
                    $request->extra_fee_vat = ($extra_fee - $extra_fee_without_vat);
                } else {
                    $request->extra_fee = $request->get('extra_fee');
                    $request->extra_fee_vat = 0;
                }
                if ($this->_has_attribute($request, 'flexible_percent') && $request->get('cancel_applied')) {
                    $request->base_price = (($request->get('given_price') - $addOnPrice) / (1 + ($request->flexible_percent / 100)));
                    $request->cancel_price = ($request->get('given_price') - $addOnPrice);
                    $flexible_fee = ($request->base_price * ($request->flexible_percent / 100));
                    $this->_set_flexible_fees($request, $venue_vat, $flexible_fee);
                } else {
                    $request->base_price = ($request->get('given_price') - $addOnPrice);
                }
            }
        } elseif (!$this->_check_price($request)) {
            throw new Exception("We're sorry, but the price we quoted to you for this booking has now become inaccurate.");
        }
    }

    private function _user_can_override_price($request)
    {
        $retVal = false;
        if ($this->user_is_admin()) {
            $retVal = true;
        } else {
            $retVal = $this->_user_can_book_asset($request->beneficiary->id, $request->get('asset_id'));
        }
        return $retVal;
    }

    private function _user_can_book_asset($userId, $assetId)
    {
        $usePriv = AssetUserPrivilege::where('asset_id', $assetId)->where('user_id', $userId)->whereRaw('privileges_mask & ? = ?', [RolesAndPrivilegesHelper::MAKE_BOOKING, RolesAndPrivilegesHelper::MAKE_BOOKING]);
        return ($usePriv->count() > 0);
    }

    private function _set_flexible_fees($request, $venue_vat, $flexible_fee)
    {
        if ($venue_vat > 0) {
            $flexible_fee_without_vat = ($flexible_fee / (1 + ($venue_vat / 100)));
            $request->flexible_fee = $flexible_fee_without_vat;
            $request->flexible_fee_vat = ($flexible_fee - $flexible_fee_without_vat);
        } else {
            $request->flexible_fee = $flexible_fee;
            $request->flexible_fee_vat = 0;
        }
    }

    private function _check_price($request)
    {
        $priceWiggleFactor = 0.05;
        if ($request->get('cancel_applied')) {
            $price = $this->_get_cancel_price($request);
            $promisedPrice = $this->_get_cancel_price($request);
        } else {
            $price = $this->_get_price($request);
            $promisedPrice = ($request->get('given_price') - $this->_get_price_control_fee($request));
        }
        $retVal = true;
        if ($price === null || $price < ($promisedPrice * (1 - $priceWiggleFactor)) || $price < 0 || $price > ($promisedPrice * (1 + $priceWiggleFactor))) {
            $retVal = false;
        }
        return $retVal;
    }

    private function _get_price($request)
    {
        return round(($request->base_price + $this->_get_add_on_price($request)), 2);
    }

    private function _get_price_with_extra_fee($request)
    {
        return round(($request->base_price + $this->_get_add_on_price($request) + $this->_get_extra_fee($request)), 2);
    }

    private function _get_cancel_price($request)
    {
        return round(($request->cancel_price + $this->_get_add_on_price($request)), 2);
    }

    private function _get_cancel_price_with_extra_fee($request)
    {
        return round(($request->cancel_price + $this->_get_add_on_price($request) + $this->_get_extra_fee($request)), 2);
    }

    private function _get_extra_fee($request)
    {
        $retVal = 0;
        if ($this->_has_attribute($request, 'extra_fee')) {
            $retVal = round(($request->extra_fee + $request->extra_fee_vat), 2);
        }
        return $retVal;
    }

    private function _get_price_control_fee($request)
    {
        $retVal = 0;
        if ($this->_has_attribute($request, 'price_control_fee')) {
            $retVal = round(($request->price_control_fee + $request->price_control_fee_vat), 2);
        }
        return $retVal;
    }

    private function _handle_config($request)
    {
        $config = $this->_get_configuration_by_id($request->get('configuration_id'), $request->get('asset_id'));
        if (is_null($config)) {
            throw new Exception("We're sorry, but that configuration is no longer available for this room.");
        }
        $guests = $request->get('guests');
        if ($config->max_capacity < $guests) {
            throw new Exception("We're sorry, but that configuration can not hold " . $guests . " guests. The maximum is " . $config->max_capacity . ".");
        }
        $request->configuration = $config->desc;
    }

    private function _get_configuration_by_id($id, $assetId)
    {
        $query = DB::table('configurations')->select('configurations.*')->leftJoin('room_configuration', 'configurations.id', 'room_configuration.configuration_id')->where(function ($query) {
            $query->where('room_configuration.enabled', 1)->orWhere(function ($query) {
                $query->whereNull('room_configuration.enabled');
            });
        })->addSelect('room_configuration.max_capacity AS max_capacity')->where('configurations.id', $id)->where('room_configuration.asset_id', $assetId)->where('configurations.enabled', 1)->orderBy('configurations.desc', 'ASC');
        return $query->first();
    }

    private function _insert_data($request)
    {
        $booking = $this->_handle_booking($request);
        $this->_payment_machinations($request, $booking);
        return $this->_handle_reservation($request, $booking);
    }

    private function _handle_booking($request)
    {
        $booking = $this->_generate_booking($request);
        $booking->save();
        return $booking;
    }

    private function _generate_booking($request)
    {
        $booking = new Booking();
        $booking->booker_id = $request->booker->id;
        $booking->beneficiary_id = $request->beneficiary->id;
        $booking->bookingChannel_id = $request->get('bookingChannel_id');
        return $booking;
    }

    private function _payment_machinations($request, $booking)
    {
        $paymentRequest = $this->_generate_payment_request($request, $booking->id, $this->_user_can_book_asset($request->beneficiary->id, $request->get('asset_id')));
        try {
            $this->_make_payment($request, $paymentRequest);
        } catch (Exception $ex) {
            $booking->delete();
            throw new Exception($ex->getMessage());
        }
    }

    private function _generate_payment_request($request, $bookingId, $transferReference = false)
    {
        $paymentRequest = new stdClass();
        $paymentRequest->booking_id = $bookingId;
        $paymentRequest->payment_type_id = $this->_get_payment_type_id($request);
        if (!is_null($request->get('extra_fee')) && $request->get('extra_fee') != 0) {
            if ($request->get('cancel_applied')) {
                $paymentRequest->amount = ($this->_get_cancel_price_with_extra_fee($request) + $this->_get_price_control_fee($request));
            } else {
                $paymentRequest->amount = ($this->_get_price_with_extra_fee($request) + $this->_get_price_control_fee($request));
            }
        } else {
            if ($request->get('cancel_applied')) {
                $paymentRequest->amount = ($this->_get_cancel_price($request) + $this->_get_price_control_fee($request));
            } else {
                $paymentRequest->amount = ($this->_get_price($request) + $this->_get_price_control_fee($request));
            }
        }
        if (!is_null($request->get('payment_nonce'))) {
            $paymentRequest->payment_nonce = $request->get('payment_nonce');
        }
        $paymentRequest->currency = $request->room_currency_code;
        if ($transferReference && !is_null($request->get('external_reference'))) {
            $paymentRequest->external_reference = $request->get('external_reference');
        }
        return $paymentRequest;
    }

    private function _make_payment($request, $paymentRequest = null)
    {
        if ($paymentRequest !== null) {
            $transactionId = null;
            $paymentTypeId = $paymentRequest->payment_type_id;
            switch ($paymentTypeId) {
                case PaymentType::INVOICE:
                    if (!$this->user_is_admin()) {
                        throw new Exception('Error generating payment: you do not have permission to make an invoice payment. If you feel this is an error please contact the Zipcube team.');
                    }
                    $transactionId = "INVOICE";
                    break;

                case PaymentType::BRAINTREE:
                    $transactionId = $this->_make_braintree_payment($request, $paymentRequest);
                    break;

                case PaymentType::VENUEINVOICE:
                    if ($this->_has_attribute($paymentRequest, 'clone_payment_ref')) {
                        $transactionId = $paymentRequest->clone_payment_ref;
                    } else {
                        $transactionId = $paymentRequest->external_reference;
                    }
                break;

                default:
                break;
            }
            if ($transactionId !== null) {
                try {
                    $payment = $this->_generate_payment($request, $paymentRequest, $transactionId);
                    $payment->save();
                    if ($payment->has_instant_settlement()) {
                        $payment->update_payment_status(PaymentStatus::COMPLETE);
                    }
                } catch (Exception $ex) {
                    throw new Exception('Error generating payment: ' . $ex->getMessage());
                }
            } else {
                throw new Exception('Error generating payment: invalid payment type. Please report this error to the Zipcube team.');
            }
        }
    }

    private function _make_braintree_payment($request, $paymentRequest)
    {
        $braintreeHelper = new BraintreeHelper();
        if ($braintreeHelper->make_sale($paymentRequest)) {
            return $braintreeHelper->get_last_transaction_id();
        } else {
            $currentUser = $this->authority();
            AnalyticsHelper::register_step('PAYMENT_FAILED', $request->beneficiary->canonical_cookie_id, $request->beneficiary->language_pref, (($currentUser->isSpoofMode())?$currentUser->adminspoofid:null), $paymentRequest->booking_id, 'payment');
            throw new Exception("We're afraid your payment attempt was unsuccessful - the secure credit card server returned this response: " . $braintreeHelper->get_last_error_message());
        }
    }

    private function _generate_payment($request, $paymentRequest, $externalReference)
    {
        $payment = new Payment();
        $payment->set_audit_user_id($request->beneficiary->id);
        $payment->booking_id = $paymentRequest->booking_id;
        $payment->paymentType_id = $paymentRequest->payment_type_id;
        $payment->external_reference = $externalReference;
        $payment->amount = $paymentRequest->amount;
        $payment->currency = $paymentRequest->currency;
        $payment->paymentStatus_id = PaymentStatus::CREATED;
        return $payment;
    }

    private function _handle_reservation($request, $booking)
    {
        $bookingHelper = new BookingHelper();
        $straightToAccepted = $bookingHelper->goes_straight_to_accepted($booking);
        $reservation = $this->_generate_reservation($request);
        $reservation->booking_id = $booking->id;
        $title = $request->beneficiary->fullname;
        $reservation->title = $title;
        if ($straightToAccepted) {
            $reservation->suppress_emails_on_insert_update();
        }
        $reservation->set_request_period($request->period);
        $reservation->save();
//        $this->_handle_conversion($simpleReservation); //?
        $request->scheduler_event_color = (new ReservationHelper())->get_calendar_colour($reservation);
        if ($straightToAccepted) {
            $reservation->suppress_emails_on_insert_update(false, false);
            $reservation->update_reservation_status(ReservationStatus::ACCEPTED, "Automatically accepted");
        }
        if (!is_null($request->beneficiary->token) && ($booking->bookingChannel_id == BookingChannel::VENUECALENDAR || $booking->bookingChannel_id == BookingChannel::WIDGET)) {
            $commHelper = new CommHelper();
            $commHelper->new_widget_calendar_reservation_user($reservation);
        }
        $request->reservation = $reservation;
        if (!is_null($booking->id)) {
            $priceHelper = new PriceHelper('round_to_currency_quantum');
            $priceHelper->price = (new ReservationHelper())->get_revenue_price($reservation);
            $currentUser = $this->authority();
            AnalyticsHelper::register_step('MAKE_BOOKING_REQUEST', $request->beneficiary->canonical_cookie_id, $request->beneficiary->language_pref, (($currentUser->isSpoofMode())?$currentUser->adminspoofid:null), $booking->id, $request->get('asset_id'), $priceHelper->formatted());
        }
        // Create hubspot deal, associated with beneficiary of the booking.
        try {
            $hubspotHelper = new HubspotHelper();
            $user = $request->beneficiary;
            $associatedVid = $hubspotHelper->get_create_hubspot_id($user);
            $properties = [
                (object) ['name' => 'attendees', 'value' => $request->get('guests')],
                (object) ['name' => 'budget', 'value' => $this->_get_price($request)],
                (object) ['name' => 'room_configuration', 'value' => $request->configuration],
                (object) ['name' => 'amount', 'value' => $this->_get_commission($request)],
                (object) ['name' => 'bookingenddate', 'value' => $request->period->end],
                (object) ['name' => 'bookingstartdate', 'value' => $request->period->start],
                (object) ['name' => 'closedate', 'value' => strtotime($request->period->end) * 1000], // Closedate must be unix timestamp in milliseconds
                (object) ['name' => 'reservationid', 'value' => $reservation->id],
                (object) ['name' => 'first_interaction', 'value' => 'Website'],
            ];
            $room = Room::where('asset_id', $request->get('asset_id'))->first();
            if (!is_null($room)) {
                array_push($properties, (object) ['name' => 'city', 'value' => $room->venue->city]);
                array_push($properties, (object) ['name' => 'country', 'value' => $room->venue->country]);
                array_push($properties, (object) ['name' => 'venuename', 'value' => $room->venue->name]);
                array_push($properties, (object) ['name' => 'venueurl', 'value' => $room->venue->url]);
            }
            array_push($properties, (object) ['name' => 'dealname', 'value' => $user->username . " - " . $user->email]);
            array_push($properties, (object) ['name' => 'reservationstatus', 'value' => 'Pending']);
            $result = $hubspotHelper->create_deal($associatedVid, $properties);
            if (!isset($result['status']) || (isset($result['status']) && $result['status'] != 200)) {
                Log::error('Unable to add deal to Hubspot: ' . json_encode($result));
            } else {
                $reservation->hubspot_id = $result['result']->dealId;
                $reservation->suppress_audit_on_update();
                $reservation->suppress_emails_on_insert_update();
                $reservation->suppress_finances_on_insert_update();
                $reservation->save();
            }
            $phoneresult = $hubspotHelper->update_user($associatedVid, [(object) ['property' => 'phone', 'value' => $request->get('phone_number')]]);
            if (!isset($phoneresult['status']) || (isset($phoneresult['status']) && $phoneresult['status'] != 204)) {
                Log::error('Unable to update user phone number: ' . $user->id);
            }
        } catch (Exception $exc) {
            Log::error('Unable to connect to Hubspot: ' . $exc->getMessage());
        }
        return $request;
    }

    private function _generate_reservation($request)
    {
        $reservation = new Reservation();
        $reservation->set_audit_user_id($request->beneficiary->id);
        $reservation->reservationStatus_id = ReservationStatus::CREATED;
        $reservation->asset_id = $request->get('asset_id');
        $reservation->guests = $request->get('guests');
        $reservation->currency = $request->room_currency_code;
        $reservation->comments = $request->get('comments');
        $reservation->configuration = $request->configuration;
        $reservation->price = $this->_get_price($request);
        if ($this->_has_attribute($request, 'flexible_applied') && $request->flexible_applied) {
            $reservation->flexible_applied = $request->flexible_applied;
        }
        if ($this->_has_attribute($request, 'flexible_percent') && $request->get('cancel_applied')) {
            $reservation->flexible_fee = $request->flexible_fee;
            $reservation->flexible_fee_vat = $request->flexible_fee_vat;
        }
        if ($this->_has_attribute($request, 'price_control_applied')) {
            $reservation->price_control_applied = $request->price_control_applied;
            if ($this->_has_attribute($request, 'price_control_fee')) {
                $reservation->price_control_fee = $request->price_control_fee;
                $reservation->price_control_fee_vat = $request->price_control_fee_vat;
            }
        }
        // The order of this and the next two lines is important so that commission is calculated correctly. Make more robust.
        $commission = $this->_get_commission($request);
        $reservation->toZipcube = $commission;
        $reservation->toVenue = $this->_get_pay_out($request);
        $reservation->toVenue_vat = (($request->commissionVAT > 0)?$commission * ($request->commissionVAT / 100):0);
        if (!is_null($request->get('extra_fee')) && $request->get('extra_fee') != 0) {
            $reservation->extra_fee = $request->extra_fee;
            $reservation->extra_fee_vat = $request->extra_fee_vat;
        }
        $reservation->add_on_price = $this->_get_add_on_price($request);
        if ($this->_has_attribute($request, 'discount')) {
            $reservation->discount_applied = $request->discount;
        }
        if ($this->_has_attribute($request, 'addOns')) {
            $reservation->addOns = $request->addOns;
        }
        return $reservation;
    }

    private function _get_commission($request)
    {
        if ($request->commissionPercentage === null) {
            throw new Exception('No commission set. Please alert the Zipcube team.');
        }
        return (ceil($this->_get_price($request) * $request->commissionPercentage * 1000))/100000;
    }

    private function _get_pay_out($request)
    {
        return ($this->_get_price($request) - $this->_get_commission($request));
    }
}
