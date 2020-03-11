<?php

namespace App\Zipcube;

use App\ZipcubeInterface\DomainCommand;
use Illuminate\Support\Facades\Cache;

use App\Zipcube\Persistence\_\Commands\UpdateVenue;
use App\Zipcube\Persistence\_\Commands\CreateVenue;

use App\Zipcube\Persistence\_\Queries\AssetExistsByID;

use App\DomainFramework\State;

use Finite\StateMachine\StateMachine;
use Finite\Loader\ArrayLoader;

class ZZZStateMachine extends DomainCommand {

  private function loaderArray() {
    return [
      'class' => State::class,
      'states' => [
        'new' => [
          'type' => 'initial',
          'properties' => ['payload' => null, 'confirmed' => null]
      ],
        'pending' => [
          'type' => 'normal',
          'properties' => ['payload' => null, 'confirmed' => null]
        ],
        'done' => ['type' => 'final']
      ],
      'transitions' => [
        'propose' => ['from' => ['new', 'pending'], 'to' => 'pending', 'properties' => ['payload' => null, 'confirmed' => null]],
        'accept' => ['from' => ['pending'], 'to' => 'done'],
      ],
      'callbacks' => [
        'after' => [
          [
            'to' => 'done', 'do' => function($object, $event) {
              $this->test($object, $event);
            }
          ]
        ]
      ]
    ];
  }

  public function test($object, $event) {
    /* echo "test"; */
    /* print_r($object); */
  }

  private function getUniqueStateId($stateId) {
    return md5(get_called_class() . $stateId);
  }

  private function getOrCreateStateMachine($stateId) {
    $state = Cache::pull($this->getUniqueStateId($stateId));
    if (is_null($state)) {
      $machine = new StateMachine(new State());
      $loader = new ArrayLoader($this->loaderArray());
      $loader->load($machine);
      $machine->initialize();
    } else {
      $machine = new StateMachine();
      $loader = new ArrayLoader($this->loaderArray());
      $loader->load($machine);
      $machine->setObject($state);
      $machine->initialize();
    }
    return $machine;
  }

  protected function suspendState($state) {
    Cache::put($this->getUniqueStateId($stateId), $state, 0.1);
  }

  private function suspendStateMachine($stateId, $machine) {
    $state = $machine->getObject();
    Cache::put($this->getUniqueStateId($stateId), $state, 0.1);
  }

  public function hydrateVenue(VenueUpsert $payload) {
    $stateId = $payload->venue->id;
    $machine = $this->getOrCreateStateMachine($stateId);
    $machine->apply('propose', ['payload' => $payload]);
    $this->suspendState($stateId, $machine->getObject());
    $nextMachine = $this->getOrCreateStateMachine($stateId);
    $machine->apply('propose', ['confirmed' => true]);
    print_r($machine->getCurrentState()->getProperties());
  }

  public function requestVenueUpsert(VenueUpsert $payload) {
    $machine->apply('propose');
    $stateStr = serialize($machine->getObject());
    $newState = unserialize($stateStr);
    $newMachine = new StateMachine();
    $loader = new ArrayLoader($loaderArray);
    $loader->load($newMachine);
    $newMachine->setObject($newState);
    $newMachine->initialize();
    $newMachine->apply('accept');

    $venueID = $payload->venue->id;
    $userAssetTuple = new UserAssetTuple(['user' => $payload->user, 'assetId' => $venueID]);
    $canUpdate = $this->callSiblingMethod(Permissions::class, 'checkUserCanUpdate', $userAssetTuple)->value;
    $assetExists = $this->query(AssetExistsByID::class, new ID(['id' => $venueID]))->value;
    if ($assetExists) {
      if ($canUpdate) {
        $this->call(UpdateVenue::class, $payload->venue);
      } else {
        //TODO fire some sort of failure event to be subscribed to.
      }
    }
    else {
      $this->call(CreateVenue::class, $payload->venue);
      $this->callSiblingMethod(Permissions::class, 'giveUserAssetOwnership', $userAssetTuple);
    }
  }
}
