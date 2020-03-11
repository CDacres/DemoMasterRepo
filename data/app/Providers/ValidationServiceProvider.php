<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Validator;

class ValidationServiceProvider extends ServiceProvider
{
    public function boot() {

      Validator::extend('bobbins', function($a, $b, $c, $d) {
        return $b == 'bobbins';
      }, 'problem with :bobbins');

      Validator::replacer('bobbins', function($a, $b, $c, $d) {
        return str_replace(':bobbins', $d[0], $a);     
      });

    }
}
