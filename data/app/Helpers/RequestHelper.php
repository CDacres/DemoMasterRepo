<?php

namespace App\Helpers;
use Dingo\Api\Http\Request;
use App\Models\Fakes\ImpotentUser;
use App\Concerns\ChangesInflection;

class RequestHelper
{
    use ChangesInflection;
    private $_request;
    private $_passThroughMeta = ['ref_id'];

    const ATTPATH = 'data.attributes';
    const RELPATH = 'data.relationships';

    protected $_relationshipPrefix = self::RELPATH . '.';
    protected $_relationshipSuffix = '.data.id';
    protected $_attributePrefix = self::ATTPATH . '.';

    private $_extraAttributes = [];
    private $_extraRelationships = [];

    public function __construct(Request $request)
    {
        $this->_request = $request;
    }

    public function authority()
    {
        return $this->_request->user() ?: new ImpotentUser();
    }

    public function userCan($ability, $arguments = [])
    {
        return $this->authority()->can($ability, $arguments);
    }

    public function userCant($ability, $arguments = [])
    {
        return ! $this->userCan($ability, $arguments);
    }

    public function userCannot($ability, $arguments = [])
    {
        return $this->userCant($ability, $arguments);
    }

    public function __call($name, $arguments)
    {
        return $this->_request->$name(...$arguments);
    }

    public function requestAttributes($additionalRelationshipIds = [])
    {
        $relIdsAsAttributes = [];
        foreach ($additionalRelationshipIds as $attributeName => $relationshipName)
        {
            if ($this->requestHasRelationship($relationshipName))
            {
                $relIdsAsAttributes[$attributeName] = $this->getJSONRelationshipId($relationshipName);
            }
        }
        $potentialAttributes = $this->_request->input(self::ATTPATH);
        $attributes = $potentialAttributes ?: [];
        return array_merge($attributes, $relIdsAsAttributes);
    }

    public function getJSONRelationshipId($relationship)
    {
        $extraRel = isset($this->_extraRelationships[$relationship]) ? $this->_extraRelationships[$relationship] : false;
        return $extraRel ?: $this->_fromJSONGeneral($this->_generateRelationshipString($relationship));
    }

    private function _generateRelationshipString($relationship)
    {
        return $this->_relationshipPrefix . $relationship . $this->_relationshipSuffix;
    }

    private function _generateAttributeString($attribute)
    {
        return $this->_attributePrefix . $attribute;
    }

    public function addRelationship($relationship, $id)
    {
        $this->_extraRelationships[$relationship] = $id;
    }

    public function requestHasRelationship($relationship)
    {
        return $this->_request->exists($this->_generateRelationshipString($relationship));
    }

    public function getJSONAttribute($attribute, $default = null)
    {
        $extraAtt = isset($this->_extraAttributes[$attribute]) ? $this->_extraAttributes[$attribute] : false;
        $retVal = $extraAtt ?: $this->_fromJSONGeneral($this->_generateAttributeString($attribute));
        return $retVal ?: $default;
    }

    private function _passThroughMeta()
    {
        $requestArray = $this->getJSONMetaArray();
        return collect($this->_passThroughMeta)
            ->filter(function ($value) use ($requestArray) {
                if (isset($requestArray[$value]))
                {
                    return true;
                }
            })->mapWithKeys(function ($value) use ($requestArray) {
                return [$value => $requestArray[$value]];
            })->toArray();
    }

    public function getMeta($additionalMetaArray = [])
    {
        $metaArray = array_merge($additionalMetaArray, $this->_passThroughMeta());
        if ($this->casesDiffer($this->_request))
        {
            $metaArray = $this->convertArrayKeysToCase($metaArray, $this->getInflectionCase());
        }
        return $metaArray;
    }

    public function getInflectionCase()
    {
        return $this->checkForInflectionRequest($this->_request);
    }

    public function addAttribute($attribute, $value)
    {
        $this->_extraAttributes[$attribute] = $value;
    }

    public function getJSONAttributes($attArray)
    {
        $retArr = [];
        foreach ($attArray as $att)
        {
            $retArr[$att] = $this->_fromJSONGeneral($this->_generateAttributeString($att));
        }
        return $retArr;
    }

    public function getJSONMetaArray()
    {
        $meta = $this->_request->input('meta');
        return $meta ?: [];
    }

    public function requestHasAttribute($attribute)
    {
        return !is_null($this->getJSONAttribute($attribute));
    }

    private function _fromJSONGeneral($generalisedString)
    {
        return $this->_request->input($generalisedString);
    }
}