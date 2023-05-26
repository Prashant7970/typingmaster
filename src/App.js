import React, { useRef, useState } from "react";
import "./App.css";
import Timer from "./components/Timer";
import { getwords } from "./components/getword";
import Checkword from "./components/Checkwords";

function App() {
  const [count, setcount] = useState(0);
  const [mistake, setmistake] = useState(0);
  const [cpm, setcpm] = useState(0);
  const [text, settext] = useState("");
  const [activewordindex, setactiveword] = useState(0);

  const [timer, starttime] = useState(false);
  const [correctwordarray, setcorrectwordarray] = useState([]);
  const word = useRef(getwords());
  
  
  function processinput(value) {
    if (!timer) {
      starttime(true);
    }
    if (value.endsWith(" ")) {
      setactiveword((index) => index + 1);
      settext("");
      const check = value.trim();
      if (check !== word.current[activewordindex]) {
        setmistake(mistake + 1);
      }
      setcorrectwordarray((data) => {
        const newarray = [...data];
        newarray[activewordindex] = check === word.current[activewordindex];
        return newarray;
      });
    } else {
      setcount(count + 1);
      settext(value);
    }
  }



  return (
    <div className="App">
      <h1>Typing_Champions</h1>
      <div className="testarea">
        <nav>
          <li> Character: {count}</li>
          <li>CPM: {cpm}</li>
          <li>
            Accuracy:{" "}
            {(
              ((word.current.length - mistake) / word.current.length) *
              100
            ).toFixed(2)}
            %
          </li>
        </nav>
        <p>
          <Timer start={timer} count={count} cpm={cpm} setcpm={setcpm} />
        </p>

        <div className="testtext">
          <div>
            <h3>
              {word.current.map((word, index) => {
                return (
                  <Checkword
                    text={word}
                    active={index === activewordindex}
                    correct={correctwordarray[index]}
                  />
                );
              })}
            </h3>
          </div>
          <div>
           
            <textarea
              value={text}
              placeholder="start typing.."
              onChange={(e) => processinput(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
