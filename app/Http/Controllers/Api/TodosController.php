<?php
namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Todos;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\TodosResource;
use App\Http\Requests\StoreTodosRequest;
use App\Http\Requests\UpdateTodosRequest;

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

    public function createUserTodo(Request $request, $userId)
{
    // Find the user by ID to ensure the user exists
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Validate the request data
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'status' => 'required|string|max:50',
        'due' => 'nullable|date',
    ]);

    // Create a new todo for the user
    $todo = new Todos();
    $todo->title = $validatedData['title'];
    $todo->description = $validatedData['description'];
    $todo->status = 'pending'; // Default status is 'pending
    $todo->due = $validatedData['due'];
    $todo->userId = $userId;
    $todo->save();

    return response()->json(['message' => 'Todo created successfully', 'todo' => $todo], 201);
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
    public function destroy($id)
{
    // Find the todo by ID
    $todo = Todos::find($id);

    // Check if the todo exists
    if (!$todo) {
        return response()->json(['message' => 'Todo not found'], 404);
    }

    // Delete the todo
    $todo->delete();

    return response()->json(['message' => 'Todo deleted successfully'], 204);
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

    public function updateUserTodo(Request $request, $userId, $todoId)
{
    // Find the user by ID to ensure the user exists
    $user = User::find($userId);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    // Find the todo item by ID and user ID
    $todo = Todos::where('user_id', $userId)
                ->where('id', $todoId)
                ->first();

    if (!$todo) {
        return response()->json(['message' => 'Todo not found'], 404);
    }

    // Update the todo item with the request data
    $todo->update($request->all());

    return response()->json(['message' => 'Todo updated successfully']);
}


}
