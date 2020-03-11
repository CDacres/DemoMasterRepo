<?php

/*
 * This file is part of the League\Fractal package.
 *
 * (c) Phil Sturgeon <me@philsturgeon.uk>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace App\Serialisers;

use League\Fractal\Serializer\JsonApiSerializer;
use App\Concerns\ChangesInflection;

class CasableJsonApiSerialiser extends JsonApiSerializer
{
    use ChangesInflection;

    protected $_case;

    /**
     * JsonApiSerializer constructor.
     *
     * @param string $baseUrl
     */
    public function __construct($case = null, $links = false)
    {
        $baseUrl = $links ? env('DATA_API_URL')  . '/api' : null;
        parent::__construct($baseUrl);
        $this->_case = !is_null($case) ? $case : $this->_native_case;
    }

    /**
     * Serialize an item.
     *
     * @param string $resourceKey
     * @param array $data
     *
     * @return array
     */
    public function item($resourceKey, array $data)
    {
        $id = $this->getIdFromData($data);

        $resource = [
            'data' => [
                'type' => $resourceKey,
                'id' => "$id",
                'attributes' => $this->convertArrayKeysToCaseIfNeeded($data),
            ],
        ];

        unset($resource['data']['attributes']['id']);

        if(isset($resource['data']['attributes']['links'])) {
            $custom_links = $data['links'];
            unset($resource['data']['attributes']['links']);
        }

        if (isset($resource['data']['attributes']['meta'])){
            $resource['data']['meta'] = $data['meta'];
            unset($resource['data']['attributes']['meta']);
        }

        if ($this->shouldIncludeLinks()) {
            $resource['data']['links'] = [
                'self' => "{$this->baseUrl}/$resourceKey/$id",
            ];
            if(isset($custom_links)) {
                $resource['data']['links'] = array_merge($custom_links, $resource['data']['links']);
            }
        }

        return $resource;
    }

    public function convertArrayKeysToCaseIfNeeded($data)
    {
        if ($this->_case !== $this->_native_case)
        {
            return $this->convertArrayKeysToCase($data, $this->_case);
        }
        else
        {
            return $data;
        }
    }

    protected function fillRelationships($data, $relationships)
    {
        if ($this->isCollection($data)) {
            foreach ($relationships as $key => $relationship) {
                $data = $this->fillRelationshipAsCollection($data, $relationship, $key);
            }
        } else { // Single resource
            foreach ($relationships as $key => $relationship) {
                $data = $this->fillRelationshipAsSingleResource($data, $relationship, $key);
            }
        }

        return $data;
    }

    private function fillRelationshipAsSingleResource($data, $relationship, $key)
    {
        $parsedKey = $this->encodeString($key, $this->_case);
        $data['data']['relationships'][$parsedKey] = $relationship[0];

        if ($this->shouldIncludeLinks()) {
            $data['data']['relationships'][$parsedKey] = array_merge([
                'links' => [
                    'self' => "{$this->baseUrl}/{$data['data']['type']}/{$data['data']['id']}/relationships/$key",
                    'related' => "{$this->baseUrl}/{$data['data']['type']}/{$data['data']['id']}/$key",
                ],
            ], $data['data']['relationships'][$parsedKey]);

            return $data;
        }
        return $data;
    }

    private function fillRelationshipAsCollection($data, $relationship, $key)
    {
        $parsedKey = $this->encodeString($key, $this->_case);
        foreach ($relationship as $index => $relationshipData) {
            $data['data'][$index]['relationships'][$parsedKey] = $relationshipData;

            if ($this->shouldIncludeLinks()) {
                $data['data'][$index]['relationships'][$parsedKey] = array_merge([
                    'links' => [
                        'self' => "{$this->baseUrl}/{$data['data'][$index]['type']}/{$data['data'][$index]['id']}/relationships/$key",
                        'related' => "{$this->baseUrl}/{$data['data'][$index]['type']}/{$data['data'][$index]['id']}/$key",
                    ],
                ], $data['data'][$index]['relationships'][$parsedKey]);
            }
        }

        return $data;
    }
}
