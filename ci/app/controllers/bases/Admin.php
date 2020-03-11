<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Controller_Base__Admin extends Controller_Base__Page
{
    function __construct()
    {
        parent::__construct();
        $this->dx_auth->check_uri_permissions();
        $this->_is_indexable(false);
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
        $user = $this->get_user();
        if ($user->is_admin_in_spoofmode())
        {
            redirect($this->data['country_lang_url'] . '/info/admin_deny');
        }
        elseif ($user->is_admin())
        {
            $this->_set_display_type(self::ADMIN_PAGE);
            $this->_suppress_footer();
            $this->_add_css('<link href="' . auto_version('administrator.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $this->_add_css('<link href="' . auto_version('dashboard/dashboard-content.css') . '" media="screen" rel="stylesheet" type="text/css" />');
            $this->add_phone_plugin_files();
            if ($this->_tracking_helper->tracking_is_enabled())
            {
                $this->_add_js(manifest_item('administrator.js'));
            }
            $this->add_datepicker_files();
            $this->data['reserved_full_dimension_modal'] = true;
        }
    }

    public function admin_csv_from_query($name, $results)
    {
        if ($results != null)
        {
            for ($i = 0; $i < mysql_num_fields($results->result_id); ++$i)
            {
                $head[] = mysql_field_name($results->result_id, $i);
            }
            $fp = fopen('php://output', 'w');
            if ($fp)
            {
                header('Content-Type: text/csv');
                header('Content-Disposition: attachment; filename="' . $name . '.csv"');
                header('Pragma: no-cache');
                header('Expires: 0');
                fputcsv($fp, array_values($head));
                while ($row = mysql_fetch_row($results->result_id))
                {
                    fputcsv($fp, array_values($row));
                }
                die;
            }
        }
    }

    public function admin_csv_from_array($name, $head, $results)
    {
        if ($results != null)
        {
            $fp = fopen('php://output', 'w');
            if ($fp)
            {
                header('Content-Type: text/csv');
                header('Content-Disposition: attachment; filename="' . $name . '.csv"');
                header('Pragma: no-cache');
                header('Expires: 0');
                fputcsv($fp, array_values($head));
                foreach ($results as $result)
                {
                    fputcsv($fp, $result);
                }
                die;
            }
        }
    }

    protected function _add_user_token()
    {
        $user = $this->get_user();
        $user_id = (($user)?$user->get_id():null);
        $token = get_bearer_token($user_id, $this->dx_auth->is_spoof_mode());
        if ($token != '')
        {
            $this->_add_js_variable('zc_token', $token);
        }
    }
}