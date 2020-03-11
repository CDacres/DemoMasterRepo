<?php
namespace App\InjectionWrappers;
use GrahamCampbell\Flysystem\FlysystemManager;

class FlySystem
{
    public $manager;

    public function __construct(FlysystemManager $manager)
    {
        $this->manager = $manager;
    }
}