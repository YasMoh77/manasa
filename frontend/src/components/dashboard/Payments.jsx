import React,{useState,useEffect} from 'react'
import { http } from '../axios/axiosGlobal'

const Payments = () => {
    //states
    const [receivedPayments, setReceivedPayments] = useState(null)
    //get payments
    const getPayments=async()=>{
        const res=await http.get('get-payments');
        setReceivedPayments(res.data.payments)

    }

    useEffect(() => {
        getPayments();
    }, [])

    return (
        <div className=''>
             <p className='fw-bold'>المدفوعات</p>
            {!receivedPayments
            ? <div className='w-fit my-2 mx-auto'><p className='spinner-border mx-auto '></p></div>
            : receivedPayments.map((e)=>(
                <table className='w-100 text-center'> 
                    <thead>
                        <tr>
                            <td>اسم التلميذ</td>
                            <td>معرف التلميذ</td>
                            <td>معرف الدرس</td>
                            <td>الملف</td>
                            <td>الطريقة</td>
                            <td>أرسل في</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{e.name}</td>
                            <td>{e.student}</td>
                            <td>{e.course}</td>
                            <td>{e.sentFile}</td>
                            <td>{e.method}</td>
                            <td>{e.when}</td>
                        </tr>
                    </tbody>
                </table>
                
            ))}
        </div>
    )
}

export default Payments
