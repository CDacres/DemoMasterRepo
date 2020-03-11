<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Former__Left_Nav
{
    protected $_parentTag = 'ul';
    protected $_parentTagClass = 'leftnav-list';
    protected $_childTag = 'li';
    protected $_children = [];

    public function set_child_nav($pageName, $link, $active = false)
    {
        $this->_children[$link] = [
            'page_name' => $pageName,
            'link' => $link,
            'active' => $active
        ];
    }

    public function find_tag_class($tagClass)
    {
        $retStr = '';
        if ($tagClass != '')
        {
            $retStr = ' class="' . $tagClass . '"';
        }
        return $retStr;
    }

    public function set_active($link)
    {
        $this->_children[$link]['active'] = true;
    }

    public function display_family()
    {
        $retStr = '<' . $this->_parentTag . $this->find_tag_class($this->_parentTagClass) . '>';
        foreach ($this->_children as $child)
        {
            $retStr .= '<' . $this->_childTag . '><a class="leftnav-item' . (($child['active'])?' active':'') . '" href="' . $child['link'] . '">' . $child['page_name'] . '</a></' . $this->_childTag . '>';
        }
        $retStr .= '</' . $this->_parentTag . '>';
        return $retStr;
    }
}