<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\taskController;
use App\Http\Controllers\categoryController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('tasks', [taskController::class , 'index']);
Route::post('tasks', [taskController::class , 'store']);
Route::get('tasks/{task}', [taskController::class , 'show']);
Route::put('tasks/{task}', [taskController::class , 'update']);
Route::delete('tasks/{task}', [taskController::class , 'destroy']);
Route::get('category/{category}/tasks', [taskController::class , 'getTaskByCategory']);
Route::get('order/{column}/{direction}/tasks', [taskController::class , 'getTaskOrderBy']);
Route::get('search/{term}/tasks', [taskController::class , 'getTaskByTerm']);

Route::get('categories', [categoryController::class , 'index']);



