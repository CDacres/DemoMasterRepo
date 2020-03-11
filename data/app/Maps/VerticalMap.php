<?php

namespace App\Maps;

use App\ORM\Usage;
use App\Types\ProductCategory;
use App\ORM\Vertical as ORM;
use App\ORM\OfficeType;

use Exception;

class VerticalMap extends BaseMap {

  protected $map = [
    [ProductCategory::MEETING, ORM::MEETING, '00', Usage::MEETINGROOM, OfficeType::HOTDESK],
    [ProductCategory::OFFICE, ORM::OFFICE, '01', Usage::PRIVATEOFFICE, OfficeType::PRIVATEOFFICE],
    [ProductCategory::DEDICATEDDESK, ORM::OFFICE, '01', Usage::DEDICATEDDESK, OfficeType::DEDICATEDDESK],
    [ProductCategory::HOTDESK, ORM::OFFICE, '01', Usage::PRIVATEDESK, OfficeType::HOTDESK],
    [ProductCategory::PARTY, ORM::PARTY, '02', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
    [ProductCategory::DINING, ORM::DINING, '03', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
    [ProductCategory::WEDDING, ORM::WEDDING, '04', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
    [ProductCategory::NOPRODUCTCATEGORY, ORM::ART, '05', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
    [ProductCategory::NOPRODUCTCATEGORY, ORM::SPORT, '06', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
    [ProductCategory::NOPRODUCTCATEGORY, ORM::POPUP, '07', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
    [ProductCategory::NOPRODUCTCATEGORY, ORM::ACTIVITY, '08', Usage::EVENTFUNCTION, OfficeType::HOTDESK],
  ];

  public function idFromCategory(int $cat): int {
    if ($cat === ProductCategory::NOPRODUCTCATEGORY) {
      throw new Exception('Undefined category');
    }
    return $this->columnFromColumn($cat, 1, 0);
  }

  public function productSuffixFromId(int $id): string {
    return $this->columnFromColumn($id, 2, 1);
  }

  public function categoryFromId(int $id): int {
    return $this->columnFromColumn($id, 0, 1);
  }

  public function categoryFromIdAndOfficeType(int $id, int $officeType): int {
    if ($id === ORM::OFFICE) {
      if ($officeType === OfficeType::DEDICATEDDESK) {
        return ProductCategory::DEDICATEDDESK;
      } else if ($officeType === OfficeType::HOTDESK) {
        return ProductCategory::HOTDESK;
      }
    }
    return $this->columnFromColumn($id, 0, 1);
  }

  public function legacyUsageIdFromCategory(int $cat): int {
    return $this->columnFromColumn($cat, 3, 0);
  }

  public function officeTypeFromCategory(int $cat): ?int {
    return $this->columnFromColumn($cat, 4, 0);
  }
}
