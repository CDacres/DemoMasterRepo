<?php

namespace App\Events;

use App\Models\Enquiry;
use App\Models\EnquiryRoom;
use App\Models\EnquiryConfiguration;
use App\Models\EnquiryStatus;
use App\Models\User;

use App\Helpers\AnalyticsHelper;

class EnquiryCreatedEvent extends Event
{
    public function __construct(Enquiry $enquiry)
    {
        $this->_run_audit_event($enquiry);
        $this->_insert_rooms($enquiry);
        $this->_insert_configurations($enquiry);
        $this->_send_created_email($enquiry);
        $this->_update_user_enquirer_state($enquiry);
    }

    private function _run_audit_event($enquiry)
    {
        return new EnquiryAuditEvent($enquiry);
    }

    private function _insert_rooms($enquiry)
    {
        $rooms = $enquiry->get_request_rooms();
        foreach ($rooms as $room)
        {
            $enquiry_room = new EnquiryRoom();
            $enquiry_room->enquiry_id = $enquiry->id;
            $enquiry_room->room_id = $room->roomid;
            $enquiry_room->save();
        }
    }

    private function _insert_configurations($enquiry)
    {
        $configs = $enquiry->get_request_configs();
        foreach ($configs as $config)
        {
            $enquiry_config = new EnquiryConfiguration();
            $enquiry_config->enquiry_id = $enquiry->id;
            $enquiry_config->configuration_id = $config->id;
            $enquiry_config->save();
        }
    }

    private function _send_created_email($enquiry)
    {
        $enquiry->handle_comms();
    }

    private function _update_user_enquirer_state($enquiry)
    {
        if (!is_null($enquiry->user_id))
        {
            $user = User::find($enquiry->user_id);
            if (!is_null($user))
            {
                $user->update_user_is_enquirer($this->_check_user_has_enquiries_by_id($user->id, $enquiry->id));
                $currentUser = $enquiry->get_enquiring_user();
                AnalyticsHelper::register_step('MAKE_ENQUIRY', $user->canonical_cookie_id, $user->language_pref, (($currentUser->isSpoofMode())?$currentUser->adminspoofid:null), $enquiry->id);
            }
        }
    }

    private function _check_user_has_enquiries_by_id($user_id, $enquiry_id)
    {
        $has_enquiry = false;
        $user_enquiries = Enquiry::where('user_id', $user_id)->whereIn('status', [EnquiryStatus::PENDING])->where('id', '<>', $enquiry_id)->get();
        if (!is_null($user_enquiries))
        {
            $has_enquiry = true;
        }
        return $has_enquiry;
    }
}