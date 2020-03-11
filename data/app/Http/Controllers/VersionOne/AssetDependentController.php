<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;
use App\Models\Asset;

class AssetDependentController extends Controller
{
    public function create_for_asset($assetId)
    {
        $asset = Asset::findOrFail($assetId);
        $this->requestHelper()->addRelationship('asset', $asset->id);
        return $this->create();
    }

    protected function authoriseCreationOrAbort()
    {
        $assetId = $this->_getAssetIdFromRequest();
        $asset = Asset::findOrFail($assetId);
        if ($this->requestHelper()->userCannot('update', $asset))
        {
            abort(401);
        }
    }

    protected function authoriseDeleteOrAbort($id, $model = null)
    {
        $this->_authoriseAssetOrAbort($id, 'update');
    }

    protected function authoriseUpdateOrAbort($id, $model = null)
    {
        $this->_authoriseAssetOrAbort($id, 'update');
    }

    protected function authoriseViewOrAbort($id, $model = null)
    {
        $this->_authoriseAssetOrAbort($id, 'view');
    }

    private function _getAssetIdFromRequest()
    {
        $asset_id = $this->requestHelper()->getJSONAttribute('asset_id');
        return $asset_id ?: $this->requestHelper()->getJSONRelationshipId('asset');
    }

    private function _authoriseAssetOrAbort($id, $type)
    {
        $staticModel = $this->defaultClass;
        $asset = $staticModel::findOrFail($id)->asset;
        if ($this->requestHelper()->userCannot($type, $asset))
        {
            abort(401);
        }
    }
}