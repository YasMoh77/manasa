import React,{useState,useEffect,useRef,useCallback} from 'react'
import { http } from '../axios/axiosGlobal'
import StudentCourseSubscription from '../helpers/studentCourseSubscription'
import { useNavigate } from 'react-router'
import './dashboard.css'

const Payments = () => {
   const nav=useNavigate()
    //states
    const [receivedPayments, setReceivedPayments] = useState(null)
    const [successPay, setSuccessPay] = useState(null)
    const [studentSubscribed, setStudentSubscribed] = useState(null)
    //refs
    const acceptBtn = useRef(null)
    const parent1 = useRef(null)
    
    //checked then received result 
    const receivedResult=(result)=>{
        setStudentSubscribed(result)
    }
    //get payments
    const getPayments=async()=>{
        const res=await http.get('get-payments');
        setReceivedPayments(res.data.payments)
    }

    //accept student payment to course and make him a course subscriber
    const acceptPayment=async(student_id,course_id)=>{
        //if clicked and confirmed
        if(window.confirm('Accept payment?')){
            //check if this student already subscribed
            const res=await http.get(`check-course-subscription/${student_id}/${course_id}`)
            if(res.data.student==='not found'){
                alert('هذا التلميذ غير موجود بقاعدة البيانات')
            }else if(res.data.student==='مشترك'){
                alert('هذا التلميذ مشترك بالفعل في هذا الدرس')
            }else{
                 //add new payment in pivot table
                const res2=await http.post(`pivot/${student_id}/${course_id}`)
                setSuccessPay(res2.data.success)
                if(res2.data.success==='done'){
                    alert('Done')
                    const addThis=document.createElement('span');
                    addThis.textContent='✔'
                    parent1.current.replaceChild(addThis,acceptBtn.current)

                }
            }
        }
    }

    //cancel student payment to course and return him unsubscriber
    const cancelPayment=async(student_id,course_id)=>{
        //if clicked and confirm 
        if(window.confirm('Cancel and return to unsubscribed?')){
            //remove row in pivot table
            const res=await http.post(`pivot-delete/${student_id}/${course_id}`)
            if(res.data.success==='not found'){
                alert('هذا التلميذ غير موجود بقاعدة البيانات')
            }else{
                alert(res.data.success)
            }
        }
    } 
    

    //effects
    useEffect(() => {
        getPayments();
    }, [])

    return (
        <>
        <p className='fw-bold'>المدفوعات</p>
        <div className='overflow-parent'>
            {!receivedPayments
            ? <div className='w-fit my-2 mx-auto'><p className='spinner-border mx-auto '></p></div>
            : typeof(receivedPayments)==='object'
               ?
                    receivedPayments.map((e)=>(
                        <table className='text-center overflow-child'> 
                            <thead>
                                <tr className='fw-bold'>
                                    <td>اسم التلميذ</td>
                                    <td>Student_ID </td>
                                    <td>Course_ID </td>
                                    <td>الملف</td>
                                    <td>الطريقة</td>
                                    <td>التليفون</td>
                                    <td>أرسل في</td>
                                    <td> الاشتراك</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='nameCss'>{e.name}</td>
                                    <td>{e.student}</td>
                                    <td>{e.course}</td>
                                    <td dir='ltr'>{e.sentFile}</td>
                                    <td>{e.method}</td>
                                    <td>{e.phone}</td>
                                    <td dir='ltr'>{e.when}</td>
                                    <StudentCourseSubscription student_Id={e.student} course_Id={e.course} subscriptionResult={receivedResult} />
                                    <td ref={parent1} className='nameCss'> {!studentSubscribed?<span className='spinner-border small-spinner'></span>:(studentSubscribed==='مشترك'?<><span className='p-1 bg-success text-white cursorNormal'>مفعل</span> <span onClick={()=>{cancelPayment(e.student,e.course)}} className='p-1 bg-danger text-white cursor' >الغاء</span></>:(studentSubscribed==='not found'?<span>User deleted</span>:<span id='spanClick' ref={acceptBtn} onClick={()=>{acceptPayment(e.student,e.course)}} className='p-1 bg-danger text-white cursor'>تفعيل</span>))}</td>
                                </tr>
                            </tbody>
                        </table>
                    ))
                :<p className='border-4'>لا توجد مدفوعات</p>
        }
        </div>
        </>
    )
}

export default Payments
