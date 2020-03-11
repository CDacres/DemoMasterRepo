<?php
namespace App\Models\Tags;

use App\Models\Verticals\Vertical;
use App\LaravelExtensions\Model\LegacyModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class TagLabel extends LegacyModel
{
    public $table = 'tag_language_labels';
    public $timestamps = false;

    protected $appends = ['name'];

    public function scopeFromSlugAndLang($query, $slug, $lang)
    {
        return $query->fromSlug($slug)
            ->fromLang($lang);
    }

    public function scopeFromLang($query, $lang)
    {
        return $query->where('language_code', $lang);
    }

    public function scopeFromSlug($query, $slug)
    {
        return $query->where('quick_slug', $slug);
    }

    public function scopeFromId($query, $id)
    {
        return $query->where('id', $id);
    }

    public function scopeFromVertical($query, $vertical_id)
    {
        return $query->where('quick_vertical_id', $vertical_id);
    }

    public function scopeDefaultsOrdered($query)
    {
        return $query->whereNotNull('default_order')
            ->orderBy('default_order', 'ASC');
    }

    public function scopePreferred($query)
    {
        return $query->where('preferred', 1);
    }

    public function scopeHasQuickSlug($query)
    {
        return $query->whereNotNull('quick_slug');
    }

    public function scopeHasHomeLabel($query)
    {
        return $query->whereNotNull('home_label');
    }

    public function scopeHomeLabelOrdered($query)
    {
        return $query->whereNotNull('home_label_order')
            ->orderBy('home_label_order', 'ASC');
    }

    public function vertical()
    {
        return $this->hasOne(Vertical::class, 'id', 'quick_vertical_id');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class);
    }

    public function metas()
    {
        return $this->hasMany(TagLabelMeta::class, 'tag_language_label_id', 'id');
    }

    static public function generate_quick_columns()
    {
        static::generate_quick_slugs();
        static::generate_quick_verticals();
    }

    static public function generate_quick_slugs()
    {
        $labels = static::get();
        $labels->each(function ($label) {
            $pot_slug = null;
            $pot_meta = TagLabelMeta::where(['tag_language_label_id' => $label->id, 'preferred' => 1])->first();
            if ($pot_meta !== null && $pot_meta->slug !== null)
            {
                $pot_slug = $pot_meta->slug;
            }
            else
            {
                $pot_slug = static::_get_tag_best_slug($label->tag_id, $label->language_code);
            }
            if ($pot_slug !== null)
            {
                $label->quick_slug = $pot_slug;
                $label->save();
            }
        });
        Cache::tags('tag_labels')->flush();
    }

    static private function _get_tag_best_slug($tag_id, $lang)
    {
        $pot_meta = DB::table('tag_language_labels')->leftJoin('tag_language_label_meta', function ($join) {
            $join->on('tag_language_labels.id', 'tag_language_label_meta.tag_language_label_id')
                ->where('tag_language_label_meta.preferred', 1)
                ->where('tag_language_label_meta.enabled', 1);
        })
        ->where('tag_language_labels.tag_id', $tag_id)
        ->where('tag_language_labels.language_code', $lang)
        ->first();
        if ($pot_meta !== null && $pot_meta->slug !== null)
        {
            return $pot_meta->slug;
        }
        else
        {
            $tag = Tag::find($tag_id);
            if ($tag !== null && $tag->parent_id !== null)
            {
                return static::_get_tag_best_slug($tag->parent_id, $lang);
            }
            else
            {
                return null;
            }
        }
    }

    static public function generate_quick_verticals()
    {
        $labels = static::with(['tag'])->get();
        $labels->each(function ($label) {
            if (!is_null($label->tag->vertical_id))
            {
                $label->quick_vertical_id = $label->tag->vertical_id;
            }
            else
            {
                $root = $label->tag->ancestors->first();
                $label->quick_vertical_id = $root->vertical_id;
            }
            $label->save();
        });
        Cache::tags('tag_labels')->flush();
    }

    public function getNameAttribute()
    {
        return $this->tag->name;
    }
}
