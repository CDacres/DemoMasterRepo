<?php

namespace App\Models;

use App\LaravelExtensions\Model\LegacyModel;

class UserInfoHistory extends LegacyModel
{
    protected $table = 'user_info_history';
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'email',
        'dateTime'
    ];
    protected $hidden = [];
}