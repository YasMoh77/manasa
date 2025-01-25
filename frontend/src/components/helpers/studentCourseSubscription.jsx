import {useEffect} from 'react'
import { http } from '../axios/axiosGlobal'

const StudentCourseSubscription = ({student_Id,course_Id,subscriptionResult}) => {
    //
    const CheckStudentCourseSubscription=async(student_Id,course_Id)=>{
       //check
       const res=await http.get(`/check-course-subscription/${student_Id}/${course_Id}`)
       subscriptionResult&&subscriptionResult(res.data.student)
    }
    //
    useEffect(() => {
        CheckStudentCourseSubscription(student_Id,course_Id)
    }, [student_Id,course_Id])

}

export default StudentCourseSubscription
