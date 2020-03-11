<?php

namespace App\Http\Controllers\VersionOne;

use Illuminate\Http\Request;
use App\Models\AssetImage;
use App\Models\Configuration;

class AssetImages extends AssetDependentController
{
    protected $defaultClass = AssetImage::class;

    public function find(Request $request, $asset_id)
    {
        $images = AssetImage::where('asset_id', $asset_id)->get();
        return $this->serialisedJsonResponse($images);
    }

    public function set_config(Request $request, $image_id)
    {
        $image = AssetImage::findOrFail($image_id);
        $conf = Configuration::findOrFail($request->input('conf_id'));
        $image->configuration_id = $conf->id;
        $image->save();
    }

    public function delete_config(Request $request, $image_id, $conf_id)
    {
        $image = AssetImage::findOrFail($image_id);
        if ($image->configuration_id == $conf_id)
        {
            $image->configuration_id = null;
            $image->save();
        }
    }

    public function set_flagged(Request $request, $image_id)
    {
        $image = AssetImage::findOrFail($image_id);
        if (is_bool($request->input('flagged')))
        {
            $image->flagged = $request->input('flagged');
            $image->save();
        }
    }

    public function set_cosmetic(Request $request, $image_id)
    {
        $image = AssetImage::findOrFail($image_id);
        if (is_bool($request->input('cosmetic')))
        {
            $image->cosmetic = $request->input('cosmetic');
            $image->save();
        }
    }
}