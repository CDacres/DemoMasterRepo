<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Landings extends Controller_Base__Admin
{
    public function index()
    {
        $this->_add_js(auto_version('administrator/landings.js'));
        $this->data['message_element'] = 'administrator/landings/view_list_landings';
        $this->_render();
    }

    public function update_country()
    {
        try
        {
            $country_code = $this->input->post('country_code', 'required');
            $data = new Base__Null();
            if (isset(config_item('supported_locales')[$country_code]) && isset(config_item('supported_cctlds')[config_item('supported_locales')[$country_code]]))
            {
                $language = config_item('supported_cctlds')[config_item('supported_locales')[$country_code]]['lang'];
                $modelTags = Model__tags::class;
                $this->load->model($modelTags);
                $tags = $this->$modelTags->get_all_tags_by_lang($language);
                $modelLocations = Model__locations::class;
                $this->load->model($modelLocations);
                $locations = $this->$modelLocations->get_location_objects_collection(false, $country_code);
                $modelVerticals = Model__verticals::class;
                $this->load->model($modelVerticals);
                $verticals = $this->$modelVerticals->get_all_vertical_collection($language);
            }
            else
            {
                $language = 'en';
                $tags = new Base__Null();
                $locations = new Base__Null();
                $verticals = new Base__Null();
            }
            echo $data->get_as_ajax_response('Choosing that option gave an error.', false, ['meta_table_html' => $this->load->view(THEME_FOLDER . '/administrator/landings/meta_table', ['lang' => $this->data['lang'], 'tags' => $tags], true), 'tag_labels' => $tags->get_as_array(), 'locations' => $locations->get_as_array(), 'verticals' => $verticals->get_as_array(), 'language' => $language, 'country_lang_url' => config_item('supported_locales')[$country_code]]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function update_tag_label()
    {
        try
        {
            $tag_label_id = $this->input->post('tag_label_id', 'is_natural|required');
            $language = $this->input->post('language', 'required');
            $country_lang_url = $this->input->post('country_lang_url', 'required');
            $this->_add_language($language);
            $modelTags = Model__tags::class;
            $this->load->model($modelTags);
            $tag_label = $this->$modelTags->get_tag_label_by_id($language, $tag_label_id);
            $modelLandingPages = Model__landing_pages::class;
            $this->load->model($modelLandingPages);
            $landing_pages = $this->$modelLandingPages->get_landing_pages_by_tag_label_id($language, $tag_label_id);
            if (!$landing_pages->exists_in_db())
            {
                $landing_pages = new Base__Null();
                $country_locations = new Base__Null();
            }
            else
            {
                $modelLocations = Model__locations::class;
                $this->load->model($modelLocations);
                $country_locations = $this->$modelLocations->get_location_objects_collection(false, null, $landing_pages->get_first()->get('tag_id'));
            }
            echo $landing_pages->get_as_ajax_response('Choosing that option gave an error.', false, ['landing_page_html' => $this->load->view(THEME_FOLDER . '/administrator/landings/landing_page_list', ['lang' => $this->data['lang'], 'country_lang_url' => $country_lang_url, 'landing_pages' => $landing_pages, 'country_locations' => $country_locations, 'tag_label' => $tag_label], true)]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function update_location()
    {
        try
        {
            $location_id = $this->input->post('location_id', 'is_natural|required');
            $language = $this->input->post('language', 'required');
            $country_lang_url = $this->input->post('country_lang_url', 'required');
            $this->_add_language($language);
            $modelLandingPages = Model__landing_pages::class;
            $this->load->model($modelLandingPages);
            $landing_pages = $this->$modelLandingPages->get_landing_pages_by_location_id($language, $location_id);
            if (!$landing_pages->exists_in_db())
            {
                $landing_pages = new Base__Null();
            }
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $chosen_location = $this->$modelLocations->get_location_by_id($location_id);
            echo $landing_pages->get_as_ajax_response('Choosing that option gave an error.', false, ['landing_page_html' => $this->load->view(THEME_FOLDER . '/administrator/landings/landing_page_list', ['lang' => $this->data['lang'], 'country_lang_url' => $country_lang_url, 'landing_pages' => $landing_pages, 'chosen_location' => $chosen_location], true)]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function update_tag_label_location()
    {
        try
        {
            $tag_label_id = $this->input->post('tag_label_id', 'is_natural|required');
            $location_id = $this->input->post('location_id', 'is_natural|required');
            $language = $this->input->post('language', 'required');
            $country_lang_url = $this->input->post('country_lang_url', 'required');
            $this->_add_language($language);
            $modelTags = Model__tags::class;
            $this->load->model($modelTags);
            $tag_label = $this->$modelTags->get_tag_label_by_id($language, $tag_label_id);
            $modelLandingPages = Model__landing_pages::class;
            $this->load->model($modelLandingPages);
            $landing_pages = $this->$modelLandingPages->get_landing_pages_by_tag_label_and_location_ids($language, $tag_label_id, $location_id);
            if (!$landing_pages->exists_in_db())
            {
                $landing_pages = new Base__Null();
            }
            $modelLocations = Model__locations::class;
            $this->load->model($modelLocations);
            $chosen_location = $this->$modelLocations->get_location_by_id($location_id);
            echo $landing_pages->get_as_ajax_response('Choosing that option gave an error.', false, ['landing_page_html' => $this->load->view(THEME_FOLDER . '/administrator/landings/landing_page_list', ['lang' => $this->data['lang'], 'country_lang_url' => $country_lang_url, 'landing_pages' => $landing_pages, 'chosen_location' => $chosen_location, 'tag_label' => $tag_label], true)]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function update_vertical()
    {
        try
        {
            $vertical_id = $this->input->post('vertical_id', 'is_natural|required');
            $language = $this->input->post('language', 'required');
            $gridArr = [];
            $gridValuesArr = [];
            $gridSearchVolume = [];
            $modelTags = Model__tags::class;
            $this->load->model($modelTags);
            $tag_labels = $this->$modelTags->get_tag_labels_by_vertical_id($language, $vertical_id);
            if (!$tag_labels->exists_in_db())
            {
                $tag_labels = new Base__Null();
                $similar_tag_labels = new Base__Null();
            }
            else
            {
                foreach ($tag_labels->object() as $tag_label)
                {
                    $gridArr[$tag_label->get_id()] = [
                        'label' => $tag_label->get('label'),
                        'col' => true
                    ];
                }
                $modelSimiliarTagLabels = Model__landing_page_similar_tag_labels::class;
                $this->load->model($modelSimiliarTagLabels);
                $similar_tag_labels = $this->$modelSimiliarTagLabels->get_landing_page_similar_tag_label_collection_by_vertical_id_and_lang(config_item('language_code'), $vertical_id);
                if ($similar_tag_labels->get_count() > 0)
                {
                    foreach ($similar_tag_labels->object() as $similar_tag_label)
                    {
                        if ($tag_labels->get_object_by_id($similar_tag_label->get('linked_tag_language_label_id'))->is_null_object())
                        {
                            $gridArr[$similar_tag_label->get('linked_tag_language_label_id')] = [
                                'label' => $similar_tag_label->get('tag_label'),
                                'col' => false
                            ];
                        }
                        $gridValuesArr[$similar_tag_label->get('tag_language_label_id')][$similar_tag_label->get('linked_tag_language_label_id')] = $similar_tag_label->get_id();
                        $gridSearchVolume[$similar_tag_label->get('linked_tag_language_label_id')] = $similar_tag_label->get('search_volume');
                    }
                }
                asort($gridArr);
            }
            echo $tag_labels->get_as_ajax_response('Choosing that option gave an error.', false, ['linked_tag_label_grid_html' => $this->load->view(THEME_FOLDER . '/administrator/landings/linked_tag_label_grid', ['gridArr' => $gridArr, 'gridValuesArr' => $gridValuesArr, 'gridSearchVolume' => $gridSearchVolume], true), 'vertical_tag_labels' => $tag_labels->get_as_array(), 'language' => $language]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function update_linked_tag_label()
    {
        try
        {
            $tag_label_id = $this->input->post('tag_label_id', 'is_natural|required');
            $language = $this->input->post('language', 'required');
            $modelTags = Model__tags::class;
            $this->load->model($modelTags);
            $tag_label = $this->$modelTags->get_tag_label_by_id($language, $tag_label_id);
            if (!$tag_label->exists_in_db())
            {
                $tag_label = new Base__Null();
                $linked_tag_labels = new Base__Null();
            }
            else
            {
                $modelSimiliarTagLabels = Model__landing_page_similar_tag_labels::class;
                $this->load->model($modelSimiliarTagLabels);
                $linked_tag_labels = $this->$modelSimiliarTagLabels->get_landing_page_similar_tag_label_collection_by_label_id_and_lang($language, $tag_label_id);
            }
            echo $tag_label->get_as_ajax_response('Choosing that option gave an error.', false, ['linked_tag_label_list_html' => $this->load->view(THEME_FOLDER . '/administrator/landings/linked_tag_label_list', ['linked_tag_labels' => $linked_tag_labels, 'tag_label' => $tag_label], true)]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    private function _add_language($language)
    {
        if (!isset(config_item('languages')[$language]))
        {
            $language = 'en';
        }
        $this->config->set_item('language_code', $language);
        $this->lang->load('common', $language);
        $this->lang->load('home', $language);
    }
}