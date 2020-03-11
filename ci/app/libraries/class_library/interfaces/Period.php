<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

interface Interface__Period
{
    public function get_start();
    public function get_end();
    public function is_available();
    public function get_period_id();
    public function get_price();
    public function get_currency_symbols();
    public function get_slot_length();
    public function get_minimum_minutes();
    public function is_aggregate();
    public function get_asset_id();
}