<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

use App\Events\CompanyCreatingEvent;

class Company extends LegacyModel
{
    const CREATED_AT = 'created';
    const UPDATED_AT = 'updated';

    public $table = 'companies';

    public $fillable = ['name'];

    protected $dispatchesEvents = ['creating' => CompanyCreatingEvent::class];

    public function venue()
    {
        return $this->hasMany(Venue::class, 'id', 'company_id');
    }
}