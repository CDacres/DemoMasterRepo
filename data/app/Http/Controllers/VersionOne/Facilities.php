<?php

namespace App\Http\Controllers\VersionOne;

use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response\Factory as Response;

use Illuminate\Support\Facades\Cache;
use App\Models\Pivots\AssetAmenity;

use DateInterval;

class Facilities extends AssetDependentController
{
    protected $_attributeValidation = [
        'instructions' => 'not_regex:/^<img\s+.*?src\s*=\s*[\"\'](.+?)[\"\'].*?\>$/i|not_regex:/^<img\s+.*?src\s*=\s*(.+?).*?\>$/i|not_regex:/^<script\s+.*?src\s*=\s*(.+?).*?\>$/i'
    ];
    protected $_relationshipValidation = [];
    protected $defaultClass = AssetAmenity::class;

    public function __construct(Request $request, Response $response)
    {
        parent::__construct($request, $response);
        $this->addIncludes(['filter', 'facility_type', 'asset']);
    }

    public function get_all_by_asset($asset_id)
    {
        $cacheKey = 'asset_' . $asset_id . '_facilites' . '_' . $this->locale();
        $facilities = Cache::tags(['assets'])->remember($cacheKey, DateInterval::createFromDateString('1 day'), function() use ($asset_id)
        {
            $this->removeIncludes('asset');
            return AssetAmenity::where('asset_id', $asset_id)->with($this->getWiths())->get();
        });
        return $this->serialisedJsonResponse($facilities);
    }
}