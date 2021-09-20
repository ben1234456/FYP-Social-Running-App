<?php

namespace App\Http\Controllers;

use App\Models\Buddy;
use Illuminate\Http\Request;

class BuddyController extends Controller
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
        //
        $buddy=new Buddy;
        $buddy->buddyID = $request->buddyID;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Buddy  $buddy
     * @return \Illuminate\Http\Response
     */
    public function show(Buddy $buddy)
    {
        //
        return $buddy->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Buddy  $buddy
     * @return \Illuminate\Http\Response
     */
    public function edit(Buddy $buddy)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Buddy  $buddy
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Buddy $buddy)
    {
        //
        $buddy->buddyID = $request->buddyID;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Buddy  $buddy
     * @return \Illuminate\Http\Response
     */
    public function destroy(Buddy $buddy)
    {
        //
    }
    
}
