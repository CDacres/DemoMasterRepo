<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');
/**
 *
 * @author William
 */

abstract class Base__Ghost_Object extends Base__Unbound_Object
{
    protected static $_aliases = [
        'id' => [
            'pointer' => 'id',
            'validations' => 'is_natural_no_zero|required',
            'access' => 'protected'
        ]
    ];
}