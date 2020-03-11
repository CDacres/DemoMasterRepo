<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use App\Models\VenueAsset;

class Venues extends Controller
{
    protected $_attributeValidation = ['description' => 'not_regex:/^<img\s+.*?src\s*=\s*[\"\'](.+?)[\"\'].*?\>$/i|not_regex:/^<img\s+.*?src\s*=\s*(.+?).*?\>$/i|not_regex:/^<script\s+.*?src\s*=\s*(.+?).*?\>$/i'];
    protected $_relationshipValidation = [];

    protected $defaultClass = VenueAsset::class;

    public function get_user_collection($target_user_id)
    {
        $target_user = \App\Models\User::findOrFail($target_user_id);
        if ($this->authority()->cannot('view', $target_user)) {
            abort(401);
        }
        $user = $this->authority();
        $venueCollection = VenueAsset::whereHas('privileges', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->with($this->getWiths())->get();
        return $this->serialisedJsonResponse($venueCollection, 'venues');
    }
}