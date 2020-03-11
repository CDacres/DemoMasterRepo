<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Dingo\Api\Http\Request;
use Dingo\Api\Http\Response\Factory as Response;
use App\Serialisers\CasableJsonApiSerialiser;
use Illuminate\Support\Collection;

use App\Helpers\RequestHelper;
use Illuminate\Support\Facades\DB;

abstract class Controller extends BaseController
{
    protected $request;
    protected $response;
    protected $authority;
    protected $defaultIncludes = [];
    protected $defaultClass;

    const ATTPATH = 'data.attributes';
    const RELPATH = 'data.relationships';
    protected $_relationshipPrefix = self::RELPATH . '.';
    protected $_relationshipSuffix = '.data.id';
    protected $_attributePrefix = self::ATTPATH . '.';
    protected $_attributeSuffix = '';

    protected $_attributeValidation = [];
    protected $_relationshipValidation = [];

    private $_singletonRequestHelper;
    private $_addedMeta = [];

    public function __construct(Request $request, Response $response)
    {
        $this->request = $request;
        $this->response = $response;
        $this->addIncludes($this->request->get('include', ''));
    }

    public function locale()
    {
        return app('translator')->getLocale();
    }

    public function authority()
    {
        return $this->requestHelper()->authority();
    }

    protected function user_is_admin()
    {
        $currentUser = $this->authority();
        return $currentUser->isAdmin();
    }

    protected function user_is_logged_in()
    {
        $currentUser = $this->authority();
        return $currentUser->isUser();
    }

    protected function requestHelper()
    {
        if (is_null($this->_singletonRequestHelper))
        {
            $this->_singletonRequestHelper = new RequestHelper($this->request);
        }
        return $this->_singletonRequestHelper;
    }

    protected function addIncludes($includes)
    {
        $this->defaultIncludes = array_merge($this->defaultIncludes, $this->_stringArray($includes));
    }

    protected function removeIncludes($includes)
    {
        $this->defaultIncludes = array_diff($this->defaultIncludes, $this->_stringArray($includes));
    }

    protected function forceRedirect($redirectUrl)
    {
        $this->addMeta(['redirectUrl' => $redirectUrl]);
    }

    protected function addMeta($meta)
    {
        $this->_addedMeta[] = $meta;
    }

    private function _stringArray($includes = [])
    {
        if (is_string($includes))
        {
            $includes = ($includes === '') ? [] : explode(',', $includes);
        }
        if (!is_array($includes))
        {
            throw new \InvalidArgumentException(
                'The Controller ...Includes() methods expect a string or an array. ' . gettype($includes) . ' given'
            );
        }
        return $includes;
    }

    protected function getWiths($withArray = [])
    {
        return array_merge($this->defaultIncludes, $withArray);
    }

    protected function serialisedJsonResponse($serialisable, $links = true)
    {
        if ($serialisable instanceof Collection)
        {
            $method = 'collection';
        }
        else
        {
            $method = 'item';
        }
        $transformer = $this->defaultTransformer($this->authority());
        $label = $this->defaultSerialiserLabel();
        $includes = $this->defaultIncludes;
        $case = $this->requestHelper()->getInflectionCase();
        return $this->response->$method($serialisable, $transformer, ['key' => $label], function ($resource, $fractal) use ($includes, $case, $links) {
            $fractal->parseIncludes($includes);
            $fractal->setSerializer(new CasableJsonApiSerialiser($case, $links));
        })->setMeta($this->requestHelper()->getMeta($this->_addedMeta));
    }

    protected function serialisedJsonResponseFromPost($serialisable, $links = true)
    {
        return $this->serialisedJsonResponse($serialisable, $links)->setStatusCode(201);
    }

    public function get($id)
    {
        $model = $this->_get($this->defaultClass, $id);
        return $this->serialisedJsonResponse($model);
    }

    public function get_all()
    {
        $collection = $this->_get_all($this->defaultClass);
        return $this->serialisedJsonResponse($collection);
    }

    public function create()
    {
        $model = $this->_create($this->defaultClass);
        return $this->serialisedJsonResponseFromPost($model);
    }

    public function update($id)
    {
        $model = $this->_update($this->defaultClass, $id);
        if (is_null($model))
        {
            return $this->response->noContent();
        }
        return $this->serialisedJsonResponse($model);
    }

    public function delete($id)
    {
        $this->_delete($this->defaultClass, $id);
        return $this->response->noContent();
    }

    protected function authoriseCreationOrAbort()
    {
        if ($this->authority()->cannot('create', $this->defaultClass))
        {
            abort(401);
        }
    }

    protected function authoriseUpdateOrAbort($id, $model = null)
    {
        $this->_authoriseOrAbort($id, 'update', $model);
    }

    protected function authoriseViewOrAbort($id, $model = null)
    {
        $this->_authoriseOrAbort($id, 'view', $model);
    }

    protected function authoriseViewAllOrAbort()
    {
        if ($this->authority()->cannot('browse', $this->defaultClass))
        {
            abort(401);
        }
    }

    protected function authoriseDeleteOrAbort($id, $model = null)
    {
        $this->_authoriseOrAbort($id, 'delete', $model);
    }

    private function _authoriseOrAbort($id, $type, $model = null)
    {
        if (is_null($model))
        {
            $staticModel = $this->defaultClass;
            $model = $staticModel::findOrFail($id);
        }
        if ($this->authority()->cannot($type, $model))
        {
            abort(401);
        }
    }

    protected function _get($staticModel, $id)
    {
        $model = $staticModel::with($this->getWiths())->findOrFail($id);
        $this->authoriseViewOrAbort($id, $model);
        return $model;
    }

    protected function _get_all($staticModel)
    {
        $this->authoriseViewAllOrAbort();
        $collection = $staticModel::with($this->getWiths())->get();
        return $collection;
    }

    protected function _create($staticModel)
    {
        $this->authoriseCreationOrAbort();
        $this->quickValidate();
        return $this->_withRollbackOnFailure(function () use ($staticModel) {
            $model = $staticModel::staticallyCreateFromRequestHelper($this->requestHelper());
            return $staticModel::with($this->getWiths())->findOrFail($model->id);
        });
    }

    protected function _delete($staticModel, $id)
    {
        return $this->_withRollbackOnFailure(function () use ($staticModel, $id) {
            $model = $staticModel::findOrFail($id);
            $this->authoriseDeleteOrAbort($id, $model);
            $model->delete();
        });
    }

    protected function _update($staticModel, $id)
    {
        $this->quickValidate();
        return $this->_withRollbackOnFailure(function () use ($staticModel, $id) {
            $model = $staticModel::with($this->getWiths())->findOrFail($id);
            $this->authoriseUpdateOrAbort($id, $model);
            $model->patchMerge($this->requestAttributes($model->getFillableRelationships()));
            $model->save();
            $newModel = $staticModel::with($this->getWiths())->findOrFail($id);
            return $newModel;
        });
    }

    protected function _withRollbackOnFailure(\Closure $callback)
    {
        DB::beginTransaction();
        try {
            $result = $callback();
            DB::commit();
        }
        catch (Exception $ex)
        {
            DB::rollBack();
            throw $ex;
        }
        return $result;
    }

    public function requestAttributes($additionalRelationshipIds = [])
    {
        return $this->requestHelper()->requestAttributes($additionalRelationshipIds);
    }

    public function quickValidate()
    {
        $this->validateAttribute($this->_attributeValidation);
        $this->validateRelationship($this->_relationshipValidation);
    }

    private function _validateGeneral($prefix, $suffix, $rules, $singletonRule = null)
    {
        if (!is_array($rules) && !is_null($singletonRule))
        {
            $rules = [$rules => $singletonRule];
        }
        $qualifiedRules = [];
        foreach ($rules as $key => $rule)
        {
            $qualifiedRules[$prefix . $key . $suffix] = $rule;
        }
        $this->request->validate($qualifiedRules);
    }

    public function validateRelationship($rules, $singletonRule = null)
    {
        $this->_validateGeneral($this->_relationshipPrefix, $this->_relationshipSuffix, $rules, $singletonRule);
    }

    public function validateAttribute($rules, $singletonRule = null)
    {
        $this->_validateGeneral($this->_attributePrefix, $this->_attributeSuffix, $rules, $singletonRule);
    }

    protected function defaultSerialiserLabel()
    {
        return $this->defaultClass::defaultSerialisationLabel();
    }

    protected function defaultTransformer($authority)
    {
        $transformerClass = $this->defaultClass::defaultTransformer();
        return new $transformerClass($authority);
    }
}
