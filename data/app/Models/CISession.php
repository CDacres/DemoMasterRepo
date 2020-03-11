<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class CISession extends Model
{
    public $table = 'ci_sessions';
    public $timestamps = false;

    public function scopeFromSession($query, $session_id)
    {
        return $query->where('session_id', $session_id);
    }

    public function scopeFromIP($query, $ip_address)
    {
        return $query->where('ip_address', $ip_address);
    }

    public function scopeFromUserAgent($query, $user_agent)
    {
        return $query->where('user_agent', $user_agent);
    }
}