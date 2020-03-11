<?php

namespace App\Http\Controllers\VersionZero;
use App\Http\Controllers\Controller;

use Dingo\Api\Http\Request;
use App\Models\Booking\Review;
use App\Models\ReviewReply;

class Reviews extends Controller
{
    protected $defaultClass = Review::class;

    public function create_review(Request $request)
    {
        $review = new Review();
        $review->asset_id = $request->asset_id;
        $review->userby = $request->userby;
        $review->reservation_id = $request->reservation_id;
        $review->review = $request->review;
        $review->feedback = $request->feedback;
        $review->cleanliness = $request->cleanliness;
        $review->accuracy = $request->accuracy;
        $review->checkin = $request->checkin;
        $review->communication = $request->communication;
        $review->location = $request->location;
        $review->value = $request->value;
        $review->set_reviewing_user($this->authority());
        $review->save();
    }

    public function create_review_reply(Request $request)
    {
        $reviewReply = new ReviewReply();
        $reviewReply->userby = $request->userby;
        $reviewReply->review_id = $request->review_id;
        $reviewReply->reply = $request->reply;
        $reviewReply->save();
    }
}