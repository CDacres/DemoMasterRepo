<?php

namespace App\Helpers;

class ReviewHelper
{
    public static function get_rating_types()
    {
        return [
            'cleanliness' => trans('reviews.cleanliness'),
            'communication' => trans('reviews.communication'),
            'accuracy' => trans('reviews.accuracy'),
            'checkin' => trans('reviews.checkin'),
            'location' => trans('reviews.location'),
            'value' => trans('reviews.value')
        ];
    }

    public static function get_rating_values()
    {
        return [
            1 => trans('reviews.score_1'),
            2 => trans('reviews.score_2'),
            3 => trans('reviews.score_3'),
            4 => trans('reviews.score_4'),
            5 => trans('reviews.score_5')
        ];
    }

    public function get_average_score($review, $rounded = false)
    {
        $retVal = (($review->cleanliness + $review->accuracy + $review->checkin + $review->communication + $review->location + $review->value) / 6);
        if ($rounded)
        {
            $retVal = round($retVal, 1);
        }
        return $retVal;
    }
}