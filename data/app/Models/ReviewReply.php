<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

use App\Events\ReviewReplyCreatingEvent;
use App\Events\ReviewReplyCreatedEvent;

class ReviewReply extends LegacyModel
{
    public $timestamps = false;
    public $table = 'review_replies';

    protected $fillable = [
        'userby',
        'review_id',
        'reply',
        'created'
    ];

    protected $dispatchesEvents = [
        'creating' => ReviewReplyCreatingEvent::class,
        'created' => ReviewReplyCreatedEvent::class
    ];
}