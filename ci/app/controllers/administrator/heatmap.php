<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Heatmap extends CI_Controller
{
    function __construct()
    {
        parent::__construct();
        $this->load->library('DX_Auth');
        $this->dx_auth->check_uri_permissions();
    }

//    public function search()
//    {
//        $this->index('search');
//    }

    public function index($param = '')
    {
//        if ($param == 'search')
//        {
//            $query = 'SELECT locations.lat, locations.`long` FROM dev.searchAudit INNER JOIN locations ON value=locations.human_desc WHERE variable=\'location\' AND value!=\'London\';';
//        }
//        else
//        {
            $query = 'SELECT DISTINCT `long`, `lat`, venues.`name` FROM reservations LEFT JOIN rooms on reservations.asset_id=rooms.asset_id INNER JOIN venues ON venues.id=rooms.venue_id';
//        }
        $result = $this->db->query($query);
        $resultArray = $result->result_array();
        $latLongArrayJsString = '';
        foreach ($resultArray as $latLongName)
        {
            if ((50 < $latLongName['lat'] && $latLongName['lat'] < 52) && (-1 < $latLongName['long'] && $latLongName['long'] < 1))
            {
                $latLongArrayJsString .= 'new google.maps.LatLng(' . round($latLongName["lat"],3) . ', ' . round($latLongName["long"],3) . '), ';
            }

        }
        echo '<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Heatmap</title>
            <style>
              html, body, #map-canvas {
                height: 100%;
                margin: 0px;
                padding: 0px
              }
              #panel {
                position: absolute;
                top: 5px;
                left: 50%;
                margin-left: -180px;
                z-index: 5;
                background-color: #fff;
                padding: 5px;
                border: 1px solid #999;
              }
            </style>
            <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true&libraries=visualization"></script>
            <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
            <script type="text/javascript" src="https://www.google.com/jsapi"></script>
            <script>
              // Adding 500 Data Points
              var map, pointarray, heatmap;

              var taxiData = [' . $latLongArrayJsString . '];

              function initialize() {
                var mapOptions = {
                  zoom: 13,
                  center: new google.maps.LatLng(51.5, -0.1)
                };

                map = new google.maps.Map(document.getElementById(\'map-canvas\'),
                    mapOptions);

                var pointArray = new google.maps.MVCArray(taxiData);

                heatmap = new google.maps.visualization.HeatmapLayer({
                  data: pointArray
                });

                heatmap.setMap(map);

              heatmap.set(\'radius\', heatmap.get(\'radius\') ? null : 20);
               var gradient = [
                  \'rgba(0, 255, 255, 0)\',
                  \'rgba(0, 255, 255, 1)\',
                  \'rgba(0, 191, 255, 1)\',
                  \'rgba(0, 127, 255, 1)\',
                  \'rgba(0, 63, 255, 1)\',
                  \'rgba(0, 0, 255, 1)\',
                  \'rgba(0, 0, 223, 1)\',
                  \'rgba(0, 0, 191, 1)\',
                  \'rgba(0, 0, 159, 1)\',
                  \'rgba(0, 0, 127, 1)\',
                  \'rgba(63, 0, 91, 1)\',
                  \'rgba(127, 0, 63, 1)\',
                  \'rgba(191, 0, 31, 1)\',
                  \'rgba(255, 0, 0, 1)\'
                ]
                heatmap.set(\'gradient\', heatmap.get(\'gradient\') ? null : gradient);
                heatmap.set(\'opacity\', heatmap.get(\'opacity\') ? null : 0.7);
              }

              google.maps.event.addDomListener(window, \'load\', initialize);
            </script>

          </head>

          <body>

            <div id="map-canvas"></div>
            <!-- <div id="map_div" style="width: 100%; height: 100%"></div> -->
          </body>
        </html>';
    }
}