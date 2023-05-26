
import React, {  useRef, useState } from 'react';
import './App.css';
import Timer from './components/Timer';
const getwords=()=>`rom prom eprom eeprom ram sita hero ass doc rat mat fat ok bye hye what why who`.split(" ").sort(()=>Math.random()>0.5?1:-1)


function Checkword(props){
  const {text,active,correct}=props
  if(correct===true){
    return<span className='correct'>{text} </span>
  }
  if(correct===false){
  
    return<span className='incorrect'>{text} </span>
  }
  if(active){
    return<span className='active'>{text} </span>
  }
  return<span>{text} </span>
 
}
Checkword=React.memo(Checkword)
function App() {
  const [count,setcount]=useState(0)
  const [mistake,setmistake]=useState(0)
  const [cpm,setcpm]=useState(0)
  const [text,settext]=useState("")
  const [activewordindex,setactiveword]=useState(0)
  const word=useRef(getwords())
  const [timer,starttime]=useState(false)
  const [correctwordarray,setcorrectwordarray]=useState([])

  function processinput(value){
    if(!timer){
      starttime(true)
    }
    if(value.endsWith(" ")){
      setactiveword(index=>index+1)
      settext("")
      const check=value.trim()
      if(check!==word.current[activewordindex]){
        setmistake(mistake+1)
      }
      setcorrectwordarray(data=>{
        const newarray=[...data]
        newarray[activewordindex]=check===word.current[activewordindex]
        return newarray
      })
    
    }else{
      setcount(count+1)
      settext(value)
    }
  }


 
  return (
    <div className="App">
      <h1>Typing_Champions</h1>
      <div className="testarea">
        <nav>
          <li>  Character: {count}</li>
          <li>CPM: {cpm}</li>
          <li>Accuracy: {(((word.current.length-mistake)/word.current.length)*100).toFixed(2)}%</li>
        
        </nav>
        <p>
        <Timer start={timer}
        count={count}
        cpm={cpm}
        setcpm={setcpm}
        
        />
        </p>
       

        <div className='testtext'>
          <div>
            <h3>
            {word.current.map((word,index)=>{
           return <Checkword
           text={word}
           active={index===activewordindex}
           correct={correctwordarray[index]}
         
           
           
           />
            })}
            </h3>

          </div>
          <div>
{text}
            <textarea 
           
            value={text}
            placeholder='start typing..'
            onChange={(e)=>processinput(e.target.value)}
            ></textarea>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
