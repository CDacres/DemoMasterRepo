<?php
namespace App\Models\Verticals;
use App\LaravelExtensions\Model\MyModel;

class FilterGroupBatch extends MyModel
{
    use \Waavi\Translation\Traits\Translatable;

    protected $translatableAttributes = ['label'];
    public $timestamps = false;
    public $table = 'filter_group_collections';
    protected $appends = [
        'buttonText',
        'buttonType',
        'panelType',
        'filterGroups'
    ];
    protected $hidden = [
        'buttonText',
        'buttonType',
        'panelType',
        'filterGroups'
    ];

    public function fgs()
    {
        return $this->hasMany(FilterGroup::class, 'filter_group_collection_id');
    }

    public function getFilterGroupsAttribute()
    {
        return $this->fgs;
    }

    public function getButtonTextAttribute()
    {
        return $this->label;
    }

    public function getButtonTypeAttribute()
    {
        $json_object = json_decode($this->styling_json, true);
        return $json_object['buttonType'];
    }

    public function getPanelTypeAttribute()
    {
        $json_object = json_decode($this->styling_json, true);
        return $json_object['panelType'];
    }
}