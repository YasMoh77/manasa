import React,{useState,useRef,useEffect,useContext} from 'react'
import { UserContext } from '../user/UserProvider'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import {http} from '../axios/axiosGlobal'
import {httpToken} from '../axios/axiosGlobal'

import  './login.css'

const Login = () => {
    const {loginData,login} = useContext(UserContext)
    const navigate=useNavigate()
    //states
    const [load, setLoad]                 = useState(false)
    const [successLogin, setSuccessLogin] = useState(null)
    const [failLogin, setFailLogin] = useState(null)

    //values
    const refPhone   = useRef(null)
    const refPassword = useRef(null)

    //log the user
    const submitLogUser=async(e)=>{
        e.preventDefault();
        setLoad(true)
        //define values
        const phone  =refPhone.current.value.trim();
        const password=refPassword.current.value.trim();
        //store values
        const postData={phone,password};
        //send data
           const res=await http.post('/login',postData);
           // if login data are correct
           if(res.data.authData){
             //store token sent from backend
            localStorage.setItem('token',res.data.authData.token)
            //use token to get user data
            const res2= await httpToken.get('/user');
             //stop loading
             setLoad(false)
             //send user (through login()) to UserProvider to be stored there in localstorage
             setSuccessLogin(res.data.message)
             setTimeout(() => {
                login(res2.data.user)
             }, 1800);
             //show response & stop spinner after response
             setFailLogin(null)
            
           }else{
             //stop loading
            setLoad(false)
            setFailLogin(res.data.message)
            setSuccessLogin(null)
           }
    }


    //show hide password
    const showHidePassword=()=>{
        if(refPassword.current.type=='password')
          {refPassword.current.type='text';refPassword.current.nextElementSibling.style.display='none';refPassword.current.nextElementSibling.nextElementSibling.style.display='block';}
        else if(refPassword.current.type=='text')
          {refPassword.current.type='password';refPassword.current.nextElementSibling.style.display='block';refPassword.current.nextElementSibling.nextElementSibling.style.display='none';}
    }
    
    //go to profile if logged in
    useEffect(() => {
        loginData && navigate('/profile');
    }, [loginData])


    return (

        <div className='container-fluid my-5 top-add'>
            <form onSubmit={submitLogUser} className='mx-auto my-5 w-75 form-add b-radius-1'>
                <p className="w-fit mx-auto fw-bold fs-2">تسجيل الدخول </p>
                
                <div className="mb-3 d-flex ">
                    <label htmlFor="phone" className="form-label">رقم المحمول</label>
                    <input type="text"  ref={refPhone} className="form-control" id="phone" placeholder="ادخل رقم المحمول"/>
                </div>

                <div className="mb-3 d-flex position-relative">
                    <label htmlFor="password" className="form-label">كلمة المرور</label>
                    <input type="password"  ref={refPassword} className="form-control" id="password" placeholder="ادخل كلمة المرور"/>
                    <i onClick={showHidePassword} className='bi bi-eye-slash eye position-absolute'></i>
                    <i onClick={showHidePassword} className='bi bi-eye eye position-absolute'></i>
                </div>

                <div className='loginBtnCont d-flex w-1 mt-4 me justify-content-between align-items-center'>
                   <div className=' w-50'>
                        <button type="submit" className="btn btn-success ms-3 w-25">{load? <span className='spinner-border mx-auto align-self-center text-dark d-block'></span> :'دخول'}</button>
                        {successLogin && (<span className='text-success'>{successLogin}</span>)}
                        {failLogin && (<span className='text-danger'>{failLogin}</span>)}
                   </div>
                    <div className="">
                        <Link to='/password-reset'  className="ms-3"> نسيت كلمة المرور</Link>
                        <Link to='/register'  className="">حساب جديد</Link>
                   </div>
                </div>
            </form>
        </div>
    )
}

export default Login
