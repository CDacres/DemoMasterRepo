<?php

namespace App\Http\Controllers\VersionOne;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Models\User;

class Users extends Controller
{
    protected $defaultClass = User::class;
    public function find(Request $request, $id)
    {
        $object_user = User::find($id);
        if ($request->user()->cannot('view', $object_user))
        {
            abort(401);
        }
        return $this->serialisedJsonResponse($object_user);
    }
//
//    public function create(Request $request)
//    {
//        try
//        {
//            if (isset($request['id']))
//            {
//                return response()->json(null, 400);
//            }
//            $this->validate($request, [
//                'email' => 'required|email',
//                'first_name' => 'required|alpha_dash',
//                'last_name' => 'required|alpha_dash',
//                'phone_number' => 'required',
//                'password' => 'required',
//                'confirm_password' => 'required'
//            ]);
//            $user = new User;
//            if ($user->whereRaw('LOWER(users.email) = LOWER("' . trim($request['email']) . '")')->where('enabled', 1)->first())
//            {
//                return response()->json([
//                    'error' => [
//                        'occurred' => true,
//                        'message' => 'A user already exists with that email address'
//                    ]
//                ], 400);
//            }
//            $user->email = strtolower(trim($request['email']));
//            $user->ref_id = md5($request['email']);
//            $user->created = Carbon::now('Europe/London');
//            $user->coupon_code = rand(10000, 99999);
//            $user->username = trim($request['first_name']);
//            if (isset($request['password']) && isset($request['confirm_password']) && $request['password'] === $request['confirm_password'])
//            {
//                $plainTextPassword = $request['password'];
//            }
//            else
//            {
//                $user->token = $user->generate_token();
//            }
//            $user->password = Hash::make($request['password']);
//            if (env('ENVIRONMENT') == 'production')
//            {
//                $user->last_ip = $request->ip();
//            }
//            else
//            {
//                $user->last_ip = '127.0.0.1';
//            }
//            $user->save();
//            $profile = new Profile;
//            $profile->user_id = $user->id;
//            $profile->Fname = trim($request['first_name']);
//            $profile->Lname = trim($request['last_name']);
//            $profile->phnum = trim($request['phone_number']);
//            $profile->phnum_search = preg_replace('/[\s\+]/', '', $request['phone_number']);
//            $profile->save();
//            $ret_user = User::with('profile')->find($user->id);
//            $hubspot_id = intval($user->hubspot_id);
//            if ($hubspot_id != 0)
//            {
//                return $this->response('Hubspot ID already in use', 401);
//            }
//            try
//            {
//                $hubspot_api = HubspotAPI::class;
//                $result = $hubspot_api->create_or_update_user($ret_user->email, [
//                    (object) [ 'property' => 'firstname', 'value' => $user->profile->Fname ],
//                    (object) [ 'property' => 'lastname', 'value' => $user->profile->Lname ],
//                    (object) [ 'property' => 'phone', 'value' => $user->profile->phnum ]
//                ]);
//                if ($result == FALSE || !isset($result->vid))
//                {
//                    Log::error("Unable to add user to Hubspot: " . json_encode($result));
//                }
//                else
//                {
//                    $vid = $result->vid;
//                    $hubspotUser = new User;
//                    $hubspotUser->where('id', $ret_user->id)->where('enabled', 1)->get();
//                    $hubspotUser->hubspot_id = $vid;
//                    if (!$hubspotUser->save())
//                    {
//                        Log::error("Unable to add Hubspot ID to user: " . json_encode($user));
//                    }
//                }
//            }
//            catch (Exception $ex)
//            {
//                Log::error("Unable connect to hubspot: " . $ex->getMessage());
//            }
//            return response()->json($ret_user, 201);
//        }
//        catch (Exception $ex)
//        {
//            return response()->json([
//                'error' => [
//                    'occurred' => true,
//                    'message' => $ex->getMessage()
//                ]
//            ]);
//        }
//    }
//
//    public function update(Request $request, $id)
//    {
//        try
//        {
//            if (!isset($id) && !isset($request['email']))
//            {
//                return response()->json(null, 400);
//            }
//            $this->validate($request, [
//                'email' => 'required|email',
//                'first_name' => 'required|alpha_dash',
//                'last_name' => 'required|alpha_dash',
//                'phone_number' => 'required'
//            ]);
//            if (User::where('email', $request['email'])->where('id', '<>', $id)->where('enabled', 1)->first())
//            {
//                return response()->json([
//                    'error' => [
//                        'occurred' => true,
//                        'message' => 'A user already exists with that email'
//                    ]
//                ], 400);
//            }
//            $user = User::find($id)->where('enabled', 1)->first();
//            if ($user === null)
//            {
//                return response()->json([
//                    'error' => [
//                        'occurred' => true,
//                        'message' => 'No user found'
//                    ]
//                ], 405);
//            }
//            if ($user->email != $request['email'])
//            {
//                $user_info_history = new UserInfoHistory;
//                $user_info_history->user_id = $id;
//                $user_info_history->email = $user->email;
//                $user_info_history->dateTime = Carbon::now('Europe/London');
//                $user_info_history->save();
//                $user->email = strtolower($request['email']);
//                $user->save();
//            }
//            $profile = Profile::where('user_id', $id)->where('enabled', 1)->first();
//            if ($profile === null)
//            {
//                return response()->json([
//                    'error' => [
//                        'occurred' => true,
//                        'message' => 'No user found'
//                    ]
//                ], 405);
//            }
//            $profile->Fname = trim($request['first_name']);
//            $profile->Lname = trim($request['last_name']);
//            $profile->phnum = $request['phone_number'];
//            $profile->phnum_search = preg_replace('/[\s\+]/', '', $request['phone_number']);
//            $profile->save();
//            $ret_user = User::with('profile')->find($user->id);
//            $hubspot_id = $user->hubspot_id;
//            if ($hubspot_id != null && $hubspot_id > 0)
//            {
//                try
//                {
////                    $hubspot_api = HubspotAPI::class;
////                    $result = $CI->hubspotapi->update_user($hubspot_id, [
////                        (object) [ 'property' => 'email', 'value' => strtolower($put['email']) ],
////                        (object) [ 'property' => 'firstname', 'value' => trim($put['first_name']) ],
////                        (object) [ 'property' => 'lastname', 'value' => trim($put['last_name']) ],
////                        (object) [ 'property' => 'phone', 'value' => $put['phone_number'] ]
////                    ]);
////                    if (isset($result->status) && $result->status == 'error')
////                    {
////                        Log::error('Unable to update user account on Hubspot: ' . json_encode($result));
////                    }
//                }
//                catch (Exception $ex)
//                {
//                    Log::error('Unable to connect to Hubspot: '.$ex->getMessage());
//                }
//            }
//            return response()->json($ret_user, 201);
//        }
//        catch(Exception $ex)
//        {
//            return response()->json([
//                'error' => [
//                    'occurred' => true,
//                    'message' => $ex->getMessage()
//                ]
//            ]);
//        }
//    }
}
