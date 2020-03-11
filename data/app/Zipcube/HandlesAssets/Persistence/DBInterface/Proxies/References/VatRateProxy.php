<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\References;

use App\ORM\VatRate;
use DateTime;
use Illuminate\Support\Collection;

class VatRateProxy extends ReferenceProxy {
  const BASECLASS = VatRate::class;

  static public function fetchModels(): Collection {
    $currentDateTime = (new DateTime())->format('Y-m-d H:i:s');
    return VatRate::where(['rate_type' => VatRate::STANDARD])->where(function ($query) use ($currentDateTime) {
      $query->where('valid_from', '<=', $currentDateTime)->where(function ($query) use ($currentDateTime) {
        $query->whereNull('valid_to')->orWhere('valid_to', '>=', $currentDateTime);
      });
    })->get();
  }
}
