<?php

namespace App\Providers\Lighthouse;

use Nuwave\Lighthouse\Schema\Context as BaseContext;

use App\Types\UserClaims;
use App\Types\UserClaim;
use App\Types\UserRole;
use App\Types\Id;

use App\Models\User;

class Context extends BaseContext
{
  public function userClaims(): ?UserClaims
  {
    $user = $this->user();
    if (is_null($user)) {
      return null;
    }
    $userUC = $this->generateUserClaim($user);
    $actorUC = $this->generateActorClaim($user);
    return (new UserClaims())->setUser($userUC)->setActor($actorUC);
  }

  private function generateActorClaim(User $user): UserClaim {
    $actor = $user;
    $adminId = $user->admin_spoof_id;
    if (!is_null($adminId)) {
      $adminUser = User::find($adminId);
      if (!is_null($adminUser)) {
        $actor = $adminUser;
      }
    }
    return $this->generateUserClaim($actor);
  }

  private function generateUserClaim(User $user): UserClaim {
    return (new UserClaim())
      ->setId(new Id(['value' => $user->id]))
      ->setRoles($this->generateUserRoles($user));
  }

  private function generateUserRoles(User $user): array {
    $roles = [UserRole::LOGGEDIN];
    if ($user->isAdmin()) {
      $roles[] = UserRole::ADMIN;
    }
    if ($user->is_venue_owner) {
      $roles[] = UserRole::VENUEOWNER;
    }
    return $roles;
  }
}
