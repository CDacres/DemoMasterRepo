<?php

namespace App\Http\Controllers\VersionOne;

use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response\Factory as Response;
use App\Models\Pivots\AssetConfiguration;

class AssetConfigurations extends AssetDependentController
{
    protected $defaultClass = AssetConfiguration::class;

    public function __construct(Request $request, Response $response)
    {
        parent::__construct($request, $response);
        $this->addIncludes(['configuration']);
    }
}