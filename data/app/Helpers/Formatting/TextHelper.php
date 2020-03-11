<?php

namespace App\Helpers\Formatting;

class TextHelper
{
    private $_bad_chars = [
        '\u2028',
        '\u2029'
    ];

    public function text_replace($string)
    {
        return str_replace($this->_bad_chars, '', $string);
    }
}