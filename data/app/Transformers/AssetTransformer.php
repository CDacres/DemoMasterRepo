<?php

namespace App\Transformers;

use App\Models\Asset;
use Illuminate\Support\Collection;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

abstract class AssetTransformer extends ExtendedTransformer
{
    protected $availableIncludes = [
        'facilities',
        'privileges',
        'images',
        'cancellation_terms',
        'parent'
    ];

    public function __construct(\Illuminate\Contracts\Auth\Access\Authorizable $user = null)
    {
        parent::__construct($user);
    }

    public function includeFacilities(Asset $asset)
    {
        $amenities = $asset->facilities;
        return $this->collection($amenities, new FacilityTransformer, 'facilities');
    }

    public function includeParent(Asset $asset)
    {
        $parent = $asset->parent;
        return $this->quickItem($parent);
    }

    public function includePrivileges(Asset $asset)
    {
        $users = $asset->privileges;
        return $this->collection($users, new AssetUserPrivilegesTransformer($this->contextUser), 'privileges');
    }

    public function includeImages(Asset $asset)
    {
        $images = $asset->images;
        return $this->collection($images, new AssetImageTransformer, 'asset_images');
    }

    public function includeCancellationTerms(Asset $asset)
    {
        $terms = $asset->cancellation_terms;
        return $this->collection($terms, new CancellationTermTransformer, 'cancellation_terms');
    }

    public function transformOpeningPeriods(Collection $opening_periods)
    {
        return $opening_periods->mapToGroups(function ($period) {
            return [
                (string) $period->day->name => [
                    'start' => (int) $period->start,
                    'end' => (int) $period->end,
                    'minimum_minutes' => (int) $period->minimum_minutes,
                    'slot_length_minutes' => (int) $period->slot_length_minutes
                ]
            ];
        })
        ->map(function ($group) {
            return $group->keyBy(function ($item, $key) {
                return (string) ($key + 1);
            });
        })->toArray();
    }
}