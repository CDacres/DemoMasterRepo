<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Link extends Base__Wrangler
{
    public function _yield_wrangled_data()
    {
        yield null => null;
    }

    public function get_website_html($useIcon = true, $classname = '')
    {
        $retStr = '';
        if (!$this->is_null('website') && $this->data_not_empty('website'))
        {
            $retStr = '<a href="' . prep_url($this->get('website')) . '" target="_blank"' . (($classname != '')?' class="' . $classname . '"':'') . '>' . (($useIcon)?$this->_website_icon():$this->get('website')) . '</a>';
        }
        return $retStr;
    }

    public function get_phone_html($classname = null)
    {
        $retStr = '';
        if (!$this->is_null('phone') && $this->data_not_empty('phone'))
        {
            $class_string = '';
            $hubspot_modal_meta = '';
            if (!$this->is_null('hubspot_id') && $this->data_not_empty('hubspot_id'))
            {
                $class_string = $this->_merge_hubspot_classname($classname);
                $hubspot_modal_meta = $this->_hubspot_interaction_modal_initiation_code($this->get('hubspot_id'), "activity");
            }
            $retStr = '<a' . $this->_spaced_string_or_empty($class_string, "class") . $this->_spaced_string_or_empty($hubspot_modal_meta) . ' href="tel:' . $this->get('phone') . '">' . $this->get('phone') . '</a>';
        }
        return $retStr;
    }

    public function get_email_html($classname = null, $hasFlex = true)
    {
        $retStr = '';
        if (!$this->is_null('email') && $this->data_not_empty('email'))
        {
            $element = 'span';
            $class_string = '';
            $emailWarning = '';
            $hubspot_modal_meta = '';
            $requires_tab = false;
            if (!$this->is_null('hubspot_id') && $this->data_not_empty('hubspot_id') && shouldSendEmailToAddress($this->get('email_status')))
            {
                $element = 'a';
                $class_string = $this->_merge_hubspot_classname($classname);
                $hubspot_modal_meta = $this->_hubspot_interaction_modal_initiation_code($this->get('hubspot_id'), "email");
                $requires_tab = true;
            }
            else
            {
                $emailWarning = '<a class="zc_email_status pointer" data-status="' . $this->get('email_status') . '" data-toggle="modal" data-target="#mainModal"><span class="danger-text dangerIcon"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 286.054 286.054" style="enable-background:new 0 0 286.054 286.054;" xml:space="preserve"><g>
                    <path style="fill:#E2574C;" d="M143.027,0C64.04,0,0,64.04,0,143.027c0,78.996,64.04,143.027,143.027,143.027
                    c78.996,0,143.027-64.022,143.027-143.027C286.054,64.04,222.022,0,143.027,0z M143.027,259.236
                    c-64.183,0-116.209-52.026-116.209-116.209S78.844,26.818,143.027,26.818s116.209,52.026,116.209,116.209
                    S207.21,259.236,143.027,259.236z M143.036,62.726c-10.244,0-17.995,5.346-17.995,13.981v79.201c0,8.644,7.75,13.972,17.995,13.972
                    c9.994,0,17.995-5.551,17.995-13.972V76.707C161.03,68.277,153.03,62.726,143.036,62.726z M143.036,187.723
                    c-9.842,0-17.852,8.01-17.852,17.86c0,9.833,8.01,17.843,17.852,17.843s17.843-8.01,17.843-17.843
                    C160.878,195.732,152.878,187.723,143.036,187.723z" /></svg></span></a>';
            }
            if ($hasFlex)
            {
                $retStr .= '<div class="emailFlex">';
            }
            $retStr .= $emailWarning . '<' . $element . $this->_spaced_string_or_empty($class_string, "class") . $this->_spaced_string_or_empty($hubspot_modal_meta) . '>' . $this->get('email') . '</' . $element . '>';
            if ($requires_tab)
            {
                $retStr .= ' ' . $this->_hubspot_tab($this->get('hubspot_id'), "email");
            }
            if ($hasFlex)
            {
                $retStr .= '</div>';
            }
        }
        return $retStr;
    }

    public function get_add_task_html($classname = null)
    {
        $retStr = '';
        if (!$this->is_null('hubspot_id') && $this->data_not_empty('hubspot_id'))
        {
            $hubspot_modal_meta = $this->_hubspot_interaction_modal_initiation_code($this->get('hubspot_id'), "task");
            $merged_classname = $this->_merge_hubspot_classname($classname);
            $retStr = '<a' . $this->_spaced_string_or_empty($merged_classname, "class") . $this->_spaced_string_or_empty($hubspot_modal_meta) . '>Task</a>';
        }
        return $retStr;
    }

    private function _merge_hubspot_classname($classname)
    {
        $added_class = "hubspot_contact";
        return (($classname === null)?$added_class:$classname . ' ' . $added_class);
    }

    private function _hubspot_tab($hubspot_id, $type)
    {
        return ' <a class="taskIcon" ' . $this->_spaced_string_or_empty('href="https://app.hubspot.com/sales/' . config_item('hubspot_portal_id') . '/contact/' . $hubspot_id . '?interaction=' . $type . '" target="_blank"') . '>' . $this->_new_tab_icon() . '</a>';
    }

    private function _hubspot_interaction_modal_initiation_code($hubspot_id, $type)
    {
        return 'data-toggle="modal" data-target="#full_modal" data-hubspot-id="' . $hubspot_id . '" data-hubspot-interaction="' . $type . '"';
    }

    private function _spaced_string_or_empty($string, $label = null)
    {
        $ret_string = (($label === null)?$string:(($string === null || $string === '')?'':$label . '="' . $string . '"'));
        return (($ret_string !== null && $ret_string !== '')?' ' . $ret_string:'');
    }

    private function _website_icon()
    {
        return '<svg aria-hidden="true" class="website_icon" focusable="false" role="img" viewBox="0 0 24 24"><path d="m12 0c-6.63 0-12 5.37-12 12s5.37 12 12 12 12-5.37 12-12-5.37-12-12-12zm-4.19 14.05c.52.45.58 1.24.14 1.76-.25.29-.6.44-.95.44-.29 0-.58-.1-.81-.3l-3.5-3c-.28-.24-.44-.58-.44-.95s.16-.71.44-.95l3.5-3c .52-.45 1.31-.39 1.76.14.45.52.39 1.31-.14 1.76l-2.39 2.05zm6.88-6.69-3 10c-.16.54-.66.89-1.2.89-.12 0-.24-.02-.36-.05-.66-.2-1.04-.9-.84-1.56l3-10c .2-.66.9-1.04 1.56-.84s1.04.9.84 1.56zm3.12 8.59c-.52.45-1.31.39-1.76-.14s-.39-1.31.14-1.76l2.39-2.05-2.39-2.05c-.52-.45-.58-1.24-.14-1.76s1.24-.58 1.76-.14l3.5 3c .58.5.58 1.4 0 1.9z" fill-rule="evenodd"></path></svg>';
    }

    private function _new_tab_icon()
    {
        return '<img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxwYXRoIGQ9Ik0yNy41MzUsNEgxOC41bC0yLjYyOCwzLjUwNEwxMy41MzUsNGgtOS4wN0wwLDEwLjY5N1YyOGgzMlYxMEwyNy41MzUsNHogTTMwLDI2SDJWMTEuMzAyTDUuNTM1LDYgICBoNi45M2w0LDZIMzBWMjZ6IiBmaWxsPSIjNjRkY2ZmIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" />';
    }
}