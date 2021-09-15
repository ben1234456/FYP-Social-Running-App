<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\EventDistanceController;
use App\Http\Controllers\ForumPostController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\API\ForgotPasswordController;
use App\Http\Controllers\API\ResetPasswordController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResources([
    'users'=> UserController::class,
    'activities'=> ActivityController::class,
    'events'=> EventController::class,
    'userevents'=> UserEventController::class,
    'eventdistances'=> EventDistanceController::class,
    'forumposts'=> ForumPostController::class,
    'postcomments'=> PostCommentController::class,
    'postlikes'=> PostLikeController::class,
]);


Route::post('activity', [ActivityController::class, 'store']);


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('password/forgot-password', [ForgotPasswordController::class, 'sendResetLinkResponse'])->name('passwords.sent');

Route::post('password/reset', [ResetPasswordController::class, 'sendResetResponse'])->name('passwords.reset');

//custom functions
Route::post('login', [LoginController::class, 'login']);

Route::get('forumposts/{forumpost}', [ForumPostController::class, 'showPost']);

Route::get('forumposts/{forumpost}/comments', [ForumPostController::class, 'showComments']);

Route::get('/activity/users/{user}', [ActivityController::class, 'showUserActivities']);

Route::get('/events/users/{user}', [UserEventController::class, 'showUserEvents']);

Route::get('/events/{event}/distance', [EventDistanceController::class, 'showEventDistances']);

Route::get('/activity/all/users/{user}', [ActivityController::class, 'showAllUserActivities']);