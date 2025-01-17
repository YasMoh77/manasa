<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Validation\Rule;
use App\Models\User;
use App\Models\Subject;
use App\Models\Grade;
use App\Models\Course;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Hash;


class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
    
    //get all subjects
    public function subjects()
    {
      $subjects=Subject::orderBy('ordering','ASC')->get();
      return response()->json([
          'subjects'=>$subjects
      ]);
    }

    //get all grades 
    public function grades()
    {
      $grades=Grade::all();
      return response()->json([
          'grades'=>$grades
      ]);
    }

    //get all courses someCourses
    public function courses()
    {
      $courses=Course::orderBy('id','DESC')->get();
      return response()->json([
          'courses'=>$courses
      ]);
    }

    //get all teachers 
    public function teachers()
    {
      $teachers=User::where('role','teacher')->orderBy('id','DESC')->get();
      return response()->json([
          'teachers'=>$teachers
      ]);
    }

    //get one teacher data 
    public function oneTeacherData($id)
    {
      $teacher=User::where('id',$id)->first();
      return response()->json([
          'teacher'=>$teacher
      ]);
    }

    
    //get one teacher data 
    public function modefyData(Request $request)
    { 
        $validated=$request->validate([
        'phone'=>['nullable','digits:11,','unique:users,phone,'.$request->id],//Rule::unique('users')->ignore($user->id)
        'password'=>'nullable|string|min:8|max:25|confirmed',
        'password_confirmation'=>'nullable|string|min:8|max:25|',
        'aboutMe'=>'nullable|string|min:25|max:700',
        'pic'=>'image|mimes:jpg,jpeg,png|max:100',
      ]);
             
      //check if user is found
      $found=User::where('id',$request->id)->first();
      if(!$found){
        return response()->json([
        'message'=>'هذا المستخدم غير موجود'
      ]);
    }
    
    $user=User::where('id',$request->id);
      //prepare photo1
      if($request->file('pic')){
          $ph1=$request->file('pic')->getClientOriginalName();
          $ph1Expl=explode('.',$ph1); 
          $photo1Ext= end($ph1Expl);  
          $randomPh1=rand(1,100000000000000);
          $photo1Final=$randomPh1.'.'.$photo1Ext;
          // Get old image
          $oldPhoto = $user->value('pic');
          // Delete old image if it exists 
          if ($oldPhoto!=null) {
              $oldImgPath = 'public/images/' . $oldPhoto;
              Storage::delete($oldImgPath);
          }
          //store photo1
          $request->file('pic')->storeAs('public/images',$photo1Final);
          $user->update(['pic'=>$photo1Final]);
      }
     //update
     if($request->phone){$user->update(['phone'=>$request->phone]);}
     if($request->password){$user->update(['password'=>Hash::make($request->password)]);}
     if($request->aboutMe){$user->update(['description'=>$request->aboutMe]);}
     //create new token
     $token=$found->createToken('auth_token')->plainTextToken;
     //store in array
     $authData=[];
     $authData['token']=$token;
     $authData['token_type']='Bearer'; 
     //redirect
      return response()->json([
          'message'=>'تم التعديل بنجاح',
          'authData' => $authData
      ]);
    }

   
    //get one teacher  courses 
    public function oneTeacherCourses($id)
    {
      $courses=Course::where('teacher',$id)->orderBy('id','DESC')->get();
      return response()->json([
          'courses'=>$courses
      ]);
    }

    //fetch some 
    //get some teachers 
    public function someTeachers()
    {
      $teachers=User::where('role','teacher')->orderBy('id','DESC')->take(3)->get();
      return response()->json([
          'teachers'=>$teachers
      ]);
    }

    //get some courses 
    public function someCourses()
    {
      $courses=Course::orderBy('id','DESC')->take(3)->get();
      return response()->json([
          'courses'=>$courses
      ]);
    }



    //make a course
    public function courseStart(Request $request)
    {
      $validate=$request->validate([
         'c_name'=>['required','string','min:10','max:250'],
         'c_subject'=>['required','string'],
         'c_grade'=>['required','string'],
         'c_day'=>['required','string'],
         'c_time'=>['required','string']
      ]);
       //check exiting day & time for this teacher
       $teacher=User::where('phone',$request->c_teacher)->value('id');
       $course=new Course();
       $check=Course::where(['day'=>$request->c_day,'time'=>$request->c_time,'teacher'=>$teacher])->first();
       if($check){
         return response()->json(['done'=>'','message'=>'انت مشغول في هذا اليوم والوقت']);
       }
       
       //set course price based on course grade
       $price=$request->c_grade<=6?160:($request->c_grade>=7&&$request->c_grade<=9?180:($request->c_grade==10||$request->c_grade==11?200:250)); 
       //add course
          $course->name   = $request->c_name;
          $course->subject= $request->c_subject;  
          $course->grade  = $request->c_grade;  
          $course->day    = $request->c_day;  
          $course->time   = $request->c_time;  
          $course->price  = $price;  
          $course->teacher= $teacher;
       $course->save();
      //return response
      return response()->json([
         'message'=>'تم اضافة درس جديد بنجاح',
         'done'=>'done'
       ]);
    }


    //get teacher courses studentCourses
    public function teacherCourses(Request $request)
    {   
        $courses=Course::where('teacher',$request->id)->get();
        //return courses
        return response()->json([
          'courses'=>$courses
        ]);
    }

    //get student courses 
    public function studentCourses(Request $request)
    {   
       /* $courses=Course::where('teacher',$request->id)->get();
        //return courses
        return response()->json([
          'courses'=>$courses
        ]);*/
    }





}
