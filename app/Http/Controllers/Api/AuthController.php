<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use http\Env\Response;
use App\Http\Helpers\Helper;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        // register user
        $user = User::create([
            'name'          => $request->name,
            'email'         => $request->email,
            'password'      => bcrypt($request->password)
        ]);

        // assign role
        $user_role = Role::where(['name' => 'user'])->first();
        if($user_role){
            $user->assignRole($user_role);
        }
        // send response
        return new UserResource($user);
    }
    // public function signup(SignupRequest $request)
    // {
    //     $data = $request->validated();
    //     /** @var \App\Models\User $user */
    //     $user = User::create([
    //         'name' => $data['name'],
    //         'email' => $data['email'],
    //         'password' => bcrypt($data['password']),
    //     ]);

    //     $token = $user->createToken('main')->plainTextToken;
    //     return response(compact('user', 'token'));
    // }

    public function login(LoginRequest $request)
    {
        // login user
        if(!Auth::attempt($request->only('email','password'))){
            Helper::sendError('Email Or Password is wroing !!!');
        }
        // send response
        return new UserResource(auth()->user());
    }

    // public function login(LoginRequest $request)
    // {
    //     $credentials = $request->validated();
    //     if (!Auth::attempt($credentials)) {
    //         return response([
    //             'message' => 'Provided email or password is incorrect'
    //         ], 422);
    //     }

    //     /** @var \App\Models\User $user */
    //     $user = Auth::user();
    //     $token = $user->createToken('main')->plainTextToken;
    //     return response(compact('user', 'token'));
    // }

    public function logout(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
