<?php

namespace App\Http\Controllers;

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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
        // error_log($request->phone_number);
        // error_log($request->email);
        // error_log($request->password);
        $user = new User;
        $user->first_name = $request->user_name;
        // $user->phone_number = $request->phone_number;
        $user->email = $request->email;
        $user->gender = $request->gender;
        $user->password = Hash::make($request->password);
        $user->city = $request->city;
        $stringdob = strtotime($request->dob);
        $dob = date('Y-m-d',$stringdob);
        $user->dob = $dob;
        $user->role = "user";
        $save = $user->save();

        // if(!$saved){
        //     error_log("......");
        // }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user->toJson();
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
        $user->first_name = $request->name;
        $user->email = $request->email;
        $user->city = $request->city;
        $stringdob = strtotime($request->dob);
        $dob = date('Y-m-d',$stringdob);
        $user->dob = $dob;
        $user->gender = $request->gender;
        $status = $user->save();
        
        if($status){
            return response()->json(['status' => 'success', 'user' => $user]);
        }
        else{
            return response()->json(['status' => 'fail']);
        }

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
