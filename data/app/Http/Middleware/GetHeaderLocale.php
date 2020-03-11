<?php

namespace App\Http\Middleware;

use Closure;
use Waavi\Translation\Repositories\LanguageRepository;

class GetHeaderLocale
{
    public function __construct(LanguageRepository $languageRepository)
    {
        $this->availableLocales = $languageRepository->availableLocales();
    }

    public function handle($request, Closure $next)
    {
        $locale = $this->getLocaleFromHeader($request);
        if ($locale == null)
        {
            return response()->json("Invalid locale", 400);
        }
        app('translator')->setLocale($locale);
        return $next($request);
    }

    protected function getLocaleFromHeader($request)
    {
        $localeCandidate = $request->header('Accept-Language');
        return in_array($localeCandidate, $this->availableLocales)?$localeCandidate:(in_array(env('APP_FALLBACK_LOCALE'), $this->availableLocales) ? env('APP_FALLBACK_LOCALE') : null);
    }
}