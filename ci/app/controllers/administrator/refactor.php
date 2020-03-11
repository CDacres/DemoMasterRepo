<?php

/***
 *
 *
 *
 * README
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Seriously - read this.
 *
 * Because this was done piecemeal, there are some... idiosyncracies.
 *
 * list.enabled and list.is_enable are the same, but all the uses of the latter in varoius views made it impractical to entirely deprecate before setting new search live.
 *
 * Therefore we are using the 'maintain_parity' method to update every time we enable new rooms to maintain parity until such a (glorious) day as we can just use one.
 *
 * Many rooms don't have areas. That is addressed in the 'area' method below
 *
 *
 *
 *
 *
 *
 */

class Refactor extends Controller_Base__Page
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('DX_Auth');
        $this->dx_auth->check_uri_permissions();
    }

    public function index()
    {
        echo "You are here.";
    }

//        public function generate_aggregates()
//        {
//            $this->load->model('model__opening_hours');
//            $originalMonster=$this->model__opening_hours->get_total_collection_collection_collection();
//            $newMonster=new Opening_Hours___Collection_Collection_Collection();
//            foreach($originalMonster->object() as $asset_id=>$assetDailies)
//            {
//                $dailiesHolder=new Opening_Hours___Collection_Collection();
//                foreach($assetDailies->object() as $day=>$assetDays)
//                {
//                    $originalCount=$assetDays->get_count();
//                    if ($originalCount>1)
//                    {
//                        $assetDailyAggregates=$assetDays->aggregated_periods_collection(true);
//                        $assetDailyAggregates->filter_on_aggregate();
//                        if ($assetDailyAggregates->exist())
//                        {
//                            $assetDailyAggregates->set('asset_id', $asset_id);
//                            $assetDailyAggregates->set('day_id', $day);
//                            $assetDailyAggregates->set('aggregate',true);
//                            $assetDailyAggregates->set('id',null);
//                            $dailiesHolder->add_object($assetDailyAggregates);
//                        }
//                    }
//                }
//                $newMonster->add_object($dailiesHolder);
//            }
//            $this->model__opening_hours->insert_update($newMonster);
//        }

//        public function fix_availability()
//        {
//            $this->load->model('model__availabilities');
//            $badAvails=$this->model__availabilities->get_base_object_collection_by_constraints(array('start'=>0));
//            $i=1;
//            foreach($badAvails->object() as $badAvail)
//            {
//                echo $i;
//                ++$i;
//                $this->model__availabilities->refresh_availability($badAvail->get('asset_id'), $badAvail->get('date'));
//            }
//        }

//        public function reservations()
//        {
//            $reservations=$this->db->query("SELECT reservations_old.*, rooms.asset_id, date(from_unixtime(checkin)) as startdate, "
//                    . "(hour(from_unixtime(checkin))*60)+minute(from_unixtime(checkin)) as start_minute,"
//                    . "date(from_unixtime(checkout)) as enddate, (hour(from_unixtime(checkout))*60)+minute(from_unixtime(checkout)) as end_minute,"
//                    . "from_unixtime(checkin) as checkin_date_time, from_unixtime(checkout) as checkout_date_time "
//                    . "FROM reservations_old LEFT JOIN rooms on reservations_old.list_id=rooms.id;")->result_array();
//            foreach ($reservations as $reservation)
//            {
//                $startDate=date("Y-m-d", ($reservation['checkin']));
//                $endDate=date("Y-m-d", ($reservation['checkout']));
//                $bookDate=date("Y-m-d H:i:s", $reservation['book_date']);
//                $status=$reservation['status']*1;
//                $stillValid=($status===3 || $status>6);
//                $closed=($status===2 || $status===4 || $status===5 || $status===6 || $status>7);
//                $progressedFromPending=($status>1);
//                $cancelled=($status===5 || $status===6);
//                $paid=($reservation['is_payed']==1);
//                $transactionComplete=($reservation['transaction_settled']==1);
//                $transactionVoided=($reservation['transaction_settled']==2);
//                $closingDate=($closed?$bookDate:null);
//                $venuePaymentDate=$paid?$bookDate:null;
//
//
//
//                $this->db->insert('bookings',array(
//                    'booker_id'=>$reservation['userby'],
//                    'beneficiary_id'=>$reservation['userby'],
//                    'bookingChannel_id'=>1,
//                    'created'=>$bookDate,
//                    'closed'=>$closingDate
//                        ));
//                $bookingId=$this->db->insert_id();
//
//
//
//                $this->db->insert('reservations',array(
//                    'booking_id'=>$bookingId,
//                    'asset_id'=>$reservation['asset_id'],
//                    'guests'=>$reservation['no_quest'],
//                    'currency'=>$reservation['currency'],
//                    'price'=>$reservation['price'],
//                    'toVenue'=>$reservation['topay'],
//                    'title'=>'Legacy Zipcube Booking',
//                    'toZipcube'=>$reservation['admin_commission'],
//                    'reservationStatus_id'=>$reservation['status'],
//                    'comments'=>$reservation['comments'],
//                    'meetingType'=>$reservation['meeting_type'],
//                    'configuration'=>$reservation['roomconf'],
//                    'venuePaymentDateTime'=>$venuePaymentDate,
//                    'legacy_reservation_id'=>$reservation['id']
//                        ));
//                $reservationId=$this->db->insert_id();
//
//
//                $resAudit=array(array('reservation_id'=>$reservationId,
//                    'reservationStatus_id'=>1,
//                    'dateTime'=>$bookDate
//                    ));
//                if ($stillValid)
//                {
//                    $resAudit[]=array('reservation_id'=>$reservationId,
//                    'reservationStatus_id'=>3,
//                    'dateTime'=>$bookDate
//                    );
//                    if ($status>6)
//                    {
//                        $resAudit[]=array('reservation_id'=>$reservationId,
//                        'reservationStatus_id'=>7,
//                        'dateTime'=>$bookDate
//                        );
//                        if ($status>7)
//                        {
//                            $resAudit[]=array('reservation_id'=>$reservationId,
//                            'reservationStatus_id'=>8,
//                            'dateTime'=>$bookDate
//                            );
//                            if ($status>8)
//                            {
//                                $resAudit[]=array('reservation_id'=>$reservationId,
//                                'reservationStatus_id'=>9,
//                                'dateTime'=>$bookDate
//                                );
//                                if ($status>9)
//                                {
//                                    $resAudit[]=array('reservation_id'=>$reservationId,
//                                    'reservationStatus_id'=>10,
//                                    'dateTime'=>$bookDate
//                                    );
//                                }
//                            }
//                        }
//                    }
//                }
//                elseif ($progressedFromPending)
//                {
//                    if ($cancelled)
//                    {
//                        $resAudit[]=array('reservation_id'=>$reservationId,
//                        'reservationStatus_id'=>3,
//                        'dateTime'=>$bookDate
//                        );
//                    }
//                    $resAudit[]=array('reservation_id'=>$reservationId,
//                    'reservationStatus_id'=>$status,
//                    'dateTime'=>$bookDate
//                    );
//                }
//                $this->db->insert_batch('reservationAudits',$resAudit);
//
//
//                $payStatus=1;
//                $invoice=($reservation['transaction_id']=="INVOICE");
//                if ($closed)
//                {
//                    if ($invoice)
//                    {
//                        if ($stillValid)
//                        {
//                            $payStatus=2;
//                        }
//                        else
//                        {
//                            $payStatus=3;
//                        }
//                    }
//                    else
//                    {
//                        if ($transactionVoided)
//                        {
//                            $payStatus=3;
//                        }
//                        elseif ($transactionComplete)
//                        {
//                            $payStatus=2;
//                        }
//                    }
//                }
//                $paymentType=($invoice?4:$reservation['payment_id']);
//                $this->db->insert('payments',array(
//                    'booking_id'=>$bookingId,
//                    'paymentType_id'=>$paymentType,
//                    'paymentStatus_id'=>$payStatus,
//                    'external_reference'=>$reservation['transaction_id'],
//                    'amount'=>$reservation['price'],
//                    'currency'=>$reservation['currency'],
//                    'notes'=>$reservation['payment_notes']
//                    ));
//                $paymentId=$this->db->insert_id();
//                $payAudit=array(array('payment_id'=>$paymentId,
//                    'paymentStatus_id'=>1,
//                    'dateTime'=>$bookDate
//                    ));
//                if ($payStatus!=1)
//                {
//                    $payAudit[]=array('payment_id'=>$paymentId,
//                            'paymentStatus_id'=>$payStatus,
//                            'dateTime'=>$bookDate
//                            );
//                }
//                $this->db->insert_batch('paymentAudits',$payAudit);
//
//
//                if ((($reservation['checkout']-$reservation['checkin'])>72000) || ($startDate!=$endDate) || ($reservation['checkout']==$reservation['checkin']))
//                {
//                    //daily mode
//                    try
//                    {
//                        //update booked periods
//                        $this->load->model('model__opening_hours');
//                        $openingHours=$this->model__opening_hours->get_weekly_opening_object_collection_by_asset_id($reservation['asset_id']);
//                        $bookedPeriod=$openingHours->as_booked_period($startDate, $endDate, $reservation['asset_id']);
//                        $bookedPeriod->set('reservation_id',$reservationId);
//                        if (!$stillValid)
//                        {
//                            $bookedPeriod->set_enabled(false);
//                        }
//                        $this->load->model('model__booked_periods');
//                        $this->model__booked_periods->insert_update($bookedPeriod);
//                        //possibly an if statement on this - on failure that means times weren't available?
//                    } catch (Exception $ex) {
//                        echo "Failed to insert reservation period. Start date: " . $startDate . ", end date: " . $endDate . " refactored id: " . $reservationId . ". old reservation id: " . $reservation['id'] . "<br />";
//
//                    }
//                }
//                else
//                {
//                    //hourly mode
//                    $bookedPeriods=new Booked_Period___Collection();
//                    $bookedPeriod=new Booked_Period();
//                    $bookedPeriod->set('reservation_id',$reservationId);
//                    $bookedPeriod->set('start',$reservation['checkin_date_time']);
//                    $bookedPeriod->set('end',$reservation['checkout_date_time']);
//                    $bookedPeriod->set('all_day',false);
//                    $bookedPeriod->set('asset_id',$reservation['asset_id']);
//                    if (!($reservation['status']==3 || $reservation['status']==1 || $reservation['status']>6))
//                    {
//                        $bookedPeriod->set_enabled(false);
//                    }
//                    $bookedPeriods->add_object($bookedPeriod);
//                    $this->load->model('model__booked_periods');
//                    $this->model__booked_periods->insert_update($bookedPeriods);
//                }
//            }
//        }
//
//        public function uses()
//        {
//            $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//
//
//            $result=$db->query('SELECT * FROM dev_vs_db.list');
//            $insert_query="INSERT INTO dev_vs_db.room_bookingType (`room_id`,`bookingType_id`) VALUES ";
//
//            while ($row=$result->fetch_assoc())
//            {
//                $room_id=$row['id'];
//                $uses_list=explode(',', str_replace(' ', '', $row['room_uses']));
//                foreach ($uses_list as $uses_id)
//                {
//                    if (is_numeric($uses_id))
//                    {
//                        $insert_query .= "(" . $room_id . "," . $uses_id . "),";
//                    }
//                    else
//                    {
//
//                        echo $room_id . " ---> " . $row['room_uses'] . "<br />";
//                        print_r($uses_list) . "<br />";
//                    }
//                }
//
//            }
//
//
//            echo $insert_query;
//            $result->free();
//            $db->close();
//        }

//        public function maintain_parity()
//        {
//            $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//            $db->query('UPDATE dev_vs_db.list SET enabled=is_enable WHERE id>0');
//        }

//        public function config()
//        {
//            $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//
//
//            $result=$db->query('SELECT * FROM dev_vs_db.room_capacity');
//            $insert_query="INSERT INTO dev_vs_db.room_configuration (`room_id`,`configuration_id`,`max_capacity`) VALUES ";
//            while ($row=$result->fetch_assoc())
//            {
//                $rekeyed_arr=array();
//                foreach($row as $value)
//                {
//                    $rekeyed_arr[]=$value;
//                }
//                for ($a=2; $a<9; $a++)
//                {
//                    if ($rekeyed_arr[$a]>0)
//                    {
//                        $insert_query .= "(" . $rekeyed_arr[1] .  "," . ($a-1) . "," . $rekeyed_arr[$a] . "),";
//                    }
//                }
//            }
//
//            echo $insert_query;
//            $result->free();
//            $db->close();
//        }

//        public function area()
//        {
//            $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//
//
//            $result=$db->query('SELECT * FROM dev_vs_db.room_capacity');
//            while ($row=$result->fetch_assoc())
//            {
//                if ($row['parameter']==1)
//                {
//                    $area=$row['room_size'];
//                }
//                else
//                {
//                    $area=round($row['room_size']*0.0929,0);
//                }
//
//                $update_query="UPDATE dev_vs_db.list SET area=" . $area . " WHERE id=" . $row['room_id'];
//                $db->query($update_query);
//            }
//
//            $check_result=$db->query("SELECT * FROM dev_vs_db.list WHERE area=0");
//            echo "The following room ids have no associated area. Please check and update. <br />";
//            while ($check_row=$check_result->fetch_assoc())
//            {
//                echo $check_row['id'] . "<br />";
//            }
//            $check_result->free();
//            $result->free();
//            $db->close();
//        }

//        public function catering()
//        {
//            $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//
//
//            $result=$db->query('SELECT * FROM dev_vs_db.list');
//            $insert_query="INSERT INTO dev_vs_db.room_cateringOption (`room_id`,`cateringOption_id`) VALUES ";
//
//            while ($row=$result->fetch_assoc())
//            {
//                $room_id=$row['id'];
//                $catering_list=explode(',', str_replace(' ', '', $row['room_catering']));
//                foreach ($catering_list as $catering_id)
//                {
//                    if (is_numeric($catering_id))
//                    {
//                        $insert_query .= "(" . $room_id . "," . $catering_id . "),";
//                    }
//                    else
//                    {
//
//                        echo $room_id . " ---> " . $row['room_catering'] . "<br />";
//                        print_r($catering_list) . "<br />";
//                    }
//                }
//
//            }
//
//
//            echo $insert_query;
//            $result->free();
//            $db->close();
//        }

//        public function addons()
//        {
//            $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//
//
//            $result=$db->query('SELECT * FROM dev_vs_db.room_ameniti_rent');
//
//            $insert_runt_query="INSERT INTO dev_vs_db.room_addOn (`room_id`,`addOn_id`,`cost`) VALUES ";
//
////            while ($row=$result->fetch_assoc())
////            {
////                $insert_addon_query="INSERT INTO dev_vs_db.addOns (`desc`) VALUES ('" . $row['aminty_name'] . "')";
////                $db->query($insert_addon_query);
////                $last_insert_id=$db->insert_id;
////                $insert_runt_query.="(" . $row['room_id'] . "," . $last_insert_id . "," . $row['aminty_rent'] . "),";
////
////            }
////
//            echo "Check the code and try again!<br />";
//            echo $insert_runt_query;
//            $result->free();
//            $db->close();
//        }

//        public function amenity()
//        {
//             $db= new mysqli('2fc60a906991a196a1206a1966fe8991ff391d5d.rackspaceclouddb.com', 'root', 'a2d8b2bd-a50e-4fe7-ac5c-b48d2309d8d8');
//
//
//            $result=$db->query('SELECT * FROM dev_vs_db.list');
//            $insert_query="INSERT INTO dev_vs_db.room_amenity (`room_id`,`amenity_id`) VALUES ";
//
//            while ($row=$result->fetch_assoc())
//            {
//                $room_id=$row['id'];
//                $env_list=explode(',', str_replace(' ', '', $row['room_envior_att']));
//                $amen_list=explode(',', str_replace(' ', '', $row['room_audio']));
//                foreach ($env_list as $env_id)
//                {
//                    if (is_numeric($env_id))
//                    {
//                        $insert_query .= "(" . $room_id . "," . $env_id . "),";
//                    }
//                    else
//                    {
//                        echo $room_id . " ---> " . $row['room_envior_att'] . "<br />";
//                        print_r($env_list) . "<br />";
//                    }
//                }
//                foreach ($amen_list as $amen_id)
//                {
//                    if (is_numeric($amen_id))
//                    {
//                        $insert_query .= "(" . $room_id . "," . ($amen_id+12) . "),";
//                    }
//                    else
//                    {
//                        echo $room_id . " ---> " . $row['room_audio'] . "<br />";
//                        print_r($amen_list) . "<br />";
//                    }
//                }
//
//            }
//
//
//            echo $insert_query;
//            $result->free();
//            $db->close();
//        }

    }

//Use this to sort differences between room_capacity and room_configuration tables in dev_vs_db

//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT `room_id`, 1 AS configtype, `boardroom` AS max_capacity FROM room_capacity WHERE `boardroom` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT `room_id`, 1 AS configtype, `boardroom` AS max_capacity FROM room_capacity WHERE `boardroom` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity
//
//
//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT `room_id`, 2 AS configtype, `classroom` AS max_capacity FROM room_capacity WHERE `classroom` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT `room_id`, 2 AS configtype, `classroom` AS max_capacity FROM room_capacity WHERE `classroom` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity
//
//
//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT `room_id`, 3 AS configtype, `banquet` AS max_capacity FROM room_capacity WHERE `banquet` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT `room_id`, 3 AS configtype, `banquet` AS max_capacity FROM room_capacity WHERE `banquet` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity
//
//
//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT `room_id`, 4 AS configtype, `theatre` AS max_capacity FROM room_capacity WHERE `theatre` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT `room_id`, 4 AS configtype, `theatre` AS max_capacity FROM room_capacity WHERE `theatre` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity
//
//
//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT `room_id`, 5 AS configtype, `workspace` AS max_capacity FROM room_capacity WHERE `workspace` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT `room_id`, 5 AS configtype, `workspace` AS max_capacity FROM room_capacity WHERE `workspace` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity
//
//
//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT `room_id`, 6 AS configtype, `open` AS max_capacity FROM room_capacity WHERE `open` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT `room_id`, 6 AS configtype, `open` AS max_capacity FROM room_capacity WHERE `open` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity
//
//
//INSERT INTO room_configuration (room_id, configuration_id, max_capacity)
//SELECT alias.room_id, alias.configtype, alias.max_capacity FROM (SELECT room_capacity.room_id, 7 AS configtype, `ushaped` AS max_capacity FROM room_capacity WHERE `ushaped` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE room_configuration.configuration_id IS NULL
//
//UPDATE room_configuration
//INNER JOIN (SELECT room_configuration.room_id, room_configuration.configuration_id, alias.max_capacity FROM (SELECT room_capacity.room_id, 7 AS configtype, `ushaped` AS max_capacity FROM room_capacity WHERE `ushaped` > 0) alias
//LEFT JOIN room_configuration ON alias.room_id=room_configuration.room_id
//AND alias.configtype=room_configuration.configuration_id
//WHERE alias.max_capacity <> room_configuration.max_capacity) alias2
//ON alias2.room_id=room_configuration.room_id AND alias2.configuration_id=room_configuration.configuration_id
//SET room_configuration.max_capacity=alias2.max_capacity