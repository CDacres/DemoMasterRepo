<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Model_Extension__Currency extends MY_Model
{
    function __construct()
    {
        parent::__construct();
    }

    public function query_join_currencies_and_calculate_price($targetObject, $currencyColumn, $symbolAliasArray, $resultArray, $leftAlias = null, $rightAlias = null)
    {
        $this->query_join_currencies($targetObject, $currencyColumn, $symbolAliasArray, $leftAlias, $rightAlias);
        $this->select_calculated_prices($resultArray);
    }

    public function query_join_currencies($targetObject, $currencyColumn, $symbolAliasArray, $leftAlias = null, $rightAlias = null)
    {
        $this->db->advanced_join($targetObject, Currency::class, $currencyColumn, Currency::column('code', false), "LEFT", $leftAlias, $rightAlias);
        $this->add_symbol_aliases($targetObject::alias($symbolAliasArray['left']), $targetObject::alias($symbolAliasArray['right']), $rightAlias);
    }

    public function add_symbol_aliases($leftAlias, $rightAlias, $currencyAlias = null)
    {
        $this->db->select_alias(Currency::column('left_symbol', true, $currencyAlias), $leftAlias);
        $this->db->select_alias(Currency::column('right_symbol', true, $currencyAlias), $rightAlias);
    }

    public function select_calculated_prices($resultArray)
    {
        foreach ($resultArray as $priceColumn => $relevantAlias)
        {
            $this->db->select_alias("CEIL(100000 * " . $priceColumn . ") / 100000", $relevantAlias);
        }
    }

    public function select_sub_collection_calculated_prices($collectionAlias, $resultArray)
    {
        foreach ($resultArray as $priceColumn => $relevantAlias)
        {
            $this->db->select_group_concat($collectionAlias, $relevantAlias, "CEIL(100000 * " . $priceColumn . ") / 100000");
        }
    }

    public function add_sub_collection_symbol_aliases($collectionAlias, $leftAlias, $rightAlias, $currencyAlias = null)
    {
        $this->db->select_group_concat($collectionAlias, $leftAlias, Currency::column('left_symbol', true, $currencyAlias));
        $this->db->select_group_concat($collectionAlias, $rightAlias, Currency::column('right_symbol', true, $currencyAlias));
    }
}