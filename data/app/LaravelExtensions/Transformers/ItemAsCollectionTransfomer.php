<?php

namespace App\LaravelExtensions\Transformers;

use App\Helpers\CollectionAsItemObject;
use App\Contracts\Facades\ChannelLog as Log;

abstract class ItemAsCollectionTransfomer extends ExtendedTransformer
{
    public function transform(CollectionAsItemObject $object)
    {
        $potentialId = $object->id;
        $collection = $object->collection;
        if ($collection->count() > 0)
        {
            if (!$collection->every(function ($item) use ($potentialId) {
                return $this->confirmQuality($item, $potentialId);
            }))
            {
                Log::error("Quality mismatch during transformation of item as collection in " . self::class, 'default', ['id' => $potentialId, 'collection' => $collection->toArray()]);
                $collection = collect();
            }
        }
        return [
            'id' => $potentialId,
            'collection' => $collection->map(function ($item) {
                return $this->getObjectTransformationArray($item);
            })
        ];
    }

    abstract protected function confirmQuality($item, $potentialId);
    abstract protected function getObjectTransformationArray($item);
}