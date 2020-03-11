<?php
namespace App\Models\Verticals;
use App\LaravelExtensions\Model\LegacyModel;
use App\Models\Tags\TagLabel;

class Vertical extends LegacyModel
{
    use \Waavi\Translation\Traits\Translatable;

    protected $translatableAttributes = ['name'];
    public $timestamps = false;
    public $table = 'verticals';
    public $appends = [
        'filterGroupCollections',
        'slug',
        'title',
        'layoutType'
    ];
    public $hidden = [
        'filterGroupCollections',
        'slug',
        'title',
        'layoutType'
    ];

    const MEETING = 1;
    const OFFICE = 2;
    const PARTY = 3;
    const DINING = 4;
    const WEDDING = 5;
    const ART = 6;
    const SPORT = 7;
    const POPUP = 8;
    const ACTIVITY = 9;

    public function fgcs()
    {
        return $this->hasMany(FilterGroupBatch::class);
    }

    public function representative_tag_label()
    {
        return $this->hasOne(TagLabel::class, 'tag_id', 'representative_tag_id')
            ->where('language_code', app('translator')->getLocale());
    }

    public function getFilterGroupCollectionsAttribute()
    {
        return $this->fgcs;
    }

    public function getSlugAttribute()
    {
        if ($this->representative_tag_label === null)
        {
            return null;
        }
        else
        {
            return $this->representative_tag_label->quick_slug;
        }
    }

    public function getTitleAttribute()
    {
        return $this->name;
    }

    public function getLayoutTypeAttribute()
    {
        return $this->attributes['layout_type'];
    }
}