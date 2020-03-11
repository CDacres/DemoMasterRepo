<?php
namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class AttributeLanguage extends LegacyModel
{
    public $timestamps = false;
    public $table = 'attribute_language';

    public function scopeFromLang($query, $lang)
    {
        return $query->where('lang_code', $lang);
    }
}