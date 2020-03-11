<?php
  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

  class Awslib {

    function __construct()
    {
      require_once('aws-sdk/aws-autoloader.php');
    }
  }