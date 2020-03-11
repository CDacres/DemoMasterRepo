<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Profile;
use App\Models\CISession;

use Dingo\Api\Http\Request;

use App\Helpers\TokenHelper;

class AuthController extends Controller
{
    protected $defaultClass = User::class;
    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ($token = $this->guard()->attempt($credentials))
        {
            return $this->respondWithToken($token);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function anonymousRegister(Request $request)
    {
        $tokenHelper = new TokenHelper();
        $user = new User();
        $user_email = $request->input('email', null);
        if (!is_null($user_email))
        {
            $email = $user_email;
        }
        else
        {
            $email = uniqid() . "@anonymous.zipcube.com";
        }
        $user->email = $email;
        $user->ref_id = md5($email);
        $user->created = time();
        $user->coupon_code = rand(10000, 99999);
        $user->username = 'Anonymous';
        $user->token = $tokenHelper->add_token();
        $user->unsubscribe_token = $tokenHelper->add_token();
        $user->setNewPassword();
        $user->last_ip = $request->ip();
        $user->last_login = time();
        $user->save();
        $profile = new Profile;
        $profile->user_id = $user->id;
        $profile->first_name = $request->input('first', null);
        $profile->last_name = $request->input('last', null);
        $profile->save();
        $token = $this->guard()->fromUser($user);
        return $this->respondWithToken($token, 201);
    }

    public function tokenById(Request $request) // fully trusts posted data - be very careful with reducing security since this is a powerful endpoint
    {
        $id = $request->input('id');
        $user = $this->guard()->getProvider()->retrieveById($id);
        if (!is_null($user))
        {
            $this->_handle_request_claims($user, $request);
            $token = $this->guard()->fromUser($user);
            return $this->respondWithToken($token);
        }
        return response()->json(['error' => 'Not Found'], 404);
    }

    private function _handle_request_claims($user, $request)
    {
        $spoof_admin_id = $request->input('spoof_admin_id');
        if (!is_null($spoof_admin_id))
        {
            $user->AddSpoofedByAdminToJWT($spoof_admin_id);
        }
    }

    public function tokenBySession(Request $request)
    {
        $session_id = $request->input('session_id');
        $ip_address = $request->input('ip_address');
        $user_agent = $request->input('user_agent');
        $ci_session = CISession::fromSession($session_id)
            ->fromIP($ip_address)
            ->fromUserAgent($user_agent)
            ->get()->toArray();
        if (count($ci_session) > 0)
        {
            $user_data = unserialize($ci_session[0]['user_data']);
            if (isset($user_data['DX_user_id']))
            {
                $user = $this->guard()->getProvider()->retrieveById($user_data['DX_user_id']);
            }
            else
            {
                return response()->make('', 204);
            }
            if (isset($user_data['spoof_admin_userid']))
            {
                $user->AddSpoofedByAdminToJWT($user_data['spoof_admin_userid']);
            }
            $token = $this->guard()->fromUser($user);
            return $this->respondWithToken($token);
        }
        return response()->make('', 204);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        return $this->serialisedJsonResponse($request->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token, $status = 200)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ], $status);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
