<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{

    //get a specific course data
    public function getCourseData($id)
    {
       $course=Course::find($id);
       return response()->json([
           'course'=>$course
       ]);
    }
}
