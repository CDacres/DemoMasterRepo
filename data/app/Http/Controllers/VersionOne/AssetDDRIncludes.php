<?php

namespace App\Http\Controllers\VersionOne;

use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response\Factory as Response;
use App\Models\Pivots\AssetDDRInclude;

class AssetDDRIncludes extends AssetDependentController
{
    protected $defaultClass = AssetDDRInclude::class;

    public function __construct(Request $request, Response $response)
    {
        parent::__construct($request, $response);
        $this->addIncludes(['ddrinclude_type']);
    }
}