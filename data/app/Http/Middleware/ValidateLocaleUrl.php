<?php

namespace App\Http\Middleware;

use Closure;
use Waavi\Translation\Repositories\LanguageRepository;

class ValidateLocaleUrl {

    public function __construct(LanguageRepository $languageRepository)
    {
        $this->availableLocales = $languageRepository->availableLocales();
    }

    public function handle($request, Closure $next, $segment = 0)
    {
        $url = $request->getUri();
        $uriLocale = $this->parseUrl($url, $segment);
        if ($uriLocale == null)
        {
            return response()->json("Invalid locale", 400);
        }
        app('translator')->setLocale($uriLocale);
        return $next($request);
    }

    protected function parseUrl($url, $segment = 0)
    {
        $parsedUrl = parse_url($url);
        $parsedUrl['segments'] = array_values(array_filter(explode('/', $parsedUrl['path']), 'strlen'));
        $localeCandidate = array_get($parsedUrl['segments'], $segment, false);
        return in_array($localeCandidate, $this->availableLocales) ? $localeCandidate : null;
    }
}