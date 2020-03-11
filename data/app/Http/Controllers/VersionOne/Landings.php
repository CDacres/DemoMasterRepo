<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\Landing\BLP_Landing;

use App\Helpers\LandingPagesHelper;

class Landings extends Controller
{
    protected $defaultClass = BLP_Landing::class;

    public function get_landing(Request $request)
    {
        $domain = $request->input('domain');
        $vertical = $request->input('vertical');
        $location = $request->input('location');
        $landingDomain = new LandingPagesHelper();
        $domainResponse = $landingDomain->get_landing($domain, $vertical, $location);
        if (isset($domainResponse['type']))
        {
            switch ($domainResponse['type'])
            {
                case 'redirect':

                    if (isset($domainResponse['redirect_url']))
                    {
                        $this->forceRedirect($domainResponse['redirect_url']);
                    }
                    if (isset($domainResponse['payload']))
                    {
                        return $this->serialisedJsonResponse($domainResponse['payload']);
                    }
                    throw Exception("Missing domain response payload");
                break;

                case '404':

                    return response()->json(['error' => 'Not Found'], 404);
                break;

                case 'success':

                    if (isset($domainResponse['payload']))
                    {
                        return $this->serialisedJsonResponse($domainResponse['payload']);
                    }
                    throw Exception("Missing domain response payload");
                break;

                default:

                    throw Exception("Unexpected domain response type");
                break;
            }
        }
        return response()->json(['error' => 'Not Found'], 404);
    }
}