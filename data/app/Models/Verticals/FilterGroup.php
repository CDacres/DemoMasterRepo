<?php
namespace App\Models\Verticals;
use App\LaravelExtensions\Model\MyModel;

class FilterGroup extends MyModel
{
    use \Waavi\Translation\Traits\Translatable;

    protected $translatableAttributes = [
        'label',
        'collapse',
        'expand'
    ];
    public $timestamps = false;
    public $table = 'filter_groups';
    protected $appends = [
        'title',
        'inputType',
        'collapseText',
        'expandText'
    ];
    protected $hidden = [
        'title',
        'inputType',
        'collapseText',
        'expandText'
    ];

    public function filters()
    {
        return $this->hasMany(Filter::class)
            ->orderBy('order', 'asc');
    }

    public function getTitleAttribute()
    {
        return $this->label;
    }

    public function getInputTypeAttribute()
    {
        return $this->type;
    }

    public function getCollapseTextAttribute()
    {
        $text = $this->collapse;
        return (($text === "")?null:$text);
    }

    public function getExpandTextAttribute()
    {
        $text = $this->expand;
        return (($text === "")?null:$text);
    }
}