<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use App\Models\User; 
use App\Models\Student; 
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;



class AuthController extends Controller
{
 
    // Handle an incoming registration request.
    public function register(Request $request)
    {
        $request->validate([
            'name'     => ['required', 'string','min:5','max:60' ],
            'desc'     => ['required_if:radio,teacher', 'string','min:25','max:700' ],
            'phone'    => ['required', 'digits:11', 'unique:'.User::class],
            'password' => ['required','string','min:8','max:25', 'confirmed'],
            'password_confirmation'=> ['required','string'],
            'radio'      => ['required' ],    
            'subject'    => ['required_if:radio,teacher' ],    
            'stageT'     => ['required_if:radio,teacher' ],      
            'stageS'     => ['required_if:radio,student' ],             
        ]);

        $user=new User();
            $user->name= strip_tags($request->name);
            $user->description= $request->radio==='teacher'?strip_tags($request->input('desc')):'';
            $user->phone= strip_tags($request->phone);  
            $user->password= Hash::make(strip_tags($request->password));
            $user->subject= $request->radio=='teacher'?$request->subject:'';
            $user->stage= $request->radio=='student'?$request->stageS:$request->stageT;
            $user->role= $request->radio;
        $user->save();
           
        //event(new RegisterEvent($user));
        
        return response()->json([
            'message'=>'تم التسجيل بنجاح',
        ]);
    }



    //login
    public function login(Request $request)
    {
     $validator = Validator::make($request->all(),[
        'phone'     => 'required|digits:11',
        'password'  => 'required|string'

      ]);
        //if wrong data
        if ($validator->fails()) {
            return response()->json([
                'message' =>'خطأ في رقم المحمول أو كلمة المرور',
                //'validate'=>'wrong'
            ]);
        }
        
        $logger='';
        //attempt login
        $teacerCredentials    =   $request->only('phone', 'password');
        if ( Auth::attempt($teacerCredentials)) {
            //logger is a teacher
            $logger='teacher';
            /**/
        }else{
            //check if logger is a student
           $found=Student::where('phone',$request->phone)->first();
          if(!$found || !Hash::check($request->password,$found->password)){
                return response()->json([
                    'message' => 'بيانات الدخول غير صحيحة',
                ]);
          }else{
              //student is found
              $logger='student';
          }
        }

        //create token
        $logMe=$logger==='teacher'? User::where('phone', $request->phone)->firstOrFail() : Student::where('phone', $request->phone)->firstOrFail();
       // $user   = User::where('phone', $request->phone)->firstOrFail();
        $token  = $logMe->createToken('auth_token')->plainTextToken;
        
        $authData=[];
        $authData['token']=$token;
        $authData['token_type']='Bearer'; 

        return response()->json([
            'message'       => 'تم تسجيل الدخول بنجاح',
            'authData' => $authData,
        ]);
    }


    //get user data
    public function user (Request $request) 
    {
        return response()->json([
            'user'=>$request->user(),
        ]);
    }
    


    


}
