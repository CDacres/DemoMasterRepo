<?php

namespace App\Helpers;

use Rs\Json\Merge\Patch;

class PatchHelper
{
    public function arrayPatch(Array $baseArray, Array $patchArray)
    {
        $baseObject = json_decode(json_encode($baseArray));
        $patchObject = json_decode(json_encode($patchArray));
        $patchedObject = (new Patch())->apply(
            $baseObject,
            $patchObject
        );
        return json_decode(json_encode($patchedObject), true);
    }

    public function objectPatch(\stdClass $baseObject, \stdClass $patchObject)
    {
        return (new Patch())->apply(
            $baseObject,
            $patchObject
        );
    }
}