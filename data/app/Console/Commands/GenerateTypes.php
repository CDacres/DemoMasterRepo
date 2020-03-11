<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateTypes extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'domain:proto';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generates Types from protobuf definitions';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
      $protoPath = base_path() . '/protobuf';
      $appPath = base_path() . '/app';
      $protos = "zipcube/assets.proto zipcube/generics.proto zipcube/gql.proto";
      $deleteCommand = sprintf('rm -rf %s/ProtobufMeta/* %s/Types/*', $protoPath, $appPath);
      // can be used to generate gql schema directly from proto. TODO: devops - put into server repo
      /* $generateCommand = sprintf('%1$s/protoc -I=%1$s/proto --php_out=%1$s --gql_out=%1$s --plugin=protoc-gen-gql=%1$s/protoc-gen-gql --grpc_out=%1$s --plugin=protoc-gen-grpc=%1$s/grpc_php_plugin %2$s', $protoPath, $protos); */
      $generateCommand = sprintf('%1$s/protoc -I=%1$s/proto --php_out=%1$s --grpc_out=%1$s --plugin=protoc-gen-grpc=%1$s/grpc_php_plugin %2$s', $protoPath, $protos);
      $cleanupCommand = sprintf('mv %s/App/Types %s; rm -rf %1$s/App', $protoPath, $appPath);
      exec($deleteCommand);
      exec($generateCommand);
      exec($cleanupCommand);
    }
}
