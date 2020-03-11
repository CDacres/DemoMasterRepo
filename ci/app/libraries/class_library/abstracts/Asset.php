<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

abstract class Abstract__Asset___Collection extends Base__Collection
{
    protected static $_wranglers = [
        'image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => ['subject_id' => 'asset_id'],
            'method_bindings' => ['name' => ['method' => '_get_representative_image']]
        ]
    ];

    public function get_asset_ids()
    {
        $returnArray = [];
        foreach ($this->_objects as $object)
        {
            $returnArray[] = $object->get_asset_id();
        }
        return $returnArray;
    }

    public function get_secondary_images($check_enabled = true)
    {
        $first = true;
        foreach ($this->object() as $asset)
        {
            foreach ($asset->get('images')->object() as $image)
            {
                if (!$check_enabled || $image->is_enabled())
                {
                    if (!$first)
                    {
                        yield $image;
                    }
                    else
                    {
                        $first = false;
                    }
                }
            }
        }
    }

    public function get_all_images($check_enabled = true)
    {
        foreach ($this->object() as $asset)
        {
            foreach ($asset->get_all_images($check_enabled) as $image)
            {
                yield $image;
            }
        }
    }

    public function _get_representative_image()
    {
        foreach ($this->object() as $asset)
        {
            $retObj = $asset->_get_representative_image();
            if ($retObj != null)
            {
                yield $retObj;
            }
        }
    }
}

abstract class Abstract__Asset extends Base__Item
{
    protected static $_assetType;
    protected static $_parentClass = Company::class;
    protected static $_columns = [
        'asset_id' => [
            'pointer' => 'asset_id',
            'validations' => 'is_natural'
        ],
        'created' => [
            'pointer' => 'created',
            'validations' => 'is_date_time'
        ],
        'updated' => [
            'pointer' => 'updated',
            'validations' => 'is_date_time'
        ],
        'approved' => [
            'pointer' => 'approved',
            'validations' => 'is_boolean'
        ],
        'approved_datetime' => [
            'pointer' => 'approved_datetime',
            'validations' => 'is_date_time'
        ],
        'approver' => [
            'pointer' => 'approver',
            'validations' => 'is_natural_no_zero'
        ],
        'main_contact' => [
            'pointer' => 'main_contact',
            'validations' => 'is_natural_no_zero'
        ]
    ];
    protected static $_aliases = [
        'privileges_mask' => [
            'pointer' => 'privileges_mask',
            'validations' => 'is_natural'
        ],
        'asset_type' => [
            'pointer' => 'asset_type',
            'validations' => 'is_natural'
        ],
        'token' => [
            'pointer' => 'token',
            'validations' => 'alpha_numeric',
            'access' => 'protected'
        ]
    ];
    protected static $_wranglers = [
        'privileges_mask' => [
            'object' => 'Wrangler__Default',
            'data_bindings' => ['data' => 'privileges_mask'],
            'hard_bindings' => ['default' => 0]
        ],
        'image' => [
            'object' => 'Wrangler__Image',
            'data_bindings' => ['subject_id' => 'asset_id'],
            'method_bindings' => ['name' => ['method' => '_get_representative_image']]
        ],
        'created_date' => [
            'object' => 'Wrangler__Date_Time',
            'data_bindings' => ['datetime' => 'created']
        ]
    ];
    protected static $_objects = ['images' => Image___Collection::class];

    static public function asset_id_column($fullLength = true, $tableAlias = null)
    {
        return static::column('asset_id', $fullLength, $tableAlias);
    }

    static public function get_parent_class()
    {
        return static::$_parentClass;
    }

    public function has_asset_id()
    {
        return $this->_data_is_set(static::column('asset_id',false));
    }

    protected function _has_essentials()
    {
        return $this->has_asset_id() && parent::_has_essentials();
    }

    public function get_asset_id()
    {
        return $this->_get_data_from_pointer(static::column('asset_id',false));
    }

    public function get_asset_type()
    {
        return static::$_assetType;
    }

    public function is_approved()
    {
        return $this->is_true('approved');
    }

    public function get_secondary_images($check_enabled = true)
    {
        $first = true;
        foreach ($this->get('images')->object() as $image)
        {
            if (!$check_enabled || $image->is_enabled())
            {
                if (!$first)
                {
                    yield $image;
                }
                else
                {
                    $first = false;
                }
            }
        }
    }

    public function get_all_images($check_enabled = true)
    {
        foreach ($this->get('images')->object() as $image)
        {
            if (!$check_enabled || $image->is_enabled())
            {
                yield $image;
            }
        }
    }

    public function _get_representative_image()
    {
        $retObj = '';
        if ($this->get('images')->exist())
        {
            if ($this->get('images')->get_first()->is_enabled())
            {
                $retObj = $this->get('images')->get_first()->get('name');
            }
        }
        return $retObj;
    }
}