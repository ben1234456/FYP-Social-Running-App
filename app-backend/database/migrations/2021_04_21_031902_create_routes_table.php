<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoutesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('routes', function (Blueprint $table) {
            $table->id();
            $table->integer('created_by');
            $table->decimal('start_lat', 11, 8);
            $table->decimal('start_lng', 11, 8);
            $table->decimal('end_lat', 11, 8);
            $table->decimal('end_lng', 11, 8);
            $table->integer('bo_of_checkpoints');
            $table->decimal('total_distance');
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
        Schema::dropIfExists('routes');
    }
}
