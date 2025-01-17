import React,{useState,useEffect} from 'react'
import { http } from '../axios/axiosGlobal';
import  './helpers.css';

const UserNameHelper = ({userId}) => {
    //state
    const [name, setName] = useState(<span className='spinner-border text-secondary spinner-sm'></span>)
    //get username
    const getUserName=async(userId)=>{
       const res=await http.get('/get-name/'+userId);
       setName(res.data.name)
    }

    useEffect(() => {
        getUserName(userId)
    }, [userId])

    return (
        <>
          <span>{name}</span>   
        </>
    )
}

export default UserNameHelper
