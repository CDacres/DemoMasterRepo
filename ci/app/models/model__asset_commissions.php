<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__asset_commissions extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Asset_Commission::class);
        parent::__construct();
    }

    public function get_commission_collection_by_asset_array_and_channel($assetArr, $bookingChannelId)
    {
        return new Asset_Commission___Collection($this->_get_commission_collection_by_asset_array_and_channel($assetArr, $bookingChannelId));
    }

    private function _get_commission_collection_by_asset_array_and_channel($assetArr, $bookingChannelId)
    {
        $this->db->where_in(Asset_Commission::column('asset_id'), $assetArr);
        $this->db->where(Asset_Commission::column('booking_channel_id'), $bookingChannelId);
        return $this->_query_init_and_run(false);
    }

    public function get_commission_object_by_asset_and_channel($assetId, $bookingChannelId)
    {
        return new Asset_Commission($this->_get_commission_object_by_asset_and_channel($assetId, $bookingChannelId));
    }

    private function _get_commission_object_by_asset_and_channel($assetId, $bookingChannelId)
    {
        $this->db->where(Asset_Commission::column('asset_id'), $assetId);
        $this->db->where(Asset_Commission::column('booking_channel_id'), $bookingChannelId);
        return $this->_query_init_and_run();
    }
}