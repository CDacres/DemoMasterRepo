<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Jobs\Email\DeferredRemarketingMailHandler;

class Mail extends Controller
{
    public function morning(Request $request)
    {
        $this->_run($request, 'MORNING');
    }

    public function afternoon(Request $request)
    {
        $this->_run($request, 'AFTERNOON');
    }

    public function daily(Request $request)
    {
        $this->_run($request, 'DAILY');
    }

    private function _run(Request $request, $frequency)
    {
        $dry_run = ($request->get('dry_run') == true)?true:false;
        dispatch(new DeferredRemarketingMailHandler($dry_run, $frequency));
    }
}