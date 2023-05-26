import React, { useEffect, useState } from "react";
function fixtime(time) {
  return time < 10 ? `0${time}` : time;
}

const formatTime = (time) => {
  const sec = time % 60;
  const min = Math.floor(time / 60) % 60;
 
  const outputTime = `${fixtime(min)}:${fixtime(sec)}`;
  return outputTime;
};

export default function Timer(props) {
    const timestart=props.start
    const{count,cpm,setcpm}=props
  const [timer, settimer] = React.useState(300);
  const [min,setmin]=useState(0)
  const time = React.useRef(null);
  React.useEffect(() => {
    return () => {
      stop();
    };
  }, []);

if(timestart){
    start()
}

  function start() {
    if (time.current !== null) {
      return;
    }

    time.current = setInterval(() => {
      settimer((prev) => {
        if (prev <= 0) {
          stop(time.current);
          return 0;
        }
        
        
        
        return prev - 1;
      });
     
     
    }, 1000);
   
  }
 
  
  function stop(id) {
    clearInterval(time.current);
    time.current = null;
  }
  function reset() {
    stop();
    settimer(300);
  }
useEffect(()=>{
    setmin(timer==300?0:((300-timer)/60))
    setcpm(min==0?0:(count/min).toFixed(2))
    
    
    
},[timer])

if(timer===0){
    return (
        <div>
             <p>Characters: {count}</p>
             <p>Time: 300 sec</p>
             <p>CPM: {cpm}</p>
             <button onClick={()=>window.location.reload()}>Reset</button>
        </div>

    );
}else{
  return (
    <div >
      <h1>Timer: {formatTime(timer)}</h1>
      
    </div>
  );
}
}