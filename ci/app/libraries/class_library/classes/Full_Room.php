<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Full_Room___Collection extends Abstract__Room_User_Facing___Collection
{
    static protected $_staticObjectType = Full_Room::class;

    protected static $_wranglers = [
        'review_count' => [
            'object' => 'Wrangler__Plural',
            'method_bindings' => [
                'number' => ['method' => 'get_review_count']
            ],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];

    public function have_reviews()
    {
        foreach ($this->object() as $room)
        {
            if ($room->get('reviews')->get_count() > 0)
            {
                return true;
            }
        }
        return false;
    }

    public function get_review_count()
    {
        $tally = 0;
        foreach ($this->object() as $room)
        {
            $tally += $room->get('reviews')->get_tally();
        }
        return $tally;
    }

    public function get_overall_score($type = null, $rounded = true)
    {
        $runningTotal = 0;
        $tally = 0;
        foreach ($this->object() as $room)
        {
            $reviews = $room->get('reviews');
            $roomTally = $reviews->get_tally();
            if ($type === null)
            {
                $runningTotal += ($reviews->get_overall_score(false) * $roomTally);
            }
            else
            {
                $runningTotal += ($reviews->get_score($type) * $roomTally);
            }
            $tally += $roomTally;
        }
        $retVal = ($runningTotal / $tally);
        if ($rounded)
        {
            $retVal = round($retVal, 1);
        }
        return $retVal;
    }
}

class Full_Room extends Abstract__Room_User_Facing
{
    protected static $_objects = [
        'reviews' => Review___Collection::class,
        'configurations' => Configuration___Collection::class,
        'amenities' => Runt_Asset_Amenity___Collection::class,
        'attributes' => Runt_Asset_Attribute___Collection::class
    ];

    public function get_min_capacity()
    {
    }

    public function get_max_capacity()
    {
    }
}