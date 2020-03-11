<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Exceptions extends Controller_Base__Admin
{
    public function index()
    {
        $this->audit();
    }

    public function audit()
    {
        $queries = [
            'payment_multi_audit',
            'payment_missing_audit',
            'reservation_multi_audit',
            'reservation_missing_audit',
            'enquiry_multi_audit',
            'enquiry_missing_audit'
        ];
        $this->_run_page_queries($queries);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_audit";
        $this->_render();
    }

    public function asset()
    {
        $this->_run_page_queries(['asset_missing_owner']);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_asset";
        $this->_render();
    }

    public function company()
    {
        $queries = [
            'company_missing_venues',
            'company_missing_name'
        ];
        $this->_run_page_queries($queries);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_company";
        $this->_render();
    }

    public function venue()
    {
        $queries = [
            'venue_missing_commission',
            'venue_missing_rooms',
            'venue_missing_hours',
            'venue_missing_cancel',
            'venue_missing_reviews',
            'venue_missing_image',
            'venue_missing_feat_image',
            'venue_missing_vat_rate',
            'venue_same_locations',
            'venue_same_rooms'
        ];
        $this->_run_page_queries($queries);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_venue";
        $this->_render();
    }

    public function room()
    {
        $queries = [
            'room_unapproved_venue',
            'room_missing_hours',
            'room_missing_config',
            'room_missing_image',
            'room_missing_feat_image'
        ];
        $this->_run_page_queries($queries);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_room";
        $this->_render();
    }

    public function reservation()
    {
        $queries = [
            'reservation_missing_venue_pay_date',
            'reservation_diff_payment',
            'payout_diff_venue_payments'
        ];
        $this->_run_page_queries($queries);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_reservation";
        $this->_render();
    }

    public function user()
    {
        $queries = [
            'user_missing_profile',
            'user_with_privileges_non_assetowner',
            'unenabled_user_asset_permission',
            'unenabled_user_asset_main_contact'
        ];
        $this->_run_page_queries($queries);
        $this->_add_js(auto_version('administrator/exceptions.js'));
        $this->data['message_element'] = "administrator/exceptions/exceptions_user";
        $this->_render();
    }

    private function _run_page_queries($queries)
    {
        foreach ($queries as $query)
        {
            $resultArr = [];
            $results = $this->_exception_query($query);
            if ($results != null)
            {
                while ($row = mysql_fetch_assoc($results))
                {
                    $resultArr[] = $row;
                }
                $this->data[$query] = $resultArr;
                $this->data[$query . '_results'] = count($resultArr);
            }
        }
    }

    public function exception_csv($query)
    {
        $results = $this->_exception_query($query, false);
        return $this->admin_csv_from_query($query, $results);
    }

    private function _exception_query($query, $unbuffered = true)
    {
        $modelExceptions = Model__exceptions::class;
        $this->load->model($modelExceptions);
        $retQuery = null;
        switch ($query)
        {
            case 'payment_multi_audit':

                $retQuery = $this->$modelExceptions->get_multiple_payment_audits($unbuffered);
            break;

            case 'payment_missing_audit':

                $retQuery = $this->$modelExceptions->get_payments_without_audits($unbuffered);
            break;

            case 'reservation_multi_audit':

                $retQuery = $this->$modelExceptions->get_multiple_reservation_audits($unbuffered);
            break;

            case 'reservation_missing_audit':

                $retQuery = $this->$modelExceptions->get_reservations_without_audits($unbuffered);
            break;

            case 'enquiry_multi_audit':

                $retQuery = $this->$modelExceptions->get_multiple_enquiry_audits($unbuffered);
            break;

            case 'enquiry_missing_audit':

                $retQuery = $this->$modelExceptions->get_enquiries_without_audits($unbuffered);
            break;

            case 'company_missing_venues':

                $retQuery = $this->$modelExceptions->get_companies_without_venues($unbuffered);
            break;

            case 'company_missing_name':

                $retQuery = $this->$modelExceptions->get_companies_without_name($unbuffered);
            break;

            case 'venue_missing_hours':

                $retQuery = $this->$modelExceptions->get_venues_without_hours($unbuffered);
            break;

            case 'venue_missing_cancel':

                $retQuery = $this->$modelExceptions->get_venues_without_cancellation($unbuffered);
            break;

            case 'venue_missing_rooms':

                $retQuery = $this->$modelExceptions->get_venues_without_rooms($unbuffered);
            break;

            case 'venue_missing_image':

                $retQuery = $this->$modelExceptions->get_venues_without_any_image($unbuffered);
            break;

            case 'venue_missing_feat_image':

                $retQuery = $this->$modelExceptions->get_venues_without_featured_image($unbuffered);
            break;

            case 'venue_missing_vat_rate':

                $retQuery = $this->$modelExceptions->get_venues_missing_vat_rate($unbuffered);
            break;

            case 'room_unapproved_venue':

                $retQuery = $this->$modelExceptions->get_approved_rooms_in_unapproved_venue($unbuffered);
            break;

            case 'room_missing_hours':

                $retQuery = $this->$modelExceptions->get_rooms_without_hours($unbuffered);
            break;

            case 'room_missing_config':

                $retQuery = $this->$modelExceptions->get_rooms_without_configurations($unbuffered);
            break;

            case 'room_missing_image':

                $retQuery = $this->$modelExceptions->get_rooms_without_any_image($unbuffered);
            break;

            case 'room_missing_feat_image':

                $retQuery = $this->$modelExceptions->get_rooms_without_featured_image($unbuffered);
            break;

            case 'venue_missing_commission':

                $retQuery = $this->$modelExceptions->get_venues_without_commissions($unbuffered);
            break;

            case 'reservation_missing_venue_pay_date':

                $retQuery = $this->$modelExceptions->get_paid_reservations_without_date($unbuffered);
            break;

            case 'reservation_diff_payment':

                $retQuery = $this->$modelExceptions->get_reservations_with_different_payments($unbuffered);
            break;

            case 'asset_missing_owner':

                $retQuery = $this->$modelExceptions->get_assets_without_owner($unbuffered);
            break;

            case 'user_missing_profile':

                $retQuery = $this->$modelExceptions->get_users_without_profile($unbuffered);
            break;

            case 'user_with_privileges_non_assetowner':

                $retQuery = $this->$modelExceptions->get_users_with_privileges_non_assetowner($unbuffered);
            break;

            case 'venue_missing_reviews':

                $retQuery = $this->$modelExceptions->get_reviewed_venues_without_reviews($unbuffered);
            break;

            case 'venue_same_locations':

                $retQuery = $this->$modelExceptions->get_venues_same_location($unbuffered);
            break;

            case 'venue_same_rooms':

                $retQuery = $this->$modelExceptions->get_venues_same_room_names($unbuffered);
            break;

            case 'payout_diff_venue_payments':

                $retQuery = $this->$modelExceptions->get_payout_diff_venue_payments($unbuffered);
            break;

            case 'unenabled_user_asset_permission':

                $retQuery = $this->$modelExceptions->get_unenabled_user_asset_permission($unbuffered);
            break;

            case 'unenabled_user_asset_main_contact':

                $retQuery = $this->$modelExceptions->get_unenabled_user_asset_main_contact($unbuffered);
            break;
        }
        return $retQuery;
    }
}