import React from "react";
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
  const [timer, settimer] = React.useState(300);
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
  return (
    <div >
      <h1>Timer: {formatTime(timer)}</h1>
      
    </div>
  );
}