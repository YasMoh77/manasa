import React,{useState, useRef} from 'react'
import { http } from '../axios/axiosGlobal'
import CountCourses from '../helpers/countCourses'
import FormatDate from '../helpers/formatDate'
import './dashboard.css'

const Search = () => {
    //states
    const [search, setSearch] = useState(null)
    const [wrong, setWrong] = useState(null)
    const [load, setLoad] = useState(null)
    const [found, setFound] = useState(null)

    //refs
    const searchInput = useRef(null)
    const stu = useRef('stu')
    const tea = useRef('tea')
    const cou = useRef('cou')

    //search func
    const searchFunc=async(searchValue)=>{
        //
        const radioVal=stu.current.checked?'stu':(tea.current.checked?'tea':(cou.current.checked?'cou':''));
        if(radioVal===''){
            setWrong('اختر تلميذ أو معلم أو درس')
        }else if(searchValue===''){
            setWrong('ادخل كلمة بحث')
        }else{
        //start spinner
        setLoad(true)
        //send api
        const res=await http.get(`search-student/${searchValue}/${radioVal}`);
        setLoad(null)
        setSearch(res.data.search);
        setFound(res.data.found)
        setWrong(null);
       }
     }

    return (
        <div>
            <p>بحث </p>
            <form>
               <div className='d-flex justify-content-between w-25 mb-2'>
                    <div> <input id='stu' type='radio' name='radio' ref={stu} /> <label for='stu'>تلميذ</label></div>
                    <div> <input id='tea' type='radio' name='radio' ref={tea} /> <label for='tea'>معلم</label></div>
                    <div> <input id='cou' type='radio' name='radio' ref={cou} /> <label for='cou'>درس</label></div>
               </div>
                <input className='w-100 rounded-2 border-1 px-2 py-2' onKeyUp={(e)=>{searchFunc(e.target.value)}} ref={searchInput} type='text' placeholder='بحث بالاسم أو ID أو التليفون' />
            </form>
            {wrong
            ?<p>{wrong}</p>
            :load
                ?<div className='w-fit my-2 mx-auto'><p className='spinner-border mx-auto'></p></div>
                :search&&Array.isArray(search)&&search.length>0
                    
                    ?found==='stu' /*found search results for a student*/
                        ?<div  className=''> <p className='mt-3 fw-bold'>نتائج البحث:</p>
                            <table className='w-100 text-center mb-4 bg-light'> 
                                <thead>
                                    <tr className='fw-bold text-white bg-dark'>
                                        <td>ID </td>
                                        <td>اسم التلميذ</td>
                                        <td> التليفون</td>
                                        <td>المرحلة </td>
                                        <td>دروس مشترك فيها</td>
                                        <td>تاريخ التسجيل</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search.map((e)=>(
                                    <tr>
                                        <td>{e.id}</td>
                                        <td className='nameCss'>{e.name}</td>
                                        <td>{e.phone}</td>
                                        <td>{e.stage==1?'ابتدائي':(e.stage==2?'اعدادي':'ثانوي')}</td>
                                        <td><CountCourses id={e.id} user={e.role} /></td>
                                        <td dir='ltr'>{e.registry_date}</td>
                                    </tr>
                                     ))}
                                </tbody>
                            </table>
                            </div>
                        :found==='tea' /*found search results for a teacher*/
                        ?<div><p className='mt-3 fw-bold'>نتائج البحث:</p>
                            <table className='w-100 text-center mb-4 bg-light'> 
                                <thead>
                                    <tr className='fw-bold text-white bg-dark'>
                                        <td>ID </td>
                                        <td>اسم المعلم</td>
                                        <td>المادة </td>
                                        <td>المرحلة </td>
                                        <td> دروس مضافة </td>
                                        <td> التليفون</td>
                                        <td>تاريخ التسجيل</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search.map((e)=>(
                                    <tr>
                                        <td>{e.id}</td>
                                        <td className='nameCss'>{e.name}</td>
                                        <td>{e.subject}</td>
                                        <td>{e.stage==1?'ابتدائي':(e.stage==2?'اعدادي':'ثانوي')}</td>
                                        <td><CountCourses id={e.id} user={e.role} /></td>
                                        <td>{e.phone}</td>
                                        <td dir='ltr'>{e.registry_date}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                         /*found search results for a course*/
                        :<div><p className='mt-3 fw-bold'>نتائج البحث:</p>
                            <table className='w-100 text-center mb-4 bg-light'> 
                                <thead>
                                    <tr className='fw-bold text-white bg-dark'>
                                        <td>ID </td>
                                        <td>اسم الدورة</td>
                                        <td> الصف</td>
                                        <td>المادة </td>
                                        <td> اليوم</td>
                                        <td> الوقت</td>
                                        <td> السعر</td>
                                        <td> الحالة</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {search.map((e)=>(
                                    <tr>
                                        <td>{e.id}</td>
                                        <td className='nameCss'>{e.name}</td>
                                        <td>{e.grade}</td>
                                        <td>{e.subject}</td>
                                        <td>{e.day==1?'السبت والثلاثاء':(e.day==2?'الاحد والاربعاء':'الاثنين والخميس')}</td>
                                        <td dir='ltr'><FormatDate time={e.time} /></td>
                                        <td>{e.price+'ج.م'}</td>
                                        <td>{e.status==0?'أونلاين':'مسجل'}</td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>  
                        /* search results are null */              
                :!search
                    ?<p> </p>
                    :<p>لا توجد نتائج  </p>
                    
             }
        </div>
    )
}

export default Search
