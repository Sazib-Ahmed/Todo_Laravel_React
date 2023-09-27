<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use App\Http\Controllers\Api\TodosController;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Your existing routes here...

    // Route for listing all todos
    Route::get('/todos', [TodosController::class, 'index']);

    // Route for creating a new todo
    Route::post('/todos', [TodosController::class, 'store']);

    // Route for retrieving a specific todo by ID
    Route::get('/todos/{id}', [TodosController::class, 'show']);

    // Route for updating a specific todo by ID
    Route::put('/todos/{id}', [TodosController::class, 'update']);

    // Route for deleting a specific todo by ID
    Route::delete('/todos/{id}', [TodosController::class, 'destroy']);

    // Route for getting todos by user ID
    Route::get('/todos/user/{userId}', [TodosController::class, 'showByUserId']);

    // Route for updating a specific todo by user ID and todo ID
    Route::put('/users/{userId}/todos/{todoId}', [TodosController::class, 'updateUserTodo']);

    // Route for creating a new todo for a specific user
    Route::post('/users/{userId}/todos/new', [TodosController::class, 'createUserTodo']);



    Route::get('/user', function (Request $request) {
        return new UserResource($request->user());;
    });

    Route::apiResource('/users', UserController::class);


});
Route::get('/todos/{id}', [TodosController::class, 'show']);

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

});




