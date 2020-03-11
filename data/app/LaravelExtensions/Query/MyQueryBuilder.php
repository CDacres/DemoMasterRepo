<?php

namespace App\LaravelExtensions\Query;

use Illuminate\Database\Query\Builder;

class MyQueryBuilder extends Builder
{
    public function select_distance($longA, $latA, $longB, $latB, $alias)
    {
        $this->selectRaw($this->_distance_calculation_string($longA, $latA, $longB, $latB) . ' AS ' . $alias);
    }

    public function where_distance($longA, $latA, $longB, $latB, $distance, $comparator = '<', $useBackticks = true)
    {
        $this->where($this->_distance_calculation_string($longA, $latA, $longB, $latB) . $comparator, $distance, $useBackticks);
    }

    private function _distance_calculation_string($longA, $latA, $longB, $latB)
    {
        return '(ROUND(SQRT(POW(((' . $latA . '-' . $latB . ')*110.54),(2))+POW(((' . $longA . '-' . $longB . ')*111.32*cos(RADIANS(' . $latA . '))),(2))),(1)))';
    }
}