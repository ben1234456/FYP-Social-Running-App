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
            $userid = $user->id;
            return response()->json(['status' => 'success', 'userid' => $userid]);
        }
        else{
            return response()->json(['status' => 'fail', 'message' => 'You have entered a wrong email or password']);
        }
    }
}
