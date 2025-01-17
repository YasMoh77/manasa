import { useContext,useState,useEffect,useRef } from 'react';
import { UserContext } from '../user/UserProvider';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import  './profile.css'
import axios from 'axios'
import { http,httpFile } from '../axios/axiosGlobal';

const Profile = () => {
   const navigate=useNavigate();
   //get data from provider
   const {loginData,login,fetchedGrades} = useContext(UserContext)
   //states
   const [data, setData] = useState(false)
   const [course, setCourse] = useState(false)
   const [studentCourses, setStudentCourses] = useState(null)
   const [add, setAdd] = useState(false)
   const [modify, setModify] = useState(false)
   //form states
   const [load, setLoad]                     = useState(false)
   const [fetchedSubjects, setFetchedSubjects] = useState(null)
  // const [fetchedGrades, setFetchedGrades] = useState(null)
   const [msg, setMsg] = useState(null)
   const [validateErrors, setValidateErrors] = useState(null)
   //photos url
   const baseURL='http://127.0.0.1:8000/storage/images/';
   //courses states
   const [courses, setCourses] = useState(null)

   //useref for adding course (اضافة درس)
   const refName = useRef(null)
   const refSubject = useRef(null)
   const refGrade = useRef(null)
   const refDay = useRef(null)
   const refTime = useRef(null)
   
   //display user data
   const showData=()=>{
    setData(true) ; setCourse(false) ; setAdd(false) ; setModify(false)
   }
   //display courses
   const showCourse=()=>{
    setData(false) ; setCourse(true) ; setAdd(false) ; setModify(false)
   }
   //add data
   const showAdd=()=>{
    setData(false) ; setCourse(false) ; setAdd(true) ; setModify(false)
   }
  //modeify
  const showModify=()=>{
    setData(false) ; setCourse(false) ; setAdd(false) ; setModify(true)
  }
  
  //get subjects
  const fetchSubjects=async()=>{
    const res=await http.get('/subjects');
    setFetchedSubjects(res.data.subjects)
 }     

    //check name length
    const checkName=(field,value)=>{
        if(value.length<10 || value.length>250){field.current.style.border='2px solid red';}
        if(value.length>=10 && value.length<=250){field.current.style.border='transparent';}

    }
  
 //submit course
 const submitCourse=async(e)=>{
    e.preventDefault()
    //prepare values
    const c_name=refName.current.value;
    const c_subject=refSubject.current.value;
    const c_grade=refGrade.current.value;
    const c_day=refDay.current.value;
    const c_time=refTime.current.value;
    const c_teacher=loginData.phone;
    //check name length
    checkName(refName,c_name)
    //store in one
    const data={c_name,c_subject,c_grade,c_day,c_time,c_teacher}
    //check empty fields
    if((c_name.length>=10 && c_name.length<=250  ) && c_subject!='' && c_grade!='' && c_day!='' && c_time!='' ){
      try{
         //start spinner
         setLoad(true);
         //send
         const res=await http.post('/start-course',data);
         //stop spinner
         setLoad(false);
         //show msg
         setMsg(res.data.message)
         //go to profile
         setTimeout(() => {
            if(res.data.done=='done'){
                window.location.reload();
            }
         }, 1800);
          
      }catch(error){
         //stop spinner 
        // console.log(error.response)
         setLoad(false);
         error.response?setValidateErrors(error.response.data.errors) :setValidateErrors('');
      }
    }
 }

 //get myCourses
 const myCourses=async()=>{
     //get myCourses
     const userData=JSON.parse(localStorage.getItem('loginData'))
     const id=userData.id;
     const res=await http.post('/teacher-courses',{id});
     setCourses(res.data.courses)
 }

 //get myCourses
 const studentCoursesFunc=async()=>{
    //get myCourses
    const userData=JSON.parse(localStorage.getItem('loginData'))
    const id=userData.id;
    const res=await http.post('/student-courses',{id});
    setStudentCourses(res.data.courses)
}


 //useref for modefying data ( تعديل بيانات)
 const refModPhone = useRef(null)
 const refNewPassword = useRef(null)
 const refNewPasswordRepeat = useRef(null)
 const refAboutMe = useRef(null)
 const refPic     = useRef(null)
 //check
 const [wrongPhoneMod,setWrongPhoneMod]=useState(false)
 const [wrongNewPassword,setwrongNewPassword]=useState(false)
 const [wrongPasswordRepeat,setwrongPasswordRepeat]=useState(false)
 const [wrongAboutMe,setWrongAboutMe]=useState(false)
 const [wrongPic, setWrongPic] = useState(false)
//check functions
const checkModphone=(value)=>{if(value.length>0 &&(typeof(value)!='string'|| isNaN(value)|| value.length!==11)){setWrongPhoneMod(true)}else{setWrongPhoneMod(false)}}
const checkNewPassword=(value)=>{if(value.length>0 &&(value.length<8 || value.length>25)){setwrongNewPassword(true)}else{setwrongNewPassword(false)}}
const checkPasswordRepeat=(value,value2)=>{if(value.length>0 &&(value.length<8 || value.length>25 || value!==value2)){setwrongPasswordRepeat(true)}else{setwrongPasswordRepeat(false)}}
const checkAboutMe=(value)=>{if(value.length>0 &&(value.length<25 || value.length>700)){setWrongAboutMe(true)}else{setWrongAboutMe(false)}}
 //submit modefications
 const submitModefy=async(e)=>{
     e.preventDefault()
     //data
     const phone=refModPhone.current.value.trim();
     const password=refNewPassword.current.value.trim();
     const password_confirmation=refNewPasswordRepeat.current.value.trim();
     const aboutMe=refAboutMe.current.value.trim();
     const pic=refPic.current.files[0];
     
     const allowedPicExe=['image/jpg','image/jpeg','image/png','application/pdf'];
     if(pic){
        const checkPic=(pic)=>{
            if(allowedPicExe.indexOf(pic.type)<0||pic.size>102400){setWrongPic(true);}else{setWrongPic(false);}
        }
        checkPic(pic)
    }
     //check data
     checkModphone(phone)
     checkNewPassword(password)
     checkPasswordRepeat(password_confirmation,password)
     checkAboutMe(aboutMe)
     
     //send
     const userData=JSON.parse(localStorage.getItem('loginData'))
     const id=userData.id;
     const postData={phone,password,password_confirmation,aboutMe,pic,id};
     //check empty
     if(phone.length===11 || password.length>=8&&password.length<=25 || password_confirmation===password&&password.length>0 || aboutMe.length>=25&&aboutMe.length<=700 || pic&& allowedPicExe.indexOf(pic.type)>=0&&pic.size<=102400999){
     try{
        setLoad(true)
         //send
        const res=await httpFile.post('/modefy-data',postData);
        setLoad(false)
        setMsg(res.data.message)
        if(res.data.authData){
            //store token sent from backend
           const token=res.data.authData.token;
           localStorage.setItem('token',token)
           //use token to get user data
           const res2= await axios.get('http://localhost:8000/api/user',{
            headers:{
                'X-Requested-With':'XMLHttpRequest',
                Authorization: `Bearer ${token}`        
               }
           });
           //send data to login
           login(res2.data.user)
            //stop loading
            setLoad(false)
            setMsg(res.data.message)
            //reload
            setTimeout(() => {
             window.location.reload()
            }, 1500);
        } 

     }catch(error){
        setLoad(false)
        console.log(error.response)
        error.response?setValidateErrors(error.response.data.errors) :setValidateErrors('');
     }
    }else{setMsg('خطأ')}
 }

 //show hide password
 const showHidePassword=()=>{
    if(refNewPassword.current.type=='password')
      {refNewPassword.current.type='text';refNewPassword.current.nextElementSibling.style.display='block';refNewPassword.current.nextElementSibling.nextElementSibling.style.display='none';}
    else if(refNewPassword.current.type=='text')
      {refNewPassword.current.type='password';refNewPassword.current.nextElementSibling.style.display='none';refNewPassword.current.nextElementSibling.nextElementSibling.style.display='block';}
}

  //go to login if not logged in
  useEffect(() => {
    if(loginData){
        fetchSubjects() //get all subjects
        myCourses()
    }else{
       navigate('/login');
    }
    
  }, [loginData])
    
    return (
        <>
          {loginData &&
            <div className='p-2 fs-5 mb-5 main-div container-fluid'>
                    {loginData.role==='s'? <span>صفحة حساب الطالب</span>:  <span>صفحة حساب المعلم</span> }
                    {loginData.admin==='a'&& <span className='fs-6 me-2'>(أدمن)</span>} {loginData.admin==='sa'&&<span className='fs-6 me-2'>(سوبر أدمن)</span>}
                    
                    {/** admin and super admin login */}
					{loginData&&loginData.admin==='a'||loginData&&loginData.admin==='sa'&&
					<p className=' mx-4'> <Link className='' to='/dashboard'>لوحة التحكم</Link></p>}

                     {loginData&&loginData.pic!=null
                     ?<div className='pic-cont rounded-3 w-fit mx-auto w-25 '><img className='d-block mx-auto rounded-circle w-50 mh-100' src={baseURL+loginData.pic}/></div>
                     :<div className='rounded-3 h-fit mx-auto w-25 '><i className='bi bi-person-circle user-icon d-block w-fit mx-auto color-1'></i></div>
                    }
                 <button onClick={showModify} className='border-0 d-block mx-auto fs-6 mt-1'>تعديل</button>
                

                 {/*<form className='mx-auto w-fit mt-1'><button className='border-0 bg-success'>edit</button></form>*/}
                <div className='my-5 mx-auto w-fit'>
                    <ul className='nav p-0 rounded-2'>
                        <li className='mx-1 bg-dark rounded-2' onClick={showData}><Link className="d-inline-block nav-link">بياناتي</Link><i className='bi bi-info-square text-white mx-2 px-2'></i></li>
                        <li className='mx-1 bg-dark rounded-2' onClick={showCourse}><Link className="d-inline-block nav-link">دروسي</Link><i className='bi bi-book text-white mx-2 px-2'></i></li>
                        {loginData.role!=='s' && <li className='mx-1 bg-dark rounded-2' onClick={showAdd}><Link className="d-inline-block nav-link" >اضافة درس</Link><i className='bi bi-plus-square text-white mx-2 px-2'></i></li>}
                        <li className='mx-1 bg-dark rounded-2' onClick={showModify}><Link className="d-inline-block nav-link" >تعديل البيانات</Link><i className='bi bi-pencil-square text-white mx-2 px-2'></i></li>
                    </ul>
                </div>

               {data && 
                <div>
                    <div className='mb-2'><span className='fw-bold'>الاسم</span>: <span>{loginData.name}</span></div>
                    <div className='mb-2'><span className='fw-bold'>التليفون</span>: <span>{loginData.phone}</span> </div>
                    {
                        loginData.role==='teacher' 
                        ? <div className='mb-2'><span className='fw-bold'>مادة التخصص</span>: <span>{loginData.subject} - {loginData.stage=='1'? ' المرحلة الابتدائية' : loginData.stage=='2' ? ' المرحلة الثانوية' : ' المرحلة الاعدادية'} </span></div>
                        : <div className='mb-2'><span className='fw-bold'>المرحلة</span>: <span>{loginData.stage=='1'? ' المرحلة الابتدائية' : loginData.stage=='2' ? ' المرحلة الثانوية' : ' المرحلة الاعدادية'}</span></div>
                    }
                    <div><span className='fw-bold'>تاريخ التسجيل</span>: <span dir='ltr'>{loginData.registry_date}</span> </div>
                    {loginData.role==='teacher' && <div><span className='fw-bold'> نبذه عني</span>: <span dir='ltr'>{loginData.description}</span> </div>}
                </div>
               }


               {/* دروسي */}
                {course && 
                    <div className='row justify-content-evenly m-0 fs-'>
                        {loginData.role=='t'
                            /* if user is a teacher  */
                            ? 
                                /* show courses added by this teacher  */
                                !courses 
                                /* show spinner till courses show up  */
                                ? <div className='w-fit mx-auto'><p className='spinner-border align-self-center'></p></div> 
                                /* if this teacher has courses show them  */
                                : Array.isArray(courses) && courses.length > 0 
                                    ?  courses.map((e)=>(
                                        <div className='col-12 col-md-5 border border-1 py-2 bg-light rounded-2'>
                                            <p className='fw-bold'>{e.name}</p>
                                            <div className='d-flex justify-content-between'>
                                            <div><i className='bi bi-book ms-1 color-1'></i><span>{e.subject}</span></div>
                                            {fetchedGrades && fetchedGrades.map((g)=>( g.id==e.grade && <div><i className='bi bi-mortarboard ms-1 color-1'></i><span>{g.name}</span></div> ))}
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <div><i className='bi bi-calendar ms-1 color-1'></i><span> {e.day=='1'? 'السبت والثلاثاء' : e.day=='2' ? 'الأحد والأربعاء' : 'الاثنين والخميس'}</span></div>
                                                <div><i className='bi bi-clock ms-1 color-1'></i><span>{e.time}</span></div>
                                            </div>
                                        </div>
                                    ))
                                    /* if this teacher doesn't have courses show this  */
                                    :  <p>لم يتم اضافة دروس بعد</p>
                            
                             /* if this user is student, show courses subscribed by this student  */    
                            :<p>student here</p>     
                        }
                    </div>
                } 


               {/* اضافة درس */}
               {add && 
                <div className='bg-info pt-4 px-3 rounded-4 w-50 mx-auto'>
                    <form>
                        <p className='mx-auto fw-bold w-fit mb-4'>اضافة درس</p>
                        {/* اسم الدرس */}
                        <div className="row">
                            <label for="name" className="col-sm-3 col-form-label">اختر اسم</label>
                            <div className="col-sm-9">
                              <input ref={refName} type="text" className="form-control" id="name" />
                              <p className='font-sm mb-3 w-fit mx-auto'>من 10 - 250 حرف </p>
                            </div>
                        </div>
                        {/* الصف */}
                        <div className="mb-3 row">
                            <label for="grade" className="col-sm-3 col-form-label">الصف</label>
                            <div className="col-sm-9">
                            {fetchedGrades && (
                                    <select ref={refGrade} className="form-select col-9 rounded-2 "  id="grade" >
                                        <option className='bg-1' value=''>اختر  </option>
                                        {fetchedGrades.map((e)=>(
                                        <option value={e.id}>{e.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                         {/* المادة */}
                        <div className="mb-3 row">
                            <label for="subject" className="col-sm-3 col-form-label">المادة</label>
                            <div className="col-sm-9">
                            <input ref={refSubject} type="text" className="form-control text-secondary" id="subject"  value={loginData.subject} readonly/>
                            </div>
                        </div>
                        {/*  اليوم */}
                        <div className="mb-3 row">
                            <label for="day" className="col-sm-3 col-form-label">اليوم</label>
                            <div className="col-sm-9">
                                <select ref={refDay} className="form-select" aria-label="Default select example">
                                    <option value=''>اختر</option>
                                    <option value="1">السبت والثلاثاء</option>
                                    <option value="2">الأحد والأربعاء</option>
                                    <option value="3">الاثنين والخميس</option>
                                </select>
                            </div>
                        </div>
                         {/* الوقت  */}
                        <div className="mb-3 row">
                            <label for="time" className="col-sm-3 col-form-label">الوقت</label>
                            <div dir='rtl' className="col-sm-9">
                               <input ref={refTime} type="time" className="form-control" id="time"/>
                            </div>
                        </div>

                        <div className="row ">
                           <label className="col-sm-3 col-form-label "></label>
                           <div className="col-sm-9 mb-5 bg- mx-auto text-success">
                                <button onClick={submitCourse} className="w-75 py-2 border-0 bg-1 d-block mx-auto rounded-2">
                                {load? <span className='spinner-border mx-auto align-self-center d-block'></span> :'أرسل'}
                                </button>
                                {msg && <p className='mx-auto mt-2 w-fit'>{msg}</p>}
                           </div>
                        </div>
                    </form>
                </div>
               } 


               {/* تعديل البيانات */}
               {modify && 
                    <div className='bg-blue pt-4 px-3 rounded-4 w-75 mx-auto'>
                        <form onSubmit={submitModefy}>
                           <p className='mx-auto fw-bold w-fit mb-4'> تعديل البيانات</p>

                           <div className="row mb-3">
                                <label for="phone" className="col-sm-3 col-form-label"> تعديل رقم المحمول</label>
                                <div className="col-sm-9">
                                    <input ref={refModPhone} type="text" className={wrongPhoneMod? "form-control bg-danger p-2" : "form-control bg-white p-2" } id="phone" placeholder='اكتب رقم المحمول الجديد' autoComplete='off' autoFocus/>
                                    <p className='font-sm mb-0 w-fit mx-auto'>(11 رقم) </p>
                                    {validateErrors && Object.keys(validateErrors).map((key)=>(
                                    validateErrors[key].map((e)=>key=='phone'&&(<p className='mx-auto w-fit fs-6 text-danger'>{e}</p>))
                                     ))}
                                </div>
                           </div>  
                           
                           <div className="row mb-3">
                                <label for="password" className="col-sm-3 col-form-label pt-5"> تعديل  كلمة المرور</label>
                                <div className="col-sm-9 position-relative">
                                    <input ref={refNewPassword} type="password" className={wrongNewPassword? "form-control bg-danger p-2" : "form-control bg-white p-2" } id="password" placeholder='اكتب كلمة المرور الجديدة' autoComplete='off' />
                                    <i onClick={showHidePassword} className='bi bi-eye eye position-absolute none'></i>
                                    <i onClick={showHidePassword} className='bi bi-eye-slash eye position-absolute'></i>
                                    <p className='font-sm mb-3 w-fit mx-auto'>(8 - 25 حروف أو أرقام) </p>
                                    {validateErrors && Object.keys(validateErrors).map((key)=>(
                                    validateErrors[key].map((e)=>key=='password'&&(<p className='mx-auto w-fit mb-3 fs-6 text-danger'>{e}</p>))
                                     ))}
                                    <input ref={refNewPasswordRepeat} type="password" className={wrongPasswordRepeat? "form-control bg-danger p-2" : "form-control bg-white p-2" }  placeholder='أعد كتابة كلمة المرور الجديدة' autoComplete='off' />
                                    <p className='font-sm mb-0 w-fit mx-auto'>(8 - 25 حروف أو أرقام - تتطابق مع كلمة المرور) </p>
                                    {validateErrors && Object.keys(validateErrors).map((key)=>(
                                    validateErrors[key].map((e)=>key=='password_confirmation'&&(<p className='mx-auto mb-3 w-fit fs-6 text-danger'>{e}</p>))
                                     ))}
                                </div>
                           </div>

                           <div className="row mb-4">
                                <label for="aboutMe" className="col-sm-3 col-form-label"> تعديل  نبذه عني</label>
                                <div className="col-sm-9">
                                    <textarea ref={refAboutMe} className={wrongAboutMe? "form-control bg-danger" : "form-control bg-white" } id="aboutMe" placeholder='تحدث عن نفسك' ></textarea>
                                    <p className='font-sm mb-0 w-fit mx-auto '>(25 - 700 حرف  ) </p>
                                    {validateErrors && Object.keys(validateErrors).map((key)=>(
                                    validateErrors[key].map((e)=>key=='aboutMe'&&(<p className='mx-auto mb-3 w-fit fs-6 text-danger'>{e}</p>))
                                     ))}
                                </div>
                           </div> 

                           <div className="row mb-5">
                                <label for="name" className="col-sm-3 col-form-label"> تعديل  صورة</label>
                                <div className='col-sm-9'>
                                    <input ref={refPic} type='file' className={wrongPic?'form-control fs-6 bg-danger w-100 p-2': 'form-control fs-6 bg-white w-100 p-2'} />
                                    <p className='font-sm mb-0 w-fit mx-auto '>   حجم لا يزيد عن (100 كيلو بايت) - امتداد  (jpg, jpeg, png) </p>
                                    {validateErrors && Object.keys(validateErrors).map((key)=>(
                                    validateErrors[key].map((e)=>key=='pic'&&(<p className='mx-auto mb-3 w-fit fs-6 text-danger'>{e}</p>))
                                     ))}
                                </div>
                           </div> 


                           <div className="row "> 
                                <label className="col-sm-3 col-form-label"></label>
                                <div className='col-9 mb-3'>
                                    <button className='w-100 py-2 bg-success text-white mx-auto d-block border-0 rounded-3'>{load?<span className='spinner-border mb-0 d-block mx-auto'></span>:<span>ارسل</span>}</button>
                                    {msg && <p className={msg==='خطأ'?'mx-auto w-fit mt-2 fs-6 text-danger' :'mx-auto w-fit mt-2 fs-6 text-success'}>{msg}</p>}
                                </div>
                           </div>              
                        </form>
                    </div>
               } 
           
            
           </div>
        }
      </>
    )
}

export default Profile
