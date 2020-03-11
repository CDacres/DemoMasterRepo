<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

use Google\Cloud\Translate\TranslateClient;

class Controller_Base__Public extends Controller_Base__Page
{
    function __construct()
    {
        parent::__construct();
        $this->template = 'page_template';
    }

    public function get_reviews()
    {
        $translate = new TranslateClient(['key' => 'AIzaSyALXMs8-iGTe7vIV5ItmF9YrhoJrttFiJg']);
        foreach (config_item('languages') as $trans_langKey => $trans_lang)
        {
            $path = $_SERVER["DOCUMENT_ROOT"] . '/reviews_cache_' . $trans_langKey . '.json';
            if (!file_exists($path) || filemtime($path) < time() - $this->config->item('review_cache_seconds'))
            {
                $reviews = json_decode(file_get_contents('https://api.reviews.co.uk/merchant/latest?store=zipcube&limit=21'), true);
                $cached_file = fopen($path, "w");
                $reviewArr = [];
                if (isset($reviews['reviews']))
                {
                    foreach ($reviews['reviews'] as $reviewKey => $review)
                    {
                        foreach ($review as $reviewValueKey => $reviewValue)
                        {
                            $reviewArr[$reviewKey][$reviewValueKey] = $reviewValue;
                            if ($trans_lang['translate_reviews'] && ($reviewValueKey == 'comments' || $reviewValueKey == 'date'))
                            {
                                $result = $translate->translate($reviewValue, ['target' => $trans_langKey]);
                                $reviewArr[$reviewKey][$reviewValueKey] = $result['text'];
                                if ($trans_langKey == 'fr' && $reviewValueKey == 'comments')
                                {
                                    $reviewArr[$reviewKey][$reviewValueKey] = str_replace('chambre', 'salle', $result['text']);
                                }
                            }
                            else
                            {
                                $reviewArr[$reviewKey][$reviewValueKey] = $reviewValue;
                            }
                        }
                    }
                    fwrite($cached_file, json_encode($reviewArr));
                }
                fclose($cached_file);
            }
            if (config_item('language_code') == $trans_langKey)
            {
                $response = file_get_contents($path);
                if ($response !== false)
                {
                    return json_decode($response, true);
                }
            }
        }
        return false;
    }

    public function get_current_promotions()
    {
//        $modelPromotions = Model__promotions::class;
//        $this->load->model($modelPromotions);
//        $this->data['promotions'] = $this->$modelPromotions->get_current_promotions();
    }
}