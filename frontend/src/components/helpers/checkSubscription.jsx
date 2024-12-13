import React,{useState,useEffect} from 'react'
import { http } from '../axios/axiosGlobal';

const CheckSubscription = ({userId,courseId,courseTime,subscriptionResult}) => {
    //get username
    const getUserName=async(userId,courseId)=>{
       const res=await http.get(`/check-course-subscription/${userId}/${courseId}`);
      // split course time into array
      const [courseHour,courseMinutes,courseSeconds]=courseTime.split(':').map(Number);
       //get todays' date
        const todayDate=new Date();
        //change the hrs, mins and secs of todays' date to the hrs, mins and secs of the course
        todayDate.setHours(courseHour,courseMinutes,courseSeconds,0);
        //get the hours of todays' date after changing them
        const currentCourseHour=todayDate.getHours();
        //add 2 hrs to the current hour
        todayDate.setHours(currentCourseHour+2);
        //form a date (new Date()) from the timestamp (todayDate.getTime())
        //here we get the new date with 2 hrs more
        const addToNow=new Date(todayDate.getTime());
        //change courseTime into complete date
        const formCourseDate=new Date();
        formCourseDate.setHours(courseHour,courseMinutes,courseSeconds,0);
        const courseDate=new Date(formCourseDate.getTime());
        //send the new values inside subscriptionResult
      subscriptionResult&&subscriptionResult(res.data.user,addToNow,courseDate);
    }

    useEffect(() => {
        getUserName(userId,courseId)
    }, [userId,courseId])

    
}

export default CheckSubscription