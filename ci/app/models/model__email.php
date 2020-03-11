<?php

use Aws\Ses\SesClient;
/**
 * Zipcube Email_model Class
 *
 * Email settings information in database.
 *
 * @package		Zipcube
 * @subpackage	Models
 * @category	Settings
 * @author		Zipcube Product Team
 * @version		Version 1.5
 * @link		www.zipcube.com
 */

class Model__email extends MY_Model
{
    function __construct()
    {
        parent::__construct();
        $this->load->helper('email_helper');
    }

    /**
     * Get Email settings from database
     *
     * @access	private
     * @param	nil
     * @return	array	payment settings information in array format
     */
    private function getEmailSettings($conditions = [])
    {
        if (count($conditions) > 0)
        {
            $this->db->where($conditions);
        }
        $this->db->from('email_templates');
        $this->db->select('email_templates.id,email_templates.type,email_templates.title,email_templates.mail_subject,email_templates.email_body_text,email_templates.email_body_html');
        $this->db->where('email_templates.enabled', 1);
        $result = $this->db->get();
        return $result;
    }

    public function sendAdminMail($subject, $email_name, $splvars, $view = '', $action = '', $user = '')
    {
        $modelUsers = Model__users::class;
        $this->load->model($modelUsers);
        $admin_email = $this->dx_auth->get_site_sadmin();
        $admin_user = $this->$modelUsers->get_user_by_email($admin_email);
        $splvars["{user_country_lang}"] = 'uk';
        $this->sendMail($admin_user, $subject, $email_name, $splvars, '', '', $view, $action, $user);
    }

    /**
    * Send Mail
    *
    * @access	private
    * @param	array
    * @return	array	site settings information in array format
    */
    public function sendMail($to_user = '', $subject = '', $email_name = '', $splvars = [], $cc = '', $bcc = '', $view = '', $action = '', $user = '', $from_user = [], $type = 'html')
    {
        $to = $to_user->get('email');
        if (defined('ENVIRONMENT') && ENVIRONMENT == 'development')
        {
            $to = 'dev@zipcube.com';
        }
        else
        {
            $bcc = 'audit@zipcube.com';
        }
        $from['user'] = 'Zipcube';
        $from['email'] = 'info@zipcube.com';
        if (count($from_user) > 0 && is_email_zipcube($from_user->get('email')))
        {
            $from['user'] = ucfirst($from_user->get('first_name')) . ' - Zipcube';
            $from['email'] = $from_user->get('email');
        }
        $this->load->library('awslib');
        if ($view == '')
        {
            $view = $email_name;
        }
        if (isset($this->lang->is_loaded))
        {
            if (in_array('email_lang.php', $this->lang->is_loaded))
            {
                $key = array_search('email_lang.php', $this->lang->is_loaded);
                unset($this->lang->is_loaded[$key]);
            }
            if (in_array('common_lang.php', $this->lang->is_loaded))
            {
                $key = array_search('common_lang.php', $this->lang->is_loaded);
                unset($this->lang->is_loaded[$key]);
            }
        }
        $this->lang->load('email', $to_user->get('language_pref'));
        $this->lang->load('common', $to_user->get('language_pref'));
        $message = '';
        $translated_subject = $this->lang->line($subject);
        if ($email_name != '')
        {
            switch ($type)
            {
                case 'text':

                    $result = $this->getEmailSettings(['email_templates.type' => $email_name]);
                    if ($result->num_rows() == 1)
                    {
                        $rowUserMailConent = $result->row();
                        $config['mailtype'] = 'text';
                        $message = strtr($rowUserMailConent->email_body_text, $splvars);
                    }
                break;

                case 'html_non_brand':

                    $config['mailtype'] = 'html';
                    $params = $this->_html_email($view, $translated_subject, $action, $user);
                    $message = strtr($this->load->view(EMAIL_FOLDER . '/emailWrapper_non_brand', $params, true), $splvars);
                break;

                default:

                    $config['mailtype'] = 'html';
                    $params = $this->_html_email($view, $translated_subject, $action, $user);
                    $message = strtr($this->load->view(EMAIL_FOLDER . '/emailWrapper', $params, true), $splvars);
                break;
            }
        }
        $config['wordwrap'] = TRUE;
        $client = SesClient::factory([
            'key' => $this->config->item('aws_key_id'),
            'secret' => $this->config->item('aws_secret_access_key'),
            'region' => $this->config->item('aws_region')
        ]);
        if ($message != '')
        {
            try
            {
                $mailArray = [
                    'Source' => $from['user'] . ' <' . $from['email'] . '>',
                    'Destination' => ['ToAddresses' => [$to]],
                    'Message' => [
                        'Subject' => ['Data' => strtr($translated_subject, $splvars)],
                        'Body' => ['Html' => ['Data' => $message]]
                    ]
                ];
                if (!empty($cc))
                {
                    $mailArray['Destination']['CcAddresses'] = [$cc];
                }
                if ($bcc !== '')
                {
                    $mailArray['Destination']['BccAddresses'] = [$bcc];
                }
                $client->sendEmail($mailArray);
            }
            catch (Exception $e)
            {
                error_log("Unable to send email: " . $e->getMessage());
            }
        }
    }

    private function _html_email($view, $translated_subject, $action, $user)
    {
        $params = [
            'view' => $view,
            'lang' => $this->lang,
            'view_param' => NULL,
            'analytics_str' => '?source=zipcube&medium=email&type=sys&detail=' . $translated_subject
        ];
        if ($action != '')
        {
            $params['view_param']['action'] = $action;
        }
        if ($user != '')
        {
            $params['view_param']['user'] = $user;
        }
        return $params;
    }
}