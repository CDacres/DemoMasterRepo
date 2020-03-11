<?php

namespace App\Zipcube\CalculatesAssets;

use App\ZipcubeInterface\DomainCommand;

use App\DomainFramework\State;

use Google\Protobuf\Internal\RepeatedField;

use App\Types\Asset;
use App\Types\AssetConfiguration;
use App\Types\CAsset;
use App\Types\ImposingAssets;
use App\Types\Product;
use App\Types\ProductCategory;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Types\Usage;

class CalculatesAssetsService extends DomainCommand {

  public function imposeAssetOnAssets(ImposingAssets $imposingAssets): CAsset {
    $template = $imposingAssets->getTemplate();
    $targets = $imposingAssets->getTargets();
    return new CAsset(['collection' => collect($targets)->map(function (Asset $target) use ($template) {
      return $this->imposeAsset($template, $target);
    })]);
  }

  private function imposeAsset(Asset $template, Asset $target): Asset {
    $this->imposeAssetName($template, $target);
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

  //TODO: Cleanup below code for asset calculation/inheritance

  public function calculatedAssetFromAsset(Asset $asset): Asset {
    $calculatedAsset = new Asset();
    $calculatedAsset->setId($asset->getId());
    $calculatedAsset->setName($asset->getName());
    $calculatedAsset->setDescription($asset->getDescription());
    $calculatedAsset->setLocation($asset->getLocation());
    $calculatedAsset->setCurrency($asset->getCurrency());
    $calculatedAsset->setArea($asset->getArea());
    $calculatedAsset->setContext($asset->getContext());
    $calculatedAsset->setUsages($this->populateCalculatedUsages($asset));
    $calculatedAsset = $this->setAssetDetails($asset, $calculatedAsset);

    return $calculatedAsset;
  }

  public function inheritFromParentAsset(CAsset $assetPair): Asset {
    $asset = $assetPair->getCollection()[0];
    $parentAsset = $assetPair->getCollection()[1];
    if (!empty($parentAsset->getContext())) {
      $asset->setContext($this->handleContextInheritence($parentAsset->getContext(), $asset->getContext()));
    }
    return $asset;
  }

  private function populateCalculatedUsages(Asset $asset): array {
    $usages = $asset->getUsages();
    $assetContext = $asset->getContext();
    $calculatedUsages = [];
    foreach ($usages as $usage) {
      $calculatedUsages[] = $this->calculatedUsageFromUsageAndContext($usage, $assetContext);
    }

    return $calculatedUsages;
  }

  private function calculatedUsageFromUsageAndContext(Usage $usage, ?ProductContext $assetContext): Usage {
    $calculatedUsage = new Usage();
    $calculatedUsage->setName($usage->getName());
    $calculatedUsage->setCategory($usage->getCategory());
    $calculatedUsage->setDescription($usage->getDescription());
    $calculatedUsageContext = $this->populateContext($usage->getContext(), $assetContext);
    if (!is_null($calculatedUsageContext)) {
      $calculatedUsage->setContext($calculatedUsageContext);
    }
    $calculatedUsage->setProducts($this->populateCalculatedProducts($usage, $calculatedUsage));

    return $calculatedUsage;
  }

  private function populateCalculatedProducts(Usage $usage, Usage $calculatedUsage): array {
    $products = $usage->getProducts();
    $usageContext = $calculatedUsage->getContext();
    $calculatedProducts = [];
    foreach ($products as $product) {
      $calculatedProducts[] = $this->calculatedProductFromProductAndContext($product, $usageContext);
    }

    return $calculatedProducts;
  }

  private function calculatedProductFromProductAndContext(Product $product, ?ProductContext $usageContext): Product {
    $calculatedProduct = new Product();
    $calculatedProduct->setId($product->getId());
    $calculatedProduct->setName($product->getName());
    $calculatedProduct->setUnitPrice($product->getUnitPrice());
    $calculatedProduct->setPerPerson($product->getPerPerson());
    $calculatedProduct->setUnit($product->getUnit());
    $calculatedProduct->setCoverage($product->getCoverage());
    $calculatedProduct->setDescription($product->getDescription());
    $calculatedProduct->setIncludes($product->getIncludes());
    $calculatedProduct->setParameters($product->getParameters());
    $calculatedProductContext = $this->populateContext($product->getContext(), $usageContext);
    if (!is_null($calculatedProductContext)) {
      $calculatedProduct->setContext($calculatedProductContext);
    }

    return $calculatedProduct;
  }

  private function populateContext(?ProductContext $context, ?ProductContext $inheritedContext): ?ProductContext {
    $calculatedContext = null;
    if (!is_null($inheritedContext)) {
      $calculatedContext = $inheritedContext;
      if (!is_null($context) && !is_null($context->getSchedule()) && !is_null($context->getSchedule()->getDays()) && count($context->getSchedule()->getDays()) > 0) {
        $calculatedDailyHours = $this->calculatedDailyHoursFromDailyHoursAndContextSchedule($context->getSchedule()->getDays(), $inheritedContext->getSchedule());
        $calculatedSchedule = new ProductPriceSchedule(['days' => $calculatedDailyHours]);
        $calculatedContext = new ProductContext(['schedule' => $calculatedSchedule]);
      }
    } elseif (!is_null($context)) {
      $calculatedContext = $context;
    }

    return $calculatedContext;
  }

  private function calculatedDailyHoursFromDailyHoursAndContextSchedule($dailyHours, ?ProductPriceSchedule $inheritedSchedule): array {
    $dailyHoursArray = $this->populateDailyHoursArray($dailyHours);
    $calculatedDailyHours = $dailyHoursArray['calculatedDailyHours'];
    $contextDailyHours = $dailyHoursArray['contextDailyHours'];
    $allowInherited = $dailyHoursArray['allowInherited'];
    if ($allowInherited && !is_null($inheritedSchedule) && !is_null($inheritedSchedule->getDays()) && count($inheritedSchedule->getDays()) > 0) {
      $inheritedDailyHours = $inheritedSchedule->getDays();
      $filteredDailyHours = $this->filterInheritedDailyHours($inheritedDailyHours, $contextDailyHours);
      $calculatedDailyHours = array_merge($calculatedDailyHours,$filteredDailyHours);
    }

    return $calculatedDailyHours;
  }

  private function populateDailyHoursArray($dailyHours): array {
    $dailyHoursArray = [
      'contextDailyHours' => [],
      'calculatedDailyHours' => [],
      'allowInherited' => true,
    ];
    foreach ($dailyHours as $dailyHour) {
      $dailyHoursArray['contextDailyHours'][$dailyHour->getDay()] = $dailyHour->getSpans();
      $dailyHoursArray['calculatedDailyHours'][] = $dailyHour;
      if ($dailyHour->getDay() == 0) {
        $dailyHoursArray['allowInherited'] = false;
      }
    }

    return $dailyHoursArray;
  }

  private function filterInheritedDailyHours($inheritedDailyHours, $contextDailyHours) {
    $filteredDailyHours = [];
    foreach ($inheritedDailyHours as $inheritedDailyHour) {
      if (!isset($contextDailyHours[$inheritedDailyHour->getDay()])) {
        $filteredDailyHours[] = $inheritedDailyHour;
      }
    }

    return $filteredDailyHours;
  }

  private function setAssetDetails(Asset $asset, Asset $calculatedAsset): Asset {
    $detailsType = $asset->getDetails();
    if (!empty($detailsType)) {
      $getFunctionName = "get".ucfirst($detailsType);
      $setFunctionName = "set".ucfirst($detailsType);
      $calculatedAsset->$setFunctionName($asset->$getFunctionName());
    }
    return $calculatedAsset;
  }

  private function handleContextInheritence(ProductContext $parentContext, ?ProductContext $context): ProductContext {
    if (!empty($context)) {
      if (empty($context->getWebsite())) {
        $context->setWebsite($parentContext->getWebsite());
      }
      if (!empty($schedule = $this->handleScheduleInheritance($parentContext->getSchedule(), $context->getSchedule()))) {
        $context->setSchedule($schedule);
      }
      if (!empty($configs = $this->handleConfigurationInheritance($parentContext->getConfigurations(), $context->getConfigurations()))) {
        $context->setConfigurations($configs);
      }
      if (!empty($amenities = $this->handleAmenityInheritance($parentContext->getAmenities(), $context->getAmenities()))) {
        $context->setAmenities($amenities);
      }
      if (!empty($tags = $this->handleTagInheritance($parentContext->getTags(), $context->getTags()))) {
        $context->setTags($tags);
      }
      if (!empty($menus = $this->handleMenuInheritance($parentContext->getMenus(), $context->getMenus()))) {
        $context->setMenus($menus);
      }
      return $context;
    }
    return $parentContext;
  }

  private function handleScheduleInheritance(?ProductPriceSchedule $parentSchedule, ?ProductPriceSchedule $schedule): ?ProductPriceSchedule {
    $inheritedSchedule = $schedule;
    if (!is_null($parentSchedule)) {
      $inheritedSchedule = $parentSchedule;
      if (!is_null($schedule) && !is_null($schedule->getDays()) && count($schedule->getDays()) > 0) {
        $inheritedDailyHours = $this->calculatedDailyHoursFromDailyHoursAndContextSchedule($schedule->getDays(), $parentSchedule);
        $inheritedSchedule = new ProductPriceSchedule(['days' => $inheritedDailyHours]);
      }
    }
    return $inheritedSchedule;
  }

  private function handleConfigurationInheritance($parentConfigs, $configs) {
    $inheritedConfigs = $configs;
    if (!empty($parentConfigs) && count($parentConfigs) > 0) {
      $inheritedConfigs = $parentConfigs;
      if (!empty($configs) && count($configs) > 0) {
        $inheritedConfigs = $configs;
      }
    }
    return $inheritedConfigs;
  }

  private function handleAmenityInheritance($parentAmenities, $amenities) {
    $inheritedAmenities = $amenities;
    if (!empty($parentAmenities) && count($parentAmenities) > 0) {
      $inheritedAmenities = $parentAmenities;
      if (!empty($amenities) && count($amenities) > 0) {
        $inheritedAmenities = array_merge(collect($parentAmenities)->all(), collect($amenities)->all());
      }
    }
    return $inheritedAmenities;
  }

  private function handleTagInheritance($parentTags, $tags) {
    $inheritedTags = $tags;
    if (!empty($parentTags) && count($parentTags) > 0) {
      $inheritedTags = $parentTags;
      if (!empty($tags) && count($tags) > 0) {
        $inheritedTags = array_merge(collect($parentTags)->all(), collect($tags)->all());
      }
    }
    return $inheritedTags;
  }

  private function handleMenuInheritance($parentMenus, $menus) {
    $inheritedMenus = $menus;
    if (!empty($parentMenus) && count($parentMenus) > 0) {
      $inheritedMenus = $parentMenus;
      if (!empty($menus) && count($menus) > 0) {
        $inheritedMenus = array_merge(collect($parentMenus)->all(), collect($menus)->all());
      }
    }
    return $inheritedMenus;
  }
}
