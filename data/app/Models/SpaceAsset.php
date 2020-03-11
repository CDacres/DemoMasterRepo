<?php

namespace App\Models;

abstract class SpaceAsset extends DetailsAsset
{
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->hidden = array_merge(['configs'], $this->hidden);
        $this->appends = array_merge([
            'max_capacity_string',
            'max_capacity',
            'atts',
            'tags',
            'is_favourite',
            'title',
            'desc',
            'listing_hourly_rate',
            'currency',
            'review_count',
            'review_score',
            'review_count_string',
            'lat',
            'long',
            'url',
            'room_id',
            'asset_id',
            'venue_id',
            'asset_edit_url',
            'venue_edit_url',
            'ranking'
        ], $this->appends);
    }

    public function scopeOrderByNewest($query)
    {
        $room_table = Room::tableName();
        $this_table = static::tableName();
        return $query
            ->join($room_table . ' as deets', $this_table . '.id', 'deets.asset_id')
            ->select($this_table . '.*')
            ->orderBy('deets.venue_id', 'DESC')
            ->orderBy('deets.id', 'DESC');
    }

    public function scopeWithIsFavouriteForUser($query, $user_id)
    {
        return $query->with(['favourites' => function ($query) use ($user_id) {
            $query->select('enabled', 'asset_id')->where('user_id', $user_id);
        }]);
    }

    public function configs()
    {
        return $this->belongsToMany(Configuration::class, 'room_configuration', 'asset_id', 'configuration_id')->withPivot('max_capacity');
    }

    public function favourites()
    {
        return $this->hasMany(AssetFavourite::class, 'asset_id', 'id');
    }

    public function getMaxCapacityAttribute()
    {
        return $this->configs->map(function ($item, $key) {
            return $item->pivot->max_capacity;
        })->max();
    }

    public function getIsFavouriteAttribute()
    {
        $is_favourite = false;
        if ($this->favourites->count() > 0)
        {
            $is_favourite = $this->favourites->contains(function ($item) {
                return $item->enabled == 1;
            });
        }
        return $is_favourite;
    }

    public function getAttsAttribute()
    {
        return $this->asset_attributes_deprecated->filter(function ($item) {
            return $item->pivot->enabled;
        })->map(function ($item) {
            return $item->id;
        });
    }

    public function getTagsAttribute()
    {
        return $this->asset_tags_deprecated->filter(function ($item) {
            return $item->pivot->enabled;
        })->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'ranking' => $item->pivot->ranking,
                'suppressed' => $item->pivot->suppressed
            ];
        });
    }

    public function getMaxCapacityStringAttribute()
    {
        return $this->maxCapacityString($this->max_capacity);
    }

    public function maxCapacityString($max_cap)
    {
        return trans_choice('assets.max_capacity', $max_cap, ['number' => $max_cap]);
    }

    public function getNumOfDesksAttribute()
    {
        return $this->details->num_of_desks;
    }

    public function getNumOfDesksStringAttribute()
    {
        return $this->numOfDesksString($this->num_of_desks);
    }

    public function numOfDesksString($num_of_desks)
    {
        return trans_choice('assets.num_desks', $num_of_desks, ['number' => $num_of_desks]);
    }

    public function getAssetIdAttribute()
    {
        return $this->id;
    }

    public function getReviewCountStringAttribute()
    {
        return ($this->review_count === null || $this->review_count === 0) ? null : trans_choice('assets.reviews', $this->review_count, ['number' => $this->review_count]);
    }
}