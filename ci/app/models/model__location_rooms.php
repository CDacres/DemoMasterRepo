<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__location_rooms extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_Location_Room::class);
        parent::__construct();
    }

    public function get_location_room_object_by_ids($location_id, $tag_id)
    {
        return new Runt_Location_Room($this->_get_location_room_object_by_ids($location_id, $tag_id));
    }

    private function _get_location_room_object_by_ids($location_id, $tag_id)
    {
        $this->db->where(Runt_Location_Room::column('location_id'), $location_id);
        $this->db->where(Runt_Location_Room::column('tag_id'), $tag_id);
        return $this->_query_init_and_run();
    }
}