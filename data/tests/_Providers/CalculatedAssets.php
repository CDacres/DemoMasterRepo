<?php

namespace Tests\_Providers;

use App\Types\Asset;
use App\Types\DailyHours;
use App\Types\DaySpan;
use App\Types\Id;
use App\Types\Product;
use App\Types\ProductContext;
use App\Types\ProductPriceSchedule;
use App\Types\Usage;

class CalculatedAssets {

    public $resultData = [
        'noContext' => '{"id":{"value":"1"},"name":"TestAsset","usages":[{"name":"TestUsage","products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct"},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2"}]},{"name":"TestUsage2","products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3"},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4"}]}]}',
        'assetHasContextOnly' => '{"id":{"value":"1"},"name":"TestAsset","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"usages":[{"name":"TestUsage","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}}]},{"name":"TestUsage2","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}}]}]}',
        'usageHasContextOnly' => '{"id":{"value":"1"},"name":"TestAsset","usages":[{"name":"TestUsage","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}}]},{"name":"TestUsage2","products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3"},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4"}]}]}',
        'productHasContextOnly' => '{"id":{"value":"1"},"name":"TestAsset","usages":[{"name":"TestUsage","products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2"}]},{"name":"TestUsage2","products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3"},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4"}]}]}',
        'assetAllWeek9To5Usage1AllWeek8To6Product3AllWeek8To6' => '{"id":{"value":"1"},"name":"TestAsset","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"usages":[{"name":"TestUsage","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}},"products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}}},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}}}]},{"name":"TestUsage2","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}}},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}}}]}]}',
        'assetAllWeek9To5Usage1Friday8To11Product1Friday8To6Usage2ClosedWeekendProduct3Friday8To11' => '{"id":{"value":"1"},"name":"TestAsset","context":{"schedule":{"days":[{"spans":[{"start":540,"end":1020}]}]}},"usages":[{"name":"TestUsage","context":{"schedule":{"days":[{"day":"FRIDAY","spans":[{"start":480,"end":1380}]},{"spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct","context":{"schedule":{"days":[{"day":"FRIDAY","spans":[{"start":480,"end":1080}]},{"spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2","context":{"schedule":{"days":[{"day":"FRIDAY","spans":[{"start":480,"end":1380}]},{"spans":[{"start":540,"end":1020}]}]}}}]},{"name":"TestUsage2","context":{"schedule":{"days":[{"day":"SATURDAY"},{"day":"SUNDAY"},{"spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3","context":{"schedule":{"days":[{"day":"FRIDAY","spans":[{"start":480,"end":1380}]},{"day":"SATURDAY"},{"day":"SUNDAY"},{"spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4","context":{"schedule":{"days":[{"day":"SATURDAY"},{"day":"SUNDAY"},{"spans":[{"start":540,"end":1020}]}]}}}]}]}',
        'assetMonToFri9To5Weekend10To4Usage1ClosedWeekendProduct1Friday8To11Usage2AllWeek8To6' => '{"id":{"value":"1"},"name":"TestAsset","context":{"schedule":{"days":[{"day":"MONDAY","spans":[{"start":540,"end":1020}]},{"day":"TUESDAY","spans":[{"start":540,"end":1020}]},{"day":"WEDNESDAY","spans":[{"start":540,"end":1020}]},{"day":"THURSDAY","spans":[{"start":540,"end":1020}]},{"day":"FRIDAY","spans":[{"start":540,"end":1020}]},{"day":"SATURDAY","spans":[{"start":600,"end":960}]},{"day":"SUNDAY","spans":[{"start":600,"end":960}]}]}},"usages":[{"name":"TestUsage","context":{"schedule":{"days":[{"day":"SATURDAY"},{"day":"SUNDAY"},{"day":"MONDAY","spans":[{"start":540,"end":1020}]},{"day":"TUESDAY","spans":[{"start":540,"end":1020}]},{"day":"WEDNESDAY","spans":[{"start":540,"end":1020}]},{"day":"THURSDAY","spans":[{"start":540,"end":1020}]},{"day":"FRIDAY","spans":[{"start":540,"end":1020}]}]}},"products":[{"id":{"value":"01112222333354445555666677778801"},"name":"TestProduct","context":{"schedule":{"days":[{"day":"FRIDAY","spans":[{"start":480,"end":1380}]},{"day":"SATURDAY"},{"day":"SUNDAY"},{"day":"MONDAY","spans":[{"start":540,"end":1020}]},{"day":"TUESDAY","spans":[{"start":540,"end":1020}]},{"day":"WEDNESDAY","spans":[{"start":540,"end":1020}]},{"day":"THURSDAY","spans":[{"start":540,"end":1020}]}]}}},{"id":{"value":"01112222333354445555666677778802"},"name":"TestProduct2","context":{"schedule":{"days":[{"day":"SATURDAY"},{"day":"SUNDAY"},{"day":"MONDAY","spans":[{"start":540,"end":1020}]},{"day":"TUESDAY","spans":[{"start":540,"end":1020}]},{"day":"WEDNESDAY","spans":[{"start":540,"end":1020}]},{"day":"THURSDAY","spans":[{"start":540,"end":1020}]},{"day":"FRIDAY","spans":[{"start":540,"end":1020}]}]}}}]},{"name":"TestUsage2","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}},"products":[{"id":{"value":"01112222333354445555666677778803"},"name":"TestProduct3","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}}},{"id":{"value":"01112222333354445555666677778804"},"name":"TestProduct4","context":{"schedule":{"days":[{"spans":[{"start":480,"end":1080}]}]}}}]}]}',
    ];

    private function buildAsset($scenario) {
        $asset1 = new Asset();
        $usage1 = new Usage();
        $usage2 = new Usage();
        $product1 = new Product();
        $product2 = new Product();
        $product3 = new Product();
        $product4 = new Product();
        $id1 = new Id();
        $id2 = new Id();
        $id3 = new Id();
        $id4 = new Id();
        $id5 = new Id();
        $daySpan1 = new DaySpan(['start' => 540,'end' => 1020]);
        $daySpan2 = new DaySpan(['start' => 480,'end' => 1080]);
        $daySpan3 = new DaySpan(['start' => 480,'end' => 1380]);
        $daySpan4 = new DaySpan(['start' => 600,'end' => 960]);
        $dailyHours1 = new DailyHours(['spans' => [$daySpan1]]);
        $dailyHours2 = new DailyHours(['spans' => [$daySpan2]]);
        $dailyHours3 = new DailyHours(['day' => 6,'spans' => [$daySpan3]]);
        $dailyHours4 = new DailyHours(['day' => 6,'spans' => [$daySpan2]]);
        $dailyHours5 = new DailyHours(['day' => 7]);
        $dailyHours6 = new DailyHours(['day' => 1]);
        $dailyHours7 = new DailyHours(['day' => 2,'spans' => [$daySpan1]]);
        $dailyHours8 = new DailyHours(['day' => 3,'spans' => [$daySpan1]]);
        $dailyHours9 = new DailyHours(['day' => 4,'spans' => [$daySpan1]]);
        $dailyHours10 = new DailyHours(['day' => 5,'spans' => [$daySpan1]]);
        $dailyHours11 = new DailyHours(['day' => 6,'spans' => [$daySpan1]]);
        $dailyHours12 = new DailyHours(['day' => 7,'spans' => [$daySpan4]]);
        $dailyHours13 = new DailyHours(['day' => 1,'spans' => [$daySpan4]]);
        $schedule1 = new ProductPriceSchedule(['days' => [$dailyHours1]]);
        $schedule2 = new ProductPriceSchedule(['days' => [$dailyHours2]]);
        $schedule3 = new ProductPriceSchedule(['days' => [$dailyHours3]]);
        $schedule4 = new ProductPriceSchedule(['days' => [$dailyHours4]]);
        $schedule5 = new ProductPriceSchedule(['days' => [$dailyHours5,$dailyHours6]]);
        $schedule6 = new ProductPriceSchedule(['days' => [$dailyHours7,$dailyHours8,$dailyHours9,$dailyHours10,$dailyHours11,$dailyHours12,$dailyHours13]]);
        $context1 = new ProductContext(['schedule' => $schedule1]);
        $context2 = new ProductContext(['schedule' => $schedule2]);
        $context3 = new ProductContext(['schedule' => $schedule3]);
        $context4 = new ProductContext(['schedule' => $schedule4]);
        $context5 = new ProductContext(['schedule' => $schedule5]);
        $context6 = new ProductContext(['schedule' => $schedule6]);

        switch ($scenario) {
            case 'assetHasContextOnly':
                $asset1->setContext($context1);
                break;
            case 'usageHasContextOnly':
                $usage1->setContext($context1);
                break;
            case 'productHasContextOnly':
                $product1->setContext($context1);
                break;
            case 'assetAllWeek9To5Usage1AllWeek8To6Product3AllWeek8To6':
                $asset1->setContext($context1);
                $usage1->setContext($context2);
                $product3->setContext($context2);
                break;
            case 'assetAllWeek9To5Usage1Friday8To11Product1Friday8To6Usage2ClosedWeekendProduct3Friday8To11':
                $asset1->setContext($context1);
                $usage1->setContext($context3);
                $product1->setContext($context4);
                $usage2->setContext($context5);
                $product3->setContext($context3);
                break;
            case 'assetMonToFri9To5Weekend10To4Usage1ClosedWeekendProduct1Friday8To11Usage2AllWeek8To6':
                $asset1->setContext($context6);
                $usage1->setContext($context5);
                $product1->setContext($context3);
                $usage2->setContext($context2);
                break;
        }

        $id2->setValue("01112222333354445555666677778801");
        $product1->setId($id2);
        $product1->setName("TestProduct");
        $id3->setValue("01112222333354445555666677778802");
        $product2->setId($id3);
        $product2->setName("TestProduct2");
        $id4->setValue("01112222333354445555666677778803");
        $product3->setId($id4);
        $product3->setName("TestProduct3");
        $id5->setValue("01112222333354445555666677778804");
        $product4->setId($id5);
        $product4->setName("TestProduct4");
        $usage1->setName("TestUsage");
        $usage1->setProducts([$product1, $product2]);
        $usage2->setName("TestUsage2");
        $usage2->setProducts([$product3, $product4]);
        $id1->setValue("1");
        $asset1->setId($id1);
        $asset1->setName("TestAsset");
        $asset1->setUsages([$usage1,$usage2]);

        return $asset1;
    }

    public function fetchDataNoContext() {
        return [$this->buildAsset('noContext'), $this->resultData['noContext']];
    }

    public function fetchDataAssetHasContextOnly() {
        return [$this->buildAsset('assetHasContextOnly'), $this->resultData['assetHasContextOnly']];
    }

    public function fetchDataUsageHasContextOnly() {
        return [$this->buildAsset('usageHasContextOnly'), $this->resultData['usageHasContextOnly']];
    }

    public function fetchDataProductHasContextOnly() {
        return [$this->buildAsset('productHasContextOnly'), $this->resultData['productHasContextOnly']];
    }

    public function fetchDataAssetAllWeek9To5Usage1AllWeek8To6Product3AllWeek8To6() {
        return [$this->buildAsset('assetAllWeek9To5Usage1AllWeek8To6Product3AllWeek8To6'), $this->resultData['assetAllWeek9To5Usage1AllWeek8To6Product3AllWeek8To6']];
    }

    public function fetchDataAssetAllWeek9To5Usage1Friday8To11Product1Friday8To6Usage2ClosedWeekendProduct3Friday8To11() {
        return [$this->buildAsset('assetAllWeek9To5Usage1Friday8To11Product1Friday8To6Usage2ClosedWeekendProduct3Friday8To11'), $this->resultData['assetAllWeek9To5Usage1Friday8To11Product1Friday8To6Usage2ClosedWeekendProduct3Friday8To11']];
    }

    public function fetchDataAssetMonToFri9To5Weekend10To4Usage1ClosedWeekendProduct1Friday8To11Usage2AllWeek8To6() {
        return [$this->buildAsset('assetMonToFri9To5Weekend10To4Usage1ClosedWeekendProduct1Friday8To11Usage2AllWeek8To6'), $this->resultData['assetMonToFri9To5Weekend10To4Usage1ClosedWeekendProduct1Friday8To11Usage2AllWeek8To6']];
    }
}