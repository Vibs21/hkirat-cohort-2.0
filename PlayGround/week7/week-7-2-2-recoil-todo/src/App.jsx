import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import { countAtom, countSelector } from './store/atoms/todo';

function App() {


  return (
    <div>
      <RecoilRoot>
        <Count  />
      </RecoilRoot>

    </div>
  )
}

function Count() {
  console.log('re-render')

  return <div>
    <CountRenderer  />
    <Buttons />
  </div>
}

function CountRenderer() {
  const count = useRecoilValue(countAtom);


  return <div>
    renderer: {count}
    <br/>
    <EvenHandler/>
  </div>
}

function EvenHandler () {
  console.log('even re-render');

  const isEven = useRecoilValue(countSelector);

  return <div >{ (isEven) ? 'even' : 'Odd' }</div>
}


function Buttons() {
  // const [count, setCount] = useRecoilState(countAtom);
  const setCount = useSetRecoilState(countAtom);
  return(
    <div>
      <button onClick={()=> {setCount(c => c+1)}}>Increase</button>
      <button onClick={()=> {setCount(c => c-1)}}>Decrease</button>
    </div>
  )
}

export default App
