<?php

namespace App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\ImageProxy;

use App\Zipcube\HandlesAssets\Persistence\DBInterface\Proxies\Generics\BaseProxy as GenericBaseProxy;
use App\ORM\Image;
use Illuminate\Support\Collection;
use Closure;

class BaseProxy extends GenericBaseProxy {
  const BASECLASS = Image::class;

  protected function setupNew() {
    $this->created = date("Y-m-d H:i:s");
  }

  static public function fetchForToken(Collection $tokens): Collection {
    return Image::whereIn('token', $tokens)->get()->map(function (Image $image) {
      return new static($image);
    });
  }

  protected function applyWithMutex(Closure $got, Closure $missed): void {
    $mutex = $this->generateMutex();
    Image::where(['token' => $this->token, 'mutex' => null])->update(['mutex' => $mutex]);
    $mutex = Image::where(['token' => $this->token, 'mutex' => $mutex])->get()->first();
    if (is_null($mutex)) {
      $missed();
    } else {
      try {
        $got($mutex);
        $this->clearMutex($mutex);
      } catch (\Exception $ex) {
        $this->clearMutex($mutex);
        throw $ex;
      }
    }
  }

  protected function clearMutex($mutex): void {
    $mutex->mutex = null;
    $mutex->save();
  }

  protected function generateMutex(): string {
    return md5(uniqid(rand(), true));
  }
}
