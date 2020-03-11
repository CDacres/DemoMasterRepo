<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use App\Models\Venue;
use Illuminate\Http\Request;

class VenuesTemp extends Controller
{
    public function agreed_to_list(Request $request, $venue_id)
    {
        if (is_bool($request->input('agreed_to_list')))
        {
            $venue = Venue::findOrFail($venue_id);
            $venue->agree_to_list = $request->input('agreed_to_list');
            $venue->save();
        }
        response('', 200);
    }
}