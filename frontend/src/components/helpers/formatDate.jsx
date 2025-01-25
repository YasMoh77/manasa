import React from 'react'

const FormatDate = ({time}) => {
       //
       const [hours,minutes,seconds]=time.split(':');
       const dayPeriod= +hours>=12?'PM':'AM';
       const modHours=+hours%12||12;
    return (
        <span>{modHours}:{minutes} {seconds>0&&+':'+seconds} {dayPeriod}</span>
    )
}

export default FormatDate
