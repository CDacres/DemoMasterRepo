<?php

namespace App\Helpers\Formatting;

use DateTime;

use App\Helpers\Formatting\DateTime\de_DE;
use App\Helpers\Formatting\DateTime\en_GB;
use App\Helpers\Formatting\DateTime\en_IE;
use App\Helpers\Formatting\DateTime\en_US;
use App\Helpers\Formatting\DateTime\fr_FR;

class DateTimeHelper
{
    public $date; //(Y-m-d)
    public $time; //(minutes)
    public $datetime; //(Y-m-d H:i:s)
    public $locale = '';

    public function set_locale($locale)
    {
        $this->locale = $locale;
    }

    public function formatted($type = 'generic')
    {
        if ($this->locale == '')
        {
            //make sure correct locale exists on server
            $this->locale = 'en_GB';
        }
        setlocale(LC_TIME, $this->locale, $this->locale . '.utf8', $this->locale . '.UTF-8');
        if (isset($this->datetime))
        {
            $fullDateTime = new DateTime($this->datetime);
            $this->date = $fullDateTime->format("Y-m-d");
            $this->time = ($fullDateTime->format("G") * 60) + ($fullDateTime->format("i"));
        }
        $dateTime = new DateTime((isset($this->date))?$this->date:'');
        if (isset($this->time))
        {
            $dateTime->setTime(0, $this->time, 0);
        }
        switch ($this->locale)
        {
            case 'de_DE':
                $locale = new de_DE;
            break;

            case 'en_GB':
                $locale = new en_GB;
            break;

            case 'en_IE':
                $locale = new en_IE;
            break;

            case 'en_US':
                $locale = new en_US;
            break;

            case 'fr_FR':
                $locale = new fr_FR;
            break;
        }
        return $locale->format($type, $dateTime);
    }
}