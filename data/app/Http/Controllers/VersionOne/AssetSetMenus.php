<?php

namespace App\Http\Controllers\VersionOne;

use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response\Factory as Response;
use App\Models\Pivots\AssetSetMenu;

class AssetSetMenus extends AssetDependentController
{
    protected $defaultClass = AssetSetMenu::class;

    public function __construct(Request $request, Response $response)
    {
        parent::__construct($request, $response);
        $this->addIncludes(['dining_period']);
    }

//    public function createFromRequestHelper($reqHelper)
//    {
//        $asset_id = $reqHelper->getJSONRelationshipId('asset');
//        $helper = new MenuHelper();
//        if ($reqHelper->requestHasAttribute('file_id'))
//        {
//            $name = $helper->handleNewSetMenuFromHoldingId($reqHelper->getJSONAttribute('file_id'), $asset_id, $reqHelper->getJSONMetaArray());
//        }
//        else
//        {
//            throw new ValidationHttpException('No file hook given. Please include a file id');
//        }
//        $this->fillFromRequestHelper($reqHelper);
//        $this->asset_id = $asset_id;
//        $this->path = $name;
////        $this->created = date("Y-m-d H:i:s");
//        $this->save();
//    }
}