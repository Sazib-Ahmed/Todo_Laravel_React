<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Todos>
 */
class TodosFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userId = $this->faker->numberBetween(1, 10);

        return [
            'userId' => $userId,
            'title' => $this->faker->sentence,
            'description' => $this->faker->text(20), // Generate a shorter description
            'status' => $this->faker->randomElement(['pending', 'completed']),
            'due' => $this->faker->date,
        ];
    }
}
