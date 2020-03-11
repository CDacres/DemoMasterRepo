<?php

use Illuminate\Database\Seeder;

use App\Models\User;
use App\Models\RoomAsset;
use App\Models\Enquiry;
use App\Models\EnquiryAudit;
use App\Models\EnquiryStatus;
use App\Models\EnquiryConfiguration;
use App\Models\EnquiryRoom;

class EnquiryTableSeeder extends Seeder
{
    private $_data = [
        [
            'id' => 1,
            'user_id' => 4,
            'creator_id' => 4,
            'asset_id' => 35
        ],
        [
            'id' => 2,
            'user_id' => 4,
            'creator_id' => 4,
            'asset_id' => 41
        ],
        [
            'id' => 3,
            'user_id' => 4,
            'creator_id' => 1,
            'asset_id' => 64
        ],
        [
            'id' => 4,
            'user_id' => 5,
            'creator_id' => 1,
            'asset_id' => 70
        ],
        [
            'id' => 5,
            'user_id' => 5,
            'creator_id' => 5,
            'asset_id' => 75
        ],
        [
            'id' => 6,
            'user_id' => 5,
            'creator_id' => 5,
            'asset_id' => 98
        ]
    ];

    public function run()
    {
        $enquiryArr = [];
        $enquiryAuditArr = [];
        $enquiryConfigurationArr = [];
        $enquiryRoomArr = [];
        $userArr = [];
        $creatorArr = [];
        $roomArr = [];
        foreach ($this->_data as $data) {
            $userArr[] = $data['user_id'];
            $creatorArr[] = $data['creator_id'];
            $roomArr[] = $data['asset_id'];
        }
        $users = User::whereIn('id', $userArr)->get();
        $roomAssets = RoomAsset::whereIn('id', $roomArr)->get();
        foreach ($this->_data as $enquiry_data) {
            $enquirerId = $enquiry_data['user_id'];
            $client = $users->first(function($item) use ($enquirerId) {
                return $item->id == $enquirerId;
            });
            $roomAssetId = $enquiry_data['asset_id'];
            $room = $roomAssets->first(function($item) use ($roomAssetId) {
                return $item->id == $roomAssetId;
            });
            $enquiryArr[] = $this->_add_to_enquiry_array($enquiry_data, $client);
            $enquiryAuditArr[] = $this->_add_to_enquiry_audit_array($enquiry_data);
            $enquiryConfigurationArr[] = $this->_add_to_enquiry_configuration_array($enquiry_data, $room);
            $enquiryRoomArr[] = $this->_add_to_enquiry_room_array($enquiry_data, $room->details->id);
        }
//        Enquiry::insert($enquiryArr);
//        EnquiryAudit::insert($enquiryAuditArr);
//        EnquiryConfiguration::insert($enquiryConfigurationArr);
        EnquiryRoom::insert($enquiryRoomArr);
//        User::whereIn('id', $userArr)->update(['is_enquirer' => 1]);
    }

    private function _add_to_enquiry_array($enquiry_data, $client)
    {
        $faker = Faker\Factory::create();
        $eventDate = null;
        $eventTime = null;
        $hasEvent = $faker->boolean;
        if ($hasEvent) {
            $eventDate = $faker->date();
            $eventTime = $faker->time();
        }
        $tourDate = null;
        $hasTour = $faker->boolean;
        if ($hasTour) {
            $tourDate = $faker->date();
        }
        return [
            'user_id' => $enquiry_data['user_id'],
            'creator' => $enquiry_data['creator_id'],
            'budget' => $faker->randomFloat(2, 100, 5000),
            'potentialValue' => $faker->randomFloat(2, 10, 500),
            'user_phone' => $client->phone,
            'description' => $faker->randomElement(['Enquiry', 'Request to book', 'Message the Host', 'Search', 'Book A Viewing']),
            'eventDate' => $eventDate,
            'eventTime' => $eventTime,
            'duration' => $faker->numberBetween(1, 28),
            'location' => $faker->city,
            'guests' => $faker->numberBetween(1, 2000),
            'tourDate' => $tourDate,
            'dateFlexible' => $faker->boolean,
            'timeDurationFlexible' => $faker->boolean,
            'locationFlexible' => $faker->boolean,
            'multipleDates' => $faker->boolean,
            'message' => $faker->paragraphs(3, true),
            'status' => EnquiryStatus::PENDING,
            'created' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_enquiry_audit_array($enquiry_data)
    {
        return [
            'enquiry_id' => $enquiry_data['id'],
            'enquiryStatus_id' => EnquiryStatus::PENDING,
            'user_id' => $enquiry_data['user_id'],
            'dateTime' => date("Y-m-d H:i:s")
        ];
    }

    private function _add_to_enquiry_configuration_array($enquiry_data, $room)
    {
        $faker = Faker\Factory::create();
        $configArr = [];
        foreach ($room->configs as $configs)
        {
            $configArr[] = $configs->id;
        }
        return [
            'enquiry_id' => $enquiry_data['id'],
            'configuration_id' => $faker->randomElement($configArr)
        ];
    }

    private function _add_to_enquiry_room_array($enquiry_data, $roomId)
    {
        return [
            'enquiry_id' => $enquiry_data['id'],
            'room_id' => $roomId
        ];
    }
}