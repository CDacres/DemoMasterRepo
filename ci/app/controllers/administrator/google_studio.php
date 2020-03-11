<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Google_Studio extends Controller_Base__Admin
{
    public function index()
    {
        redirect($this->data['country_lang_url'] . '/administrator');
    }

    public function rooms()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_room_list';
        $this->_render();
    }

    public function rooms_approval()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_room_approval_list';
        $this->_render();
    }

    public function venues()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_venue_list';
        $this->_render();
    }

    public function asset_photos()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_photo_list';
        $this->_render();
    }

    public function site_images()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_site_image_list';
        $this->_render();
    }

    public function tags()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_tag_list';
        $this->_render();
    }

    public function landing_pages()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_landing_page_list';
        $this->_render();
    }

    public function reviews()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_review_list';
        $this->_render();
    }

    public function performance()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_performance_list';
        $this->_render();
    }

    public function invoices()
    {
        $this->data['message_element'] = 'administrator/google_studio_reports/external_invoice_list';
        $this->_render();
    }
}