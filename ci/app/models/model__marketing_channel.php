<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Zipcube Search Audit Class
 *
 * Handle search query information in database
 *
 * @package		Zipcube
 * @subpackage          Models
 * @category            Data
 * @author		Will
 * @version		Version 2.0
 * @link		www.zipcube.com
 */

class Model__marketing_channel extends Model_Base__Object 
{
    function __construct() 
    {
        $this->_set_base_class(Marketing_Channel::class);
        parent::__construct();
    }
}