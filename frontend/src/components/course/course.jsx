import React, {useEffect,useState } from 'react'
import { UserContext } from '../user/UserProvider';
import { useContext } from 'react';
import { useNavigate } from 'react-router'
import UserNameHelper from '../helpers/userNameHelper';
import CheckSubscription from '../helpers/checkSubscription';
import { http } from '../axios/axiosGlobal';
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

   //kk

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
                             <div className=''><i className='bi bi-clock ms-1 text-primary'></i><span>{course.subject} </span></div>
                        </div>
                        <div  className='col-4'>
                            <div className=''><i className='bi bi-clock ms-1 text-primary'></i><span>{course.day=='1'? 'السبت والثلاثاء' : course.day=='2' ? 'الأحد والأربعاء' : 'الاثنين والخميس'} </span></div>
                        </div>
                        <div  className='col-4'>
                           {fetchedGrades&& fetchedGrades.map((g)=>(
                               g.id==course.grade && 
                            <div className=''><i className='bi bi-clock ms-1 text-primary'></i><span>{g.name} </span></div>
                           ))}
                        </div>
                        <div className='col-4'>
                            <div className=''><i className='bi bi-clock ms-1 text-primary'></i><span>{course.time} </span></div>
                        </div>
                        <div className='col-4'>
                            <div className=''><i className='bi bi-person ms-1 text-primary'></i><span>المعلم: <UserNameHelper userId={course.teacher}/> </span></div>
                        </div>
                        <div className='col-4'>
                            <div className=''><i className='bi bi-calendar ms-1 text-primary'></i><span>نوع الدرس:{course.status=='0'? 'مباشر' :'مسجل'} </span></div>
                        </div>
                    </div>

                    <hr className='hr my-5'/>
                    
                    <div className='min-h-40'>
                        <CheckSubscription userId={course.teacher} courseId={course.id} courseTime={course.time} subscriptionResult={receivedResult} />
                        {subscribe==='no subscription'&&
                            <form>
                                <button>subscribe</button>
                            </form>
                        }
                        
                        {subscribe==='subscribed'&&
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
                </div>
            }
        </div>
    )
}

export default Course
