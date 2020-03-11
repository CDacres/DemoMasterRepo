<?php

namespace App\Transformers;

use App\Models\CompanyAsset;

class CompanyAssetTransformer extends AssetTransformer
{
    public function __construct(\Illuminate\Contracts\Auth\Access\Authorizable $user = null)
    {
        parent::__construct($user);
        $this->availableIncludes = array_merge([], $this->availableIncludes);
    }

    public function transform(CompanyAsset $company)
    {
        return [
            'id' => (string) $company->id,
            'reference_id' => (string) $company->reference_id,
            'name' => (string) $company->details->name,
            'child_count' => (int) $company->child_count
        ];
    }
}