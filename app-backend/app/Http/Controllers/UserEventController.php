<?php

namespace App\Http\Controllers;

use App\Models\UserEvent;
use Illuminate\Http\Request;
use Carbon\Carbon;

class UserEventController extends Controller
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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        error_log($request);

        $userevent = new UserEvent;

        $userevent->user_id = $request->user_id;
        $userevent->event_id = $request->event_id;
        $userevent->registration_dt = Carbon::now();
        $userevent->distance = 5;
        $userevent->distance_ran = 0;
        $userevent->status = 'in-progress';

        $userevent->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\UserEvent  $userEvent
     * @return \Illuminate\Http\Response
     */
    public function show(UserEvent $userEvent)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\UserEvent  $userEvent
     * @return \Illuminate\Http\Response
     */
    public function edit(UserEvent $userEvent)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\UserEvent  $userEvent
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, UserEvent $userEvent)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\UserEvent  $userEvent
     * @return \Illuminate\Http\Response
     */
    public function destroy(UserEvent $userEvent)
    {
        //
    }

    public function showUserEvents(Request $request, User $user)
    {
        error_log($request);
        error_log($user);
        $userevents = UserEvent::where('user_id', $user->id)->get();

        return $userevents->toJson();
    }
}
