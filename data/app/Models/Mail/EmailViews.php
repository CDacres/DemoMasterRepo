<?php

namespace App\Models\Mail;

use App\LaravelExtensions\Model\MyModel;

class EmailViews extends MyModel
{
    protected $table = 'email_views';
    public $timestamps = false;
    protected $guarded = [];
}
