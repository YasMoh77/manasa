import React, {useContext } from 'react'
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserProvider';
import './teachers.css'

const Teachers = () => {
    //get data from provider
    const {fetchTeachers} = useContext(UserContext)
    return (
        <div className='height-full'>
            {/* all teachers */ }
            {!fetchTeachers ? <div className='w-fit mx-auto mt-5'><span className='spinner-border'></span></div> : 
             <div className='container-fluid my-5 fs-5'>
                 <p className='mb-5 mx-auto w-fit fs-4 fw-bold'>المعلمون</p>
                 <div className='row mx-0 justify-content-between'>
                    {fetchTeachers && fetchTeachers.map((e)=>(
                        <div className='teachers-col col-12 col-md-4 mb-5 bg-red rounded-2'>
                            
                                {e.pic
                                ?<div className='pic-cont-teachers my-3'><img className='mx-auto rounded-circle w-25 d-block mh-100' src={'http://127.0.0.1:8000/storage/images/'+e.pic}/></div>
                                :<div className='pic-cont-teachers my-3'><i className='bi bi-person-circle w-fit mx-auto d-block color-1 fs-1'></i></div>
                                }
                           
                            <div className=''> 
                                <h5 name={e.id}  className='text-secondary w-fit mx-auto'><Link to={'/teacher/?t='+e.id}>{e.name}</Link></h5>
                                <p className='mx-auto w-fit mb-0 fw-bold'>{e.subject} </p>
                                <p className='mx-auto w-fit'>{e.stage=='1'? ' المرحلة الابتدائية' : e.stage=='2' ? ' المرحلة الثانوية' : ' المرحلة الاعدادية'} </p>
                                <p className='mx-auto w-fit'><span>4.8</span> <i className='bi bi-star color-1'></i> </p>
                            </div>
                        </div>
                    ))}
                </div>
             </div> 
             }
            
        </div>
    )
}

export default Teachers
