<?php
/**
 * Zipcube Common_model Class
 *
 * helps to achieve common tasks related to the site like flash messages.
 *
 * @package	Zipcube
 * @subpackage	Models
 * @category	Common_model
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com

 */
class Common_model extends MY_Model
{

    function __construct()
    {
        parent::__construct();
    }

    /**
     * Set Style for the flash messages
     *
     * @access	public
     * @param	string	the type of the flash message
     * @param	string  flash message
     * @return	string	flash message with proper style
     */
    function flash_message($type, $message)
    {
        switch($type)
        {
            case 'success':

                $data = '<div class="alert alert-success flash_message" role="alert">' . $message . '</div>';
            break;

            case 'error':

                $data = '<div class="alert alert-danger flash_message" role="alert">' . $message . '</div>';
            break;

            default:
                $data = '<div class="alert alert-info flash_message" role="alert">Code error - please report to <a href="mailto:webmaster@zipcube.com">webmaster@zipcube.com</a></div>';
            break;
        }
        return $data;
    }
}