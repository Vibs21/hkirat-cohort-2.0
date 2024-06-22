import { useEffect, useState } from 'react';
import axios from 'axios';
import useIsOnline from './useIsOnline';
import useDebounce from './useDebounce';

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('https://sum-server.100xdevs.com/todos').then((res) => {
      setTodos(res.data.todos);
      setIsLoading(false);
    });
  }, []);

  return {todos, isLoading};
}

function App() {
  const {todos, isLoading} = useTodos();
  const isUserOnline = useIsOnline();
  const mouseMove = useMouseTrack();
  const [inputValue, setInputValue] = useState('');

  const debounceVal = useDebounce(inputValue,2000);


  if(isLoading) {
    return <div id='1'> Loading... </div>
  }

  return (
    <>
    witness a lag of 2sec to see the debounce value: {debounceVal}
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Search..."
    />
    <br/>
    your mouse is at: {mouseMove.x} {mouseMove.y}
    <br/>

    <br/>
      {todos.map((todo) => (
        <Track id={todo.id} todo={todo} />
      ))}
    </>
  );
}

function Track({ todo }) {
  return (
    <div id={todo.id}>
      {todo.title}
      <br />
      {todo.description}
    </div>
  );
}


function useMouseTrack() {
  const [position, setPosition] = useState({x:0, y:0});

  const handleMouseMove = (e) => {
    setPosition({x: e.clientX, y:e.clientY});
  }

  useEffect(()=> {
    window.addEventListener('mousemove', handleMouseMove);

    return ()=> {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [])

  return position;
}

export default App;
