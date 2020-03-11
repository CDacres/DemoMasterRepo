<?php

use GraphQL\Error\Debug;
use GraphQL\Validator\Rules\DisableIntrospection;

return [

    /*
    |--------------------------------------------------------------------------
    | Route configuration
    |--------------------------------------------------------------------------
    |
    | Additional configuration for the route group.
    | Check options here https://lumen.laravel.com/docs/routing#route-groups
    |
    | Beware that middleware defined here runs before the GraphQL execution phase.
    | This means that errors will cause the whole query to abort and return a
    | response that is not spec-compliant. It is preferable to use directives
    | to add middleware to single fields in the schema.
    | Read more about this in the docs https://lighthouse-php.netlify.com/docs/auth.html#apply-auth-middleware
    |
    */
    'route' => [
        'uri' => 'graphql',
        'name' => 'graphql',
        'prefix' => '',
        'middleware' => ["auth", "auth:api"]
    ],

    /*
    |--------------------------------------------------------------------------
    | Schema declaration
    |--------------------------------------------------------------------------
    |
    | This is a path that points to where your GraphQL schema is located
    | relative to the app path. You should define your entire GraphQL
    | schema in this file (additional files may be imported).
    |
    */
    'schema' => [
      'register' => base_path('app/Http/GraphQL/Schemata/schema.graphql'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Schema Cache
    |--------------------------------------------------------------------------
    |
    | A large part of the Schema generation is parsing into an AST.
    | This operation is pretty expensive so it is recommended to enable
    | caching in production mode.
    |
    */
    'cache' => [
        'enable' => env('LIGHTHOUSE_CACHE_ENABLE', true),
        'key' => env('LIGHTHOUSE_CACHE_KEY', 'lighthouse-schema'),
        'ttl' => env('LIGHTHOUSE_CACHE_TTL', 100),
    ],

    /*
    |--------------------------------------------------------------------------
    | Directives
    |--------------------------------------------------------------------------
    |
    | List directories that will be scanned for custom server-side directives.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Namespaces
    |--------------------------------------------------------------------------
    |
    | These are the default namespaces where Lighthouse looks for classes
    | that extend functionality of the schema.
    |
    */
    'namespaces' => [
        'models' => 'App\\Http\\GraphQL\\Models',
        'queries' => 'App\\Http\\GraphQL\\Queries',
        'mutations' => 'App\\Http\\GraphQL\\Mutations',
        'interfaces' => 'App\\Http\\GraphQL\\Interfaces',
        'unions' => 'App\\Http\\GraphQL\\Unions',
        'scalars' => 'App\\Http\\GraphQL\\Scalars',
        'subscriptions' => 'App\\GraphQL\\Subscriptions',
        'directives' => ['App\\Http\\GraphQL\\Directives'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Security
    |--------------------------------------------------------------------------
    |
    | Control how Lighthouse handles security related query validation.
    | This configures the options from http://webonyx.github.io/graphql-php/security/
    | A setting of "0" means that the validation rule is disabled.
    |
    */

    'security' => [
        'max_query_complexity' => \GraphQL\Validator\Rules\QueryComplexity::DISABLED,
        'max_query_depth' => \GraphQL\Validator\Rules\QueryDepth::DISABLED,
        'disable_introspection' => \GraphQL\Validator\Rules\DisableIntrospection::DISABLED,
    ],

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    |
    | Limits the maximum "count" that users may pass as an argument
    | to fields that are paginated with the @paginate directive.
    | A setting of "null" means the count is unrestricted.
    |
    */

    'paginate_max_count' => null,

    /*
    |--------------------------------------------------------------------------
    | Pagination Amount Argument
    |--------------------------------------------------------------------------
    |
    | Set the name to use for the generated argument on paginated fields
    | that controls how many results are returned.
    | This will default to "first" in v4.
    |
    */

    'pagination_amount_argument' => 'first',

    /*
    |--------------------------------------------------------------------------
    | Debug
    |--------------------------------------------------------------------------
    |
    | Control the debug level as described in http://webonyx.github.io/graphql-php/error-handling/
    | Debugging is only applied if the global Laravel debug config is set to true.
    |
    */
    'debug' => Debug::INCLUDE_DEBUG_MESSAGE | Debug::INCLUDE_TRACE,

    /*
    |--------------------------------------------------------------------------
    | Error Handlers
    |--------------------------------------------------------------------------
    |
    | Register error handlers that receive the Errors that occur during execution and
    | handle them. You may use this to log, filter or format the errors.
    | The classes must implement Nuwave\Lighthouse\Execution\ErrorHandler
    |
    */
    'error_handlers' => [
        \Nuwave\Lighthouse\Execution\ExtensionErrorHandler::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Global ID
    |--------------------------------------------------------------------------
    |
    | The name that is used for the global id field on the Node interface.
    | When creating a Relay compliant server, this must be named "id".
    |
    */
    'global_id_field' => 'id',

    /*
    |--------------------------------------------------------------------------
    | Batched Queries
    |--------------------------------------------------------------------------
    |
    | GraphQL query batching means sending multiple queries to the server in one request,
    | You may set this flag to process/deny batched queries.
    |
     */
    'batched_queries' => true,

    /*
    |--------------------------------------------------------------------------
    | Transactional Mutations
    |--------------------------------------------------------------------------
    |
    | Sets default setting for transactional mutations.
    | You may set this flag to have @create|@update mutations transactional or not.
    |
    */

    'transactional_mutations' => true,

    /*
    |--------------------------------------------------------------------------
    | GraphQL Subscriptions
    |--------------------------------------------------------------------------
    |
    | Here you can define GraphQL subscription "broadcasters" and "storage" drivers
    | as well their required configuration options.
    |
    */

    'subscriptions' => [
        /*
         * Determines if broadcasts should be queued by default.
         */
        'queue_broadcasts' => env('LIGHTHOUSE_QUEUE_BROADCASTS', true),

        /*
         * Default subscription storage.
         *
         * Any Laravel supported cache driver options are available here.
         */
        'storage' => env('LIGHTHOUSE_SUBSCRIPTION_STORAGE', 'redis'),

        /*
         * Default subscription broadcaster.
         */
        'broadcaster' => env('LIGHTHOUSE_BROADCASTER', 'pusher'),

        /*
         * Subscription broadcasting drivers with config options.
         */
        'broadcasters' => [
            'log' => [
                'driver' => 'log',
            ],
            'pusher' => [
                'driver' => 'pusher',
                'routes' => \Nuwave\Lighthouse\Subscriptions\SubscriptionRouter::class.'@pusher',
                'connection' => 'pusher',
            ],
        ],
    ],
 ]; 
