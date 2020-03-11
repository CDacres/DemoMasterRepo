<?php

namespace App\ORM\Transformers;

use App\Types\ProductCategory;
use App\ORM\Tag as ORM;

use App\ORM\Transformers\Helpers\Mapper;

class Tag {
  protected $map = [
    [ProductCategory::MEETING, ORM::MEETING],
    [ProductCategory::OFFICE, ORM::OFFICE_SPACE],
    [ProductCategory::PARTY, ORM::PARTY],
    [ProductCategory::DINING, ORM::DINING],
    [ProductCategory::WEDDING, ORM::WEDDING],
  ];

  public function idFromCategory(int $cat): int {
    if ($cat === ProductCategory::NOPRODUCTCATEGORY) {
      throw new Exception('Undefined category');
    }
    return (new Mapper($this->map))->columnFromColumn($cat, 1, 0);
  }

  public function categoryFromId(int $id): ?int {
    return (new Mapper($this->map))->columnFromColumn($id, 0, 1, true);
  }
}
