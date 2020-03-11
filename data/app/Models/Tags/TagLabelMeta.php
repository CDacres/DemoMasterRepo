<?php
namespace App\Models\Tags;

use App\LaravelExtensions\Model\LegacyModel;

class TagLabelMeta extends LegacyModel
{
    public $table = 'tag_language_label_meta';
    public $timestamps = false;

    protected $appends = [
        'tag_id',
        'label',
        'canonical_slug',
        'quick_vertical_id'
    ];

    protected $hidden = ['tag_label'];

    public function keywords()
    {
        return $this->hasMany(TagLabelMetaKeyword::class, 'tag_language_label_meta_id', 'id');
    }

    public function scopeFromSlugAndLang($query, $tag_slug, $lang)
    {
        return $query->fromSlug($tag_slug)
            ->fromLang($lang);
    }

    public function scopeFromIdAndLang($query, $tag_id, $lang)
    {
        return $query->fromId($tag_id)
            ->fromLang($lang);
    }

    public function scopeFromLang($query, $lang)
    {
        return $query->whereHas('tag_label', function ($q) use ($lang) {
            $q->where('language_code', $lang);
        });
    }

    public function scopeFromId($query, $tag_id)
    {
        return $query->whereHas('tag_label', function ($q) use ($tag_id) {
            $q->where('tag_id', $tag_id)->preferred();
        });
    }

    public function scopeFromSlug($query, $slug)
    {
        return $query->where('slug', $slug);
    }

    public function scopePreferred($query)
    {
        return $query->where('preferred', 1);
    }

    public function tag_label()
    {
        return $this->belongsTo(TagLabel::class, 'tag_language_label_id', 'id');
    }

    public function getTagIdAttribute()
    {
        return $this->tag_label->tag_id;
    }

    public function getLabelAttribute()
    {
        return $this->tag_label->label;
    }

    public function getCanonicalSlugAttribute()
    {
        return $this->tag_label->quick_slug;
    }

    public function getQuickVerticalIdAttribute()
    {
        return $this->tag_label->quick_vertical_id;
    }
}