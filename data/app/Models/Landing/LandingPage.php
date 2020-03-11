<?php
namespace App\Models\Landing;

use App\Models\Tags\Tag;
use App\LaravelExtensions\Model\LegacyModel;

use App\Transformers\LandingPageTransformer;

class LandingPage extends LegacyModel
{
    static protected $defaultTransformer = LandingPageTransformer::class;
    static protected $defaultSerialisationLabel = 'landing_pages';
    public $table = 'landing_pages';
    public $timestamps = false;
    protected $hidden = ['redirect'];
    protected $appends = ['redirect_url'];

    public function landing_page_lang()
    {
        return $this->hasMany(LandingPageLanguage::class);
    }

    public function attribute()
    {
        return $this->hasOne(Attribute::class, 'id', 'attribute_id');
    }

    public function location()
    {
        return $this->hasOne(Location::class, 'id', 'location_id');
    }

    public function tag()
    {
        return $this->hasOne(Tag::class, 'id', 'tag_id');
    }

    public function redirect()
    {
        return $this->hasOne(LandingPage::class, 'id', 'redirect_id');
    }

    public function scopeWhereBrowse($query)
    {
        return $query->whereHas('location', function ($query) {
            $query->isCountry();
        });
    }

    public function scopeWhereTag($query, $tag_id)
    {
        return $query->where('tag_id', $tag_id);
    }

    public function scopeWithLang($query, $lang)
    {
        return $query->with(['landing_page_lang' => function ($query) use ($lang) {
            $query->fromLang($lang)->with(['landing_page_url' => function ($query) {
                $query->preferred();
            }]);
        }]);
    }

    public function scopeWhereLang($query, $lang)
    {
        return $query->whereHas('landing_page_lang', function ($query) use ($lang) {
            $query->fromLang($lang)->with(['landing_page_url' => function ($query) {
                $query->preferred();
            }]);
        });
    }

    public function scopeWithAttrLang($query, $lang)
    {
        return $query->with(['attribute' => function ($query) use ($lang) {
            $query->fromLang($lang);
        }]);
    }

    public function scopeWithTagLabel($query, $lang, $tag_label_id = null, $preferred = false)
    {
        return $query->with(['tag' => function ($query) use ($lang, $tag_label_id, $preferred) {
            $query->with(['labels' => function ($query) use ($lang, $tag_label_id, $preferred) {
                $query->fromLang($lang);
                if ($tag_label_id != null)
                {
                    $query->fromId($tag_label_id);
                }
                if ($preferred)
                {
                    $query->preferred();
                }
                $query->with('metas');
            }]);
        }]);
    }

    public function scopeWhereTagLabel($query, $lang, $tag_label_id = null, $preferred = false)
    {
        return $query->whereHas('tag', function ($query) use ($lang, $tag_label_id, $preferred) {
            $query->whereHas('labels', function ($query) use ($lang, $tag_label_id, $preferred) {
                $query->fromLang($lang);
                if ($tag_label_id != null)
                {
                    $query->fromId($tag_label_id);
                }
                if ($preferred)
                {
                    $query->preferred();
                }
                $query->with('metas');
            });
        });
    }

    public function scopeWhereLocation($query, $location_id = null)
    {
        return $query->whereHas('location', function ($query) use ($location_id) {
            if ($location_id != null)
            {
                $query->fromId($location_id);
            }
        });
    }

    public function getRedirectUrlAttribute()
    {
        $redirect_url = null;
        if ($this->redirect_id != null)
        {
            $redirect_url = $this->redirect->landing_page_lang->first()->landing_page_url->first()->url;
        }
        return $redirect_url;
    }
}