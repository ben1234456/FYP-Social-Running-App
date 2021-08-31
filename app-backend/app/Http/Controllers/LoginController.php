<?php

namespace App\Http\Controllers;

use App\Http\Controllers\LoginController;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $loginDetails = $request->only('email','password');

        if(Auth::attempt($loginDetails)){
            $user = User::where('email',$request->email)->first();
            if($user->role == "user"){
                return response()->json(['status' => 'success', 'user' => $user, 'role' => 'user']);
            }else if ($user->role == "admin"){
                return response()->json(['status' => 'success', 'user' => $user, 'role' => 'admin']);
            }
            
        }
        else{
            return response()->json(['status' => 'fail', 'message' => 'You have entered a wrong email or password']);
        }
    }
}
