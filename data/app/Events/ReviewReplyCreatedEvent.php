<?php

namespace App\Events;

use App\Models\ReviewReply;
use App\Models\Booking\Review;
use App\Models\User;

use App\Helpers\CommHelper;

class ReviewReplyCreatedEvent extends Event
{
    public function __construct(ReviewReply $reply)
    {
        $review = Review::whereHas('asset', function($query) use ($reply)
        {
            $query->whereHas('privileges', function($query) use ($reply)
            {
                $query->where('user_id', $reply->userby);
            });
        })->where('id', $reply->review_id)->first();
        if (!is_null($review))
        {
            $user = User::find($review->userby);
            if (!is_null($user))
            {
                $commHelper = new CommHelper();
                $commHelper->review_reply_notification($user, $reply, $review->asset);
            }
        }
    }
}