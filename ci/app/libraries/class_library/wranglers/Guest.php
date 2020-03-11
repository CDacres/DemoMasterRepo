<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Guest_Option___Collection extends Base__Collection
{
    static protected $_staticObjectType = Guest_Option::class;
}

class Guest_Option extends Base__Unbound_Object
{
    protected static $_aliases = [
        'number' => ['pointer' => 'number'],
        'desc' => ['pointer' => 'desc']
    ];

    protected static $_wranglers = [
        'desc' => [
            'object' => 'Wrangler__Plural',
            'data_bindings' => ['number' => 'desc'],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];
}

class Wrangler__Guest extends Base__Wrangler
{
    /*
     * data:
     *
     * number (int)
     */

    protected static $_wranglers = [
        'desc' => [
            'object' => 'Wrangler__Plural',
            'method_bindings' => ['number' => ['method' => '_find_best_desc']],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];

    private $_optionArray;

    function _yield_wrangled_data()
    {
        yield "_formatted" => $this->formatted();
    }

    function formatted()
    {
        return $this->wrangle('desc')->formatted();
    }

    function supply_guest_option_collection($limit = null)
    {
        $options = new Guest_Option___Collection(array(), Guest_Option::class);
        foreach ($this->_optionArray as $number=>$desc)
        {
            if ($limit === null || $limit > $number)
            {
                $options->add_object_from_data(['number' => $number, 'desc' => $desc]);
            }
            else
            {
                break;
            }
        }
        return $options;
    }

    protected function _find_best_desc()
    {
        $number = $this->get('number');
        $searchNumber = (($number === null || !is_numeric($number))?0:$number);
        $bestDesc = 0;
        foreach ($this->_optionArray as $number => $desc)
        {
            if ($number <= $searchNumber)
            {
                $bestDesc = $desc;
            }
            else
            {
                break;
            }
        }
        return $bestDesc;
    }

    protected function _post_construction()
    {
        parent::_post_construction();
        $groupArray = [
            '20' => '20+',
            '30' => '30+',
            '40' => '40+',
            '50' => '50+',
            '60' => '60+',
            '70' => '70+',
            '80' => '80+',
            '90' => '90+',
            '100' => '100+',
            '110' => '110+',
            '120' => '120+',
            '130' => '130+',
            '140' => '140+',
            '150' => '150+',
            '200' => '200+',
        ];
        for ($i = 2; $i < 20; ++$i)
        {
            $incArray[$i] = $i;
        }
        $this->_optionArray = ['1' => '1'] + $incArray + $groupArray;
        ksort($this->_optionArray);
    }
}