<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper('form');
		$this->load->helper('url');
		$this->load->helper('cookie');
		$this->load->helper('file');//guillaume modif
		
		$this->load->library('Form_validation');
		$this->load->library('image_lib');
		$this->load->library('Paypal_Lib');
		$this->load->library('Twoco_Lib');
		$this->load->library('email');
		$this->load->library('Services_JSON');

		
		
		$this->path = realpath(APPPATH . '../images');
		$this->logo = realpath(APPPATH . '../logo');
		$this->font = realpath(APPPATH . '../core');
	}

	function index()
	{
	       //require_once (base_url()."json_new/JSON.php");
		  
		$this->load->view('upload_form', array('error' => ' ' ));
		
		$a= array(
      0    => "a",
      1  => "b",
      2  => "c",
      3 => "d",
);
       $en='{ "results" : [ { "address_components" : [ { "long_name" : "Indi", "short_name" : "Indi", "types" : [ "locality", "political" ] }, { "long_name" : "Bijapur", "short_name" : "Bijapur", "types" : [ "administrative_area_level_2", "political" ] }, { "long_name" : "Karnataka", "short_name" : "KA", "types" : [ "administrative_area_level_1", "political" ] }, { "long_name" : "India", "short_name" : "IN", "types" : [ "country", "political" ] }, { "long_name" : "586209", "short_name" : "586209", "types" : [ "postal_code" ] } ], "formatted_address" : "Indi, Karnataka 586209, India", "geometry" : { "bounds" : { "northeast" : { "lat" : 17.18628450, "lng" : 75.9668970 }, "southwest" : { "lat" : 17.15309260, "lng" : 75.94629750 } }, "location" : { "lat" : 17.1769110, "lng" : 75.95316199999999 }, "location_type" : "APPROXIMATE", "viewport" : { "northeast" : { "lat" : 17.18628450, "lng" : 75.9668970 }, "southwest" : { "lat" : 17.15309260, "lng" : 75.94629750 } } }, "types" : [ "locality", "political" ] } ], "status" : "OK" }';
          //print_r($a);
		  $json = new Services_JSON();
		echo $json->encode($a);
		print_r($json->decode($en));
	}

	function do_upload()
	{
		$config['upload_path'] = './uploads/';
		$config['allowed_types'] = 'gif|jpg|png';
		$config['max_size']	= '100';
		$config['max_width']  = '1024';
		$config['max_height']  = '768';

		$this->load->library('upload', $config);

		if ( ! $this->upload->do_upload())
		{
			$error = array('error' => $this->upload->display_errors());

			$this->load->view('upload_form', $error);
		}
		else
		{
			$data = array('upload_data' => $this->upload->data());

			$this->load->view('upload_success', $data);
		}
	}
}