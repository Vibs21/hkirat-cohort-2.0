import { useMemo, useState } from "react";

function UseMemo() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);


  let count = 0;
  for (let i = 1; i <= inputValue; i++) {
    console.log("while updating below counter, the for loop again re-render hence use memo");
    count = count + i;
  }

  let memoCount = useMemo(() => {
    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      console.log("this code will only run when value of input changes");
      finalCount = finalCount + i;
    }
    return finalCount;
  },[inputValue]);

  return <div>
    <input onChange={function(e) {
      setInputValue(e.target.value);
    }} placeholder={"Find sum from 1 to n"}></input>
    <br />
    Sum from 1 to {inputValue} is {count}
    Sum from 1 to {inputValue} is {memoCount}
    <br />
    <button onClick={() => {
      setCounter(counter + 1);
    }}>Counter ({counter})</button>
  </div>
}

export default UseMemo;