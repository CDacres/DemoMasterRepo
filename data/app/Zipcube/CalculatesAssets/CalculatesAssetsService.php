<?php

namespace App\Zipcube\CalculatesAssets;

use App\ZipcubeInterface\DomainCommand;

use App\DomainFramework\State;

use App\Types\Asset;
use App\Types\AssetAmenityEdge;
use App\Types\CAsset;
use App\Types\DailyHours;
use App\Types\ImposingAssets;
use App\Types\Product;
use App\Types\ProductCategory;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Types\TagEdge;
use App\Types\Usage;

class CalculatesAssetsService extends DomainCommand {

  public function imposeAssetOnAssets(ImposingAssets $imposingAssets): CAsset {
    $template = $imposingAssets->getTemplate();
    $targets = $imposingAssets->getTargets();
    return new CAsset(['collection' => collect($targets)->map(function (Asset $target) use ($template) {
      return $this->imposeAsset($template, $target);
    })->all()]);
  }

  public function calculatedAssetFromAsset(Asset $asset): Asset {
    $calculatedAsset = $this->buildEmptyCalculatedAsset($asset);
    return $this->imposeAsset($asset, $calculatedAsset, true);
  }

  private function imposeAsset(Asset $template, Asset $target, bool $isCalculatedAsset = false ): Asset {
    $this->imposeAssetName($template, $target);
    $this->imposeAssetDescription($template, $target);
    $this->imposeAssetLocation($template, $target);
    $this->imposeAssetCurrency($template, $target);
    $this->imposeAssetContext($template, $target);
    $this->imposeAssetArea($template, $target);
    if ($isCalculatedAsset === true) {
      $this->imposeCalculatedAssetUsages($template, $target);
    }
    return $target;
  }

  private function imposeAssetName(Asset $template, Asset $target): void {
    if ($target->getName() == '') {
      if (count($template->getUsages()) > 0) {
        $usage = $template->getUsages()[0];
        $productCategory = $usage->getCategory();
        $target->setName($template->getName().' - '.ProductCategory::name($productCategory));
      }
    }
  }

  private function imposeAssetLocation(Asset $template, Asset $target): void {
    if (is_null($target->getLocation())) {
      $target->setLocation($template->getLocation());
    }
  }

  private function imposeAssetCurrency(Asset $template, Asset $target): void {
    if ($target->getCurrency() == 0) {
      $target->setCurrency($template->getCurrency());
    }
  }

  private function imposeAssetContext(Asset $template, Asset $target): void {
    if (!is_null($template->getContext())) {
      if (is_null($target->getContext())) {
        $target->setContext(new ProductContext());
      }
      $this->imposeContextWebsite($template, $target);
      $this->imposeContextSchedule($template, $target);
      $this->imposeContextConfigurations($template, $target);
      $this->imposeContextAmenities($template, $target);
      $this->imposeContextTags($template, $target);
      $this->imposeContextMenus($template, $target);
    }
  }

  private function imposeContextWebsite(Asset $template, Asset $target): void {
    if ($target->getContext()->getWebsite() == '') {
      $target->getContext()->setWebsite($template->getContext()->getWebsite());
    }
  }

  private function imposeContextSchedule(Asset $template, Asset $target): void {
    if (!is_null($template->getContext()->getSchedule())) {
      $imposedSchedule = $template->getContext()->getSchedule();
      if (!is_null($target->getContext()->getSchedule()) && !is_null($target->getContext()->getSchedule()->getDays()) && count($target->getContext()->getSchedule()->getDays()) > 0) {
        $inheritedDailyHours = $this->calculatedDailyHoursFromDailyHoursAndContextSchedule($target->getContext()->getSchedule()->getDays(), $template->getContext()->getSchedule());
        $imposedSchedule = new ProductPriceSchedule(['days' => $inheritedDailyHours]);
      }
      $target->getContext()->setSchedule($imposedSchedule);
    }
  }

  private function imposeContextAmenities(Asset $template, Asset $target): void {
    if (!is_null($template->getContext()->getAmenities()) && count($template->getContext()->getAmenities()) > 0) {
      $imposedAmenities = $template->getContext()->getAmenities();
      if (!is_null($target->getContext()->getAmenities()) && count($target->getContext()->getAmenities()) > 0) {
        $amenityIds = [];
        $imposedAmenities = collect($target->getContext()->getAmenities())->map(function (AssetAmenityEdge $targetAmenity) use (&$amenityIds) {
          array_push($amenityIds, $targetAmenity->getAmenityId());
          return $targetAmenity;
        })->all();
        collect($template->getContext()->getAmenities())->map(function (AssetAmenityEdge $templateAmenity) use ($amenityIds, &$imposedAmenities) {
          if (!in_array($templateAmenity->getAmenityId(), $amenityIds) && $templateAmenity->getSuppressed() == false) {
            array_push($imposedAmenities, $templateAmenity);
          }
        });
      }
      $target->getContext()->setAmenities($imposedAmenities);
    }
  }

  private function imposeContextTags(Asset $template, Asset $target): void {
    if (!is_null($template->getContext()->getTags()) && count($template->getContext()->getTags()) > 0) {
      $imposedTags = $template->getContext()->getTags();
      if (!is_null($target->getContext()->getTags()) && count($target->getContext()->getTags()) > 0) {
        $imposedTags = collect($target->getContext()->getTags())->all();
        collect($template->getContext()->getTags())->map(function (TagEdge $templateTag) use (&$imposedTags) {
          if (!in_array($templateTag, $imposedTags) && $templateTag->getSuppressed() == false) {
            array_push($imposedTags, $templateTag);
          }
        });
      }
      $target->getContext()->setTags($imposedTags);
    }
  }

  private function imposeContextMenus(Asset $template, Asset $target): void {
    if (!is_null($template->getContext()->getMenus()) && count($template->getContext()->getMenus()) > 0) {
      $imposedMenus = $template->getContext()->getMenus();
      if (!is_null($target->getContext()->getMenus()) && count($target->getContext()->getMenus()) > 0) {
        $imposedMenus = array_merge(collect($template->getContext()->getMenus())->all(), collect($target->getContext()->getMenus())->all());
      }
      $target->getContext()->setMenus($imposedMenus);
    }
  }

  private function buildEmptyCalculatedAsset(Asset $asset): Asset {
    $calculatedAsset = new Asset();
    $calculatedAsset->setId($asset->getId());
    $calculatedAsset->setName($asset->getName());
    $calculatedAsset->setDescription($asset->getDescription());
    $calculatedAsset->setArea($asset->getArea());
    if (!is_null($asset->getContext())) {
      $calculatedAsset->setContext(new ProductContext(['configurations' => $asset->getContext()->getConfigurations()]));
    }
    $this->setAssetDetails($asset, $calculatedAsset);
    return $calculatedAsset;
  }

  private function imposeCalculatedAssetUsages(Asset $template, Asset $target): void {
    $target->setUsages($this->buildCalculatedUsages($template));
  }

  private function buildCalculatedUsages(Asset $asset): array {
    $assetContext = $asset->getContext();
    return collect($asset->getUsages())->map(function (Usage $usage) use ($assetContext) {
      return $this->imposeContextOnUsage($usage, $assetContext);
    })->all();
  }

  private function imposeContextOnUsage(Usage $usage, ?ProductContext $assetContext): Usage {
    if (!is_null($assetContext)) {
      $usage->setContext($this->buildImposedContext($usage->getContext(), $assetContext));
    }
    $usage->setProducts($this->buildCalculatedProducts($usage));
    return $usage;
  }

  private function buildCalculatedProducts(Usage $usage): array {
    $usageContext = $usage->getContext();
    return collect($usage->getProducts())->map(function (Product $product) use ($usageContext) {
      return $this->imposeContextOnProduct($product, $usageContext);
    })->all();
  }

  private function imposeContextOnProduct(Product $product, ?ProductContext $usageContext): Product {
    if (!is_null($usageContext)) {
      $product->setContext($this->buildImposedContext($product->getContext(), $usageContext));
    }
    return $product;
  }

  private function buildImposedContext(?ProductContext $context, ProductContext $inheritedContext): ProductContext {
    $imposedContext = $inheritedContext;
    if (!is_null($context) && !is_null($context->getSchedule()) && !is_null($context->getSchedule()->getDays()) && count($context->getSchedule()->getDays()) > 0) {
      $calculatedDailyHours = $this->calculatedDailyHoursFromDailyHoursAndContextSchedule($context->getSchedule()->getDays(), $inheritedContext->getSchedule());
      $calculatedSchedule = new ProductPriceSchedule(['days' => $calculatedDailyHours]);
      $imposedContext = new ProductContext(['schedule' => $calculatedSchedule]);
    }
    return $imposedContext;
  }

  private function calculatedDailyHoursFromDailyHoursAndContextSchedule($dailyHours, ?ProductPriceSchedule $inheritedSchedule): array {
    $dailyHoursArray = $this->populateDailyHoursArray($dailyHours);
    $calculatedDailyHours = $dailyHoursArray['calculatedDailyHours'];
    if ($dailyHoursArray['allowInherited'] && !is_null($inheritedSchedule) && !is_null($inheritedSchedule->getDays()) && count($inheritedSchedule->getDays()) > 0) {
      $filteredDailyHours = $this->filterInheritedDailyHours($inheritedSchedule->getDays(), $dailyHoursArray['contextDailyHours']);
      $calculatedDailyHours = array_merge($calculatedDailyHours, $filteredDailyHours);
    }
    return $calculatedDailyHours;
  }

  private function populateDailyHoursArray($dailyHours): array {
    $dailyHoursArray = [
      'contextDailyHours' => [],
      'calculatedDailyHours' => [],
      'allowInherited' => true,
    ];
    collect($dailyHours)->map(function (DailyHours $dailyHour) use (&$dailyHoursArray) {
      $dailyHoursArray['contextDailyHours'][$dailyHour->getDay()] = $dailyHour->getSpans();
      $dailyHoursArray['calculatedDailyHours'][] = $dailyHour;
      if ($dailyHour->getDay() == 0) {
        $dailyHoursArray['allowInherited'] = false;
      }
    });
    return $dailyHoursArray;
  }

  private function filterInheritedDailyHours($inheritedDailyHours, $contextDailyHours) {
    $filteredDailyHours = collect($inheritedDailyHours)->filter(function (DailyHours $inheritedDailyHour) use ($contextDailyHours) {
      if (!isset($contextDailyHours[$inheritedDailyHour->getDay()])) {
        return $inheritedDailyHour;
      }
    })->all();
    return $filteredDailyHours;
  }

  private function setAssetDetails(Asset $asset, Asset $calculatedAsset): void {
    $detailsType = $asset->getDetails();
    if (!empty($detailsType)) {
      $getFunctionName = "get".ucfirst($detailsType);
      $setFunctionName = "set".ucfirst($detailsType);
      $calculatedAsset->$setFunctionName($asset->$getFunctionName());
    }
  }

  private function imposeAssetDescription(Asset $template, Asset $target): void {}

  private function imposeAssetArea(Asset $template, Asset $target): void {}

  private function imposeContextConfigurations(Asset $template, Asset $target): void {}
}