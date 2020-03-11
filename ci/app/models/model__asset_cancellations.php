<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_cancellations extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Asset_Cancellation::class);
        parent::__construct();
    }

    public function get_cancellation_type_by_asset($assetId)
    {
        return new Runt_Asset_Cancellation($this->_get_cancellation_type_by_asset($assetId));
    }

    private function _get_cancellation_type_by_asset($assetId)
    {
        $this->db->join(Cancellation_Type::tableName(), Runt_Asset_Cancellation::column('cancellation_percentage') . "=" . Cancellation_Type::column('cancellation_percentage') . " AND " . Runt_Asset_Cancellation::column('cancellation_period') . "=" . Cancellation_Type::column('cancellation_period'), "LEFT");
        $this->db->select_alias(Cancellation_Type::id_column(), Runt_Asset_Cancellation::alias('cancellation_type'));
        $this->db->select_alias(Cancellation_Type::column('description'), Runt_Asset_Cancellation::alias('cancellation_type_desc'));
        $this->db->where(Runt_Asset_Cancellation::column('asset_id'), $assetId);
        return $this->_query_init_and_run();
    }
}