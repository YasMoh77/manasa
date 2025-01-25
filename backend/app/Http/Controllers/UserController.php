<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\Student;
use App\Models\Course;
use App\Models\Payment;
use Carbon\Carbon;




class UserController extends Controller
{   
    //get user name
    public function getUserName($userId)
    {
       $userName=User::where('id',$userId)->first()->name;
       return response()->json([
           'name'=>$userName
       ]);
    }


    //search for students
    public function searchDashboard($searchValue,$radioValue)
    {   
        //search for student
        if($radioValue==='stu'){
            //search using values
            $found=Student::where(function($q)use($searchValue){
                $q->where('id',$searchValue)
                ->orWhere('name','like','%'.$searchValue.'%')
                ->orWhere('phone','like','%'.$searchValue.'%');
             })->get();
            //if not found
            if($found){ 
                return response()->json(['search'=>$found,'found'=>'stu']);
            }else{return response()->json(['search'=>'null']);}
            //search for teacher
        }elseif($radioValue==='tea'){
            //search using values
            $found=User::where(function($q)use($searchValue){
               $q->where('id',$searchValue)
               ->orWhere('name','like','%'.$searchValue.'%')
               ->orWhere('phone','like','%'.$searchValue.'%');
            })->get();
            //if not found
            if($found){ 
                return response()->json(['search'=>$found,'found'=>'tea']);
            }else{return response()->json(['search'=>'null']);}

        }elseif($radioValue==='cou'){
            //search for course
            $found=Course::where(function($q)use($searchValue){
                $q->where('id',$searchValue)
                ->orWhere('name','like','%'.$searchValue.'%');
             })->get();
            //if not found
            if($found){ 
                return response()->json(['search'=>$found,'found'=>'cou']);
            }else{return response()->json(['search'=>'null']);}
        }
    }
    
    
    //insert courses in pivot table 
    public function pivot(Request $request) 
    {   
        //check student's existence
        $student=Student::find($request->student_Id);
        if($student){
            //associate course to student and make student a subscriber
            $addSubscription=$student->courses()->syncWithoutDetaching($request->course_Id);
                if($addSubscription){
                    // Delete old file if it exists
                    $foundPayment=Payment::where(['student'=>$request->student_Id,'course'=>$request->course_Id]);
                    if($foundPayment->first()){
                        //delete sent file
                        $oldFilePath = 'public/files/' . $foundPayment->first()->sentFile;
                        Storage::delete($oldFilePath);
                        //delete row
                       $foundPayment->delete();
                    }
                    //return notice
                    return response()->json([
                        'success'=>'done'
                    ]);
                    

                }else{
                    return response()->json([
                        'success'=>'failed'
                    ]);
                }
        }   
    }


    //delete courses from pivot table 
    public function pivotDelete(Request $request) 
    {   
        //check student's existence
        $student=Student::find($request->student_Id);
        if(!$student){
            return response()->json([
                'success'=>'not found'
            ]);
        }
        //check if user is subscribed
       $found = Student::find($request->student_Id)?->courses()->where('courses.id', $request->course_Id)->exists();
        if($found){
            //Unassociate course to student
            $deletedSubscription=$student->courses()->detach($request->course_Id);
                if($deletedSubscription){
                    return response()->json([
                        'success'=>'تم الالغاء'
                    ]);
                }else{
                    return response()->json([
                        'success'=>'فشل؛ حاول مرة أخرى'
                    ]);
                }
        }  
        return response()->json([
            'success'=>'هذا التلميذ غير مشترك بالفعل'
        ]); 
    }

    //count Courses for a student
    public function countCourses($id,$user)
    { 
      if($user=='t'){
        //check student's existence
        $found=User::find($id);
        //if student exists, cunt courses
        if($found){
            $number=Course::where('teacher',$id)->count();
            return response()->json([
                'number'=>$number
            ]);
        }
      }else{
        //check student's existence
        $found=Student::find($id);
        //if student exists, cunt courses
        if($found){
            $number=Student::find($id)?->courses()->count();
            return response()->json([
                'number'=>$number
            ]);
        }
    }

    }

    //check subscription
    public function checkSubscription($userId,$courseId)
    {  
        //check if user is still in database
       $user=Student::find($userId);
      /* $found=User::whereHas('course',function($q) use($courseId){
            $q->where('courses.id',$courseId);
       })->where('users.id',$userId)->exists();*/
       // if student isn't in database
       if(!$user){
          return response()->json(['student'=>'not found']);
       }
       //check if student is subscribed
       $found = Student::find($userId)?->courses()->where('courses.id', $courseId)->exists();

       //if student is subscribed or not, respond accordingly
       if($found){
          return response()->json(['student'=>'مشترك']);
       }else{
        return response()->json(['student'=>'غير مشترك']);
       }
    }
    

    //allow subscribed user to start streaming
    public function streaming($student_Id,$course_Id)
    {  
        //find user
        $user=Student::find($student_Id);
      //check if user is subscribed
      $found = Student::find($student_Id)?->courses()->where('courses.id', $course_Id)->exists();
      if($found){
          return view('streaming');
      }
      return redirect('http://localhost:3000/courses');

    }


   //receive payment
   public function receivePayment(Request $request)
   {
     // Get old file  
    $found=Payment::where(['student'=>$request->student_Id,'course'=>$request->course_Id]);
    $foundRow=$found->first();
    //execute only if theres no row
    if (!$foundRow) {
        //check if received data is not empty
        if($request->sentFile&&$request->student_Id&&$request->student_name&&$request->course_Id&&$request->method){
            //store file 
            $file=$request->file('sentFile')->getClientOriginalName(); 
            $fileExpl=explode('.',$file); 
            $fileExt= end($fileExpl);  
            $randomFile=rand(1,10000000000);
            $fileFinal=$randomFile.'.'.$fileExt;
            //store file
            $request->file('sentFile')->storeAs('public/files',$fileFinal);
            //now
            $now=Carbon::now();
            //add new row
            $pay=new Payment();
                $pay->name=$request->student_name;
                $pay->student=$request->student_Id;
                $pay->phone=$request->student_phone;
                $pay->course=$request->course_Id;
                $pay->sentFile=$fileFinal;
                $pay->method=$request->method;
            $pay->save();
            return response()->json([
                'data'=>'شكرا تم الاستلام',
            ]);
        }
   }else{
    return response()->json(['data'=>'عفوا؛ تم استلام بيانات الدفع بالفعل']);
   }
}


//getPayments
public function getPayments()
{
    $payments=Payment::all();
    $noPayments='0';
    //send payments
    if($payments->isNotEmpty()){
        return response()->json([
            'payments'=>$payments
        ]);
    }else{
        return response()->json([
            'payments'=>$noPayments
        ]);
    }
    
}

    



}
