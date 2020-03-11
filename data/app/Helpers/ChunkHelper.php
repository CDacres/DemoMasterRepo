<?php

namespace App\Helpers;

use DB;

class ChunkHelper
{
    public function chunkInsert($objectType, $insertArr)
    {
        $maxPlaceholders = DB::selectOne(DB::raw("SELECT @@max_prepared_stmt_count AS count"))->count;
        $numberOfColumns = DB::selectOne(DB::raw("SELECT count(*) as count FROM information_schema.columns WHERE table_name = '" . (new $objectType)->getTable() . "'"))->count;
        $limitStatements = floor($maxPlaceholders / $numberOfColumns);
        $insertBatchs = array_chunk($insertArr, $limitStatements);
        foreach ($insertBatchs as $batch)
        {
            $objectType::Insert($batch);
        }
    }
}