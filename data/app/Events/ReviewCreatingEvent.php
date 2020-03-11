<?php

namespace App\Events;

use App\Models\Booking\Review;

class ReviewCreatingEvent extends Event
{
    public function __construct(Review $review)
    {
        $review->created = date("Y-m-d H:i:s");
    }
}