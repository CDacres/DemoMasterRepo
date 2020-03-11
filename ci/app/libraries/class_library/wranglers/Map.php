<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Wrangler__Map extends Base__Wrangler
{
    /*
     * data:
     *
     * lat      number
     * long     number
     */

    function _yield_wrangled_data()
    {
        yield "_url_200_200" => $this->get_url(200,200,16);
    }

    function get_url($width = 400, $height = 400, $zoom = 14, $scale = 1, $show_pointer = true)
    {
        if ($this->is_null('lat'))
        {
            $lat = 51.528308;
        }
        else
        {
            $lat = $this->get('lat');
        }
        if ($this->is_null('long'))
        {
            $long = -0.3817765;
        }
        else
        {
            $long = $this->get('long');
        }
        $url = '//maps.googleapis.com/maps/api/staticmap?scale=' . $scale . '&center=' . $lat . ',' . $long . '&zoom=' . $zoom . '&size=' . $width . 'x' . $height;
        if ($show_pointer)
        {
            $url .= '&markers=' . $lat . ',' . $long;
        }
        else
        {
            $R = 6371;
            $pi = pi();
            $Lat = ($lat * $pi) / 180;
            $Lng = ($long * $pi) / 180;
            $d = 0.15 / $R;
            $points = [];
            for ($i = 0; $i <= 360; $i += 5)
            {
                $brng = $i * $pi / 180;
                $interimLat = asin(sin($Lat) * cos($d) + cos($Lat) * sin($d) * cos($brng));
                $pLng = (($Lng + atan2(sin($brng) * sin($d) * cos($Lat), cos($d) - sin($Lat) * sin($interimLat))) * 180) / $pi;
                $pLat = ($interimLat * 180) / $pi;
                $points[] = [
                    'lat' => number_format($pLat, 7),
                    'long' => number_format($pLng, 7)
                ];
            }
            $url .= '&path=color:0x00a8db|weight:2|fillcolor:0x0cc6ff80';
            foreach ($points as $point)
            {
                $url .= '|' . $point['lat'] . ',' . $point['long'];
            }
        }
        $url .= '&key=AIzaSyDnWODbV69tYJm9PxIV_1vXuA2j679QCVE';
        return $url;
    }
}