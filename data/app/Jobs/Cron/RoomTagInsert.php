<?php

namespace App\Jobs\Cron;

use App\Jobs\ExtendedJob as Job;
use Illuminate\Support\Facades\DB;

use App\Helpers\ChunkHelper;

use App\Models\Pivots\AssetTag;
use App\Models\Usage;
use App\Models\Tags\Tag;

class RoomTagInsert extends Job
{
    public $tries = 3;

    public function handle()
    {
        $roomArr = $this->_get_rooms_missing_tags();
        $this->_insert_asset_tags($roomArr);
    }

    private function _get_rooms_missing_tags()
    {
        $office_rooms = $this->_get_office_rooms_missing_tags();
        $meeting_rooms = $this->_get_meeting_rooms_missing_tags();
        $event_rooms = $this->_get_event_rooms_missing_tags();
        return array_merge($office_rooms, $meeting_rooms, $event_rooms);
    }

    private function _rooms_missing_tags_query()
    {
        return DB::table('rooms')->leftJoin('asset_tag', 'rooms.asset_id', 'asset_tag.asset_id')
            ->leftJoin('scrape_audit', 'rooms.asset_id', 'scrape_audit.asset_id')
            ->where('rooms.enabled', 1)
            ->whereNull('asset_tag.asset_id')
            ->whereNull('scrape_audit.asset_id');
    }

    private function _get_office_rooms_missing_tags()
    {
        $query = $this->_rooms_missing_tags_query();
        return $query->where(function ($query) {
            $query->where('rooms.usage_id', Usage::PRIVATEOFFICE)
                ->orWhere('rooms.usage_id', Usage::PRIVATEDESK)
                ->orWhere('rooms.usage_id', Usage::DEDICATEDDESK);
        })->select(DB::raw('rooms.asset_id, ' . Tag::OFFICE . ' AS tag_id'))->get()->toArray();
    }

    private function _get_meeting_rooms_missing_tags()
    {
        $query = $this->_rooms_missing_tags_query();
        return $query->where('rooms.usage_id', Usage::MEETINGROOM)
            ->select(DB::raw('rooms.asset_id, ' . Tag::MEETING . ' AS tag_id'))->get()->toArray();
    }

    private function _get_event_rooms_missing_tags()
    {
        $query = $this->_rooms_missing_tags_query();
        return $query->where('rooms.usage_id', Usage::EVENTFUNCTION)
            ->select(DB::raw('rooms.asset_id, ' . Tag::EVENT . ' AS tag_id'))->get()->toArray();
    }

    private function _insert_asset_tags($roomArr)
    {
        $insertRoomArr = [];
        if (count($roomArr) > 0)
        {
            foreach ($roomArr as $roomObj)
            {
                $insertRoomArr[] = ['asset_id' => $roomObj->asset_id, 'tag_id' => $roomObj->tag_id];
            }
            (new ChunkHelper())->chunkInsert((new AssetTag()), $insertRoomArr);
        }
    }
}