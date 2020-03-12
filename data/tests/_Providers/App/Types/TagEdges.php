<?php

namespace Tests\_Providers\App\Types;

use App\Types\Id;
use App\Types\TagEdge;

class TagEdges {

  public function buildTagEdge(int $tagId): TagEdge {
    return new TagEdge([
      'tagId' => new Id(['value' => strval($tagId)]),
      'suppressed' => false,
    ]);
  }

  public function buildSuppressedTagEdge(int $tagId): TagEdge {
    return new TagEdge([
      'tagId' => new Id(['value' => strval($tagId)]),
      'suppressed' => true,
    ]);
  }
}