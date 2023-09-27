<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $user_list = Permission::create(['name'=>'users.list']);
        $user_view = Permission::create(['name'=>'users.view']);
        $user_create = Permission::create(['name'=>'users.create']);
        $user_update = Permission::create(['name'=>'users.update']);
        $user_delete = Permission::create(['name'=>'users.delete']);
        $todo_list = Permission::create(['name'=>'todo.list']);
        $todo_view = Permission::create(['name'=>'todo.view']);
        $todo_create = Permission::create(['name'=>'todo.create']);
        $todo_update = Permission::create(['name'=>'todo.update']);
        $todo_delete = Permission::create(['name'=>'todo.delete']);



        $admin_role = Role::create(['name' => 'admin']);
        $admin_role->givePermissionTo([
            $user_create,
            $user_list,
            $user_update,
            $user_view,
            $user_delete,

            $todo_create,
            $todo_list,
            $todo_update,
            $todo_view
        ]);

        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('Password017@')
        ]);

        $admin->assignRole($admin_role);
        $admin->givePermissionTo([
            $user_create,
            $user_list,
            $user_update,
            $user_view,
            $user_delete,

            $todo_create,
            $todo_list,
            $todo_update,
            $todo_view,
            $todo_delete

        ]);

        $user = User::create([
            'name' => 'user',
            'email' => 'user@gmail.com',
            'password' => bcrypt('Password017@')
        ]);

        $user_role = Role::create(['name' => 'user']);

        $user->assignRole($user_role);
        $user->givePermissionTo([
            $user_create,
            $user_update,
            $user_view,
            $user_delete,

            $todo_create,
            $todo_list,
            $todo_update,
            $todo_view,
            $todo_delete
        ]);

        $user_role->givePermissionTo([
            $user_create,
            $user_update,
            $user_view,
            $user_delete,

            $todo_create,
            $todo_list,
            $todo_update,
            $todo_view,
            $todo_delete

        ]);



    }
}
