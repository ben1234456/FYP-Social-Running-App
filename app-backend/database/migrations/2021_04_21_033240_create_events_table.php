<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('event_name');
            $table->integer('no_of_participants');
            $table->datetime('start');
            $table->datetime('end');
            $table->datetime('registration_start');
            $table->datetime('registration_end');
            $table->text('description');
            $table->decimal('fee_5km',5,2);
            $table->decimal('fee_10km',5,2);
            $table->decimal('fee_21km',5,2);
            $table->decimal('fee_42km',5,2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
