<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Backend extends Controller_Base__Admin
{
    public function index()
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $this->$modelUsers->get_all_users(true);
        $this->data['daily_users'] = $this->db->get_row_count();
        $modelVenues = Model__venues::class;
        $this->load->model($modelVenues);
        $this->$modelVenues->get_all_venues(true);
        $this->data['daily_venues'] = $this->db->get_row_count();
        $modelRooms = Model__simple_rooms::class;
        $this->load->model($modelRooms);
        $this->$modelRooms->get_all_rooms(true);
        $this->data['daily_rooms'] = $this->db->get_row_count();
        $this->_daily_totals();
        $this->_add_js(auto_version('administrator/home.js'));
        $this->data['message_element'] = 'administrator/home/view_home';
        $this->_render();
    }

    public function update_daily_tables()
    {
        try
        {
            $start = $this->input->post('start', 'is_date');
            $duration = $this->input->post('duration', 'is_natural');
            $this->_daily_totals($start, $duration);
            $reservations = new Base__Null();
            echo $reservations->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/home/view_performance', ['period' => $this->data['period'], 'daily_totals' => $this->data['daily_totals'], 'daily_performance' => $this->data['daily_performance'], 'daily_switch' => $this->data['daily_switch']], true)]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    private function _daily_totals($start = '', $duration = '')
    {
        if ($start === '')
        {
            $startDay = new DateTime();
            $startDate = $startDay->add(new DateInterval('P1D'));
        }
        else
        {
            $startDay = new DateTime($start);
            $startDate = $startDay->add(new DateInterval('P1D'));
        }
        if ($duration === '')
        {
            $endDaysAgo = new DateTime();
            $endDate = $endDaysAgo->sub(new DateInterval('P14D'));
        }
        elseif ($duration === 0)
        {
            $endDate = new DateTime('2014-03-05'); //first reservation date
        }
        else
        {
            $endDaysAgo = new DateTime($start);
            $endDate = $endDaysAgo->sub(new DateInterval('P' . $duration . 'D'));
        }
        $this->data['period'] = iterator_to_array(new DatePeriod($endDate, new DateInterval('P1D'), $startDate));
        $modelStats = Model__stats::class;
        $this->load->model($modelStats);
        $reservations = $this->$modelStats->get_all_reservations($startDate, $endDate);
        $retArr = [];
        foreach ($reservations as $dayKey => $res)
        {
            if ($dayKey != 'sources')
            {
                ((isset($res['number']))?$retArr['res_number'][$dayKey] = $res['number']:'');
                ((isset($res['price']))?$retArr['price'][$dayKey] = $res['price']:'');
                ((isset($res['revenue']))?$retArr['revenue'][$dayKey] = $res['revenue']:'');
                ((isset($res['source']))?$retArr['source'][$dayKey] = $res['source']:'');
                ((isset($res['accept_number']))?$retArr['accept_res_number'][$dayKey] = $res['accept_number']:'');
                ((isset($res['accept_revenue']))?$retArr['accept_res_revenue'][$dayKey] = $res['accept_revenue']:'');
                ((isset($res['accept_extra_fee']))?$retArr['accept_res_extra_fee'][$dayKey] = $res['accept_extra_fee']:'');
                ((isset($res['accept_flexible_fee']))?$retArr['accept_res_flexible_fee'][$dayKey] = $res['accept_flexible_fee']:'');
                ((isset($res['accept_price_control_fee']))?$retArr['accept_res_price_control_fee'][$dayKey] = $res['accept_price_control_fee']:'');
                ((isset($res['switch_number']))?$retArr['switch_number'][$dayKey] = $res['switch_number']:'');
                ((isset($res['switchcom_number']))?$retArr['switchcom_number'][$dayKey] = $res['switchcom_number']:'');
                ((isset($res['closed_rev']))?$retArr['closed_rev'][$dayKey] = $res['closed_rev']:'');
            }
            else
            {
                $retArr['sources'] = $res;
            }
        }
        $enquiries = $this->$modelStats->get_all_enquiries($startDate, $endDate);
        foreach ($enquiries->result() as $enq)
        {
            $retArr['enq_number'][$enq->date_created] = $enq->number;
        }
        $this->data['daily_totals'] = $retArr;
        $this->data['daily_performance'] = $this->$modelStats->get_reservation_performance($startDate, $endDate);
        $this->data['daily_switch'] = $this->$modelStats->get_reservation_switch_amounts($startDate, $endDate);
    }
}