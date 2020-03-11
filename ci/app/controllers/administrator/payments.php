<?php
/**
 * Zipcube Admin Payment Controller Class
 *
 * @package		Zipcube
 * @subpackage	Controllers
 * @category	Admin Payment
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com

 */

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payments extends Controller_Base__Admin
{
    private $_reservation_fields = [
        'id' => 'ID',
        'room_id' => 'Reference',
        'is_paid' => 'Pmt',
        'price' => 'Price',
        'toVenue' => 'Payout (inc VAT)',
        'room_name' => 'Space',
        'status_name' => 'Status',
        'booking_date_time' => 'Book date',
        'start_date_time' => 'Dates',
        'client_first_name' => 'Client',
        'venue_name' => 'Venue',
        'source' => 'Source',
        'assignedAdmin' => 'Assigned User'
    ];

    private $_source_values = [
        'Website Direct',
        'Enquiry - Website',
        'Enquiry - Call',
        'Enquiry - Email',
        'Enquiry - Chat'
    ];

    public function index()
    {
        redirect($this->data['country_lang_url'] . '/administrator');
    }

    public function bookings($status = 'all', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        try
        {
            $validator = new Helper__Validator();
            $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
            $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
            $modelReservations = Model__reservations::class;
            $this->load->model($modelReservations);
            $limit = 20;
            $this->data['fields'] = $this->_reservation_fields;
            $this->data['bookings'] = $this->$modelReservations->get_all_reservations_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, $status);
            $num_results = $this->db->get_row_count();
            $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
            $this->data['sources'] = $this->_source_values;
            if ($status == 'invoice_unpaid')
            {
                $currArr = [];
                $modelCurrency = Model__currency::class;
                $this->load->model($modelCurrency);
                $currencies = $this->$modelCurrency->get_currency_object_collection();
                foreach ($currencies->object() as $currency)
                {
                    $currArr[$currency->get('code')] = $currency->get('left_symbol');
                }
                $this->data['currencies'] = $currArr;
                $this->data['invoice_amounts'] = $this->$modelReservations->get_future_invoice_amount();
            }
            $this->data['payment_problems'] = $this->$modelReservations->get_reservations_with_payment_problems();
            $usersModel = Model__users::class;
            $this->load->model($usersModel);
            $this->data['admin_users'] = $this->$usersModel->get_admin_users();
            $this->load->library('pagination');
            $p_config = [];
            $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/payments/bookings/' . $status . '/' . $sort_by . '/' . $sort_order_cleaned);
            $p_config['uri_segment'] = 8;
            $p_config['num_links'] = 5;
            $p_config['total_rows'] = $num_results;
            $p_config['per_page'] = $limit;
            $this->pagination->initialize($p_config);
            $this->data['pagination'] = $this->pagination->create_links();
            $this->data['sort_order'] = $sort_order_cleaned;
            $this->data['sort_by'] = $sort_by;
            $this->data['filters'] = [
                'all' => 'All Bookings',
                Reservation_Status::CREATED => 'Pending',
                Reservation_Status::EXPIRED => 'Expired',
                Reservation_Status::ACCEPTED => 'Accepted',
                Reservation_Status::DECLINE => 'Declined',
                Reservation_Status::CANCELLEDBYHOST => 'Cancel Venue',
                Reservation_Status::CANCELLEDBYUSER => 'Cancel Client',
                Reservation_Status::AWAITINGUSERREVIEW => 'Client Review',
                'topay' => 'To Pay',
                'paid' => 'All paid',
                Reservation_Status::COMPLETED => 'Completed',
                'yesterday' => 'Yesterday',
                'calendar' => 'Calendar',
                'widget' => 'Widget',
                'invoice_unpaid' => 'Unpaid Invoices',
                'user' => 'Assigned to me',
                'not_agree' => 'Venues not agreed to list',
            ];
            $currentMonth = date('m');
            $currentYear = date('Y');
            $startMonth = '4';
            $startYear = '2014';
            $endMonth = (($currentMonth == 1)?12:$currentMonth - 1);
            $endYear = (($currentMonth == 1)?$currentYear-1:$currentYear);
            for ($y = $endYear; $y >= $startYear; --$y)
            {
                $this->data['tog_dates'][$y] = [];
                if ($y != $currentYear)
                {
                    for ($m = 12; $m > 0; --$m)
                    {
                        if ($y != $startYear || ($y == $startYear && $m >= $startMonth))
                        {
                            $this->data['tog_dates'][$y][] = [
                                'monthnum' => $m,
                                'monthname' => date("F", mktime(0, 0, 0, $m, 1))
                            ];
                        }
                    }
                }
                else
                {
                    for ($cm = $endMonth; $cm > 0; --$cm)
                    {
                        $this->data['tog_dates'][$y][] = [
                            'monthnum' => $cm,
                            'monthname' => date("F", mktime(0, 0, 0, $cm, 1))
                        ];
                    }
                }
            }
            $this->data['invoice_csvs'] = [
              'uber' => 'Uber Unpaid Invoices',
              'deliveroo' => 'Deliveroo Unpaid Invoices',
              'syft' => 'Syft Unpaid Invoices',
              'newtoneurope' => 'Newton Europe Unpaid Invoices',
              'octoenergy' => 'Octo Energy Unpaid Invoices',
              'kaluza' => 'Kaluza Unpaid Invoices',
              'gocardless' => 'Go Cardless Unpaid Invoices',
              'adecco' => 'Adecco Unpaid Invoices',
              'get-licensed' => 'Get Licensed Unpaid Invoices',
              'iese.org' => 'iESE Unpaid Invoices',
            ];
            $this->data['csvs'] = ['yesterday' => 'Bookings Yesterday For Reviews'];
            $this->data['status'] = $status;
            $this->data['message_element'] = 'administrator/payment/booking_list';
            $this->_add_page_js_css();
            $this->_render();
        }
        catch (Exception $ex)
        {
            redirect('errors/page_missing');
        }
    }

    public function bookingkeyword($keyword = '', $sort_by = 'id', $sort_order = 'desc', $offset = 0)
    {
        if ($this->input->post() || $keyword != '')
        {
            try
            {
                $validator = new Helper__Validator();
                $sort_order_cleaned = (($sort_order == 'asc')?'asc':'desc');
                $offset_cleaned = $validator->direct_validate($offset, 'is_natural');
                if ($this->input->post())
                {
                    $keyword_cleaned = trim($this->input->post('q'));
                    $keyword_query = trim($this->input->post('q', 'db_safe_for_like'));
                }
                else
                {
                    $keyword_cleaned = trim($keyword);
                    $keyword_query = trim($validator->validate($keyword, 'db_safe_for_like'));
                }
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $limit = 20;
                $this->data['fields'] = $this->_reservation_fields;
                $this->data['bookings'] = $this->$modelReservations->get_all_reservations_details_collection($limit, $offset_cleaned, $sort_by, $sort_order_cleaned, 'all', $keyword_query);
                $num_results = $this->db->get_row_count();
                $this->data['num_results'] = $num_results . ' result' . (($num_results != 1)?'s':'');
                $this->data['sources'] = $this->_source_values;
                $this->data['payment_problems'] = [];
                $usersModel = Model__users::class;
                $this->load->model($usersModel);
                $this->data['admin_users'] = $this->$usersModel->get_admin_users();
                $this->load->library('pagination');
                $p_config = [];
                $p_config['base_url'] = site_url($this->data['country_lang_url'] . '/administrator/payments/bookingkeyword/' . $keyword_cleaned . '/' . $sort_by . '/' . $sort_order_cleaned);
                $p_config['uri_segment'] = 8;
                $p_config['num_links'] = 5;
                $p_config['total_rows'] = $num_results;
                $p_config['per_page'] = $limit;
                $this->pagination->initialize($p_config);
                $this->data['pagination'] = $this->pagination->create_links();
                $this->data['sort_order'] = $sort_order_cleaned;
                $this->data['sort_by'] = $sort_by;
                $this->data['keyword'] = $keyword_cleaned;
                $this->data['status'] = 'all';
                $this->data['filters'] = ['all' => 'All Bookings'];
                $this->data['invoice_csvs'] = [];
                $this->data['csvs'] = [];
                $this->data['message_element'] = 'administrator/payment/booking_list';
                $this->_add_page_js_css();
                $this->_render();
            }
            catch (Exception $ex)
            {
                redirect('errors/page_missing');
            }
        }
        else
        {
            redirect($this->data['country_lang_url'] . '/administrator');
        }
    }

    private function _add_page_js_css()
    {
        $this->_add_js(auto_version('modals/booking_payments.js'));
        $this->_add_js(auto_version('modals/onboard_venues.js'));
        $this->_add_js(auto_version('modals/reservation_details.js'));
        $this->_add_js(auto_version('modals/reservation_audit.js'));
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('administrator/bookings.js'));
        $this->_add_js_variable('date_format', Wrangler__Date::get_format_datepicker_string());
        $this->add_datepicker_files();
        $this->add_switchery_plugin_files();
        $this->add_phone_plugin_files();
        $this->_add_css('<link href="' . auto_version('datepicker.css') . '" media="screen" rel="stylesheet" type="text/css" />');
        $this->_add_js('https://js.braintreegateway.com/v2/braintree.js');
    }

    public function bookings_csv($query, $month = '', $year = '')
    {
        $modelReservations = Model__reservations::class;
        $this->load->model($modelReservations);
        switch ($query)
        {
            case 'tog':

                if ($month == '' || !is_numeric($month) || $year == '' || !is_numeric($year))
                {
                    redirect($this->data['country_lang_url'] . '/administrator/payments/bookings/1');
                }
                $results = $this->$modelReservations->get_tog_reservations($month, $year);
            break;

            case 'yesterday':

                $results = $this->$modelReservations->get_yesterday_reservations_for_review();
            break;

            case 'uber':
            case 'deliveroo':
            case 'syft':
            case 'newtoneurope':
            case 'octoenergy':
            case 'kaluza':
            case 'gocardless':
            case 'adecco':
            case 'get-licensed':
            case 'iese.org':

                $results = $this->$modelReservations->get_unpaid_invoices_by_company($query);
            break;
        }
        return $this->admin_csv_from_query($query, $results);
    }

    public function summary()
    {
        $this->add_datepicker_files();
        $this->_add_js(auto_version('administrator/payments.js'));
        $this->data['message_element'] = 'administrator/payment/summary';
        $this->_render();
    }
}