<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Models\Tags\TagLabel;
use App\Models\Tags\TagLabelMeta;
use App\Models\Tags\Tag;
use Illuminate\Support\Facades\DB;

use DateInterval;

class Tags extends Controller
{
    protected $defaultClass = Tag::class;

//    route commented out unless needed in an emergency
//    public function remungeTagStructure()
//    {
//        Tag::fixTree();
//        TagLabel::generate_quick_slugs();
//        TagLabel::generate_quick_verticals();
//        Cache::tags(['tags'])->flush();
//        response('', 200);
//    }

    public function get_all_tags_deprecated()
    {
        return Cache::tags(['tags_deprecated'])->remember('tags', DateInterval::createFromDateString('1 day'), function() {
            return Tag::get()->toArray();
        });
    }

    public function get_all()
    {
        $tags = Cache::tags(['tags'])->remember('tags', DateInterval::createFromDateString('1 day'), function() {
            return Tag::get();
        });
        return $this->serialisedJsonResponse($tags, 'tags');
    }

    public function post_tags_csv(Request $request)
    {
        if ($request->file('csv')->isValid())
        {
            $csv = $request->file('csv');
            $handle = $csv->openFile();
            $handle->setFlags(\SplFileObject::SKIP_EMPTY);
            DB::table('tag_language_labels')->truncate();
            DB::table('tag_language_label_meta')->truncate();
            DB::table('tags')->truncate();
            $handle->fgetcsv(','); // burn first line (indices)
            $handle->fgetcsv(','); // burn second line (titles)
            while ($line = $handle->fgetcsv(','))
            {
                if (((int)$line[0] < 307) && $line[1] != "1")
                {
                    $canonical = false;
                    $tag_id = null;
                    if ($line[12] == "")
                    {
                        DB::table('tags')->insert([
                        [
                            'id' => $line[0],
                            'name' => $line[2],
                            'parent_id' => (($line[11] == "")?null:$line[11]),
                            'high_level_landers' => $line[14],
                            'low_level_landers' => $line[92],
                            'search_falls_back' => $line[94],
                            'created_at' => '2017-10-17 10:00:00']
                        ]);
                        $tag_id = $line[0];
                        $canonical = true;
                    }
                    else
                    {
                        $tag_id = $line[12];
                    }
                    $languages = collect(['en', 'us', 'ie', 'fr', 'de']);
                    $languages->each(function ($lang) use ($line, $tag_id, $canonical) {
                        switch ($lang)
                        {
                            case 'en':
                                $lang_loc = "en";
                                $label_offset = 0;
                                $slug_offset = 0;
                            break;

                            case 'de':
                                $lang_loc = "de";
                                $label_offset = 2;
                                $slug_offset = 2;
                            break;

                            case 'fr':
                                $lang_loc = "fr";
                                $label_offset = 1;
                                $slug_offset = 1;
                            break;

                            case 'us':
                                $lang_loc = "en_US";
                                $label_offset = 0;
                                $slug_offset = 3;
                            break;

                            case 'ie':
                                $lang_loc = "en_IE";
                                $label_offset = 0;
                                $slug_offset = 4;
                            break;

                            default:
                            break;
                        }
                        $label_index = (2 + $label_offset);
                        if ($this->_check_field($line[$label_index]))
                        {
                            $label = new TagLabel();
                            if ($tag_id < 6 && $canonical)
                            {
                                $label->default_order = $tag_id;
                            }
                            $label->tag_id = $tag_id;
                            $label->language_code = $lang_loc;
                            $label->label = $line[$label_index];
                            $label->preferred = $canonical;
                            $label->save();
                            $label_id = $label->id;
                            $slug_index = (5 + $slug_offset);
                            $title_index = (59 + $label_offset);
                            $meta_index = (64 + $slug_offset);
                            if ($this->_check_field($line[$slug_index]))
                            {
                                $meta = new TagLabelMeta();
                                $meta->tag_language_label_id = $label_id;
                                $meta->slug = $line[$slug_index];
                                $meta->preferred = 1;
                                $meta->search_title = $line[$title_index];
                                $meta->search_meta = $line[$meta_index];
                                $meta->save();
                            }
                        }
                    });
                }
            }
            Tag::fixTree();
            TagLabel::generate_quick_slugs();
            TagLabel::generate_quick_verticals();
            Cache::tags(['tags'])->flush();
            response('', 200);
        }
    }

    private function _check_field($slug)
    {
        return $slug !== 0 && $slug != "0" && $slug != "";
    }
}