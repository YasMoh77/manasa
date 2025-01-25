import {useState, useEffect} from 'react'

const CountDown = ({cTime}) => {
    //
    const [time, setTime] = useState({hour:0,minute:0,second:0})
        
            const getCounter=(cTime)=>{
                const [prevHours,prevMinutes,prevSeconds]=cTime.split(':').map(Number);
                const newdate=new Date();
                newdate.setHours(prevHours,prevMinutes,prevSeconds,0);
                const timeNow=new Date().getTime();
                const timeLater=newdate.getTime();
                const subtract=timeLater-timeNow;
                   
           // const day=Math.floor(subtract/60/60/24);
            const hour=Math.floor(subtract/(1000*60*60)%60);//%(60*60*24)/(60*60)
            const minute=Math.floor(subtract/(1000*60)%60);//%(60*60)/(60)
            const second=Math.floor(subtract/(1000)%60);
            setTime({hour,minute,second})
           }

    useEffect(() => {
        const interval=setInterval(() => {
        getCounter(cTime)
    }, 1000);
    return ()=>{clearInterval(interval);}
    }, [cTime])

    return (
        <div dir='ltr' className='border-4 bg-info w-fit mx-auto px-4 py-2 my-3 fw-bold fs-4 rounded-2' >
           <span>{String(time.hour).padStart(2,'0')}</span> - <span>{String(time.minute).padStart(2,'0')}</span> - <span>{String(time.second).padStart(2,'0')}</span> 
        </div>
    )
}

export default CountDown
