<?php

namespace App\Transformers;

use App\Models\Context;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class ContextTransformer extends ExtendedTransformer
{
    protected $availableIncludes = ['translations'];

    public function transform(Context $context)
    {
        return [
            'id' => (string) $context->id,
            'desc' => (string) $context->desc
        ];
    }

    public function includeTranslations(Context $context)
    {
        $translations = $context->translations;
        return $this->collection($translations, new ContextTranslationTransformer, 'context_translations');
    }
}