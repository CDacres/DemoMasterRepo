<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Review___Collection extends Base__Collection
{
    static protected $_staticObjectType = Review::class;

    private $_scores = [
        'cleanliness' => 0,
        'accuracy' => 0,
        'checkin' => 0,
        'communication' => 0,
        'location' => 0,
        'value' => 0,
    ];
    private $_tally = 0;

    protected static $_wranglers = [
        'review_count' => [
            'object' => 'Wrangler__Plural',
            'method_bindings' => ['number' => ['method' => 'get_count']],
            'hard_bindings' => [
                'singular' => 'common_person_upper',
                'plural' => 'common_people_upper'
            ]
        ]
    ];

    function __construct($reviewsArray)
    {
        parent::__construct($reviewsArray);
        if ($this->exist())
        {
            $this->_calculate_scores();
        }
    }

    private function _calculate_scores()
    {
        $count = 0;
        $tempScores = $this->_scores;
        foreach ($this->object() as $object)
        {
            ++$count;
            foreach ($tempScores as $key => $value)
            {
                $tempScores[$key] = ($object->get($key) + $value);
            }
        }
        if ($count > 0)
        {
            foreach ($tempScores as $key => $value)
            {
                $this->_scores[$key] = round(($value / $count), 2);
            }
            $this->_tally = $count;
        }
    }

    public function get_tally()
    {
        return $this->_tally;
    }

    public function get_overall_score($rounded = true)
    {
        $total = 0;
        $count = 0;
        foreach ($this->_scores as $value)
        {
            ++$count;
            $total += $value;
        }
        $retVal = ($total/$count);
        if ($rounded)
        {
            $retVal = round($retVal, 1);
        }
        return $retVal;
    }

    public function get_score($category)
    {
        $retVal = false;
        if (isset($this->_scores[$category]))
        {
            $retVal = $this->_scores[$category];
        }
        return $retVal;
    }

    public function get_overall_star()
    {
        return $this->get_overall_score();
    }

    public function get_star($category)
    {
        return $this->get_score($category);
    }
}

class Review extends Base__Item
{
    protected static $_modelName = Model__reviews::class;
    protected static $_tableName = 'reviews';
    protected static $_columns = [
        'subject_id' => [
            'pointer' => 'asset_id',
            'validations' => 'required|is_natural'
        ],
        'author_id' => [
            'pointer' => 'userby',
            'validations' => 'required|is_natural'
        ],
        'reservation_id' => [
            'pointer' => 'reservation_id',
            'validations' => 'is_natural'
        ],
        'review' => [
            'pointer' => 'review',
            'validations' => 'required'
        ],
        'feedback' => [
            'pointer' => 'feedback',
            'validations' => ''
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'required|is_date_time'
        ],
        'cleanliness' => [
            'pointer' => 'cleanliness',
            'validations' => 'required|is_natural'
        ],
        'accuracy' => [
            'pointer' => 'accuracy',
            'validations' => 'required|is_natural'
        ],
        'checkin' => [
            'pointer' => 'checkin',
            'validations' => 'required|is_natural'
        ],
        'communication' => [
            'pointer' => 'communication',
            'validations' => 'required|is_natural'
        ],
        'location' => [
            'pointer' => 'location',
            'validations' => 'required|is_natural'
        ],
        'value' => [
            'pointer' => 'value',
            'validations' => 'required|is_natural'
        ]
    ];
    protected static $_aliases = [
        'author_name' => ['pointer' => 'author_name'],
        'venue_name' => ['pointer' => 'venue_name'],
        'room_name' => ['pointer' => 'room_name'],
        'reply' => ['pointer' => 'reply'],
        'reply_author' => ['pointer' => 'reply_author']
    ];
    protected static $_wranglers = [
        'created_date_time' => [
            'object' => 'Wrangler__Date',
            'data_bindings' => ['date' => 'created']
        ],
        'defaulted_review' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'review'],
            'hard_bindings' => ['default' => 'common_new_review']
        ],
        'defaulted_review_length_limited' => [
            'object' => 'Wrangler__Limiter',
            'method_bindings' => ['data' => ['method' => '_defaulted_review']]
        ]
    ];
    protected static $_objects = ['replies' => Review_Reply___Collection::class];

    protected function _defaulted_review()
    {
        return $this->wrangle('defaulted_review')->value();
    }

    public function get_average_score($rounded = false)
    {
        $retVal = (($this->get('cleanliness') + $this->get('accuracy') + $this->get('checkin') + $this->get('communication') + $this->get('location') + $this->get('value')) / 6);
        if ($rounded)
        {
            $retVal = round($retVal, 1);
        }
        return $retVal;
    }

    public function get_average_star()
    {
        return $this->get_average_score();
    }

    public static function get_rating_types()
    {
        return [
            'cleanliness' => 'common_review_cleanliness',
            'communication' => 'common_review_communication',
            'accuracy' => 'common_review_accuracy',
            'checkin' => 'common_review_checkin',
            'location' => 'common_review_location',
            'value' => 'common_review_value'
        ];
    }

    public static function get_rating_values()
    {
        return [
            1 => 'common_review_1',
            2 => 'common_review_2',
            3 => 'common_review_3',
            4 => 'common_review_4',
            5 => 'common_review_5'
        ];
    }
}

class Review___Collection_Collection extends Base__Collection
{
    function __construct($objectsDataArray = [])
    {
        parent::__construct($objectsDataArray, Review::class, Review___Collection::class);
    }

    public function get_overall_score()
    {
        $total = 0;
        $count = 0;
        foreach ($this->object() as $reviewCollection)
        {
            ++$count;
            $total += $reviewCollection->get_overall_score(false);
        }
        return round(($total / $count), 1);
    }

    public function get_star_value($category)
    {
        $total = 0;
        $count = 0;
        foreach ($this->object() as $reviewCollection)
        {
            ++$count;
            $total += $reviewCollection->get_star($category);
        }
        return round(($total / $count), 1);
    }

    public function get_overall_star()
    {
        return $this->get_overall_score();
    }
}