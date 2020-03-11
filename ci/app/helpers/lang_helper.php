<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

function get_lang_json($langArr)
{
    $lang = [];
    array_push($langArr, 'common');
    foreach ($langArr as $page)
    {
        $lang[$page] = json_decode(file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/lang/' . config_item('language_code') . '/' . $page . '_lang.json'));
    }
    return $lang;
}
