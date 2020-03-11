<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

trait Trait__Currency_Handler
{
    private $_currency_query_helper;

    protected function _get_currency()
    {
        return $this->_currency_query_helper->get_currency();
    }

    protected function _check_currency_helper()
    {
        if (!isset($this->_currency_query_helper))
        {
            $this->_currency_query_helper = new Model_Extension__Currency();
        }
    }

    protected function _query_join_currencies_and_calculate_price($targetObject, $currencyColumn, $symbolAliasArray, $resultArray, $leftAlias = null, $rightAlias = null)
    {
        $this->_check_currency_helper();
        $this->_currency_query_helper->query_join_currencies_and_calculate_price($targetObject, $currencyColumn, $symbolAliasArray, $resultArray, $leftAlias, $rightAlias);
    }

    protected function _query_join_currencies($targetObject, $currencyColumn, $symbolAliasArray, $leftAlias = null, $rightAlias = null)
    {
        $this->_check_currency_helper();
        $this->_currency_query_helper->query_join_currencies($targetObject, $currencyColumn, $symbolAliasArray, $leftAlias, $rightAlias);
    }

    protected function _calculate_price($resultArray)
    {
        $this->_check_currency_helper();
        $this->_currency_query_helper->select_calculated_prices($resultArray);
    }

    protected function _calculate_collection_price($column, $collectionAlias, $dataAlias)
    {
        $this->_check_currency_helper();
        $this->_handle_sub_collection($collectionAlias);
        $resultArray = [$column => $dataAlias];
        $this->_currency_query_helper->select_sub_collection_calculated_prices($collectionAlias, $resultArray);
    }

    protected function _add_collection_currency_symbols($collectionAlias, $leftAlias, $rightAlias, $currencyAlias = null)
    {
        $this->_check_currency_helper();
        $this->_handle_sub_collection($collectionAlias);
        $this->_currency_query_helper->add_sub_collection_symbol_aliases($collectionAlias, $leftAlias, $rightAlias, $currencyAlias);
    }
}