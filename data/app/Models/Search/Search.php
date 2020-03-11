<?php

namespace App\Models\Search;

use App\LaravelExtensions\Model\MyModel;
use App\Contracts\Facades\ChannelLog as Log;

use App\Helpers\TokenHelper;

class Search extends MyModel
{
    public $timestamps = false;
    public $table = 'search';
    protected $guarded = [];
    protected $casts = [
        'lat' => 'float',
        'long' => 'float',
        'ne_lon' => 'float',
        'ne_lat' => 'float',
        'sw_lon' => 'float',
        'sw_lat' => 'float',
    ];

    public function amenities()
    {
        return $this->hasMany(SearchAmenity::class, 'id', 'search_id');
    }

    public function attributes()
    {
        return $this->hasMany(SearchAttribute::class, 'id', 'search_id');
    }

    public function configurations()
    {
        return $this->hasMany(SearchConfiguration::class, 'id', 'search_id');
    }

    public function results()
    {
        return $this->hasMany(SearchResult::class, 'id', 'search_id');
    }

    public function tags()
    {
        return $this->hasOne(SearchTag::class, 'id', 'search_id');
    }

    public function save_from_helper($helper)
    {
        $this->generate_from_helper($helper);
        if ($this->_generate_token_and_attempt_save(3))
        {
            $this->_save_array_filters_from_helper($helper);
            $this->_save_results_from_helper($helper);
            return true;
        }
        else
        {
            Log::error('Failed to save search. Investigate.');
            return false;
        }
    }

    public function generate_from_helper($helper)
    {
        $this->fill($helper->get_search_attributes());
    }

    private function _save_results_from_helper($helper)
    {
        $results = SearchResult::collectionFromArray($this->_generate_results_from_array($helper->get_results_as_array()));
        $results->saveAll();
    }

    private function _generate_results_from_array($result_array)
    {
        $search_id = $this->id;
        return array_map(function ($value) use ($search_id) {
            $value['search_id'] = $search_id;
            return $value;
        }, $result_array);
    }

    private function _save_array_filters_from_helper($helper)
    {
        $this->amenities()->createMany($this->_generate_array_filter_children_from_id_array($helper->get_amenities(false), 'amenity_id'));
        $this->configurations()->createMany($this->_generate_array_filter_children_from_id_array($helper->get_configurations(), 'configuration_id'));
        $this->attributes()->createMany($this->_generate_array_filter_children_from_id_array($helper->get_atts(), 'attribute_id'));
    }

    private function _generate_array_filter_children_from_id_array($children_array, $column_name)
    {
        $search_id = $this->id;
        return array_map(function ($value) use ($column_name, $search_id) {
            return [
                $column_name => $value,
                'search_id' => $search_id
            ];
        }, $children_array);
    }

//    private function _handle_tag($search_id, $tagArrayString)
//    {
//        if (!is_null($tagArrayString))
//        {
//            $tagArray = json_decode($tagArrayString);
//            foreach ($tagArray as $tagItem)
//            {
//                $tags = new SearchTags();
//                $attributes = [
//                    'search_id' => $search_id,
//                    'tag_id' => $tagItem
//                ];
//                $tags->fill($attributes);
//                $tags->save();
//            }
//        }
//    }

    private function _generate_token_and_attempt_save($tries)
    {
        $this->_generate_token();
        try {
            $this->save();
            return true;
        }
        catch (Exception $ex)
        {
            if ($tries > 0)
            {
                return $this->_generate_token_and_attempt_save($tries - 1);
            }
            else
            {
                return false;
            }
        }
    }

    private function _generate_token()
    {
        $this->token = substr((new TokenHelper())->add_token(), -8);
    }
}