<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Simple_Room___Collection extends Abstract__Room_User_Facing___Collection
{
    static protected $_staticObjectType = Simple_Room::class;
}

class Simple_Room extends Abstract__Room_User_Facing
{
    protected static $_aliases = ['image' => ['pointer' => 'image']];

    public function _get_representative_image()
    {
        return $this->get('image');
    }
}