<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTodosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Implement your authorization logic here, e.g., check if the user has permission to create todos.
        return true; // Change to true if authorization is required.
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId' => 'required|integer',
            'title' => 'required|string|max:255',
            'description' => 'string',
            'status' => 'string|in:pending,completed',
            'due' => 'date',
        ];
    }
}

