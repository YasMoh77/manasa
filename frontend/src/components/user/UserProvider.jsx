import React,{createContext,useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { http } from '../axios/axiosGlobal'


export const UserContext=createContext()
export const UserProvider = ({children}) => {
      //states
      const [loginData, setLoginData] = useState(null)
      const [fetchedGrades, setFetchedGrades] = useState(null)
      const [fetchCourses, setFetchCourses] = useState(null)
      const [fetchTeachers, setFetchTeachers] = useState(null)
      const [mainPic, setMainPic] = useState(null)
      const [mainPic2, setMainPic2] = useState(null)

      //fetch only some
      const [fetchSomeTeachers, setFetchSomeTeachers] = useState(null)
      const [fetchSomeCourses, setFetchSomeCourses] = useState(null)

      const navigate=useNavigate()
      //store login data and set state
      const login=(data)=>{
        localStorage.setItem('loginData',JSON.stringify(data))
          //set state
          setLoginData(data)
      }

      //fetch grades
      const fetchAllGrades=async()=>{
        const res=await http.get('/grades');
        setFetchedGrades(res.data.grades) 
        localStorage.setItem('fetchedGrades',JSON.stringify(res.data.grades))
      }

      //fetch teachers
      const fetchAllTeachers=async()=>{
        const res=await http.get('/teachers');
        setFetchTeachers(res.data.teachers) 
        localStorage.setItem('fetchTeachers',JSON.stringify(res.data.teachers))
      }

      //fetch courses
      const fetchAllCourses=async()=>{
        const res=await http.get('/courses');
        setFetchCourses(res.data.courses) 
        localStorage.setItem('fetchCourses',JSON.stringify(res.data.courses))
      }

      //fetch only some
      //fetch some teachers
       const fetchSomeTeachersFunc=async()=>{
        const res=await http.get('/some-teachers');
        setFetchSomeTeachers(res.data.teachers) 
        localStorage.setItem('setFetchSomeTeachers',JSON.stringify(res.data.teachers))
      }

      //fetch some teachers
      const fetchSomeCoursesFunc=async()=>{
        const res=await http.get('/some-courses');
        setFetchSomeCourses(res.data.courses) 
        localStorage.setItem('setFetchSomeCourses',JSON.stringify(res.data.courses))
      }

      //
      const fetchMainPic=()=>{
          const url='http://127.0.0.1:8000/storage/images/main/student.jpg';
          const url2='http://127.0.0.1:8000/storage/images/main/exam.png';

          setMainPic(url)
          setMainPic2(url2)

      }


      //log out
      const logout=()=>{
        localStorage.removeItem('loginData')
        setLoginData(null)
        window.location.reload()
        navigate('/home');
      }

      //
      useEffect(() => {
        //fetch grades
        fetchAllGrades()
        fetchAllCourses()
        fetchAllTeachers()
        fetchMainPic()
        //fetch a few
        fetchSomeTeachersFunc()
        fetchSomeCoursesFunc()
        const storedLoginData=JSON.parse(localStorage.getItem('loginData'));
        //set state
        setLoginData(storedLoginData)
      }, [])


    return (
        <UserContext.Provider value={{loginData,fetchedGrades,fetchCourses,fetchTeachers,fetchSomeTeachers,fetchSomeCourses,mainPic,mainPic2, login,logout}}>
            {children}
        </UserContext.Provider>
    )
}
