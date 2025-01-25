import {useEffect,useState} from 'react'
import { http } from '../axios/axiosGlobal'

const CountCourses = ({id,user}) => {
       // state for num
       const [num, setNum] = useState(null)
       //send api to get courses total number
       const count=async(ID,USER)=>{
          const res=await http.get(`count-courses/${ID}/${USER}`)
          //set num with total number
          setNum(res.data.number)
       }

       useEffect(() => {
         //call count function on component render
        count(id,user)
       }, [num])

    return (
        <span>{num}</span>
    )
}

export default CountCourses
