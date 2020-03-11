<?php

namespace App\Models\Search;
use App\Models\Asset;

class AssetResult extends SearchResult
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->hidden = array_merge([
            'asset',
            'ranking'
        ], $this->hidden);
        $this->appends = array_merge([
            'title',
            'desc',
            'listing_hourly_rate',
            'currency',
            'review_count',
            'review_score',
            'lat',
            'long',
            'atts',
            'url',
            'images',
            'type',
            'tags',
            'max_capacity_string',
            'review_count_string',
            'venue_id',
            'asset_edit_url',
            'venue_edit_url',
            'venue_agreed_to_list',
            'is_favourite'
        ], $this->appends);
    }

    public function scopeWithAssetDetails($query)
    {
        return $query->with([
            'asset',
            'asset.asset_tags_deprecated',
            'asset.configs',
            'asset.asset_attributes_deprecated',
            'asset.images'
        ]);
    }

    public function scopeWithIsFavouriteForUser($query, $user_id)
    {
        return $query->with(['asset.favourites' => function ($query) use ($user_id) {
            $query->select('enabled', 'asset_id')->where('user_id', $user_id);
        }]);
    }

    public function asset()
    {
        return $this->hasOne(Asset::class, 'id', 'asset_id');
    }

    public function getIsFavouriteAttribute()
    {
        $is_favourite = false;
        if ($this->asset->favourites->count() > 0)
        {
            $is_favourite = $this->asset->favourites->contains(function ($item) {
                return $item->enabled == 1;
            });
        }
        return $is_favourite;
    }

    public function getImagesAttribute()
    {
        return $this->asset->images;
    }

    public function getTitleAttribute()
    {
        return $this->asset->title;
    }

    public function getDescAttribute()
    {
        return $this->asset->desc;
    }

    public function getListingHourlyRateAttribute()
    {
        return ceil(($this->hourly_rate === null)?(($this->daily_rate === null)?null:$this->daily_rate):$this->hourly_rate);
    }

    public function getCurrencyAttribute()
    {
        return $this->asset->currency;
    }

    public function getReviewCountAttribute()
    {
        return $this->asset->review_count;
    }

    public function getReviewScoreAttribute()
    {
        return $this->asset->review_score;
    }

    public function getLatAttribute()
    {
        return $this->asset->lat;
    }

    public function getLongAttribute()
    {
        return $this->asset->long;
    }

    public function getAttsAttribute()
    {
        return $this->asset->atts;
    }

    public function getTagsAttribute()
    {
        return $this->asset->tags;
    }

    public function getUrlAttribute()
    {
        return $this->asset->url;
    }

    public function getAssetEditUrlAttribute()
    {
        return $this->asset->asset_edit_url;
    }

    public function getVenueEditUrlAttribute()
    {
        return $this->asset->venue_edit_url;
    }

    public function getVenueAgreedToListAttribute()
    {
        return $this->asset->venue_agreed_to_list;
    }

    public function getTypeAttribute()
    {
        return $this->asset->type;
    }

    public function getVenueIdAttribute()
    {
        return $this->asset->venue_id;
    }

    public function getMaxCapacityStringAttribute()
    {
        return $this->asset->maxCapacityString($this->max_capacity);
    }

    public function getReviewCountStringAttribute()
    {
        return $this->asset->review_count_string;
    }
}