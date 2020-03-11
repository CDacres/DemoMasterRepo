<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Enquiry_Status___Collection extends Base__Collection
{
    static protected $_staticObjectType = Enquiry_Status::class;
}

class Enquiry_Status extends Base__Item
{
    const PENDING = 1;
    const PENDINGVALUE = 'New Lead';
    const PENDINGURL = 'pending';
    const WON = 2;
    const WONVALUE = 'Won';
    const WONURL = 'won';
    const LOST = 3;
    const LOSTVALUE = 'Lost';
    const LOSTURL = 'lost';
    const ALTERNATIVE = 4;
    const ALTERNATIVEVALUE = 'Alternative';
    const ALTERNATIVEURL = 'alternative';
    const OFFER = 5;
    const OFFERVALUE = 'Offer sent';
    const OFFERURL = 'offer';
    const VIEWING = 6;
    const VIEWINGVALUE = 'Viewing';
    const VIEWINGURL = 'viewing';
    const SALVAGE = 7;
    const SALVAGEVALUE = 'Salvage';
    const SALVAGEURL = 'salvage';

    protected static $_tableName = 'enquiries_status';
    protected static $_columns = [
        'name' => ['pointer' => 'name'],
        'ordering' => ['pointer' => 'ordering']
    ];
}