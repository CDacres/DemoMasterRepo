<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class HubspotAPI
{
    protected $domain = "https://api.hubapi.com";

    private function json_get($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url . "?hapikey=" . config_item('hubspot_api_key'));
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
        curl_setopt($ch, CURLOPT_URL, $url . "?hapikey=" . config_item('hubspot_api_key'));
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
        curl_setopt($ch, CURLOPT_URL, $url . "?hapikey=" . config_item('hubspot_api_key'));
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

//    public function create_user($properties)
//    {
//        $url = $this->domain . "/contacts/v1/contact";
//        $data = (object) ['properties' => $properties];
//        return $this->json_post($url, $data);
//    }

//    public function get_all_contacts()
//    {
//        $url = $this->domain . "/contacts/v1/contact/all";
//        return $this->json_get($url);
//    }

    public function get_user_by_id($vid)
    {
        $url = $this->domain . "/contacts/v1/contact/vid/" . $vid . "/profile";
        return $this->json_get($url);
    }

    public function get_contact_by_email($email)
    {
        $url = $this->domain . "/contacts/v1/contact/email/" . $email . "/profile";
        return $this->json_get($url);
    }

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

    public function create_deal($portalId, $pipeline = "default", $dealstage = "newdeal", $properties, $associations)
    {
        $url = $this->domain . "/deals/v1/deal";
        $required_properties = [
            (object) [
                'name' => 'pipeline',
                'value' => $pipeline
            ],
            (object) [
                'name' => 'dealstage',
                'value' => $dealstage
            ]
        ];
        $data = (object) [
            'associations' => $associations,
            'portalId' => $portalId,
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
            'engagement' => (object) [
                'active' => true,
                'ownerId' => $ownerId,
                'type' => 'NOTE',
                'timestamp' => (time() * 1000)
            ],
            'metadata' => $properties
        ];
        return $this->json_post($url, $data);
    }
}