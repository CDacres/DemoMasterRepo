<?php
/**
 * Zipcube Info Controller Class
 *
 * @package		Info
 * @subpackage	Controllers
 * @category	Info
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com

 */

if (!defined('BASEPATH')) exit('No direct script access allowed');

class Info extends Controller_Base__Public
{
    function __construct()
    {
        parent::__construct();
        if ($this->get_display_type() == Controller_Base__Page::MOBILE)
        {
            redirect('/' . $this->data['country_lang_url']);
        }
    }

    public function index()
    {
        $url = '/info';
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($url);
        $this->data['message_element'] = 'errors/view_deny';
        $this->_render();
    }

    public function deny()
    {
        $url = '/info/deny';
        $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
        $this->data['alternate_url'] = $this->_get_alternate_urls($url);
        $this->data['message_element'] = 'errors/view_deny';
        $this->_render();
    }

    public function admin_deny()
    {
        if (!$this->user_is_admin())
        {
            redirect($this->data['country_lang_url'] . '/info/deny');
        }
        else
        {
            $url = '/info/admin_deny';
            $this->data['reserved_canonical'] = base_url() . $this->data['country_lang_url'] . $url;
            $this->data['alternate_url'] = $this->_get_alternate_urls($url);
            $this->data['message_element'] = 'errors/view_admin_deny';
            $this->_render();
        }
    }
}