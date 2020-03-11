<?php

namespace App\Helpers\Formatting\DateTime;

class en_IE
{
    public function format($type, $dateTime)
    {
        switch ($type)
        {
            case 'admin_full':

                $retString = strftime("%e %b %Y %k:%M (%a)", $dateTime->getTimestamp());
            break;

            case 'admin_full_date':

                $retString = strftime("%e %b %Y (%a)", $dateTime->getTimestamp());
            break;

            case 'admin_ref_date':

                $retString = $dateTime->format("dm");
            break;

            case 'inbox':

                $retString = strftime("%d %B, %Y", $dateTime->getTimestamp());
            break;

            case 'inboxtime':

                $retString = $dateTime->format("H:i:s");
            break;

            case 'checkout':

                $retString = strftime("%e %B", $dateTime->getTimestamp());
            break;

            case 'checkoutday':

                $retString = strftime("%A", $dateTime->getTimestamp());
            break;

            case 'time':
            case 'checkouttime':

                $retString = $dateTime->format("H:i");
            break;

            case 'date':

                $retString = $dateTime->format("d/m/Y");
            break;

            case 'checkoutfull':

                $retString = strftime("%e %B %H:%M", $dateTime->getTimestamp());
            break;

            case 'expiry':

                $retString = strftime("%B %d, %Y, %k:%M", $dateTime->getTimestamp());
            break;

            case 'venue_payment':

                $retString = strftime("%b %d, %Y", $dateTime->getTimestamp());
            break;

            case 'invoice':

                $retString = strftime("%b %d, %H:%M", $dateTime->getTimestamp());
            break;

            case 'month_year':

                $retString = strftime("%B %Y", $dateTime->getTimestamp());
            break;

            default:

                $retString = $dateTime->format("d/m/Y - H:i");
            break;
        }
        return $retString;
    }
}