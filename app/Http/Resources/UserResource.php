<?php
namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'token' => $this->createToken("Token")->plainTextToken,
            'roles' => implode(', ', $this->roles->pluck('name')->toArray() ?? []),
            'roles_permissions' => implode(', ', $this->getPermissionsViaRoles()->pluck('name')->toArray() ?? []),
            'permissions' => implode(', ', $this->permissions->pluck('name')->toArray() ?? []),
        ];
    }
}
