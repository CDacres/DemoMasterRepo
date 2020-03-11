<?php

namespace App\Http\GraphQL\Helpers;

use App\Types\GQL\MutationResult;
use App\Types\GQL\Problem;
use App\Types\GQL\ProblemType;

class MutationResultBuilder
{
  private $result;

  public function __construct() {
    $this->result = new MutationResult();
  }

  public function addProblem(string $type, string $message): MutationResultBuilder {
    $problem = new Problem();
    $problem->setType($type);
    $problem->setMessage($message);
    $this->result->getProblems()[] = $problem;
    return $this;
  }

  public function addAuthenticationProblem(string $message): MutationResultBuilder {
    return $this->addProblem(ProblemType::AUTHENTICATION, $message);
  }

  public function addValidationProblem(string $message): MutationResultBuilder {
    return $this->addProblem(ProblemType::VALIDATION, $message);
  }

  public function send(): MutationResult {
    return $this->result;
  }

}
