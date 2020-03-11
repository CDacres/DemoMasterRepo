<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Cache;

use App\Models\Context;

use DateInterval;

class Contexts extends Controller
{
    protected $defaultClass = Context::class;

    public function get_all()
    {
        $cacheKey = 'contexts_all_' . $this->locale();
        $translationCollection = Cache::tags(['contexts'])->remember($cacheKey, DateInterval::createFromDateString('1 day'), function() {
            return Context::get();
        });
        return $this->serialisedJsonResponse($translationCollection);
    }

    public function get($context)
    {
        $cacheKey = 'contexts_' . $context . '_' . $this->locale();
        $translationCollection = Cache::tags(['contexts'])->remember($cacheKey, DateInterval::createFromDateString('1 day'), function() use ($context) {
            return Context::findOrFail($context);
        });
        return $this->serialisedJsonResponse($translationCollection);
    }
}
