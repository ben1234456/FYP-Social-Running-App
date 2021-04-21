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
            $table->decimal('5km_fee',5,2);
            $table->decimal('10km_fee',5,2);
            $table->decimal('21km_fee',5,2);
            $table->decimal('42km_fee',5,2);
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
