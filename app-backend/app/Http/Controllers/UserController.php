<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        error_log($request->user_name);
        error_log($request->phone_number);
        error_log($request->email);
        error_log($request->password);
        $user = new User;
        $user->first_name = $request->user_name;
        $user->last_name = "?";
        $user->phone_number = $request->phone_number;
        $user->email_address = $request->email;
        $user->gender = "male";
        $user->password = $request->password;
        $user->city = "x";
        $save = $user->save();

        if(!$saved){
            error_log("......");
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
