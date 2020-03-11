<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Asset;
use App\Models\Tags\Tag;
use App\Models\Attribute;

class Assets extends Controller
{
    public function add_tag(Request $request, $asset_id)
    {
        $asset = Asset::findOrFail($asset_id);
        $tag = Tag::findOrFail($request->input('tag_id'));
        $sync_arr = (($request->input('ranking'))?[$tag->id => ['ranking' => $request->input('ranking')]]:[$tag->id]);
        $asset->asset_tags_deprecated()->sync($sync_arr, false);
    }

    public function delete_tag(Request $request, $asset_id, $tag_id)
    {
        $asset = Asset::findOrFail($asset_id);
        $asset->asset_tags_deprecated()->detach($tag_id);
    }

    public function add_attribute(Request $request, $asset_id)
    {
        $asset = Asset::findOrFail($asset_id);
        $att = Attribute::findOrFail($request->input('att_id'));
        $asset->asset_attributes_deprecated()->sync([$att->id], false);
    }

    public function delete_attribute(Request $request, $asset_id, $att_id)
    {
        $asset = Asset::findOrFail($asset_id);
        $asset->asset_attributes_deprecated()->detach($att_id);
    }
}