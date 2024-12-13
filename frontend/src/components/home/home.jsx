import { useContext,useState,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../user/UserProvider';
import exam from '../img/exam2.png'
import './home.css'
//import { http } from '../axios/axiosGlobal';


const Home = () => {
    //get data from provider
    const {fetchedGrades,fetchSomeCourses,fetchSomeTeachers,mainPic,mainPic2} = useContext(UserContext)
    //states
    /*const [oneTeacher, setOneTeacher] = useState(null)*/
     //show one teacher
     /*const showOneTeacher=async(id)=>{
      //  alert('ol='+id)
  // Navigate('/teacher')
        //get data from backend
        //const res=await http.post(`/one-teacher/${id}`);
       // console.log(res.data)
        //setOneTeacher(res.data)
     }*/


    return (
        <main className>
            {/* top div with photo */}
            <div className='top-home d-flex bg-info'>
                <div dir='rtl' className='h-100 w-50'>
                    <div className='w-fit mx-auto mt-5'>
                        <h1 className='mt-3 mb-5'>مع منصتي </h1>
                        <h1>وفر وقتك</h1>
                        <h1>اختر معلمك </h1>
                        <h1>اضبط ميزانيتك </h1>
                    </div>
                </div>

                <div className='w-50'>
                    {!mainPic 
                    ?<div className='main-pic-spinner-cont w-fit mx-auto align-content-center '><p className='spinner-border mx-auto'></p></div>
                    :<img className='w-100 h-100' src={mainPic} />
                    }
                </div>
            </div>

            
             {/* bottom 1 */}
             <div className='bg-light pt-3 pb-5'>
                 <div className='mar-t mar-b'>
                        <div className='w-fit mx-auto vision'>
                            <i className='bi bi-brightness-alt-high font-x mx-auto w-fit d-block color-1'></i>
                            <h2 className='mx-auto w-fit mb-3 text-secondary'>رؤيتنا</h2>
                            <p className='fs-5'>تقديم تعليم الكتروني جيد على ايدي متخصصين ومناسب لدخل الاسرة</p>
                        </div>

                        <div className='w-fit mx-auto vision'>
                            <i className='bi bi-briefcase font-x mx-auto w-fit d-block color-1'></i>
                            <h2 className='mx-auto w-fit mb-3 text-secondary'>معلمونا</h2>
                            <p className='fs-5'>تقديم تعليم الكتروني جيد على ايدي متخصصين ومناسب لدخل الاسرة</p>
                        </div>

                        <div className='w-fit mx-auto'>
                            <i className='bi bi-book font-x mx-auto w-fit d-block color-1'></i>
                            <h2 className='mx-auto w-fit mb-3 text-secondary'>دروسنا</h2>
                            <p className='fs-5'>تغطي دروس منصتي جميع المواد الاساسية بدءاً من الصف الاول grade 1  حتى الصف الثالث الثانوي grade 12</p>
                        </div>
                </div>
            </div>
             
             {/* bottom 2 */}
            <div className='container-fluid py-5 py-xl-0'>
                <h1 className='w-fit mx-auto mar-t mar-b'>فى منصتي نسعى دائما لنقدم لك الافضل</h1>
                <div className='row mx-0 img-url-cont mar-b'>
                    <div className='col-12 col-md-4 '>
                    {!mainPic2 
                    ?<div className='mt-md-3 main-pic-spinner-cont w-fit mx-auto align-content-end '><p className='spinner-border mx-auto'></p></div>
                    :<img className='mt-md-4 w-100 mx-auto' src={mainPic2} />
                    }
                    </div>
                    <div className='col-12 col-md-8'>
                        <ul className='h-75 mt-5 p-0 p-md-2 list-unstyled fs-5'>
                            <li className='mb-3'>
                                <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                                <span> ادرس بأمان وانت في بيتك</span>
                            </li>
                            <li className='mb-3'>
                                <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                                <span></span>يوفر موقعنا تجربة ممتعه سهلة الاستخدام
                            </li>
                            <li className='mb-3'>
                                <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                                <span></span> اسعارنا غير مبالغ فيها
                            </li>
                            <li className='mb-3'>
                                <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                                <span>نتيح وسائل دفع متعددة</span>
                            </li>
                            <li className='mb-3'>
                            <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                            <span> نرحب بالاراء ونتعامل معها بجدية</span>
                            </li>
                            <li className='mb-3'>
                                <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                                <span> نتواصل مع ولي الامر بالطريقة التي </span>
                            </li>
                            <li className=''>
                                <i className='bi bi-check-circle-fill ms-3 color-1'></i>
                                <span> نبتكر دائما من اجل الوصول للافضل</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* bottom 3 */}
            <div className=' bg-light py-5 '>
                <div className='container mx-auto '>
                    <h1 className='mx-auto w-fit mar-t mar-b '>ما يميز منصتي</h1>
                    <div className='row mx-0 justify-content-between '>

                        <div className='col-12 col-md-4 row mx-0  justify-content-between mb-5'>
                            <div className='col-2'><i className='bi bi-person-hearts color-1 fs-3'></i></div>
                            <div className='col-10'>
                                <h3 className='text-secondary'>معلمون أكفاء</h3>
                                <p className='fs-5'>نحرص على التعاون مع افضل المعلمين. يخضع المعلمون فى منصتي –قبل الاستعانه بهم – للاختبار من قبل متخصصين</p>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 row mx-0  justify-content-between mb-5'>
                            <div className='col-2'><i className='bi bi-chat-dots-fill color-1 fs-3'></i></div>
                            <div className='col-10'>
                                <h3 className='text-secondary'>التواصل والمتابعه</h3>
                                <p className='fs-5'>نتواصل مع أولياء الامور بانتظام لمعرفة آرائهم واقتراحاتهم</p>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 row mx-0  justify-content-between mb-5'>
                            <div className='col-2'><i className='bi bi-wallet-fill color-1 fs-3'></i></div>
                            <div className='col-10'>
                                <h3 className='text-secondary'>اسعار مناسبه</h3>
                                <p className='fs-5'> خطة اسعار معقولة في متناول الايدي تناسب جميع الأسر؛ يمكنك الحجز المبكر للاستفادة من التخفيض</p>
                            </div>
                        </div>
                        
                        <div className='col-12 col-md-4 row mx-0  justify-content-between mb-5'>
                            <div className='col-2'><i className='bi bi-check-circle-fill color-1 fs-3'></i></div>
                            <div className='col-10'>
                                <h3 className='text-secondary'>حرية الاختيار</h3>
                                <p className='fs-5'>للطالب الحرية في اختيار المعلم  الذي يريده</p>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 row mx-0  justify-content-between mb-5'>
                            <div className='col-2'><i className='bi bi-pen-fill color-1 fs-3'></i></div>
                            <div className='col-10'>
                                <h3 className='text-secondary'>واجبات  دورية</h3>
                                <p className='fs-5'>اسئلة واجب بعد كل درس</p>
                            </div>
                        </div>

                        <div className='col-12 col-md-4 row mx-0  justify-content-between mb-5'>
                            <div className='col-2'><i className='bi bi-question-circle-fill color-1 fs-3'></i></div>
                            <div className='col-10'>
                                <h3 className='text-secondary'>بنوك اسئلة</h3>
                                <p className='fs-5'>بنوك اسئلة لكثير من المواد</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            
            {/* bottom 4 */}
            <div className='py-5 '>
                <div className='container-fluid mx-auto mar-b'>
                    {/* teachers */}
                    <h1 className='mx-auto w-fit mar-t mar-b '>المعلمون</h1>
                    <div className='row mx-0 justify-content-evenly '>
                            {fetchSomeTeachers && (
                                fetchSomeTeachers.map((e,index)=>(
                                    <div className='col-12 col-md-3  mx-0  mb-5 bg-red rounded-2'>
                                        <div className='w-fit mx-auto'>
                                            <i className='bi bi-person-circle color-1 fs-1 '></i>
                                        </div>
                                        <div className=''> 
                                            <h5 name={e.id}  className='text-secondary w-fit mx-auto'><Link to={'/teacher/?t='+e.id}>{e.name}</Link></h5>
                                            <p className='fs-6 mx-auto w-fit fw-bold'>{e.subject} </p>
                                            <p className='fs-6 mx-auto w-fit'>{e.stage=='1'? ' المرحلة الابتدائية' : e.stage=='2' ? ' المرحلة الثانوية' : ' المرحلة الاعدادية'} </p>
                                            <p className=' mx-auto w-fit'><span>4.8</span> <i className='bi bi-star color-1'></i> </p>
                                        </div>
                                    </div>
                                ))
                            )}
                    </div>
                    <h4 dir='ltr' className='ms-4'> <Link to='/teachers'>المزيد</Link> <i className='bi bi-arrow-left'></i></h4>

                    {/* courses */}
                    <h1 className='mx-auto w-fit mar-t mar-b '>الدروس</h1>
                    <div className='row mx-0 justify-content-evenly '>
                            {fetchSomeCourses && (
                                        fetchSomeCourses.map((e)=>(
                                            <div className='col-12 col-md-4  mx-0  mb-5 bg-blue rounded-2'>
                                                <div className='w-fit mx-auto mb-3'>
                                                    <i className='bi bi-person-circle color-1 fs-1 '></i>
                                                </div>
                                                <h5 className='text-secondary w-fit mx-auto'><Link to={'/course/?c='+e.id}>{e.name}</Link></h5>
                                                <div className='my-4'>
                                                    <div className='d-flex justify-content-between '>
                                                        <div><i className='bi bi-book ms-1 color-1'></i><span>{e.subject}</span></div>
                                                        {fetchedGrades && fetchedGrades.map((g)=>( g.id==e.grade && <div><i className='bi bi-mortarboard ms-1 color-1'></i><span>{g.name}</span></div> ))}
                                                    </div>
                                                    <div className='d-flex justify-content-between'>
                                                        <div><i className='bi bi-calendar color-1 '></i> <span>{e.day=='1'? 'السبت والثلاثاء' : e.day=='2' ? 'الأحد والأربعاء' : 'الاثنين والخميس'}</span></div>
                                                        <div><i className='bi bi-clock color-1 me-2'></i> <span>{e.time}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                )}
                    </div>
                    <h4 dir='ltr' className='ms-4'> <a><Link to='/courses'>المزيد</Link></a> <i className='bi bi-arrow-left'></i></h4>
                </div>
            </div>

            {/* bottom 5 */}
            <div className='bg-light py-5 '>
                <div className='container mx-auto '>
                    {/* contact us */}
                    <h1 className='mx-auto w-fit mar-t mar-b '>تواصل معنا</h1>
                    <div className='row mx-0 justify-content-between mar-b'>

                        <div className='col-12 col-md-3 p-2'>
                            <i className='bi bi-telephone-fill mx-auto w-fit d-block color-1 fs-5'></i>
                            <h5 className='text-secondary mx-auto w-fit'>01020121073</h5>
                        </div>

                        <div className='col-12 col-md-3 p-2'>
                        <i className='bi bi-whatsapp mx-auto w-fit d-block text-success fs-5'></i>
                            <h5 className='text-secondary mx-auto w-fit'>01020121073</h5>
                        </div>

                        <div className='col-12 col-md-3 p-2 '>
                        <i className='bi bi-envelope mx-auto w-fit d-block color-1 fs-5'></i>
                            <h5 className='text-secondary mx-auto w-fit'>hgq1100@yahoo.com</h5>
                        </div>


                    </div>
                </div>
            </div>


        </main>


    )
}

export default Home
