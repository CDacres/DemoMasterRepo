<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Asset_Audit___Collection extends Base__Collection
{
    static protected $_staticObjectType = Asset_Audit::class;
}

class Asset_Audit extends Base__Item
{
    protected static $_modelName = Model__assets::class;
    protected static $_tableName = 'asset_audit';
    protected static $_columns = [
        'asset_type' => [
            'pointer' => 'asset_type_id',
            'validations' => 'is_natural'
        ],
        'reference_id' => [
            'pointer' => 'reference_id',
            'validations' => 'is_natural'
        ],
        'token' => [
            'pointer' => 'token',
            'validations' => 'alpha_numeric',
            'access' => 'protected'
        ],
        'created_at' => [
            'pointer' => 'created_at',
            'validations' => 'is_date_time'
        ],
        'updated_at' => [
            'pointer' => 'updated_at',
            'validations' => 'is_date_time'
        ],
        'deleted_at' => [
            'pointer' => 'deleted_at',
            'validations' => 'is_date_time'
        ]
    ];

    public function get_asset_type_class()
    {
        $retClass = '';
        switch ($this->get('asset_type'))
        {
            case Asset_Type::COMPANY:

                $retClass = Company::class;
            break;

            case Asset_Type::VENUE:

                $retClass = Venue::class;
            break;

            case Asset_Type::ROOM:

                $retClass = Room_Skeleton::class;
            break;
        }
        return $retClass;
    }

    public function generate_token()
    {
        srand((double)microtime() * 1000000);
        $this->set('token', md5(uniqid(rand(), true)));
    }

    public function get_asset_type()
    {
        return $this->get('asset_type');
    }

    public function get_asset_id()
    {
        return $this->get_id();
    }
}