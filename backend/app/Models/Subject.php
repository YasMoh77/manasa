<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    //all fields are guarded
    protected $fillable = [];
    public $timestamps=false;

    //hidden
    protected $hidden=['id','ordering'];


}
