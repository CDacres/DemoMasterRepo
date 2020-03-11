<?php

namespace App\Transformers;

use App\Models\ContextTranslation;
use App\LaravelExtensions\Transformers\ExtendedTransformer;

class ContextTranslationTransformer extends ExtendedTransformer
{
    public function transform(ContextTranslation $trans)
    {
        return [
            'id' => (string) $trans->id,
            'identifier' => (string) $trans->identifier,
            'text' => (string) $trans->text
        ];
    }
}