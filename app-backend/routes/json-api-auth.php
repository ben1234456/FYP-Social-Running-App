<?php

use App\Http\Controllers\JsonApiAuth\ConfirmablePasswordController;
use App\Http\Controllers\JsonApiAuth\EmailVerificationNotificationController;
use App\Http\Controllers\JsonApiAuth\LoginController;
use App\Http\Controllers\JsonApiAuth\LogoutController;
use App\Http\Controllers\JsonApiAuth\NewPasswordController;
use App\Http\Controllers\JsonApiAuth\PasswordResetLinkController;
use App\Http\Controllers\JsonApiAuth\RegisterController;
use App\Http\Controllers\JsonApiAuth\VerifyEmailController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserEventController;
use App\Http\Controllers\EventDistanceController;
use App\Http\Controllers\ForumPostController;
use App\Http\Controllers\PostCommentController;
use App\Http\Controllers\PostLikeController;
use App\Http\Controllers\API\ForgotPasswordController;
use App\Http\Controllers\API\ResetPasswordController;
use Illuminate\Support\Facades\Route;

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

Route::post('password/forgot-password', [ForgotPasswordController::class, 'sendResetLinkResponse'])->name('passwords.sent');

Route::post('password/reset', [ResetPasswordController::class, 'sendResetResponse'])->name('passwords.reset');

//custom functions
Route::post('login', [LoginController::class, 'login']);

Route::get('/forumposts/{forumpost}', [ForumPostController::class, 'showPost']);

Route::get('/forumposts/{forumpost}/comments', [ForumPostController::class, 'showComments']);

Route::get('/activity/users/{user}', [ActivityController::class, 'showUserActivities']);

//get events registered by the user
Route::get('/events/users/{user}', [UserEventController::class, 'showUserEvents']);

//get events (excluded registered)
Route::get('/events/exclusive/{user}', [EventController::class, 'showUserExclusiveEvents']);

//get event distances
Route::get('/events/{event}/distance', [EventDistanceController::class, 'showEventDistances']);

//update event distances
Route::post('/eventdistances/update', [EventDistanceController::class, 'updateDistanceFee']);

Route::get('/activity/all/users/{user}', [ActivityController::class, 'showAllUserActivities']);

Route::post('/register', RegisterController::class)->name('json-api-auth.register');

Route::post('/login', LoginController::class)->name('json-api-auth.login');

Route::get('/logout', LogoutController::class)
    ->middleware('auth:sanctum')
    ->name('json-api-auth.logout');

Route::post('/forgot-password', PasswordResetLinkController::class)
    ->name('json-api-auth.password.email');

Route::post('/reset-password', NewPasswordController::class)
    ->name('json-api-auth.password.update');

Route::post('/email/verification-notification', EmailVerificationNotificationController::class)
    ->middleware(['auth:sanctum', 'throttle:6,1'])
    ->name('json-api-auth.verification.send');

Route::get('/verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('json-api-auth.verification.verify');

Route::post('/confirm-password', ConfirmablePasswordController::class)
    ->middleware('auth:sanctum')
    ->name('json-api-auth.password.confirm');
