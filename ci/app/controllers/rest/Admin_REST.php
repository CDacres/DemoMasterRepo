<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
require_once APPPATH . 'libraries/REST_Controller.php';

class Admin_REST extends REST_Controller
{
    function __construct()
    {
        parent::__construct();
        if (!$this->dx_auth->is_admin())
        {
            return $this->response($this->lang->line('rest_wrong_perm'), 403);
        }
    }

    public function monthly_get()
    {
        $get = $this->get();
        if (!isset($get['start']) && !isset($get['duration']))
        {
            return $this->response(null, 400);
        }
        $dates = $this->_find_start_end_dates($get['start'], $get['duration'], '2014-03-05');
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $monthly_overview = $this->$modelStats->get_monthly_totals(false, [], null, $dates['start'], $dates['end']);
        $retStats = new Base__Null();
        echo $retStats->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/payment/website_overview', ['monthly_overview' => $monthly_overview], true)]);
    }

    public function flexible_get()
    {
        $get = $this->get();
        if (!isset($get['start']) && !isset($get['duration']))
        {
            return $this->response(null, 400);
        }
        $dates = $this->_find_start_end_dates($get['start'], $get['duration'], '2017-01-12');
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $monthly_flexible = $this->$modelStats->get_monthly_flexible($dates['start'], $dates['end']);
        $retStats = new Base__Null();
        echo $retStats->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/payment/website_overview', ['monthly_overview' => $monthly_flexible], true)]);
    }

    public function split_get()
    {
        $get = $this->get();
        if (!isset($get['start']) && !isset($get['duration']))
        {
            return $this->response(null, 400);
        }
        $dates = $this->_find_start_end_dates($get['start'], $get['duration'], '2014-03-05');
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $monthly_booking_split = $this->$modelStats->get_monthly_booking_split($dates['start'], $dates['end']);
        $retStats = new Base__Null();
        echo $retStats->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/payment/monthly_subrow_table', ['cols' => $monthly_booking_split['cols'], 'data' => $monthly_booking_split['data'], 'titles' => $monthly_booking_split['row_titles'], 'subtitles' => $monthly_booking_split['sub_row_titles']], true)]);
    }

    public function control_get()
    {
        $get = $this->get();
        if (!isset($get['start']))
        {
            return $this->response(null, 400);
        }
        if ($get['start'] == '')
        {
            $date = new DateTime();
        }
        else
        {
            $date = new DateTime($get['start']);
        }
        $modelCurrencies = Model__currency::class;
        $this->load->model($modelCurrencies);
        $currencies = $this->$modelCurrencies->get_currency_object_collection();
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $venue_control = $this->$modelStats->get_venue_control($date);
        $retStats = new Base__Null();
        echo $retStats->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/payment/control_table', ['currencies' => $currencies, 'data' => $venue_control], true)]);
    }

    public function venue_get()
    {
        $get = $this->get();
        if (!isset($get['start']) && !isset($get['duration']))
        {
            return $this->response(null, 400);
        }
        $dates = $this->_find_start_end_dates($get['start'], $get['duration'], '2012-11-30');
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $monthly_venues = $this->$modelStats->get_monthly_assets(Asset_Type::VENUE, $dates['start'], $dates['end']);
        $retStats = new Base__Null();
        echo $retStats->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/payment/monthly_subrow_table', ['cols' => $monthly_venues['cols'], 'data' => $monthly_venues['data'], 'titles' => $monthly_venues['row_titles'], 'subtitles' => $monthly_venues['sub_row_titles']], true)]);
    }

    public function room_get()
    {
        $get = $this->get();
        if (!isset($get['start']) && !isset($get['duration']))
        {
            return $this->response(null, 400);
        }
        $dates = $this->_find_start_end_dates($get['start'], $get['duration'], '2013-05-03');
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $monthly_rooms = $this->$modelStats->get_monthly_assets(Asset_Type::ROOM, $dates['start'], $dates['end']);
        $retStats = new Base__Null();
        echo $retStats->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/payment/monthly_subrow_table', ['cols' => $monthly_rooms['cols'], 'data' => $monthly_rooms['data'], 'titles' => $monthly_rooms['row_titles'], 'subtitles' => $monthly_rooms['sub_row_titles']], true)]);
    }

    private function _find_start_end_dates($start, $duration, $setStartDate)
    {
        if ($start == '')
        {
            $startDay = new DateTime();
            $startDate = $startDay->add(new DateInterval('P1D'));
        }
        else
        {
            $startDay = new DateTime($start);
            $startDate = $startDay->add(new DateInterval('P1D'));
        }
        if ($duration == '')
        {
            $endDaysAgo = new DateTime();
            $endDate = $endDaysAgo->sub(new DateInterval('P6M'));
        }
        elseif ($duration == 0)
        {
            $endDate = new DateTime($setStartDate);
        }
        else
        {
            if ($start == '')
            {
                $startDayMonth = new DateTime();
                $startDayMonth->modify('first day of this month');
                $endDaysAgo = new DateTime($startDayMonth->format('Y-m-d'));
            }
            else
            {
                $endDaysAgo = new DateTime($start);
            }
            $endDate = $endDaysAgo->sub(new DateInterval('P' . $duration . 'M'));
        }
        return [
            'start' => $startDate,
            'end' => $endDate
        ];
    }
}