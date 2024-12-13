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
//fetch all courses
Route::get('/courses', [Controller::class, 'courses']);
//fetch all teachers
Route::get('/teachers', [Controller::class, 'teachers']);
//fetch one teacher data
Route::post('/one-teacher-data/{id}', [Controller::class, 'oneTeacherData']);
//fetch one teacher data
Route::post('/one-teacher-courses/{id}', [Controller::class, 'oneTeacherCourses']);
//make a course
Route::post('/start-course', [Controller::class, 'courseStart']);
//get mycourses(one teacher's course)
Route::post('/my-courses', [Controller::class, 'myCourses']);
//get a certain course
Route::get('/get-course/{id}',[CourseController::class,'getCourseData']);

/****** fetch only a few ******/
//fetch a few teachers
Route::get('/some-teachers', [Controller::class, 'someTeachers']);
//fetch a few courses
Route::get('/some-courses', [Controller::class, 'someCourses']);
//modefy data
Route::post('/modefy-data', [Controller::class, 'modefyData']);

/***** fetch *****/
//fetchuser name
Route::get('/get-name/{userId}', [UserController::class, 'getUserName']);
Route::get('/piv/{userId}/{cid}', [UserController::class, 'piv']);
Route::get('/check-course-subscription/{userId}/{courseId}', [UserController::class, 'checkSubscription']);


//pdf
Route::get('/pdf', [pdfController::class, 'pdf']);
//streaming
Route::get('/streaming/{userId}/{courseId}',[UserController::class, 'streaming']);//return view('streaming');
