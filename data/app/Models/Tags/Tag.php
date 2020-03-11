<?php
namespace App\Models\Tags;

use Kalnoy\Nestedset\NodeTrait;
use App\Models\Verticals\Vertical;
use App\Transformers\TagTransformer;
use \App\LaravelExtensions\Model\MyModel;
use App\Scopes\EnabledScope;

class Tag extends MyModel
{
    use NodeTrait;

    protected $table = 'tags';
    protected $hidden = [
        'lft',
        'rgt',
        'depth',
        'created_at',
        'updated_at'
    ];
    protected $appended = [
        'asset_type',
        'vertical_id'
    ];
    static protected $defaultTransformer = TagTransformer::class;
    static protected $defaultSerialisationLabel = 'tags';

    const OFFICE = 2;
    const MEETING = 152;
    const EVENT = 121;

    public function scopeFromSlugAndLang($query, $tag_slug, $lang)
    {
        $label_table = TagLabel::tableName();
        $meta_table = TagLabelMeta::tableName();
        return $query->fromLang($lang)
            ->join($meta_table, $label_table . '.id', $meta_table . '.tag_language_label_id')
            ->where($meta_table . '.slug', $tag_slug);
    }

    public function scopeFromLang($query, $lang)
    {
        $label_table = TagLabel::tableName();
        return $query->withLabel()
            ->where($label_table . '.language_code', $lang);
    }

    public function scopeWithLabel($query)
    {
        $label_table = TagLabel::tableName();
        $tag_table = Tag::tableName();
        return $query->addSelect($tag_table . '.*', $label_table . '.quick_slug')
            ->join($label_table, $tag_table . '.id', $label_table . '.tag_id');
    }

    public function labels()
    {
        return $this->hasMany(TagLabel::class, 'tag_id', 'id');
    }

    public function verticals()
    {
        return $this->belongsToMany(Vertical::class, 'tag_vertical')->withoutGlobalScope(EnabledScope::class);
    }

    public function allows_fallback()
    {
        return $this->search_falls_back && $this->parent_id !== null && is_integer($this->parent_id);
    }

    public function get_parent_id()
    {
        return $this->parent_id;
    }

    public function getAssetTypeAttribute()
    {
        return \App\Models\Room::class;
    }

    public function getVerticalIdAttribute()
    {
        $item = $this->verticals->first();
        return ((is_null($item))?null:$item->id);
    }

    public function getLftName()
    {
        return 'lft';
    }

    public function getRgtName()
    {
        return 'rgt';
    }

    // Specify parent id attribute mutator
    public function setParentAttribute($value)
    {
        $this->setParentIdAttribute($value);
    }
}