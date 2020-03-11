<?php

namespace Tests\_Providers\App\Types;

use App\Types\ProductContext;

class ProductContexts {

  public function buildProductContext() {
    return new ProductContext([
      'website' => 'www.test.co.uk',
    ]);
  }
}