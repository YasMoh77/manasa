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
                ->orWhere('name','like','%'.$searchValue.'%');
             })->get();
            //if not found
            if($found){ 
                return response()->json(['search'=>$found,'found'=>'stu']);
            }else{return response()->json(['search'=>'null']);}
            //search for teacher
        }elseif($radioValue==='tea'){
            //search using values
           /* $found=User::where('id',$searchValue)
            ->orWhere('name','like','%'.$searchValue.'%')
            ->first();*/
            $found=User::where(function($q)use($searchValue){
               $q->where('id',$searchValue)
               ->orWhere('name','like','%'.$searchValue.'%');
            })->get();
            //if not found
            if($found){ 
                return response()->json(['search'=>$found,'found'=>'tea']);
            }else{return response()->json(['search'=>'null']);}

        }elseif($radioValue==='cou'){
            //search for course
            $found=Course::where('id',$searchValue)
            ->orWhere('name','like','%'.$searchValue.'%')
            ->first();
            //if not found
            if($found){ 
                return response()->json(['search'=>$found,'found'=>'cou']);
            }else{return response()->json(['search'=>'null']);}
        }
    }
    
    
    //insert courses in pivot table
    public function piv($uid,$cid)
    {
        $user=User::find($uid);
        $user->course()->attach($cid);
        echo 'done';
    }

    //check subscription
    public function checkSubscription($userId,$courseId)
    {  
        //check if user is still in database
       $user=Student::find($userId);
      /* $found=User::whereHas('course',function($q) use($courseId){
            $q->where('courses.id',$courseId);
       })->where('users.id',$userId)->exists();*/
       // if user isn't in database
       if(!$user){
          return response()->json(['user'=>'no user']);
       }
       //check if user is subscribed
       $found = Student::find($userId)?->course()->where('courses.id', $courseId)->exists();

       //if user is subscribed or not
       if($found){
          return response()->json(['user'=>'subscribed']);
       }else{
        return response()->json(['user'=>'no subscription']);
       }
    }
    

    //allow subscribed user to start streaming
    public function streaming($userId,$courseId)
    {  
        //find user
        $user=User::find($userId);
      //check if user is subscribed
      $found = User::find($userId)?->course()->where('courses.id', $courseId)->exists();
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
            // Delete old file if it exists
            $oldFilePath = 'public/files/' . $foundRow->sentFile;
            Storage::delete($oldFilePath);
            //delete row
            $found->delete();
        
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
                $pay->course=$request->course_Id;
                $pay->sentFile=$fileFinal;
                $pay->method=$request->method;
            $pay->save();
            return response()->json([
                'data'=>'شكرا تم الاستلام',
                //'data'=>$fileFinal
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
    //send payments
    return response()->json([
        'payments'=>$payments
    ]);
}

    



}
