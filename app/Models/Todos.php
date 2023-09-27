<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todos extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'title',
        'description',
        'status',
        'due',
    ];
    public $timestamps = true;
}
