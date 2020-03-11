<?php

namespace App\Http\Controllers\VersionOne;

use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response\Factory as Response;
use App\Models\Pivots\AssetMinimumSpend;

class AssetMinimumSpends extends AssetDependentController
{
    protected $defaultClass = AssetMinimumSpend::class;

    public function __construct(Request $request, Response $response)
    {
        parent::__construct($request, $response);
        $this->addIncludes(['dining_period']);
    }
}