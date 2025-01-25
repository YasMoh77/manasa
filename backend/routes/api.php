<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\pdfController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//login & register
Route::/*middleware('auth:sanctum')->*/post('register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user',[AuthController::class, 'user'] )->middleware('auth:sanctum');

//fetch all subjects
Route::get('/subjects', [Controller::class, 'subjects']);
//fetch all grades
Route::get('/grades', [Controller::class, 'grades']);
//fetch all teachers
Route::get('/teachers', [Controller::class, 'teachers']);
//fetch one teacher data
Route::post('/one-teacher-data/{id}', [Controller::class, 'oneTeacherData']);


/************ COURSES ************/
//fetch all courses
Route::get('/courses', [Controller::class, 'courses']);
//fetch a few courses
Route::get('/some-courses', [Controller::class, 'someCourses']);
//fetch one teacher courses
Route::post('/one-teacher-courses/{id}', [Controller::class, 'oneTeacherCourses']);
//create a course
Route::post('/create-course', [Controller::class, 'courseCreate']);
//get mycourses(one teacher's course)
Route::post('/teacher-courses', [Controller::class, 'teacherCourses']);
//get studentcourses
Route::post('/student-courses', [Controller::class, 'studentCourses']);
//get a certain course
Route::get('/get-course/{id}',[CourseController::class,'getCourseData']);
//check if students is subscribed to a certain course
Route::get('/check-course-subscription/{userId}/{courseId}', [UserController::class, 'checkSubscription']);
//insert course in pivot table
Route::post('/pivot/{student_Id}/{course_Id}', [UserController::class, 'pivot']);
//remove course from pivot table
Route::post('/pivot-delete/{student_Id}/{course_Id}', [UserController::class, 'pivotDelete']);
//count subscribed courses for a student
Route::get('/count-courses/{id}/{user}', [UserController::class, 'countCourses']);


/********** fetch only a few ***********/
//fetch a few teachers
Route::get('/some-teachers', [Controller::class, 'someTeachers']);
//modefy data
Route::post('/modefy-data', [Controller::class, 'modefyData']);


/************ fetch **************/
//fetchuser name
Route::get('/get-name/{userId}', [UserController::class, 'getUserName']);
//search
Route::get('/search-student/{searchVal}/{radioVal}', [UserController::class, 'searchDashboard']);

//receive payments
Route::post('/receive-payment', [UserController::class, 'receivePayment']);
Route::get('/get-payments', [UserController::class, 'getPayments']);


//pdf
Route::get('/pdf', [pdfController::class, 'pdf']);
//streaming
Route::get('/streaming/{student_Id}/{course_Id}',[UserController::class, 'streaming']);//return view('streaming');
