<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todos;
use App\Http\Requests\StoreTodosRequest;
use App\Http\Requests\UpdateTodosRequest;
use App\Http\Resources\TodosResource;
use Illuminate\Http\Request;

class TodosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieve all todos
        $todos = Todos::all();
        return TodosResource::collection($todos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodosRequest $request)
    {
        // Create a new todo
        $data = $request->validated();
        $$data['status'] = "pending";
        $todo = Todos::create($data);
        return new TodosResource($todo);
    }

    /**
     * Display the specified resource.
     */
    public function show(Todos $todos)
    {
        // Retrieve a specific todo by ID
        return new TodosResource($todos);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTodosRequest $request, Todos $todos)
    {
        // Update the todo
        $data = $request->validated();
        $todos->update($data);
        return new TodosResource($todos);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todos $todos)
    {
        // Delete the todo
        $todos->delete();
        return response()->json(null, 204);
    }

    /**
     * Show todos by user ID.
     */
    public function showByUserId($userId)
    {
        // Retrieve todos by user ID
        $todos = Todos::where('userId', $userId)->get();
        return TodosResource::collection($todos);
    }
}
