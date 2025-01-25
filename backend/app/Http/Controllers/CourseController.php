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
        $noCourse='0';
       if($course){
        return response()->json([
            'course'=>$course
        ]);
       }else{
        return response()->json([
            'course'=>$noCourse
        ]); 
       }
       
    }
}
