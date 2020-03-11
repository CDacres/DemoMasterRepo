<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__configurations extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Configuration::class);
        parent::__construct();
    }

    public function get_config_object_collection_by_asset_id($assetId, $guests = null)
    {
        return new Configuration___Collection($this->_get_config_data_by_asset_id($assetId, $guests));
    }

    private function _get_config_data_by_asset_id($assetId, $guests = null)
    {
        $this->db->where(Runt_Room_Configuration::column('asset_id'), $assetId);
        if ($guests !== null)
        {
            $this->db->where(Runt_Room_Configuration::column('max_capacity') . " >=", $guests);
        }
        return $this->_join_conf_to_runt_and_run();
    }

    public function get_configurations_objects_collection()
    {
        return new Configuration___Collection($this->_get_configurations());
    }

    private function _get_configurations()
    {
        $this->db->order_by(Configuration::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_configurations_by_ids($idArray)
    {
        return new Configuration___Collection($this->_get_configurations_by_ids($idArray));
    }

    private function _get_configurations_by_ids($idArray)
    {
        if (count($idArray) == 0)
        {
            return [];
        }
        $this->db->where_in(Configuration::id_column(), $idArray);
        $this->db->order_by(Configuration::column('desc'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_configuration_by_id($id, $assetId)
    {
        $this->db->where(Configuration::id_column(), $id);
        $returnData = $this->_get_config_data_by_asset_id($assetId);
        if (count($returnData) === 0)
        {
            $retObj = new Base__Null();
        }
        else
        {
            $retObj = new Configuration($returnData[0]);
        }
        return $retObj;
    }

    public function get_configuration_by_name($configuration_desc, $assetId)
    {
        $this->db->where(Configuration::column('desc'), $configuration_desc);
        $returnData = $this->_get_config_data_by_asset_id($assetId);
        if (count($returnData) === 0)
        {
            $retObj = new Base__Null();
        }
        else
        {
            $retObj = new Configuration($returnData[0]);
        }
        return $retObj;
    }

    private function _join_conf_to_runt()
    {
        $this->db->advanced_join(Configuration::class, Runt_Room_Configuration::class, Configuration::id_column(false), Runt_Room_Configuration::column('configuration_id', false));
        $this->db->select_alias(Runt_Room_Configuration::column('max_capacity'), Configuration::alias('max_capacity'));
        $this->db->order_by(Configuration::column('desc'), 'ASC');
    }

    private function _join_conf_to_runt_and_run()
    {
        $this->_join_conf_to_runt();
        return $this->_query_init_and_run(false);
    }
}