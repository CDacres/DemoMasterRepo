<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use App\Models\RoomAsset;
use App\Models\VenueAsset;

class Rooms extends Controller
{
    protected $_attributeValidation = ['description' => 'not_regex:/^<img\s+.*?src\s*=\s*[\"\'](.+?)[\"\'].*?\>$/i|not_regex:/^<img\s+.*?src\s*=\s*(.+?).*?\>$/i|not_regex:/^<script\s+.*?src\s*=\s*(.+?).*?\>$/i'];
    protected $_relationshipValidation = [];

    protected $defaultClass = RoomAsset::class;

    public function get_venue_collection($id)
    {
        $venue = VenueAsset::findOrFail($id);
        $roomCollection = RoomAsset::whereHas('details', function ($query) use ($venue) {
            $query->where('venue_id', $venue->details->id);
        })->with($this->getWiths())->get();
        return $this->serialisedJsonResponse($roomCollection);
    }
}