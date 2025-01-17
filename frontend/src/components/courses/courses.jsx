import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserProvider';
import UserNameHelper from '../helpers/userNameHelper';

import './courses.css'

const Courses = () => {
    //get data from provider
    const {fetchCourses,fetchedGrades} = useContext(UserContext)
   
    return (
        <div className='min-h-70 my-5'>
           {/* one teacher courses */ }
           {!fetchCourses 
                    ?<div className='w-fit my-5 mx-auto'><p className='spinner-border mx-auto'></p></div>
                    : 
                    <>
                    <p className='fw-bold mx-2 w-fit fs-5'>الدروس </p>
                    <section className='container-fluid mt-2 fs-5'>
                        <div className='row justify-content-evenly mt-5'>
                                {Array.isArray(fetchCourses) && fetchCourses.length>0 
                                    ? fetchCourses.map((e)=>(
                                        /** repeated div */
                                        <div className='col-6 border border-1 py-3 bg-light rounded-2'>
                                                 {/** pic div */}
                                                <div className='pic-cont'>
                                                    <img className='mx-auto rounded-circle w-25 d-block mh-100' src={'http://127.0.0.1:8000/storage/images/'+e.pic}/>
                                                </div>
                                                <Link to={'/course/?c='+e.id} className='d-block mx-auto w-fit my-3 fw-bold'>{e.name}</Link>
                                                {/** subject & grade div */}
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'>
                                                        <i className='bi bi-book ms-1 color-1'></i><span>{e.subject}</span>
                                                    </div >
                                                    {fetchedGrades && fetchedGrades.map((g)=>( g.id==e.grade && 
                                                    <div className='w-50'>
                                                        <i className='bi bi-mortarboard ms-1 color-1'></i><span>{g.name}</span>
                                                    </div> ))}
                                                </div>
                                                {/** day & time div */}
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><i className='bi bi-calendar ms-1 color-1'></i><span> {e.day=='1'? 'السبت والثلاثاء' : e.day=='2' ? 'الأحد والأربعاء' : 'الاثنين والخميس'}</span></div>
                                                    <div className='w-50'><i className='bi bi-clock ms-1 color-1'></i><span>{e.time}</span></div>
                                                </div>
                                                {/** teacher & status div */}
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><i className='bi bi-coin ms-1 color-1'></i><span> السعر:{e.price}</span></div>
                                                    <div className='w-50'><i className='bi bi-sun ms-1 color-1'></i><span>نوع الدرس:{e.status=='0'? 'مباشر' :'مسجل'}</span></div>
                                                </div>
                                                {/** teacher & status div */}
                                                <div className='d-flex justify-content-between'>
                                                    <div className='w-50'><i className='bi bi-person-circle ms-1 color-1'></i><span>المعلم: <UserNameHelper userId={e.teacher}/> </span></div>
                                                </div>
                                        </div>
                                    ))
                                    :<span>لم يتم اضافة دروس بعد</span>
                                }
                         </div>
                    </section> 
                    </>
                }
        </div>
    )
}

export default Courses
