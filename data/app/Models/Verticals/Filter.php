<?php
namespace App\Models\Verticals;
use App\LaravelExtensions\Model\MyModel;

class Filter extends MyModel
{
    use \Waavi\Translation\Traits\Translatable;

    protected $translatableAttributes = [
        'label',
        'subtitle'
    ];
    public $timestamps = false;
    public $table = 'filters';
    protected $appends = [
        'title',
        'data',
        'options',
        'contextId'
    ];
    protected $hidden = [
        'title',
        'data',
        'options',
        'contextId'
    ];

    public function getTitleAttribute()
    {
        return $this->label;
    }

    public function getDataAttribute()
    {
        return json_decode($this->data_json, true);
    }

    public function getOptionsAttribute()
    {
        return json_decode($this->options_json, true);
    }

    public function getContextIdAttribute()
    {
        return $this->attributes['context_id'];
    }
}