import { memo, useCallback, useMemo, useState } from "react";

function UseCallBack() {
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState(1);

  // var a = 1; //when passing a value as an input, the memo will not update after reredering beacuse of useEffect due to counter, becase let a = 1; let b=1; a == b; //true, but func sum(a,b){return a+b}; func sum2(a,b){return a+b} //
  // sum == sum2; // false, as the function references are different hence, when we pass a value to memo, it will not rerender as it check it by value and for fucntion it check with it reference and the reference always changes with rerender of the component. //var a = 1; check by value;
  // var a = 1; // check by value, hence no memo call everytime, explnation above
 
  const a = useCallback(()=> { //it returns the function 
    return 200 + 200;
  }, [inputValue]);
  let count = 0;
  for (let i = 1; i <= inputValue; i++) {
    console.log("while updating below counter, the for loop again re-render hence use memo");
    count = count + i;
  }

  let memoCount = useMemo(() => { //it returns the value //if you replace it will useCallBack it won't work
    let finalCount = 0;
    for (let i = 1; i <= inputValue; i++) {
      console.log("this code will only run when value of input changes, because of useMemo aka memo");
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

    <DemoMemoComponent a={a}/>
  </div>
}

// props will act as a trigger for memo component, since it is taking a function and not value it won't work propertly
// for fucntion, object, array memo will not work
const DemoMemoComponent = memo(function({a}) {
    console.log( " Child rerender" );
    return <div>
    hi there {a()}
    </div>
  })

export default UseCallBack;