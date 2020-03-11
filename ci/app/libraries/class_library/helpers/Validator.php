<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Helper__Validator
{
    private $_lastError = null;
    private $_offendingValue = null;
    private $_performXSS = true;
    private $_errorOccurred = false;

    function validate($value, $validationsString = '')
    {
        $validationArray = [];
        if ($validationsString != '')
        {
            $validationArray = explode("|", $validationsString);
        }
        return $this->_validate($value, $validationArray);
    }

    public function direct_validate($value, $validationsString = '')
    {
        $retval = $this->validate($value, $validationsString);
        if ($this->error_occurred())
        {
            throw new Exception("Error. It " . $this->get_error_string());
        }
        return $retval;
    }

    private function _validate($value, $validationArray)
    {
        $this->_reset();
        if (is_array($value))
        {
            foreach ($value as $key => $item)
            {
                $value[$key] = $this->_validate($item, $validationArray);
                if ($this->error_occurred())
                {
                    break;
                }
            }
        }
        else
        {
            $value = $this->_validate_item($value, $validationArray);
        }
        return $value;
    }

    private function _value_hacker($value, $validationArray)
    {
        if (in_array('is_boolean',$validationArray))
        {
            if ($value === "true" || $value == "1")
            {
                $value = true;
            }
            elseif ($value === "false" || $value == "0")
            {
                $value = false;
            }
        }
        return $value;
    }

    private function _validate_item($value, $validationArray)
    {
        if ($value !== null && $value !== '')
        {
            $value = $this->_value_hacker($value, $validationArray); //This is to handle post and get coming as strings
            $value = $this->_validate_non_null($value, $validationArray);
        }
        elseif (in_array('required', $validationArray))
        {
            $this->_set_error('is required');
        }
        elseif (in_array('empty_null', $validationArray))
        {
            $value = null;
        }
        return $value;
    }

    private function _validate_non_null($value, $validationArray)
    {
        foreach ($validationArray as $callBack)
        {
            $param = null;
            if (preg_match("/(.*?)\[(.*)\]/", $callBack, $match))
            {
                $callBack = $match[1];
                $param = $match[2];
            }
            $retVal = $this->$callBack($value, $param);
            if ($retVal === false)
            {
                $this->_set_offending_value($value);
                break;
            }
            elseif ($retVal !== true)
            {
                $value = $retVal;
            }
        }
        if ($this->_perform_xss())
        {
            $value = $this->_filter_xss($value);
            $value = $this->_filter_img_tags($value);
        }
        return $value;
    }

    private function _set_offending_value($value)
    {
        $this->_offendingValue = $value;
    }

    public function less_than($str, $max)
    {
        return $this->_less_than($str, $max);
    }

    public function less_than_equal($str, $max)
    {
        return $this->_less_than($str, $max, true);
    }

    private function _less_than($str, $max, $allowequal = false)
    {
        $this->_suppress_XSS();
        $number = str_replace(",", "", $str);
        if (!is_numeric($number))
        {
            $retVal = false;
        }
        else
        {
            if ($allowequal)
            {
                $retVal = $number <= $max;
            }
            else
            {
                $retVal = $number < $max;
            }
        }
        if ($retVal === true)
        {
            $retVal = (float)$number;
        }
        return $this->_handle_result($retVal, 'must be less than ' . (($allowequal)?'or equal to ':'') . $max);
    }

    public function more_than($str, $max)
    {
        return $this->_more_than($str, $max);
    }

    public function more_than_equal($str, $max)
    {
        return $this->_more_than($str, $max, true);
    }

    function _more_than($str, $min, $allowequal = false)
    {
        $this->_suppress_XSS();
        $number = str_replace(",", "", $str);
        if (!is_numeric($number))
        {
            $retVal = false;
        }
        else
        {
            if ($allowequal)
            {
                $retVal = $number >= $min;
            }
            else
            {
                $retVal = $number > $min;
            }
        }
        if ($retVal === true)
        {
            $retVal = (float)$number;
        }
        return $this->_handle_result($retVal, 'must be more than ' . (($allowequal)?'or equal to ':'') . $min);
    }

    function required($str)
    {
        if (!is_array($str))
        {
            $retVal = ((trim($str) == '')?false:true);
        }
        else
        {
            $retVal = (!empty($str));
        }
        return $this->_handle_result($retVal, 'is a required field');
    }

    function empty_null($str)
    {
        return $this->_handle_result(true, '');
    }

    function is_object($object)
    {
        $this->_suppress_XSS();
        return is_object($object);
    }

    function is_natural($str)
    {
        $this->_suppress_XSS();
        $retVal = (bool)preg_match( '/^[0-9]+$/', $str);
        if ($retVal === true)
        {
            $retVal = (int)$str;
        }
        return $this->_handle_result($retVal, 'must be a positive whole number');
    }

    function is_natural_no_zero($str)
    {
        $this->_suppress_XSS();
        $retVal = true;
        if (!preg_match('/^[0-9]+$/', $str))
        {
            $retVal = false;
        }
        if ($str == 0)
        {
            $retVal = false;
        }
        if ($retVal === true)
        {
            $retVal = (int)$str;
        }
        return $this->_handle_result($retVal, 'must be a positive whole number not zero');
    }

    function integer($str)
    {
        $this->_suppress_XSS();
        $retVal = (bool)preg_match('/^[\-+]?[0-9]+$/', $str);
        if ($retVal === true)
        {
            $retVal = (int)$str;
        }
        return $this->_handle_result($retVal, 'must be a whole number');
    }

    function is_numeric($value)
    {
        $this->_suppress_XSS();
        $number = (float)str_replace(",", "", $value);
        $retVal = is_numeric($number);
        if ($retVal === true)
        {
            $retVal = $number;
        }
        return $this->_handle_result($retVal, 'must be a number');
    }

    function is_numeric_positive($value)
    {
        $this->_suppress_XSS();
        $number = (float)str_replace(",", "", $value);
        $retVal = is_numeric($number) && $number >= 0;
        if ($retVal === true)
        {
            $retVal = $number;
        }
        return $this->_handle_result($retVal, 'must be a positive number');
    }

    function is_boolean($bool)
    {
        $this->_suppress_XSS();
        $retVal = is_bool($bool);
        return $this->_handle_result($retVal, 'must be true or false');
    }

    function is_date($str)
    {
        $this->_suppress_XSS();
        $retVal = date("Y-m-d", strtotime($str)) == $str;
        return $this->_handle_result($retVal, 'must be a date in Y-m-d format');
    }

    function is_time($str)
    {
        $this->_suppress_XSS();
        $retVal = date("H:i:s", strtotime($str)) == $str;
        return $this->_handle_result($retVal, 'must be a time in H:i:s format');
    }

    function is_email($str)
    {
        $this->_suppress_XSS();
        $retVal = filter_var(strtolower($str), FILTER_VALIDATE_EMAIL);
        return $this->_handle_result($retVal, 'must be a valid email');
    }

    function is_phone_number($str)
    {
        //$this->_suppress_XSS();
        //$retVal = (!preg_match("/^\+(?:[0-9\-] ?){6,14}[0-9\-]$/",$str))?false:strtolower($str);
        //return $this->_handle_result($retVal, 'must be a valid phone number');
        return true;
    }

    function is_date_time($str)
    {
        $this->_suppress_XSS();
        $retVal = date("Y-m-d H:i:s", strtotime($str)) == $str;
        return $this->_handle_result($retVal, 'must be a datetime in Y-m-d H:i:s format');
    }

    function alpha_numeric($str)
    {
        $this->_suppress_XSS();
        $retVal = (!preg_match("/^([a-z0-9 ])+$/i",$str))?false:true;
        return $this->_handle_result($retVal, 'must be an alpha-numeric string');
    }

    function alpha_dash($str)
    {
        $this->_suppress_XSS();
        $retVal = (!preg_match("/^([-a-z0-9_ -])+$/i",$str))?false:true;
        return $this->_handle_result($retVal, 'must be an alphabetical string (or - or _)');
    }

    function alpha_dash_dot($str)
    {
        $this->_suppress_XSS();
        $retVal = (!preg_match('/^([\.-a-z0-9_-])+$/i',$str))?false:true;
        return $this->_handle_result($retVal, 'must be an alphabetical string (or - or _)');
    }

    function alpha($str)
    {
        $this->_suppress_XSS();
        $retVal = (!preg_match("/^([a-z ])+$/i", $str))?false:true;
        return $this->_handle_result($retVal, 'must be an alphabetical string');
    }

    function valid_ip($ip)
    {
        if (defined('ENVIRONMENT') && ENVIRONMENT=='development')
        {
            return true;
        }
        else
        {
            $_ci = &get_instance();
            $retVal = $_ci->input->valid_ip($ip);
            return $this->_handle_result($retVal, 'must be a vald ip address');
        }
    }

    function get_error_string()
    {
        return $this->_lastError . ". '" . $this->_offendingValue . "' given.";
    }

    function error_occurred()
    {
        return $this->_errorOccurred;
    }

    private function _suppress_XSS()
    {
        $this->_performXSS = false;
    }

    private function _handle_result($value, $errorString)
    {
        if ($value === false)
        {
            $this->_set_error($errorString);
        }
        return $value;
    }

    private function _set_error($string)
    {
        $this->_errorOccurred = true;
        $this->_lastError = $string;
    }

    private function _perform_xss()
    {
        return !$this->_errorOccurred && $this->_performXSS;
    }

    private function _reset()
    {
        $this->_errorOccurred = false;
        $this->_performXSS = true;
    }

    function db_safe($value)
    {
        $_ci = &get_instance();
	return $_ci->db->escape($value);
    }

    function db_safe_for_like($value)
    {
        $_ci = &get_instance();
	return $_ci->db->escape_like_str($value);
    }

    private function _filter_xss($str)
    {
        $_ci = &get_instance();
	return $_ci->security->xss_clean($str);
    }

    private function _filter_img_tags($str)
    {
        $_ci = &get_instance();
        $_ci->load->helper('security');
        return strip_image_tags($str);
    }
}