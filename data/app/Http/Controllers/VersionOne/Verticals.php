<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\Verticals\Vertical;
use App\Models\Verticals\FilterGroupBatch;
use App\Models\Verticals\FilterGroup;
use App\Models\Verticals\Filter;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Waavi\Translation\Repositories\TranslationRepository;
use Waavi\Translation\Facades\TranslationCache;

use DateInterval;

class Verticals extends Controller
{
    protected $_translator;

    public function __construct(TranslationRepository $translator)
    {
        $this->_translator = $translator;
    }

    public function get_filter_csv()
    {
        $id = 1;
        $filter_array[] = [
            'ref_id' => 'ref_id',
            'v_id' => 'v_id',
            "fgc_id" => "fgc_id",
            "fg_id" => "fg_id",
            'current_id' => 'current_id',
            'type' => 'type',
            'en' => 'en',
            'fr' => 'fr',
            'de' => 'de',
            'en_US' => 'en_US',
            'en_IE' => 'en_IE'
        ];
        $this->_verticals_collection->map(function ($item) use (&$filter_array, &$id) {
            $filter_group_colls = $item['filterGroupCollections'];
            foreach ($filter_group_colls as $filter_group_coll)
            {
                foreach ($filter_group_coll['filterGroups'] as $filter_group)
                {
                    foreach ($filter_group['filters'] as $filter)
                    {
                        $filter_array[] = [
                            'ref_id' => $id,
                            'v_id' => $item['id'],
                            "fgc_id" => $filter_group_coll['id'],
                            "fg_id" => $filter_group['id'],
                            'current_id' => $filter['id'],
                            'type' => $filter_group['inputType'],
                            'en' => $filter['title'],
                            'fr' => null,
                            'de' => null,
                            'en_US' => $filter['title'],
                            'en_IE' => $filter['title'],
                        ];
                        ++$id;
                    }
                }
            }
        });
        //print_r($filter_array);
        $this->_array_to_csv_download($filter_array, "filters.csv");
    }

    public function get_vertical_csv()
    {
        $id = 1;
        $filter_array[] = [
            'ref_id' => 'ref_id',
            'v_id' => 'v_id',
            'en' => 'en',
            'fr' => 'fr',
            'de' => 'de',
            'en_US' => 'en_US',
            'en_IE' => 'en_IE'
        ];
        $this->_verticals_collection->map(function ($item) use (&$filter_array, &$id) {
            $filter_array[] = [
                'ref_id' => $id,
                'v_id' => $item['id'],
                'en' => $item['title'],
                'fr' => null,
                'de' => null,
                'en_US' => $item['title'],
                'en_IE' => $item['title'],
            ];
            ++$id;
        });
//        print_r($filter_array);
        $this->_array_to_csv_download($filter_array, "verticals.csv");
    }

    public function get_fgc_csv()
    {
        $id = 1;
        $filter_array[] = [
            'ref_id' => 'ref_id',
            'v_id' => 'v_id',
            "fgc_id" => "fgc_id",
            'en' => 'en',
            'fr' => 'fr',
            'de' => 'de',
            'en_US' => 'en_US',
            'en_IE' => 'en_IE'
        ];
        $this->_verticals_collection->map(function ($item) use (&$filter_array, &$id) {
            $filter_group_colls = $item['filterGroupCollections'];
            foreach ($filter_group_colls as $filter_group_coll)
            {
                $filter_array[] = [
                    'ref_id' => $id,
                    'v_id' => $item['id'],
                    "fgc_id" => $filter_group_coll['id'],
                    'en' => $filter_group_coll['buttonText'],
                    'fr' => null,
                    'de' => null,
                    'en_US' => $filter_group_coll['buttonText'],
                    'en_IE' => $filter_group_coll['buttonText'],
                ];
                ++$id;
            }
        });
        //print_r($filter_array);
        $this->_array_to_csv_download($filter_array, "fgc.csv");
    }

    public function get_fg_csv()
    {
        $id = 1;
        $filter_array[] = [
            'ref_id' => 'ref_id',
            'v_id' => 'v_id',
            "fgc_id" => "fgc_id",
            "fg_id" => "fg_id",
            'type' => 'type',
            'en' => 'en',
            'fr' => 'fr',
            'de' => 'de',
            'en_US' => 'en_US',
            'en_IE' => 'en_IE',
            'expand-en' => 'expand-en',
            'expand-fr' => 'expand-fr',
            'expand-de' => 'expand-de',
            'expand-en_US' => 'expand-en_US',
            'expand-en_IE' => 'expand-en_IE',
            'collapse-en' => 'collapse-en',
            'collapse-fr' => 'collapse-fr',
            'collapse-de' => 'collapse-de',
            'collapse-en_US' => 'collapse-en_US',
            'collapse-en_IE' => 'collapse-en_IE'
        ];
        $this->_verticals_collection->map(function ($item) use (&$filter_array, &$id) {
            $filter_group_colls = $item['filterGroupCollections'];
            foreach ($filter_group_colls as $filter_group_coll)
            {
                foreach ($filter_group_coll['filterGroups'] as $filter_group)
                {
                    $filter_array[] = [
                        'ref_id' => $id,
                        'v_id' => $item['id'],
                        "fgc_id" => $filter_group_coll['id'],
                        "fg_id" => $filter_group['id'],
                        'type' => $filter_group['inputType'],
                        'en' => $filter_group['title'],
                        'fr' => null,
                        'de' => null,
                        'en_US' => $filter_group['title'],
                        'en_IE' => $filter_group['title'],
                        'expand-en' => $this->_handle_open_close($filter_group_coll['panelType'], $filter_group),
                        'expand-fr' => null,
                        'expand-de' => null,
                        'expand-en_US' => $this->_handle_open_close($filter_group_coll['panelType'], $filter_group),
                        'expand-en_IE' => $this->_handle_open_close($filter_group_coll['panelType'], $filter_group),
                        'collapse-en' => $this->_handle_open_close($filter_group_coll['panelType'], $filter_group, false),
                        'collapse-fr' => null,
                        'collapse-de' => null,
                        'collapse-en_US' => $this->_handle_open_close($filter_group_coll['panelType'], $filter_group, false),
                        'collapse-en_IE' => $this->_handle_open_close($filter_group_coll['panelType'], $filter_group, false)
                    ];
                    ++$id;
                }
            }
        });
        //print_r($filter_array);
        $this->_array_to_csv_download($filter_array, "fg.csv");
    }

    public function post_filter_csv(Request $request)
    {
        if ($request->file('csv')->isValid())
        {
            $csv = $request->file('csv');
            $handle = $csv->openFile();
            $handle->setFlags(\SplFileObject::SKIP_EMPTY);
            DB::table('filters')->truncate();
            DB::statement('DELETE FROM translator_translations WHERE item LIKE "%filter.label%" OR item LIKE "%filter.subtitle%"');
            TranslationCache::flushAll();
            $handle->fgetcsv(','); // burn first line (titles)
            while ($line = $handle->fgetcsv(','))
            {
                $filter = new Filter();
                $filter->context_id = (($line[5] === "")?null:$line[5]);
                $filter->filter_group_id = $line[3];
                $filter->order = $line[4];
                $filter->type = $line[6];
                $filter->label = $line[7];
                $filter->subtitle = $line[12];
                $filter->data_json = $line[17];
                $filter->options_json = $line[18];
                $filter->save();
                list($namespace, $group, $item) = $this->_translator->parseCode($filter->translationCodeFor('label'));
                $line[8] !== "" && $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[8]
                ]);
                $line[9] !== "" && $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[9]
                ]);
                $line[10] !== "" && $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[10]
                ]);
                $line[11] !== "" && $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[11]
                ]);
                list($namespace, $group, $item) = $this->_translator->parseCode($filter->translationCodeFor('subtitle'));
                $line[13] !== "" && $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[13]
                ]);
                $line[14] !== "" && $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[14]
                ]);
                $line[15] !== "" && $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[15]
                ]);
                $line[16] !== "" && $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[16]
                ]);
            }
            Cache::tags(['verticals'])->flush();
            response('', 200);
        }
    }

    public function post_fg_csv(Request $request)
    {
        if ($request->file('csv')->isValid())
        {
            $csv = $request->file('csv');
            $handle = $csv->openFile();
            $handle->setFlags(\SplFileObject::SKIP_EMPTY);
            DB::table('filter_groups')->truncate();
            DB::statement('DELETE FROM translator_translations WHERE item LIKE "%filtergroup.label%" OR item LIKE "%filtergroup.expand%" OR item LIKE "%filtergroup.collapse%"');
            TranslationCache::flushAll();
            $handle->fgetcsv(','); // burn first line (titles)
            while ($line = $handle->fgetcsv(','))
            {
                $fgc = new FilterGroup();
                $fgc->id = $line[3];
                $fgc->filter_group_collection_id = $line[2];
                $fgc->label = $line[6];
                $fgc->type = $line[4];
                $fgc->slug = $line[5];
                $fgc->expand = $line[11];
                $fgc->collapse = $line[16];
                $fgc->columns = (($line[0] === "")?null:$line[0]);
                $fgc->save();
                list($namespace, $group, $item) = $this->_translator->parseCode($fgc->translationCodeFor('label'));
                $line[7] !== "" && $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[7]
                ]);
                $line[8] !== "" && $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[8]
                ]);
                $line[9] !== "" && $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[9]
                ]);
                $line[10] !== "" && $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[10]
                ]);
                list($namespace, $group, $item) = $this->_translator->parseCode($fgc->translationCodeFor('expand'));
                $line[12] !== "" && $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[12]
                ]);
                $line[13] !== "" && $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[13]
                ]);
                $line[14] !== "" && $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[14]
                ]);
                $line[15] !== "" && $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[15]
                ]);
                list($namespace, $group, $item) = $this->_translator->parseCode($fgc->translationCodeFor('collapse'));
                $line[17] !== "" && $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[17]
                ]);
                $line[18] !== "" && $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[18]
                ]);
                $line[19] !== "" && $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[19]
                ]);
                $line[20] !== "" && $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[20]
                ]);
            }
            Cache::tags(['verticals'])->flush();
            response('', 200);
        }
    }

    public function post_vertical_csv(Request $request)
    {
        if ($request->file('csv')->isValid())
        {
            $csv = $request->file('csv');
            $handle = $csv->openFile();
            $handle->setFlags(\SplFileObject::SKIP_EMPTY);
            DB::table('verticals')->truncate();
            DB::statement('DELETE FROM translator_translations WHERE item LIKE "%vertical.name%"');
            TranslationCache::flushAll();
            $handle->fgetcsv(','); // burn first line (titles)
            while ($line = $handle->fgetcsv(','))
            {
                $vertical = new Vertical();
                $vertical->id = $line[1];
                $vertical->name = $line[2];
                $vertical->layout_type = (integer) $line[7];
                $vertical->representative_tag_id = (integer) $line[8];
                $vertical->enabled = (integer) $line[9];
                $vertical->save();
                list($namespace, $group, $item) = $this->_translator->parseCode($vertical->translationCodeFor('name'));
                $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[3]
                ]);
                $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[4]
                ]);
                $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[5]
                ]);
                $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[6]
                ]);
            }
            Cache::tags(['verticals'])->flush();
            response('', 200);
        }
    }

    public function post_fgc_csv(Request $request)
    {
        if ($request->file('csv')->isValid())
        {
            $csv = $request->file('csv');
            $handle = $csv->openFile();
            $handle->setFlags(\SplFileObject::SKIP_EMPTY);
            DB::table('filter_group_collections')->truncate();
            DB::statement('DELETE FROM translator_translations WHERE item LIKE "%filtergroupcollection.label%"');
            TranslationCache::flushAll();
            $handle->fgetcsv(','); // burn first line (titles)
            while ($line = $handle->fgetcsv(','))
            {
                $fgc = new FilterGroupBatch();
                $fgc->id = $line[2];
                $fgc->vertical_id = $line[1];
                $fgc->label = $line[3];
                $fgc->styling_json = json_encode(['buttonType' => $line[8], 'panelType' => $line[9]]);
                $fgc->save();
                list($namespace, $group, $item) = $this->_translator->parseCode($fgc->translationCodeFor('label'));
                $this->_translator->create([
                    'locale' => 'fr',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[4]
                ]);
                $this->_translator->create([
                    'locale' => 'de',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[5]
                ]);
                $this->_translator->create([
                    'locale' => 'en_US',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[6]
                ]);
                $this->_translator->create([
                    'locale' => 'en_IE',
                    'namespace' => $namespace,
                    'group' => $group,
                    'item' => $item,
                    'text' => $line[7]
                ]);
            }
            Cache::tags(['verticals'])->flush();
            response('', 200);
        }
    }

    private function _handle_open_close($panel_type, $filter_group, $open = true)
    {
        $title = $filter_group['title'];
        $type = $filter_group['inputType'];
        $can_expand = ($type == "checkbox");
        return (($panel_type == "large" && $can_expand)?(($open)?"See all " . lcfirst($title):"Close " . lcfirst($title)):null);
    }

    public function get_vertical_by_id($vertical_id)
    {
        return Cache::tags(['verticals'])->remember('vertical_' . $this->locale() . '_' . $vertical_id, DateInterval::createFromDateString('1 day'), function() use ($vertical_id) {
            $vertical = $this->_get_vertical_builder()->where('id', $vertical_id)->get()->first();
            $this->_manipulate_vertical($vertical);
            return $vertical->toArray();
        });
    }

    public function get_all_verticals()
    {
        return Cache::tags(['verticals'])->remember('verticals_' . $this->locale(), DateInterval::createFromDateString('1 day'), function() {
            return $this->_get_vertical_builder()
            ->get()
            ->each(function ($vert) {
                $this->_manipulate_vertical($vert);
            })->toArray();
        });
    }

    private function _manipulate_vertical($vert)
    {
        $vert->setHidden([]);
        $vert->setVisible(['id', 'slug', 'filterGroupCollections', 'title', 'layoutType']);
        $vert->fgcs->each(function ($fgc) {
            $fgc->setHidden([]);
            $fgc->setVisible(['id', 'buttonText', 'buttonType', 'panelType', 'filterGroups']);
            $fgc->fgs->each(function ($fg) {
                $fg->setHidden([]);
                $fg->setVisible(['id', 'title', 'slug', 'inputType', 'filters', 'collapseText', 'expandText', 'columns']);
                $fg->filters->each(function ($filter) {
                    $filter->setHidden([]);
                    $filter->setVisible(['id', 'contextId', 'title', 'data', 'options']);
                });
            });
        });
    }

    private function _get_vertical_builder()
    {
        return Vertical::
            with('fgcs',
            'fgcs.fgs',
            'fgcs.fgs.filters');
    }

    private function _array_to_csv_download($array, $filename = "export.csv", $delimiter = ",")
    {
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="' . $filename . '";');

        // open the "output" stream
        // see http://www.php.net/manual/en/wrappers.php.php#refsect2-wrappers.php-unknown-unknown-unknown-descriptioq
        $f = fopen('php://output', 'w');

        foreach ($array as $line)
        {
            fputcsv($f, $line, $delimiter);
        }
    }
}