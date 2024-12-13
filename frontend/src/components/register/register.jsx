import React,{useState,useRef,useEffect,useContext} from 'react'
import { UserContext } from '../user/UserProvider';
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import {http} from '../axios/axiosGlobal'
import './register.css'


const Register = () => {
    //const loginData=JSON.parse(localStorage.getItem('loginData'));
    const {loginData} = useContext(UserContext)

    //states
    const [load, setLoad]                     = useState(false)
    const [validateErrors, setValidateErrors] = useState(null)
    const [successMsg, setSuccessMsg]         = useState(null)
    const [fetchedSubjects, setFetchedSubjects] = useState(null)
    //form 
    const [wrongRole, setWrongRole] = useState(false)
    const [wrongName, setWrongName] = useState(false)
    const [wrongPhone, setWrongPhone] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [wrongPassword2, setWrongPassword2] = useState(false)
    const [wrongStageS, setWrongStageS] = useState(false)
    const [wrongStageT, setWrongStageT] = useState(false)
    const [wrongSubject, setWrongSubject] = useState(false)
    const [wrongDesc, setWrongDesc] = useState(false)

    // values
    const refName      = useRef(null)
    const refDesc      = useRef(null)
    const refPhone     = useRef(null)
    const refPassword  = useRef(0)
    const refPassword2 = useRef(0)
    const refStageS       = useRef(null)
    const refStageT       = useRef(null)
    const refStageSCont   = useRef(null)
    const refStageTCont   = useRef(null)
    const refSubject      = useRef(null)
    const refSubjectCont  = useRef(null)
    const refDescCont     = useRef(null)
    const refTeacher      = useRef(null)
    const refStudent      = useRef(null)
    const contTS          =useRef(null)
    const refNoteN        = useRef(null)
    //navigate
    const navigate=useNavigate();
     
    async function getUser(){
        //const main= await axios.get('/sanctum/csrf-cookie');
        //console.log(main)
      }
      //check fields
    const checkRole=(value,value1)=>{ if(value.current.checked==false && value1.current.checked==false){setWrongRole(true); }else{setWrongRole(false);} }
    const checkName=(value)=>{ if(value.length<5||value.length>60){setWrongName(true); }else{setWrongName(false);} }
    const checkDesc=(value)=>{ if(value.length<25||value.length>700){setWrongDesc(true); }else{setWrongDesc(false);} }
    const checkPhone=(value)=>{ if(value.length!==11){setWrongPhone(true); }else{setWrongPhone(false);} }
    const checkPassword=(value)=>{ if(value.length<8||value.length>25){setWrongPassword(true); }else{setWrongPassword(false);} }
    const checkPassword2=(value,value1)=>{ if(value.length<8||value.length>25||value!==value1){setWrongPassword2(true); }else{setWrongPassword2(false);} }
    const checkStageS=(value,value2)=>{ if(value===''&&value2.current.checked==true){setWrongStageS(true); }else{setWrongStageS(false);} }
    const checkStageT=(value,value2)=>{ if(value===''&&value2.current.checked==true){setWrongStageT(true); }else{setWrongStageT(false);} }
    const checkSubject=(value,value2)=>{ if(value===''&&value2.current.checked==true){setWrongSubject(true); }else{setWrongSubject(false);} }
    

     //submit new user data to backend
    const submitNewUser=async(e)=>{
        e.preventDefault();
        //define values
        const name   =refName.current.value.trim();
        const desc   =refDesc.current.value.trim();
        const phone     =refPhone.current.value.trim();
        const password  =refPassword.current.value.trim();
        const password_confirmation =refPassword2.current.value.trim();
        const stageS     =refStageS.current.value;
        const stageT     =refStageT.current.value;
        const subject   =refSubject.current.value;
        const radioT   =refTeacher.current.checked?'teacher':'';
        const radioS   =refStudent.current.checked?'student':'';
        const radio=radioT=='teacher'?'teacher':(radioS=='student'?'student':'')
        //check fields
        checkRole(refTeacher,refStudent)
        checkName(name)
        checkDesc(desc)
        checkPhone(phone)
        checkPassword(password)
        checkPassword2(password_confirmation,password)
        checkStageS(stageS,refStudent)
        checkStageT(stageT,refTeacher)
        checkSubject(subject,refTeacher)

        //console.log('r='+refTeacher.current.checked,refStudent.current.checked)
        //store values
        const postData={name,desc,phone,password,password_confirmation,stageS,stageT,subject,radio};
        //check empty fields
       if((name!==''||name.length>=5||name.length<=60) && (desc!==''||desc.length>=25||desc.length<=700) && phone!==''&&phone.length==11 && password!==''&&password.length>=8&&password.length<=25 && password_confirmation!==''&&password_confirmation.length>=8&&password_confirmation.length<=25 &&password===password_confirmation && (refStudent.current.checked==true&&stageS!='' || refTeacher.current.checked==true && stageT!=0 && subject!='' )  && radio!==''  ){
        //start spinner
          setLoad(true);
          //send data
            try{
                const res=await http.post('/register',postData);
              //  show msg, then navigate
                setSuccessMsg(res.data.message)
                setLoad(false);
                //navigate
                setTimeout(() => {
                    navigate('/login')
                }, 1800);

            }catch(error){
                setLoad(false);
                error.response?setValidateErrors(error.response.data.errors) :setValidateErrors('');
            }
       }
        
    }    
    //show hide password
    const showHidePassword=()=>{
        if(refPassword.current.type=='password')
          {refPassword.current.type='text';refPassword.current.nextElementSibling.style.display='none';refPassword.current.nextElementSibling.nextElementSibling.style.display='block';}
        else if(refPassword.current.type=='text')
          {refPassword.current.type='password';refPassword.current.nextElementSibling.style.display='block';refPassword.current.nextElementSibling.nextElementSibling.style.display='none';}
    }

    //show hide password2
    const showHidePassword2=()=>{
        if(refPassword2.current.type=='password')
          {refPassword2.current.type='text';refPassword2.current.nextElementSibling.style.display='none';refPassword2.current.nextElementSibling.nextElementSibling.style.display='block';}
        else if(refPassword2.current.type=='text')
          {refPassword2.current.type='password';refPassword2.current.nextElementSibling.style.display='block';refPassword2.current.nextElementSibling.nextElementSibling.style.display='none';}
    }
   
    //uncheck radio
    const checkRadio=()=>{
        if(refTeacher.current.checked){refStudent.current.checked='false';}
        if(refStudent.current.checked){refTeacher.current.checked='false';}
    }

    //show subject if user is teacher 
    const showTeacher=()=>{
        refSubjectCont.current.style.display='block';refSubjectCont.current.style.marginTop='3.5vh';
        refStageTCont.current.style.display='block';refStageTCont.current.style.marginTop='3.5vh';
        refDescCont.current.style.display='block';refDescCont.current.style.marginTop='3.5vh';
        refStageSCont.current.style.display='none';
    } 

    //hide subject if user is student
    const showStudent=()=>{
        refStageSCont.current.style.display='block';refStageSCont.current.style.marginTop='3.5vh';
        refStageTCont.current.style.display='none';
        refSubjectCont.current.style.display='none';
        refDescCont.current.style.display='none';
    } 
    
    //fetch all subjects
    const fetchSubjects=async()=>{
        const res=await http.get('/subjects');
        setFetchedSubjects(res.data.subjects)
    }     

    useEffect(() => {
        //go to profile if logged in
        loginData && navigate('/profile');
        //get subjects(to use in form) on page open
        fetchSubjects();
    }, [loginData])

    return (
        <div>
            <div className='container my-5 top-add '>
                <div className='row border px-4 rounded-4 bg-light w-75 mx-auto'>
                    <form onSubmit={getUser,submitNewUser} className='mx-auto w-100 form-add '>
                        <p className="w-fit mx-auto mt-2 mb-5 color-1 fw-bold fs-2">حساب جديد </p>
                        
                        <div className="mb-5 row">
                            <div className="col-3 py-3"><label> اختر</label><span className='text-danger'>*</span></div>
                            <div ref={contTS} className={wrongRole?'col-9 d-flex rounded-2 bg-light justify-content-evenly align-items-center border border-danger' :'col-9 d-flex rounded-2 bg-light justify-content-evenly align-items-center border border-light' }>
                                <div onClick={showTeacher} className='bg-info rounded-2'>
                                    <label className='py-2 px-3 d-inline-block' htmlFor="teacher">أنا معلم</label>
                                    <input type="radio" onClick={checkRadio} ref={refTeacher} className="ms-2 py-2 px-3 d-inline-block radio" name='radio' id="teacher" />
                                </div>
                                <div onClick={showStudent} className='bg-warning rounded-2'>
                                    <label className='py-2 px-3 d-inline-block' htmlFor="student">أنا طالب</label>
                                    <input type="radio" ref={refStudent} className="ms-2 py-2 px-3 d-inline-block radio" name='radio' id="student" />
                                </div>
                            </div>
                        </div>
                        {/* validate radio */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='radio' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}  


                        {/*name*/}
                        <div className="row ">
                            <div className="col-3 py-3"><label htmlFor="name" > الاسم </label><span className='text-danger'>*</span></div>
                            <input type="text"  ref={refName} className={ wrongName ? 'col-9 p-3 rounded-2 border border-danger'  : 'col-9 p-3 rounded-2 border border-primary ' }   id='name'  placeholder="أدخل الاسم" required/>
                        </div>
                        <small ref={refNoteN} className={wrongName? 'mx-auto w-fit d-block text-danger' : 'mx-auto w-fit d-block text-dark'}>  (5 - 60 حرف) </small>
                        {/* validate name */}
                        {validateErrors&& Object.keys(validateErrors).map((key,index)=>(
                            validateErrors[key].map((e,index)=> key==='name' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}

                        <div className="mt-3 row">
                            <div className="col-3 py-3"><label htmlFor="phone" >رقم المحمول</label><span className='text-danger'>*</span></div>
                            <input type="text"  ref={refPhone} className={wrongPhone?"col-9 p-3 rounded-2 border border-danger" :"col-9 p-3 rounded-2 border border-primary" } name='phone' id="phone" placeholder="أدخل  رقم المحمول" />
                        </div>
                        <small className={wrongPhone?'mx-auto w-fit d-block text-danger' :'mx-auto w-fit d-block text-dark' }>  (11 رقم) </small>
                        {/* validate name */}
                        {validateErrors&& Object.keys(validateErrors).map((key,index)=>(
                            validateErrors[key].map((e,index)=> key==='phone' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}
                        
                        <div className="mt-3 row pass-div">
                            <div className="col-3 py-3"><label htmlFor="password" >كلمة المرور</label><span className='text-danger'>*</span></div>
                            <div className={wrongPassword?" col-9 rounded-2 border border-danger position-relative" : " col-9 rounded-2 border border-primary position-relative"}>
                                <input type="password"  ref={refPassword} className='w-100 border-0 p-3 rounded-2 '  name='password' id="password" placeholder="أدخل كلمة المرور" required/>
                                <i onClick={showHidePassword} className='bi bi-eye-slash eye position-absolute'></i>
                                <i onClick={showHidePassword} className='bi bi-eye eye none position-absolute'></i>
                            </div>
                        </div>
                        <small className={wrongPassword ?'mx-auto w-fit d-block text-danger' : 'mx-auto w-fit d-block text-dark'}> (8 - 25 حروف أو أرقام) </small>
                        {/* validate password */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='password' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}

                        <div className="mt-3 row position-relative pass-div">
                            <div className="col-3 py-3"><label htmlFor="password2" >تأكيد كلمة المرور</label><span className='text-danger'>*</span></div>
                            <div className={wrongPassword2?" col-9 rounded-2 border border-danger position-relative" : " col-9 rounded-2 border border-primary position-relative"}>
                                <input type="password"  ref={refPassword2} className="w-100 p-3 rounded-2 border-0" name='password_confirmation' id="password2"  placeholder="أعد كلمة المرور" required/>
                                <i onClick={showHidePassword2} className='bi bi-eye-slash eye position-absolute'></i>
                                <i onClick={showHidePassword2} className='bi bi-eye eye2 none position-absolute'></i>
                            </div>
                        </div>
                        <small className={wrongPassword2 ?'mx-auto w-fit d-block text-danger' : 'mx-auto w-fit d-block text-dark'}> (8 - 25 حروف أو أرقام - تتطابق مع كلمة المرور) </small>

                        {/* validate confirm password */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='password_confirmation' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}

                    
                        <div className="row">
                            <div ref={refSubjectCont} className='none p-0'>
                                <div className="col-3 py-3 d-inline-block"><label htmlFor="subject" > مادة التخصص</label><span className='text-danger'>*</span></div>
                                {fetchedSubjects && (
                                    <select ref={refSubject} className={wrongSubject?"col-9 p-3 rounded-2 border border-danger" :"col-9 p-3 rounded-2 border border-primary" }  id="subject" >
                                        <option className='bg-1' value=''>اختر المادة التي تقوم بتدريسها</option>
                                        {fetchedSubjects.map((e)=>(
                                            <option value={e.id}>{e.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>
                        {/* validate subject */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='subject' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}


                        <div className="row">
                           <div ref={refStageTCont} className='none p-0'>
                                <div className="col-3 py-3 d-inline-block"><label htmlFor="stageT" > المرحلة</label><span className='text-danger'>*</span></div>
                                <select ref={refStageT} className={wrongStageT?"col-9 p-3 rounded-2 border border-danger" :"col-9 p-3 rounded-2 border border-primary" } name='stageT' id="stageT" >
                                    <option className='bg-1' value=''>أنا معلم أقوم بالتدريس في </option>
                                    <option value='1'>المرحلة الابتدائية</option>
                                    <option value='2'>المرحلة الاعدادية</option>
                                    <option value='3'>المرحلة الثانوية</option>
                                </select>
                            </div>
                        </div>
                        {/* validate stage */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='stageT' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}


                        
                        <div className="row">
                           <div ref={refDescCont} className='none p-0'>
                               <div>
                                    <div className="col-3 py-3 d-inline-block"><label htmlFor="stageT" > نبذه عني</label><span className='text-danger'>*</span></div>
                                    <input type="text"  ref={refDesc} className={ wrongDesc ? 'col-9 p-3 rounded-2 border border-danger'  : 'col-9 p-3 rounded-2 border border-primary ' }   id='name'  placeholder="تحدث عن نفسك  " />
                               </div>
                               <small className={wrongDesc ?'mx-auto w-fit d-block text-danger' : 'mx-auto w-fit d-block text-dark'}> (25 - 700  حرف) </small>
                            </div>
                        </div>
                        {/* validate stage */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='desc' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}


                        <div className="row">
                           <div ref={refStageSCont} className='none p-0'>
                                <div className="col-3 py-3 d-inline-block"><label htmlFor="stageS"> المرحلة</label><span className='text-danger'>*</span></div>
                                <select ref={refStageS} className={wrongStageS?"col-9 p-3 rounded-2 border border-danger" :"col-9 p-3 rounded-2 border border-primary" } name='stageS' id="stageS" >
                                    <option className='bg-1' value=''>أنا طالب في </option>
                                    <option value='1'>المرحلة الابتدائية</option>
                                    <option value='2'>المرحلة الاعدادية</option>
                                    <option value='3'>المرحلة الثانوية</option>
                                </select>
                            </div>
                        </div>
                        {/* validate stage */}
                        {validateErrors&& Object.keys(validateErrors).map((key)=>(
                            validateErrors[key].map((e)=> key==='stageS' && (<p className='w-fit mx-auto text-danger'>{e}</p>))
                        ))}
                        
                        
                        <div className='register-submit align-items-center mt-5'>
                            <div className="ms-2 w-100">
                                <button  type="submit" disabled={load} className="btn btn-success w-100">{load? <span className='spinner-border mx-auto align-self-center text-dark d-block'></span> :'أرسل'}</button>
                                {successMsg && (<p className='text-success mx-auto w-fit '>{successMsg}</p>)}
                            </div>
                            <div className="mx-auto w-fit my-4">
                                <span className='ms-2'>لديك حساب؟</span>
                                <Link to='/login'> تسجيل الدخول</Link>
                            </div>
                        </div>
                    
                        {/* use spinner before fetching response*/}
                    {/* {loadNav&& (<p className='spinner-border gray mx-auto mt-4 d-block'></p>)}
                        {/* show success response
                        {responseOk && (<p className="w-fit mx-auto text-danger fw-bold">{responseOk}</p>) }  
                    
                        {/* show name error 
                        {responseError && Object.keys(responseError).map((key)=>(
                                <div className='mt-3 '>
                                    {responseError[key].map((e)=> key=='name' &&  <p className='mb-0 mx-auto w-fit red'> "اسم المستخدم" : {e}</p> )} 
                                </div>  ))
                        }
                        {/* show email error 
                        {responseError && Object.keys(responseError).map((key)=>(
                            <div className='mt-3 '>
                                {responseError[key].map((e)=> key=='email' &&  <p className='mb-0 mx-auto w-fit red'> " البريد الالكتروني" : {e}</p> )} 
                            </div>  ))
                        }
                        {/* show password error 
                        {responseError && Object.keys(responseError).map((key)=>(
                            <div className='mt-3 '>
                                {responseError[key].map((e)=> key=='password' &&  <p className='mb-0 mx-auto w-fit red'> "كلمة المرور " : {e}</p>  )} 
                            </div>  ))
                        } */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
