<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;
use App\Helpers\AnalyticsHelper;
use App\Models\User as Users;
use App\Models\Marketing\MarketingMailsToUsers as UserMail;

class EmailOpened extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function hit($pseudofile)
    {
        $resultArray = explode(".", $pseudofile);
        $userMail = UserMail::where(['opened_token' => $resultArray[0]])->first();
        if ($userMail)
        {
            if ($userMail->opened === 0)
            {
                $userMail->opened = 1;
                $userMail->first_opened = date("Y-m-d H:i:s");
            }
            $userMail->last_opened = date("Y-m-d H:i:s");
            $userMail->save();
            $user = Users::find($userMail->user_id);
            AnalyticsHelper::register_step('EMAIL_OPENED', $user->canonical_cookie_id, $userMail->language, null, $userMail->id);
        }
        $name = '../resources/images/FFFFFF.png';
        $fp = fopen($name, 'rb');
        // send the right headers
        header("Content-Type: image/png");
        header("Content-Length: " . filesize($name));
        // dump the picture and stop the script
        fpassthru($fp);
    }
}