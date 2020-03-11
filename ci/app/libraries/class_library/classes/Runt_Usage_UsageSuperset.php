<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Runt_Usage_UsageSuperset extends Base__Item
{
    protected static $_tableName = 'usage_superset_usage';
    protected static $_columns = [
        'usage_id' => ['pointer' => 'usage_id'],
        'usage_superset_id' => ['pointer' => 'usageSuperset_id']
    ];
}