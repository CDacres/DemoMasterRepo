<?php

namespace App\Events;

use App\Models\VenueReviewRequest;

use App\Helpers\TokenHelper;

class VenueReviewRequestCreatingEvent extends Event
{
    public function __construct(VenueReviewRequest $review)
    {
        $review->created = date("Y-m-d H:i:s");
        $review->review_token = (new TokenHelper())->add_token();
    }
}