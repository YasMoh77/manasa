<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


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
       $user=User::find($userId);
      /* $found=User::whereHas('course',function($q) use($courseId){
            $q->where('courses.id',$courseId);
       })->where('users.id',$userId)->exists();*/
       //check if user is subscribed
       $found = User::find($userId)?->course()->where('courses.id', $courseId)->exists();

       //if user was found
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

    



}
