import axios from 'axios'


const token=localStorage.getItem('token');

    //for forms without files to api
export const   http=axios.create({
        baseURL:'http://localhost:8000/api',
        headers:{
            "Content-Type": "application/json",
            'X-Requested-With':'XMLHttpRequest',
        },
        withCredentials:true,
    })

//for forms without files to api (with token)
export const   httpToken=axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    headers:{
        'X-Requested-With':'XMLHttpRequest',
        Authorization: `Bearer ${token}`
    }
})
 
    
    //for forms with files to api
export const   httpFile=axios.create({
        baseURL:'http://127.0.0.1:8000/api',
        headers:{
            'Content-Type': 'multipart/form-data',
            'X-Requested-With':'XMLHttpRequest'
        },
        withCredentials:true
    })

    //for forms without files to web
export const   httpTowWeb=axios.create({
    baseURL:'http://127.0.0.1:8000/web',
    headers:{'X-Requested-With':'XMLHttpRequest'},
    withCredentials:true
})

 


 
