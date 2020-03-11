<?php

namespace App\Events;

use App\Models\ReviewReply;

class ReviewReplyCreatingEvent extends Event
{
    public function __construct(ReviewReply $reply)
    {
        $reply->created = date("Y-m-d H:i:s");
    }
}