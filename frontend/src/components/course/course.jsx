import React, {useEffect,useState,useRef } from 'react'
import { UserContext } from '../user/UserProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router'
import UserNameHelper from '../helpers/userNameHelper';
import CheckSubscription from '../helpers/checkSubscription';
import { http,httpFile } from '../axios/axiosGlobal';
import  './course.css'

const Course = () => {
    //states
    const [courseId, setCourseId] = useState(null)
    const [course, setCourse] = useState(null)
    //subscription
    const [subscribe, setSubscribe] = useState(null)
    const [now, setNow] = useState(null)
    const [nowPlus, setNowPlus] = useState(null)
    const [courseTime, setCourseTime] = useState(null)//time string changed into full date
    const [today, setToday] = useState(null)
    const navigate=useNavigate();
    //get data from provider
    const {loginData, fetchedGrades} = useContext(UserContext)
    //payment
    const [wrongFile, setWrongFile] = useState(null)
    const [payResult, setPayResult] = useState(null)
    const vodafone = useRef(null) 
    const vodafoneRadio = useRef(null) 
    const bank = useRef(null)
    const bankRadio = useRef(null) 
    const fileVoda = useRef(null) 
    const fileBank = useRef(null)

    //const paypal = useRef(null)
    //const paypalRadio = useRef(null) 
    const subscribeDiv = useRef(null)


    //get search query
    const allSearch=window.location.search;
    //get search query parameters 
    const params=new URLSearchParams(allSearch);
    //get course id
    const id=params.get('c');

    //get time now
    const getTime=()=>{
        const date=new Date();
        const hour=String(date.getHours()).padStart(2,'0');
        const minute=String(date.getMinutes()).padStart(2,'0');
        const seconds=String(date.getSeconds()).padStart(2,'0');
        const day=String(date.getDay());
        //get time now in h:i:s
        const time=hour+':'+minute+':'+seconds;
        //set now
        setNow(date) 
        setToday(day)  
       // alert('try= '+time)

    }

    const check=(cTime)=>{
        const [prevHours,prevMinutes,prevSeconds]=cTime.split(':').map(Number);
        const newdate=new Date();
        newdate.setHours(prevHours,prevMinutes,prevSeconds,0);
        const courseNow=new Date(newdate.getTime());
        alert(cTime+'||'+courseNow)
       // setNowPlus(nowWithAddedHours)
        //nowPlus<now? alert(now+'|| plus= '+nowPlus):alert('no');
    }

    //show methods of payment paypalFunc
    const vodafoneFunc=()=>{
        vodafone.current.style.display='block';
        //paypal.current.style.display='none';
        bank.current.style.display='none';
    }
    /*const paypalFunc=()=>{
        paypal.current.style.display='block';
        vodafone.current.style.display='none';bank.current.style.display='none';
    }*/
    const bankFunc=()=>{
        bank.current.style.display='block';
        vodafone.current.style.display='none';//paypal.current.style.display='none';
    }
    //send payment file
    const paymentFunc=async(e)=>{
        e.preventDefault();
        //store files
        const fv=fileVoda.current.files[0]
        const fb=fileBank.current.files[0]
        if(fv===undefined && fb===undefined){
            setWrongFile('ارفق ملف');
        }else{
            const sentFile=fv!==undefined && fb===undefined?fv:fb;
            if(sentFile.type!=='image/jpg'&&sentFile.type!=='image/jpeg'&&sentFile.type!=='image/png'&&sentFile.type!=='application/pdf'){
                setWrongFile('نوع الملف غير مناسب');
            }else if(sentFile.size>2097152){
                setWrongFile('حجم الملف كبير');
            }else{
                setWrongFile(null);
                const method=fv!==undefined?'vodafone':'bank';
                const student_Id=loginData.id; const student_name=loginData.name; const course_Id=course.id;
                const postData={sentFile,method,student_Id,student_name,course_Id}
                const res=await httpFile.post('/receive-payment',postData);
                setPayResult(res.data.data);
            }  
         }      
    }
    
    //
    const showSubscribe=()=>{
        subscribeDiv.current.style.display='block';
    }
    
    
   //set course id
   useEffect(() => {
        if(id && id>0){
            setCourseId(id)
        }else{
            navigate('/');
        }
        //get time now
        getTime()
   }, [id,navigate])

    //get course details
    const getCourseDetails=async(courseId)=>{
       //get course data from backend
       const res=await http.get(`/get-course/${courseId}`);
       setCourse(res.data.course)
    }

    //get result from helper
    const receivedResult=(result,addToNow,courseDate)=>{
        setSubscribe(result)
       // console.log(result)
        setNowPlus(addToNow)
        setCourseTime(courseDate)
    }

    //on click, start streaming
    const stream=(zoomLink)=>{
        window.location.href=`${zoomLink}`;
    }

    //start the function to get the course
   useEffect(() => {
        if(courseId){
            getCourseDetails(courseId)
        }   
   }, [courseId])

   // user isn't in database (was deleted) */
   useEffect(() => {
      subscribe&&subscribe==='no user'&& navigate('/')
   }, [subscribe])

   

    return (
        <div className='min-h-70 my-5 container-fluid fs-6'>
            {!course 
                ? <div className='w-fit mx-auto mt-4'><p className='spinner-border'></p></div>
                :
                <div>
                    <div className='border pic-container w-50 mx-auto my-3'>
                       pic 
                    </div>
                    <div className='row justify-content-between w-75 mx-auto my-3 '>
                        <div className='my-4 fs-4 fw-bold'>
                            <div  className='w-fit mx-auto'>{course.name}</div>
                        </div>
                        <div className='col-4'>
                             <div className=''><i className='bi bi-book ms-1 text-primary'></i><span>{course.subject} </span></div>
                        </div>
                        <div  className='col-4'>
                            <div className=''><i className='bi bi-calendar ms-1 text-primary'></i><span>{course.day=='1'? 'السبت والثلاثاء' : course.day=='2' ? 'الأحد والأربعاء' : 'الاثنين والخميس'} </span></div>
                        </div>
                        <div  className='col-4'>
                           {fetchedGrades&& fetchedGrades.map((g)=>(
                               g.id==course.grade && 
                            <div className=''><i className='bi bi-mortarboard ms-1 text-primary'></i><span>{g.name} </span></div>
                           ))}
                        </div>
                        <div className='col-4'>
                            <div className=''><i className='bi bi-clock ms-1 text-primary'></i><span>{course.time} </span></div>
                        </div>
                        <div className='col-4 '>
                            <div className=''><i className='bi bi-person-circle ms-1 text-primary'></i><span>المعلم: <UserNameHelper userId={course.teacher}/> </span></div>
                        </div>
                        <div className='col-4'>
                            <div className=''><i className='bi bi-sun ms-1 text-primary'></i><span>نوع الدرس:{course.status=='0'? 'مباشر' :'مسجل'} </span></div>
                        </div>
                        <div className='col-4'>
                            <div className=''><i className='bi bi-coin ms-1 text-primary'></i><span>قيمة الاشتراك:{course.price} </span></div>
                        </div>
                    </div>

                    <hr className='hr my-4'/>

                    {/** course details */}
                    <div className='mb-5'>
                        <p className='fw-bold'>تفاصيل الدرس</p>
                        <p>{course.course_desc}</p>
                    </div>
                    
                    {/** only if user is logged in */}
                    {loginData&&loginData.id>0 
                       ? /** if logged in */
                          loginData.role=='s'
                             /** if a student logged in  */
                            ?<div className='min-h-40 '> 
                                  {/**check if student is subscribed to this course */}
                                <CheckSubscription userId={loginData.id} courseId={course.id} courseTime={course.time} subscriptionResult={receivedResult} />
                            
                                {/* if student isn't subscribed to this course */}
                                {subscribe==='no subscription' &&
                                    <>
                                        <div className='w-fit mx-auto'>
                                            <button onClick={showSubscribe} className='border-0 py-2 px-3 rounded-2 bg-primary fw-bold'>اشترك</button>
                                        </div>
                                        <div ref={subscribeDiv} className='bg-success text-white p-3 my-3 w-50 w-fit mx-auto rounded-2 none'>
                                            <p className='text-dark fw-bold'>اختر وسيلة دفع</p>
                                            {/*<div className='mb-4'><input className='radio' onClick={vodafoneFunc} name='rad' ref={vodafoneRadio} type='radio' /> <span className='text-dark'> فودافون كاش</span></div>
                                            <div className='none' ref={vodafone}>
                                                <p>ادفع قيمة الاشتراك من خلال فودافون كاش على رقم  01020121073؛ ثم ارفق ايصال الدفع هنا</p>
                                                <form onSubmit={(e)=>{paymentFunc(e,'voda')}}> 
                                                    <input type='file' className='mb-1' ref={fileVoda} />  
                                                    <button className='d-block mb-5 button'>ok</button> 
                                                </form>
                                            </div>
                                            {/* <div className='mb-3'><input className='radio' onClick={paypalFunc} name='rad' ref={paypalRadio}  type='radio' /> <span className='text-dark'>باي بال</span></div>
                                            <p className='none' ref={paypal}>ادفع قيمة الاشتراك في باي بال على (hgq1100@yahoo.com)</p>
                                            */}
                                            {/*<div className='mb-4'><input className='radio' onClick={bankFunc} name='rad' ref={bankRadio} type='radio' /> <span className='text-dark'>حوالة بنكية</span></div>
                                            <div className='none' ref={bank}>
                                                <p>ارسل قيمة الاشتراك الى حساب 44333 بنك ابو ظبي الاسلامي؛ بنك ابو ظبي الاسلامي؛ ثم ارفق ايصال الدفع هنا </p>
                                               <form onSubmit={(e)=>{paymentFunc(e,'bank')}}> <input type='file' className='mb-1' ref={fileBank} /> <button className='d-block mb-5 button'>ok</button> </form>
                                            </div>*/}
                                            <div className='mb-4'><input className='radio' onClick={vodafoneFunc} name='rad' ref={vodafoneRadio} type='radio' /> <span className='text-dark'> فودافون كاش</span></div>
                                            <div className='mb-4'><input className='radio' onClick={bankFunc} name='rad' ref={bankRadio} type='radio' /> <span className='text-dark'>حوالة بنكية</span></div>
                                            <div className='mb-2' >
                                                <form onSubmit={(e)=>{paymentFunc(e)}}> 
                                                    <div className='none' ref={vodafone}> 
                                                        <p>ادفع قيمة الاشتراك من خلال فودافون كاش على رقم  01020121073؛ ثم ارفق ايصال الدفع هنا</p>
                                                        <input type='file' className='mb-1 text-dark' ref={fileVoda} /> 
                                                    </div> 
                                                    <div className='none' ref={bank}> 
                                                        <p>ارسل قيمة الاشتراك الى حساب 44333 بنك ابو ظبي الاسلامي؛ بنك ابو ظبي الاسلامي؛ ثم ارفق ايصال الدفع هنا </p>
                                                        <input type='file' className='mb-1 text-dark' ref={fileBank} /> 
                                                    </div>
                                                    <button className='d-block button'>ok</button> 
                                                </form>
                                            </div>
                                            {/* <div className='mb-3'><input className='radio' onClick={paypalFunc} name='rad' ref={paypalRadio}  type='radio' /> <span className='text-dark'>باي بال</span></div>
                                            <p className='none' ref={paypal}>ادفع قيمة الاشتراك في باي بال على (hgq1100@yahoo.com)</p>
                                            */}
                                            
                                            {wrongFile&&<p className='text-danger'>{wrongFile}</p> }
                                            {payResult&&<p className=''>{payResult}</p>}
                                        </div>
                                    </>
                                }

                                {/* if student is subscribed to this course */}
                                { subscribe==='subscribed' &&                            
                                    <div className='w-fit mx-auto'>
                                        <p><i className='bi bi-check-circle-fill text-success'></i> أنت مشترك في هذا الدرس</p>
                                        {
                                        now>=courseTime && now<nowPlus /*&&(course.day==1&&(today==2||today==6) || course.day==2&&(today==3||today==7) || course.day==3&&(today==1||today==4)) */
                                        ? <a onClick={()=>{stream(course.zoomLink)}} className='cursor w-fit mx-auto d-block bg-success py-2 px-4 text-white text-decoration-none rounded-2 fw-bold' target='_blank' rel='noopener noreferer '> اذهب للدرس</a>
                                        : <span  className='w-fit mx-auto d-block bg-danger py-2 px-4 text-white text-decoration-none rounded-2 fw-bold'> سيبدأ الدرس قريبا</span>                                
                                        }
                                        <button onClick={()=>check(course.time)}>check</button>
                                        {'plus '+nowPlus} --{'now '+now}--{'course '+courseTime}
                                    </div>
                                }
                             </div>
                            
                             /** if a teacher logged in  */
                            :<div className='py-4 '></div>
                             

                        : /** if not logged in */
                      <div className='min-h-40 '>
                          <div className=' w-fit mx-auto'>
                             <a href='/login' className='border-0 py-2 px-3 rounded-2 bg-primary text-white fw-bold'>للاشتراك قم بتسجيل الدخول</a>
                          </div>
                      </div>
                    }
                    
                </div>
            }
        </div>
    )
}

export default Course
