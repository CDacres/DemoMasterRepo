<?php

namespace App\Zipcube\HandlesAssets\Persistence\MDT\Transformers;

use App\Types\CMenu;
use App\Types\ProductContext;
use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\VenueProxy;

class ContextMDTT extends BaseMDTT {

  public function toVenueProxy(ProductContext $context): array {
    if (is_null($context)) {
      return [
        'website' => null,
        'menus' => null
      ];
    } else {
      $menus = null;
      if ($context->getMenus()->count() > 0) {
        $menus = new CMenu();
        $menus->setCollection($context->getMenus());
      }
      return [
        'website' => $this->string($context->getWebsite()),
        'menus' => $menus->serializeToJsonString()
      ];
    }
  }

  public function fromVenueProxy(VenueProxy $proxy): ProductContext {
    $context = new ProductContext();
    if (!is_null($proxy->menus)) {
      $menus = new CMenu();
      $menus->mergeFromJsonString($proxy->menus);
      $context->setMenus($menus->getCollection());
    }
    if (!is_null($proxy->website)) {
      $context->setWebsite($proxy->website);
    }
    return $context;
  }

}
