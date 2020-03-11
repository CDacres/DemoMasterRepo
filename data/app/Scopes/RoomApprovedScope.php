<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class RoomApprovedScope implements Scope
{
    public function apply(Builder $builder, Model $model)
    {
        $modelTableName = $model->getTable();
        $builder->where($modelTableName . '.approved', 1)->where($modelTableName . '.status', 1)->whereHas('venue', function($query) {
            $query->where('venues.approved', 1)->whereHas('company', function($query) {
                $query->where('companies.approved', 1);
            });
        });
    }
}