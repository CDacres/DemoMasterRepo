<?php
/**
 * Zipcube Gadcons Model Class
 *
 * Deals with various google analytics and adwords related data
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Gadcons
 * @author		Zipcube Product Team
 * @version		Version 1.6
 * @link		www.zipcube.com
 */

class Gadcons extends CI_Model
{
    function __construct()
    {
        parent::__construct();
    }

    /*
     * Insert a new conversion into the gadcons table
     *
     * @access  public
     * @param   string      the conversion type (required)
     * @param   decimal     the value of the conversion (optional - defaults to 0)
     * @param   string      the three letter currency code (optional - defaults to GBP)
     * @param   string      the gclid as sent from google adwords (optional - defaults to session value. That doesn't work in callback, so must be entered manually.)
     * @return  void
     */
    function insert_conversion($conversion_type, $value = 0, $curr_code = 'GBP', $gclid = false)
    {
        if ($gclid === false)
        {
            $gclid = $this->session->userdata('gclid');
        }
        if ($gclid !== false)
        {
            $go = false;
            switch ($conversion_type)
            {
                case 'payment':
                    $go = true;
                break;

                case 'signup':
                    $go = true;
                break;

                default:
                    $go = false;
                break;
            }
            if ($go)
            {
                $insertData = [
                    'gclid' => $gclid,
                    'conversion_name' => $conversion_type,
                    'value' => $value,
                    'curr_code' => $curr_code
                ];
                $this->db->insert('gadcons', $insertData);
            }
        }
    }

    /*
     * Insert a new ecommerce transaction into google analytics
     *
     * @access  public
     * @param   int          the google analytics ID
     * @param   int          the reservation id
     * @param   decimal      the commission amount
     * @param   string       the commission currency identifier
     * @param   int         the listing id
     * @param   string      the listing name
     * @param   string      the listing address
     * @param   string      the meeting type
     *
     * @return  void
     */

    function register_ecommerce($ga_id, $reservation_id, $commission, $commission_currency, $list_id, $list_name, $list_address, $meeting_type = null)
    {
        if (defined('ENVIRONMENT') && ENVIRONMENT == 'development')
        {
            $ga_code = 'UA-55785707-1';
            $domain = 'dev.zipcube.com';
        }
        else
        {
            $ga_code = 'UA-46012545-1';
            $domain = 'www.zipcube.com';
        }
        $curlData = [
            'v' => '1',
            'tid' => $ga_code,
            'cid' => $ga_id,
            't' => 'pageview',
            'dh' => $domain,
            'dp' => '/payments/payment_authorised',
            'dt' => 'Payment Authorised',
            'ti' => $reservation_id,
            'tr' => $commission,
            'cu' => $commission_currency,
            'pa' => 'purchase',
            'pr1id' => $list_id,
            'pr1nm' => $list_name,
            'pr1br' => $list_address,
            'pr1ca' => $meeting_type,
            'pr1pr' => $commission,
            'pr1qt' => '1',
            'pa' => 'purchase'
        ];
        $getString = 'http://www.google-analytics.com/collect?' . http_build_query($curlData);
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $getString);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_exec($ch);
        $info = curl_getinfo($ch);
        curl_close($ch);
        log_message('debug', ' -> payment -> ' . print_r($info, true));
    }
}