<?php

namespace App\Helpers;

class UrlHelper
{
    public function search_url_decode($str)
    {
        return urldecode(str_replace(['--', '-', '~'], [', ', ' ', '-'], trim($str)));
    }

    public function search_url_encode($str)
    {
        return str_replace(['-', ', ', ' ', '/ ', '/', ' /', '(', ')'], ['~', '--', '-'], trim($str));
    }

    public function seo_url($str)
    {
        return urlencode(mb_strtolower(str_replace([',', ' ', '_', '/ ', '/', ' /', '(', ')', ':', '%', '..', '\\'], ['-', '-', '-'], trim($str)), 'UTF-8'));
    }
}