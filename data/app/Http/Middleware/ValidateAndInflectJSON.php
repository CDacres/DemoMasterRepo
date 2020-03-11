<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\ParameterBag;
use App\Concerns\ChangesInflection;
use Dingo\Api\Http\Response as Dingo;

class ValidateAndInflectJSON
{
    use ChangesInflection;

    public function handle($request, Closure $next)
    {
        $caseRequest = $this->checkForInflectionRequest($request);
        $request->attributes->add(['zip_inflection' => $caseRequest]);
        if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('PATCH'))
        {
            json_decode($request->getContent());
            if (json_last_error() != JSON_ERROR_NONE)
            {
                return response()->json("Request must be json", 400);
            }
            $this->convertParamBagToCase($request->json(), $request);
        }
        $response = $next($request);
        if (!($response instanceof Dingo))
        {
            $this->convertResponseToArray($response, $request);
        }
        return $response;
    }

    public function convertResponseToArray($response, $request)
    {
        if ($this->casesDiffer($request))
        {
            $newContent = $this->convertArrayKeysToCase(json_decode($response->getContent(), true), $this->checkForInflectionRequest($request));
            $response->setContent(json_encode($newContent));
        }
        else
        {
            $response->setContent(json_encode(json_decode($response->getContent(), true))); // looks pointless but resets the content from model to array, thus skipping data array formatting, ensuring same json shape as above.
        }
    }

    public function convertParamBagToCase(ParameterBag $bag, $request)
    {
        if ($this->casesDiffer($request))
        {
            $newBag = $this->convertArrayKeysToCase($bag->all(), $this->getNativeCase());
            $bag->replace($newBag);
        }
    }
}