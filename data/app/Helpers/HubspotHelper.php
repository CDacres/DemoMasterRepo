<?php

namespace App\Helpers;

use App\Models\User;

use App\Contracts\Facades\ChannelLog as Log;

class HubspotHelper
{
    protected $domain = "https://api.hubapi.com";

    public function __construct()
    {
        $this->api_key = env('HUBSPOT_API_KEY');
        $this->portal_id = env('HUBSPOT_PORTAL_ID');
        $this->pipeline_id = env('HUBSPOT_PIPELINE_ID');
        $this->stage_id = env('HUBSPOT_STAGE_ID');
    }

    private function json_get($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url . "?hapikey=" . $this->api_key);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [
            'status' => $http_status,
            'result' => json_decode($result)
        ];
    }

    private function json_post($url, $data)
    {
        $ch = curl_init();
        $json_data = json_encode($data);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_URL, $url . "?hapikey=" . $this->api_key);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [
            'status' => $http_status,
            'result' => json_decode($result)
        ];
    }

    private function json_put($url, $data)
    {
        $ch = curl_init();
        $json_data = json_encode($data);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_URL, $url . "?hapikey=" . $this->api_key);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return [
            'status' => $http_status,
            'result' => json_decode($result)
        ];
    }

    public function get_create_hubspot_id($user)
    {
        $retVal = '';
        $hubspot_id = intval($user->hubspot_id);
        if (!is_null($hubspot_id) && $hubspot_id > 0)
        {
            $retVal = $hubspot_id;
        }
        else
        {
            try
            {
                $userProfile = User::where('id', $user->id)->with('profile')->first();
                if (!is_null($userProfile))
                {
                    // Create user on hubspot
                    $result = $this->create_or_update_user($userProfile->email, [
                        (object) ['property' => 'firstname', 'value' => $userProfile->profile->Fname],
                        (object) ['property' => 'lastname', 'value' => $userProfile->profile->Lname],
                        (object) ['property' => 'phone', 'value' => $userProfile->profile->phnum]
                    ]);
                    if (!isset($result['status']) || (isset($result['status']) && $result['status'] == 409))
                    {
                        Log::error('Unable to add user to Hubspot: ' . json_encode($result));
                    }
                    elseif (isset($result['result']->vid))
                    {
                        // Save hubspot id
                        $retVal = intval($result['result']->vid);
                        $userProfile->hubspot_id = $retVal;
                        $userProfile->save();
                    }
                }
            }
            catch (Exception $exc)
            {
                Log::error('Unable connect to hubspot: ' . $exc->getMessage());
            }
        }
        return $retVal;
    }

//    public function create_user($properties)
//    {
//        $url = $this->domain . "/contacts/v1/contact";
//        $data = (object) ['properties' => $properties];
//        return $this->json_post($url, $data);
//    }

    public function update_user($vid, $properties)
    {
        $url = $this->domain . "/contacts/v1/contact/vid/" . $vid . "/profile";
        $data = (object) ['properties' => $properties];
        return $this->json_post($url, $data);
    }

    public function create_or_update_user($email, $properties)
    {
        $url = $this->domain . "/contacts/v1/contact/createOrUpdate/email/" . $email;
        $required_properties = [
            (object) [
                'property' => 'email',
                'value' => $email
            ]
        ];
        $data = (object) ['properties' => array_merge($required_properties, $properties)];
        return $this->json_post($url, $data);
    }

    public function create_deal($associatedVid, $properties)
    {
        $url = $this->domain . "/deals/v1/deal";
        $required_properties = [
            (object) [
                'name' => 'pipeline',
                'value' => $this->pipeline_id
            ],
            (object) [
                'name' => 'dealstage',
                'value' => $this->stage_id
            ]
        ];
        $data = (object) [
            'associations' => (object) [
                'associatedVids' => [$associatedVid]
            ],
            'portalId' => $this->portal_id,
            'properties' => array_merge($required_properties, $properties)
        ];
        return $this->json_post($url, $data);
    }

    public function update_deal($dealId, $properties)
    {
        $url = $this->domain . "/deals/v1/deal/" . $dealId;
        $data = (object) ['properties' => $properties];
        return $this->json_put($url, $data);
    }

//    public function get_all_deals()
//    {
//        $url = $this->domain . "/deals/v1/deal/paged";
//        return $this->json_get($url);
//    }

    public function get_deal($dealId)
    {
        $url = $this->domain . "/deals/v1/deal/" . $dealId;
        return $this->json_get($url);
    }

    public function create_note_engagement($dealId, $ownerId, $properties)
    {
        $url = $this->domain . "/engagements/v1/engagements";
        $data = (object) [
            'associations' => (object) ['dealIds' => [$dealId]],
            'engagement' => (object) ['active' => true, 'ownerId' => $ownerId, 'type' => 'NOTE', 'timestamp' => (time() * 1000)],
            'metadata' => $properties
        ];
        return $this->json_post($url, $data);
    }

//    public function get_all_contacts()
//    {
//        $url = $this->domain . "/contacts/v1/contact/all";
//        return $this->json_get($url);
//    }

    public function get_contact_by_email($email)
    {
        $url = $this->domain . "/contacts/v1/contact/email/" . $email . "/profile";
        return $this->json_get($url);
    }
}