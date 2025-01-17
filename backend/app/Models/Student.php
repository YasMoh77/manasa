<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Course;
use Laravel\Sanctum\HasApiTokens;


class Student extends Model
{
    use HasFactory,HasApiTokens;

    protected $fillable = [];
    public $timestamps=false;

    protected $hidden = [
        'password',
        'remember_token',
        'phone_verified_at'
    ];

    protected $casts = [
        'phone_verified_at' => 'datetime',
    ];

    
    //relationship student-course
    public function course(): BelongsToMany
    { 
        return $this->belongsToMany(Course::class, 'course_student', 'student_id', 'course_id');
    }


}
