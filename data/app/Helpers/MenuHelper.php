<?php

namespace App\Helpers;

class MenuHelper extends FileHelper
{
    private $menuConnection = 'menus';

    public function handleNewSetMenuFromHoldingId($holding_id, $asset_id, $meta = [])
    {
        $data = $this->getFileFromHolding($holding_id);
        $name = $this->putUnique($data, $this->menuConnection, $this->imageType, $asset_id);
        return $name;
    }
}