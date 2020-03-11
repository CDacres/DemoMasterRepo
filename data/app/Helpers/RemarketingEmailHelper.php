<?php

namespace App\Helpers;

use App\Models\User;
use \Exception;

class RemarketingEmailHelper
{
    public $view;
    public $view_id;
    public $lang;
    public $opened_token;
    public $clicked_token;
    public $user;
    public $user_id;
    public $event_objects;
    public $default_sender_id;
    public $sender;
    public $is_dry_run;

    const VIEWINFO = [
        1 => ['location' => 'emails.remarketing.never_booked_checkout_dropoff.v1'],
        2 => ['location' => 'emails.remarketing.has_booked_checkout_dropoff.v1', 'subject' => ['roomtitle' => 'checkouts.first.room.title']],
        3 => ['location' => 'emails.remarketing.checkout_dropoff_repeat.v1', 'subject' => ['roomtitle' => 'checkouts.first.room.title']],
        4 => ['location' => 'emails.remarketing.room_dropoff.v1']
    ];

    const EMAILDISPOSABLE = 'Disposable';
    const EMAILINVALID = 'Invalid';
    const EMAILOTHER = 'Other';
    const EMAILUNKNOWN = 'Unknown';
    const EMAILUNVERIFIABLE = 'Unverifiable';
    const EMAILVALID = 'Valid';

    public function __construct($user_id, $view, $dry_run = false)
    {
        $this->_add_user($user_id);
        $this->clicked_token = $this->_generate_token(50);
        $this->opened_token = $this->_generate_token(50);
        $this->view = $view;
        $this->is_dry_run = $dry_run;
        $this->mail_view_id = $view->email_view_id;
        $this->_add_sender();
    }

    public function location()
    {
        return static::VIEWINFO[$this->mail_view_id]['location'] . "." . $this->lang;
    }

    public function subject()
    {
        $lang_pointer = str_replace(".", "/", static::VIEWINFO[$this->mail_view_id]['location']) . ".subject";
        $subject_array = $this->_get_subject_lang_array();
        return trans($lang_pointer, $subject_array, $this->lang);
    }

    public function mail_data()
    {
        $dataArr = $this->_standard_data();
        $merge = array_merge($dataArr, $this->event_objects);
        return $merge;
    }

    public function sender_email()
    {
        return $this->sender->email;
    }

    public function sender_name()
    {
        return ucfirst($this->sender->profile->Fname) . " - Zipcube";
    }

    public function add_event_objects($objects_array)
    {
        $this->event_objects = $objects_array;
    }

    public function add_events_collection($key, $collection, $unique = true, $model_key_column = 'id')
    {
        if ($unique)
        {
            $collection = $collection->unique($model_key_column);
        }
        $this->event_objects[$key] = $collection;
    }

    public function generate_url($uri, $prettify = false)
    {
        $url = env('SITE_URL') . "/" . $uri;
        if (!$prettify)
        {
            $url .= "?source=zipcube&medium=email&type=rm&ct=" . $this->clicked_token;
        }
        return $url;
    }

    public function user_wants_email()
    {
        return ($this->user->marketing_subscribed == 1 && $this->user->role_id != 2 && $this->user->userType_id != 1 && $this->_shouldSendEmailToAddress($this->user->email_status));
    }

    private function _shouldSendEmailToAddress($status)
    {
        $retBool = false;
        switch ($status)
        {
            case static::EMAILDISPOSABLE:
            case static::EMAILINVALID:

                $retBool = false;
            break;

            case static::EMAILOTHER:
            case static::EMAILUNKNOWN:
            case static::EMAILUNVERIFIABLE:
            case static::EMAILVALID:

                $retBool = true;
            break;

            default:

                $retBool = false;
            break;
        }
        return $retBool;
    }

    public function unsubscribe_link()
    {
        return $this->generate_url("unsubscribe") . "&_mut=" . $this->user->unsubscribe_token;
    }

    private function _generate_token($random_string_length)
    {
        $characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        $string = '';
        $max = strlen($characters) - 1;
        for ($i = 0; $i < ($random_string_length - 13); $i++)
        {
            $string .= $characters[mt_rand(0, $max)];
        }
        return uniqid() . $string;
    }

    private function _get_subject_lang_array()
    {
        $retArr = [];
        if (isset(static::VIEWINFO[$this->mail_view_id]['subject']))
        {
            $raw_array = static::VIEWINFO[$this->mail_view_id]['subject'];
            foreach ($raw_array as $key => $item)
            {
                $object_helper_array = explode(".", $item);
                $objects = $this->event_objects[array_shift($object_helper_array)];
                $getter = array_shift($object_helper_array);
                $object = $objects->$getter();
                $retArr[$key] = $this->_get_relevant_object_item($object, $object_helper_array);
            }
        }
        return $retArr;
    }

    private function _get_relevant_object_item($object, $object_helper_array)
    {
        $pointer = array_shift($object_helper_array);
        $deeper = $object->$pointer;
        if (count($object_helper_array) === 0)
        {
            return $deeper;
        }
        else
        {
            return $this->_get_relevant_object_item($deeper, $object_helper_array);
        }
    }

    private function _standard_data()
    {
        $tracker_image_url = env('DATA_API_URL') . "/tr_images/" . $this->opened_token . ".png";
        $click_url = env('SITE_URL') . "/?source=zipcube&medium=email&type=rm&ct=" . $this->clicked_token;
        return [
            'click_url' => $click_url,
            'tracker_image_url' => $tracker_image_url,
            'user' => $this->user,
            'helper' => $this,
            'sender' => $this->sender
        ];
    }

    private function _add_user($user_id)
    {
        $this->user_id = $user_id;
        $user = User::find($user_id);
        if ($user)
        {
            $this->user = $user;
        }
        else
        {
            throw new Exception("User id " . $user_id . " has no corresponding entry");
        }
        $this->lang = $this->user->language_pref;
    }

    private function _add_sender()
    {
        $sender = null;
//        if ($this->view->specific_sender == 1)
//        {
//            if ($admin_collection = AnalyticsHelper::get_recent_events($this->user_id, "ADMIN_INTERACTION", 'DESC', 1))
//            {
//                $sender = User::find($admin_collection[0]->context_field_1_value);
//            }
//        }
        if (!$sender)
        {
            $sender = User::find(env('DEFAULT_SENDER_USER_ID'));
        }
        if ($sender)
        {
            $this->sender = $sender;
        }
        else
        {
            throw new Exception("User id " . $this->user_id . " can't get an admin user");
        }
    }
}