<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

use App\Events\VenueReviewRequestCreatingEvent;

class VenueReviewRequest extends LegacyModel
{
    public $timestamps = false;
    public $table = 'reviews';

    protected $fillable = [
        'user_id',
        'asset_id',
        'review_token',
        'created'
    ];

    protected $dispatchesEvents = ['creating' => VenueReviewRequestCreatingEvent::class];

    public function remove_review_audit_token()
    {
        $this->review_token = null;
        $this->save();
    }
}