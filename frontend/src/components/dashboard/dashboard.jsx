import { useEffect,useContext,useRef } from "react"
import { useNavigate } from "react-router";
import {Link, Routes,Route} from 'react-router-dom'
import { UserContext } from '../user/UserProvider';
//import
import Payments from './Payments';
import Search from "./Search";
import './dashboard.css'


const Dashboard = () => {
    //get login data
    const {loginData} = useContext(UserContext)
    const navigate=useNavigate();
    
    //if not logged in, redirect to home page
    useEffect(() => {
        if(!loginData){navigate('/');}
    }, [loginData])

    return (
        <div className='container-fluid  my-4'>
            dashboard
            <div className='row justify-content-between'>
                <div className='col-2 side py-3'>
                    <Link className='d-block mb-3' to='payments'>المدفوعات </Link>
                    <Link className='d-block mb-3'>اضافة مشترك</Link>
                    <Link className='d-block mb-3'>اضافة صف</Link>
                    <Link className='d-block' to='search'>بحث</Link>
                </div>

                <div className='col-10'>
                    <div>
                        <Routes>
                           <Route path='payments' element={<Payments/>} />    
                           <Route path='search' element={<Search/>} />    
                        </Routes>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard
