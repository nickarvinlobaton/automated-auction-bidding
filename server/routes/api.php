<?php

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

Route::apiResource('/user', 'UserController');

Route::middleware(['auth:api'])->group(function () {
    Route::apiResource('/domain', 'DomainController');
    Route::put('/disable-auction/{id}', 'DomainController@disableAuction');
    Route::put('/enable-auction/{id}', 'DomainController@enableAuction');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
