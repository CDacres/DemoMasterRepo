<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model__usagesuperset_language extends Model_Base__Object
{
    function __construct()
    {
        $this->_set_base_class(Runt_UsageSuperset_Language::class);
        parent::__construct();
    }

    public function get_usage_superset_language_object($lang_code, $usageSuperset_id)
    {
        return new Runt_UsageSuperset_Language($this->_get_usage_superset_language_object($lang_code, $usageSuperset_id));
    }

    private function _get_usage_superset_language_object($lang_code, $usageSuperset_id)
    {
        $this->db->advanced_join(Runt_UsageSuperset_Language::class, UsageSuperset::class, Runt_UsageSuperset_Language::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->where(Runt_UsageSuperset_Language::column('lang_code'), $lang_code);
        $this->db->where(Runt_UsageSuperset_Language::column('usage_superset_id'), $usageSuperset_id);
        return $this->_query_init_and_run();
    }

    public function get_usage_superset_language_object_by_alias($lang_code, $alias)
    {
        return new Runt_UsageSuperset_Language($this->_get_usage_superset_language_object_by_alias($lang_code, $alias));
    }

    private function _get_usage_superset_language_object_by_alias($lang_code, $alias)
    {
        $this->db->advanced_join(Runt_UsageSuperset_Language::class, UsageSuperset::class, Runt_UsageSuperset_Language::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->_allow_disabled_override();
        $this->db->where(Runt_UsageSuperset_Language::column('lang_code'), $lang_code);
        $this->db->where(Runt_UsageSuperset_Language::column('alias'), $alias);
        return $this->_query_init_and_run();
    }

    public function get_usage_superset_language_collection_by_superset($usageSuperset_id)
    {
        return new Runt_UsageSuperset_Language___Collection($this->_get_usage_superset_language_collection_by_superset($usageSuperset_id));
    }

    private function _get_usage_superset_language_collection_by_superset($usageSuperset_id)
    {
        $this->db->advanced_join(Runt_UsageSuperset_Language::class, UsageSuperset::class, Runt_UsageSuperset_Language::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->where(Runt_UsageSuperset_Language::column('usage_superset_id'), $usageSuperset_id);
        $this->db->order_by(UsageSuperset::column('order'), 'ASC');
        return $this->_query_init_and_run(false);
    }

    public function get_usage_superset_language_collection_by_lang($lang_code, $show_hidden = false)
    {
        return new Runt_UsageSuperset_Language___Collection($this->_get_usage_superset_language_collection_by_lang($lang_code, $show_hidden));
    }

    private function _get_usage_superset_language_collection_by_lang($lang_code, $show_hidden)
    {
        $this->db->advanced_join(Runt_UsageSuperset_Language::class, UsageSuperset::class, Runt_UsageSuperset_Language::column('usage_superset_id', false), UsageSuperset::id_column(false));
        $this->db->advanced_join(UsageSuperset::class, Runt_Usage_UsageSuperset::class, UsageSuperset::id_column(false), Runt_Usage_UsageSuperset::column('usage_superset_id', false));
        $this->db->advanced_join(Runt_Usage_UsageSuperset::class, Usage::class, Runt_Usage_UsageSuperset::column('usage_id', false), Usage::id_column(false));
        $this->_select_sub_collection_alias(Usage::column('id'), 'usages', Runt_UsageSuperset_Language::alias('usage_id'));
        $this->_select_sub_collection(Usage::class, 'usages');
        $this->_set_sub_collection_ordering(Usage::column('ordering'), 'usages', 'ASC');
        $this->db->where(Runt_UsageSuperset_Language::column('lang_code'), $lang_code);
        if (!$show_hidden)
        {
            $this->db->where(UsageSuperset::column('hidden'), 0);
        }
        $this->db->group_by(UsageSuperset::id_column());
        $this->db->order_by(UsageSuperset::column('order'), 'ASC');
        return $this->_query_init_and_run(false);
    }
}