<?php namespace App\Http\Middleware;

use Closure;

class CORS {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //header("Access-Control-Allow-Origin: *");
        // ALLOW OPTIONS METHOD
        $headers = [
            'Access-Control-Allow-Methods'=> 'POST, GET, OPTIONS, PUT, DELETE, PATCH',
            'Access-Control-Allow-Headers'=> 'Content-Type, X-Auth-Token, Origin, Authorization, X-Zip-Inflection, Accept-Language',
            'Access-Control-Allow-Origin' => env('SITE_URL')
        ];
        if ($request->getMethod() == "OPTIONS")
        {
            // The client-side application can set only headers allowed in Access-Control-Allow-Headers
            return response('OK', 200, $headers);
        }
        $response = $next($request);
        foreach ($headers as $key => $value)
        {
            $response->header($key, $value);
        }
        return $response;
    }
}
