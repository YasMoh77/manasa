import React, {useContext,useEffect,useState } from 'react'
import { useNavigate } from 'react-router'
import { useSearchParams,Link } from 'react-router-dom'
import { UserContext } from '../user/UserProvider';
import { http } from '../axios/axiosGlobal';
import './teacher.css'


const Teacher = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const query=searchParams.get('t');
    const [id, setId] = useState(query||1)
    const [showOnlyOne, setShowOnlyOne] = useState(false)
    const navigate=useNavigate()
    //get data from provider
   const {fetchedGrades} = useContext(UserContext)
   
    //states
    const [oneTeacherData, setOneTeacherData] = useState(null)
    const [oneTeacherCourses, setOneTeacherCourses] = useState(null)
    //const [showPage, setShowPage] = useState(false)

     //show one teacher data
     const showOneTeacherData=async()=>{
        //get data from backend
        const res=await http.post(`/one-teacher-data/${id}`);
        setOneTeacherData(res.data.teacher)
     }

     //show one teacher courses
     const showOneTeacherCourses=async()=>{
        //get data from backend
        const res=await http.post(`/one-teacher-courses/${id}`);
        setOneTeacherCourses(res.data.courses)
     }

     useEffect(() => {
        showOneTeacherData()
        showOneTeacherCourses()
        if(query){setShowOnlyOne(true); }
        //check if id<1
        if(id<1){
            navigate('/home')
        }
      //  if( oneTeacherData&&oneTeacherCourses){setShowPage(true);}else{setShowPage(false);}
        
        /*if(searchParams.has('t','all')){ //id theres query=='?t=all'
            setShowMany(true); navigate('/teacher/?t=all');showOneTeacherData()
            setShowOnlyOne(false)
        }else{
            setShowMany(false)
            setShowOnlyOne(true); navigate('/teacher/?t='+id)
        }*/

     }, [id]) //id
    //const imgUrl='http://localhost:3000/img/logo.png';

    
    return (
        
        <div>
           {/* one teacher data */} 
         {!showOnlyOne ? navigate('/') : 
            <div className='main-cont-teacher fs-5'>
                {!oneTeacherData ? <div className='w-fit my-5 mx-auto'><p className='spinner-border mx-auto '></p></div> :
                 <>
                    <section className='my-3'>
                            {oneTeacherData.pic
                            ?<div className='pic-cont w-25 mx-auto'><img className='teacher-page-img mx-auto d-block rounded-circle' src={'http://127.0.0.1:8000/storage/images/'+oneTeacherData.pic}/></div>
                            :<div className='w-25 mx-auto'><i className='bi bi-person-circle user-icon d-block w-fit mx-auto color-1'></i></div>
                            }
                        <div className='fw-bold w-fit my-3 mx-auto'>
                            <p className='mx-auto mb-0 w-fit'>{oneTeacherData.name}</p>
                            <p className='mx-auto mb-0 w-fit'>{oneTeacherData.subject}</p>
                            <p className='mx-auto w-fit'>{oneTeacherData.stage=='1'? ' المرحلة الابتدائية' : oneTeacherData.stage=='2' ? ' المرحلة الثانوية' : ' المرحلة الاعدادية'} </p>
                        </div>
                    </section>
                

                    <hr className='w-75 mx-auto'/>

                    <section className='container-fluid mt-3 mb-5'>
                        <p className='fw-bold'> نبذه عني </p>
                        <p className='me-5'>{oneTeacherData.description}</p>
                    </section>

                    <hr className='w-75 mx-auto'/>
                 </>
                }
                
                 {/* one teacher courses */ }
                {!oneTeacherCourses 
                    ?<div className='w-fit my-5 mx-auto'><p className='spinner-border mx-auto'></p></div>
                    : 
                    <section className='container-fluid mt-3 mb-5'>
                        <p className='fw-bold'>الدروس </p>
                        <div className='row justify-content-evenly'>
                                {Array.isArray(oneTeacherCourses) && oneTeacherCourses.length>0 
                                    ? oneTeacherCourses.map((e)=>(
                                        <div className='col-5 border border-1 py-2 bg-light rounded-2'>
                                                <Link className='d-block mx-auto w-fit my-3' to={'/course/?c='+e.id}>{e.name}</Link>
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
                                    :<span>لم يتم اضافة دروس بعد</span>
                                }
                         </div>
                    </section>                                 
                }
                   

            </div>
          }
         
        </div>
    )
}

export default Teacher
